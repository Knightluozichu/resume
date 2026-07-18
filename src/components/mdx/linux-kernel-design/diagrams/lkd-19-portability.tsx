import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第19章 可移植性",
  label: "可移植性 · 社区交付",
  color: "#334155",
  soft: "#e2e8f0",
  chain: [
    "识别架构假设",
    "固定宽度类型",
    "检查对齐填补",
    "转换字节序",
    "适配页长时间",
    "验证SMP与配置",
  ],
  concepts: [
    "第19章 可移植性",
    "19.1 可移植操作系统",
    "19.2 Linux移植史",
    "19.3 字长和数据类型",
    "19.3.1 不透明类型",
    "19.3.2 指定数据类型",
    "19.3.3 长度明确的数据类型",
    "19.3.4 char型的符号问题",
    "19.4 数据对齐",
    "19.4.1 避免对齐引发的问题",
    "19.4.2 非标准类型的对齐",
    "19.4.3 结构体填补",
    "19.5 字节顺序",
    "19.6 时间",
    "19.7 页长度",
    "19.8 处理器排序",
    "19.9 SMP、内核抢占、高端内存",
    "19.10 小结",
  ],
} as const;

export function Lkd19PortabilityMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd19PortabilityExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd19PortabilityEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
