"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "构建清单",
  "差分计划",
  "Staging 下载",
  "Lua 桥接",
  "提交或回滚",
] as const;

export function Uct12MobileHotUpdateMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 12 章 移动端热更新：资源、Lua 与版本事务 · 依赖地图"
      label="第 12 章 移动端热更新技术实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct12MobileHotUpdateExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 12 章 移动端热更新：资源、Lua 与版本事务 · 单变量实验"
      label="第 12 章 移动端热更新技术实现"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct12MobileHotUpdateEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 12 章 移动端热更新：资源、Lua 与版本事务 · 阶段门证据"
      label="第 12 章 移动端热更新技术实现"
      nodes={nodes}
      mode="evidence"
    />
  );
}
