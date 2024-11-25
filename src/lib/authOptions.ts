import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        await connectDB();

        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");
        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("Invalid credentials");

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
