import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "6. Singleton";
const focus = "拆开唯一实例约束与全局访问便利这两个独立问题";
const stages = [
  "拆分诉求",
  "显式创建",
  "注入依赖",
  "验证唯一",
  "控制销毁"
];
const nodes = [
  {
    "label": "6. Singleton",
    "mechanism": "6. Singleton 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "The Singleton Pattern",
    "mechanism": "The Singleton Pattern 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "Restricting a class to one instance",
    "mechanism": "Restricting a class to one instance 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "Providing a global point of access",
    "mechanism": "Providing a global point of access 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "Why We Use It",
    "mechanism": "Why We Use It 是设计分叉题；回答必须说明选择怎样改变由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，以及哪条反例会推翻选择。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "Why We Regret Using It",
    "mechanism": "Why We Regret Using It 是设计分叉题；回答必须说明选择怎样改变由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，以及哪条反例会推翻选择。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "It’s a global variable",
    "mechanism": "It’s a global variable 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "It solves two problems even when you just have one",
    "mechanism": "It solves two problems even when you just have one 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "Lazy initialization takes control away from you",
    "mechanism": "Lazy initialization takes control away from you 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "What We Can Do Instead",
    "mechanism": "What We Can Do Instead 是设计分叉题；回答必须说明选择怎样改变由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，以及哪条反例会推翻选择。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "See if you need the class at all",
    "mechanism": "See if you need the class at all 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "To limit a class to a single instance",
    "mechanism": "To limit a class to a single instance 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "To provide convenient access to an instance",
    "mechanism": "To provide convenient access to an instance 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  },
  {
    "label": "What’s Left for Singleton",
    "mechanism": "What’s Left for Singleton 把本章机制落到一个具体设计坐标：由组合根显式创建并注入服务，只有确需唯一时才单独约束数量，并以“依赖、创建时机和销毁顺序都能从调用边界读出”作为通过条件。",
    "probe": "检查依赖图、构造顺序、替身测试与并发轨迹"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "全局单例",
  "candidateLabel": "显式注入",
  "unit": "隐藏依赖",
  "baselineBase": 13,
  "baselineSlope": 5.5,
  "candidateBase": 6,
  "candidateSlope": 1.4,
  "faultPenalty": 12,
  "invariant": "依赖、创建时机和销毁顺序都能从调用边界读出",
  "fault": "惰性初始化在后台线程首次访问时发生竞争",
  "evidence": "依赖图、构造顺序、替身测试与并发轨迹"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter06SingletonMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter06SingletonExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter06SingletonEvidenceLab() {
  return <GppFailureLab {...props} />;
}
