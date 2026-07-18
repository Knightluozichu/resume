"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第6章 HTTP首部",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "系统掌握HTTP/1.1通用、请求、响应、实体、Cookie及原书列出的扩展首部字段",
  nodes: [
    "6.1 HTTP报文首部",
    "6.2 HTTP首部字段",
    "6.2.1 HTTP首部字段传递重要信息",
    "6.2.2 HTTP首部字段结构",
    "6.2.3 4种HTTP首部字段类型",
    "6.2.4 HTTP/1.1首部字段一览",
    "6.2.5 非HTTP/1.1首部字段",
    "6.2.6 End-to-end首部和Hop-by-hop首部",
    "6.3 HTTP/1.1通用首部字段",
    "6.3.1 Cache-Control",
    "6.3.2 Connection",
    "6.3.3 Date",
    "6.3.4 Pragma",
    "6.3.5 Trailer",
    "6.3.6 Transfer-Encoding",
    "6.3.7 Upgrade",
    "6.3.8 Via",
    "6.3.9 Warning",
    "6.4 请求首部字段",
    "6.4.1 Accept",
    "6.4.2 Accept-Charset",
    "6.4.3 Accept-Encoding",
    "6.4.4 Accept-Language",
    "6.4.5 Authorization",
    "6.4.6 Expect",
    "6.4.7 From",
    "6.4.8 Host",
    "6.4.9 If-Match",
    "6.4.10 If-Modified-Since",
    "6.4.11 If-None-Match",
    "6.4.12 If-Range",
    "6.4.13 If-Unmodified-Since",
    "6.4.14 Max-Forwards",
    "6.4.15 Proxy-Authorization",
    "6.4.16 Range",
    "6.4.17 Referer",
    "6.4.18 TE",
    "6.4.19 User-Agent",
    "6.5 响应首部字段",
    "6.5.1 Accept-Ranges",
    "6.5.2 Age",
    "6.5.3 ETag",
    "6.5.4 Location",
    "6.5.5 Proxy-Authenticate",
    "6.5.6 Retry-After",
    "6.5.7 Server",
    "6.5.8 Vary",
    "6.5.9 WWW-Authenticate",
    "6.6 实体首部字段",
    "6.6.1 Allow",
    "6.6.2 Content-Encoding",
    "6.6.3 Content-Language",
    "6.6.4 Content-Length",
    "6.6.5 Content-Location",
    "6.6.6 Content-MD5",
    "6.6.7 Content-Range",
    "6.6.8 Content-Type",
    "6.6.9 Expires",
    "6.6.10 Last-Modified",
    "6.7 为Cookie服务的首部字段",
    "6.7.1 Set-Cookie",
    "6.7.2 Cookie",
    "6.8 其他首部字段",
    "6.8.1 X-Frame-Options",
    "6.8.2 X-XSS-Protection",
    "6.8.3 DNT",
    "6.8.4 P3P",
  ],
  invariant:
    "面对原始报文能按端到端/逐跳和通用/请求/响应/实体分类解释每个字段，并用条件请求与缓存键验证组合语义",
  failure:
    "孤立背字段名、不区分请求方向与逐跳边界，或把同名现代语义倒灌，会造成缓存泄漏、条件更新覆盖和代理转发错误",
  links: [
    {
      label: "端到端首部",
      mechanism: "必须转发到最终接收者并由端点解释的首部",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "逐跳首部",
      mechanism: "只在相邻两节点间有效，不应由代理继续转发的首部",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "条件请求",
      mechanism: "用If-Match、If-None-Match等验证器约束方法执行的请求",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "实体首部",
      mechanism:
        "描述报文所携带表示的媒体类型、长度、编码、语言和验证时间等元数据",
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

export function Ilh06HttpHeadersFlowLab() {
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

export function Ilh06HttpHeadersExperimentLab() {
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

export function Ilh06HttpHeadersEvidenceLab() {
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
