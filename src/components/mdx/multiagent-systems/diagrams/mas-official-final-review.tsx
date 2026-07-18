import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = ["感知行动", "通信", "协作", "博弈", "机制", "验证"] as const;

export function MasOfficialFinalReviewModelLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版总复习"
      concepts={concepts}
      accent="#4338ca"
      view="pipeline"
    />
  );
}

export function MasOfficialFinalReviewGameLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版总复习"
      concepts={concepts}
      accent="#4338ca"
      view="training"
    />
  );
}

export function MasOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="An Introduction to MultiAgent Systems 第二版总复习"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
