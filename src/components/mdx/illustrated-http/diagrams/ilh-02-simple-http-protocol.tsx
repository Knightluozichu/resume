"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第2章 简单的HTTP协议",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "掌握客户端/服务器请求响应、无状态、请求URI、HTTP方法、持久连接、管线化和Cookie状态管理",
  nodes: [
    "2.1 HTTP协议用于客户端和服务器端之间的通信",
    "2.2 通过请求和响应的交换达成通信",
    "2.3 HTTP是不保存状态的协议",
    "2.4 请求URI定位资源",
    "2.5 告知服务器意图的HTTP方法",
    "2.6 使用方法下达命令",
    "2.7 持久连接节省通信量",
    "2.7.1 持久连接",
    "2.7.2 管线化",
    "2.8 使用Cookie的状态管理",
  ],
  invariant:
    "看到任一请求都能指出方法语义、目标资源、协议状态与连接复用边界，并区分协议无状态和应用会话状态",
  failure:
    "按CRUD口号随意替换原书方法语义，或把Cookie理解成HTTP变成有状态协议，会掩盖重复请求和权限风险",
  links: [
    {
      label: "请求报文",
      mechanism: "由方法、请求URI、协议版本、首部与可选主体组成的客户端消息",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "响应报文",
      mechanism: "由协议版本、状态码、原因短语、首部与可选主体组成的服务器消息",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "无状态",
      mechanism: "协议本身不保存先前请求处理状态，每个请求需携带足够上下文",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "幂等",
      mechanism: "同一请求重复执行一次或多次，对目标资源的预期效果相同",
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

export function Ilh02SimpleHttpProtocolFlowLab() {
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

export function Ilh02SimpleHttpProtocolExperimentLab() {
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

export function Ilh02SimpleHttpProtocolEvidenceLab() {
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
