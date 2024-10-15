"use client";
import React, { useEffect, useState } from 'react';
import { RefreshCw } from "lucide-react";

export interface UserSummary {
    summary: string;
}

const Summary = () => {
    const [summary, setSummary] = useState('This holds your medical history, which will be imported from the database.');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/summary');
                if (!response.ok) {
                    throw new Error('Failed to fetch summary');
                }
                const data: UserSummary = await response.json();
                setSummary(data.summary); 
            } catch (error: any) {
                setError(error.message);
                console.error('Error fetching summary:', error);
            }
        };

        fetchSummary();
    }, []);


    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/chat-gpt');
            if (response.ok) {
                const data = await response.json();
                setSummary(data.summary);
            } else {
                console.error('Failed to fetch summary');
            }
        } catch (error) {
            console.error('Error fetching summary:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full text-wrap overflow-hidden ring-offset-0 ring-blue-100 hover:ring-1 rounded-md px-4 divide-y divide-zinc-200 transition hover:shadow-lg">
            <div className='my-2 flex justify-between'>
                <div className="text-xl font-semibold">Summary</div>
                <button className='font-extrabold' title="refresh" onClick={handleRefresh}>
                    <RefreshCw className='h-5 text-blue-600' />
                </button>
            </div>
            <div className="text-wrap py-2 align-middle text-zinc-800">
                {loading ? <div>Loading...</div> : summary}
            </div>
        </div>
    );
}

export default Summary;
