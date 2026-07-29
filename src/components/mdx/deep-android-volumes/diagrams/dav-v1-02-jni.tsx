"use client";

import {
  OfficialDavSeriesLab,
  type DavCausalModel,
  type DavCoverageNode,
} from "./official-dav-series-lab";

const unitTitle = "卷I 第2章 深入理解JNI";
const focus = "以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界";
const nodes = [
  {
    label: "第2章 深入理解JNI",
    stage: "锁定历史基线",
    mechanism:
      "第2章 深入理解JNI在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查第2章 深入理解JNI的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.1 JNI概述",
    stage: "复现正常轨迹",
    mechanism:
      "2.1 JNI概述在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.1 JNI概述的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.2 学习JNI的实例：MediaScanner",
    stage: "注入单一故障",
    mechanism:
      "2.2 学习JNI的实例：MediaScanner在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.2 学习JNI的实例：MediaScanner的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3 Java层的MediaScanner分析",
    stage: "定位首个分叉",
    mechanism:
      "2.3 Java层的MediaScanner分析在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.3 Java层的MediaScanner分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.1 加载JNI库",
    stage: "恢复同输入重放",
    mechanism:
      "2.3.1 加载JNI库在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.3.1 加载JNI库的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.3.2 Java的native函数和总结",
    stage: "锁定历史基线",
    mechanism:
      "2.3.2 Java的native函数和总结在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.3.2 Java的native函数和总结的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4 JNI层MediaScanner的分析",
    stage: "复现正常轨迹",
    mechanism:
      "2.4 JNI层MediaScanner的分析在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4 JNI层MediaScanner的分析的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.1 注册JNI函数",
    stage: "注入单一故障",
    mechanism:
      "2.4.1 注册JNI函数在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.1 注册JNI函数的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.2 数据类型转换",
    stage: "定位首个分叉",
    mechanism:
      "2.4.2 数据类型转换在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.2 数据类型转换的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.3 JNIEnv介绍",
    stage: "恢复同输入重放",
    mechanism:
      "2.4.3 JNIEnv介绍在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.3 JNIEnv介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.4 通过JNIEnv操作jobject",
    stage: "锁定历史基线",
    mechanism:
      "2.4.4 通过JNIEnv操作jobject在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.4 通过JNIEnv操作jobject的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.5 jstring介绍",
    stage: "复现正常轨迹",
    mechanism:
      "2.4.5 jstring介绍在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.5 jstring介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.6 JNI类型签名介绍",
    stage: "注入单一故障",
    mechanism:
      "2.4.6 JNI类型签名介绍在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.6 JNI类型签名介绍的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.7 垃圾回收",
    stage: "定位首个分叉",
    mechanism:
      "2.4.7 垃圾回收在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.7 垃圾回收的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.4.8 JNI中的异常处理",
    stage: "恢复同输入重放",
    mechanism:
      "2.4.8 JNI中的异常处理在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任要追踪数据从入口到持久化或观察者回调的完整闭环。固定URI、文件或账户样本，记录事务、远端资源、通知与关闭结果，再用重复输入验证幂等和泄漏。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.4.8 JNI中的异常处理的输入、状态变化、错误出口和释放结果",
  },
  {
    label: "2.5 本章小结",
    stage: "锁定历史基线",
    mechanism:
      "2.5 本章小结在“以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界”中的责任是界定分析分母和结论边界。先列出它包含的入口、对象和退出条件，再用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态排除只凭类名或流程图得出的结论。",
    probe:
      "使用库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态检查2.5 本章小结的输入、状态变化、错误出口和释放结果",
  },
] satisfies DavCoverageNode[];
const versions = ["卷I / Android 2.2 / API 8"];
const stages = [
  "锁定历史基线",
  "复现正常轨迹",
  "注入单一故障",
  "定位首个分叉",
  "恢复同输入重放",
];
const model = {
  sourceTag: "android-2.2_r1",
  sourcePath: "platform/frameworks/base @ android-2.2_r1",
  invariant:
    "在android-2.2_r1固定输入下，以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界的入口身份、状态拥有者、成功结果、错误返回和资源释放均可重复观察",
  fault: "只记住函数命名规则，忽略线程附着、引用寿命与异常清理",
  evidence:
    "库加载日志、JNINativeMethod表、JNIEnv线程身份、局部/全局引用和异常状态",
  boundary:
    "以MediaScanner贯通Java声明、JNI注册、类型转换、回调与异常边界的第一个线程、进程、Binder、JNI或持久状态边界",
} satisfies DavCausalModel;
const props = { unitTitle, focus, nodes, versions, stages, model };

export function DavSeriesPipelineLab() {
  return <OfficialDavSeriesLab mode="pipeline" {...props} />;
}

export function DavSeriesExperimentLab() {
  return <OfficialDavSeriesLab mode="experiment" {...props} />;
}

export function DavSeriesEvidenceLab() {
  return <OfficialDavSeriesLab mode="evidence" {...props} />;
}
