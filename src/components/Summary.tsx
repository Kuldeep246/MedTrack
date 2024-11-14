"use client";
import React, { useEffect, useState } from 'react';
import { RefreshCw } from "lucide-react";

export interface UserSummary {
    summary: string;
}

const Summary = () => {
    const [summary, setSummary] = useState<UserSummary['summary']>('This holds your medical history, which will be imported from the database.');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/summary');
                if (!response.ok) {
                    throw new Error('Failed to fetch summary');
                }
                const data: UserSummary = await response.json();
                setSummary(data.summary);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    const handleRefresh = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/gemini');
            if (!response.ok) {
                throw new Error('Failed to fetch summary');
            }
            const data: UserSummary = await response.json();
            setSummary(data.summary);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Error fetching summary:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatSummary = (text: string) => {
        const lines = text.replace(/\*/g, '').split('\n').filter(line => line.trim());

        return (
            <ul style={{ listStyleType: 'none', paddingLeft: '24px' }}>
                {lines.map((line, index) => {

                    return (
                        <li key={index} style={{ listStyleType: 'disc', paddingLeft: '10px' }}>
                            {line.trim()}
                        </li>
                    );

                })}
            </ul>
        );
    };





    return (
        <div>
            <div className='my-2 flex justify-between'>
                <div className="text-xl font-semibold">Summary</div>
                <button className='font-extrabold' title="refresh" onClick={handleRefresh}>
                    <RefreshCw className='h-5 text-blue-600' />
                </button>
            </div>
            <div className="text-wrap py-2 align-middle text-zinc-800">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : (
                    <ul>
                        {formatSummary(summary)}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Summary;
