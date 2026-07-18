import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "复现异常",
  "捕获完整栈",
  "展开异步链",
  "检查优化状态",
  "隔离原生边界",
  "验证循环退出",
] as const;
const concepts = [
  "第3章 代码",
  "3.1 Promise",
  "3.1.1 Promise/A规范",
  "3.1.2 从零开始实现Promise",
  "3.1.3 Promise的实现原理",
  "3.1.4 safelyResolveThen",
  "3.1.5 doResolve和doReject",
  "3.1.6 Promise.prototype.then和Promise.prototype.catch",
  "3.1.7 值穿透",
  "3.1.8 Promise.resolve和Promise.reject",
  "3.1.9 Promise.all",
  "3.1.10 Promise.race",
  "3.1.11 代码解析",
  "3.2 Async Await",
  "3.2.1 例1：async await",
  "3.2.2 例2：co yield",
  "3.2.3 例3：co yield*",
  "3.2.4 例4：co bluebird",
  "3.2.5 从yield转为yield*遇到的坑",
  "3.2.6 async bluebird",
  "3.3 Error Stack",
  "3.3.1 Stack Trace",
  "3.3.2 Error.captureStackTrace",
  "3.3.3 captureStackTrace在Mongolass中的应用",
  "3.3.4 Error.prepareStackTrace",
  "3.3.5 Error.prepareStackTrace的其他用法",
  "3.3.6 Error.stackTraceLimit",
  "3.3.7 Long Stack Trace",
  "3.4 node@8",
  "3.4.1 Ignition TurboFan",
  "3.4.2 版本的对应关系",
  "3.4.3 try/catch",
  "3.4.4 delete",
  "3.4.5 arguments",
  "3.4.6 async性能提升",
  "3.4.7 不会优化的特性",
  "3.5 Rust Addons",
  "3.5.1 Rust",
  "3.5.2 FFI",
  "3.5.3 Neon",
  "3.5.4 NAPI",
  "3.6 Event Loop",
  "3.6.1 什么是Event Loop",
  "3.6.2 poll阶段",
  "3.6.3 process.nextTick()",
  "3.6.4 代码解析",
  "3.7 处理uncaughtException",
  "3.7.1 uncaughtException",
  "3.7.2 使用llnode",
  "3.7.3 ReDoS",
] as const;

export function Ndbg03CodeMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 3 章 代码 · 证据地图"
      label="Node Debugging / Map"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg03CodeExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 3 章 代码 · 故障实验"
      label="Node Debugging / Experiment"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg03CodeEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 3 章 代码 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#1d4ed8"
      soft="#dbeafe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
