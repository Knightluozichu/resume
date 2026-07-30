"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-04",
  title: "第4章 网络游戏数据加密技术",
  question:
    "怎样区分加密、认证、完整性与重放防护，并避免把自制算法或静态密钥当作游戏协议安全？",
  concepts: [
    "密码学基本概念",
    "密码学",
    "发送者与接收者",
    "消息和加密",
    "算法和密钥",
    "算法的安全性",
    "常用密码算法",
  ],
  nodes: [
    {
      name: "客户端身份",
      input: "版本化请求或事件",
      action: "第4章 网络游戏数据加密技术：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "TLS握手",
      input: "上游已验证状态",
      action: "第4章 网络游戏数据加密技术：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "会话密钥",
      input: "任务与容量令牌",
      action: "第4章 网络游戏数据加密技术：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "消息认证",
      input: "业务命令与版本",
      action: "第4章 网络游戏数据加密技术：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "轮换与吊销",
      input: "已提交结果",
      action: "第4章 网络游戏数据加密技术：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第4章 网络游戏数据加密技术”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行写明资产威胁和信任边界，保存接入、身份或协议边界",
    "推进选择标准协议与密钥生命周期，记录队列、线程、状态和提交结果",
    "完成验证篡改重放轮换和失败关闭，交付威胁模型、TLS版本、证书验证、密钥托管、nonce与序号、认证标签、令牌、轮换、吊销和失败日志。",
  ],
  failureTrace: [
    "“第4章 网络游戏数据加密技术”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：使用固定对称密钥和可预测IV加密所有客户端，密钥泄露后无法隔离会话或轮换",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“威胁模型、算法套件、密钥来源、随机数、nonce、认证标签、证书验证和轮换路径显式”拒绝结果并从已知快照重放",
  ],
  invariant:
    "威胁模型、算法套件、密钥来源、随机数、nonce、认证标签、证书验证和轮换路径显式",
  fault:
    "使用固定对称密钥和可预测IV加密所有客户端，密钥泄露后无法隔离会话或轮换",
  artifact:
    "威胁模型、TLS版本、证书验证、密钥托管、nonce与序号、认证标签、令牌、轮换、吊销和失败日志。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“第4章 网络游戏数据加密技术”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“第4章 网络游戏数据加密技术”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“第4章 网络游戏数据加密技术”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“第4章 网络游戏数据加密技术”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp04GameDataEncryptionRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp04GameDataEncryptionFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp04GameDataEncryptionOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
