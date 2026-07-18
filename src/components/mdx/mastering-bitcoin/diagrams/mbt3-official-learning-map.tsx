import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Preface",
  "Chapter 1 Introduction",
  "Chapter 2 How Bitcoin Works",
  "Chapter 3 Bitcoin Core: The Reference Implementation",
  "Chapter 4 Keys and Addresses",
  "Chapter 5 Wallet Recovery",
] as const;

export function Mbt3OfficialLearningMapFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版权威学习地图"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3OfficialLearningMapExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版权威学习地图"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3OfficialLearningMapEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="《Mastering Bitcoin》第3版权威学习地图"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
