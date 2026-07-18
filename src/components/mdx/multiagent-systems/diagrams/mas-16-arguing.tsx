import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Arguing",
  "Types of Argument",
  "Abstract Argumentation",
  "Preferred Extensions",
  "Credulous and Sceptical Acceptance",
  "Preferences in Abstract Argument Systems",
] as const;

export function Mas16ArguingModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 16 Arguing"
      concepts={concepts}
      accent="#be123c"
      view="pipeline"
    />
  );
}

export function Mas16ArguingGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 16 Arguing"
      concepts={concepts}
      accent="#be123c"
      view="training"
    />
  );
}

export function Mas16ArguingEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 16 Arguing"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
