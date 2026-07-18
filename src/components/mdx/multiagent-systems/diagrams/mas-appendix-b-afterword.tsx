import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "后记",
  "未决问题",
  "研究假设",
  "最小反例",
  "实验合同",
  "延伸路线",
] as const;

export function MasAppendixBAfterwordModelLab() {
  return (
    <OfficialMasBookLab
      title="Appendix B -- Afterword"
      concepts={concepts}
      accent="#c2410c"
      view="pipeline"
    />
  );
}

export function MasAppendixBAfterwordGameLab() {
  return (
    <OfficialMasBookLab
      title="Appendix B -- Afterword"
      concepts={concepts}
      accent="#c2410c"
      view="training"
    />
  );
}

export function MasAppendixBAfterwordEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Appendix B -- Afterword"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
