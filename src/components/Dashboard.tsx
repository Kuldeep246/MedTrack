"use client"
import Link from "next/link";
import Form from "./Form";
import { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, PencilIcon, EyeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


interface Entry {
    id: string;
    title: string;
    content: string;
}

const Dashboard = () => {

    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('/api/entries');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Entry[] = await response.json();
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []);

    const deleteEntry = async (id: string) => {
        try {
            const response = await fetch(`/api/entries?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete entry');
            }

            setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    return (
        <div className="bg-gradient-to-t from-gray-200 to-neutral-100  min-h-screen">

            <div className="  sm:mx-8 lg:mx-16  px-4 py-8">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                    <h1 className="text-4xl font-bold text-gray-900">Health Records</h1>
                    <Form />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {entries.map((entry) => (
                        <Card key={entry.id} className="col-span-1 transition-all duration-300 ease-in-out hover:shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold">{entry.title}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteEntry(entry.id)}
                                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <p className="h-24 overflow-hidden text-sm text-gray-600">{entry.content}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-2">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={`/dashboard/${entry.id}`}>
                                        <EyeIcon className="mr-2 h-4 w-4" />
                                        View
                                    </Link>
                                </Button>
                                <Button className="w-full">
                                    <PencilIcon className="mr-2 h-4 w-4" />
                                    Upload
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard; 