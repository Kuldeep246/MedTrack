import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { summary: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const summaryResponse =
      user.summary && user.summary.trim() === ""
        ? "No medical data updated"
        : user.summary ?? "No medical data updated";

    return NextResponse.json({ summary: summaryResponse }, { status: 200 });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the summary." },
      { status: 500 }
    );
  }
}
