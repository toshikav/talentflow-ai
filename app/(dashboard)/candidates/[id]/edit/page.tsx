"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditCandidatePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: 0,
    resumeUrl: "",
    aiScore: 0,
    status: "Applied",
  });

  useEffect(() => {
    async function fetchCandidate() {
      const res = await fetch(`/api/candidates/${id}`);
      const data = await res.json();

      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        skills: data.skills,
        experience: data.experience,
        resumeUrl: data.resumeUrl ?? "",
        aiScore: data.aiScore ?? 0,
        status: data.status,
      });

      setLoading(false);
    }

    fetchCandidate();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Candidate updated successfully!");

      router.push(`/candidates/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }

    setSaving(false);
  }

  if (loading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">

      <Card>

        <CardHeader>
          <CardTitle>Edit Candidate</CardTitle>
        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Skills</Label>
              <Input
                value={form.skills}
                onChange={(e) =>
                  setForm({ ...form, skills: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label>Resume URL</Label>
              <Input
                value={form.resumeUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    resumeUrl: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>AI Score</Label>
              <Input
                type="number"
                value={form.aiScore}
                onChange={(e) =>
                  setForm({
                    ...form,
                    aiScore: Number(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <Label>Status</Label>
              <Input
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Candidate"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}