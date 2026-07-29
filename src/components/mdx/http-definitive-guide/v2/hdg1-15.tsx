import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第15章 实体和编码",
  focus:
    "掌握实体长度、摘要、媒体类型、内容编码、传输编码、分块、验证器、范围与差异编码",
  concepts: [
    "第15章 实体和编码",
    "15.1 报文是箱子，实体是货物",
    "15.2 content-length: 实体的大小",
    "15.2.1 检测截尾",
    "15.2.2 错误的content-length",
    "15.2.3 content-length 与持久连接",
    "15.2.4 内容编码",
    "15.2.5 确定实体主体长度的规则",
    "15.3 实体摘要",
    "15.4 媒体类型和字符集",
    "15.4.1 文本的字符编码",
    "15.4.2 多部分媒体类型",
    "15.4.3 多部分表格提交",
    "15.4.4 多部分范围响应",
    "15.5 内容编码",
    "15.5.1 内容编码过程",
    "15.5.2 内容编码类型",
    "15.5.3 accept-encoding 首部",
    "15.6 传输编码和分块编码",
    "15.6.1 可靠传输",
    "15.6.2 transfer-encoding 首部",
    "15.6.3 分块编码",
    "15.6.4 内容编码与传输编码的结合",
    "15.6.5 传输编码的规则",
    "15.7 随时间变化的实例",
    "15.8 验证码和新鲜度",
    "15.8.1 新鲜度",
    "15.8.2 有条件的请求与验证码",
    "15.9 范围请求",
    "15.10 差异编码",
    "15.11 更多信息",
  ],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg115MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg115FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg115EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
