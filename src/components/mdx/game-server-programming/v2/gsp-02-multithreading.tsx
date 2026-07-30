"use client";

import {
  GameServerEvidenceLab,
  type GameServerEvidenceModel,
} from "./game-server-evidence-lab";

const model = {
  unitId: "gsp-unit-02",
  title: "第2章 多线程",
  question:
    "怎样给共享状态指定唯一所有者和同步原语，并用等待图证明没有数据竞争、丢唤醒或死锁？",
  concepts: [
    "线程基础",
    "进程",
    "线程",
    "线程的应用",
    "Windows下的多线程处理",
    "随机矩形",
    "多工模拟程序",
    "线程间的通信与同步",
    "全局变量",
    "事件",
    "临界区",
    "互斥",
    "信号量",
    "互锁访问",
    "可等待定时器",
    "线程死锁",
  ],
  nodes: [
    {
      name: "网络线程",
      input: "版本化请求或事件",
      action: "第2章 多线程：验证身份、版本和边界",
      output: "可追踪输入",
      owner: "接入层",
    },
    {
      name: "会话表",
      input: "上游已验证状态",
      action: "第2章 多线程：执行本层唯一转换",
      output: "有界任务或状态",
      owner: "协议/协调层",
    },
    {
      name: "任务队列",
      input: "任务与容量令牌",
      action: "第2章 多线程：按所有权排队和调度",
      output: "工作结果或背压",
      owner: "并发层",
    },
    {
      name: "工作线程",
      input: "业务命令与版本",
      action: "第2章 多线程：校验规则并原子改变状态",
      output: "提交结果或拒绝",
      owner: "权威状态层",
    },
    {
      name: "停止与回收",
      input: "已提交结果",
      action: "第2章 多线程：持久化、审计、发布或恢复",
      output: "可重放工件",
      owner: "运维层",
    },
  ],
  normalTrace: [
    "为“第2章 多线程”锁定版本、输入、关联ID、容量、初始状态和所有者",
    "执行声明线程和共享对象所有权，保存接入、身份或协议边界",
    "推进选择同步原语与锁顺序，记录队列、线程、状态和提交结果",
    "完成注入竞争死锁和停止，交付线程清单、共享对象、临界区、事件、互斥、信号量、互锁变量、定时器、等待图、停止信号和回收日志。",
  ],
  failureTrace: [
    "“第2章 多线程”复用同一版本、输入、关联ID、容量和初始状态",
    "只注入单一故障：网络线程持有会话锁等待数据库事件，而数据库线程持有队列锁回调会话，形成锁顺序环",
    "沿接入、队列、状态到输出方向定位第一处所有权、边界或版本偏离",
    "依据“共享对象、读写者、锁顺序、等待条件、唤醒语义和停止协议显式，线程退出后资源可回收”拒绝结果并从已知快照重放",
  ],
  invariant:
    "共享对象、读写者、锁顺序、等待条件、唤醒语义和停止协议显式，线程退出后资源可回收",
  fault:
    "网络线程持有会话锁等待数据库事件，而数据库线程持有队列锁回调会话，形成锁顺序环",
  artifact:
    "线程清单、共享对象、临界区、事件、互斥、信号量、互锁变量、定时器、等待图、停止信号和回收日志。",
  gates: [
    {
      label: "边界与所有权",
      detail: "“第2章 多线程”的输入、对象、线程和状态写入者可追溯。",
    },
    {
      label: "容量与背压",
      detail: "“第2章 多线程”的缓冲、队列、超时、取消和拒绝策略有边界。",
    },
    {
      label: "安全与权限",
      detail: "“第2章 多线程”的身份、密钥、授权和敏感操作在服务端验证。",
    },
    {
      label: "恢复与观测",
      detail: "“第2章 多线程”可用关联日志、快照、回滚和冷启动演练恢复。",
    },
  ],
} as const satisfies GameServerEvidenceModel;

export function Gsp02MultithreadingRequestPath() {
  return <GameServerEvidenceLab model={model} view="request-path" />;
}

export function Gsp02MultithreadingFailureTraceLab() {
  return <GameServerEvidenceLab model={model} view="failure-trace" />;
}

export function Gsp02MultithreadingOperationalGateLab() {
  return <GameServerEvidenceLab model={model} view="operational-gate" />;
}
