"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["射线来源","方向距离","LayerMask","命中信息","玩法结算","激光表现"] as const;

export function U509RaycastingMapLab() { return <Unity5EvidenceLab title="第9章 灵活运用射线投射" label="射线投射" nodes={nodes} mode="map" />; }
export function U509RaycastingExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="射线投射" nodes={nodes} mode="experiment" />; }
export function U509RaycastingEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="射线投射" nodes={nodes} mode="evidence" />; }
