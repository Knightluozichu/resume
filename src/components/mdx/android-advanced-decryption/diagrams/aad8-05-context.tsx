"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第5章 理解上下文Context",
  focus:
    "沿Context、ContextWrapper与ContextImpl关系，比较Application、Activity和Service的Context创建、持有资源与生命周期",
  nodes: [
    "5.1 Context的关联类",
    "5.2 Application Context的创建过程",
    "5.3 Application Context的获取过程",
    "5.4 Activity的Context创建过程",
    "5.5 Service的Context创建过程",
    "5.6 本章小结",
  ],
  invariant:
    "每个Context引用都能说明base实现、主题/窗口能力、生命周期所有者与允许的操作；长生命周期对象不持有短生命周期Activity",
  failure:
    "把所有Context视为可互换会导致窗口token错误、主题丢失和Activity泄漏，也无法解释Application与Service的创建入口",
  links: [
    {
      label: "接口层",
      mechanism: "Context定义系统能力",
      evidence: "调用契约",
    },
    {
      label: "实现层",
      mechanism: "ContextImpl连接资源和系统服务",
      evidence: "mBase与创建入口",
    },
    {
      label: "包装层",
      mechanism: "组件委托base context",
      evidence: "attachBaseContext轨迹",
    },
    {
      label: "作用域",
      mechanism: "按组件生命周期选择引用",
      evidence: "创建、使用和释放",
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

export function Aad805ContextTraceLab() {
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

export function Aad805ContextFaultLab() {
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

export function Aad805ContextEvidenceLab() {
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
