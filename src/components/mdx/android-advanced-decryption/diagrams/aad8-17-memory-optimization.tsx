"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第17章 内存优化",
  focus:
    "从可控泄漏场景出发，依次使用Memory Monitor、Allocation Tracker、Heap Dump、MAT和LeakCanary形成发现到根因的证据链",
  nodes: [
    "17.1 避免可控的内存泄漏",
    "17.1.1 什么是内存泄漏",
    "17.1.2 内存泄漏的场景",
    "17.2 Memory Monitor",
    "17.2.1 使用Memory Monitor",
    "17.2.2 大内存申请与GC",
    "17.2.3 内存抖动",
    "17.3 Allocation Tracker",
    "17.3.1 使用Allocation Tracker",
    "17.3.2 alloc文件分析",
    "17.4 Heap Dump",
    "17.4.1 使用Heap Dump",
    "17.4.2 检测内存泄漏",
    "17.5 内存分析工具MAT",
    "17.5.1 生成hprof文件",
    "17.5.2 MAT分析hprof文件",
    "17.6 LeakCanary",
    "17.6.1 使用LeakCanary",
    "17.6.2 LeakCanary应用举例",
    "17.7 本章小结",
  ],
  invariant:
    "泄漏结论必须显示预期销毁对象仍被GC Root路径持有；优化后重复场景中对象可回收、堆稳态恢复且无功能回归",
  failure:
    "把一次堆增长当泄漏或只贴LeakCanary结论会混淆缓存、抖动与真实不可达失败，也无法证明修复后的稳定状态",
  links: [
    {
      label: "泄漏场景",
      mechanism: "列出静态、线程、内部类和回调引用",
      evidence: "预期释放点",
    },
    {
      label: "分配观测",
      mechanism: "区分大对象、频繁分配与GC",
      evidence: "时间序列和调用栈",
    },
    {
      label: "堆快照",
      mechanism: "从GC Root反查支配与保留",
      evidence: "retained size与路径",
    },
    {
      label: "自动检测",
      mechanism: "用ReferenceQueue确认对象未释放",
      evidence: "泄漏链和复测",
    },
  ],
  gates: [
    "出版社目录与Android 8.0版本",
    "源码文件、符号与调用者",
    "进程、线程、Binder/JNI/加载边界",
    "状态转移、返回码与完成回调",
    "单变量失败、恢复与资源释放",
    "停止、回退、责任人与复核人",
  ],
} as const;

export function Aad817MemoryOptimizationTraceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="trace"
    />
  );
}

export function Aad817MemoryOptimizationFaultLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="fault"
    />
  );
}

export function Aad817MemoryOptimizationEvidenceLab() {
  return (
    <AndroidAdvancedDecodeLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
