import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 1 Introduction",
  "History of Bitcoin",
  "Getting Started",
  "Choosing a Bitcoin Wallet",
  "Types of Bitcoin wallets",
  "Full node versus Lightweight",
] as const;

export function Mbt301IntroductionFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt301IntroductionExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt301IntroductionEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 1 Introduction"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
