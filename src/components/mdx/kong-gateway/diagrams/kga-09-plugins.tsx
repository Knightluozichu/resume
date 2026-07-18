import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第9章 Kong网关插件",
  focus:
    "覆盖插件概念与执行原理、七类官方插件、自定义生命周期、PDK、Go开发与完整实例",
  invariant:
    "插件作用域、优先级、执行阶段、配置模式和失败边界可追踪，自定义插件在Kong 2.0.5上可装载和回退",
  artifact:
    "插件分类矩阵、阶段顺序图、PDK调用轨迹、Lua和Go插件骨架、安装测试与回退包",
  nodes: [
    "Kong网关插件简介",
    "Kong网关插件概念",
    "Kong网关插件原理",
    "Kong官方插件",
    "鉴权类插件",
    "安全类插件",
    "流量类插件",
    "分析监控类插件",
    "内容转换类插件",
    "日志类插件",
    "其他插件",
    "自定义Kong网关插件",
    "自定义插件开发流程和插件生命周期管理详解",
    "插件开发套件",
    "Go插件开发向导",
    "自定义插件实例",
    "本章小结",
  ],
} as const;

export function Kga09PluginsRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga09PluginsRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga09PluginsEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
