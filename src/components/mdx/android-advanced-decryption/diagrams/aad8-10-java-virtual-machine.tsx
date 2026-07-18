"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第10章 Java虚拟机",
  focus:
    "建立Class文件、类生命周期、类加载子系统、运行时区域、对象布局、oop-klass模型、可达性标记与四类GC算法的基础",
  nodes: [
    "10.1 概述",
    "10.1.1 Java虚拟机家族",
    "10.1.2 Java虚拟机执行流程",
    "10.2 Java虚拟机结构",
    "10.2.1 Class文件格式",
    "10.2.2 类的生命周期",
    "10.2.3 类加载子系统",
    "10.2.4 运行时数据区域",
    "10.3 对象的创建",
    "10.4 对象的堆内存布局",
    "10.5 oop-klass模型",
    "10.6 垃圾标记算法",
    "10.6.1 Java中的引用",
    "10.6.2 引用计数算法",
    "10.6.3 根搜索算法",
    "10.7 Java对象在虚拟机中的生命周期",
    "10.8 垃圾收集算法",
    "10.8.1 标记—清除算法",
    "10.8.2 复制算法",
    "10.8.3 标记—压缩算法",
    "10.8.4 分代收集算法",
    "10.9 本章小结",
  ],
  invariant:
    "对象创建、存放、可达性判断和回收都能映射到明确运行时区域与算法阶段，不用“栈快、堆慢”之类口号替代模型",
  failure:
    "混淆Class元数据、对象实例、引用变量和线程栈会导致错误的泄漏/GC判断，也无法把JVM概念正确迁移到ART",
  links: [
    {
      label: "类模型",
      mechanism: "从Class文件经加载验证到初始化",
      evidence: "状态与触发点",
    },
    {
      label: "内存区域",
      mechanism: "区分线程私有和共享结构",
      evidence: "对象与帧位置",
    },
    {
      label: "对象模型",
      mechanism: "oop承载实例、klass承载类型",
      evidence: "头、字段与类型关系",
    },
    {
      label: "GC",
      mechanism: "由根搜索标记再选择整理算法",
      evidence: "可达集、暂停与碎片",
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

export function Aad810JavaVirtualMachineTraceLab() {
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

export function Aad810JavaVirtualMachineFaultLab() {
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

export function Aad810JavaVirtualMachineEvidenceLab() {
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
