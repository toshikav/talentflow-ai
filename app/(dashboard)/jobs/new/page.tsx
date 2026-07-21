  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";

  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner";

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

  if (
    !form.title ||
    !form.company ||
    !form.location ||
    !form.requiredSkills
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

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

    toast.success("Job created successfully!");

    setTimeout(() => {
      router.push("/jobs");
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
                  required
                  placeholder="Frontend Developer"
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
                  required
                  placeholder="Google"
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
                  required
                  placeholder="Bangalore"
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
                  placeholder="₹8 LPA"
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
                  required
                  placeholder="React, Next.js, TypeScript"
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
                  placeholder="Write the job description..."
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
    onClick={() => router.push("/jobs")}
  >
    Cancel
  </Button>

  <Button
    type="submit"
    disabled={loading}
  >
    {loading ? "Creating..." : "Create Job"}
  </Button>

</div>

            </form>

          </CardContent>

        </Card>

      </div>
    );
  }