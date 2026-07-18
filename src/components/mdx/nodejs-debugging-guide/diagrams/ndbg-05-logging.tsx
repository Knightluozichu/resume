import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "生成关联标识",
  "传播异步上下文",
  "结构化记录",
  "汇聚与检索",
  "连接链路错误",
  "复盘采样缺口",
] as const;
const concepts = [
  "第5章 日志",
  "5.1 koa-await-breakpoint",
  "5.1.1 koa-await-breakpoint的实现原理",
  "5.1.2 使用koa-await-breakpoint",
  "5.1.3 自定义日志存储",
  "5.2 使用async_hooks",
  "5.3 ELK",
  "5.3.1 安装ELK",
  "5.3.2 使用ELK",
  "5.4 OpenTracing Jaeger",
  "5.4.1 什么是OpenTracing",
  "5.4.2 什么是Jaeger",
  "5.4.3 启动Jaeger及Jaeger UI",
  "5.4.4 使用OpenTracing及Jaeger",
  "5.4.5 koa-await-breakpoint-jaeger",
  "5.5 使用Sentry",
] as const;

export function Ndbg05LoggingMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 5 章 日志 · 证据地图"
      label="Node Debugging / Map"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg05LoggingExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 5 章 日志 · 故障实验"
      label="Node Debugging / Experiment"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg05LoggingEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 5 章 日志 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#047857"
      soft="#d1fae5"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
