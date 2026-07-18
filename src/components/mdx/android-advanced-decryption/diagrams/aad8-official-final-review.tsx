"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "Android 8.0源码总复习",
  focus:
    "用一个应用启动、插件组件和性能故障贯通17章，从init到窗口首帧，再到ClassLoader/Hook/插件化与内存回收",
  nodes: [
    "复习第1章 Android系统架构",
    "复习第2章 Android系统启动",
    "复习第3章 应用程序进程启动过程",
    "复习第4章 四大组件的工作过程",
    "复习第5章 理解上下文Context",
    "复习第6章 理解ActivityManagerService",
    "复习第7章 理解WindowManager",
    "复习第8章 理解WindowManagerService",
    "复习第9章 JNI原理",
    "复习第10章 Java虚拟机",
    "复习第11章 Dalvik和ART",
    "复习第12章 理解ClassLoader",
    "复习第13章 热修复原理",
    "复习第14章 Hook技术",
    "复习第15章 插件化原理",
    "复习第16章 绘制优化",
    "复习第17章 内存优化",
  ],
  invariant:
    "独立复核者可从同一Android 8.0镜像和样例复现跨进程调用、类/资源加载、帧与堆证据，并明确停止和回退条件",
  failure:
    "分章背诵类名却不能沿同一请求跨章追踪，会在系统版本、进程切换或性能症状变化时失去诊断能力",
  links: [
    {
      label: "启动主链",
      mechanism: "init到Launcher再到应用进程",
      evidence: "PID、服务和主循环",
    },
    {
      label: "组件窗口",
      mechanism: "AMS/ActivityThread到WMS/Surface",
      evidence: "record、token和首帧",
    },
    {
      label: "动态技术",
      mechanism: "ClassLoader、Hotfix、Hook与插件化",
      evidence: "查找顺序与恢复",
    },
    {
      label: "性能闭环",
      mechanism: "帧追踪与GC Root链",
      evidence: "P99、堆稳态和回归",
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

export function Aad8OfficialFinalReviewTraceLab() {
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

export function Aad8OfficialFinalReviewFaultLab() {
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

export function Aad8OfficialFinalReviewEvidenceLab() {
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
