import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第18章 合金弹头",
  "18.1 合金弹头游戏简介",
  "18.2 开发游戏界面组件",
  "18.2.1 游戏界面分析",
  "18.2.2 实现“怪物”类",
  "18.2.3 实现怪物管理类",
  "18.2.4 实现“子弹”类",
  "18.2.5 实现“角色”类",
  "18.3 实现绘图工具类",
  "18.4 加载、管理游戏图片",
  "18.5 实现游戏界面",
  "18.5.1 实现游戏Activity",
  "18.5.2 实现主视图",
  "18.6 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第18章 合金弹头" focus="以合金弹头项目综合游戏对象、资源管理、碰撞、绘图循环、Activity与自定义主视图" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第18章 合金弹头" focus="以合金弹头项目综合游戏对象、资源管理、碰撞、绘图循环、Activity与自定义主视图" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第18章 合金弹头" focus="对象关系图、资源清单、帧循环、碰撞回放、性能曲线和完整游戏APK" nodes={nodes} />; }
