import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        const entry = await prisma.entry.create({
            data: {
                title: body.title,     
                content: body.content,   
                userId: session.user.id, 
            },
        });

        return NextResponse.json(entry, { status: 201 });
    } catch (error) {
        console.error('Error creating entry:', error); 
        return NextResponse.json({ error: 'Error creating entry' }, { status: 500 });
    }
}
