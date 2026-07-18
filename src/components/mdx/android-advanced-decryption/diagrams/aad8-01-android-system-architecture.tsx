"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第1章 Android系统架构",
  focus:
    "建立应用层、应用框架层、C/C++程序库与运行时、HAL和Linux内核的调用边界，并掌握Android 8.0源码目录与阅读路径",
  nodes: [
    "1.1 Android系统架构",
    "1.2 Android系统源码目录",
    "1.2.1 整体结构",
    "1.2.2 应用层部分",
    "1.2.3 应用框架层部分",
    "1.2.4 C/C++程序库部分",
    "1.3 源码阅读",
    "1.3.1 在线阅读",
    "1.3.2 使用Source Insight",
    "1.4 本章小结",
  ],
  invariant:
    "每次源码追踪都能从公开入口沿真实调用链定位到责任层、进程、线程与返回结果，不用架构层名替代代码证据",
  failure:
    "只背五层架构图却不知道frameworks/base、system/core和art中的入口，会在类名变化或跨Java/Native边界时失去追踪路径",
  links: [
    {
      label: "分层地图",
      mechanism: "按稳定责任而非目录数量划层",
      evidence: "公开API到内核调用链",
    },
    {
      label: "源码目录",
      mechanism: "把模块映射到构建与运行责任",
      evidence: "路径、进程和产物",
    },
    {
      label: "在线阅读",
      mechanism: "按Android 8.0标签交叉引用",
      evidence: "版本、文件与行号",
    },
    {
      label: "本地索引",
      mechanism: "用符号引用恢复调用关系",
      evidence: "调用者、实现与条件编译",
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

export function Aad801AndroidSystemArchitectureTraceLab() {
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

export function Aad801AndroidSystemArchitectureFaultLab() {
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

export function Aad801AndroidSystemArchitectureEvidenceLab() {
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
