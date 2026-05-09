/**
 * Skill – Type definitions
 * SkillRecord  → raw document from /api/skills/raw (admin)
 * SkillInput   → CRUD payload
 * SkillMap     → grouped object from /api/skills  (client)
 */

export interface SkillRecord {
  id: string;
  category: string;
  items: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SkillInput {
  category: string;
  items: string[];
}

/** { Languages: ['TypeScript','Go'], Backend: ['NestJS', ...], ... } */
export type SkillMap = Record<string, string[]>;
