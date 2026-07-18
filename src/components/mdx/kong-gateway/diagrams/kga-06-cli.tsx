import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第6章 Kong网关命令行",
  focus:
    "逐条掌握Kong 2.0.5命令行通用标志以及检查、配置、健康、混合、迁移、准备和进程生命周期命令",
  invariant:
    "每条命令的输入配置、前置状态、退出码、状态变化与可逆性明确，进程停止和配置失效不混为一谈",
  artifact:
    "命令语义矩阵、退出码记录、迁移状态机、启停重载实验、失败恢复和回退手册",
  nodes: [
    "通用标志参数",
    "Kong网关命令行详解",
    "kong check",
    "kong config",
    "kong health",
    "kong hybrid",
    "kong migrations",
    "kong prepare",
    "kong quit",
    "kong reload",
    "kong restart",
    "kong start",
    "kong stop",
    "kong version",
    "本章小结",
  ],
} as const;

export function Kga06CliRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga06CliRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga06CliEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
