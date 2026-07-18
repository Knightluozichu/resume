import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第12章 内存管理",
  label: "内存 · 地址空间与页缓存",
  color: "#15803d",
  soft: "#dcfce7",
  chain: [
    "确定容量连续性",
    "选择内存区",
    "设置GFP上下文",
    "分配并初始化",
    "观察缓存与映射",
    "按来源释放",
  ],
  concepts: [
    "第12章 内存管理",
    "12.1 页",
    "12.2 区",
    "12.3 获得页",
    "12.3.1 获得填充为0的页",
    "12.3.2 释放页",
    "12.4 kmalloc()",
    "12.4.1 gfp_mask标志",
    "12.4.2 kfree()",
    "12.5 vmalloc()",
    "12.6 slab层",
    "12.6.1 slab层的设计",
    "12.6.2 slab分配器的接口",
    "12.7 在栈上的静态分配",
    "12.7.1 单页内核栈",
    "12.7.2 在栈上光明正大地工作",
    "12.8 高端内存的映射",
    "12.8.1 永久映射",
    "12.8.2 临时映射",
    "12.9 每个CPU的分配",
    "12.10 新的每个CPU接口",
    "12.10.1 编译时的每个CPU数据",
    "12.10.2 运行时的每个CPU数据",
    "12.11 使用每个CPU数据的原因",
    "12.12 分配函数的选择",
    "12.13 小结",
  ],
} as const;

export function Lkd12MemoryManagementMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd12MemoryManagementExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd12MemoryManagementEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
