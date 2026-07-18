import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "共享本体",
  "通信",
  "合作",
  "协调",
  "方法论",
  "应用",
] as const;

export function MasPart03CommunicationCooperationModelLab() {
  return (
    <OfficialMasBookLab
      title="Part III Communication and Cooperation"
      concepts={concepts}
      accent="#15803d"
      view="pipeline"
    />
  );
}

export function MasPart03CommunicationCooperationGameLab() {
  return (
    <OfficialMasBookLab
      title="Part III Communication and Cooperation"
      concepts={concepts}
      accent="#15803d"
      view="training"
    />
  );
}

export function MasPart03CommunicationCooperationEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Part III Communication and Cooperation"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
