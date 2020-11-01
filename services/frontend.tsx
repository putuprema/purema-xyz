import { firestore, storage } from "config/firebase";
import React, { useState } from "react";
import FileServiceFrontendImpl from "./file/file-frontend.service";
import { FileService } from "./file/interface";
import { ProjectService } from "./project/interface";
import ProjectServiceFrontendImpl from "./project/project-frontend.service";
import { SkillService } from "./skill/interface";
import SkillServiceFrontendImpl from "./skill/skill-frontend.service";

export interface ServicesContextInterface {
  fileService: FileService;
  skillService: SkillService;
  projectService: ProjectService;
}

const bootstrapFrontendServices = (): ServicesContextInterface => {
  const fileService = new FileServiceFrontendImpl(storage);
  const skillService = new SkillServiceFrontendImpl(firestore, fileService);
  const projectService = new ProjectServiceFrontendImpl(firestore, fileService);

  return { fileService, skillService, projectService };
};

/**
 * This React context serves as DI (Dependency Injection)
 * container for all required services to be accessed
 * by components that need them.
 */
export const ServiceContext = React.createContext<ServicesContextInterface>(bootstrapFrontendServices());

export const ServiceProvider: React.FC = ({ children }) => {
  const [fileService] = useState<FileService>(new FileServiceFrontendImpl(storage));
  const [skillService] = useState<SkillService>(new SkillServiceFrontendImpl(firestore, fileService));
  const [projectService] = useState<ProjectService>(new ProjectServiceFrontendImpl(firestore, fileService));

  return <ServiceContext.Provider value={{ fileService, skillService, projectService }}>{children}</ServiceContext.Provider>;
};
