import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第0章 你一定要知道（导读）",
  label: "导读 · 环境与约定",
  color: "#7c2d12",
  soft: "#fff7ed",
  chain: [
    "确认目标读者",
    "盘点技术基础",
    "冻结工具版本",
    "统一符号语言",
    "取得验证例程",
    "记录版本差异",
  ],
  concepts: [
    "第0章 你一定要知道（导读）",
    "这本书适合谁",
    "你需要什么技术基础",
    "你需要什么软硬件环境",
    "让我们使用同一种语言",
    "本书符号习惯",
    "本书例程的取得",
    "范例程序说明",
    "与前版本之差异",
    "如何联络作者",
  ],
} as const;

export function Mfc00ReadingGuideMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc00ReadingGuideExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc00ReadingGuideEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
