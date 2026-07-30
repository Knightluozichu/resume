"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-06",
  title: "第6章 游戏大厅的设计与实现",
  question:
    "怎样把玩家意图从大厅排队推进到权威房间，并在取消、超时、重复请求和容量不足时保持一致？",
  concepts: ["游戏大厅的设计与实现"],
  nodes: [
    {
      name: "大厅会话",
      input: "版本化请求或事件",
      action: "第6章 游戏大厅的设计与实现：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "匹配票据",
      input: "上游已验证状态",
      action: "第6章 游戏大厅的设计与实现：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "匹配函数",
      input: "任务与容量令牌",
      action: "第6章 游戏大厅的设计与实现：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "房间分配",
      input: "业务命令与版本",
      action: "第6章 游戏大厅的设计与实现：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "会话确认",
      input: "已提交结果",
      action: "第6章 游戏大厅的设计与实现：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第6章 游戏大厅的设计与实现”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行声明票据房间和会话状态机，保存接入、身份或协议边界",
    "推进执行匹配分配与确认，记录队列、线程、状态和提交结果",
    "完成验证取消超时重连和容量，交付玩家身份、票据ID、队列状态、匹配条件、房间租约、会话令牌、超时取消、重连和容量告警。",
  ],
  failureTrace: [
    "“第6章 游戏大厅的设计与实现”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：匹配结果已分配房间但大厅重试仍保留旧票据，玩家同时进入两个权威会话",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“玩家身份、票据、队列状态、匹配结果、房间租约和会话令牌具有唯一版本与超时”拒绝结果并从已知快照重放",
  ],
  invariant:
    "玩家身份、票据、队列状态、匹配结果、房间租约和会话令牌具有唯一版本与超时",
  fault: "匹配结果已分配房间但大厅重试仍保留旧票据，玩家同时进入两个权威会话",
  artifact:
    "玩家身份、票据ID、队列状态、匹配条件、房间租约、会话令牌、超时取消、重连和容量告警。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“第6章 游戏大厅的设计与实现”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“第6章 游戏大厅的设计与实现”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“第6章 游戏大厅的设计与实现”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“第6章 游戏大厅的设计与实现”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp06GameLobbyRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp06GameLobbyFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp06GameLobbyOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
