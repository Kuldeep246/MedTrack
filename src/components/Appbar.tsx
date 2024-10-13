"use client";
import { signIn, signOut } from "next-auth/react"
import Link from "next/link";

export const Appbar = () => {
  return <div className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
    <div className="flex h-14 sm:mx-20 mx-10 items-center justify-between border-b ">

      <Link href='/' className="text-blue-600 text-lg">
        logo
      </Link>
      <div className="flex space-x-4">

        <button
          onClick={async () => {
            await signIn();
          }}
          className="bg-blue-600 text-white rounded-md px-4 py-2 items-center"
        >
          Login
        </button>
        <button
          onClick={async () => {
            await signOut();
          }}
          className="bg-blue-600 text-white rounded-md px-4 py-2 items-center"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
}