"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-07",
  title: "第 7 章：Ball、AABB 与 Pong 物理",
  focus:
    "用 Ball 类、AABB 重叠、速度反射、计分与三路比较运算符完成 Pong 的可重复碰撞规则",
  invariant: "一次接触只产生一次法线方向反射；分数变化与球越过边界事件一一对应",
  fault: "球仍与球拍重叠时每帧反转水平速度，造成速度来回抖动和粘连",
  evidence: "前后 AABB、穿透方向、碰撞法线、速度向量、接触阶段和计分事件",
  concepts: [
    "ball 类（ball class）",
    "aabb 碰撞检测（aabb collision detection）",
    "物理（physics）",
    "计分（scoring）",
    "三路比较运算符（spaceship operator）",
  ],
  zones: [
    {
      label: "几何状态",
      detail: "Ball/Bat AABB 与相对位置",
    },
    {
      label: "物理规则",
      detail: "重叠判断、分离与速度反射",
    },
    {
      label: "回合结果",
      detail: "出界、重置、计分与比较",
    },
  ],
  trace: ["保存旧位置", "检测 AABB", "求接触方向", "分离并反射", "提交计分"],
  scenarios: [
    {
      label: "正面击中球拍",
      input: "球从左侧进入球拍 AABB，水平速度指向右",
      expected: "只反射 x 速度并先解除重叠，不发生重复碰撞",
    },
    {
      label: "球越过底线",
      input: "球完全越过玩家防守边界且未与球拍接触",
      expected: "对手得一分，球按规定位置和速度重置",
    },
  ],
} satisfies CppGameBuildModel;

export function CollisionDetectionPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function CollisionDetectionFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function CollisionDetectionFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
