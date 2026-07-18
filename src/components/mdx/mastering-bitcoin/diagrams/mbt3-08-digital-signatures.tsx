import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 8 Digital Signatures",
  "How Digital Signatures Work",
  "Creating a Digital Signature",
  "Verifying the Signature",
  "Signature Hash Types (SIGHASH)",
  "Schnorr Signatures",
] as const;

export function Mbt308DigitalSignaturesFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 8 Digital Signatures"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt308DigitalSignaturesExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 8 Digital Signatures"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt308DigitalSignaturesEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 8 Digital Signatures"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
