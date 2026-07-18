import { NodeDebuggingOfficialLab } from "./official-node-debugging-lab";

const chain = [
  "定义服务指标",
  "发送StatsD",
  "写入时序库",
  "配置Grafana",
  "设置报警条件",
  "演练恢复通知",
] as const;
const concepts = [
  "第7章 监控",
  "7.1 Telegraf InfluxDB Grafana（上）",
  "7.1.1 Telegraf（StatsD）InfluxDB Grafana简介",
  "7.1.2 启动docker-statsd-influxdb-grafana",
  "7.1.3 熟悉InfluxDB",
  "7.1.4 配置Grafana",
  "7.1.5 node-statsd",
  "7.1.6 创建Grafana图表",
  "7.1.7 模拟真实环境",
  "7.2 Telegraf InfluxDB Grafana（下）",
  "7.2.1 Grafana ELK",
  "7.2.2 监控报警",
  "7.2.3 脚本一键生成图表",
] as const;

export function Ndbg07MonitoringMapLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 7 章 监控 · 证据地图"
      label="Node Debugging / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}

export function Ndbg07MonitoringExperimentLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 7 章 监控 · 故障实验"
      label="Node Debugging / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}

export function Ndbg07MonitoringEvidenceLab() {
  return (
    <NodeDebuggingOfficialLab
      title="第 7 章 监控 · 恢复证据"
      label="Node Debugging / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
