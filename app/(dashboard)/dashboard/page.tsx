import Link from "next/link";
import { prisma } from "@/lib/prisma";

import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/candidates/StatusBadge";
import StatusPieChart from "@/components/dashboard/StatusPieChart";
import MonthlyCandidatesChart from "@/components/dashboard/MonthlyCandidatesChart";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Users,
  UserPlus,
  CalendarCheck,
  BadgeCheck,
  UserX,
} from "lucide-react";

export default async function DashboardPage() {
  // Statistics
  const totalCandidates = await prisma.candidate.count();

  const applied = await prisma.candidate.count({
    where: {
      status: "Applied",
    },
  });

  const interview = await prisma.candidate.count({
    where: {
      status: "Interview",
    },
  });

  const hired = await prisma.candidate.count({
    where: {
      status: "Hired",
    },
  });

  const rejected = await prisma.candidate.count({
    where: {
      status: "Rejected",
    },
  });

  // Pie Chart Data
  const chartData = [
    {
      name: "Applied",
      value: applied,
    },
    {
      name: "Interview",
      value: interview,
    },
    {
      name: "Hired",
      value: hired,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const allCandidates = await prisma.candidate.findMany({
  orderBy: {
    createdAt: "asc",
  },
});

const monthlyMap = new Map<string, number>();

allCandidates.forEach((candidate) => {
  const month = format(candidate.createdAt, "MMM");

  monthlyMap.set(
    month,
    (monthlyMap.get(month) || 0) + 1
  );
});

const monthlyData = Array.from(monthlyMap.entries()).map(
  ([month, candidates]) => ({
    month,
    candidates,
  })
);

  // Recent Candidates
  const recentCandidates = await prisma.candidate.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your hiring overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Candidates"
          value={totalCandidates}
          icon={<Users size={28} />}
        />

        <StatsCard
          title="Applied"
          value={applied}
          icon={<UserPlus size={28} />}
        />

        <StatsCard
          title="Interview"
          value={interview}
          icon={<CalendarCheck size={28} />}
        />

        <StatsCard
          title="Hired"
          value={hired}
          icon={<BadgeCheck size={28} />}
        />

        <StatsCard
          title="Rejected"
          value={rejected}
          icon={<UserX size={28} />}
        />
      </div>

      {/* Candidates by Status */}
<div className="grid gap-6 lg:grid-cols-2">

  <Card>
    <CardHeader>
      <CardTitle>
        Candidates by Status
      </CardTitle>
    </CardHeader>

    <CardContent>
      <StatusPieChart data={chartData} />
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>
        Monthly Candidates
      </CardTitle>
    </CardHeader>

    <CardContent>
      <MonthlyCandidatesChart data={monthlyData} />
    </CardContent>
  </Card>

</div>

      {/* Recent Candidates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Candidates</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Link
                      href={`/candidates/${candidate.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {candidate.name}
                    </Link>
                  </TableCell>

                  <TableCell>{candidate.email}</TableCell>

                  <TableCell>
                    <StatusBadge status={candidate.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}