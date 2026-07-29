"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "按症状检索",
    owner: "先定位状态丢失、重复事件、耦合或协作阻塞。",
    flow: "症状映射到生命周期、数据流、依赖或团队章节。",
    failure: "同一症状列出两个可能根因，避免按模式名猜测。",
  },
  {
    label: "按角色检索",
    owner: "Presenter、ViewModel、Store、Repository 各有写权限边界。",
    flow: "从角色回到调用方向、状态与测试替身。",
    failure: "发现角色持有不属于自己的平台或业务对象。",
  },
  {
    label: "按证据检索",
    owner: "实验记录、状态轨迹、失败注入与团队指标互相补证。",
    flow: "先选结论，再找到能够支持或推翻它的证据类型。",
    failure: "只有类图没有运行事实时，结论保持未验证。",
  },
] as const;

export function AdpIndexLab() {
  return (
    <AndroidArchitectureLab
      title="从问题回到章节，而非死记术语"
      question="遇到一次重复 Snackbar，应该查模式还是查状态语义？"
      stages={stages}
    />
  );
}
