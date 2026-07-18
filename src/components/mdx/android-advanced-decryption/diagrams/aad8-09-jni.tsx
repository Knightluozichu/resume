"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第9章 JNI原理",
  focus:
    "以MediaRecorder为纵向样例连接Java Framework、JNI注册和Native实现，并掌握类型、签名、JNIEnv、成员ID与引用生命周期",
  nodes: [
    "9.1 系统源码中的JNI",
    "9.2 MediaRecorder框架中的JNI",
    "9.2.1 Java Framework层的MediaRecorder",
    "9.2.2 JNI层的MediaRecorder",
    "9.2.3 Native方法注册",
    "9.3 数据类型的转换",
    "9.3.1 基本数据类型的转换",
    "9.3.2 引用数据类型的转换",
    "9.4 方法签名",
    "9.5 解析JNIEnv",
    "9.5.1 jfieldID和jmethodID",
    "9.5.2 使用jfieldID和jmethodID",
    "9.6 引用类型",
    "9.6.1 本地引用",
    "9.6.2 全局引用",
    "9.6.3 弱全局引用",
    "9.7 本章小结",
  ],
  invariant:
    "每次JNI调用都能校验签名和类型，检查异常，控制本地/全局/弱全局引用生命周期，并明确线程对应的JNIEnv",
  failure:
    "缓存本地引用、跨线程复用JNIEnv或写错方法签名可能在简单测试中不暴露，却会在GC、线程切换或压力下崩溃",
  links: [
    {
      label: "框架纵切",
      mechanism: "从MediaRecorder Java入口到native实现",
      evidence: "注册表与调用链",
    },
    {
      label: "类型转换",
      mechanism: "区分基本值与对象句柄",
      evidence: "签名和边界检查",
    },
    {
      label: "成员ID",
      mechanism: "查找并缓存字段/方法标识",
      evidence: "异常与类生命周期",
    },
    {
      label: "引用",
      mechanism: "按作用域管理local/global/weak",
      evidence: "GC可达性与释放",
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

export function Aad809JniTraceLab() {
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

export function Aad809JniFaultLab() {
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

export function Aad809JniEvidenceLab() {
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
