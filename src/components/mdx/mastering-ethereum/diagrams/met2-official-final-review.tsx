import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Preface",
  "Chapter 1. What Is Ethereum?",
  "Chapter 2. Ethereum Basics",
  "Chapter 3. Ethereum Nodes",
  "Chapter 4. Cryptography",
  "Chapter 5: Wallets",
] as const;

export function Met2OfficialFinalReviewFlowLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版全书总复习"
      concepts={concepts}
      accent="#7c3aed"
      view="state"
    />
  );
}

export function Met2OfficialFinalReviewExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版全书总复习"
      concepts={concepts}
      accent="#7c3aed"
      view="execution"
    />
  );
}

export function Met2OfficialFinalReviewEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版全书总复习"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
