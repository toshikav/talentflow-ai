import {
  Briefcase,
  Users,
  Calendar,
  Brain,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import HiringChart from "@/components/charts/HiringChart";
import AIInsights from "@/components/ai/AIInsights";
import RecentCandidates from "@/components/candidates/RecentCandidates";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your hiring overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Jobs"
          value="24"
          change="+12% this month"
          icon={<Briefcase size={28} />}
        />

        <StatsCard
          title="Candidates"
          value="136"
          change="+18 new candidates"
          icon={<Users size={28} />}
        />

        <StatsCard
          title="Interviews"
          value="18"
          change="+5 scheduled"
          icon={<Calendar size={28} />}
        />

        <StatsCard
          title="AI Match Score"
          value="91%"
          change="+4% improvement"
          icon={<Brain size={28} />}
        />

      </div>

      {/* Hiring Chart + AI Insights */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <HiringChart />
        </div>

        <AIInsights />

      </div>

      {/* Recent Candidates + Upcoming Interviews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <RecentCandidates />
        </div>

        <UpcomingInterviews />

      </div>

    </div>
  );
}