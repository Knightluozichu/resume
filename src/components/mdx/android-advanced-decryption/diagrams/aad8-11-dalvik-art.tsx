"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第11章 Dalvik和ART",
  focus:
    "比较DVM与JVM、DVM架构与堆日志，再分析ART的执行/堆/GC日志差异以及两种运行时的演进背景",
  nodes: [
    "11.1 Dalvik虚拟机",
    "11.1.1 DVM与JVM的区别",
    "11.1.2 DVM架构",
    "11.1.3 DVM的运行时堆",
    "11.1.4 DVM的GC日志",
    "11.2 ART虚拟机",
    "11.2.1 ART与DVM的区别",
    "11.2.2 ART的运行时堆",
    "11.2.3 ART的GC日志",
    "11.3 DVM和ART的诞生",
    "11.4 本章小结",
  ],
  invariant:
    "比较结论明确Android版本、字节码/寄存器模型、编译时机、堆与GC日志字段，不能把ART简化为只有AOT或把现代行为倒灌到8.0",
  failure:
    "只用“Dalvik JIT、ART AOT”二分会遗漏Android 7/8的混合编译、配置文件和不同GC策略，也无法从日志诊断停顿",
  links: [
    {
      label: "DVM/JVM",
      mechanism: "比较寄存器与栈式执行模型",
      evidence: "字节码和指令轨迹",
    },
    {
      label: "DVM堆",
      mechanism: "读取旧运行时分配与GC日志",
      evidence: "原因、暂停和释放量",
    },
    {
      label: "ART堆",
      mechanism: "识别8.0运行时空间与收集器",
      evidence: "堆空间和并发阶段",
    },
    {
      label: "演进",
      mechanism: "按版本解释JIT/AOT组合",
      evidence: "安装、运行和配置文件",
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

export function Aad811DalvikArtTraceLab() {
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

export function Aad811DalvikArtFaultLab() {
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

export function Aad811DalvikArtEvidenceLab() {
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
