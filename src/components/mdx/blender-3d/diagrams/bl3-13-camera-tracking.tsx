"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Understanding Camera Tracking",
  "Shooting Video for Easy Tracking",
  "Using the Movie Clip Editor",
  "Tracking the Camera Motion",
] as const;

export function Bl313CameraTrackingMapLab() {
  return (
    <OfficialBlenderLab
      title="第 13 章 Camera Tracking in Blender：从真实镜头解算相机 · 资产管线"
      label="Chapter 13"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl313CameraTrackingExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 13 章 Camera Tracking in Blender：从真实镜头解算相机 · 单变量检查"
      label="Chapter 13"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl313CameraTrackingEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 13 章 Camera Tracking in Blender：从真实镜头解算相机 · 阶段门证据"
      label="Chapter 13"
      nodes={nodes}
      mode="evidence"
    />
  );
}
