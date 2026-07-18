import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 3 Bitcoin Core: The Reference Implementation",
  "From Bitcoin to Bitcoin Core",
  "Bitcoin Development Environment",
  "Compiling Bitcoin Core from the Source Code",
  "Selecting a Bitcoin Core Release",
  "Configuring the Bitcoin Core Build",
] as const;

export function Mbt303BitcoinCoreFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 3 Bitcoin Core: The Reference Implementation"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt303BitcoinCoreExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 3 Bitcoin Core: The Reference Implementation"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt303BitcoinCoreEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 3 Bitcoin Core: The Reference Implementation"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
