import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第6章 代理",
  focus:
    "理解代理部署、层次、流量获取、客户端配置、URI差异、Via追踪、认证与互操作",
  concepts: [
    "第6章 代理",
    "6.1 web 的中间实体",
    "6.1.1 私有和共享代理",
    "6.1.2 代理与网关的对比",
    "6.2 为什么使用代理",
    "6.3 代理会去往何处",
    "6.3.1 代理服务器的部署",
    "6.3.2 代理的层次结构",
    "6.3.3 代理是如何获取流量的",
    "6.4 客户端的代理设置",
    "6.4.1 客户端的代理配置：手工配置",
    "6.4.2 客户端代理配置：pac 文件",
    "6.4.3 客户端代理配置：wpad",
    "6.5 与代理请求有关的一些棘手问题",
    "6.5.1 代理uri 与服务器uri 的不同",
    "6.5.2 与虚拟主机一样的问题",
    "6.5.3 拦截代理会收到部分uri",
    "6.5.4 代理既可以处理代理请求，也可以处理服务器请求",
    "6.5.5 转发过程中对uri 的修改",
    "6.5.6 uri 的客户端自动扩展和主机名解析",
    "6.5.7 没有代理时uri 的解析",
    "6.5.8 有显式代理时uri 的解析",
    "6.5.9 有拦截代理时uri 的解析",
    "6.6 追踪报文",
    "6.6.1 via 首部",
    "6.6.2 trace 方法",
    "6.7 代理认证",
    "6.8 代理的互操作性",
    "6.8.1 处理代理不支持的首部和方法",
    "6.8.2 options：发现对可选特性的支持",
    "6.8.3 allow 首部",
    "6.9 更多信息",
  ],
  fault: "逐跳字段被错误转发，导致下一跳误解连接或认证状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg106MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg106FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg106EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
