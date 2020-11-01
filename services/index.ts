import { firestore, storage } from "config/firebase";
import React from "react";
import FileService from "./file.service";
import ProjectService from "./project.service";
import SkillService from "./skill.service";

export interface ServicesContextInterface {
  fileService: FileService;
  skillService: SkillService;
  projectService: ProjectService;
}

/**
 * Bootstrap all required services
 */
export const bootstrapServices = (): ServicesContextInterface => {
  const fileService = new FileService(storage);
  const skillService = new SkillService(firestore, fileService);
  const projectService = new ProjectService(firestore, fileService);

  return { fileService, skillService, projectService };
};

/**
 * This React context serves as DI (Dependency Injection)
 * container for all required services to be accessed
 * by components that need them.
 */
export const Services = React.createContext<ServicesContextInterface>(bootstrapServices());
