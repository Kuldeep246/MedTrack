'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon } from '@radix-ui/react-icons'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from 'next-auth/react'

const Form = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()
    const { data: session, status } = useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (status === "authenticated" && session?.user) {
            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content,

                    }),
                })
                if (response.ok) {
                    setTitle('')
                    setContent('')
                    router.refresh()
                }
            } catch (error) {
                console.error('Submission error:', error)
            }
        } else {
            console.error('User not authenticated')
        }
    }
    return (
        <div>
            <Dialog>
                <div className='md:h-60 h-48 pt-3   divide-y divide-gray-200 bg-white rounded-md flex flex-col items-center justify-center shadow transition hover:shadow-lg'>
                    <DialogTrigger>
                        <PlusIcon className='h-12 w-12  opacity-70' />
                    </DialogTrigger>
                    <div className=' w-full lg:pt-2 py-2 items-center justify-center flex'>Add medical Records</div>
                </div>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="detail" className="block text-sm  font-medium text-gray-700">
                                    Detail
                                </label>
                                <textarea
                                    id="detail"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    className="mt-1 h-28 block w-full rounded-md border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <DialogTrigger>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit
                                </button>
                            </DialogTrigger>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Form
