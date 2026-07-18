"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第9章 基于HTTP的功能追加协议",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "在2013至2014年的技术快照下理解SPDY、WebSocket、当时仍受期待的HTTP/2.0和WebDAV扩展",
  nodes: [
    "9.1 基于HTTP的协议",
    "9.2 消除HTTP瓶颈的SPDY",
    "9.2.1 HTTP的瓶颈",
    "9.2.2 SPDY的设计与功能",
    "9.2.3 SPDY消除Web瓶颈了么",
    "9.3 使用浏览器进行全双工通信的WebSocket",
    "9.3.1 WebSocket的设计与功能",
    "9.3.2 WebSocket协议",
    "9.4 期盼已久的HTTP/2.0",
    "9.5 Web服务器管理文件的WebDAV",
    "9.5.1 扩展HTTP/1.1的WebDAV",
    "9.5.2 WebDAV内新增的方法及状态码",
  ],
  invariant:
    "能区分HTTP承载、协议升级和HTTP方法扩展，并明确哪些结论属于首版出版时的提案或实现状态",
  failure:
    "用今天HTTP/2或HTTP/3的最终规范重写本章，会抹掉SPDY为何出现以及原书对HTTP瓶颈的历史判断",
  links: [
    {
      label: "SPDY",
      mechanism:
        "Google提出、运行在SSL之上的实验性协议，用多路复用、压缩和服务器推送缓解HTTP/1.x瓶颈",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "WebSocket",
      mechanism: "经HTTP Upgrade握手后切换为持久全双工消息通信的独立协议",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "HTTP/2.0",
      mechanism: "原书出版时仍在制定、吸收SPDY等经验的新一代HTTP目标",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "WebDAV",
      mechanism: "在HTTP/1.1上增加集合、属性、锁和远程文件管理方法的扩展",
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

export function Ilh09HttpExtensionsFlowLab() {
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

export function Ilh09HttpExtensionsExperimentLab() {
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

export function Ilh09HttpExtensionsEvidenceLab() {
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
