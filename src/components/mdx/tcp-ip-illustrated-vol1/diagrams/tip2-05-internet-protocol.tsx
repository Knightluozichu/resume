"use client";

import { Tip2ProtocolWorkbench } from "./official-tip2-protocol-workbench";

const config = {
  title: "第5章 Internet协议",
  focus: "逐字段解释IPv4/IPv6头部、扩展头、校验、转发、移动IP与主机地址选择",
  invariant:
    "每一跳只改变允许变化的字段，转发表选择与下一跳、MTU和主机模式一致",
  failure: "把IP可靠性或路径稳定性当成保证，会掩盖逐跳转发、分片和移动性边界",
  stages: [
    { label: "定位", detail: "确定协议层、端点、接口、路径方向与观察范围" },
    { label: "解码", detail: "核对原始字节、首部字段、长度、标志与封装边界" },
    { label: "推演", detail: "按消息、状态、计时器和序号重建正常协议路径" },
    { label: "反证", detail: "只改变一个变量，寻找首个不同报文或状态" },
    { label: "复核", detail: "保存命令、报文、版本、恢复和独立复核结论" },
  ],
  gates: [
    "第2版正式目录与2011/2012协议边界",
    "原始报文字节、方向、端点和捕获位置",
    "字段、状态、计时器与上下层接口",
    "正常/故障单变量对照和首个偏差",
    "竞争解释、恢复结果和版本差异",
    "责任人、复核人和可独立重放记录",
  ],
} as const;

export function Tip205InternetProtocolProtocolLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="packet"
    />
  );
}

export function Tip205InternetProtocolStateLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="state"
    />
  );
}

export function Tip205InternetProtocolEvidenceLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
