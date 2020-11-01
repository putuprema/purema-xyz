export class Project {
  id: string = "";
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  youtubeEmbedUrl?: string;
  demoUrl: string;
  githubUrl: string;

  constructor(name: string, category: string, description: string, thumbnail: string, demoUrl: string, githubUrl: string, youtubeEmbedUrl?: string) {
    this.name = name;
    this.category = category;
    this.description = description;
    this.thumbnail = thumbnail;
    this.demoUrl = demoUrl;
    this.githubUrl = githubUrl;
    this.youtubeEmbedUrl = youtubeEmbedUrl;
  }
}

export interface ProjectForm {
  name: string;
  category: string;
  description: string;
  thumbnailFile?: File;
  demoUrl: string;
  githubUrl: string;
  youtubeEmbedUrl?: string;
}
