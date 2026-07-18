import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Logical Foundations",
  "Logics for Knowledge and Belief",
  "Possible-Worlds Semantics for Modal Logics",
  "Normal Modal Logics",
  "Normal Modal Logics as Epistemic Logics",
  "Logical Omniscience",
] as const;

export function Mas17LogicalFoundationsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 17 Logical Foundations"
      concepts={concepts}
      accent="#4d7c0f"
      view="pipeline"
    />
  );
}

export function Mas17LogicalFoundationsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 17 Logical Foundations"
      concepts={concepts}
      accent="#4d7c0f"
      view="training"
    />
  );
}

export function Mas17LogicalFoundationsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 17 Logical Foundations"
      concepts={concepts}
      accent="#4d7c0f"
      view="evidence"
    />
  );
}
