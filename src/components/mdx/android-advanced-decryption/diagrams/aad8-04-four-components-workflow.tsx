"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第4章 四大组件的工作过程",
  focus:
    "以Activity、启动/绑定Service、动态广播和ContentProvider为四条端到端链路，连接ContextImpl、AMS、ApplicationThread与ActivityThread",
  nodes: [
    "4.1 根Activity的启动过程",
    "4.1.1 Launcher请求AMS过程",
    "4.1.2 AMS到ApplicationThread的调用过程",
    "4.1.3 ActivityThread启动Activity的过程",
    "4.1.4 根Activity启动过程中涉及的进程",
    "4.2 Service的启动过程",
    "4.2.1 ContextImpl到AMS的调用过程",
    "4.2.2 ActivityThread启动Service",
    "4.3 Service的绑定过程",
    "4.3.1 ContextImpl到AMS的调用过程",
    "4.3.2 Service的绑定过程",
    "4.4 广播的注册、发送和接收过程",
    "4.4.1 广播的注册过程",
    "4.4.2 广播的发送和接收过程",
    "4.5 Content Provider的启动过程",
    "4.5.1 query方法到AMS的调用过程",
    "4.5.2 AMS启动Content Provider的过程",
    "4.6 本章小结",
  ],
  invariant:
    "每个组件链都区分调用进程、system_server决策、目标进程调度和主线程回调，并能说明组件不存在或进程未启动时的分支",
  failure:
    "把startActivity、startService、sendBroadcast或query视为本地方法会遗漏Binder跳转、进程创建、调度队列与生命周期回调顺序",
  links: [
    {
      label: "Activity链",
      mechanism: "Launcher经AMS调度目标Activity",
      evidence: "跨进程时序与生命周期",
    },
    {
      label: "Service链",
      mechanism: "区分启动状态与绑定连接",
      evidence: "token、connection与回调",
    },
    {
      label: "广播链",
      mechanism: "解析接收者并有序/并行分发",
      evidence: "注册、队列与接收完成",
    },
    {
      label: "Provider链",
      mechanism: "先取得稳定provider再执行query",
      evidence: "发布、引用与调用进程",
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

export function Aad804FourComponentsWorkflowTraceLab() {
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

export function Aad804FourComponentsWorkflowFaultLab() {
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

export function Aad804FourComponentsWorkflowEvidenceLab() {
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
