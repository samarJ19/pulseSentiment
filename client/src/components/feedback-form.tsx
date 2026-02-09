import { useState } from "react";
import { cn } from "@/lib/utils";
import { httpClient } from "@/util/axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const inputStyles =
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const textareaStyles = cn(inputStyles, "min-h-[120px] resize-vertical");

type Category = "PERSONAL" | "WORKLOAD" | "TEAM";

export function FeedbackForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<Category>("PERSONAL");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setMessage("");
    setCategory("PERSONAL");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await httpClient.post("/feedback/create", {
        message,
        category,
      });

      if (response.data?.success) {
        const apiMessage = response.data?.message || "Feedback submitted";
        toast({
          variant: "success",
          title: "Feedback submitted",
          description: apiMessage,
        });
        resetForm();
      } else {
        const apiMessage =
          response.data?.error?.message ||
          response.data?.message ||
          "Submission failed";
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: apiMessage,
        });
      }
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message || "Submission failed";
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: apiMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Share your feedback</CardTitle>
          <CardDescription>
            Tell us how you feel. Your responses help us improve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select
                  id="category"
                  className={inputStyles}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  required
                >
                  <option value="PERSONAL">Personal</option>
                  <option value="WORKLOAD">Workload</option>
                  <option value="TEAM">Team</option>
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <textarea
                  id="message"
                  className={textareaStyles}
                  placeholder="Share what's on your mind"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Sending..." : "Submit Feedback"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
