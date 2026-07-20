"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NewCandidatePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create candidate");
      }

      toast.success("Candidate added successfully!");

      setTimeout(() => {
        router.push("/candidates");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Candidate</CardTitle>
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
                required
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
                required
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
              <Label>Skills (comma separated)</Label>
              <Input
                value={form.skills}
                onChange={(e) =>
                  setForm({ ...form, skills: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                min={0}
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Creating Candidate..." : "Add Candidate"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}