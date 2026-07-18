import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "11 Introducing Reactor",
  "11.1 Understanding reactive programming",
  "11.1.1 Defining Reactive Streams",
  "11.2 Getting started with Reactor",
  "11.2.1 Diagramming reactive flows",
  "11.2.2 Adding Reactor dependencies",
  "11.3 Applying common reactive operations",
  "11.3.1 Creating reactive types",
  "11.3.2 Combining reactive types",
  "11.3.3 Transforming and filtering reactive streams",
  "11.3.4 Performing logic operations on reactive types",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第11章 Reactor入门" focus="用Publisher、Subscriber、Subscription和demand解释Mono/Flux的惰性、操作符、错误与取消" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第11章 Reactor入门" focus="改变请求批量、flatMap并发、错误位置与取消时间，观察上游生产量和资源释放" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第11章 Reactor入门" focus="信号图、操作符选择表、StepVerifier测试和调度器边界记录" nodes={nodes} />;
}
