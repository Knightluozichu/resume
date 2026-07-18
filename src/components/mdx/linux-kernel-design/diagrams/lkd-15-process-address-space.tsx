import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第15章 进程地址空间",
  label: "内存 · 地址空间与页缓存",
  color: "#6d28d9",
  soft: "#ede9fe",
  chain: [
    "定位内存描述符",
    "枚举VMA区间",
    "查找相交区域",
    "创建映射",
    "更新页表",
    "解除映射并回收",
  ],
  concepts: [
    "第15章 进程地址空间",
    "15.1 地址空间",
    "15.2 内存描述符",
    "15.2.1 分配内存描述符",
    "15.2.2 撤销内存描述符",
    "15.2.3 mm_struct与内核线程",
    "15.3 虚拟内存区域",
    "15.3.1 VMA标志",
    "15.3.2 VMA操作",
    "15.3.3 内存区域的树型结构和内存区域的链表结构",
    "15.3.4 实际使用中的内存区域",
    "15.4 操作内存区域",
    "15.4.1 find_vma()",
    "15.4.2 find_vma_prev()",
    "15.4.3 find_vma_intersection()",
    "15.5 mmap()和do_mmap()：创建地址 区间",
    "15.6 munmap()和do_munmap()：删除 地址区间",
    "15.7 页表",
    "15.8 小结",
  ],
} as const;

export function Lkd15ProcessAddressSpaceMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd15ProcessAddressSpaceExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd15ProcessAddressSpaceEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
