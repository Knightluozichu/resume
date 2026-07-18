"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "proto Schema",
  "protoc 工具",
  "生成 C#",
  "帧编码",
  "兼容回放",
] as const;

export function Uct04ProtobufInGamesMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 4 章 Protobuf 在游戏中的运用：协议、生成与 Unity 接入 · 依赖地图"
      label="第 4 章 Protobuf 在游戏中的运用"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct04ProtobufInGamesExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 4 章 Protobuf 在游戏中的运用：协议、生成与 Unity 接入 · 单变量实验"
      label="第 4 章 Protobuf 在游戏中的运用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct04ProtobufInGamesEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 4 章 Protobuf 在游戏中的运用：协议、生成与 Unity 接入 · 阶段门证据"
      label="第 4 章 Protobuf 在游戏中的运用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
