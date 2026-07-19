import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-23",
  title: "第23章 整体，空洞，以及空间",
  concepts: [
    "第23章 整体，空洞，以及空间",
    "23.1 控制论怎么了？",
    "23.2 科学知识网之缺口",
    "23.3 令人惊讶的琐碎小事",
    "23.4 超文本：权威的终结",
    "23.5 新的思考空间",
  ],
  nodes: [
    "绘制知识节点",
    "标出断裂接口",
    "建立可追踪链接",
    "允许多路径阅读",
    "保留来源责任",
  ],
  focuses: ["控制论遗产", "知识缺口", "日常反馈", "超文本", "网络认识论"],
  model: {
    studio: "知识网络空洞扫描器",
    axisA: {
      label: "来源链接可追踪度",
      levels: ["无出处", "单向引用", "双向语境链"],
    },
    axisB: {
      label: "阅读路径多样性",
      levels: ["唯一顺序", "有限分叉", "多路径可回溯"],
    },
    outcomes: {
      success: "缺口发现率",
      risk: "权威碎片化",
      evidence: "证据可追溯度",
    },
    fault: "链接增加但来源责任被稀释",
    task: "在一张知识图上同时标出节点、连接和没有连接的空洞",
    practiceMode: "design",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter23MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter23ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter23EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
