"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "光源视锥",
  "深度贴图",
  "投影比较",
  "透明裁剪",
  "GPU 预算",
] as const;

export function Uct08MobileRealtimeShadowsMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 8 章 移动端实时阴影绘制：投影、接收与透明材质 · 依赖地图"
      label="第 8 章 移动端实时阴影绘制"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct08MobileRealtimeShadowsExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 8 章 移动端实时阴影绘制：投影、接收与透明材质 · 单变量实验"
      label="第 8 章 移动端实时阴影绘制"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct08MobileRealtimeShadowsEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 8 章 移动端实时阴影绘制：投影、接收与透明材质 · 阶段门证据"
      label="第 8 章 移动端实时阴影绘制"
      nodes={nodes}
      mode="evidence"
    />
  );
}
