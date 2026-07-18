"use client";

import { MicroservicesPatternsLab } from "./official-microservices-patterns-lab";

const config = {
  unitTitle: "第4章 使用Saga管理事务",
  focus:
    "用一组本地事务和补偿动作维护跨服务数据一致性，比较协同与编排，并显式处理Saga缺少隔离带来的异常",
  nodes: [
    "4.1 微服务架构下的事务管理",
    "4.2 Saga的协调模式",
    "4.3 解决隔离问题",
    "4.4 Order Service和Create Order Saga的设计",
  ],
  invariant:
    "Create Order Saga在成功、拒绝、超时、重复与恢复后都收敛到可解释终态，信用、餐厅、订单和厨房状态满足业务不变量且可对账",
  failure:
    "只画成功步骤而不设计补偿、幂等和隔离对策，会让超时后的迟到消息覆盖新状态，或让补偿失败留下永久业务悬挂",
  patterns: [
    {
      label: "协同式Saga",
      problem: "参与方较少且流程简单",
      mechanism: "事件触发下一本地事务",
      evidence: "事件因果链和终态",
    },
    {
      label: "编排式Saga",
      problem: "流程复杂且需显式控制",
      mechanism: "编排器持久化状态并发送命令",
      evidence: "状态机、命令与回复对账",
    },
    {
      label: "补偿事务",
      problem: "已提交步骤不能数据库回滚",
      mechanism: "执行语义上的逆操作",
      evidence: "原动作与补偿净效果",
    },
    {
      label: "语义锁",
      problem: "并发Saga会读到中间状态",
      mechanism: "以业务状态阻止冲突操作",
      evidence: "冲突请求被拒绝或延后",
    },
  ],
  gates: [
    "初版目录、ISBN与版本边界",
    "问题、约束、解决方案与后继模式",
    "主体、数据所有权与契约版本",
    "超时、重复、乱序与部分失败反例",
    "日志、追踪、指标、消息与状态轨迹",
    "业务对账、停止、恢复、回退与责任人",
  ],
} as const;

export function Msp04ManagingTransactionsWithSagasPatternLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="pattern"
    />
  );
}

export function Msp04ManagingTransactionsWithSagasFailureLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="failure"
    />
  );
}

export function Msp04ManagingTransactionsWithSagasEvidenceLab() {
  return (
    <MicroservicesPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
