import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "Part 3. Reactive Spring"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="Part 3 响应式Spring" focus="从Reactive Streams需求信号出发，贯通Reactor、WebFlux、响应式数据与RSocket" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="Part 3 响应式Spring" focus="把从Reactive Streams需求信号出发，贯通Reactor、WebFlux、响应式数据与RSocket拆成可启动切片，逐项关闭自动配置、外部依赖和运行时基础设施，观察合同在哪一层失效" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="Part 3 响应式Spring" focus="信号时序图、阻塞探针、背压实验与端到端资源预算" nodes={nodes} />;
}
