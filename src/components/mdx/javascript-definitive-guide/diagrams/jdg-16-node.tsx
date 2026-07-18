import { Jdg7MechanismLab } from "./official-jdg7-lab";

const nodes = [
  "启动 Node 进程与模块",
  "接收事件或 I/O",
  "在 Buffer 与流中传输数据",
  "处理背压和文件状态",
  "调用网络、子进程或工作线程",
  "关闭句柄并报告结果"
] as const;

export function Jdg16NodeMapLab() {
  return <Jdg7MechanismLab title="第 16 章 Node 服务器端 JavaScript · 机制地图" label="Server-Side JavaScript with Node" nodes={nodes} mode="map" />;
}

export function Jdg16NodeExperimentLab() {
  return <Jdg7MechanismLab title="第 16 章 Node 服务器端 JavaScript · 运行时实验" label="Server-Side JavaScript with Node" nodes={nodes} mode="experiment" />;
}

export function Jdg16NodeEvidenceLab() {
  return <Jdg7MechanismLab title="第 16 章 Node 服务器端 JavaScript · 恢复证据" label="Server-Side JavaScript with Node" nodes={nodes} mode="evidence" />;
}
