import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getAuthToken } from "@/lib/auth";

export default async function InitPage() {
  const { userId: clerkUserId } = await auth();
  
  // Redirect to sign-in if not authenticated
  if (!clerkUserId) {
    redirect("/sign-in");
  }

  const authToken = await getAuthToken();
  
  // Check if user exists in Convex
  const dbUser = await fetchQuery(
    api.users.getUserByClerkId, 
    { clerkId: clerkUserId },
    { token: authToken }
  );

  // If user doesn't exist, they'll be created by the webhook or storeUser mutation
  // For now, redirect to onboarding to ensure user creation
  if (!dbUser) {
    redirect("/onboarding");
  }

  redirect("/");
}
