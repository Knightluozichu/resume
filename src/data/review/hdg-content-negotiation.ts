import { ReviewQuestion } from "./types";

export const hdgContentNegotiationQuestions: ReviewQuestion[] = [
  {
    id: "hdg-content-negotiation-1",
    chapter: "hdg-content-negotiation",
    level: 1,
    question: `三种内容协商模式分别是什么？各自的决策方是谁？`,
    answer:
      `三种模式：①服务器驱动协商——服务器根据客户端 Accept 首部自动选择，决策方是服务器 ②客户端驱动协商——服务器返回 300 Multiple Choices 列出可用表示，客户端自行选择，决策方是客户端 ③透明协商——中间代理代替服务器协商，决策方是代理。服务器驱动最常用。`,
    tags: ["内容协商", "服务器驱动", "客户端驱动", "透明协商"],
  },
  {
    id: "hdg-content-negotiation-2",
    chapter: "hdg-content-negotiation",
    level: 1,
    question: `Accept 系列首部有哪些？对应的响应首部分别是什么？q 值的作用是什么？`,
    answer:
      `四个 Accept 首部：①Accept→Content-Type（MIME 类型）②Accept-Language→Content-Language（语言）③Accept-Encoding→Content-Encoding（编码方式）④Accept-Charset→Content-Type charset（字符集）。q 值（0-1）表示偏好程度，默认 1.0，q=0 表示不接受，服务器选择 q 值最高的匹配表示。`,
    tags: ["Accept", "Content-Type", "q值", "内容协商"],
  },
  {
    id: "hdg-content-negotiation-3",
    chapter: "hdg-content-negotiation",
    level: 2,
    question: `什么是转码？转码有哪些类型？转码有什么风险？`,
    answer:
      `转码是代理/网关在转发响应时修改内容表示的机制。类型：格式转换（HTML→WML）、压缩（Gzip）、内容缩放（图片缩小）、语言翻译、内容过滤。风险：有损转码（格式转换/过滤）可能破坏内容完整性，转码代理应在 Via 首部声明。无损转码（如压缩）是安全的。`,
    tags: ["转码", "代理", "压缩", "格式转换"],
  },
  {
    id: "hdg-content-negotiation-4",
    chapter: "hdg-content-negotiation",
    level: 2,
    question: `服务器驱动协商和客户端驱动协商各有什么优缺点？适用于什么场景？`,
    answer:
      `服务器驱动：优点是一次请求完成、对客户端透明；缺点是服务器需实现协商逻辑。适用于常规 Web 和 API。客户端驱动：优点是服务器简单、客户端自主决策；缺点是需两次请求（先获取列表再请求选中项）、增加延迟。适用于可选表示差异大、需用户手动选择的场景（如下载选格式）。`,
    tags: ["服务器驱动", "客户端驱动", "对比", "场景"],
  },
];
