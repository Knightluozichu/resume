"use client";

import { AndroidAdvancedDecodeLab } from "./official-android-advanced-decode-lab";

const config = {
  unitTitle: "第7章 理解WindowManager",
  focus:
    "从客户端Window、WindowManager、WindowManagerImpl、WindowManagerGlobal到ViewRootImpl，解释窗口属性与添加、更新、删除操作",
  nodes: [
    "7.1 Window、WindowManager和WMS",
    "7.2 WindowManager的关联类",
    "7.3 Window的属性",
    "7.3.1 Window的类型和显示次序",
    "7.3.2 Window的标志",
    "7.3.3 软键盘相关模式",
    "7.4 Window的操作",
    "7.4.1 系统窗口的添加过程",
    "7.4.2 Activity的添加过程",
    "7.4.3 Window的更新过程",
    "7.5 本章小结",
  ],
  invariant:
    "每个窗口都具备合法token、type、flags、softInputMode和ViewRootImpl会话；显示次序与输入行为能从LayoutParams解释",
  failure:
    "把WindowManager当作普通View容器会忽略token和WMS会话，导致BadTokenException、层级错误或软键盘遮挡行为不可预测",
  links: [
    {
      label: "关联类",
      mechanism: "分离窗口抽象、客户端管理与根视图",
      evidence: "对象创建和委托关系",
    },
    {
      label: "窗口类型",
      mechanism: "用type决定应用/子/系统层级",
      evidence: "token与Z-order",
    },
    {
      label: "标志",
      mechanism: "声明焦点、触摸与安全行为",
      evidence: "flags组合",
    },
    {
      label: "窗口操作",
      mechanism: "add/update/remove驱动ViewRootImpl",
      evidence: "会话调用与遍历",
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

export function Aad807WindowManagerTraceLab() {
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

export function Aad807WindowManagerFaultLab() {
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

export function Aad807WindowManagerEvidenceLab() {
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
