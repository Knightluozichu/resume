import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 4 Keys and Addresses",
  "Public Key Cryptography",
  "Private Keys",
  "Elliptic Curve Cryptography Explained",
  "Public Keys",
  "Output and Input Scripts",
] as const;

export function Mbt304KeysAddressesFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 4 Keys and Addresses"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt304KeysAddressesExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 4 Keys and Addresses"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt304KeysAddressesEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 4 Keys and Addresses"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
