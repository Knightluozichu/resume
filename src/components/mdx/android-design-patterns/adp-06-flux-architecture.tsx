"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "Action",
    owner: "Action 是已经发生的意图或事实，必须携带足够上下文。",
    flow: "View 通过 Action Creator 生成动作并交给 Dispatcher。",
    failure: "连续提交相反动作，检查次序是否被完整记录。",
  },
  {
    label: "Dispatcher",
    owner: "Dispatcher 只分发，不偷偷保存页面业务状态。",
    flow: "每个动作按确定顺序送达相关 Store。",
    failure: "一个订阅者抛错，验证其他 Store 的处理语义。",
  },
  {
    label: "Store",
    owner: "Store 是状态写入口，根据动作生成新快照。",
    flow: "Action → Store 转换 → View 订阅新状态。",
    failure: "重放动作日志，结果应与原状态轨迹一致。",
  },
  {
    label: "Repository",
    owner: "Repository 执行外部 I/O，再把结果转换为后续动作。",
    flow: "请求动作触发 I/O，成功或失败都重新进入单向流。",
    failure: "让旧请求晚于新请求完成，检查结果版本。",
  },
] as const;

export function Adp06FluxArchitectureLab() {
  return (
    <AndroidArchitectureLab
      title="沿单向数据流重放状态"
      question="数据只向前流动，是否就能自动避免所有竞态？"
      stages={stages}
    />
  );
}
