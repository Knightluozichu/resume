import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "接受连接",
  "解析请求",
  "限制消息体",
  "执行业务",
  "提交响应",
  "超时关闭",
] as const;
const concepts = [
  "第8章 创建HTTP与HTTPS服务器及客户端",
  "8.1 HTTP服务器",
  "8.2 HTTP客户端",
  "8.3 创建HTTPS服务器与客户端",
  "8.4 小结",
] as const;

export function Ndg08HttpHttpsMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 8 章 创建 HTTP 与 HTTPS 服务器及客户端 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg08HttpHttpsExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 8 章 创建 HTTP 与 HTTPS 服务器及客户端 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg08HttpHttpsEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 8 章 创建 HTTP 与 HTTPS 服务器及客户端 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#0f766e"
      soft="#ccfbf1"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
