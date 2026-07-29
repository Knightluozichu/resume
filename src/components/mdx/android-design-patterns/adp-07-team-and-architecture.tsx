"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "痛点基线",
    owner: "团队先量化发布速度、回归范围与新人上手成本。",
    flow: "需求从时间线进入分层模型，再映射到责任团队。",
    failure: "选一个跨层需求，记录旧架构的真实修改路径。",
  },
  {
    label: "Native 分层",
    owner: "依赖注入把对象作用域与 Android 生命周期对齐。",
    flow: "ViewModel、领域层与数据层保持单向依赖。",
    failure: "切换作用域，检查对象是否过早销毁或意外共享。",
  },
  {
    label: "混合边界",
    owner: "Native 与 React Native 各自拥有适合的功能集合。",
    flow: "导航、参数、错误和返回值经过显式桥接协议。",
    failure: "脚本加载失败，验证能否回到原生安全页面。",
  },
  {
    label: "团队反馈",
    owner: "架构是否成功由交付与协作指标共同判断。",
    flow: "对照三个月重写目标、评审分工和后续维护数据。",
    failure: "新成员独立改动跨端功能，记录阻塞位置。",
  },
] as const;

export function Adp07TeamAndArchitectureLab() {
  return (
    <AndroidArchitectureLab
      title="让系统边界匹配团队边界"
      question="技术上可行的混合架构，怎样证明团队也能维护？"
      stages={stages}
    />
  );
}
