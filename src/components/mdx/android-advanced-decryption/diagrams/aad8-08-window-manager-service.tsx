"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第8章 理解WindowManagerService",
  focus:
    "在system_server侧分析WMS职责、创建依赖、重要成员以及Window添加与删除时的权限、token、WindowState和Surface链路",
  nodes: [
    "8.1 WMS的职责",
    "8.2 WMS的创建过程",
    "8.3 WMS的重要成员",
    "8.4 Window的添加过程（WMS处理部分）",
    "8.5 Window的删除过程",
    "8.6 本章小结",
  ],
  invariant:
    "窗口进入系统前通过权限、display、token和父子关系校验；删除后WindowState、输入通道和Surface资源均可证明被释放",
  failure:
    "只追客户端addView而不进入WMS会遗漏拒绝码、WindowToken与Surface分配，也无法解释窗口已从View树删除但系统资源仍残留",
  links: [
    {
      label: "职责",
      mechanism: "集中窗口策略、层级和输入协调",
      evidence: "system_server状态",
    },
    {
      label: "创建",
      mechanism: "SystemServer按依赖启动WMS",
      evidence: "Display/Input/Policy协作",
    },
    {
      label: "添加",
      mechanism: "校验后创建WindowState并分配资源",
      evidence: "addWindow返回与窗口树",
    },
    {
      label: "删除",
      mechanism: "从映射和层级移除并回收Surface",
      evidence: "资源归零与焦点迁移",
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

export function Aad808WindowManagerServiceTraceLab() {
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

export function Aad808WindowManagerServiceFaultLab() {
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

export function Aad808WindowManagerServiceEvidenceLab() {
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
