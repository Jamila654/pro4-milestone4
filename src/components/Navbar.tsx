"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-[#0A0A0A] text-white p-4 border-b-[1px] fixed top-0 w-full z-50">
      <div className="flex items-center justify-between container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            ease: "linear",
            duration: 2,
            x: { duration: 1 },
          }}
          className=" text-2xl font-extrabold"
        >
          QuickBlog
        </motion.div>

        <ul className="sm:flex gap-x-2 font-bold">
          {session ? (
            <>
              {(pathname.startsWith("/dashboard") ||
                pathname === "/dashboard/profile") && (
                <li className="px-3 py-1 flex items-center gap-4">
                  <Link href="/dashboard/profile" className=" hidden sm:flex">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      View Profile
                    </motion.button>
                  </Link>
                  <motion.button
                    onClick={() => {
                      signOut();
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hidden sm:flex"
                  >
                    Logout
                  </motion.button>
                  <Link
                    href="/dashboard/create-blog"
                    className=" hidden sm:flex mr-6"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      Create a Blog
                    </motion.button>
                  </Link>
                  {/* <Link href="/dashboard" className="hidden sm:flex">
                    dashboard
                  </Link> */}
                  <li className=" sm:hidden ">
                    <Sheet>
                      <SheetTrigger asChild>
                        {/* <Menu
                          size={40}
                          strokeWidth={3}
                          className=" cursor-pointer hover:opacity-80"
                        /> */}
                        <h1><Menu className=" cursor-pointer hover:opacity-80 mt-3 size-10"/></h1>
                      </SheetTrigger>
                      <SheetContent className="bg-[#000000] text-white font-extrabold text-2xl mr-5">
                        <div className="">
                          <div className=" flex flex-col items-center justify-center gap-4">
                            <ul>
                              <li className=" flex flex-col items-center justify-center gap-4">
                                <Link href="/dashboard/profile">
                                  <motion.button
                                    whileHover={{
                                      scale: 1.1,
                                      transition: { duration: 0.2 },
                                    }}
                                  >
                                    View Profile
                                  </motion.button>
                                </Link>
                                <button
                                  className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                  onClick={() => {
                                    signOut();
                                  }}
                                >
                                  Logout
                                </button>
                                <Link href="/dashboard/create-blog">
                                  <motion.button
                                    whileHover={{
                                      scale: 1.1,
                                      transition: { duration: 0.2 },
                                    }}
                                  >
                                    Create a Blog
                                  </motion.button>
                                </Link>
                                {/* <Link href="/dashboard">dashboard</Link> */}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </li>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="px-3 py-1 mt-2 hidden sm:flex">
                <Link href="/login">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    Login
                  </motion.button>
                </Link>
              </li>

              <li className="px-3 py-1 hidden sm:flex mr-6">
                <Link href="/register">
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    Register
                  </motion.button>
                </Link>
              </li>
              <li className=" sm:hidden ">
                <Sheet>
                  <SheetTrigger asChild>
                    {/* <Menu
                      size={40}
                      strokeWidth={3}
                      className=" cursor-pointer hover:opacity-80"
                    /> */}
                    <h1><Menu className=" cursor-pointer hover:opacity-80 mt-3 size-10"/></h1>
                  </SheetTrigger>
                  <SheetContent className="bg-[#000000] text-white font-extrabold text-2xl">
                    <div className=" py-4">
                      <div className=" flex flex-col items-center justify-center gap-4">
                        <ul>
                          <li className="px-3 py-1">
                            <Link href="/login">Login</Link>
                          </li>

                          <li className="px-3 py-1">
                            <Link href="/register">Register</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
