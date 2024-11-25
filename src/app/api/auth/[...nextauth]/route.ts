import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";  // Import the shared authOptions

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };