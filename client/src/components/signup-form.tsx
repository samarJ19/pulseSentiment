import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { httpClient } from "@/util/axios";
import { useToast } from "@/hooks/use-toast";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await httpClient.post("/user/signup", {
        email,
        password,
        role: "USER",
      });

      if (response.data?.success && response.data?.data) {
        const { message, userRole } = response.data.data as {
          message: string;
          userRole: string;
        };
        toast({
          variant: "success",
          title: "Signup successful",
          description: `${message} as ${userRole}`,
        });
        localStorage.setItem("ROLE", userRole);
        const target = userRole === "ADMIN" ? "/admindashboard" : "/feedbackform";
        navigate(target, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: "Unexpected response from server",
        });
      }
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message || "Signup failed";
      toast({
        variant: "destructive",
        title: "Signup failed",
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to={"/login"}>Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
