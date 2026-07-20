import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET one candidate
export async function GET(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  console.log("ID from params:", id);

  const candidate = await prisma.candidate.findUnique({
    where: { id },
  });

  console.log("Candidate:", candidate);

  if (!candidate) {
    return NextResponse.json(
      { message: "Candidate not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(candidate);
}

// UPDATE candidate
export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const body = await request.json();

  const candidate = await prisma.candidate.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(candidate);
}

// DELETE candidate
export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  await prisma.candidate.delete({
    where: { id },
  });

  return NextResponse.json({
    message: "Candidate deleted successfully",
  });
}