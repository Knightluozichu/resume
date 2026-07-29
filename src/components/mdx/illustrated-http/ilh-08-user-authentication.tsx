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
      "先预测：把Base64当加密、把DIGEST当现代安全方案，或只依赖客户端Cookie中的用户身份，会让凭据重放和会话劫持直接成立。把预测写成“请求输入、线上消息、接收方状态、响应输出、最终副作用”五列，再运行实验。若结果与预测不同，先修正模型，不要只截取一个状态码证明自己。",
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
      "可用于核对身份的信息包括密码、动态令牌、证书、IC卡和生物特征。可靠流程要同时考虑凭据如何登记、传输、验证、更新、吊销与审计，而不是只看登录页面。",
    failure:
      "若只背诵「核心机制深读」字段而不区分请求语义、缓存边界和安全上下文，代理或浏览器状态变化后会得到错误响应或泄露数据。",
    evidence:
      "保存「核心机制深读」的原始请求与响应报文，用 curl 和浏览器网络面板复现成功、重定向、缓存及拒绝路径，并核对状态码与首部。",
  },
];

export function Ilh08UserAuthenticationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第8章 确认访问用户身份的认证：机制与证据"
      prompt="切换《第8章 确认访问用户身份的认证》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第8章 确认访问用户身份的认证》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Ilh08UserAuthenticationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第8章 确认访问用户身份的认证：机制路径"
      stages={STAGES}
    />
  );
}

export function Ilh08UserAuthenticationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第8章 确认访问用户身份的认证：失效与核验"
      stages={STAGES}
    />
  );
}
