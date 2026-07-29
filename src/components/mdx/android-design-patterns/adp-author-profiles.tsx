"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "基础样例",
    owner: "日高正博负责前三章的共同规格、MVVM 与 MVP 基线。",
    flow: "三个章节共享 TODO 题目，便于控制变量比较。",
    failure: "若样例规格不同，跨模式结论必须重新校准。",
  },
  {
    label: "真实案例",
    owner: "吉冈毅、小西裕介、藤原圣与今井智章分别承担实践案例。",
    flow: "渐进改造、OSS、Flux、团队重写各自保留项目语境。",
    failure: "不能把一个项目的成功条件直接移植到另一个项目。",
  },
  {
    label: "最终作者表",
    owner: "正式版五位作者是版本事实，众筹草案不能替代。",
    flow: "商品页与正式目录共同确认作者和章节责任。",
    failure: "出现草案作者或未成书章节时应阻止发布。",
  },
] as const;

export function AdpAuthorProfilesLab() {
  return (
    <AndroidArchitectureLab
      title="作者责任与案例语境一一对应"
      question="为什么作者表也是技术事实的来源边界？"
      stages={stages}
    />
  );
}
