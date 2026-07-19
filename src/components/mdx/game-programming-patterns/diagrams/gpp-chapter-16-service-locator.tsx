import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "16. Service Locator";
const focus = "通过定位器获得服务时仍显式处理注册、缺失、范围和替换";
const stages = [
  "定义服务",
  "注册提供者",
  "定位实例",
  "调用能力",
  "替换释放"
];
const nodes = [
  {
    "label": "16. Service Locator",
    "mechanism": "16. Service Locator 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“音频等服务从全局变量访问会隐藏依赖并让测试无法替换”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“音频等服务从全局变量访问会隐藏依赖并让测试无法替换”，并保存不用模式时的失败基线。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“服务缺失和服务范围都有确定、可测试的行为”。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“服务尚未注册时调用返回悬空引用”。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "The service actually has to be located",
    "mechanism": "The service actually has to be located 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "The service doesn’t know who is locating it",
    "mechanism": "The service doesn’t know who is locating it 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "The service",
    "mechanism": "The service 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "The service provider",
    "mechanism": "The service provider 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "A simple locator",
    "mechanism": "A simple locator 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "A null service",
    "mechanism": "A null service 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Logging decorator",
    "mechanism": "Logging decorator 把本章机制落到一个具体设计坐标：定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，并以“服务缺失和服务范围都有确定、可测试的行为”作为通过条件。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以注册顺序、定位调用点、空服务路径与替换日志复核。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "How is the service located?",
    "mechanism": "How is the service located? 是设计分叉题；回答必须说明选择怎样改变定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，以及哪条反例会推翻选择。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "What happens if the service can’t be located?",
    "mechanism": "What happens if the service can’t be located? 是设计分叉题；回答必须说明选择怎样改变定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，以及哪条反例会推翻选择。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "What is the scope of the service?",
    "mechanism": "What is the scope of the service? 是设计分叉题；回答必须说明选择怎样改变定位器在组合阶段绑定提供者，调用时返回真实、装饰或空服务，以及哪条反例会推翻选择。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查注册顺序、定位调用点、空服务路径与替换日志"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "全局服务",
  "candidateLabel": "受控定位",
  "unit": "失败调用",
  "baselineBase": 12,
  "baselineSlope": 5.5,
  "candidateBase": 7,
  "candidateSlope": 1.6,
  "faultPenalty": 12,
  "invariant": "服务缺失和服务范围都有确定、可测试的行为",
  "fault": "服务尚未注册时调用返回悬空引用",
  "evidence": "注册顺序、定位调用点、空服务路径与替换日志"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter16ServiceLocatorMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter16ServiceLocatorExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter16ServiceLocatorEvidenceLab() {
  return <GppFailureLab {...props} />;
}
