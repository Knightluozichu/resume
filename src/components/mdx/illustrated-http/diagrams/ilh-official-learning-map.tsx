"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "2014年首版权威学习地图",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus:
    "把原书11章、202个正式节/小节节点还原为从Web基础、HTTP/1.1报文到HTTPS与Web攻击的完整路线",
  nodes: [
    "第1章 了解Web及网络基础",
    "第2章 简单的HTTP协议",
    "第3章 HTTP报文内的HTTP信息",
    "第4章 返回结果的HTTP状态码",
    "第5章 与HTTP协作的Web服务器",
    "第6章 HTTP首部",
    "第7章 确保Web安全的HTTPS",
    "第8章 确认访问用户身份的认证",
    "第9章 基于HTTP的功能追加协议",
    "第10章 构建Web内容的技术",
    "第11章 Web的攻击技术",
  ],
  invariant:
    "任一知识点都能定位到原书章号，并能用一组请求、响应、状态变化和安全边界解释其作用",
  failure:
    "按现代HTTP主题重新分组会遗漏原书第3、5、9、10、11章，并把HTTP/2定稿、HTTP/3、JWT和现代浏览器策略倒灌进2014年首版",
  links: [
    {
      label: "Web",
      mechanism: "由URI、HTTP、HTML等技术共同构成的分布式超媒体系统",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "HTTP/1.1",
      mechanism:
        "本书正文采用的主要协议快照，核心是文本报文、请求响应、持久连接与可扩展首部",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "请求响应",
      mechanism: "客户端先发请求、服务器返回响应的基本通信闭环",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "首部字段",
      mechanism: "为报文补充控制信息、表示元数据、条件与认证信息的可扩展字段",
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

export function IlhOfficialLearningMapFlowLab() {
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

export function IlhOfficialLearningMapExperimentLab() {
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

export function IlhOfficialLearningMapEvidenceLab() {
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
