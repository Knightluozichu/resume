"use client";

import { Tip2ProtocolWorkbench } from "./official-tip2-protocol-workbench";

const config = {
  title:
    "第18章 安全：可扩展身份认证协议、IP安全协议、传输层安全、DNS安全、域名密钥识别邮件",
  focus: "从威胁模型进入密码机制、PKI、EAP、IPsec、TLS 1.2、DTLS、DNSSEC与DKIM",
  invariant:
    "安全结论明确资产、攻击者、信任根、密钥、认证对象、保护层和失败模式",
  failure:
    "只看到加密算法名称就宣称安全，会遗漏身份、证书验证、重放、协商和部署边界",
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

export function Tip218SecurityProtocolLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="packet"
    />
  );
}

export function Tip218SecurityStateLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="state"
    />
  );
}

export function Tip218SecurityEvidenceLab() {
  return (
    <Tip2ProtocolWorkbench
      {...config}
      stages={[...config.stages]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
