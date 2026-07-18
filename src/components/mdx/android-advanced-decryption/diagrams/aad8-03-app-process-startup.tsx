"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第3章 应用程序进程启动过程",
  focus:
    "从AMS提出进程请求，经Zygote socket与fork，到RuntimeInit、ActivityThread、Binder线程池和主线程Looper就绪",
  nodes: [
    "3.1 应用程序进程简介",
    "3.2 应用程序进程启动过程介绍",
    "3.2.1 AMS发送启动应用程序进程请求",
    "3.2.2 Zygote接收请求并创建应用程序进程",
    "3.3 Binder线程池启动过程",
    "3.4 消息循环创建过程",
    "3.5 本章小结",
  ],
  invariant:
    "进程只有在PID、Binder线程池、主线程消息循环和Application绑定均可观察时才算启动完成，不能把fork成功当成应用可运行",
  failure:
    "忽略Zygote父子分支或ActivityThread主循环会误判代码运行进程与线程，也无法解释启动超时、Binder阻塞和主线程尚未就绪的竞态",
  links: [
    {
      label: "AMS请求",
      mechanism: "确定uid、gid和入口参数",
      evidence: "startProcessLocked轨迹",
    },
    {
      label: "Zygote孵化",
      mechanism: "socket解析参数后fork",
      evidence: "父子分支与PID",
    },
    {
      label: "Binder池",
      mechanism: "加入IPC驱动线程池",
      evidence: "binder线程与事务",
    },
    {
      label: "主循环",
      mechanism: "准备Looper并绑定应用",
      evidence: "main线程消息队列",
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

export function Aad803AppProcessStartupTraceLab() {
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

export function Aad803AppProcessStartupFaultLab() {
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

export function Aad803AppProcessStartupEvidenceLab() {
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
