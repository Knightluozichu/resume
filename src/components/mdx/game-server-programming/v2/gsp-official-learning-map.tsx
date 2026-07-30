"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《网络游戏服务器端编程》57个公开目录坐标学习地图",
  question:
    "怎样保留2007年Windows服务器开发语境，同时用现行协议和官方文档核对稳定机制、过时接口与安全边界？",
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
      name: "客户端会话",
      input: "版本化请求或事件",
      action:
        "《网络游戏服务器端编程》57个公开目录坐标学习地图：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "网络接入",
      input: "上游已验证状态",
      action:
        "《网络游戏服务器端编程》57个公开目录坐标学习地图：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "工作队列",
      input: "任务与容量令牌",
      action:
        "《网络游戏服务器端编程》57个公开目录坐标学习地图：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "状态服务",
      input: "业务命令与版本",
      action:
        "《网络游戏服务器端编程》57个公开目录坐标学习地图：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "持久化与运维",
      input: "已提交结果",
      action:
        "《网络游戏服务器端编程》57个公开目录坐标学习地图：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“《网络游戏服务器端编程》57个公开目录坐标学习地图”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行锁定目录披露和系统时代，保存接入、身份或协议边界",
    "推进贯通连接并发与状态，记录队列、线程、状态和提交结果",
    "完成补齐安全运维迁移证据，交付57坐标映射、披露级别、2007与现行标签、连接状态、线程所有权、I/O完成、加密边界、事务、权限、更新信任和回退。",
  ],
  failureTrace: [
    "“《网络游戏服务器端编程》57个公开目录坐标学习地图”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：为公开目录未披露的第5至第8章虚构权威小节，或把现代云服务倒填成2007年原书内容",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“公开到小节的前四章逐项覆盖，后四章只登记章名；连接、并发、状态、安全与运维路径可重放”拒绝结果并从已知快照重放",
  ],
  invariant:
    "公开到小节的前四章逐项覆盖，后四章只登记章名；连接、并发、状态、安全与运维路径可重放",
  fault:
    "为公开目录未披露的第5至第8章虚构权威小节，或把现代云服务倒填成2007年原书内容",
  artifact:
    "57坐标映射、披露级别、2007与现行标签、连接状态、线程所有权、I/O完成、加密边界、事务、权限、更新信任和回退。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“《网络游戏服务器端编程》57个公开目录坐标学习地图”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“《网络游戏服务器端编程》57个公开目录坐标学习地图”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“《网络游戏服务器端编程》57个公开目录坐标学习地图”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“《网络游戏服务器端编程》57个公开目录坐标学习地图”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function GspOfficialLearningMapRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function GspOfficialLearningMapFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function GspOfficialLearningMapOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
