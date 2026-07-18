"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "强类型消息",
  "订阅所有权",
  "分发快照",
  "主线程泵",
  "链路日志",
] as const;

export function Uct03MessageEventEncapsulationMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 3 章 消息事件封装：类型、监听与分发 · 依赖地图"
      label="第 3 章 消息事件封装"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct03MessageEventEncapsulationExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 3 章 消息事件封装：类型、监听与分发 · 单变量实验"
      label="第 3 章 消息事件封装"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct03MessageEventEncapsulationEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 3 章 消息事件封装：类型、监听与分发 · 阶段门证据"
      label="第 3 章 消息事件封装"
      nodes={nodes}
      mode="evidence"
    />
  );
}
