"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { type Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Name must be less than 100 characters"),
  url: z.url("Must be a valid URL").optional().or(z.literal("")),
  github: z.url("Must be a valid GitHub URL").optional().or(z.literal("")),
  problem: z
    .string()
    .min(1, "Problem description is required")
    .max(500, "Description must be less than 500 characters"),
  status: z.enum(["active", "completed", "archived"]),
  description: z.string().optional(),
  technologies: z.string().optional(),
  authorId: z.string(),
  updatedAt: z.string(),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

interface CreateProjectFormProps {
  authorId: Id<"users">;
}

export function CreateProjectForm({ authorId }: CreateProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const createProject = useMutation(api.projects.createProject);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      status: "active",
      name: "",
      url: "",
      github: "",
      problem: "",
      description: "",
      technologies: "",
      authorId: authorId as Id<"users">,
      updatedAt: new Date().toISOString(),
    },
  });

  const technologiesValue = watch("technologies");

  const onSubmit = async (data: CreateProjectFormData) => {
    setIsSubmitting(true);

    try {
      const projectData = {
        ...data,
        authorId: authorId,
        technologies: technologiesValue
          ? technologiesValue
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          : [],
      };
      await createProject(projectData);

      toast.success("Project created successfully!");
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="url">Project URL</Label>
              <Input
                id="url"
                {...register("url")}
                placeholder="https://example.com"
              />
              {errors.url && (
                <p className="text-sm text-red-600">{errors.url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                {...register("github")}
                placeholder="https://github.com/username/repo"
              />
              {errors.github && (
                <p className="text-sm text-red-600">{errors.github.message}</p>
              )}
            </div>
          </div>

          {/* Problem Description */}
          <div className="space-y-2">
            <Label htmlFor="problem">Problem Solved</Label>
            <Textarea
              id="problem"
              {...register("problem")}
              placeholder="Describe what problem this project solves"
              rows={3}
            />
            {errors.problem && (
              <p className="text-sm text-red-600">{errors.problem.message}</p>
            )}
          </div>

          {/* Additional Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Additional Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Optional additional details about the project"
              rows={3}
            />
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <Input
              id="technologies"
              {...register("technologies")}
              placeholder="React, TypeScript, Node.js (comma-separated)"
            />
            <p className="text-sm text-gray-500">
              Separate technologies with commas
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              onValueChange={(value) =>
                setValue("status", value as "active" | "completed" | "archived")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
