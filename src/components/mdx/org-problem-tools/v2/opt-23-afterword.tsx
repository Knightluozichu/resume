"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-afterword",
  title: "后记",
  question: "怎样证明工具箱已经变成可适配、可复盘、可交接的流程能力？",
  concepts: [
    "后记",
    "工具适配",
    "流程复盘",
    "伦理边界",
    "证据包",
    "持续改进",
    "能力交接",
  ],
  purposeOptions: ["复盘工具适配", "识别能力缺口", "完成安全交接"],
  participantOptions: ["原引导者", "接任引导者", "项目委托人"],
  authorityOptions: ["委托人验收结果", "同行复核流程", "团队确认后续行动"],
  stages: [
    {
      name: "回看选择依据",
      action: "在“后记”的回看选择依据阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "复盘结果与伦理",
      action:
        "围绕“内部引导师完成三个月实践后要把项目交给同事，必须说明每次选择、放弃与调整工具的理由，而非只交付活动清单。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "形成交接资产",
      action:
        "保存工具选择日志、未采用理由、参与者反馈、伦理事件、行动结果、复盘结论、能力缺口和交接清单。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“后记”的委托目的、受影响参与者和授权边界",
    "按回看选择依据运行第一段，并保留原始输入与退出选择",
    "进入复盘结果与伦理，公开分析结构、筛选标准和少数意见",
    "完成形成交接资产，交付工具选择日志、未采用理由、参与者反馈、伦理事件、行动结果、复盘结论、能力缺口和交接清单。",
  ],
  failureTrace: [
    "复用“后记”相同的场景、参与者和时间盒",
    "只注入流程故障：把会用的工具越多等同于专业，堆叠活动却没有决策和跟进",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“工具选择由目的、群体与风险决定，复盘能解释选择及结果”拒绝、缩小或重做结论",
  ],
  invariant: "工具选择由目的、群体与风险决定，复盘能解释选择及结果",
  fault: "把会用的工具越多等同于专业，堆叠活动却没有决策和跟进",
  artifact:
    "工具选择日志、未采用理由、参与者反馈、伦理事件、行动结果、复盘结论、能力缺口和交接清单。",
  riskCases: [
    {
      label: "角色冲突",
      detail: "在“后记”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail: "在“后记”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail: "在“后记”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail: "在“后记”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23AfterwordSessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23AfterwordParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23AfterwordEthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
