import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第6章 内核数据结构",
  label: "结构 · 中断与延后工作",
  color: "#0e7490",
  soft: "#cffafe",
  chain: [
    "描述访问模式",
    "选择结构",
    "初始化所有权",
    "插入与查找",
    "并发遍历",
    "删除并销毁",
  ],
  concepts: [
    "第6章 内核数据结构",
    "6.1 链表",
    "6.1.1 单向链表和双向链表",
    "6.1.2 环形链表",
    "6.1.3 沿链表移动",
    "6.1.4 Linux 内核中的实现",
    "6.1.5 操作链表",
    "6.1.6 遍历链表",
    "6.2 队列",
    "6.2.1 kfifo",
    "6.2.2 创建队列",
    "6.2.3 推入队列数据",
    "6.2.4 摘取队列数据",
    "6.2.5 获取队列长度",
    "6.2.6 重置和撤销队列",
    "6.2.7 队列使用举例",
    "6.3 映射",
    "6.3.1 初始化一个idr",
    "6.3.2 分配一个新的UID",
    "6.3.3 查找UID",
    "6.3.4 删除UID",
    "6.3.5 撤销idr",
    "6.4 二叉树",
    "6.4.1 二叉搜索树",
    "6.4.2 自平衡二叉搜索树",
    "6.5 数据结构以及选择",
    "6.6 算法复杂度",
    "6.6.1 算法",
    "6.6.2 大O符号",
    "6.6.3 大Θ符号",
    "6.6.4 时间复杂度",
    "6.7 小结",
  ],
} as const;

export function Lkd06KernelDataStructuresMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd06KernelDataStructuresExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd06KernelDataStructuresEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
