import firebaseAdmin from "firebase-admin";
import { Skill, SkillForm } from "models/Skill";
import { SkillService } from "./interface";

/**
 * Handles skill data fetching and manipulation.
 * For use by backend components only.
 */
class SkillServiceBackendImpl implements SkillService {
  private readonly db: firebaseAdmin.firestore.Firestore;
  private skills: firebaseAdmin.firestore.CollectionReference<firebaseAdmin.firestore.DocumentData>;

  constructor(db: firebaseAdmin.firestore.Firestore) {
    this.db = db;

    this.skills = this.db.collection("skills").withConverter({
      toFirestore: (skill: Skill) => ({
        name: skill.name,
        description: skill.description,
        icon: skill.icon,
      }),
      fromFirestore: (snapshot) => {
        const skill = snapshot.data() as Skill;
        skill.id = snapshot.id;
        return skill;
      },
    });
  }

  async add(form: SkillForm) {
    throw new Error("Method only available on client-side");
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
    throw new Error("Method only available on client-side");
  }

  async delete(id: string) {
    throw new Error("Method only available on client-side");
  }
}

export default SkillServiceBackendImpl;
