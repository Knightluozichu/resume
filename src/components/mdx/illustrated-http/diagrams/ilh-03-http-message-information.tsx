"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第3章 HTTP报文内的HTTP信息",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "拆解HTTP报文、实体与主体，理解内容编码、分块传输、多部分对象、范围请求和内容协商",
  nodes: [
    "3.1 HTTP报文",
    "3.2 请求报文及响应报文的结构",
    "3.3 编码提升传输速率",
    "3.3.1 报文主体和实体主体的差异",
    "3.3.2 压缩传输的内容编码",
    "3.3.3 分割发送的分块传输编码",
    "3.4 发送多种数据的多部分对象集合",
    "3.5 获取部分内容的范围请求",
    "3.6 内容协商返回最合适的内容",
  ],
  invariant:
    "能够从线上的八位字节恢复起始行、首部和主体边界，并判断表示被压缩、分块、分段还是协商选择",
  failure:
    "把Transfer-Encoding和Content-Encoding混为一谈，或把消息主体等同于编码前实体，会计算错边界并破坏缓存验证",
  links: [
    {
      label: "HTTP报文",
      mechanism: "HTTP通信的基本单位，由报文首部和可选报文主体构成",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "实体",
      mechanism: "作为请求或响应有效载荷传输的资源表示及其元数据",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "内容编码",
      mechanism: "在保持媒体类型不变时压缩实体内容的编码，如gzip",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "分块传输编码",
      mechanism: "不知道最终长度时把报文主体拆成十六进制长度块发送的传输编码",
      evidence: "缓存、会话或安全边界复核",
    },
  ],
  gates: [
    "首版目录节点与2014年技术边界",
    "原始请求行、状态行与首部",
    "主体边界、编码和表示元数据",
    "连接、中介、缓存或会话状态",
    "单变量失败与无副作用证明",
    "恢复、限制、责任人与复核人",
  ],
} as const;

export function Ilh03HttpMessageInformationFlowLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="flow"
    />
  );
}

export function Ilh03HttpMessageInformationExperimentLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function Ilh03HttpMessageInformationEvidenceLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
