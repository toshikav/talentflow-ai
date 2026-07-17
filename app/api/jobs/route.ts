import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// CREATE a new job
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        description: body.description,
        salary: body.salary,
        requiredSkills: body.requiredSkills,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}