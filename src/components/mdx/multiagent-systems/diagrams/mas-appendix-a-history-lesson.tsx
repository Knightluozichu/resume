import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "领域历史",
  "概念谱系",
  "研究转折",
  "来源日期",
  "版本语境",
  "历史边界",
] as const;

export function MasAppendixAHistoryLessonModelLab() {
  return (
    <OfficialMasBookLab
      title="Appendix A -- A History Lesson"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function MasAppendixAHistoryLessonGameLab() {
  return (
    <OfficialMasBookLab
      title="Appendix A -- A History Lesson"
      concepts={concepts}
      accent="#0369a1"
      view="training"
    />
  );
}

export function MasAppendixAHistoryLessonEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Appendix A -- A History Lesson"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
