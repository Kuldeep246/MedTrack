import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return NextResponse.json({
        id:session?.user?.id,
        name: session?.user?.name
    })
}