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
      "先预测：按术语列表复习会失去跨章因果；真正掌握必须让同一个请求同时通过报文、缓存、认证和攻击面审计。把预测写成“请求输入、线上消息、接收方状态、响应输出、最终副作用”五列，再运行实验。若结果与预测不同，先修正模型，不要只截取一个状态码证明自己。",
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
      "给定URI，写出DNS结果、TCP连接、TLS状态（若有）、请求行、Host、关键首部和最终状态码。缺少任一层就无法判断超时、连接失败与应用错误分别发生在哪里。",
    failure:
      "若只背诵「核心机制深读」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「核心机制深读」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
];

export function IlhOfficialFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="2014年首版总复习与协议审计：机制与证据"
      prompt="切换《2014年首版总复习与协议审计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《2014年首版总复习与协议审计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IlhOfficialFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="2014年首版总复习与协议审计：机制路径"
      stages={STAGES}
    />
  );
}

export function IlhOfficialFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="2014年首版总复习与协议审计：失效与核验"
      stages={STAGES}
    />
  );
}
