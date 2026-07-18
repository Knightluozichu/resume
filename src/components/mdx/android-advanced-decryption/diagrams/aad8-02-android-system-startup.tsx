"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第2章 Android系统启动",
  focus:
    "沿init、Zygote、SystemServer和Launcher四段主链追踪Android 8.0从PID 1到应用图标可见的启动过程",
  nodes: [
    "2.1 init进程启动过程",
    "2.1.1 引入init进程",
    "2.1.2 init进程的入口函数",
    "2.1.3 解析init.rc",
    "2.1.4 解析Service类型语句",
    "2.1.5 init启动Zygote",
    "2.1.6 属性服务",
    "2.1.7 init进程启动总结",
    "2.2 Zygote进程启动过程",
    "2.2.1 Zygote概述",
    "2.2.2 Zygote启动脚本",
    "2.2.3 Zygote进程启动过程介绍",
    "2.2.4 Zygote进程启动总结",
    "2.3 SystemServer处理过程",
    "2.3.1 Zygote处理SystemServer进程",
    "2.3.2 解析SystemServer进程",
    "2.3.3 SystemServer进程总结",
    "2.4 Launcher启动过程",
    "2.4.1 Launcher概述",
    "2.4.2 Launcher启动过程介绍",
    "2.4.3 Launcher中应用图标显示过程",
    "2.5 Android系统启动流程",
    "2.6 本章小结",
  ],
  invariant:
    "每个阶段都明确谁创建下一进程、使用何种配置或IPC、何时进入消息循环，以及何种日志证明阶段完成",
  failure:
    "把启动描述成线性函数列表会忽略init action/service触发、Zygote socket、SystemServer服务依赖与Launcher查询包信息的跨进程边界",
  links: [
    {
      label: "init",
      mechanism: "解析rc并按触发器启动服务",
      evidence: "进程、属性与service状态",
    },
    {
      label: "Zygote",
      mechanism: "预加载后通过socket接收孵化请求",
      evidence: "fork父子与参数轨迹",
    },
    {
      label: "SystemServer",
      mechanism: "注册核心系统服务",
      evidence: "ServiceManager和启动阶段",
    },
    {
      label: "Launcher",
      mechanism: "查询并呈现可启动Activity",
      evidence: "包查询与首屏图标",
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

export function Aad802AndroidSystemStartupTraceLab() {
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

export function Aad802AndroidSystemStartupFaultLab() {
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

export function Aad802AndroidSystemStartupEvidenceLab() {
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
