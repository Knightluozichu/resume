import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-12",
  title: "第12章 电子货币",
  nodes: [
    "编码价值状态",
    "建立可信转移",
    "扩大兼容网络",
    "降低交易粒度",
    "处理治理外部性",
  ],
  focuses: ["密码权力", "收益递增", "数字分发", "嵌入支付", "隐私治理"],
} as const;

export function Ooc16Chapter12MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter12ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter12EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
