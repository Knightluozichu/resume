"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-chapter-03",
  title: "第3章 中级套装：助你开会轻松又有条理的16个工具",
  question:
    "怎样用16个中级工具设计大群体参与、结构化分析、战略视野与清晰表达？",
  concepts: [
    "第3章 中级套装：助你开会轻松又有条理的16个工具",
    "团队建设：提高团队集体感",
    "三言两语带进及带离：提高开会时的集中力",
    "W/C表格：引导员工承担义务",
    "世界咖啡：人多也能互相讨论、互相深入",
    "二分重构法：要转换视角",
    "逻辑树：巨细无遗地解决问题",
    "鱼骨图（石川图表）：利用鱼骨图系统地解决问题",
    "思维导图：大家一起发散思维",
    "检查已做到的事：自然而然地采取下一步行动",
    "容器：想改变规模时不妨用用看",
    "领导融合会：缩小领导与下属间的距离",
    "乔哈里资讯窗训练：透过他人眼中的自己了解自我，完成飞跃",
    "成员的使用说明书：改变氛围",
    "机会图：共享战略视野",
    "PREP法：有条理地去听、去说",
    "n/5投票法：迅速筛选后再进行下一步讨论",
    "小专栏：促进参与者发言",
  ],
  purposeOptions: ["扩大参与覆盖", "建立问题结构", "形成透明收敛"],
  participantOptions: ["跨地域成员", "领域专家", "决策观察者"],
  authorityOptions: ["投票只做筛选", "负责人说明取舍", "团队共同承诺"],
  stages: [
    {
      name: "建立大群体参与",
      action:
        "在“第3章 中级套装：助你开会轻松又有条理的16个工具”的建立大群体参与阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "结构化拆解与反馈",
      action:
        "围绕“120人的事业群要讨论协作障碍，职位、专业和地域差异显著，任何单一全体发言或简单投票都会压低边缘信息。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "表达筛选并承诺",
      action:
        "保存分桌记录、逻辑树或鱼骨图、匿名反馈、关系边界、战略机会图、投票前提、少数意见和下一步承诺。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“第3章 中级套装：助你开会轻松又有条理的16个工具”的委托目的、受影响参与者和授权边界",
    "按建立大群体参与运行第一段，并保留原始输入与退出选择",
    "进入结构化拆解与反馈，公开分析结构、筛选标准和少数意见",
    "完成表达筛选并承诺，交付分桌记录、逻辑树或鱼骨图、匿名反馈、关系边界、战略机会图、投票前提、少数意见和下一步承诺。",
  ],
  failureTrace: [
    "复用“第3章 中级套装：助你开会轻松又有条理的16个工具”相同的场景、参与者和时间盒",
    "只注入流程故障：n/5投票前未处理关联利益与信息不对称，却把票数当作事实",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“参与机会、信息来源、分析结构和投票权透明且可复核”拒绝、缩小或重做结论",
  ],
  invariant: "参与机会、信息来源、分析结构和投票权透明且可复核",
  fault: "n/5投票前未处理关联利益与信息不对称，却把票数当作事实",
  artifact:
    "分桌记录、逻辑树或鱼骨图、匿名反馈、关系边界、战略机会图、投票前提、少数意见和下一步承诺。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“第3章 中级套装：助你开会轻松又有条理的16个工具”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“第3章 中级套装：助你开会轻松又有条理的16个工具”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“第3章 中级套装：助你开会轻松又有条理的16个工具”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“第3章 中级套装：助你开会轻松又有条理的16个工具”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23Chapter03SessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23Chapter03ParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23Chapter03EthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
