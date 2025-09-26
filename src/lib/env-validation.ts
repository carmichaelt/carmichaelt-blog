import { z } from 'zod'

const envSchema = z.object({
  CONVEX_DEPLOYMENT: z.string(),
  NEXT_PUBLIC_CONVEX_URL: z.url(),
  CLERK_JWT_ISSUER_DOMAIN: z.url(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)