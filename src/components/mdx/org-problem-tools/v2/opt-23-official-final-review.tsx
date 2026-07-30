"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《引导工具箱》综合复核：跨部门延期工作坊",
  question: "怎样用一个跨部门延期项目串联导论、四套装和后记？",
  concepts: [
    "导论 公司内的讨论流程：成为引导顾问",
    "第1章 入门套装：一定要掌握的8个工具",
    "第2章 初级套装：让思考更简单的13个工具",
    "第3章 中级套装：助你开会轻松又有条理的16个工具",
    "第4章 高级套装：提高执行力的12个工具",
    "后记",
  ],
  purposeOptions: ["澄清延期系统", "选择最小干预", "验收行动反馈"],
  participantOptions: ["交付团队", "依赖方代表", "项目委托人"],
  authorityOptions: ["负责人最终决定", "团队共同承诺", "升级事项另行授权"],
  stages: [
    {
      name: "澄清并建立安全",
      action:
        "在“《引导工具箱》综合复核：跨部门延期工作坊”的澄清并建立安全阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "共同建模与选择",
      action:
        "围绕“产品、研发、测试和运营围绕连续延期进行两次工作坊与一次回访，需要从委托澄清走到行动验收。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "执行回访与交接",
      action:
        "保存委托合同、两次工作坊议程、正式节点选择、参与轨迹、分析产物、决策理由、行动清单、回访结果和交接复盘。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“《引导工具箱》综合复核：跨部门延期工作坊”的委托目的、受影响参与者和授权边界",
    "按澄清并建立安全运行第一段，并保留原始输入与退出选择",
    "进入共同建模与选择，公开分析结构、筛选标准和少数意见",
    "完成执行回访与交接，交付委托合同、两次工作坊议程、正式节点选择、参与轨迹、分析产物、决策理由、行动清单、回访结果和交接复盘。",
  ],
  failureTrace: [
    "复用“《引导工具箱》综合复核：跨部门延期工作坊”相同的场景、参与者和时间盒",
    "只注入流程故障：分别演示49个工具，却没有一场端到端会议证明组合能力",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“同一项目从委托到行动跟进保留目的、参与、公平、决策与证据”拒绝、缩小或重做结论",
  ],
  invariant: "同一项目从委托到行动跟进保留目的、参与、公平、决策与证据",
  fault: "分别演示49个工具，却没有一场端到端会议证明组合能力",
  artifact:
    "委托合同、两次工作坊议程、正式节点选择、参与轨迹、分析产物、决策理由、行动清单、回访结果和交接复盘。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“《引导工具箱》综合复核：跨部门延期工作坊”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“《引导工具箱》综合复核：跨部门延期工作坊”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“《引导工具箱》综合复核：跨部门延期工作坊”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“《引导工具箱》综合复核：跨部门延期工作坊”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23OfficialFinalReviewSessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23OfficialFinalReviewParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23OfficialFinalReviewEthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
