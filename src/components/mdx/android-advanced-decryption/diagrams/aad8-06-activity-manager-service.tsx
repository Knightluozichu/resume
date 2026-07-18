"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第6章 理解ActivityManagerService",
  focus:
    "比较Android 7.0与8.0的AMS访问家族，追踪AMS启动、应用进程协作、ActivityRecord/TaskRecord/ActivityStack与任务栈规则",
  nodes: [
    "6.1 AMS家族",
    "6.1.1 Android 7.0的AMS家族",
    "6.1.2 Android 8.0的AMS家族",
    "6.2 AMS的启动过程",
    "6.3 AMS与应用程序进程",
    "6.4 AMS重要的数据结构",
    "6.4.1 解析ActivityRecord",
    "6.4.2 解析TaskRecord",
    "6.4.3 解析ActivityStack",
    "6.5 Activity栈管理",
    "6.5.1 Activity任务栈模型",
    "6.5.2 Launch Mode",
    "6.5.3 Intent的FLAG",
    "6.5.4 taskAffinity",
    "6.6 本章小结",
  ],
  invariant:
    "任何Activity栈结论都能由record、task、stack三层数据和Intent/manifest输入共同解释，且明确Android 8.0访问入口",
  failure:
    "混用ActivityManagerNative旧入口与Android 8.0单例入口，或只背launchMode而不看FLAG和taskAffinity，会得出错误任务归属",
  links: [
    {
      label: "AMS家族",
      mechanism: "客户端代理连接system_server服务",
      evidence: "7.0/8.0入口差异",
    },
    {
      label: "启动",
      mechanism: "SystemServer创建并注册AMS",
      evidence: "启动阶段与依赖",
    },
    {
      label: "数据结构",
      mechanism: "record组成task并置于stack",
      evidence: "dumpsys层级",
    },
    {
      label: "栈规则",
      mechanism: "合并launchMode、FLAG与affinity",
      evidence: "给定Intent的最终task",
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

export function Aad806ActivityManagerServiceTraceLab() {
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

export function Aad806ActivityManagerServiceFaultLab() {
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

export function Aad806ActivityManagerServiceEvidenceLab() {
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
