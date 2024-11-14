import Profile from '@/components/Profile';
import Summary from '@/components/Summary';
import Uploaddata from '@/components/Uploaddata';
import { getServerSession } from 'next-auth';



import React from 'react'


async function getUser() {
    const session = await getServerSession();
    return session;
}

const page = async () => {
    const session = await getUser();

    return (
        <div className="my-12 mx-auto  w-5/6 ">
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">
                    Hii {session?.user?.name}
                </h1>

            </div>
            <div className='justify-between space-x-4 mt-4  grid grid-cols-1 md:grid-cols-2'>
                <div className="space-y-1 divide-y divide-zinc bg-white w-full ring-offset-0 ring-blue-100  hover:ring-1 rounded-md justify-center transition hover:shadow-md pb-5 pl-2 pr-4">
                    <div className='flex justify-between '>
                        <h2 className="text-xl my-1 font-semibold">Health Profile</h2>
                        <Uploaddata />
                    </div>
                    <Profile />
                </div>
                <div className="w-full text-wrap overflow-hidden bg-white ring-offset-0 ring-blue-100 hover:ring-1 rounded-md px-4 divide-y divide-zinc-200 transition hover:shadow-md">
                    <Summary />
                </div>
            </div>
        </div>
    )
}

export default page
