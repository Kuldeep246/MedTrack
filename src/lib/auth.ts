import GoogleProvider from "next-auth/providers/google";
import { SessionStrategy } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";

export const authOptions  = {
    adapter: PrismaAdapter(prisma),
    providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secr3t",
  pages: {
    signIn: "/auth",
  },
  session: { strategy: "jwt" as SessionStrategy },
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session, token }: any) {
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
        session.user.admin = user?.admin;
      }
      return session;
    },
  },
};

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();

export const rateLimit = (userId: string, rateLimitCount: number, rateLimitInterval: number): boolean => {
  const now = new Date();
  const userLimiter = userRateLimits.get(userId) ?? { timestamps: [] };

  userLimiter.timestamps = userLimiter.timestamps.filter(
    (timestamp) => now.getTime() - timestamp.getTime() < rateLimitInterval
  );

  if (userLimiter.timestamps.length >= rateLimitCount) {
    return false; 
  }

  userLimiter.timestamps.push(now);
  userRateLimits.set(userId, userLimiter);
  return true;
};