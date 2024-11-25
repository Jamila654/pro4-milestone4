import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const POST = async (req) => {
  try {
    await connectDB();

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const newPost = await Post.create({
      title,
      content,
      author: user._id,
      publishedAt: new Date(),
    });
    console.log("New post created:", newPost);

    return NextResponse.json(
      { message: "Post created successfully!", data: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      {
        message: error.message || "An error occurred while creating the post.",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await connectDB();

    const posts = await Post.find().populate("author", "fullname email");

    console.log(posts);

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: "No posts found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Posts fetched successfully!", data: posts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        message: error.message || "An error occurred while fetching the posts.",
      },
      { status: 500 }
    );
  }
};
export const PUT = async (req) => {
  try {
    const { id, title, content } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json({ message: "Invalid data." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "You are not authorized to edit this post." },
        { status: 403 }
      );
    }

    post.title = title;
    post.content = content;
    await post.save();

    return NextResponse.json(
      { message: "Post updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Error updating post." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid data." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }

    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "You are not authorized to delete this post." },
        { status: 403 }
      );
    }

    await post.deleteOne();

    return NextResponse.json(
      { message: "Post deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Error deleting post." },
      { status: 500 }
    );
  }
};
