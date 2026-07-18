import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Part 1. Foundational Spring"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="Part 1 基础Spring" focus="用一个持续演化的Taco Cloud应用建立容器、Web、数据、安全与配置的共同模型" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="Part 1 基础Spring" focus="把用一个持续演化的Taco Cloud应用建立容器、Web、数据、安全与配置的共同模型拆成可启动切片，逐项关闭自动配置、外部依赖和运行时基础设施，观察合同在哪一层失效" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="Part 1 基础Spring" focus="基础应用上下文图、切片测试矩阵与配置优先级记录" nodes={nodes} />;
}
