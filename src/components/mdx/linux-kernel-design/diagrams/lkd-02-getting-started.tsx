import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第2章 从内核出发",
  label: "基础 · 内核与源码",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "取得源码",
    "核对源码树",
    "配置内核",
    "并行编译",
    "安装与回退",
    "检查开发约束",
  ],
  concepts: [
    "第2章 从内核出发",
    "2.1 获取内核源码",
    "2.1.1 使用Git",
    "2.1.2 安装内核源代码",
    "2.1.3 使用补丁",
    "2.2 内核源码树",
    "2.3 编译内核",
    "2.3.1 配置内核",
    "2.3.2 减少编译的垃圾信息",
    "2.3.3 衍生多个编译作业",
    "2.3.4 安装新内核",
    "2.4 内核开发的特点",
    "2.4.1 无libc库抑或无标准头文件",
    "2.4.2 GNU C",
    "2.4.3 没有内存保护机制",
    "2.4.4 不要轻易在内核中使用浮点数",
    "2.4.5 容积小而固定的栈",
    "2.4.6 同步和并发",
    "2.4.7 可移植性的重要性",
    "2.5 小结",
  ],
} as const;

export function Lkd02GettingStartedMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd02GettingStartedExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd02GettingStartedEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
