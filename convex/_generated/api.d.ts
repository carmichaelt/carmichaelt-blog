/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as fields_index from "../fields/index.js";
import type * as fields_posts from "../fields/posts.js";
import type * as fields_projects from "../fields/projects.js";
import type * as fields_users from "../fields/users.js";
import type * as http from "../http.js";
import type * as posts from "../posts.js";
import type * as projects from "../projects.js";
import type * as tables_posts from "../tables/posts.js";
import type * as tables_projects from "../tables/projects.js";
import type * as tables_users from "../tables/users.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  "fields/index": typeof fields_index;
  "fields/posts": typeof fields_posts;
  "fields/projects": typeof fields_projects;
  "fields/users": typeof fields_users;
  http: typeof http;
  posts: typeof posts;
  projects: typeof projects;
  "tables/posts": typeof tables_posts;
  "tables/projects": typeof tables_projects;
  "tables/users": typeof tables_users;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
