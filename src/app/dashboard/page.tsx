"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilePenLine, Trash2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    fullname: string;
    email: string;
  };
  publishedAt: any;
}

const Dashboard = () => {
  let date = new Date();
  console.log(date);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data = await response.json();
          console.log("Posts fetched:", data);
          if (data.data) {
            setPosts(data.data.reverse());
          } else {
            setError("No posts found.");
          }
        } else {
          setError("Failed to load posts");
        }
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });

      if (response.ok) {
        alert("Post deleted successfully.");
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete the post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting the post.");
    }
  };
  // return (
  //   <div className="container mx-auto mt-24">
  //     <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

  //     {loading && <p>Loading posts...</p>}
  //     {error && <p className="text-red-500">{error}</p>}
  //     {!loading && posts.length === 0 && <p>No posts available.</p>}

  //     <div className="space-y-4">

  //       {posts.map((post) => (
  //         <div key={post._id} className="border p-4 rounded">
  //           <h2 className="text-xl font-bold">{post.title}</h2>
  //           <p>{post.content}</p>
  //           <p className="text-sm text-gray-500">
  //             Author: {post.author ? post.author.fullname : "Unknown Author"}
  //           </p>
  //           <p className="text-sm text-gray-500">

  //             {post.publishedAt
  //               ? new Date(post.publishedAt).toLocaleDateString() // Convert ISO string to Date object
  //               : "Not available"}
  //           </p>
  //           <button
  //             className="text-blue-500 hover:underline"
  //             onClick={() => router.push(`/dashboard/edit-blog?id=${post._id}`)}
  //           >
  //             Edit
  //           </button>
  //           <button onClick={() => handleDelete(post._id)}>Delete</button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>

  // );
  return (
    <main className=" mt-20 w-full min-h-screen text-white p-8 bg-black">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p className="font-bold">Loading posts...</p>}
      {error && <p className="text-red-500 font-bold">{error}</p>}
      {!loading && posts.length === 0 && <p>No posts available.</p>}
      <div className="cards   grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {posts.map((post) => (
          <div key={post._id} className="card">
            <Card className=" bg-black text-white hover:border-[12px] hover:rounded-3xl transition 0.3s ease-in-out">
              <CardHeader>
                <CardTitle>Title: {post.title}</CardTitle>
              </CardHeader>
              <CardContent className=" flex flex-col gap-4 ">
                <div className="p text-nowrap overflow-y-scroll text-[3vh]">
                <p className="">Content: {post.content} </p>
                </div>
                <p className="text-sm text-gray-500">
                  Author:{" "}
                  {post.author ? post.author.fullname : "Unknown Author"}{" "}
                </p>
                <p className="text-sm text-gray-500">
                  CreatedAt:{" "}
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </CardContent>
              <CardFooter className=" w-full flex items-center justify-between">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() =>
                    router.push(`/dashboard/edit-blog?id=${post._id}`)
                  }
                >
                  <FilePenLine />{" "}
                </button>
                <button title="delete" onClick={() => handleDelete(post._id)}><Trash2 /></button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
