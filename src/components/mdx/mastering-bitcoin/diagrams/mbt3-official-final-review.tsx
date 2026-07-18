import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Preface",
  "Chapter 1 Introduction",
  "Chapter 2 How Bitcoin Works",
  "Chapter 3 Bitcoin Core: The Reference Implementation",
  "Chapter 4 Keys and Addresses",
  "Chapter 5 Wallet Recovery",
] as const;

export function Mbt3OfficialFinalReviewFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版全书总复习"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3OfficialFinalReviewExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版全书总复习"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3OfficialFinalReviewEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版全书总复习"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
