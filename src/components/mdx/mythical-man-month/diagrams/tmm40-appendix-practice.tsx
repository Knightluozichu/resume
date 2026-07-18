import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-appendix-practice",
  title: "附录：人月落地实战体验",
  nodes: ["原书命题", "本土情境", "实践动作", "结果证据", "迁移结论"],
  focuses: ["名家经验", "实践案例", "评论对照", "读者反思", "外推限制"],
} as const;

export function Tmm40AppendixPracticeDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40AppendixPracticeScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40AppendixPracticeEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
