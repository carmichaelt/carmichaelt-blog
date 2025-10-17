/**
 * Central export for all field definitions
 * This makes it easy to import field definitions across the application
 */

// Post field exports
export {
  postFields,
  postFieldNames,
  postCoreFields,
  postContentFields,
  postMetadataFields,
} from "./posts";

// User field exports
export {
  userFields,
  userFieldNames,
  userCoreFields,
  userProfileFields,
  userSocialFields,
  userSystemFields,
} from "./users";

// Project field exports
export {
  projectFields,
  projectFieldNames,
  projectCoreFields,
  projectDetailsFields,
  projectLinksFields,
  projectSystemFields,
  type ProjectStatus,
} from "./projects";
