"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "What Is Blender?",
  "Commercial Software Versus Open-Source Software",
  "History of Blender",
  "Blender Foundation and Blender Development",
] as const;

export function Bl301WhatYouNeedKnowAboutBlenderMapLab() {
  return (
    <OfficialBlenderLab
      title="第 1 章 What You Need to Know About Blender：软件、历史与社区 · 资产管线"
      label="Chapter 1"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl301WhatYouNeedKnowAboutBlenderExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 1 章 What You Need to Know About Blender：软件、历史与社区 · 单变量检查"
      label="Chapter 1"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl301WhatYouNeedKnowAboutBlenderEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 1 章 What You Need to Know About Blender：软件、历史与社区 · 阶段门证据"
      label="Chapter 1"
      nodes={nodes}
      mode="evidence"
    />
  );
}
