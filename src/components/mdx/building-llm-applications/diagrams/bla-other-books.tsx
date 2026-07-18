import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "延伸阅读",
  "知识缺口",
  "来源等级",
  "版本日期",
  "学习产物",
  "停止条件",
] as const;

export function BlaOtherBooksFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Other Books You May Enjoy"
      concepts={concepts}
      accent="#166534"
      view="pipeline"
    />
  );
}

export function BlaOtherBooksExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Other Books You May Enjoy"
      concepts={concepts}
      accent="#166534"
      view="training"
    />
  );
}

export function BlaOtherBooksEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Other Books You May Enjoy"
      concepts={concepts}
      accent="#166534"
      view="evidence"
    />
  );
}
