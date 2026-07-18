import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-first-edition-preface",
  title: "第一版前言",
  nodes: ["技艺关注", "主动思考", "实践观察", "责任承担", "持续改进"],
  focuses: ["关注技艺", "思考工作", "经验来源", "读者责任", "持续评估"],
} as const;

export function Tpp20FirstEditionPrefaceSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20FirstEditionPrefaceFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20FirstEditionPrefaceEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
