import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "建立资源命名",
  "导入模型骨骼",
  "配置光照相机",
  "搭建场景与地形",
  "烘焙并剔除",
  "物理与依赖签发",
] as const;

export function Ucn05UnityEditorMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第5章 Unity编辑器的使用"
      label="第1篇 Unity基础（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn05UnityEditorExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第5章 Unity编辑器的使用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn05UnityEditorEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第5章 Unity编辑器的使用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
