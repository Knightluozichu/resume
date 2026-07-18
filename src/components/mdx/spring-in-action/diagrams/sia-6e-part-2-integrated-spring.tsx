import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Part 2. Integrated Spring"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="Part 2 集成Spring" focus="把同步REST、OAuth2、异步消息和企业集成流统一到明确的边界合同" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="Part 2 集成Spring" focus="把把同步REST、OAuth2、异步消息和企业集成流统一到明确的边界合同拆成可启动切片，逐项关闭自动配置、外部依赖和运行时基础设施，观察合同在哪一层失效" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="Part 2 集成Spring" focus="集成上下文图、协议决策表、失败注入脚本与端到端追踪记录" nodes={nodes} />;
}
