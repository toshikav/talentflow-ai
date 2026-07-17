import { prisma } from "@/lib/prisma";

export async function getJobs() {
  return await prisma.job.findMany();
}