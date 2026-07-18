import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Appendix B Errata to the Bitcoin Whitepaper",
  "Abstract",
  "Transactions",
  "Proof of Work",
  "Reclaiming Disk Space",
  "Simplified Payment Verification",
] as const;

export function Mbt3AppendixBWhitepaperErrataFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix B Errata to the Bitcoin Whitepaper"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3AppendixBWhitepaperErrataExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix B Errata to the Bitcoin Whitepaper"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3AppendixBWhitepaperErrataEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix B Errata to the Bitcoin Whitepaper"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
