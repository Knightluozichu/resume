import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = ["Appendix C Bitcoin Improvement Proposals"] as const;

export function Mbt3AppendixCBipsFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix C Bitcoin Improvement Proposals"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt3AppendixCBipsExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix C Bitcoin Improvement Proposals"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt3AppendixCBipsEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Appendix C Bitcoin Improvement Proposals"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
