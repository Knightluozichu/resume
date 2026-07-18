import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_PromptingRoles
const officialQualityProps = {
  title: "提示工程与角色设定",
  stages: [
    "提示工程与角色设定",
    "同样一句吩咐，会下指令和不会下，天差地别",
    "第一味：给小特发「岗位说明书」——角色设定",
    "第二味与全貌：提示的三层结构",
    "第三味：给几个范例,让它照葫芦画瓢——few-shot 示例",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevPromptingRolesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevPromptingRolesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevPromptingRolesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
