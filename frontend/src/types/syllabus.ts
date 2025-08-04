export interface SubTopic {
  name: string;
  sub: string[];
}

export interface SectionData {
  id: string;
  title: string;
  icon: string;
  description: string;
  topics: (string | SubTopic)[];
}

export interface SyllabusData {
  [key: string]: SectionData;
}
