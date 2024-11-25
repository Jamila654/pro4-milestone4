'use client'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";


export default function Home() {
  const words = 'Create an account, share your thoughts, edit or delete your posts, and explore inspiring blogs from a vibrant community of writers!'
  return (
    <div className=" bg-[#000000] flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TextGenerateEffect duration={2} filter={false} words={words} />
      hi
    </div>
  );
}