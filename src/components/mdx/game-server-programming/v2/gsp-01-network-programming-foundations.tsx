"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-01",
  title: "第1章 网络编程基础",
  question:
    "怎样从字节流或数据报建立消息边界、连接状态与错误处理，并证明客户端和服务器职责没有混写？",
  concepts: [
    "网络游戏服务器端开发概述",
    "网络游戏类型",
    "MMORPG服务器与客户端功能划分",
    "网络通信协议",
    "网络协议",
    "OSI通信协议模型",
    "TCP/IP协议",
    "TCP/IP协议族",
    "Socket编程原理",
    "套接字",
    "Socket通信流程",
    "Socket函数",
    "IP地址转换",
    "字节转换",
    "基本Socket通信",
    "TCP/IP通信实现",
    "UDP/IP通信实现",
  ],
  nodes: [
    {
      name: "DNS与端点",
      input: "版本化请求或事件",
      action: "第1章 网络编程基础：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "Socket连接",
      input: "上游已验证状态",
      action: "第1章 网络编程基础：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "接收缓冲",
      input: "任务与容量令牌",
      action: "第1章 网络编程基础：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "协议解析",
      input: "业务命令与版本",
      action: "第1章 网络编程基础：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "会话状态",
      input: "已提交结果",
      action: "第1章 网络编程基础：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第1章 网络编程基础”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行声明协议帧和端点，保存接入、身份或协议边界",
    "推进执行Socket收发与解析，记录队列、线程、状态和提交结果",
    "完成验证超时关闭乱序和重放，交付协议字段、网络字节序、长度边界、Socket调用、TCP状态、UDP序号、收发日志、超时、半关闭和错误码。",
  ],
  failureTrace: [
    "“第1章 网络编程基础”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：把一次recv当成一条完整消息，TCP发生拆包或粘包后解析越界并污染后续会话",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“协议版本、端点、字节序、帧边界、连接状态、超时与关闭路径固定，同一字节序列可重放”拒绝结果并从已知快照重放",
  ],
  invariant:
    "协议版本、端点、字节序、帧边界、连接状态、超时与关闭路径固定，同一字节序列可重放",
  fault:
    "把一次recv当成一条完整消息，TCP发生拆包或粘包后解析越界并污染后续会话",
  artifact:
    "协议字段、网络字节序、长度边界、Socket调用、TCP状态、UDP序号、收发日志、超时、半关闭和错误码。",
  gates: [
    {
      label: "边界与所有权",
      detail: "“第1章 网络编程基础”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail: "“第1章 网络编程基础”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail: "“第1章 网络编程基础”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail: "“第1章 网络编程基础”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp01NetworkProgrammingFoundationsRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp01NetworkProgrammingFoundationsFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp01NetworkProgrammingFoundationsOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
