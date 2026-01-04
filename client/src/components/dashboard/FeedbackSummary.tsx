import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FeedbackCategory {
  category: "PERSONAL" | "WORKLOAD" | "TEAM";
  messages: string[];
}

interface FeedbackSummaryProps {
  data: FeedbackCategory[];
  loading: boolean;
}

const categoryColors: Record<string, string> = {
  PERSONAL: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  WORKLOAD: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  TEAM: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const categoryIcons: Record<string, string> = {
  PERSONAL: "👤",
  WORKLOAD: "📊",
  TEAM: "👥",
};

export function FeedbackSummary({ data, loading }: FeedbackSummaryProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-24 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No feedback data available for the selected period.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.map((item) => (
        <Card key={item.category}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  categoryColors[item.category]
                }`}
              >
                {categoryIcons[item.category]} {item.category}
              </span>
              <span className="ml-auto text-sm text-muted-foreground">
                {item.messages.length} feedback{item.messages.length !== 1 ? "s" : ""}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {item.messages.map((message, index) => (
                <li
                  key={index}
                  className="rounded-md bg-muted/50 p-3 text-sm leading-relaxed"
                >
                  "{message}"
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
