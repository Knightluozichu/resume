import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第4章 连接管理",
  focus: "解释TCP性能、串行与并行连接、Keep-Alive、持久连接、管线化和正确关闭",
  concepts: [
    "第4章 连接管理",
    "4.1 tcp 连接",
    "4.1.1 tcp 的可靠数据管道",
    "4.1.2 tcp 流是分段的、由ip 分组传送",
    "4.1.3 保持tcp 连接的正确运行",
    "4.1.4 用tcp 套接字编程",
    "4.2 对tcp 性能的考虑",
    "4.2.1 http 事务的时延",
    "4.2.2 性能聚焦区域",
    "4.2.3 tcp 连接的握手时延",
    "4.2.4 延迟确认",
    "4.2.5 tcp 慢启动",
    "4.2.6 nagle 算法与tcp_nodelay",
    "4.2.7 time_wait 累积与端口耗尽",
    "4.3 http 连接的处理",
    "4.3.1 常被误解的connection 首部",
    "4.3.2 串行事务处理时延",
    "4.4 并行连接",
    "4.4.1 并行连接可能会提高页面的加载速度",
    "4.4.2 并行连接不一定更快",
    "4.4.3 并行连接可能让人“感觉”更快一些",
    "4.5 持久连接",
    "4.5.1 持久以及并行连接",
    "4.5.2 http/1.0+ keep-alive 连接",
    "4.5.3 keep-alive 操作",
    "4.5.4 keep-alive 选项",
    "4.5.5 keep-alive 连接的限制和规则",
    "4.5.6 keep-alive 和哑代理",
    "4.5.7 插入proxy-connection",
    "4.5.8 http/1.1 持久连接",
    "4.5.9 持久连接的限制和规则",
    "4.6 管道化连接",
    "4.7 关闭连接的奥秘",
    "4.7.1 “ 任意”解除连接",
    "4.7.2 content-length 及截尾操作",
    "4.7.3 连接关闭容限、重试以及幂等性",
    "4.7.4 正常关闭连接",
    "4.8 更多信息",
    "4.8.1 http 连接",
    "4.8.2 http 性能问题",
    "4.8.3 tcp/ip",
  ],
  fault: "主体边界或连接关闭条件错误，使下一条报文从错误字节开始解析",
  evidence:
    "TCP四元组、request/response bytes、message boundary、Connection字段、close与retry",
} satisfies HttpExperimentModel;

export function Hdg104MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg104FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg104EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
