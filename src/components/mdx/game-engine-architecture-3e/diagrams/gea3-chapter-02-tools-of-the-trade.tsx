import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-02-tools-of-the-trade",
  title: "第2章 Tools of the Trade",
  nodes: ["提交变更", "生成构建", "运行目标包", "采集性能证据", "复现并修复"],
  focuses: ["版本可追溯", "构建确定性", "采样偏差", "内存证据", "反馈时延"],
};

export function Gea3Chapter02ToolsOfTheTradeMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter02ToolsOfTheTradeExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter02ToolsOfTheTradeEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
