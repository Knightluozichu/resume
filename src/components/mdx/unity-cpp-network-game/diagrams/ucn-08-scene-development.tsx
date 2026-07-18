import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "建立场景清单",
  "编辑地形植被",
  "加入光影和物体",
  "集成水天气道路",
  "预算渲染成本",
  "切换卸载后签发",
] as const;

export function Ucn08SceneDevelopmentMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第8章 场景资源编辑与程序开发"
      label="第2篇 Unity实战（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn08SceneDevelopmentExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第8章 场景资源编辑与程序开发"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn08SceneDevelopmentEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第8章 场景资源编辑与程序开发"
      nodes={nodes}
      mode="evidence"
    />
  );
}
