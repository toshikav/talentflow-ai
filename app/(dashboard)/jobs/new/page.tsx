"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    requiredSkills: "",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create job");
      }

      alert("Job Created Successfully!");

      router.push("/jobs");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto">

      <Card>

        <CardHeader>
          <CardTitle>Create New Job</CardTitle>
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

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Job"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}