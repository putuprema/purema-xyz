import firebase from "firebase/app";
import { Project, ProjectForm } from "models/Project";
import slug from "limax";
import { ProjectService } from "./interface";
import { FileService } from "services/file/interface";

/**
 * Handles projects data fetching and manipulation.
 * For use by frontend components only.
 */
class ProjectServiceFrontendImpl implements ProjectService {
  private readonly db: firebase.firestore.Firestore;
  private readonly fileService: FileService;
  private projects: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(db: firebase.firestore.Firestore, fileService: FileService) {
    this.db = db;
    this.fileService = fileService;

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
      fromFirestore: (snapshot, options) => {
        const project = snapshot.data(options) as Project;
        project.id = snapshot.id;
        return project;
      },
    });
  }

  async add(form: ProjectForm) {
    const { name, category, description, demoUrl, githubUrl, thumbnailFile, youtubeEmbedUrl } = form;

    // check if existing project already exists
    const doc = await this.projects.where("name", "==", name).limit(1).get();
    if (!doc.empty) {
      throw new Error(`Project ${name} already exists`);
    }

    if (!thumbnailFile) {
      throw new Error("Project thumbnail file is required");
    }

    // upload thumbnail to firebase
    const downloadURL = await this.fileService.uploadFile("projects", thumbnailFile, slug(name));

    // save project to firestore
    await this.projects.add(new Project(name, category, description, downloadURL, demoUrl, githubUrl, youtubeEmbedUrl));
  }

  async getAll(): Promise<Project[]> {
    // const result = await this.projects.orderBy("name", "asc").orderBy("category", "asc").limit(12).get();
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
    const { name, category, description, demoUrl, githubUrl, thumbnailFile, youtubeEmbedUrl } = form;

    const project = await this.get(id);
    project.name = name;
    project.category = category;
    project.description = description;
    project.demoUrl = demoUrl;
    project.githubUrl = githubUrl;
    project.youtubeEmbedUrl = youtubeEmbedUrl;

    if (thumbnailFile) {
      // upload new thumbnail to firebase
      const downloadUrl = await this.fileService.uploadFile("projects", thumbnailFile, slug(name));
      project.thumbnail = downloadUrl;
    }

    // save changes to firebase
    await this.projects.doc(id).set(project);
  }

  async delete(id: string) {
    const project = await this.get(id);

    await this.projects.doc(id).delete();

    // delete thumbnail file from firebase
    await this.fileService.deleteFile(project.thumbnail);
  }
}

export default ProjectServiceFrontendImpl;
