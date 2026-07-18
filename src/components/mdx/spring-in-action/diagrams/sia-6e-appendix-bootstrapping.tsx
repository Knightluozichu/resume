import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Appendix. Bootstrapping Spring applications",
  "A.1 Initializing a project with Spring Tool Suite",
  "A.2 Initializing a project with IntelliJ IDEA",
  "A.3 Initializing a project with NetBeans",
  "A.4 Initializing a project at start.spring.io",
  "A.5 Initializing a project from the command line",
  "curl and the Initializr API",
  "Spring Boot command-line interface",
  "A.6 Building and running projects"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="附录A 启动Spring应用" focus="用IDE、网页Initializr、HTTP API与CLI生成等价项目，并验证构建和运行结果" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="附录A 启动Spring应用" focus="用五种入口生成同一项目，对比构建文件、Wrapper、源码布局、元数据和启动行为" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="附录A 启动Spring应用" focus="初始化请求、依赖清单、Wrapper校验、无IDE构建脚本与首次启动证据" nodes={nodes} />;
}
