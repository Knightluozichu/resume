"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-chapter-02",
  title: "第2章 初级套装：让思考更简单的13个工具",
  question: "怎样用13个初级工具把现状、目标、因果、优先级与回顾变成共同模型？",
  concepts: [
    "第2章 初级套装：让思考更简单的13个工具",
    "破冰Ⅱ：你也需要做些伸展运动",
    "传球发言：一个球就能让交流很顺利",
    "可控与不可控：集中精力于能做到的事",
    "更多与更少：轻松共享理想状态",
    "As is / To be：共享理想状态",
    "毁誉分析：将赞成和反对的理由全写出来",
    "流程图：打破瓶颈",
    "收益矩阵：利用双轴筛选想法",
    "圆形分析：用圆形分析清楚区分",
    "报纸测试：解决虚假问题",
    "曼陀罗思考法：通过多角度思考促进思维展开",
    "帕累托分析法：别再做无用功了",
    "回顾时间：培养善于从日常经历中积累经验的团队",
    "小专栏：引导自己自我提升",
  ],
  purposeOptions: ["建立现状模型", "识别可控杠杆", "选择改善重点"],
  participantOptions: ["一线客服", "流程负责人", "数据支持者"],
  authorityOptions: ["负责人按标准拍板", "团队共同排序", "形成建议交上游"],
  stages: [
    {
      name: "外化现状与边界",
      action:
        "在“第2章 初级套装：让思考更简单的13个工具”的外化现状与边界阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "展开因果与选项",
      action:
        "围绕“客服团队想降低重复工单，却把无法控制的上游限制、理想状态、流程瓶颈和优先任务混在一次讨论中。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "筛选重点并回顾",
      action:
        "保存As is/To be差距、可控边界、流程图、正反理由、候选矩阵、帕累托数据、优先级理由和回顾记录。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“第2章 初级套装：让思考更简单的13个工具”的委托目的、受影响参与者和授权边界",
    "按外化现状与边界运行第一段，并保留原始输入与退出选择",
    "进入展开因果与选项，公开分析结构、筛选标准和少数意见",
    "完成筛选重点并回顾，交付As is/To be差距、可控边界、流程图、正反理由、候选矩阵、帕累托数据、优先级理由和回顾记录。",
  ],
  failureTrace: [
    "复用“第2章 初级套装：让思考更简单的13个工具”相同的场景、参与者和时间盒",
    "只注入流程故障：收益矩阵的坐标和权重在看见喜欢的方案后才调整",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“事实、解释与选择分开，筛选标准在看到结论之前声明”拒绝、缩小或重做结论",
  ],
  invariant: "事实、解释与选择分开，筛选标准在看到结论之前声明",
  fault: "收益矩阵的坐标和权重在看见喜欢的方案后才调整",
  artifact:
    "As is/To be差距、可控边界、流程图、正反理由、候选矩阵、帕累托数据、优先级理由和回顾记录。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“第2章 初级套装：让思考更简单的13个工具”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“第2章 初级套装：让思考更简单的13个工具”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“第2章 初级套装：让思考更简单的13个工具”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“第2章 初级套装：让思考更简单的13个工具”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23Chapter02SessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23Chapter02ParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23Chapter02EthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
