import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      id: string;
      fullname: string;
      email: string;
    };
  }
}