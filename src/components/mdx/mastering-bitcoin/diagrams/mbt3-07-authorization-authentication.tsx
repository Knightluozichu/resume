import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 7 Authorization and Authentication",
  "Transaction Scripts and Script Language",
  "Turing Incompleteness",
  "Stateless Verification",
  "Script Construction",
  "The script execution stack",
] as const;

export function Mbt307AuthorizationAuthenticationFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 7 Authorization and Authentication"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt307AuthorizationAuthenticationExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 7 Authorization and Authentication"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt307AuthorizationAuthenticationEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 7 Authorization and Authentication"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
