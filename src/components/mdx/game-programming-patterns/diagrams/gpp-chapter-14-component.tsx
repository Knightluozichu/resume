import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "14. Component";
const focus = "把单个实体跨越的输入、物理、渲染和音频领域拆成组件";
const stages = [
  "识别领域",
  "提取组件",
  "装配实体",
  "协调消息",
  "替换验证"
];
const nodes = [
  {
    "label": "14. Component",
    "mechanism": "14. Component 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“单体游戏对象让不同领域直接相互依赖并同时膨胀”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“单体游戏对象让不同领域直接相互依赖并同时膨胀”，并保存不用模式时的失败基线。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "The Gordian knot",
    "mechanism": "The Gordian knot 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Cutting the knot",
    "mechanism": "Cutting the knot 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Loose ends",
    "mechanism": "Loose ends 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Tying back together",
    "mechanism": "Tying back together 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“替换一个领域组件不会要求修改其他领域实现”。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“组件通过实体反查并任意调用所有兄弟组件”。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示实体只拥有组件，组件封装领域状态并通过窄接口或容器协作的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "A monolithic class",
    "mechanism": "A monolithic class 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Splitting out a domain",
    "mechanism": "Splitting out a domain 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Splitting out the rest",
    "mechanism": "Splitting out the rest 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Robo-Bjørn",
    "mechanism": "Robo-Bjørn 把本章机制落到一个具体设计坐标：实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，并以“替换一个领域组件不会要求修改其他领域实现”作为通过条件。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "No Bjørn at all?",
    "mechanism": "No Bjørn at all? 是设计分叉题；回答必须说明选择怎样改变实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，以及哪条反例会推翻选择。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以领域依赖、组件创建顺序、消息轨迹与替换测试复核。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "How does the object get its components?",
    "mechanism": "How does the object get its components? 是设计分叉题；回答必须说明选择怎样改变实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，以及哪条反例会推翻选择。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "How do components communicate with each other?",
    "mechanism": "How do components communicate with each other? 是设计分叉题；回答必须说明选择怎样改变实体只拥有组件，组件封装领域状态并通过窄接口或容器协作，以及哪条反例会推翻选择。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查领域依赖、组件创建顺序、消息轨迹与替换测试"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "单体实体",
  "candidateLabel": "组件拆分",
  "unit": "跨域依赖",
  "baselineBase": 16,
  "baselineSlope": 6.5,
  "candidateBase": 8,
  "candidateSlope": 1.5,
  "faultPenalty": 14,
  "invariant": "替换一个领域组件不会要求修改其他领域实现",
  "fault": "组件通过实体反查并任意调用所有兄弟组件",
  "evidence": "领域依赖、组件创建顺序、消息轨迹与替换测试"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter14ComponentMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter14ComponentExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter14ComponentEvidenceLab() {
  return <GppFailureLab {...props} />;
}
