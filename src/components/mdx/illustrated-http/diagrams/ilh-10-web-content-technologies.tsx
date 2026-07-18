"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第10章 构建Web内容的技术",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "理解HTML、CSS、动态HTML、DOM、CGI、Servlet以及XML、RSS/Atom和JSON在Web内容生成与发布中的分工",
  nodes: [
    "10.1 HTML",
    "10.1.1 Web页面几乎全由HTML构建",
    "10.1.2 HTML的版本",
    "10.1.3 设计应用CSS",
    "10.2 动态HTML",
    "10.2.1 让Web页面动起来的动态HTML",
    "10.2.2 更易控制HTML的DOM",
    "10.3 Web应用",
    "10.3.1 通过Web提供功能的Web应用",
    "10.3.2 与Web服务器及程序协作的CGI",
    "10.3.3 因Java而普及的Servlet",
    "10.4 数据发布的格式及语言",
    "10.4.1 可扩展标记语言",
    "10.4.2 发布更新信息的RSS/Atom",
    "10.4.3 JavaScript衍生的轻量级易用JSON",
  ],
  invariant:
    "从一个URL返回页面时，能区分服务器端生成、传输格式、浏览器DOM构建、样式应用和脚本修改五个阶段",
  failure:
    "把HTTP、HTML、JavaScript与服务器程序视为同一层，会把传输错误、生成错误和客户端渲染错误混在一起",
  links: [
    {
      label: "HTML",
      mechanism: "描述Web文档结构和语义的超文本标记语言",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "CSS",
      mechanism: "把表现规则从文档结构中分离并应用到元素的样式语言",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "DOM",
      mechanism: "把文档解析为可由程序读取和修改的节点树接口",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "CGI",
      mechanism: "Web服务器启动或调用外部程序生成HTTP响应的通用接口",
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

export function Ilh10WebContentTechnologiesFlowLab() {
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

export function Ilh10WebContentTechnologiesExperimentLab() {
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

export function Ilh10WebContentTechnologiesEvidenceLab() {
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
