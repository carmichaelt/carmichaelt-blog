import { CreatePostContent } from './_components/create-post-content';

// Server component for static page structure
export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Write and publish your next blog post
        </p>
      </div>
      
      <CreatePostContent />
    </div>
  );
}
