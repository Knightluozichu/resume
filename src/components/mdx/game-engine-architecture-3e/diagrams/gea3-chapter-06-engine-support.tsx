import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-06-engine-support",
  title: "第6章 Engine Support Systems",
  nodes: [
    "画启动DAG",
    "分配生命周期",
    "选择数据容器",
    "规范标识文本",
    "冻结配置来源",
  ],
  focuses: ["启动顺序", "分配策略", "迭代稳定", "编码边界", "配置漂移"],
};

export function Gea3Chapter06EngineSupportMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter06EngineSupportExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter06EngineSupportEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
