import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "2002年首版总复习与HTTP事务审计",
  focus:
    "把URL、连接、报文、中间实体、身份安全、实体编码、国际化、发布分发和日志闭合为完整HTTP事务",
  concepts: [
    "第一部分 http：web 的基础",
    "第1章 http 概述",
    "第2章 url 与资源",
    "第3章 http 报文",
    "第4章 连接管理",
    "第二部分 http 结构",
    "第5章 web 服务器",
    "第6章 代理",
    "第7章 缓存",
    "第8章 集成点：网关、隧道及中继",
    "第9章 web 机器人",
    "第10章 http-ng",
    "第三部分 识别、认证与安全",
    "第11章 客户端识别与cookie 机制",
    "第12章 基本认证机制",
    "第13章 摘要认证",
    "第14章 安全http",
    "第四部分 实体、编码和国际化",
    "第15章 实体和编码",
    "第16章 国际化",
    "第17章 内容协商与转码",
    "第五部分 内容发布与分发",
    "第18章 web 主机托管",
    "第19章 发布系统",
    "第20章 重定向与负载均衡",
    "第21章 日志记录与使用情况跟踪",
    "第六部分 附 录",
    "附录A uri 方案",
    "附录B http 状态码",
    "附录C http 首部参考",
    "附录D mime 类型",
    "附录E base-64 编码",
    "附录F 摘要认证",
    "附录G 语言标记",
    "附录H mime 字符集注册表",
    "索引",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg1OfficialFinalReviewMessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg1OfficialFinalReviewFlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg1OfficialFinalReviewEvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
