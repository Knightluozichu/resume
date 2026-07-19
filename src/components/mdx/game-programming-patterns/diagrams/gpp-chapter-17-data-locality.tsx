import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "17. Data Locality";
const focus = "按访问顺序连续排列热数据，减少缓存行搬运和指针追逐";
const stages = [
  "记录访问",
  "拆分冷热",
  "连续排列",
  "压紧存活",
  "硬件复测"
];
const nodes = [
  {
    "label": "17. Data Locality",
    "mechanism": "17. Data Locality 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Intent",
    "mechanism": "Intent 把“对象分散在堆上时，逐帧遍历会为少量热字段加载大量无关字节”压缩成可检验的问题合同，先界定目标而不预设类图。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Motivation",
    "mechanism": "Motivation 用具体游戏场景暴露“对象分散在堆上时，逐帧遍历会为少量热字段加载大量无关字节”，并保存不用模式时的失败基线。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "A data warehouse",
    "mechanism": "A data warehouse 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "A pallet for your CPU",
    "mechanism": "A pallet for your CPU 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Wait, data is performance?",
    "mechanism": "Wait, data is performance? 是设计分叉题；回答必须说明选择怎样改变连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，以及哪条反例会推翻选择。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "The Pattern",
    "mechanism": "The Pattern 从例子抽离最小参与者与因果关系：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "When to Use It",
    "mechanism": "When to Use It 要求变化压力已经出现，并且候选机制能守住“热循环只触碰所需字段且存活项保持紧凑”。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Keep in Mind",
    "mechanism": "Keep in Mind 把额外间接层、内存、时序和工具成本写入决定，尤其检查“删除后留下空洞或指针指向交换前位置”。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Sample Code",
    "mechanism": "Sample Code 只演示连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局的最小骨架；生产迁移还需补齐所有权、错误与测试合同。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Contiguous arrays",
    "mechanism": "Contiguous arrays 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Packed data",
    "mechanism": "Packed data 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Hot/cold splitting",
    "mechanism": "Hot/cold splitting 把本章机制落到一个具体设计坐标：连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，并以“热循环只触碰所需字段且存活项保持紧凑”作为通过条件。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "Design Decisions",
    "mechanism": "Design Decisions 围绕创建、所有权、通信、粒度和失败恢复比较方案，并以缓存缺失、加载字节、存活密度、帧时间与身份映射复核。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "How do you handle polymorphism?",
    "mechanism": "How do you handle polymorphism? 是设计分叉题；回答必须说明选择怎样改变连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，以及哪条反例会推翻选择。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "How are game entities defined?",
    "mechanism": "How are game entities defined? 是设计分叉题；回答必须说明选择怎样改变连续数组、紧凑存活区和冷热拆分让处理顺序贴合内存布局，以及哪条反例会推翻选择。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  },
  {
    "label": "See Also",
    "mechanism": "See Also 用相邻模式做替代和组合比较；只有解决不同变化轴时才允许叠加。",
    "probe": "检查缓存缺失、加载字节、存活密度、帧时间与身份映射"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "指针对象图",
  "candidateLabel": "连续热数据",
  "unit": "缓存缺失",
  "baselineBase": 18,
  "baselineSlope": 8,
  "candidateBase": 10,
  "candidateSlope": 1.5,
  "faultPenalty": 15,
  "invariant": "热循环只触碰所需字段且存活项保持紧凑",
  "fault": "删除后留下空洞或指针指向交换前位置",
  "evidence": "缓存缺失、加载字节、存活密度、帧时间与身份映射"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter17DataLocalityMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter17DataLocalityExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter17DataLocalityEvidenceLab() {
  return <GppFailureLab {...props} />;
}
