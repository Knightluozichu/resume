"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["冻结项目版本","运行单机TPS","注入战斗失败","验证网络重连","核对排名数据","完整签发"] as const;

export function U5OfficialFinalReviewMapLab() { return <Unity5EvidenceLab title="《Unity 5权威讲解》全书综合验收" label="全书综合验收" nodes={nodes} mode="map" />; }
export function U5OfficialFinalReviewExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="全书综合验收" nodes={nodes} mode="experiment" />; }
export function U5OfficialFinalReviewEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="全书综合验收" nodes={nodes} mode="evidence" />; }
