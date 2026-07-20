import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  const styles: Record<string, string> = {
    applied: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    interview: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    hired: "bg-green-100 text-green-700 hover:bg-green-100",
    rejected: "bg-red-100 text-red-700 hover:bg-red-100",
    "on hold": "bg-gray-200 text-gray-700 hover:bg-gray-200",
  };

  return (
    <Badge
      className={
        styles[normalizedStatus] ??
        "bg-slate-100 text-slate-700"
      }
    >
      {status}
    </Badge>
  );
}