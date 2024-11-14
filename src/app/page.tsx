import Link from "next/link";
import { getServerSession } from "next-auth"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

async function getUser() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <main className="flex flex-col min-h-[calc(100vh-56px)]">
      <BackgroundBeamsWithCollision className="flex-grow flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="lg:text-6xl text-4xl font-bold font-serif text-black leading-tight mb-6">
            Unified Platform for Your{" "}
            <span className="text-blue-600">Medical Records</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 lg:text-lg mb-8">
            Store all your medical history in one place, and use AI to summarize it for easy access and understanding.
          </p>
          {!session ? (
            <Button asChild size="lg" className="rounded-full px-8 py-3 font-semibold text-lg">
              <Link href="/auth">Get Started</Link>
            </Button>
          ) : (
            <div className="text-lg font-semibold text-gray-800">
              Welcome, <span className="text-blue-600">{session.user?.name || 'User'}</span>!
            </div>
          )}
        </div>
      </BackgroundBeamsWithCollision>
    </main>
  );
}