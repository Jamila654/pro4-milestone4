import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  publishedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedAt: {
    type: Date,
    required: true,
    default: Date.now, // Using a function to return the current date
  },
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;