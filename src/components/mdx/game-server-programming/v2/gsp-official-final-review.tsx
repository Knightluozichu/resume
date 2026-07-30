"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《网络游戏服务器端编程》综合复核：连接、状态与运维",
  question:
    "怎样证明同一玩家命令从字节进入到状态提交和运维审计都可追踪，并在过载或故障时安全拒绝？",
  concepts: [
    "第1章 网络编程基础",
    "第2章 多线程",
    "第3章 高效通信模型",
    "第4章 网络游戏数据加密技术",
    "第5章 网络游戏数据库技术",
    "第6章 游戏大厅的设计与实现",
    "第7章 GM工具的设计与实现",
    "第8章 自动更新系统的设计与实现",
  ],
  nodes: [
    {
      name: "玩家命令",
      input: "版本化请求或事件",
      action:
        "《网络游戏服务器端编程》综合复核：连接、状态与运维：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "接入与会话",
      input: "上游已验证状态",
      action:
        "《网络游戏服务器端编程》综合复核：连接、状态与运维：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "任务与状态",
      input: "任务与容量令牌",
      action:
        "《网络游戏服务器端编程》综合复核：连接、状态与运维：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "事务与房间",
      input: "业务命令与版本",
      action:
        "《网络游戏服务器端编程》综合复核：连接、状态与运维：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "审计与发布",
      input: "已提交结果",
      action:
        "《网络游戏服务器端编程》综合复核：连接、状态与运维：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“《网络游戏服务器端编程》综合复核：连接、状态与运维”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行锁定协议身份和容量合同，保存接入、身份或协议边界",
    "推进运行并发状态与安全路径，记录队列、线程、状态和提交结果",
    "完成执行故障恢复审计和更新回滚，交付57坐标检查、协议日志、连接缓冲、队列水位、线程轨迹、事务、匹配租约、GM审计、更新元数据和恢复演练。",
  ],
  failureTrace: [
    "“《网络游戏服务器端编程》综合复核：连接、状态与运维”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：只演示功能成功，没有拆包、队列饱和、事务重试、权限拒绝、密钥或更新回滚证据",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“协议帧、会话、缓冲、任务、事务、授权、审计和版本元数据共享关联ID与明确所有者”拒绝结果并从已知快照重放",
  ],
  invariant:
    "协议帧、会话、缓冲、任务、事务、授权、审计和版本元数据共享关联ID与明确所有者",
  fault:
    "只演示功能成功，没有拆包、队列饱和、事务重试、权限拒绝、密钥或更新回滚证据",
  artifact:
    "57坐标检查、协议日志、连接缓冲、队列水位、线程轨迹、事务、匹配租约、GM审计、更新元数据和恢复演练。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“《网络游戏服务器端编程》综合复核：连接、状态与运维”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“《网络游戏服务器端编程》综合复核：连接、状态与运维”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“《网络游戏服务器端编程》综合复核：连接、状态与运维”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“《网络游戏服务器端编程》综合复核：连接、状态与运维”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function GspOfficialFinalReviewRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function GspOfficialFinalReviewFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function GspOfficialFinalReviewOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
