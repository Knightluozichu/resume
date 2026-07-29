import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第3章 http 报文",
  focus: "掌握HTTP报文流、起始行、首部、实体、方法、状态码和首部分类",
  concepts: [
    "第3章 http 报文",
    "3.1 报文流",
    "3.1.1 报文流入源端服务器",
    "3.1.2 报文向下游流动",
    "3.2 报文的组成部分",
    "3.2.1 报文的语法",
    "3.2.2 起始行",
    "3.2.3 首部",
    "3.2.4 实体的主体部分",
    "3.2.5 版本0.9 的报文",
    "3.3 方法",
    "3.3.1 安全方法",
    "3.3.2 get",
    "3.3.3 head",
    "3.3.4 put",
    "3.3.5 post",
    "3.3.6 trace",
    "3.3.7 options",
    "3.3.8 delete",
    "3.3.9 扩展方法",
    "3.4 状态码",
    "3.4.1 100 ～ 199——信息性状态码",
    "3.4.2 200 ～ 299——成功状态码",
    "3.4.3 300 ～ 399——重定向状态码",
    "3.4.4 400 ～ 499——客户端错误状态码",
    "3.4.5 500 ～ 599——服务器错误状态码",
    "3.5 首部",
    "3.5.1 通用首部",
    "3.5.2 请求首部",
    "3.5.3 响应首部",
    "3.5.4 实体首部",
    "3.6 更多信息",
  ],
  fault: "主体边界或连接关闭条件错误，使下一条报文从错误字节开始解析",
  evidence:
    "TCP四元组、request/response bytes、message boundary、Connection字段、close与retry",
} satisfies HttpExperimentModel;

export function Hdg103MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg103FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg103EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
