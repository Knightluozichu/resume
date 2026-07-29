"use client";

import { AndroidArchitectureLab } from "./android-architecture-lab";

const stages = [
  {
    label: "版本边界",
    owner: "2018 年正式版目录与出版时样例共同限定讨论范围。",
    flow: "商品页确认版本，样章确认目录，仓库确认可运行代码。",
    failure: "混入 Compose 或 Hilt 后，检查结论是否仍属于原书时代。",
  },
  {
    label: "样例快照",
    owner: "复现实验者负责保存提交号、工具链与设备条件。",
    flow: "来源链接指向快照，命令与输出组成可追溯记录。",
    failure: "切换依赖版本，观察同一源码是否改变行为。",
  },
  {
    label: "责任声明",
    owner: "课程作者承担独立核对和改写责任，不把目录当事实证明。",
    flow: "目录限定范围，技术事实再由代码和官方资料交叉验证。",
    failure: "找不到可复核来源时，结论必须降级为待验证。",
  },
] as const;

export function AdpPrefaceLab() {
  return (
    <AndroidArchitectureLab
      title="先校准版本，再讨论架构"
      question="一条结论如何证明来自正式版而非后来经验？"
      stages={stages}
    />
  );
}
