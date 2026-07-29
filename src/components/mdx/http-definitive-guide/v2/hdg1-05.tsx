import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第5章 web 服务器",
  focus: "沿接受连接、接收、处理、资源映射、构建响应、发送和日志还原Web服务器",
  concepts: [
    "第5章 web 服务器",
    "5.1 各种形状和尺寸的web 服务器",
    "5.1.1 web 服务器的实现",
    "5.1.2 通用软件web 服务器",
    "5.1.3 web 服务器设备",
    "5.1.4 嵌入式web 服务器",
    "5.2 最小的perl web 服务器",
    "5.3 实际的web 服务器会做些什么",
    "5.4 第一步——接受客户端连接",
    "5.4.1 处理新连接",
    "5.4.2 客户端主机名识别",
    "5.4.3 通过ident 确定客户端用户",
    "5.5 第二步——接收请求报文",
    "5.5.1 报文的内部表示法",
    "5.5.2 连接的输入/ 输出处理结构",
    "5.6 第三步——处理请求",
    "5.7 第四步——对资源的映射及访问",
    "5.7.1 docroot",
    "5.7.2 目录列表",
    "5.7.3 动态内容资源的映射",
    "5.7.4 服务器端包含项",
    "5.7.5 访问控制",
    "5.8 第五步——构建响应",
    "5.8.1 响应实体",
    "5.8.2 mime 类型",
    "5.8.3 重定向",
    "5.9 第六步——发送响应",
    "5.10 第七步——记录日志",
    "5.11 更多信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg105MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg105FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg105EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
