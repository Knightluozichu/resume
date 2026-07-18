import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "声明坐标空间",
  "构造向量与矩阵",
  "完成顶点变换",
  "计算材质光照",
  "沿管线定位结果",
  "射线与特效复测",
] as const;

export function Ucn04GraphicsInUnityMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第4章 在Unity中使用图形学知识"
      label="第1篇 Unity基础（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn04GraphicsInUnityExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第4章 在Unity中使用图形学知识"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn04GraphicsInUnityEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第4章 在Unity中使用图形学知识"
      nodes={nodes}
      mode="evidence"
    />
  );
}
