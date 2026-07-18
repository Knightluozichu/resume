"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Sprites - importing and configuration",
  "Animation with sprites",
  "Sprite animation is too slow or too fast",
  "Animation shouldn't be looping",
] as const;

export function Uan02SpriteAnimationMapLab() {
  return (
    <OfficialAnimationLab
      title="第 2 章 Sprite Animation：导入、图集与帧序列诊断 · 责任图"
      label="Chapter 2"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan02SpriteAnimationExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 2 章 Sprite Animation：导入、图集与帧序列诊断 · 时间实验"
      label="Chapter 2"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan02SpriteAnimationEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 2 章 Sprite Animation：导入、图集与帧序列诊断 · 证据面板"
      label="Chapter 2"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
