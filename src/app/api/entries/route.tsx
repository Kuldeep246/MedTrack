import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const entries = await prisma.entry.findMany({
            where: { userId: session.user.id }, 
        });

        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        console.error('Error fetching entries:', error);
        return NextResponse.json({ error: 'Error fetching entries' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const entryId = url.searchParams.get('id');

        if (!entryId) {
            return NextResponse.json({ message: "Missing entry ID" }, { status: 400 });
        }

        const deletedEntry = await prisma.entry.delete({
            where: {
                id: entryId,
                userId: session.user.id,
            },
        });

        return NextResponse.json({ message: 'Entry deleted successfully', entry: deletedEntry }, { status: 200 });
    } catch (error) {
        console.error('Error deleting entry:', error);
        return NextResponse.json({ error: 'Error deleting entry' }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, data } = body;

        if (!id || !data) {
            return NextResponse.json({ message: "Missing entry ID or data" }, { status: 400 });
        }

        const updatedEntry = await prisma.entry.update({
            where: {
                id: id,
                userId: session.user.id,
            },
            data,
        });

        return NextResponse.json({ message: 'Entry updated successfully', entry: updatedEntry }, { status: 200 });
    } catch (error) {
        console.error('Error updating entry:', error);
        return NextResponse.json({ error: 'Error updating entry' }, { status: 500 });
    }
}