// "use client";

// import axios from "axios";
// import { FormEvent, useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// function RegisterPage() {
//   const [error, setError] = useState();
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const fullname = formData.get("fullname");
//     const email = formData.get("email");
//     const password = formData.get("password");

//     try {
//       const signupResponse = await axios
//         .post("/api/auth/signup", {
//           fullname,
//           email,
//           password,
//         })
//         .then((res) => {
//           console.log(res);
//         });

//       console.log(signupResponse);

//       const signinResponse = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });

//       if (signinResponse?.ok) return router.push("/login");

//       console.log(signinResponse);
//     } catch (error) {
//       console.log(error);
//     //   if (error instanceof AxiosError) {
//     //     setError(error.response?.data?.message);
//     //   }
//     }
//   };

//   // return (
//   //   <div className="justify-center h-[calc(100vh-4rem)] flex items-center" >
//   //     <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">

//   //       {error && <div className="bg-red-500 text-white px-4 py-2">{error}</div>}

//   //       <h1 className="text-4xl font-bold mb-7">Signup</h1>

//   //       <input
//   //         type="text"
//   //         placeholder="John Doe"
//   //         name="fullname"
//   //         className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
//   //       />
//   //       <input
//   //         type="email"
//   //         placeholder="somemail@gmaail.com"
//   //         name="email"
//   //         className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
//   //       />
//   //       <input
//   //         type="password"
//   //         placeholder="******"
//   //         name="password"
//   //         className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
//   //       />

//   //       <button className="bg-indigo-500 px-4 py-2" type="submit">Signup</button>
//   //     </form>
//   //   </div>
//   // )

//   return (
//     <main className="bg-[#000000] w-full h-screen flex items-center justify-center">
//       <div className="card text-white ">
//         <Card className="w-[350px] bg-[#000000] text-white mb-16  ">
//           <CardHeader>
//             <CardTitle>Create Account</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               {error && (
//                 <div className=" text-red-600 font-extrabold text-center px-4 py-2">
//                   {error}
//                 </div>
//               )}
//               <div className="grid w-full items-center gap-4">
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="fullname">Full Name</Label>
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     name="fullname"
//                     className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="email">Email</Label>
//                   <input
//                     type="email"
//                     placeholder="john@gmail.com"
//                     name="email"
//                     className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="password">Password</Label>
//                   <input
//                     type="password"
//                     placeholder="******"
//                     name="password"
//                     className="bg-[#0A0A0A] rounded-md px-4 py-2 block  mb-2 w-full"
//                   />
//                 </div>
//                 <Button className="  hover:opacity-80" type="submit">
//                   Signup
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <h1>Already a member?</h1>
//             <Button className=" hover:opacity-80">
//               <Link href="/login">Signin</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </main>
//   );
// }

// export default RegisterPage;

"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Use fetch instead of axios
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData?.message || "Failed to sign up.");
      }

      // Automatically sign in after signup
      const signinResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signinResponse?.ok) {
        return router.push("/login");
      } else {
        throw new Error("Failed to sign in after signup.");
      }
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <main className="bg-[#000000] w-full h-screen flex items-center justify-center">
      <div className="card text-white ">
        <Card className="w-[350px] bg-[#000000] text-white mb-16  ">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
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
                  <Label htmlFor="fullname">Full Name</Label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="fullname"
                    className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
                  />
                </div>
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
                <Button className="  hover:opacity-80" type="submit">
                  Signup
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <h1>Already a member?</h1>
            <Button className=" hover:opacity-80">
              <Link href="/login">Signin</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default RegisterPage;
