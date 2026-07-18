import { OfficialRabbitActionLab } from "./official-rabbit-action-lab";

const meta = {
  unitTitle: "第11章 提升性能，保障安全",
  focus:
    "测量持久化、确认、路由绑定和投递路径的性能，控制内存与Erlang进程，并建立RabbitMQ 2.7 SSL双向认证",
  invariant:
    "性能比较固定消息、拓扑与可靠语义；内存与进程有上界；证书链、服务端身份、客户端身份和监听端口可独立验证",
  artifact:
    "吞吐延迟矩阵、内存进程预算、绑定复杂度测试、证书链、SSL监听配置与双向连接证据",
  nodes: [
    "对速度的需求",
    "消息持久化",
    "消息确认",
    "路由算法和绑定规则",
    "投递消息",
    "内存使用率和进程限制",
    "内存使用率",
    "Erlang进程计数",
    "SSL连接",
    "SSL证书",
    "设置证书颁发机构",
    "生成根证书",
    "生成服务器端证书",
    "生成客户端证书",
    "启用RabbitMQ的SSL监听器",
    "测试你的RabbitMQ SSL设置",
    "总结",
  ],
} as const;

export function Rmq11PerformanceSecurityTopologyLab() {
  return <OfficialRabbitActionLab mode="topology" {...meta} />;
}
export function Rmq11PerformanceSecurityDeliveryLab() {
  return <OfficialRabbitActionLab mode="delivery" {...meta} />;
}
export function Rmq11PerformanceSecurityEvidenceLab() {
  return <OfficialRabbitActionLab mode="evidence" {...meta} />;
}
