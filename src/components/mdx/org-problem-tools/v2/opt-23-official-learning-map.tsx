"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《引导工具箱》学习地图：从委托到行动复盘",
  question:
    "怎样按导论、8/13/16/12工具套装和后记安排能力递进，而不是按自造主题重排49个工具？",
  concepts: [
    "导论 公司内的讨论流程：成为引导顾问",
    "第1章 入门套装：一定要掌握的8个工具",
    "第2章 初级套装：让思考更简单的13个工具",
    "第3章 中级套装：助你开会轻松又有条理的16个工具",
    "第4章 高级套装：提高执行力的12个工具",
    "后记",
  ],
  purposeOptions: ["核定学习边界", "安排能力递进", "验收迁移能力"],
  participantOptions: ["培训负责人", "业务参与者", "独立复核者"],
  authorityOptions: ["目录决定范围", "委托人定目标", "团队定行动"],
  stages: [
    {
      name: "核定目录分母",
      action:
        "在“《引导工具箱》学习地图：从委托到行动复盘”的核定目录分母阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "建立阶段坐标",
      action:
        "围绕“培训负责人要为跨部门改善项目设计六周学习路线，参与者既要能选工具，也要能说明为什么此刻不用另一个工具。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "组合端到端证据",
      action:
        "保存59节点映射表、六单元学习顺序、工具选择理由、跨单元案例轨迹、遗漏检查和综合复盘。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“《引导工具箱》学习地图：从委托到行动复盘”的委托目的、受影响参与者和授权边界",
    "按核定目录分母运行第一段，并保留原始输入与退出选择",
    "进入建立阶段坐标，公开分析结构、筛选标准和少数意见",
    "完成组合端到端证据，交付59节点映射表、六单元学习顺序、工具选择理由、跨单元案例轨迹、遗漏检查和综合复盘。",
  ],
  failureTrace: [
    "复用“《引导工具箱》学习地图：从委托到行动复盘”相同的场景、参与者和时间盒",
    "只注入流程故障：把49个工具按自创八类重新编排，丢失原书套装层级与前后依赖",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“59个正式目录节点各有唯一归属、使用阶段和复核边界”拒绝、缩小或重做结论",
  ],
  invariant: "59个正式目录节点各有唯一归属、使用阶段和复核边界",
  fault: "把49个工具按自创八类重新编排，丢失原书套装层级与前后依赖",
  artifact:
    "59节点映射表、六单元学习顺序、工具选择理由、跨单元案例轨迹、遗漏检查和综合复盘。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“《引导工具箱》学习地图：从委托到行动复盘”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“《引导工具箱》学习地图：从委托到行动复盘”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“《引导工具箱》学习地图：从委托到行动复盘”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“《引导工具箱》学习地图：从委托到行动复盘”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23OfficialLearningMapSessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23OfficialLearningMapParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23OfficialLearningMapEthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
