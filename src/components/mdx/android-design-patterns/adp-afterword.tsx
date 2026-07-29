"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "致谢边界",
    owner: "作者、编辑、审校与样例贡献者的责任要能被区分。",
    flow: "观点回到具体章节，代码回到具体仓库和提交。",
    failure: "无法确认来源的事实不得借作者名义背书。",
  },
  {
    label: "权利边界",
    owner: "课程只做独立讲解、结构映射与必要短引。",
    flow: "来源页负责版本证据，课程负责自己的解释与实验。",
    failure: "若内容可替代原书阅读，改编范围就已经越界。",
  },
  {
    label: "复核交接",
    owner: "复核者依据来源、实验和版本记录独立判断。",
    flow: "目录映射 → 技术证据 → 练习输出 → 审批记录。",
    failure: "删掉口头背景，检查资料能否仍被完整复现。",
  },
] as const;

export function AdpAfterwordLab() {
  return (
    <AndroidArchitectureLab
      title="把协作与权利也纳入证据链"
      question="多作者实践集如何避免观点与来源被错误拼接？"
      stages={stages}
    />
  );
}
