import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第13章 摘要认证",
  focus: "还原摘要认证的nonce、A1/A2、摘要计算、预授权、保护质量和攻击面",
  concepts: [
    "第13章 摘要认证",
    "13.1 摘要认证的改进",
    "13.1.1 用摘要保护密码",
    "13.1.2 单向摘要",
    "13.1.3 用随机数防止重放攻击",
    "13.1.4 摘要认证的握手机制",
    "13.2 摘要的计算",
    "13.2.1 摘要算法的输入数据",
    "13.2.2 算法h(d) 和kd(s,d)",
    "13.2.3 与安全性相关的数据（a1）",
    "13.2.4 与报文有关的数据（a2）",
    "13.2.5 摘要算法总述",
    "13.2.6 摘要认证会话",
    "13.2.7 预授权",
    "13.2.8 随机数的选择",
    "13.2.9 对称认证",
    "13.3 增强保护质量",
    "13.3.1 报文完整性保护",
    "13.3.2 摘要认证首部",
    "13.4 应该考虑的实际问题",
    "13.4.1 多重质询",
    "13.4.2 差错处理",
    "13.4.3 保护空间",
    "13.4.4 重写uri",
    "13.4.5 缓存",
    "13.5 安全性考虑",
    "13.5.1 首部篡改",
    "13.5.2 重放攻击",
    "13.5.3 多重认证机制",
    "13.5.4 词典攻击",
    "13.5.5 恶意代理攻击和中间人攻击",
    "13.5.6 选择明文攻击",
    "13.5.7 存储密码",
    "13.6 更多信息",
  ],
  fault: "身份、realm、cookie作用域或证书主体没有绑定到当前请求",
  evidence:
    "request target、realm/origin、credentials、Set-Cookie/Cookie、TLS identity与status",
} satisfies HttpExperimentModel;

export function Hdg113MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg113FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg113EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
