"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-06",
  title: "第 6 章：OOP 与 Pong 的 Bat 类",
  focus:
    "用 Bat 类封装位置、速度和边界，通过构造、update 与 getShape 合同启动 Pong",
  invariant:
    "Bat 自己维护合法位置，外部只通过公开接口表达意图，渲染读取的形状与内部位置一致",
  fault:
    "把 position 和 shape 同时暴露给 main 修改，导致逻辑坐标与绘制坐标分叉",
  evidence:
    "构造参数、私有成员快照、公开方法调用、边界夹取和 shape.getPosition 结果",
  concepts: [
    "面向对象编程（object-oriented programming）",
    "乒乓球拍（pong bat）",
    "创建 pong 项目（creating the pong project）",
    "类（class）",
    "main 函数（main function）",
  ],
  zones: [
    {
      label: "对象合同",
      detail: "构造、公开方法与私有不变量",
    },
    {
      label: "状态更新",
      detail: "方向、速度、delta time 与边界",
    },
    {
      label: "Pong 输出",
      detail: "Bat 的 RectangleShape 位置与绘制",
    },
  ],
  trace: ["构造 Bat", "接收意图", "计算位移", "夹取边界", "同步形状"],
  scenarios: [
    {
      label: "向右移动",
      input: "按住右键一秒，窗口宽度足够容纳球拍",
      expected: "位移等于速度乘时间且内部位置与形状一致",
    },
    {
      label: "触碰右边界",
      input: "从靠近右边界的位置继续输入向右",
      expected: "球拍停在合法最大 x，不能离开窗口",
    },
  ],
} satisfies CppGameBuildModel;

export function ClassesOopPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function ClassesOopFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function ClassesOopFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
