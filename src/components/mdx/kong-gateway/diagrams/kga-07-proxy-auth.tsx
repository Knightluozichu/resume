import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第7章 Kong网关代理及鉴权",
  focus:
    "从Service、Route与Consumer术语进入多维路由、优先级、代理行为、TLS、WebSocket、gRPC与多重鉴权",
  invariant:
    "给定同一请求集合时唯一命中预期Route，超时重试和插件阶段可解释，匿名与多认证链不会绕过授权边界",
  artifact:
    "实体拓扑、路由竞争表、协议代理轨迹、超时重试实验、鉴权状态机和负向测试",
  nodes: [
    "Kong网关代理基础知识",
    "Kong网关术语简介",
    "Kong网关代理环境配置",
    "Kong网关代理示例",
    "路由匹配规则",
    "通用匹配规则",
    "paths属性",
    "hosts属性",
    "methods属性",
    "headers属性（hosts除外）",
    "sources & destinations属性",
    "snis属性",
    "路由匹配优先级",
    "优先级策略",
    "后备路由策略",
    "Kong网关代理行为",
    "超时机制",
    "错误重试机制",
    "插件执行策略",
    "响应内容",
    "配置SSL协议",
    "代理WebSocket流量",
    "代理gRPC流量",
    "Kong网关鉴权",
    "通用鉴权流程",
    "匿名接入流程",
    "多重认证策略",
    "本章小结",
  ],
} as const;

export function Kga07ProxyAuthRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga07ProxyAuthRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga07ProxyAuthEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
