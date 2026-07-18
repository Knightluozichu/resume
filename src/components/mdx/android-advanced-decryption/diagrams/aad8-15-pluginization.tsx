"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第15章 插件化原理",
  focus:
    "从动态加载与工程瓶颈出发，串联Activity、Service、ContentProvider、BroadcastReceiver、资源和so六类插件化边界",
  nodes: [
    "15.1 动态加载技术",
    "15.2 插件化的产生",
    "15.2.1 应用开发的痛点和瓶颈",
    "15.2.2 插件化思想",
    "15.2.3 插件化定义",
    "15.3 插件化框架对比",
    "15.4 Activity插件化",
    "15.4.1 Activity的启动过程回顾",
    "15.4.2 Hook IActivityManager方案实现",
    "15.4.3 Hook Instrumentation方案实现",
    "15.4.4 总结",
    "15.5 Service插件化",
    "15.5.1 插件化方面Service与Activity的不同",
    "15.5.2 代理分发实现",
    "15.6 ContentProvider插件化",
    "15.6.1 ContentProvider的启动过程回顾",
    "15.6.2 VirtualApk的实现",
    "15.7 BroadcastReceiver的插件化",
    "15.7.1 广播插件化思路",
    "15.7.2 VirtualApk的实现",
    "15.8 资源的插件化",
    "15.8.1 系统资源加载",
    "15.8.2 VirtualApk实现",
    "15.9 so的插件化",
    "15.10 本章小结",
  ],
  invariant:
    "宿主能加载插件代码/资源并通过占位或代理满足Android 8.0组件注册检查，同时恢复真实组件生命周期、Context、类加载器与资源",
  failure:
    "只让插件Activity显示不等于插件化完成；Service粘性、Provider authority、广播注册、资源ID冲突和so ABI任一遗漏都会破坏组件语义",
  links: [
    {
      label: "Activity",
      mechanism: "占位Intent过AMS后还原插件目标",
      evidence: "双Hook与生命周期",
    },
    {
      label: "Service",
      mechanism: "代理Service按命令分发插件实例",
      evidence: "启动/停止/绑定语义",
    },
    {
      label: "Provider/Receiver",
      mechanism: "安装或代理组件入口",
      evidence: "authority与注册表",
    },
    {
      label: "资源/so",
      mechanism: "建立插件独立查找路径",
      evidence: "AssetManager、Resources与ABI",
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

export function Aad815PluginizationTraceLab() {
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

export function Aad815PluginizationFaultLab() {
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

export function Aad815PluginizationEvidenceLab() {
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
