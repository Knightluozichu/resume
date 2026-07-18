import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Keys and Addresses",
  "PKC and Cryptocurrency",
  "Private Keys",
  "Public Keys",
  "Elliptic Curve Cryptography Explained",
  "Elliptic Curve Arithmetic Operations",
] as const;

export function Met204CryptographyFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第4章：密码学"
      concepts={concepts}
      accent="#7c3aed"
      view="state"
    />
  );
}

export function Met204CryptographyExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第4章：密码学"
      concepts={concepts}
      accent="#7c3aed"
      view="execution"
    />
  );
}

export function Met204CryptographyEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第4章：密码学"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
