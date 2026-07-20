"use client";

import { useState } from "react";

import CandidateCard from "@/components/candidates/CandidateCard";
import { Input } from "@/components/ui/input";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  skills: string;
  aiScore: number | null;
  status: string;
}

interface CandidateSearchProps {
  candidates: Candidate[];
}

export default function CandidateSearch({
  candidates,
}: CandidateSearchProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCandidates = candidates.filter((candidate) => {
  const value = search.toLowerCase();

  const matchesSearch =
    candidate.name.toLowerCase().includes(value) ||
    candidate.email.toLowerCase().includes(value) ||
    candidate.skills.toLowerCase().includes(value);

  const matchesStatus =
    statusFilter === "All" ||
    candidate.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
  {["All", "Applied", "Interview", "Hired", "Rejected"].map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all
${
  statusFilter === status
    ? "bg-blue-600 text-white border-blue-600"
    : "bg-white hover:bg-slate-100"
}`}
    >
      {status}
    </button>
  ))}
</div>
      <Input
        placeholder="🔍 Search by name, email or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <p className="text-sm text-slate-500">
        Showing {filteredCandidates.length} candidate(s)
      </p>

      {filteredCandidates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">
            No matching candidates
          </h2>

          <p className="text-slate-500 mt-2">
            Try another search keyword.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              id={candidate.id}
              name={candidate.name}
              email={candidate.email}
              phone={candidate.phone}
              skills={candidate.skills}
              aiScore={candidate.aiScore}
              status={candidate.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}