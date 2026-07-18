"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = ["Blend Shapes", "Inverse Kinematics", "Movie textures"] as const;

export function Uan07BlendShapesIkMovieTexturesMapLab() {
  return (
    <OfficialAnimationLab
      title="第 7 章 Blend Shapes, IK, and Movie Textures：三条高级表现链 · 责任图"
      label="Chapter 7"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan07BlendShapesIkMovieTexturesExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 7 章 Blend Shapes, IK, and Movie Textures：三条高级表现链 · 时间实验"
      label="Chapter 7"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan07BlendShapesIkMovieTexturesEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 7 章 Blend Shapes, IK, and Movie Textures：三条高级表现链 · 证据面板"
      label="Chapter 7"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
