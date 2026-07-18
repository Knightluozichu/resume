"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "空间标签",
  "向量运算",
  "TRS 矩阵",
  "Quaternion",
  "数值断言",
] as const;

export function Uct013dMathUnityMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 1 章 3D 数学与 Unity：坐标、向量、矩阵和旋转 · 依赖地图"
      label="第 1 章 3D 数学与 Unity"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct013dMathUnityExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 1 章 3D 数学与 Unity：坐标、向量、矩阵和旋转 · 单变量实验"
      label="第 1 章 3D 数学与 Unity"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct013dMathUnityEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 1 章 3D 数学与 Unity：坐标、向量、矩阵和旋转 · 阶段门证据"
      label="第 1 章 3D 数学与 Unity"
      nodes={nodes}
      mode="evidence"
    />
  );
}
