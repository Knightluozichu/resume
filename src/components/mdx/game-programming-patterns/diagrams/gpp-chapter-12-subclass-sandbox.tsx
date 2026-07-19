import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "12. Subclass Sandbox";
const focus = "由基类提供受保护原语，让子类在有限能力内组合行为";
const stages = [
  "识别重复",
  "定义原语",
  "注入服务",
  "组合行为",
  "限制出口"
];
const nodes = [
  {
    "label": "12. Subclass Sandbox",
    "mechanism": "12. Subclass Sandbox 把本章机制落到一个具体设计坐标：基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程，并以“子类只能通过已审查原语产生外部副作用”作为通过条件。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“大量子类直接访问引擎服务会复制代码并扩大依赖面”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“大量子类直接访问引擎服务会复制代码并扩大依赖面”，并保存不用模式时的失败基线。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“子类只能通过已审查原语产生外部副作用”。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“基类演变成暴露所有系统的上帝接口”。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以子类依赖、原语调用、重复代码与基类变更传播复核。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "What operations should be provided?",
    "mechanism": "What operations should be provided? 是设计分叉题；回答必须说明选择怎样改变基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程，以及哪条反例会推翻选择。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "Should methods be provided directly, or through objects that contain them?",
    "mechanism": "Should methods be provided directly, or through objects that contain them? 是设计分叉题；回答必须说明选择怎样改变基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程，以及哪条反例会推翻选择。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "How does the base class get the state that it needs?",
    "mechanism": "How does the base class get the state that it needs? 是设计分叉题；回答必须说明选择怎样改变基类收拢服务与辅助操作，派生类只在沙箱原语上定义流程，以及哪条反例会推翻选择。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查子类依赖、原语调用、重复代码与基类变更传播"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "子类直连服务",
  "candidateLabel": "沙箱原语",
  "unit": "依赖边",
  "baselineBase": 13,
  "baselineSlope": 5,
  "candidateBase": 7,
  "candidateSlope": 1.5,
  "faultPenalty": 11,
  "invariant": "子类只能通过已审查原语产生外部副作用",
  "fault": "基类演变成暴露所有系统的上帝接口",
  "evidence": "子类依赖、原语调用、重复代码与基类变更传播"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter12SubclassSandboxMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter12SubclassSandboxExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter12SubclassSandboxEvidenceLab() {
  return <GppFailureLab {...props} />;
}
