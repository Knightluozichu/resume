import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Bargaining",
  "Negotiation Parameters",
  "Bargaining for Resource Division",
  "Patient Players",
  "Impatient Players",
  "Negotiation Decision Functions",
] as const;

export function Mas15BargainingModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 15 Bargaining"
      concepts={concepts}
      accent="#1d4ed8"
      view="pipeline"
    />
  );
}

export function Mas15BargainingGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 15 Bargaining"
      concepts={concepts}
      accent="#1d4ed8"
      view="training"
    />
  );
}

export function Mas15BargainingEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 15 Bargaining"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
