"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一条可证伪的HTTP交换开始",
    mechanism:
      "先预测：用今天HTTP/2或HTTP/3的最终规范重写本章，会抹掉SPDY为何出现以及原书对HTTP瓶颈的历史判断。把预测写成“请求输入、线上消息、接收方状态、响应输出、最终副作用”五列，再运行实验。若结果与预测不同，先修正模型，不要只截取一个状态码证明自己。",
    failure:
      "若只背诵「从一条可证伪的HTTP交换开始」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「从一条可证伪的HTTP交换开始」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
  {
    label: "核心词汇与首版边界",
    mechanism:
      "这些词汇按2014年首版语义使用。SPDY、HTTP/2.0、X-XSS-Protection、P3P等保留出版时状态；HTTP/2最终规范、HTTP/3、JWT、OAuth、SameSite等后续技术只能作为另行标注的现代补充，不改变本书目录分母。",
    failure:
      "若只背诵「核心词汇与首版边界」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「核心词汇与首版边界」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
  {
    label: "核心机制深读",
    mechanism:
      "页面资源数量增加后，单连接按序响应、并发连接限制、重复且冗长的首部和客户端轮询放大延迟。优化图片合并、内联和域名分片只是绕过协议限制，也会增加缓存与维护复杂度。",
    failure:
      "若只背诵「核心机制深读」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「核心机制深读」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
];

export function Ilh09HttpExtensionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第9章 基于HTTP的功能追加协议：机制与证据"
      prompt="切换《第9章 基于HTTP的功能追加协议》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第9章 基于HTTP的功能追加协议》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Ilh09HttpExtensionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第9章 基于HTTP的功能追加协议：机制路径"
      stages={STAGES}
    />
  );
}

export function Ilh09HttpExtensionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第9章 基于HTTP的功能追加协议：失效与核验"
      stages={STAGES}
    />
  );
}
