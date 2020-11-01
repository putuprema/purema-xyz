import { Skill, SkillForm } from "models/Skill";

export interface SkillService {
  /**
   * Adds new skill
   * @param form `SkillForm`
   */
  add(form: SkillForm): Promise<void>;
  /**
   * Get all skills
   */
  getAll(): Promise<Skill[]>;
  /**
   * Get skill by its id
   * @param id Skill ID from Firebase
   */
  get(id: string): Promise<Skill>;
  /**
   * Update skill
   * @param id Skill id
   * @param form `SkillForm`
   */
  update(id: string, form: SkillForm): Promise<void>;
  /**
   * Deletes a skill
   * @param id Skill ID from Firebase
   */
  delete(id: string): Promise<void>;
}
