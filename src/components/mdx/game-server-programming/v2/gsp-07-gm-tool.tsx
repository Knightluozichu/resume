"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-07",
  title: "第7章 GM工具的设计与实现",
  question:
    "怎样让高权限操作可授权、可归因、可复核和可撤销，并防止客户端或普通后台绕过？",
  concepts: ["GM工具的设计与实现"],
  nodes: [
    {
      name: "GM身份",
      input: "版本化请求或事件",
      action: "第7章 GM工具的设计与实现：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "授权策略",
      input: "上游已验证状态",
      action: "第7章 GM工具的设计与实现：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "审批命令",
      input: "任务与容量令牌",
      action: "第7章 GM工具的设计与实现：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "业务服务",
      input: "业务命令与版本",
      action: "第7章 GM工具的设计与实现：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "审计与回滚",
      input: "已提交结果",
      action: "第7章 GM工具的设计与实现：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第7章 GM工具的设计与实现”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行建立身份权限和动作矩阵，保存接入、身份或协议边界",
    "推进执行审批命令与服务端校验，记录队列、线程、状态和提交结果",
    "完成验证审计告警和回滚，交付角色属性矩阵、服务端策略、工单、审批者、命令ID、目标前后值、结果、审计签名、告警和回滚记录。",
  ],
  failureTrace: [
    "“第7章 GM工具的设计与实现”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：共享管理员账号直接修改玩家资产，没有工单理由、二次确认或前后值，事后无法归因",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“每项GM动作在服务端鉴权，操作者、理由、目标、前后值、审批、结果和关联ID写入防篡改审计”拒绝结果并从已知快照重放",
  ],
  invariant:
    "每项GM动作在服务端鉴权，操作者、理由、目标、前后值、审批、结果和关联ID写入防篡改审计",
  fault:
    "共享管理员账号直接修改玩家资产，没有工单理由、二次确认或前后值，事后无法归因",
  artifact:
    "角色属性矩阵、服务端策略、工单、审批者、命令ID、目标前后值、结果、审计签名、告警和回滚记录。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“第7章 GM工具的设计与实现”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“第7章 GM工具的设计与实现”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“第7章 GM工具的设计与实现”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“第7章 GM工具的设计与实现”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp07GmToolRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp07GmToolFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp07GmToolOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
