"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-08",
  title: "第8章 自动更新系统的设计与实现",
  question:
    "怎样证明客户端安装的是授权且最新的目标文件，并抵抗旧版本、混合元数据、镜像和密钥风险？",
  concepts: ["自动更新系统的设计与实现"],
  nodes: [
    {
      name: "信任根",
      input: "版本化请求或事件",
      action: "第8章 自动更新系统的设计与实现：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "时间戳",
      input: "上游已验证状态",
      action: "第8章 自动更新系统的设计与实现：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "快照与目标",
      input: "任务与容量令牌",
      action: "第8章 自动更新系统的设计与实现：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "下载验证",
      input: "业务命令与版本",
      action: "第8章 自动更新系统的设计与实现：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "原子安装与恢复",
      input: "已提交结果",
      action: "第8章 自动更新系统的设计与实现：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第8章 自动更新系统的设计与实现”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行建立信任根和目标元数据，保存接入、身份或协议边界",
    "推进执行下载验证与原子安装，记录队列、线程、状态和提交结果",
    "完成验证回滚冻结混合与密钥轮换，交付root/targets/snapshot/timestamp元数据、版本、哈希、长度、过期、签名阈值、灰度、回滚、密钥轮换和恢复日志。",
  ],
  failureTrace: [
    "“第8章 自动更新系统的设计与实现”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：更新器只校验下载文件哈希却不验证签名和版本，攻击者可重放旧的合法文件与旧哈希",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“根、目标、快照和时间戳信任角色分离，版本、哈希、长度、过期、阈值签名和回滚策略显式”拒绝结果并从已知快照重放",
  ],
  invariant:
    "根、目标、快照和时间戳信任角色分离，版本、哈希、长度、过期、阈值签名和回滚策略显式",
  fault:
    "更新器只校验下载文件哈希却不验证签名和版本，攻击者可重放旧的合法文件与旧哈希",
  artifact:
    "root/targets/snapshot/timestamp元数据、版本、哈希、长度、过期、签名阈值、灰度、回滚、密钥轮换和恢复日志。",
  gates: [
    {
      label: "边界与所有权",
      detail:
        "“第8章 自动更新系统的设计与实现”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail:
        "“第8章 自动更新系统的设计与实现”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail:
        "“第8章 自动更新系统的设计与实现”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail:
        "“第8章 自动更新系统的设计与实现”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp08AutoUpdateRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp08AutoUpdateFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp08AutoUpdateOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
