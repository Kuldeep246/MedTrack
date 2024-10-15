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
        <div className="mx-auto max-w-7xl md:p-10 ">
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">
                    Hii {session?.user?.name}
                </h1>

            </div>
            <div className='justify-between space-x-2   grid grid-cols-1 md:grid-cols-2'>
                <div className="space-y-1 divide-y divide-zinc w-full ring-offset-0 ring-blue-100  hover:ring-1 rounded-md justify-center transition hover:shadow-lg pb-5 pl-2 pr-4">
                    <div className='flex justify-between '>
                        <h2 className="text-xl my-1 font-semibold">Health Profile</h2>
                        <Uploaddata />
                    </div>
                    <Profile />
                </div>

                <Summary/>
            </div>
        </div>
    )
}

export default page
