export class Skill {
  id: string = "";
  name: string;
  description: string;
  icon: string;

  constructor(name: string, description: string, icon: string) {
    this.name = name;
    this.description = description;
    this.icon = icon;
  }
}

export interface SkillForm {
  name: string;
  description: string;
  iconFile?: File;
}
