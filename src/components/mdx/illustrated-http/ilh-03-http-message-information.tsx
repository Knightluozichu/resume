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
      "先预测：把Transfer-Encoding和Content-Encoding混为一谈，或把消息主体等同于编码前实体，会计算错边界并破坏缓存验证。把预测写成“请求输入、线上消息、接收方状态、响应输出、最终副作用”五列，再运行实验。若结果与预测不同，先修正模型，不要只截取一个状态码证明自己。",
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
      "起始行后是零个或多个首部字段，空行终止首部，之后才是主体。请求行包含方法、请求URI和版本；状态行包含版本、状态码和原因短语。Content-Length或分块编码决定主体如何结束。",
    failure:
      "若只背诵「核心机制深读」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「核心机制深读」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
];

export function Ilh03HttpMessageInformationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章 HTTP报文内的HTTP信息：机制与证据"
      prompt="切换《第3章 HTTP报文内的HTTP信息》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章 HTTP报文内的HTTP信息》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Ilh03HttpMessageInformationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第3章 HTTP报文内的HTTP信息：机制路径"
      stages={STAGES}
    />
  );
}

export function Ilh03HttpMessageInformationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第3章 HTTP报文内的HTTP信息：失效与核验"
      stages={STAGES}
    />
  );
}
