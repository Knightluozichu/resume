import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-02-history",
  title: "第2章 历史——双流记",
  question: "解释一种开放接口为何跨过商业 Unix 分裂继续扩散",
  nodes: ["Unix 起源", "商业分叉", "网络融合", "Linux 兴起", "开放协作"],
  concepts: [
    "2. History",
    "Origins and History of Unix, 1969-1995",
    "Genesis: 1969–1971",
    "Exodus: 1971–1980",
    "TCP/IP and the Unix Wars: 1980-1990",
    "Blows against the Empire: 1991-1995",
    "Origins and History of the Hackers, 1961-1995",
    "At Play in the Groves of Academe: 1961-1980",
    "Internet Fusion and the Free Software Movement: 1981-1991",
    "Linux and the Pragmatist Reaction: 1991-1998",
    "The Open-Source Movement: 1998 and Onward",
    "The Lessons of Unix History",
  ],
  actions: [
    {
      label: "收窄时间证据",
      detail: "只改变时间证据，保留制度约束与兼容接口的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化兼容接口",
      detail: "把兼容接口的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过传播机制",
      detail: "跳过传播机制直接追求历史反事实，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["时间证据风险", "兼容接口可见度", "历史反事实恢复度"],
  boundaryNote:
    "只有能指出同期可见的约束和替代路线，历史因果才不沦为胜者叙事。",
  faultNote: "拒绝原因：把后来成功的结果倒推成当时唯一可能的路线。",
} as const;

export function TaoupChapter02HistoryTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupChapter02HistoryRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupChapter02HistoryEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
