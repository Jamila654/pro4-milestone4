"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";


const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const handleEdit = async () => {
    if (!postId) {
      alert("Invalid post ID.");
      return;
    }

    try {
      const response = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, title, content }),
      });

      if (response.ok) {
        alert("Post updated successfully.");
        router.push("/dashboard");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update the post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating the post.");
    }
  };

  // return (
  //   <div>
  //     <h1>Edit Your Blog</h1>
  //     <input
  //       type="text"
  //       placeholder="Title"
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //     />
  //     <textarea
  //       placeholder="Content"
  //       value={content}
  //       onChange={(e) => setContent(e.target.value)}
  //     />
  //     <button onClick={handleEdit}>Update Post</button>
  //   </div>
  // );
  return (
 

    <main className="bg-[#000000] w-full h-screen flex items-center justify-center mt-10">
      <div className="card text-white ">
        <Card className="w-[350px] bg-[#000000] text-white   ">
          <CardHeader>
            <CardTitle>Edit Your Blog</CardTitle>
          </CardHeader>
          <CardContent>
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

              <button
                className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                onClick={handleEdit}
              >
                Update Post
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default EditBlog;
