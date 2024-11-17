import  { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";

interface ExtendedSession extends DefaultSession {
  user: {
    id: string;
    admin: boolean;
    name: string | null;
    email: string | null;
    image: string | null;
  } & DefaultSession["user"]
}

export const authOptions: NextAuthOptions = {
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
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }): Promise<ExtendedSession> {
      if (!token.sub) {
        throw new Error("Token sub is missing");
      }
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { id: true, name: true, email: true, image: true, admin: true },
      });

      if (!dbUser) {
        throw new Error(`User with ID ${token.sub} not found`);
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: dbUser.id,
          name: dbUser.name ?? null,
          email: dbUser.email ?? null,
          image: dbUser.image ?? null,
          admin: dbUser.admin ?? false,
        },
      };
    },
  },
};

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();

export const rateLimit = (
  userId: string,
  rateLimitCount: number,
  rateLimitInterval: number
): boolean => {
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
