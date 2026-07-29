import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第2章 url 与资源",
  focus: "拆解URL方案、权限、路径、参数、查询、片段、相对引用、转义和多种方案",
  concepts: [
    "第2章 url 与资源",
    "2.1 浏览因特网资源",
    "2.2 url 的语法",
    "2.2.1 方案——使用什么协议",
    "2.2.2 主机与端口",
    "2.2.3 用户名和密码",
    "2.2.4 路径",
    "2.2.5 参数",
    "2.2.6 查询字符串",
    "2.2.7 片段",
    "2.3 url 快捷方式",
    "2.3.1 相对url",
    "2.3.2 自动扩展url",
    "2.4 各种令人头疼的字符",
    "2.4.1 url 字符集",
    "2.4.2 编码机制",
    "2.4.3 字符限制",
    "2.4.4 另外一点说明",
    "2.5 方案的世界",
    "2.6 未来展望",
    "2.7 更多信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg102MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg102FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg102EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
