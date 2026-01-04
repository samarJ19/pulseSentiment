import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface RawFeedback {
  id: string;
  message: string;
  createdAt: string;
  category: "PERSONAL" | "WORKLOAD" | "TEAM";
}

interface RawFeedbackViewProps {
  data: RawFeedback[];
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  PERSONAL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  WORKLOAD: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  TEAM: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function RawFeedbackView({ data, onBack }: RawFeedbackViewProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">
            No feedback data available for the selected period.
          </p>
          <Button variant="outline" onClick={onBack}>
            ← Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Raw Feedback Data</h2>
          <p className="text-sm text-muted-foreground">
            {data.length} feedback record{data.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          ← Back to Dashboard
        </Button>
      </div>

      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Message
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((feedback, index) => (
                <tr
                  key={feedback.id}
                  className={index !== data.length - 1 ? "border-b" : ""}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        categoryColors[feedback.category]
                      }`}
                    >
                      {feedback.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm max-w-md">
                    <p className="line-clamp-2">{feedback.message}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(feedback.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                    {feedback.id.slice(-8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
