import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "保留源码映射",
  "启动调试会话",
  "配置断点",
  "缩小状态空间",
  "验证热替换",
  "关闭监听资源",
] as const;
const concepts = [
  "第4章 工具",
  "4.1 Source Map",
  "4.1.1 uglify-es",
  "4.1.2 TypeScript",
  "4.1.3 source-map-support的高级用法",
  "4.2 Chrome DevTools",
  "4.2.1 使用Chrome DevTools",
  "4.2.2 NIM",
  "4.2.3 inspect-process",
  "4.2.4 process._debugProcess",
  "4.3 Visual Studio Code",
  "4.3.1 基本调试",
  "4.3.2 launch.json",
  "4.3.3 技巧1：条件断点",
  "4.3.4 技巧2：skipFiles",
  "4.3.5 技巧3：自动重启",
  "4.3.6 技巧4：对特定操作系统的设置",
  "4.3.7 技巧5：多配置",
  "4.3.8 总结",
  "4.4 debug repl2 power-assert",
  "4.4.1 debug",
  "4.4.2 repl2",
  "4.4.3 power-assert",
  "4.5 supervisor-hot-reload",
  "4.5.1 Proxy",
  "4.5.2 用Proxy实现Hot Reload",
  "4.5.3 supervisor-hot-reload",
  "4.5.4 内存泄漏问题",
] as const;

export function Ndbg04ToolsMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 4 章 工具 · 证据地图"
      label="Node Debugging / Map"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg04ToolsExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 4 章 工具 · 故障实验"
      label="Node Debugging / Experiment"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg04ToolsEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 4 章 工具 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#7c3aed"
      soft="#ede9fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
