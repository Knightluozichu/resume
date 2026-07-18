import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第9章 内核同步介绍",
  label: "并发 · 同步与时间",
  color: "#9f1239",
  soft: "#ffe4e6",
  chain: [
    "列出共享状态",
    "识别并发来源",
    "写出不变量",
    "划定临界区",
    "证明锁序无环",
    "测量争用扩展",
  ],
  concepts: [
    "第9章 内核同步介绍",
    "9.1 临界区和竞争条件",
    "9.1.1 为什么我们需要保护",
    "9.1.2 单个变量",
    "9.2 加锁",
    "9.2.1 造成并发执行的原因",
    "9.2.2 了解要保护些什么",
    "9.3 死锁",
    "9.4 争用和扩展性",
    "9.5 小结",
  ],
} as const;

export function Lkd09SyncIntroMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd09SyncIntroExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd09SyncIntroEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
