import { Appbar } from "@/components/Appbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { json } from "stream/consumers";

async function getUser() {
  const session = await getServerSession();
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div className=" sm:mt-36 mt-28 flex flex-col items-center justify-center text-center">

      <h1 className="lg:text-6xl  text-5xl max-w-5xl w-8/12  text-wrap font-bold font-serif text-black">Unified Platform for Your
        <span className="text-blue-700">Medical Records</span></h1>
      <p className="mt-4 max-w-prose  text-zinc-600">Store all your medical history in one place, and use AI to summarize it for easy access and understanding.</p>


      <Link href="/auth" className="flex justify-center mt-5">
        <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold text-lg transition hover:bg-blue-700 hover:shadow-lg">
          Get started
        </button>
      </Link>
      <div>
      {!session ? (
        <div className="flex justify-center mt-5">
          <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold text-lg transition hover:bg-blue-700 hover:shadow-lg">
            Get started
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-lg font-semibold">Welcome, {JSON.stringify(session?.user)}!</p>
        </div>
      )}
    </div>
    </div>


  );
}