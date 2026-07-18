"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第12章 理解ClassLoader",
  focus:
    "先建立Java ClassLoader类型、继承、双亲委托与自定义加载，再进入Android BootClassLoader、PathClassLoader和Dex加载链",
  nodes: [
    "12.1 Java中的ClassLoader",
    "12.1.1 ClassLoader的类型",
    "12.1.2 ClassLoader的继承关系",
    "12.1.3 双亲委托模式",
    "12.1.4 自定义ClassLoader",
    "12.2 Android中的ClassLoader",
    "12.2.1 ClassLoader的类型",
    "12.2.2 ClassLoader的继承关系",
    "12.2.3 ClassLoader的加载过程",
    "12.2.4 BootClassLoader的创建",
    "12.2.5 PathClassLoader的创建",
    "12.3 本章小结",
  ],
  invariant:
    "给定类名和dex路径，能够预测哪个加载器先查找、类身份由哪个加载器定义、何时委托或失败，并用加载器实例验证",
  failure:
    "认为同名Class字节完全相同就属于同一类型，或随意打破委托，会产生ClassCastException、核心类遮蔽和补丁顺序错误",
  links: [
    {
      label: "Java加载器",
      mechanism: "bootstrap/extension/application分工",
      evidence: "父链与定义者",
    },
    {
      label: "双亲委托",
      mechanism: "先请求父加载器再自行查找",
      evidence: "查找顺序",
    },
    {
      label: "自定义加载",
      mechanism: "覆写findClass保持loadClass契约",
      evidence: "类身份和隔离",
    },
    {
      label: "Android加载",
      mechanism: "BaseDexClassLoader遍历dexElements",
      evidence: "路径顺序与命中项",
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

export function Aad812ClassLoaderTraceLab() {
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

export function Aad812ClassLoaderFaultLab() {
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

export function Aad812ClassLoaderEvidenceLab() {
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
