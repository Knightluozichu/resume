import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "领域愿景",
  "软件范式",
  "社会视角",
  "自主性",
  "交互",
  "研究边界",
] as const;

export function MasPart01SettingSceneModelLab() {
  return (
    <OfficialMasBookLab
      title="Part I Setting the Scene"
      concepts={concepts}
      accent="#1d4ed8"
      view="pipeline"
    />
  );
}

export function MasPart01SettingSceneGameLab() {
  return (
    <OfficialMasBookLab
      title="Part I Setting the Scene"
      concepts={concepts}
      accent="#1d4ed8"
      view="training"
    />
  );
}

export function MasPart01SettingSceneEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Part I Setting the Scene"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
