import firebase from "firebase/app";
import { Skill, SkillForm } from "models/Skill";
import slug from "limax";
import { SkillService } from "./interface";
import { FileService } from "services/file/interface";

/**
 * Handles skill data fetching and manipulation.
 * For use by frontend components only.
 */
class SkillServiceFrontendImpl implements SkillService {
  private readonly db: firebase.firestore.Firestore;
  private readonly fileService: FileService;
  private skills: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor(db: firebase.firestore.Firestore, fileService: FileService) {
    this.db = db;
    this.fileService = fileService;

    this.skills = this.db.collection("skills").withConverter({
      toFirestore: (skill: Skill) => ({
        name: skill.name,
        description: skill.description,
        icon: skill.icon,
      }),
      fromFirestore: (snapshot, options) => {
        const skill = snapshot.data(options) as Skill;
        skill.id = snapshot.id;
        return skill;
      },
    });
  }

  async add(form: SkillForm) {
    const { name, description, iconFile } = form;

    // check if existing skill already exists
    const doc = await this.skills.where("name", "==", name).limit(1).get();
    if (!doc.empty) {
      throw new Error(`Skill ${name} already exists`);
    }

    if (!iconFile) {
      throw new Error("Skill icon file is required");
    }

    // upload icon to firebase
    const downloadURL = await this.fileService.uploadFile("skills", iconFile, slug(name));

    // save skill to firestore
    await this.skills.add(new Skill(name, description, downloadURL));
  }

  async getAll(): Promise<Skill[]> {
    const result = await this.skills.orderBy("name", "asc").limit(12).get();
    return result.docs.map((s) => s.data() as Skill);
  }

  async get(id: string): Promise<Skill> {
    const result = await this.skills.doc(id).get();
    if (!result.exists) {
      throw new Error("Skill not found");
    }

    return result.data() as Skill;
  }

  async update(id: string, form: SkillForm) {
    const { name, description, iconFile } = form;

    const skill = await this.get(id);
    skill.name = name;
    skill.description = description;

    if (iconFile) {
      // upload new icon to firebase
      const downloadURL = await this.fileService.uploadFile("skills", iconFile, slug(name));
      skill.icon = downloadURL;
    }

    // save changes to firebase
    await this.skills.doc(id).set(skill);
  }

  async delete(id: string) {
    const skill = await this.get(id);

    await this.skills.doc(id).delete();

    // delete icon file from firebase
    await this.fileService.deleteFile(skill.icon);
  }
}

export default SkillServiceFrontendImpl;
