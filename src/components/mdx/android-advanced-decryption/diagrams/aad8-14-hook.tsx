"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第14章 Hook技术",
  focus:
    "从代理模式和动态代理建立替换点，再分别Hook Activity与Context的startActivity调用链，验证代理注入与委托",
  nodes: [
    "14.1 Hook技术概述",
    "14.2 Hook技术分类",
    "14.3 代理模式",
    "14.3.1 代理模式简单实现",
    "14.3.2 动态代理的简单实现",
    "14.4 Hook startActivity方法",
    "14.4.1 Hook Activity的startActivity方法",
    "14.4.2 Hook Context的startActivity方法",
    "14.4.3 Hook startActivity总结",
    "14.5 本章小结",
  ],
  invariant:
    "Hook对象与原对象满足同一接口，未命中的调用完整委托，命中调用可记录/改写且能恢复原引用，不破坏并发与异常语义",
  failure:
    "按字段名反射替换单例却不校验Android 8.0版本，会因缓存位置或隐藏实现变化失效；吞掉未处理方法还会改变整个系统服务代理语义",
  links: [
    {
      label: "代理基础",
      mechanism: "同接口包装真实对象",
      evidence: "委托与拦截范围",
    },
    {
      label: "动态代理",
      mechanism: "InvocationHandler按Method筛选",
      evidence: "参数、返回和异常",
    },
    {
      label: "Activity入口",
      mechanism: "替换Activity内部Instrumentation",
      evidence: "startActivity轨迹",
    },
    {
      label: "Context入口",
      mechanism: "替换系统服务代理单例",
      evidence: "跨Context命中范围",
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

export function Aad814HookTraceLab() {
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

export function Aad814HookFaultLab() {
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

export function Aad814HookEvidenceLab() {
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
