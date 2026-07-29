import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第11章 客户端识别与cookie 机制",
  focus: "比较HTTP首部、IP、登录、胖URL和Cookie等客户端识别与会话机制",
  concepts: [
    "第11章 客户端识别与cookie 机制",
    "11.1 个性化接触",
    "11.2 http 首部",
    "11.3 客户端ip 地址",
    "11.4 用户登录",
    "11.5 胖url",
    "11.6 cookie",
    "11.6.1 cookie 的类型",
    "11.6.2 cookie 是如何工作的",
    "11.6.3 cookie 罐：客户端的状态",
    "11.6.4 不同站点使用不同的cookie",
    "11.6.5 cookie 成分",
    "11.6.6 cookies 版本0（netscape）",
    "11.6.7 cookies 版本1（rfc 2965）",
    "11.6.8 cookie 与会话跟踪",
    "11.6.9 cookie 与缓存",
    "11.6.10 cookie、安全性和隐私",
    "11.7 更多信息",
  ],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg111MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg111FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg111EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
