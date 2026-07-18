import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "全书主线",
  "证据等级",
  "形式结论",
  "工程结论",
  "开放问题",
  "复核",
] as const;

export function MasCodaModelLab() {
  return (
    <OfficialMasBookLab
      title="Coda"
      concepts={concepts}
      accent="#7e22ce"
      view="pipeline"
    />
  );
}

export function MasCodaGameLab() {
  return (
    <OfficialMasBookLab
      title="Coda"
      concepts={concepts}
      accent="#7e22ce"
      view="training"
    />
  );
}

export function MasCodaEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Coda"
      concepts={concepts}
      accent="#7e22ce"
      view="evidence"
    />
  );
}
