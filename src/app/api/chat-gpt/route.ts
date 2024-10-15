
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '@/db';
import { openai } from '../../../lib/openai';


type ChatCompletionResponse = {
    choices: {
        message: {
            content: string;
        };
    }[];
};

export async function GET(req: string) {
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

    const entriesText = user.entries.map((entry) => entry.content).join(' ').slice(0, 2000);

    let gptResponse: ChatCompletionResponse;
    try {
        gptResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that summarizes data.' },
                { role: 'user', content: `Summarize the following entries in bullet points: ${entriesText}` },
            ],
        }) as ChatCompletionResponse;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to get a response from OpenAI.', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Failed to get a response from OpenAI.', error: 'Unknown error occurred' }, { status: 500 });
    }

    const summary = gptResponse.choices[0]?.message?.content || 'No summary generated.';

    await prisma.user.update({
        where: { id: user.id },
        data: { summary },
    });

    return NextResponse.json({ message: summary });
}

