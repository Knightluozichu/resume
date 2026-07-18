import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第16章 页高速缓存和页回写",
  label: "内存 · 地址空间与页缓存",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "定位缓存映射",
    "查找缓存页",
    "标记脏页",
    "触发回写",
    "处理拥塞",
    "回收并核对持久性",
  ],
  concepts: [
    "第16章 页高速缓存和页回写",
    "16.1 缓存手段",
    "16.1.1 写缓存",
    "16.1.2 缓存回收",
    "16.2 Linux页高速缓存",
    "16.2.1 address_space对象",
    "16.2.2 address_space操作",
    "16.2.3 基树",
    "16.2.4 以前的页散列表",
    "16.3 缓冲区高速缓存",
    "16.4 flusher线程",
    "16.4.1 膝上型计算机模式",
    "16.4.2 历史上的bdflush、kupdated和pdflush",
    "16.4.3 避免拥塞的方法：使用多线程",
    "16.5 小结",
  ],
} as const;

export function Lkd16PageCacheWritebackMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd16PageCacheWritebackExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd16PageCacheWritebackEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
