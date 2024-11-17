import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '@/db';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function GET(): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { entries: true },
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const entriesText = user.entries.map((entry) => entry.content).join('    ').slice(0, 4000);

    try {
        const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const gptResponse = await model.generateContent(`Summarize the doctor's remarks in bullet points, focusing only on significant issues and ignoring mild problems: ${entriesText}`);
        const summary = gptResponse.response?.text() || 'No summary generated.';

        await prisma.user.update({
            where: { id: user.id },
            data: { summary },
        });

        return NextResponse.json({ summary }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ message: 'Failed to get a response from Google Generative AI.', error: errorMessage }, { status: 500 });
    }
}
