import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第18章 web 主机托管",
  focus: "解释专用托管、虚拟主机、Host首部、镜像服务器、CDN与代理缓存",
  concepts: [
    "第18章 web 主机托管",
    "18.1 主机托管服务",
    "18.2 虚拟主机托管",
    "18.2.1 虚拟服务器请求缺乏主机信息",
    "18.2.2 设法让虚拟主机托管正常工作",
    "18.2.3 http/1.1 的host 首部",
    "18.3 使网站更可靠",
    "18.3.1 镜像的服务器集群",
    "18.3.2 内容分发网络",
    "18.3.3 cdn 中的反向代理缓存",
    "18.3.4 cdn 中的代理缓存",
    "18.4 让网站更快",
    "18.5 更多信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg118MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg118FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg118EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
