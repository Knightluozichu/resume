import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "固定复现入口",
  "启动受保护调试端口",
  "设置最小断点",
  "检查调用栈",
  "记录变量与异步因果",
  "关闭会话",
] as const;
const concepts = [
  "附录B 调试Node",
  "B.1 debugger",
  "B.2 node-inspector",
  "B.2.1 安装node-inspector",
  "B.2.2 错误堆栈",
  "B.3 总结",
] as const;

export function DnjAppendixBDebuggingMapLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 B 调试 Node · 运行地图"
      label="Deep Node / Map"
      color="#0e7490"
      soft="#cffafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function DnjAppendixBDebuggingExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 B 调试 Node · 边界实验"
      label="Deep Node / Experiment"
      color="#0e7490"
      soft="#cffafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function DnjAppendixBDebuggingEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="附录 B 调试 Node · 关闭证据"
      label="Deep Node / Evidence"
      color="#0e7490"
      soft="#cffafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
