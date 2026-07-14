import { Brain, Sparkles, CircleCheckBig } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-blue-600" />
        <h2 className="text-lg font-semibold">
          AI Insights
        </h2>
      </div>

      <div className="space-y-4">

        <div className="flex items-start gap-3">
          <CircleCheckBig
            className="text-green-600 mt-1"
            size={18}
          />

          <p className="text-slate-600">
            Strong Java developers are increasing this month.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <CircleCheckBig
            className="text-green-600 mt-1"
            size={18}
          />

          <p className="text-slate-600">
            React is the most requested skill across active jobs.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Sparkles
            className="text-yellow-500 mt-1"
            size={18}
          />

          <p className="text-slate-600">
            AI predicts 91% candidate-job compatibility on average.
          </p>
        </div>

      </div>
    </div>
  );
}