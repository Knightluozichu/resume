"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "View 意图",
  "Controller 用例",
  "Model 规则",
  "State 快照",
  "Window 生命周期",
] as const;

export function Uct10MvcArchitectureMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 10 章 MVC 架构设计：窗口、控制、状态与管理器 · 依赖地图"
      label="第 10 章 MVC 架构设计"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct10MvcArchitectureExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 10 章 MVC 架构设计：窗口、控制、状态与管理器 · 单变量实验"
      label="第 10 章 MVC 架构设计"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct10MvcArchitectureEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 10 章 MVC 架构设计：窗口、控制、状态与管理器 · 阶段门证据"
      label="第 10 章 MVC 架构设计"
      nodes={nodes}
      mode="evidence"
    />
  );
}
