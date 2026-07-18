import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Preface",
  "Writing the Bitcoin Book",
  "Intended Audience",
  "Why Are There Bugs on the Cover?",
  "Conventions Used in This Book",
  "Code Examples",
] as const;

export function Mbt3PrefaceFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Preface"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3PrefaceExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Preface"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3PrefaceEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Preface"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
