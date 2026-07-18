import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "18 Deploying Spring",
  "18.1 Weighing deployment options",
  "18.2 Building executable JAR files",
  "18.3 Building container images",
  "18.3.1 Deploying to Kubernetes",
  "18.3.2 Enabling graceful shutdown",
  "18.3.3 Working with application liveness and readiness",
  "18.4 Building and deploying WAR files",
  "18.5 The end is where we begin",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第18章 部署Spring" focus="比较可执行JAR、OCI镜像、Kubernetes与WAR的运行合同，并设计就绪、存活和优雅退出" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第18章 部署Spring" focus="在启动慢、依赖故障、滚动升级和长请求场景测量readiness、liveness与terminationGracePeriod" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第18章 部署Spring" focus="制品校验和、镜像SBOM、探针状态机、关闭时间线、发布与回滚演练" nodes={nodes} />;
}
