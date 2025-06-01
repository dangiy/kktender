export interface Candidate {
  id: string;
  scholarNumber: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  graduationYear: number;
  experience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  achievements: string[];
  score?: number;
  rank?: number;
} 