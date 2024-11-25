"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode, Suspense } from "react";

interface Props {
    children: React.ReactNode
}

function Providers({ children }: Props ) {
  return (
    <SessionProvider>
       <Suspense fallback={null}>
      {children}
      </Suspense>
    </SessionProvider>
  )
}

export default Providers