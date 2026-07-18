import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-exercise-answers",
  title: "练习的参考答案",
  nodes: ["题目边界", "个人预测", "参考路径", "差异定位", "独立复算"],
  focuses: ["参考答案", "前提", "推理步骤", "替代解", "复算证据"],
} as const;

export function Tpp20ExerciseAnswersSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20ExerciseAnswersFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20ExerciseAnswersEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
