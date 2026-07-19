import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all candidates
export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

// CREATE candidate
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const candidate = await prisma.candidate.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        skills: body.skills,
        experience: body.experience,
        resumeUrl: body.resumeUrl,
        aiScore: body.aiScore,
        status: body.status,
      },
    });

    return NextResponse.json(candidate, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create candidate" },
      { status: 500 }
    );
  }
}