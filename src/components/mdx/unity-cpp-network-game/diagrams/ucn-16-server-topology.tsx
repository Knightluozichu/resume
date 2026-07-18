import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "绘制职责与数据流",
  "划分外网和内网",
  "定义Login授权",
  "定义Gate接入",
  "定义Center与Battle",
  "故障隔离后签发",
] as const;

export function Ucn16ServerTopologyMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第16章 设计架构简单的互动服务器体系"
      label="第4篇 C++网络开发实战（服务器）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn16ServerTopologyExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第16章 设计架构简单的互动服务器体系"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn16ServerTopologyEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第16章 设计架构简单的互动服务器体系"
      nodes={nodes}
      mode="evidence"
    />
  );
}
