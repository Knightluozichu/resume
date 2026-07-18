import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 5 Wallet Recovery",
  "Independent Key Generation",
  "Deterministic Key Generation",
  "Public Child Key Derivation",
  "Hierarchical Deterministic (HD) Key Generation (BIP32)",
  "Seeds and Recovery Codes",
] as const;

export function Mbt305WalletRecoveryFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 5 Wallet Recovery"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt305WalletRecoveryExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 5 Wallet Recovery"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt305WalletRecoveryEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 5 Wallet Recovery"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
