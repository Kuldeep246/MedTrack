"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SigninContent = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirected = useRef(false);

  useEffect(() => {
    if (!redirected.current && session.data?.user) {
      const redirectUrl =
        localStorage.getItem("loginRedirectUrl") || searchParams.get("redirectUrl");
      localStorage.removeItem("loginRedirectUrl");
      router.replace(redirectUrl || "/");
      redirected.current = true;
    }
  }, [session, router, searchParams]);

  return (
    <div className="flex items-center p-5 justify-center h-full bg-gray-100">
      <div className="flex flex-col gap-8 bg-white p-10 rounded-3xl border border-gray-200 shadow-2xl min-w-[30vw] max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign In</h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Welcome! Please enter your details to sign in.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg mt-4">
            Sign In
          </button>
          <div className="text-gray-400 text-sm flex justify-center ">or</div>
          <div className="flex flex-col gap-4 ">
            <div
              className="w-full flex items-center gap-3 p-3 font-medium text-lg rounded-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white justify-center shadow-md hover:from-blue-600 hover:to-indigo-700"
              onClick={async () => {
                await signIn("google");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
              </svg>
              Continue with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Signin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninContent />
    </Suspense>
  );
};

export default Signin;
