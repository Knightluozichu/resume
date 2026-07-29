"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "共同规格",
    owner: "TODO 业务规则是比较基线，任何模式都不能偷偷改变它。",
    flow: "同一输入依次经过 MVP、MVVM、Flux 和组件化方案。",
    failure: "先固定旋转与迟到回调，再比较不同方案的恢复结果。",
  },
  {
    label: "模式机制",
    owner: "Presenter、ViewModel 或 Store 只能有一个明确的状态写入口。",
    flow: "记录意图、状态转换、渲染和持久化的完整方向。",
    failure: "把类改名但保留反向依赖，验证问题是否仍然存在。",
  },
  {
    label: "真实案例",
    owner: "团队边界和遗留代码决定迁移范围，不由模式名代替决策。",
    flow: "对照渐进改造、OSS 协作与混合重写的交付轨迹。",
    failure: "加入新成员或回退需求，观察认知与协作成本。",
  },
  {
    label: "平台组件",
    owner: "生命周期、ViewModel 与 LiveData 解决的是平台协作问题。",
    flow: "把组件能力接回既有 MVVM 或 Flux 边界。",
    failure: "销毁界面后送达数据，检查观察者与状态是否越界。",
  },
] as const;

export function AdpOfficialLearningMapLab() {
  return (
    <AndroidArchitectureLab
      title="把八章内容放进同一条证据链"
      question="先读哪章，才能避免把框架 API 误当成架构？"
      stages={stages}
    />
  );
}
