import { Project, ProjectForm } from "models/Project";

export interface ProjectService {
  /**
   * Add new project
   * @param form `ProjectForm`
   */
  add(form: ProjectForm): Promise<void>;
  /**
   * Get all projects
   */
  getAll(): Promise<Project[]>;
  /**
   * Get project by id
   * @param id Project id
   */
  get(id: string): Promise<Project>;
  /**
   * Update project
   * @param id Project id
   * @param form `ProjectForm`
   */
  update(id: string, form: ProjectForm): Promise<void>;
  /**
   * Delete project
   * @param id Project id
   */
  delete(id: string): Promise<void>;
}
