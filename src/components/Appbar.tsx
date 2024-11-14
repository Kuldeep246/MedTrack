"use client"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from 'next-auth/react'

export const Appbar = () => {

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return <div className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
    <div className="flex h-14 sm:mx-20 mx-10 items-center justify-between border-b ">

      <Link href='/' prefetch={false} className="text-blue-600  px-4 tracking-widest font-semibold  py-1 text-2xl">
        MedTrack
      </Link>

      <div className="ml-10 flex items-baseline space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard"
              prefetch={false}
              className="text-black-primary-foreground hover:bg-primary-foreground/10 hover:underline underline-offset-2 decoration-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link href="/profile" className="text-black-primary-foreground hover:bg-primary-foreground/10 hover:underline underline-offset-2 decoration-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
            <Button
              onClick={async () => {
                await signOut();
              }}
              variant={"default"}
              className="hover:bg-blue-700 bg-blue-600  text-white w-24"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={async () => {
                await signIn();
              }}
              variant={"outline"}
              className="text-blue-600 bg-white  w-24 "
            >
              Sign In
            </Button>
            <Button
              onClick={async () => {
                await signIn();
              }}
              variant={"default"}
              className="hover:bg-blue-700 bg-blue-600  text-white w-24"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>


    </div>
  </div>
}