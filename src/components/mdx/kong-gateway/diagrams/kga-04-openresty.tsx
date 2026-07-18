import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第4章 OpenResty知识",
  focus:
    "连接Nginx与Lua，理解OpenResty安装、目录、resty CLI、包管理、执行阶段、非阻塞约束和性能优化",
  invariant:
    "同一请求在各ngx_lua阶段的顺序、协程让出点、共享缓存和阻塞反例可由时间线与火焰图复核",
  artifact:
    "三平台环境、resty和包管理命令、阶段时间线、阻塞对照实验、缓存与火焰图证据",
  nodes: [
    "OpenResty入门安装",
    "在Mac环境中安装OpenResty",
    "在Linux环境中安装OpenResty",
    "在Docker环境中安装OpenResty",
    "OpenResty详解",
    "OpenResty服务器的目录结构",
    "Resty CLI",
    "OpenResty包管理工具",
    "OpenResty工作原理",
    "OpenResty性能优化",
    "避免使用阻塞函数",
    "巧用table组件",
    "使用缓存",
    "火焰图",
    "项目实践",
    "本章小结",
  ],
} as const;

export function Kga04OpenrestyRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga04OpenrestyRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga04OpenrestyEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
