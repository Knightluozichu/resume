import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第14章 Kong网关结合Kubernetes架构方案",
  focus:
    "建立Kubernetes对象模型和HelloWorld基线，再安装Kong、配置入口资源并验证插件策略",
  invariant:
    "Kubernetes声明、控制器观察状态、Kong实体和真实代理请求四层一致，滚动升级和控制器重启后仍收敛",
  artifact:
    "对象关系图、集群基线、Kong安装清单、入口到Service轨迹、插件策略和重建演练",
  nodes: [
    "Kubernetes详解",
    "Kubernetes简介",
    "Kubernetes发展史",
    "Kubernetes基本概念和术语",
    "Kubernetes的HelloWorld示例",
    "Kubernetes与Kong网关结合",
    "概念描述",
    "使用Kubernetes安装Kong",
    "Kubernetes实战",
    "安装Kong网关",
    "使用Kong网关",
    "配置Kong网关插件",
    "本章小结",
  ],
} as const;

export function Kga14KubernetesRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga14KubernetesRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga14KubernetesEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
