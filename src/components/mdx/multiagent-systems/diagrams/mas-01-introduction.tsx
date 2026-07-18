import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Introduction",
  "The Vision Thing",
  "Some Views of the Field",
  "Agents as a paradigm for software engineering",
  "Agents as a tool for understanding human societies",
  "Frequently Asked Questions (FAQ)",
] as const;

export function Mas01IntroductionModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#be123c"
      view="pipeline"
    />
  );
}

export function Mas01IntroductionGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#be123c"
      view="training"
    />
  );
}

export function Mas01IntroductionEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
