import Profile from '@/components/Profile';
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
                    <Profile/>
                </div>

                <div className="w-full text-wrap  overflow-hidden ring-offset-0 ring-blue-100  hover:ring-1 rounded-md  px-4 divide-y divide-zinc-200   transition hover:shadow-lg">
                    <div className="text-xl  my-2 font-semibold ">Summary</div>
                    <div className=" text-wrap py-2 align-middle text-zinc-800 ">thsi holds yur all medical Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio, facere culpa aperiam reprehenderit labore quis dolores! Consequuntur, delectus, rerum sequi ea temporibus recusandae numquam exercitationem et nemo earum, sit blanditiis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repellendus error vel maxime mollitia a ab consequuntur deserunt veritatis doloribus accusantium sunt inventore eius aspernatur assumenda saepe ipsam, laboriosam similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod esse odio nisi qui alias facere odit libero, aliquid voluptate obcaecati quisquam quos asperiores consectetur, neque magnam sit ipsa mollitia recusandae. historry whicl will be imported from db</div>
                </div>
            </div>
        </div>
    )
}

export default page
