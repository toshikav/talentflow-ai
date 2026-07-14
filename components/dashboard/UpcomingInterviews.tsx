import { CalendarDays, Clock } from "lucide-react";

const interviews = [
  {
    name: "Aarav Sharma",
    role: "Frontend Developer",
    time: "10:00 AM",
  },
  {
    name: "Priya Singh",
    role: "Backend Developer",
    time: "2:30 PM",
  },
  {
    name: "Rohan Verma",
    role: "UI/UX Designer",
    time: "4:00 PM",
  },
];

export default function UpcomingInterviews() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <CalendarDays className="text-blue-600" />

        <h2 className="text-lg font-semibold">
          Upcoming Interviews
        </h2>
      </div>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 hover:bg-slate-50 transition"
          >
            <h3 className="font-semibold">
              {interview.name}
            </h3>

            <p className="text-sm text-slate-500">
              {interview.role}
            </p>

            <div className="mt-2 flex items-center gap-2 text-blue-600">
              <Clock size={16} />

              <span>{interview.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}