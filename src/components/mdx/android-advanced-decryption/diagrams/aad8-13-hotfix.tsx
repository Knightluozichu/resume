"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第13章 热修复原理",
  focus:
    "比较资源、代码与so三类修复：从Instant Run资源策略，到dex类加载/底层替换/Instant Run代码方案，再到System.load与nativeLoad",
  nodes: [
    "13.1 热修复的产生",
    "13.2 热修复框架的种类和对比",
    "13.3 资源修复",
    "13.3.1 Instant Run概述",
    "13.3.2 Instant Run的资源修复",
    "13.4 代码修复",
    "13.4.1 类加载方案",
    "13.4.2 底层替换方案",
    "13.4.3 Instant Run方案",
    "13.5 动态链接库的修复",
    "13.5.1 System的load和loadLibarary方法",
    "13.5.2 nativeLoad方法分析",
    "13.6 本章小结",
  ],
  invariant:
    "补丁必须在错误实现首次加载前生效，资源/类/so解析命中补丁且可回滚，并验证Android 8.0兼容、签名和进程重启边界",
  failure:
    "只验证补丁文件下载成功会遗漏类已加载、资源缓存、ABI、so依赖和进程状态，可能得到部分用户有效、重启后失效的不可控修复",
  links: [
    {
      label: "资源补丁",
      mechanism: "替换或追加资源查找路径",
      evidence: "资源ID、配置和缓存",
    },
    {
      label: "类加载",
      mechanism: "把补丁dex置于原dex之前",
      evidence: "dexElements顺序",
    },
    {
      label: "底层替换",
      mechanism: "修改运行时方法实现",
      evidence: "版本/架构兼容矩阵",
    },
    {
      label: "so修复",
      mechanism: "控制native库搜索和装载",
      evidence: "ABI、路径与符号",
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

export function Aad813HotfixTraceLab() {
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

export function Aad813HotfixFaultLab() {
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

export function Aad813HotfixEvidenceLab() {
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
