import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Part 4. Deployed Spring"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="Part 4 部署Spring" focus="把运行时端点、管理面、JMX、制品、容器和Kubernetes探针组成生产反馈回路" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="Part 4 部署Spring" focus="把把运行时端点、管理面、JMX、制品、容器和Kubernetes探针组成生产反馈回路拆成可启动切片，逐项关闭自动配置、外部依赖和运行时基础设施，观察合同在哪一层失效" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="Part 4 部署Spring" focus="运行手册、SLO指标、管理面威胁模型、部署清单与回滚演练" nodes={nodes} />;
}
