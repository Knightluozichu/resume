import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "创建套接字",
  "定义协议边界",
  "处理读写背压",
  "传播错误超时",
  "建立TLS身份",
  "关闭连接资源",
] as const;
const concepts = [
  "第7章 网络编程",
  "7.1 构建TCP服务",
  "7.1.1 TCP",
  "7.1.2 创建TCP服务器端",
  "7.1.3 TCP服务的事件",
  "7.2 构建UDP服务",
  "7.2.1 创建UDP套接字",
  "7.2.2 创建UDP服务器端",
  "7.2.3 创建UDP客户端",
  "7.2.4 UDP套接字事件",
  "7.3 构建HTTP服务",
  "7.3.1 HTTP",
  "7.3.2 HTTP模块",
  "7.3.3 HTTP客户端",
  "7.4 构建WebSocket服务",
  "7.4.1 WebSocket握手",
  "7.4.2 WebSocket数据传输",
  "7.4.3 小结",
  "7.5 网络服务与安全",
  "7.5.1 TLS/SSL",
  "7.5.2 TLS服务",
  "7.5.3 HTTPS服务",
  "7.6 总结",
  "7.7 参考资源",
] as const;

export function Dnj07NetworkProgrammingMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 7 章 网络编程 · 运行地图"
      label="Deep Node / Map"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj07NetworkProgrammingExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 7 章 网络编程 · 边界实验"
      label="Deep Node / Experiment"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj07NetworkProgrammingEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 7 章 网络编程 · 关闭证据"
      label="Deep Node / Evidence"
      color="#0369a1"
      soft="#e0f2fe"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
