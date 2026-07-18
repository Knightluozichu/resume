import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第5章 Kong网关配置与部署",
  focus:
    "沿配置加载、环境变量、Nginx指令注入、自定义模板和三种部署模式建立Kong 2.0.5运行基线",
  invariant:
    "文件、环境变量和默认值优先级可追踪，DB-less、数据库与混合模式的控制面和数据面边界分别验证",
  artifact:
    "配置来源矩阵、指令注入结果、自定义模板差异、三部署模式拓扑和启停回退记录",
  nodes: [
    "Kong启动项配置",
    "配置项加载流程",
    "配置项详解",
    "环境变量",
    "配置文件示例",
    "注入Nginx指令",
    "注入单个Nginx指令",
    "通过文件方式注入Nginx指令",
    "个性化使用场景",
    "自定义Nginx模板文件",
    "在OpenResty实例中嵌入Kong",
    "Kong网关部署",
    "无数据库部署模式",
    "数据库部署模式",
    "混合部署模式",
    "本章小结",
  ],
} as const;

export function Kga05ConfigDeploymentRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga05ConfigDeploymentRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga05ConfigDeploymentEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
