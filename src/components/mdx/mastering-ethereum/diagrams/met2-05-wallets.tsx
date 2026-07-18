import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Overview of Wallet Technologies",
  "Nondeterministic (Random) Wallets",
  "Deterministic (Seeded) Wallets",
  "Hierarchical Deterministic Wallets (BIP-32/BIP-44)",
  "Seeds and Mnemonic Codes (BIP-39)",
  "Wallet Best Practices",
] as const;

export function Met205WalletsFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第5章：钱包"
      concepts={concepts}
      accent="#6d28d9"
      view="state"
    />
  );
}

export function Met205WalletsExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第5章：钱包"
      concepts={concepts}
      accent="#6d28d9"
      view="execution"
    />
  );
}

export function Met205WalletsEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第5章：钱包"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
