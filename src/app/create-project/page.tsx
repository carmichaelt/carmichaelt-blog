import { CreateProjectContent } from './_components/create-project-content';

// Server component for static page structure
export default function CreateProjectPage() {
  return (
    <div className="max-w-4xl mx-auto min-h-screen mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-gray-600 mt-2">
          Add a new project to your portfolio
        </p>
      </div>
      
      <CreateProjectContent />
    </div>
  );
}