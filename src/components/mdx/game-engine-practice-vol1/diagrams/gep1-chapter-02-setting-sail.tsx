import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-02-setting-sail",
  title: "第2章 起航",
  nodes: [
    "建立程序循环",
    "统一空间约定",
    "追踪3D流水线",
    "连接编辑器资产",
    "验证目标机输出",
  ],
  focuses: ["实时顺序", "坐标合同", "API差异", "汇编证据", "工作流反馈"],
};

export function Gep1Chapter02SettingSailMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter02SettingSailExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter02SettingSailEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
