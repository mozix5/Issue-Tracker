import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Crednetials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Eg. abc@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("NextAuth Authorize triggered:", credentials);
        if (!credentials?.email || !credentials.password) {
          console.log("NextAuth Authorize: Missing email or password");
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          console.log(`NextAuth Authorize: User not found for email ${credentials.email}`);
          return null;
        }
        console.log(`NextAuth Authorize: Found user ${user.email}, comparing password...`);
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );
        console.log(`NextAuth Authorize: Password match result is ${passwordMatch}`);
        return passwordMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

export default AuthOptions;
