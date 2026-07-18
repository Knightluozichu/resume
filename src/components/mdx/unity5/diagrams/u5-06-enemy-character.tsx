"use client";

import { Unity5EvidenceLab } from "./official-unity5-lab";

const nodes = ["模型与Avatar","Animator","NavMesh追击","AI决策","战斗反馈","死亡清理"] as const;

export function U506EnemyCharacterMapLab() { return <Unity5EvidenceLab title="第6章 制作敌对角色" label="制作敌对角色" nodes={nodes} mode="map" />; }
export function U506EnemyCharacterExperimentLab() { return <Unity5EvidenceLab title="失败注入与状态观察" label="制作敌对角色" nodes={nodes} mode="experiment" />; }
export function U506EnemyCharacterEvidenceLab() { return <Unity5EvidenceLab title="项目证据签发" label="制作敌对角色" nodes={nodes} mode="evidence" />; }
