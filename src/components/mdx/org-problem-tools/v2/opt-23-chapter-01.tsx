"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-chapter-01",
  title: "第1章 入门套装：一定要掌握的8个工具",
  question: "怎样用8个入门工具建立安全开场、发散、聚类、目标和行动闭环？",
  concepts: [
    "第1章 入门套装：一定要掌握的8个工具",
    "破冰Ⅰ：和初次见面的人愉快聊天",
    "破冰（打破隔阂的游戏）：用脸猜拳决胜负",
    "基本规则：一开始就定好规则，更容易展开讨论",
    "停车场（PA）：这样讨论就不会跑题",
    "头脑风暴：头脑风暴要这样进行才会顺利",
    "亲和图：分组促进新想法的产生",
    "目标树：共享目标，提高团队合作能力",
    "4W1H：确认行动项目并养成习惯",
    "小专栏：便利的引导小工具和大工具",
  ],
  purposeOptions: ["让成员安全进入", "产生并组织想法", "形成首轮行动"],
  participantOptions: ["新成员", "业务负责人", "会议记录者"],
  authorityOptions: ["团队提出负责人确认", "团队共同承诺", "只形成试验建议"],
  stages: [
    {
      name: "安全进入与立规",
      action:
        "在“第1章 入门套装：一定要掌握的8个工具”的安全进入与立规阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "发散聚类与聚焦",
      action:
        "围绕“新组建的产品小组要在90分钟内提出试运行方案，成员彼此陌生，领导又习惯在别人发言后马上评价。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "目标拆解与行动",
      action:
        "保存共同规则、停车场、原始想法卡、亲和分组、目标树、4W1H行动项、异议记录和回访安排。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“第1章 入门套装：一定要掌握的8个工具”的委托目的、受影响参与者和授权边界",
    "按安全进入与立规运行第一段，并保留原始输入与退出选择",
    "进入发散聚类与聚焦，公开分析结构、筛选标准和少数意见",
    "完成目标拆解与行动，交付共同规则、停车场、原始想法卡、亲和分组、目标树、4W1H行动项、异议记录和回访安排。",
  ],
  failureTrace: [
    "复用“第1章 入门套装：一定要掌握的8个工具”相同的场景、参与者和时间盒",
    "只注入流程故障：头脑风暴阶段立刻评价提议，导致少数人和第一个方案主导",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“每个参与者知晓规则并能贡献，偏题可回访，创意被保留，行动有负责人”拒绝、缩小或重做结论",
  ],
  invariant: "每个参与者知晓规则并能贡献，偏题可回访，创意被保留，行动有负责人",
  fault: "头脑风暴阶段立刻评价提议，导致少数人和第一个方案主导",
  artifact:
    "共同规则、停车场、原始想法卡、亲和分组、目标树、4W1H行动项、异议记录和回访安排。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“第1章 入门套装：一定要掌握的8个工具”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“第1章 入门套装：一定要掌握的8个工具”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“第1章 入门套装：一定要掌握的8个工具”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“第1章 入门套装：一定要掌握的8个工具”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23Chapter01SessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23Chapter01ParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23Chapter01EthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
