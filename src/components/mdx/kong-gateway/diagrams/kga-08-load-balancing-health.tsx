import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第8章 Kong网关负载均衡策略与健康检查",
  focus:
    "比较DNS和环状负载均衡，推导蓝绿与金丝雀权重，并组合主动、被动健康检查",
  invariant:
    "固定Target集合和请求序列时分配比例可解释，失败Target按阈值摘除并在恢复条件满足后重新加入",
  artifact:
    "DNS记录实验、ring状态图、权重发布记录、主动被动健康轨迹、故障摘除与恢复验收",
  nodes: [
    "负载均衡",
    "负载均衡简介",
    "负载均衡解决方案",
    "Kong网关中的负载均衡",
    "基于DNS的负载均衡",
    "A记录（包含AAAA记录）",
    "SRV记录",
    "DNS记录优先级",
    "其他注意事项",
    "环状负载均衡器",
    "基础概念",
    "负载均衡策略",
    "其他注意事项",
    "负载均衡特性使用场景",
    "蓝绿发布",
    "金丝雀发布",
    "健康检查",
    "健康检查标准",
    "健康检查类型",
    "健康检查配置",
    "本章小结",
  ],
} as const;

export function Kga08LoadBalancingHealthRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga08LoadBalancingHealthRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga08LoadBalancingHealthEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
