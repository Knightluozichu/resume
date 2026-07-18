import { NodeDefinitiveOfficialLab } from "./official-node-definitive-lab";

const chain = [
  "升级连接",
  "认证会话",
  "注册事件",
  "校验消息",
  "广播或确认",
  "断线清理",
] as const;
const concepts = [
  "第15章 使用Socket.IO类库实现WebSocket通信",
  "15.1 Socket.IO概述",
  "15.2 Socket.IO的使用方法",
  "15.3 在Express框架中使用Socket.IO",
  "15.4 在服务器端保存用户数据",
  "15.5 广播消息",
  "15.6 使用命名空间",
  "15.7 小结",
] as const;

export function Ndg15SocketioWebsocketMapLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 15 章 使用 Socket.IO 类库实现 WebSocket 通信 · 生命周期地图"
      label="Node.js Definitive / Map"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Ndg15SocketioWebsocketExperimentLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 15 章 使用 Socket.IO 类库实现 WebSocket 通信 · 故障实验"
      label="Node.js Definitive / Experiment"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Ndg15SocketioWebsocketEvidenceLab() {
  return (
    <NodeDefinitiveOfficialLab
      title="第 15 章 使用 Socket.IO 类库实现 WebSocket 通信 · 关闭证据"
      label="Node.js Definitive / Evidence"
      color="#a21caf"
      soft="#fae8ff"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
