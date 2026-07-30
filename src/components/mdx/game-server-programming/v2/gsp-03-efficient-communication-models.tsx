"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-03",
  title: "第3章 高效通信模型",
  question:
    "怎样把就绪通知和完成通知映射到缓冲区生命周期、工作线程与背压，而不是只比较API名称？",
  concepts: [
    "网络通信I/O模式",
    "Socket事件",
    "阻塞模式",
    "非阻塞模式",
    "选择I/O模式",
    "异步模型",
    "异步与同步",
    "Windows下的异步模型",
    "IOCP模型",
    "IOCP工作原理",
    "使用IOCP设计服务器",
    "IOCP设计中的Socket错误和资源释放",
    "IOCP与epoll机制的异同",
  ],
  nodes: [
    {
      name: "监听Socket",
      input: "版本化请求或事件",
      action: "第3章 高效通信模型：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "异步操作",
      input: "上游已验证状态",
      action: "第3章 高效通信模型：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "内核队列",
      input: "任务与容量令牌",
      action: "第3章 高效通信模型：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "工作线程",
      input: "业务命令与版本",
      action: "第3章 高效通信模型：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "连接回收",
      input: "已提交结果",
      action: "第3章 高效通信模型：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第3章 高效通信模型”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行区分阻塞就绪与完成语义，保存接入、身份或协议边界",
    "推进绑定连接缓冲和完成键，记录队列、线程、状态和提交结果",
    "完成验证背压取消错误与释放，交付I/O模式对照、注册集合、OVERLAPPED、完成键、epoll事件、缓冲所有权、并发值、队列水位、错误和释放轨迹。",
  ],
  failureTrace: [
    "“第3章 高效通信模型”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：WSARecv尚未完成就复用OVERLAPPED和缓冲区，完成包返回后写入已分配给另一连接的内存",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“每个未完成I/O、缓冲区、连接键和完成包有唯一生命周期；队列有容量，错误和取消必达回收”拒绝结果并从已知快照重放",
  ],
  invariant:
    "每个未完成I/O、缓冲区、连接键和完成包有唯一生命周期；队列有容量，错误和取消必达回收",
  fault:
    "WSARecv尚未完成就复用OVERLAPPED和缓冲区，完成包返回后写入已分配给另一连接的内存",
  artifact:
    "I/O模式对照、注册集合、OVERLAPPED、完成键、epoll事件、缓冲所有权、并发值、队列水位、错误和释放轨迹。",
  gates: [
    {
      label: "边界与所有权",
      detail: "“第3章 高效通信模型”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail: "“第3章 高效通信模型”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail: "“第3章 高效通信模型”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail: "“第3章 高效通信模型”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp03EfficientCommunicationModelsRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp03EfficientCommunicationModelsFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp03EfficientCommunicationModelsOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
