"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-05",
  title: "第5章 网络游戏数据库技术",
  question:
    "怎样让一次游戏状态变更在重试、并发和故障下只提交一次，并能从日志或备份恢复？",
  concepts: ["网络游戏数据库技术"],
  nodes: [
    {
      name: "业务命令",
      input: "版本化请求或事件",
      action: "第5章 网络游戏数据库技术：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "幂等登记",
      input: "上游已验证状态",
      action: "第5章 网络游戏数据库技术：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "数据库事务",
      input: "任务与容量令牌",
      action: "第5章 网络游戏数据库技术：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "缓存投影",
      input: "业务命令与版本",
      action: "第5章 网络游戏数据库技术：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "提交与恢复",
      input: "已提交结果",
      action: "第5章 网络游戏数据库技术：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第5章 网络游戏数据库技术”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行声明状态模型与事务边界，保存接入、身份或协议边界",
    "推进执行并发更新和幂等重试，记录队列、线程、状态和提交结果",
    "完成验证备份恢复与一致性，交付模式、主键、版本列、事务、隔离级别、幂等键、重试、缓存失效、提交日志、备份和恢复时间点。",
  ],
  failureTrace: [
    "“第5章 网络游戏数据库技术”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：客户端重试购买请求时没有幂等键，两个事务分别扣款和发货导致重复物品",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“业务键、事务边界、隔离假设、幂等键、提交结果和恢复点明确，缓存不冒充持久化事实”拒绝结果并从已知快照重放",
  ],
  invariant:
    "业务键、事务边界、隔离假设、幂等键、提交结果和恢复点明确，缓存不冒充持久化事实",
  fault: "客户端重试购买请求时没有幂等键，两个事务分别扣款和发货导致重复物品",
  artifact:
    "模式、主键、版本列、事务、隔离级别、幂等键、重试、缓存失效、提交日志、备份和恢复时间点。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“第5章 网络游戏数据库技术”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“第5章 网络游戏数据库技术”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“第5章 网络游戏数据库技术”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“第5章 网络游戏数据库技术”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp05GameDatabaseRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp05GameDatabaseFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp05GameDatabaseOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
