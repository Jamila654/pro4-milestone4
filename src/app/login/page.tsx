"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const signinResponse = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signinResponse?.error) return setError(signinResponse.error as string);

    if (signinResponse?.ok) return router.push("/dashboard");

    console.log(signinResponse);
  };

  // return (
  //   <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
  //     <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
  //       {error && (
  //         <div className="bg-red-500 text-white px-4 py-2">{error}</div>
  //       )}

  //       <h1 className="text-4xl font-bold mb-7">Login</h1>

  //       <input
  //         type="email"
  //         placeholder="somemail@gmaail.com"
  //         name="email"
  //         className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
  //       />
  //       <input
  //         type="password"
  //         placeholder="******"
  //         name="password"
  //         className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
  //       />

  //       <button className="bg-indigo-500 px-4 py-2" type="submit">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <main className="bg-[#000000] w-full h-screen flex items-center justify-center">
      <div className="card text-white">
        <Card className="w-[350px] bg-[#000000] text-white mb-16 sm:mr-16 ">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className=" text-red-600 font-extrabold text-center px-4 py-2">
                  {error}
                </div>
              )}
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    name="email"
                    className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <input
                    type="password"
                    placeholder="******"
                    name="password"
                    className="bg-[#0A0A0A] rounded-md px-4 py-2 block  mb-2 w-full"
                  />
                </div>
                <Button className=" hover:opacity-80" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default LoginPage;