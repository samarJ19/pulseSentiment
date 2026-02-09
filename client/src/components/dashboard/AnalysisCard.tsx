import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AlertCircle, Loader2, Zap } from "lucide-react";
import { httpClient } from "../../util/axios";

interface Mitigation {
  issue: string;
  solution: string;
  priority: "high" | "medium" | "low";
}

interface Analysis {
  summary: string;
  mitigations: Mitigation[];
  categoryBreakdown?: Record<string, number>;
}

interface AnalysisCardProps {
  dateFrom: string;
  dateTo: string;
  onAnalysisComplete?: (analysis: any) => void;
}

export function AnalysisCard({
  dateFrom,
  dateTo,
  onAnalysisComplete,
}: AnalysisCardProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await httpClient.post(
        `/feedback/analyze?from=${dateFrom}&to=${dateTo}`
      );
      setAnalysis(response.data.data.analysis);
      onAnalysisComplete?.(response.data.data.analysis);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze feedbacks"
      );
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-amber-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card className="w-full border-gold/20">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-gold" />
            AI Feedback Analysis
          </CardTitle>
          <CardDescription>
            Generate AI-powered insights and mitigation strategies
          </CardDescription>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={loading}
          size="sm"
          className="bg-gold hover:bg-gold/90 text-black font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {analysis && (
          <>
            {/* Summary Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gold">Summary</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Category Breakdown */}
            {analysis.categoryBreakdown && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gold">Feedback Distribution</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(analysis.categoryBreakdown).map(
                    ([category, count]) => (
                      <div
                        key={category}
                        className="p-3 bg-muted/50 rounded-lg border border-gold/10"
                      >
                        <p className="text-xs text-muted-foreground uppercase">
                          {category}
                        </p>
                        <p className="text-xl font-bold text-gold mt-1">
                          {count}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Mitigations Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gold">Mitigation Strategies</h3>
              <div className="space-y-3">
                {analysis.mitigations.map((mitigation, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-muted/30 border border-gold/10 rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">{mitigation.issue}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {mitigation.solution}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase px-2 py-1 rounded ${getPriorityColor(
                          mitigation.priority
                        )}`}
                      >
                        {mitigation.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!analysis && !error && !loading && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              Click "Analyze" to generate AI insights from the selected feedback
              data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
