import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-09",
  title: "1.9 搞清楚Socket",
  family: "network",
  nodes: ["创建端点", "绑定监听", "建立连接", "收发字节", "关闭连接"],
  concepts: ["1.9 搞清楚Socket"],
  mechanism:
    "socket 是进程访问网络协议栈的端点接口；服务器 bind/listen/accept，客户端 connect，连接由地址、端口和协议状态共同区分",
  success: "1.9 搞清楚Socket 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.9 搞清楚Socket 在“把监听 socket 与 accept 返回的已连接 socket 混为一个状态，导致生命周期和并发处理错误”处拒绝",
} as const;

export function Crv18Section0109Lab() {
  return <CoderMechanismLab {...profile} />;
}
