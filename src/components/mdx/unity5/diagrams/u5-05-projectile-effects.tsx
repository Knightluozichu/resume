"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["输入发射","子弹生成","刚体运动","碰撞感知","伤害结算","视听反馈"] as const;

export function U505ProjectileEffectsMapLab() { return <Unity5EvidenceLab title="第5章 制作子弹发射效果" label="子弹发射效果" nodes={nodes} mode="map" />; }
export function U505ProjectileEffectsExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="子弹发射效果" nodes={nodes} mode="experiment" />; }
export function U505ProjectileEffectsEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="子弹发射效果" nodes={nodes} mode="evidence" />; }
