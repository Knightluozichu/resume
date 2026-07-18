import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第2章 Nginx知识",
  focus:
    "建立Kong底座所需的Nginx安装、目录、命令、配置、模块、进程模型、优化与切换实践",
  invariant:
    "Nginx与Kong使用同一后端和负载时，黑白名单、限流、代理和回切结果可按配置快照与请求轨迹对照",
  artifact:
    "三平台安装、目录与命令清单、worker机制图、优化基线、Kong和Nginx双向切换演练",
  nodes: [
    "Nginx安装",
    "在Mac环境中安装Nginx",
    "在Linux环境中安装Nginx",
    "在Docker环境中安装Nginx",
    "Nginx详解",
    "Nginx文件的目录结构",
    "命令行参数",
    "配置文件",
    "依赖库",
    "Nginx的工作原理",
    "Nginx优化指南",
    "项目实践",
    "从Kong切换到Nginx",
    "添加黑白名单",
    "添加限流",
    "从Nginx切换到Kong",
    "小结",
    "本章小结",
  ],
} as const;

export function Kga02NginxRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga02NginxRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga02NginxEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
