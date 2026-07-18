import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "规范资源身份",
  "构建Bundle清单",
  "解析依赖并加载",
  "集成车辆飞行器",
  "验证地雷和物品交互",
  "卸载恢复后签发",
] as const;

export function Ucn09AssetsInteractionsMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第9章 资源组件和交互物品开发"
      label="第2篇 Unity实战（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn09AssetsInteractionsExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第9章 资源组件和交互物品开发"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn09AssetsInteractionsEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第9章 资源组件和交互物品开发"
      nodes={nodes}
      mode="evidence"
    />
  );
}
