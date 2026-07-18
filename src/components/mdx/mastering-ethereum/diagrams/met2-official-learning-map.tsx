import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Preface",
  "Chapter 1. What Is Ethereum?",
  "Chapter 2. Ethereum Basics",
  "Chapter 3. Ethereum Nodes",
  "Chapter 4. Cryptography",
  "Chapter 5: Wallets",
] as const;

export function Met2OfficialLearningMapFlowLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="state"
    />
  );
}

export function Met2OfficialLearningMapExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="execution"
    />
  );
}

export function Met2OfficialLearningMapEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="《Mastering Ethereum》第2版权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
