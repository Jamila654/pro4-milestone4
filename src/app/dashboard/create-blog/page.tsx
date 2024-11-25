"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className=' mt-36'>
  //     <div>
  //       <label htmlFor="title">Title</label>
  //       <input
  //         id="title"
  //         type="text"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //         required
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor="content">Content</label>
  //       <textarea
  //         id="content"
  //         value={content}
  //         onChange={(e) => setContent(e.target.value)}
  //         required
  //       />
  //     </div>
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //     <button type="submit" disabled={loading}>
  //       {loading ? 'Creating...' : 'Create Blog Post'}
  //     </button>
  //   </form>
  // );
  return (
    <main className="bg-[#000000] w-full h-screen flex items-center justify-center mt-10">
      <div className="card text-white ">
        <Card className="w-[350px] bg-[#000000] text-white   ">
          <CardHeader>
            <CardTitle>Create Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Content">Content</Label>
                  <textarea
                    title="content"
                    name="content"
                    id="content"
                    required
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    className="bg-[#0A0A0A] rounded-md px-4 py-2 block mb-2 w-full"
                    rows={10}
                  />
                </div>

                {error && <p className=" text-red-600 font-extrabold">{error}</p>}
                <button
                  className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Blog Post"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreateBlog;
