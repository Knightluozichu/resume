import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "14 Working with RSocket",
  "14.1 Introducing RSocket",
  "14.2 Creating a simple RSocket server and client",
  "14.2.1 Working with request-response",
  "14.2.2 Handling request-stream messaging",
  "14.2.3 Sending fire-and-forget messages",
  "14.2.4 Sending messages bidirectionally",
  "14.3 Transporting RSocket over WebSocket",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第14章 使用RSocket" focus="按交互模型选择request-response、request-stream、fire-and-forget或channel，并验证背压和连接生命周期" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第14章 使用RSocket" focus="在每种交互模型中制造慢消费者、取消、断线和重复连接，记录消息与资源状态" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第14章 使用RSocket" focus="交互模型决策表、帧时序图、断线重连实验和RSocketRequester合同测试" nodes={nodes} />;
}
