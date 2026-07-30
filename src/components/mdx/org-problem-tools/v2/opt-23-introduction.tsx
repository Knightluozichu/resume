"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-introduction",
  title: "导论 公司内的讨论流程：成为引导顾问",
  question: "怎样在会议前明确客户、目的、参与者、决策权限和证据边界？",
  concepts: [
    "导论 公司内的讨论流程：成为引导顾问",
    "委托合同",
    "会议目的",
    "参与者边界",
    "决策权限",
    "流程设计",
    "记录与保密",
  ],
  purposeOptions: ["澄清共同问题", "形成可选方案", "确认行动承诺"],
  participantOptions: ["委托负责人", "受影响成员", "流程引导者"],
  authorityOptions: ["委托人最终决定", "团队共同决定", "会上只提建议"],
  stages: [
    {
      name: "澄清委托",
      action:
        "在“导论 公司内的讨论流程：成为引导顾问”的澄清委托阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "设计参与合同",
      action:
        "围绕“研发负责人邀请引导者处理版本延期，但参会者尚不清楚会议是找原因、选方案，还是由负责人宣布既定决定。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "确认交付与回访",
      action:
        "保存委托确认单、会议目的、参与者与缺席者、决策权限、保密边界、议程、记录模板和回访日期。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“导论 公司内的讨论流程：成为引导顾问”的委托目的、受影响参与者和授权边界",
    "按澄清委托运行第一段，并保留原始输入与退出选择",
    "进入设计参与合同，公开分析结构、筛选标准和少数意见",
    "完成确认交付与回访，交付委托确认单、会议目的、参与者与缺席者、决策权限、保密边界、议程、记录模板和回访日期。",
  ],
  failureTrace: [
    "复用“导论 公司内的讨论流程：成为引导顾问”相同的场景、参与者和时间盒",
    "只注入流程故障：主持人既控制流程又暗中推动自己的内容答案",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“委托人、参与者和主持人对目的、权限与产物达成可检查共识”拒绝、缩小或重做结论",
  ],
  invariant: "委托人、参与者和主持人对目的、权限与产物达成可检查共识",
  fault: "主持人既控制流程又暗中推动自己的内容答案",
  artifact:
    "委托确认单、会议目的、参与者与缺席者、决策权限、保密边界、议程、记录模板和回访日期。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“导论 公司内的讨论流程：成为引导顾问”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“导论 公司内的讨论流程：成为引导顾问”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“导论 公司内的讨论流程：成为引导顾问”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“导论 公司内的讨论流程：成为引导顾问”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23IntroductionSessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23IntroductionParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23IntroductionEthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
