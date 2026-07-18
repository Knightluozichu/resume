"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "The Animation window - creating a fly-through",
  "Animating multiple objects together",
  "Particle Systems",
  "The Particle System's global properties",
] as const;

export function Uan03NativeAnimationMapLab() {
  return (
    <OfficialAnimationLab
      title="第 3 章 Native Animation：Animation 窗口与粒子系统 · 责任图"
      label="Chapter 3"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan03NativeAnimationExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 3 章 Native Animation：Animation 窗口与粒子系统 · 时间实验"
      label="Chapter 3"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan03NativeAnimationEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 3 章 Native Animation：Animation 窗口与粒子系统 · 证据面板"
      label="Chapter 3"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
