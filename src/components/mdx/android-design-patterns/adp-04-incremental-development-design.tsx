"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "识别债务",
    owner: "多层继承、全局状态与万能基类的变更成本必须被量化。",
    flow: "从一次需求追踪修改文件、隐式依赖与回归范围。",
    failure: "加入一个字段，记录它穿过多少父类和共享状态。",
  },
  {
    label: "切断静态",
    owner: "组合根逐步接管全局对象的创建与作用域。",
    flow: "先包裹旧入口，再把调用者迁到可替换接口。",
    failure: "回退新实现，确认旧路径仍能独立工作。",
  },
  {
    label: "引入异步流",
    owner: "流的订阅、线程、取消与错误属于清晰的边界。",
    flow: "每次改造只替换一个数据链路并保留对照。",
    failure: "让结果乱序到达，检查旧结果是否覆盖新状态。",
  },
  {
    label: "新功能试点",
    owner: "分步发布的新功能承担验证新架构的风险。",
    flow: "小范围交付、测量、回退，再决定是否扩大。",
    failure: "关闭试点开关，确认数据与用户路径可恢复。",
  },
] as const;

export function Adp04IncrementalDevelopmentDesignLab() {
  return (
    <AndroidArchitectureLab
      title="在可回退边界内偿还技术债"
      question="为什么一次性重写通常不能证明比渐进改造更安全？"
      stages={stages}
    />
  );
}
