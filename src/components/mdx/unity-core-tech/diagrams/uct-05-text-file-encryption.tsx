"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "Schema 校验",
  "字节编码",
  "认证加密",
  "统一加载",
  "原子回滚",
] as const;

export function Uct05TextFileEncryptionMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 5 章 游戏中的文本文件加密：加载边界与完整性 · 依赖地图"
      label="第 5 章 游戏中的文本文件加密"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct05TextFileEncryptionExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 5 章 游戏中的文本文件加密：加载边界与完整性 · 单变量实验"
      label="第 5 章 游戏中的文本文件加密"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct05TextFileEncryptionEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 5 章 游戏中的文本文件加密：加载边界与完整性 · 阶段门证据"
      label="第 5 章 游戏中的文本文件加密"
      nodes={nodes}
      mode="evidence"
    />
  );
}
