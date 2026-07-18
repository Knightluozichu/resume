import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Appendix A The Bitcoin Whitepaper by Satoshi Nakamoto",
  "Bitcoin - A Peer-to-Peer Electronic Cash System",
  "Introduction",
  "Transactions",
  "Timestamp Server",
  "Proof-of-Work",
] as const;

export function Mbt3AppendixAWhitepaperFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix A The Bitcoin Whitepaper by Satoshi Nakamoto"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3AppendixAWhitepaperExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix A The Bitcoin Whitepaper by Satoshi Nakamoto"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3AppendixAWhitepaperEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix A The Bitcoin Whitepaper by Satoshi Nakamoto"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
