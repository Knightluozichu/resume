import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "附录C 部分习题答案",
  label: "附录",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "重述前提",
    "写出不变量",
    "构造最小程序",
    "注入反例",
    "比较实现",
    "清理复盘",
  ],
  concepts: ["附录C 部分习题答案"],
} as const;

export function UapAppendixCExerciseSolutionsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapAppendixCExerciseSolutionsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapAppendixCExerciseSolutionsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
