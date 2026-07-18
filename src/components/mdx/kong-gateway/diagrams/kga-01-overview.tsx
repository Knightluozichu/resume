import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第1章 全面了解Kong网关",
  focus: "从网关由来、职责、Kong发展与基础组件进入安装和首个Web代理项目",
  invariant:
    "同一后端在Kong 2.0.5上完成动态服务路由与静态页面代理，Admin API和代理端口边界清楚且可复现",
  artifact:
    "网关职责表、组件拓扑、三平台安装记录、Web应用路由与静态资源代理验收",
  nodes: [
    "网关简介",
    "网关的由来",
    "网关的作用",
    "Kong网关简介",
    "Kong网关的发展历程",
    "Kong网关与传统网关对比",
    "其他主流网关",
    "Kong网关基础组件",
    "Kong服务器",
    "数据库",
    "Kong管理GUI",
    "Kong网关安装指南",
    "在Mac环境中安装Kong网关",
    "在Linux环境中安装Kong网关",
    "在Docker环境中安装Kong网关",
    "使用Kong网关搭建Web应用",
    "示例项目介绍",
    "后端服务路由",
    "静态页面代理",
    "本章小结",
  ],
} as const;

export function Kga01OverviewRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga01OverviewRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga01OverviewEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
