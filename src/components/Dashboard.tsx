"use client"
import Link from "next/link";
import Form from "./Form";
import { useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";


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
        <main className="mx-auto max-w-7xl md:p-10 ">
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">
                    My Files
                </h1>

            </div>

            <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3 ">
            <Form />
                {entries.map((entry) => (
                    <li key={entry.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">

                        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center justify-between space-x-3">
                                    <Link href={`/dashboard/${entry.id}`}>
                                        <div className="truncate text-lg font-medium text-zinc-900">
                                            {entry.title}
                                        </div>
                                    </Link>
                                    <div  >
                                        <TrashIcon onClick={() => deleteEntry(entry.id)} className="h-7 w-7 p-1 hover:text-red-600 hover:cursor-pointer" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="px-6 mt-3 h-28  text-wrap overflow-hidden  place-items-center py-2 gap-6 text-sm text-zinc-700">
                            <div className="flex text-wrap items-center ">
                                {entry.content}
                            </div>
                        </div>
                        <div className="flex gap-3 items-center justify-center py-3 text-white">
                            <div className="bg-blue-600 w-2/5 py-2 hover:cursor-pointer font-semibold text-base	 items-center text-center rounded-md ">Update</div>
                            <div className="bg-blue-600 w-2/5 py-2 hover:cursor-pointer items-center font-semibold text-base text-center rounded-md ">Update</div>
                        </div>
                    </li>
                ))}
            </ul>

        </main>
    )
}
export default Dashboard; 