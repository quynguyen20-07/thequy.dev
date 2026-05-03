export interface Highlight {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  note: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  tech: string[];
  createdAt: string;
  updatedAt: string;
}
