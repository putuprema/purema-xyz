import firebaseAdmin from "firebase-admin";
import { Project, ProjectForm } from "models/Project";
import { ProjectService } from "./interface";

/**
 * Handles projects data fetching and manipulation.
 * For use by backend components only.
 */
class ProjectServiceBackendImpl implements ProjectService {
  private readonly db: firebaseAdmin.firestore.Firestore;
  private projects: firebaseAdmin.firestore.CollectionReference<firebaseAdmin.firestore.DocumentData>;

  constructor(db: firebaseAdmin.firestore.Firestore) {
    this.db = db;

    this.projects = this.db.collection("projects").withConverter({
      toFirestore: (project: Project) => ({
        name: project.name,
        category: project.category,
        description: project.description,
        thumbnail: project.thumbnail,
        youtubeEmbedUrl: project.youtubeEmbedUrl,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
      }),
      fromFirestore: (snapshot) => {
        const project = snapshot.data() as Project;
        project.id = snapshot.id;
        return project;
      },
    });
  }

  async add(form: ProjectForm) {
    throw new Error("Method only available on client-side");
  }

  async getAll(): Promise<Project[]> {
    const result = await this.projects.orderBy("name", "asc").orderBy("category", "asc").limit(12).get();
    return result.docs.map((p) => p.data() as Project);
  }

  async get(id: string): Promise<Project> {
    const result = await this.projects.doc(id).get();
    if (!result.exists) {
      throw new Error("Project not found");
    }

    return result.data() as Project;
  }

  async update(id: string, form: ProjectForm) {
    throw new Error("Method only available on client-side");
  }

  async delete(id: string) {
    throw new Error("Method only available on client-side");
  }
}

export default ProjectServiceBackendImpl;
