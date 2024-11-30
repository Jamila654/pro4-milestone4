import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      // id: string;
      // fullname: string;
      // email: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fullname?: string | null;
    };
  }
}

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fullname?: string | null; // Extend the user object with fullname
    };
  }
}