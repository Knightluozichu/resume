"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "机制对照",
    owner: "用同一 TODO 规格比较 MVP、MVVM 与 Flux 的状态所有权。",
    flow: "保存正常、旋转、迟到结果与错误路径的轨迹。",
    failure: "随机打乱回调顺序，检查结论是否仍成立。",
  },
  {
    label: "案例诊断",
    owner: "技术债、OSS 与团队重写分别使用自己的约束和指标。",
    flow: "从痛点到改造边界，再到交付与回退证据。",
    failure: "去掉团队条件，观察建议是否变成无依据的通则。",
  },
  {
    label: "平台组合",
    owner: "生命周期组件帮助模式落地，但不替代业务架构决策。",
    flow: "ViewModel 与 LiveData 接入既有状态方向和测试边界。",
    failure: "只保留 API 名称，检查能否解释状态与恢复。",
  },
  {
    label: "发布判定",
    owner: "整书只有在来源、文本、视觉、练习与工程门禁都通过后上架。",
    flow: "章节审计 → 视觉实测 → 整书覆盖 → 发布审批。",
    failure: "任意章节哈希变化后，旧审批必须立即失效。",
  },
] as const;

export function AdpOfficialFinalReviewLab() {
  return (
    <AndroidArchitectureLab
      title="把八章结论压回可复现决策"
      question="一份架构建议怎样才足以交给另一个团队执行？"
      stages={stages}
    />
  );
}
