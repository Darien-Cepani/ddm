export interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  area: string;
  status: 'completed' | 'new';
  year?: string;
  features: string[];
  desc: { sq: string; en: string };
  spec: {
    structure: string;
    facade: string;
    energy: string;
  }
}
