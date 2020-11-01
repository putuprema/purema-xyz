import { firebaseAdmin } from "config/firebase-admin";
import ProjectServiceBackendImpl from "./project/project-backend.service";
import SkillServiceBackendImpl from "./skill/skill-backend.service";

/**
 * Bootstrap all services required by backend components
 */
export const bootstrapBackendServices = () => {
  const skillService = new SkillServiceBackendImpl(firebaseAdmin.firestore());
  const projectService = new ProjectServiceBackendImpl(firebaseAdmin.firestore());

  return { skillService, projectService };
};
