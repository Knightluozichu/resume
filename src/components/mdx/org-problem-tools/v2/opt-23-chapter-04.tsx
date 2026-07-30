"use client";

import {
  FacilitationEvidenceLab,
  type FacilitationEvidenceModel,
} from "./facilitation-evidence-lab";

const model = {
  unitId: "opt-23-chapter-04",
  title: "第4章 高级套装：提高执行力的12个工具",
  question:
    "怎样用12个高级工具把动力、利益相关者、风险、系统循环与战略转成可执行组合？",
  concepts: [
    "第4章 高级套装：提高执行力的12个工具",
    "力场分析：思考动力，掌握执行力",
    "利益相关者分析：找出关键人物，实现计划",
    "决策树：不要说“决定不了”",
    "期望与课题的矩阵图：突破课题繁多的头脑风暴",
    "思维系统图：摆脱恶性循环",
    "要素图：解决项目延迟问题",
    "风险评估表：选择最小风险克服危机",
    "双收益矩阵：找出先后顺序的共同点",
    "时光机法：享受构筑愿景的过程",
    "采访英雄：让对方回想起过去的辉煌，重新振作起来",
    "SWOT法：用SWOT法提高战略意识",
    "PPM：用痛苦与喜悦的原则打破现状",
    "小专栏：在公司中开始引导",
  ],
  purposeOptions: ["识别变化阻力", "比较风险路径", "形成执行组合"],
  participantOptions: ["项目负责人", "受影响部门", "外部合作方"],
  authorityOptions: [
    "治理委员会决策",
    "负责人在边界内决策",
    "团队提出组合建议",
  ],
  stages: [
    {
      name: "识别动力与主体",
      action:
        "在“第4章 高级套装：提高执行力的12个工具”的识别动力与主体阶段先声明目的、参与者和决策权限。",
    },
    {
      name: "建模系统与风险",
      action:
        "围绕“公司要上线统一供应链系统，支持者、受影响部门和外部伙伴的动力不同，延期因素还会形成相互强化的循环。”只选择能解除当前流程障碍的最小工具。",
    },
    {
      name: "形成战略执行组合",
      action:
        "保存力场图、利益相关者地图、系统循环、风险表、决策路径、战略选项、责任与期限、反馈指标和升级条件。，再由未主持该环节的人独立复核。",
    },
  ],
  normalTrace: [
    "确认“第4章 高级套装：提高执行力的12个工具”的委托目的、受影响参与者和授权边界",
    "按识别动力与主体运行第一段，并保留原始输入与退出选择",
    "进入建模系统与风险，公开分析结构、筛选标准和少数意见",
    "完成形成战略执行组合，交付力场图、利益相关者地图、系统循环、风险表、决策路径、战略选项、责任与期限、反馈指标和升级条件。",
  ],
  failureTrace: [
    "复用“第4章 高级套装：提高执行力的12个工具”相同的场景、参与者和时间盒",
    "只注入流程故障：SWOT列完四格就直接选战略，没有连接证据、优先级与风险",
    "标记第一处参与、信息、权力或决策轨迹发生偏离的位置",
    "依据“行动方案有负责人、时间、风险与反馈，不把分析图当作执行结果”拒绝、缩小或重做结论",
  ],
  invariant: "行动方案有负责人、时间、风险与反馈，不把分析图当作执行结果",
  fault: "SWOT列完四格就直接选战略，没有连接证据、优先级与风险",
  artifact:
    "力场图、利益相关者地图、系统循环、风险表、决策路径、战略选项、责任与期限、反馈指标和升级条件。",
  riskCases: [
    {
      label: "角色冲突",
      detail:
        "在“第4章 高级套装：提高执行力的12个工具”中检查主持人是否对内容答案有未披露利益。",
    },
    {
      label: "参与偏差",
      detail:
        "在“第4章 高级套装：提高执行力的12个工具”中检查缺席者、低权力成员和退出选项。",
    },
    {
      label: "保密边界",
      detail:
        "在“第4章 高级套装：提高执行力的12个工具”中限制个人披露、录音、逐字稿和传播范围。",
    },
    {
      label: "行动失联",
      detail:
        "在“第4章 高级套装：提高执行力的12个工具”中核对负责人、期限、依赖与反馈日期。",
    },
  ],
} satisfies FacilitationEvidenceModel;

export function Opt23Chapter04SessionContractLab() {
  return <FacilitationEvidenceLab model={model} view="session-contract" />;
}

export function Opt23Chapter04ParticipationTraceLab() {
  return <FacilitationEvidenceLab model={model} view="participation-trace" />;
}

export function Opt23Chapter04EthicsProbeLab() {
  return <FacilitationEvidenceLab model={model} view="ethics-probe" />;
}
