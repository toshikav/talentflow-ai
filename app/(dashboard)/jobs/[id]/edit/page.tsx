"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditJobPage({ params }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [jobId, setJobId] = useState("");

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    requiredSkills: "",
    description: "",
  });

  useEffect(() => {
    async function loadJob() {
      const { id } = await params;

      setJobId(id);

      const res = await fetch(`/api/jobs/${id}`);

      const job = await res.json();

      setForm({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary || "",
        requiredSkills: job.requiredSkills,
        description: job.description,
      });
    }

    loadJob();
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Job updated successfully!");

      setTimeout(() => {
        router.push(`/jobs/${jobId}`);
      }, 1500);
    } catch {
      toast.error("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto">

      <Card>

        <CardHeader>
  <CardTitle className="text-3xl font-bold">
    Edit Job
  </CardTitle>

  <p className="text-slate-500">
    Update the job information below.
  </p>
</CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <Label>Job Title</Label>

              <Input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Company</Label>

              <Input
                value={form.company}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Location</Label>

              <Input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Salary</Label>

              <Input
                value={form.salary}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salary: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Required Skills</Label>

              <Input
                value={form.requiredSkills}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requiredSkills: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Description</Label>

              <Textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3">

              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}