import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "13. Type Object";
const focus = "用运行时类型对象表示种类，让实例共享数据并可由内容扩展";
const stages = [
  "读取类型",
  "解析父链",
  "创建实例",
  "查询共享值",
  "更新类型"
];
const nodes = [
  {
    "label": "13. Type Object",
    "mechanism": "13. Type Object 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“每个怪物品种一个语言子类会把内容集合锁死在编译期”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“每个怪物品种一个语言子类会把内容集合锁死在编译期”，并保存不用模式时的失败基线。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "The typical OOP answer",
    "mechanism": "The typical OOP answer 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "A class for a class",
    "mechanism": "A class for a class 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“同类型实例共享定义但不共享逐实例可变状态”。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“类型继承链出现循环或缺失父类型”。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "The type objects have to be tracked manually",
    "mechanism": "The type objects have to be tracked manually 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "It’s harder to define behavior for each type",
    "mechanism": "It’s harder to define behavior for each type 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示类型对象保存种类数据和共享行为，实例持有类型引用及自身状态的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Making type objects more like types: constructors",
    "mechanism": "Making type objects more like types: constructors 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Sharing data through inheritance",
    "mechanism": "Sharing data through inheritance 把本章机制落到一个具体设计坐标：类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，并以“同类型实例共享定义但不共享逐实例可变状态”作为通过条件。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以类型图、实例引用、继承解析与热加载前后结果复核。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Is the type object encapsulated or exposed?",
    "mechanism": "Is the type object encapsulated or exposed? 是设计分叉题；回答必须说明选择怎样改变类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，以及哪条反例会推翻选择。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "How are typed objects created?",
    "mechanism": "How are typed objects created? 是设计分叉题；回答必须说明选择怎样改变类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，以及哪条反例会推翻选择。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "Can the type change?",
    "mechanism": "Can the type change? 是设计分叉题；回答必须说明选择怎样改变类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，以及哪条反例会推翻选择。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "What kind of inheritance is supported?",
    "mechanism": "What kind of inheritance is supported? 是设计分叉题；回答必须说明选择怎样改变类型对象保存种类数据和共享行为，实例持有类型引用及自身状态，以及哪条反例会推翻选择。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查类型图、实例引用、继承解析与热加载前后结果"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "语言子类",
  "candidateLabel": "运行时类型",
  "unit": "重新编译项",
  "baselineBase": 12,
  "baselineSlope": 5.2,
  "candidateBase": 7,
  "candidateSlope": 1.3,
  "faultPenalty": 10,
  "invariant": "同类型实例共享定义但不共享逐实例可变状态",
  "fault": "类型继承链出现循环或缺失父类型",
  "evidence": "类型图、实例引用、继承解析与热加载前后结果"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter13TypeObjectMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter13TypeObjectExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter13TypeObjectEvidenceLab() {
  return <GppFailureLab {...props} />;
}
