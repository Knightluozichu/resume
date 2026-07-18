import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-06-initialization-destruction",
  title: "第6章 初始化与销毁",
  nodes: [
    "声明依赖图",
    "分阶段初始化",
    "发布可用状态",
    "注入启动失败",
    "逆序销毁",
  ],
  focuses: ["静态顺序", "部分失败", "全局服务", "普通对象", "关闭证明"],
};

export function Gep1Chapter06InitializationDestructionMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter06InitializationDestructionExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter06InitializationDestructionEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
