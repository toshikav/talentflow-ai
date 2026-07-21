import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

// GET one job
export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// UPDATE job
export async function PUT(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        salary: body.salary,
        description: body.description,
        requiredSkills: body.requiredSkills,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE job
export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    await prisma.job.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete job" },
      { status: 500 }
    );
  }
}