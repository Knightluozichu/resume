"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["引擎定位","版本能力","安装许可","项目创建","编辑器视图","可运行场景"] as const;

export function U501Unity5IntroductionMapLab() { return <Unity5EvidenceLab title="第1章 Unity 5 简介" label="Unity 5 简介" nodes={nodes} mode="map" />; }
export function U501Unity5IntroductionExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="Unity 5 简介" nodes={nodes} mode="experiment" />; }
export function U501Unity5IntroductionEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="Unity 5 简介" nodes={nodes} mode="evidence" />; }
