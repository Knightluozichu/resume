import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "绑定地址",
  "建立会话",
  "接收字节或报文",
  "解析协议帧",
  "施加流量控制",
  "关闭套接字",
] as const;
const concepts = [
  "第7章 实现基于TCP与UDP的数据通信",
  "7.1 使用net模块实现基于TCP的数据通信",
  "7.2 使用dgram模块实现基于UDP的数据通信",
  "7.3 小结",
] as const;

export function Ndg07TcpUdpMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 7 章 实现基于 TCP 与 UDP 的数据通信 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg07TcpUdpExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 7 章 实现基于 TCP 与 UDP 的数据通信 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg07TcpUdpEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 7 章 实现基于 TCP 与 UDP 的数据通信 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
