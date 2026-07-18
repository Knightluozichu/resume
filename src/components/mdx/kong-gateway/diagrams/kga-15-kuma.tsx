import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第15章 Service Mesh实践之Kuma",
  focus:
    "从Service Mesh和Kuma组件进入策略匹配，覆盖安全、流量、观测策略并完成mTLS与TrafficPermission实战",
  invariant:
    "控制面下发与数据面代理状态一致，mTLS身份和TrafficPermission默认拒绝边界可由允许与拒绝请求共同证明",
  artifact:
    "Kuma组件图、策略匹配表、安全流量观测实验、mTLS证据、权限负向测试与回退",
  nodes: [
    "Service Mesh简介",
    "Kuma简介",
    "为什么使用Kuma",
    "Kuma与其他Service Mesh方案的比较",
    "Kuma系统组件",
    "Kuma部署示例",
    "Kuma策略概述",
    "策略配置项描述",
    "使用策略",
    "策略匹配规则",
    "Kuma内置策略详解",
    "安全类策略",
    "流量控制类策略",
    "观测类策略",
    "Kuma实战",
    "适配Kuma架构",
    "启动mTSL和TrafficPermission",
    "本章小结",
  ],
} as const;

export function Kga15KumaRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga15KumaRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga15KumaEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
