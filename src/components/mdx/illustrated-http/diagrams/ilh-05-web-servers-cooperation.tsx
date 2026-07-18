"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第5章 与HTTP协作的Web服务器",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "解释虚拟主机、代理、网关、隧道和缓存如何处在客户端与源服务器之间并改变转发路径",
  nodes: [
    "5.1 用单台虚拟主机实现多个域名",
    "5.2 通信数据转发程序：代理、网关、隧道",
    "5.2.1 代理",
    "5.2.2 网关",
    "5.2.3 隧道",
    "5.3 保存资源的缓存",
    "5.3.1 缓存的有效期限",
    "5.3.2 客户端的缓存",
  ],
  invariant:
    "给出一条含中介的请求链时，能说明每一跳代表谁、是否改写协议、缓存存在哪里以及响应新鲜度如何判断",
  failure:
    "把代理、网关、隧道和CDN统称为反向代理，会丢失协议转换、透明转发、加密通道与缓存责任边界",
  links: [
    {
      label: "虚拟主机",
      mechanism: "在一台服务器或一个IP上依据Host等信息承载多个域名的机制",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "代理",
      mechanism:
        "以HTTP中介身份接收请求并向下一站转发，可能缓存、过滤或改写报文",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "网关",
      mechanism: "接收HTTP后与后端其他协议或应用接口衔接的服务器",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "隧道",
      mechanism: "在两端之间建立透明传输通道，本身通常不解析通道内应用数据",
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

export function Ilh05WebServersCooperationFlowLab() {
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

export function Ilh05WebServersCooperationExperimentLab() {
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

export function Ilh05WebServersCooperationEvidenceLab() {
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
