import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "6 Working with configuration properties",
  "6.1 Fine-tuning autoconfiguration",
  "6.1.1 Understanding Spring’s environment abstraction",
  "6.1.2 Configuring a data source",
  "6.1.3 Configuring the embedded server",
  "6.1.4 Configuring logging",
  "6.1.5 Using special property values",
  "6.2 Creating your own configuration properties",
  "6.2.1 Defining configuration property holders",
  "6.2.2 Declaring configuration property metadata",
  "6.3 Configuring with profiles",
  "6.3.1 Defining profile-specific properties",
  "6.3.2 Activating profiles",
  "6.3.3 Conditionally creating beans with profiles",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第6章 使用配置属性" focus="建立Environment属性源优先级、类型安全绑定、配置元数据与Profile条件装配模型" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第6章 使用配置属性" focus="同时从默认文件、Profile、环境变量和命令行提供冲突值，预测最终绑定结果并检查敏感值暴露" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第6章 使用配置属性" focus="属性来源链、配置契约、元数据、环境差异表和启动失败测试" nodes={nodes} />;
}
