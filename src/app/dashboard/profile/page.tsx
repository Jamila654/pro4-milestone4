"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSession, signOut } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  // return (
  //   <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center gap-y-5">
  //     <h1 className="font-bold text-3xl">Profile</h1>

  //     <pre className="bg-zinc-800 p-4">
  //       {JSON.stringify(
  //         {
  //           session,
  //           status,
  //         },
  //         null,
  //         2
  //       )}
  //     </pre>
  //   </div>
  // );
  return (
    <main className="bg-[#000000] w-full h-screen flex items-center justify-center mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className=" w-[350px] overflow-y-scroll">
        {JSON.stringify(
           {
            session,
            status,
           },
         null,
         2
        )}
        </CardContent>
      </Card>
    </main>
  );
}

export default ProfilePage;
