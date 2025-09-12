
export enum SkillStatus {
  NotStarted = 'لم يبدأ بعد',
  InProgress = 'قيد التعلم',
  NeedsPractice = 'يحتاج للممارسة',
  Mastered = 'متقن',
}

export interface Skill {
  id: string;
  name: string;
  status: SkillStatus;
  notes?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Student {
  id: number;
  name: string;
  avatarUrl: string;
  joinDate: string;
  examReady: boolean;
  skillCategories: SkillCategory[];
  instructorNotes?: string;
}