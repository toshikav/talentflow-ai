const candidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    status: "Interview",
    score: "92%",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Backend Developer",
    status: "Screening",
    score: "88%",
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "UI/UX Designer",
    status: "Selected",
    score: "95%",
  },
];

export default function RecentCandidates() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Recent Candidates
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-slate-500">
            <th className="pb-3">Name</th>
            <th className="pb-3">Role</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">AI Score</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-b">
              <td className="py-4">{candidate.name}</td>
              <td>{candidate.role}</td>
              <td>{candidate.status}</td>
              <td className="font-semibold text-blue-600">
                {candidate.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}