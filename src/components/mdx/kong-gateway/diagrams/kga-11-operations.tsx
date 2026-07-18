import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第11章 Kong网关运维",
  focus:
    "从服务器和数据库资源选型进入伸缩与性能参数，搭建监控、指标、告警并执行备份维护和突发事件处理",
  invariant:
    "容量模型、四黄金信号、Kong与数据库指标、告警阈值、备份恢复点和事件时间线相互可验证",
  artifact:
    "资源预算、基准压测、监控平台、指标字典、告警演练、备份恢复与事件响应手册",
  nodes: [
    "资源选型",
    "服务器资源",
    "数据库资源",
    "弹性伸缩",
    "性能参数",
    "Kong网关监控",
    "监控平台选型",
    "搭建监控平台",
    "Kong网关监控平台配置",
    "Kong网关监控平台指标详解",
    "Kong监控平台指标测试",
    "Kong监控平台的预警功能",
    "Kong网关运维",
    "数据备份",
    "软/硬件维护",
    "突发事件处理",
    "本章小结",
  ],
} as const;

export function Kga11OperationsRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga11OperationsRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga11OperationsEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
