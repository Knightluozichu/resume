"use client";

import { useState } from "react";

const formats = [
  {
    title: "电话面试",
    signal: "口头澄清与边界推理",
    risk: "没有共享画面，表达含糊会被放大",
  },
  {
    title: "共享桌面远程面试",
    signal: "编辑、运行、调试全过程",
    risk: "工具与网络故障会打断思路",
  },
  {
    title: "现场面试",
    signal: "白板推导、协作和连续轮次",
    risk: "压力下容易跳过澄清与验证",
  },
] as const;

const evidenceSteps = [
  {
    label: "背景",
    prompt: "为什么需要改？",
    weak: "项目很复杂，我负责优化。",
    strong: "接口 P99 已到 480 ms，发布窗口要求降到 250 ms 内。",
  },
  {
    label: "任务",
    prompt: "你的责任边界是什么？",
    weak: "我们一起把问题解决了。",
    strong: "我负责定位查询热点、设计索引，并组织回归与灰度指标。",
  },
  {
    label: "行动",
    prompt: "你具体做了什么？",
    weak: "加了缓存，又优化了一些代码。",
    strong: "先用 trace 证实 71% 延迟来自重复查询，再加复合索引和有界缓存。",
  },
  {
    label: "结果",
    prompt: "结果如何被验证？",
    weak: "效果很好，领导很满意。",
    strong: "P99 降到 190 ms，命中率 82%，两周灰度无错误率回升。",
  },
] as const;

const dimensions = [
  {
    label: "项目经验",
    question: "你是否能把个人责任、关键决策和量化结果分开说明？",
    evidence: "范围、约束、你的动作、指标前后对比",
  },
  {
    label: "基础知识",
    question: "能否解释数据结构、语言和算法为何这样工作？",
    evidence: "定义、机制、复杂度、边界反例",
  },
  {
    label: "高质量代码",
    question: "正常输入之外，非法输入与退化情况会怎样？",
    evidence: "契约、命名、边界、测试与错误处理",
  },
  {
    label: "清晰思路",
    question: "是否先澄清，再画图、举例或分解问题？",
    evidence: "候选方案、选择理由、不变式与验证步骤",
  },
  {
    label: "优化效率",
    question: "能否从瓶颈出发说明时间与空间交换？",
    evidence: "基线、复杂度、资源代价、测量结果",
  },
  {
    label: "综合能力",
    question: "遇到不熟悉问题时，能否沟通、迁移并持续修正？",
    evidence: "澄清问题、吸收提示、复盘和诚实边界",
  },
] as const;

export function InterviewFormatMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 780 360"
          role="img"
          aria-label="电话、共享桌面远程和现场三种面试形式，分别强调口头推理、可见的编码过程和面对面协作。"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <text x="390" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">形式会改变证据通道，不改变解决问题的主线</text>
          {formats.map((format, index) => {
            const x = 28 + index * 254;
            return (
              <g key={format.title}>
                <rect x={x} y="58" width="226" height="226" rx="6" fill="var(--bg)" stroke="var(--border)" />
                <circle cx={x + 113} cy="102" r="25" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" />
                <text x={x + 113} y="108" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--accent)">{index + 1}</text>
                <text x={x + 113} y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{format.title}</text>
                <text x={x + 113} y="181" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">主要可见信号</text>
                <text x={x + 113} y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">{format.signal}</text>
                <line x1={x + 32} y1="220" x2={x + 194} y2="220" stroke="var(--border)" />
                <foreignObject x={x + 30} y="230" width="166" height="44">
                  <p className="m-0 text-center text-[10px] leading-4 text-secondary">{format.risk}</p>
                </foreignObject>
              </g>
            );
          })}
          <path d="M140 315 H640" stroke="var(--accent)" strokeWidth="2" />
          <path d="M640 315 l-10 -6 v12 z" fill="var(--accent)" />
          <text x="390" y="340" textAnchor="middle" fontSize="11" fill="var(--text-primary)">澄清问题 → 说出方案 → 编码验证 → 总结边界</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面试形式决定你如何展示过程；准备时要分别演练无画面、共享编辑器和白板环境。
      </figcaption>
    </figure>
  );
}

export function InterviewRoundDiagram() {
  const rounds = [
    ["行为面试", "经历与责任", "真实、具体、可追问"],
    ["技术面试", "知识与解题", "先澄清再验证"],
    ["应聘者提问", "岗位与团队", "双向判断匹配度"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 780 300"
          role="img"
          aria-label="一轮面试通常包含行为面试、技术面试和应聘者提问三个环节，每个环节提供不同证据。"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <text x="390" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">每轮面试的三个环节</text>
          {rounds.map(([title, focus, outcome], index) => {
            const x = 44 + index * 248;
            return (
              <g key={title}>
                <rect x={x} y="72" width="198" height="142" rx="6" fill="var(--bg)" stroke="var(--accent)" />
                <rect x={x} y="72" width="198" height="34" rx="6" fill="var(--accent)" fillOpacity="0.1" />
                <text x={x + 99} y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{index + 1}. {title}</text>
                <text x={x + 99} y="134" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">观察重点</text>
                <text x={x + 99} y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">{focus}</text>
                <text x={x + 99} y="187" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{outcome}</text>
                {index < 2 ? <path d={`M${x + 205} 143 H${x + 239}`} stroke="var(--warning)" strokeWidth="2" /> : null}
              </g>
            );
          })}
          <rect x="144" y="242" width="492" height="34" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <text x="390" y="263" textAnchor="middle" fontSize="11" fill="var(--text-primary)">不要只准备答案：面试官持续观察你如何收集信息、修正假设和验证结果。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三个环节共同回答一个问题：你的能力证据是否可信、可复现，并与岗位匹配。
      </figcaption>
    </figure>
  );
}

export function EvidenceAnswerLab() {
  const [active, setActive] = useState(0);
  const step = evidenceSteps[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="项目证据回答四步">
          {evidenceSteps.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`border px-3 py-2 text-sm font-medium ${active === index ? "border-accent bg-accent/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {index + 1}. {item.label}
            </button>
          ))}
        </div>
        <p className="text-sm font-semibold text-primary">{step.prompt}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="border border-danger/40 bg-danger/5 p-3">
            <p className="mb-1 text-xs font-semibold text-danger">证据不足</p>
            <p className="m-0 text-sm text-secondary">{step.weak}</p>
          </div>
          <div className="border border-success/40 bg-success/5 p-3">
            <p className="mb-1 text-xs font-semibold text-success">可追问证据</p>
            <p className="m-0 text-sm text-secondary">{step.strong}</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        点击四步，把泛泛的项目描述改成含约束、个人动作与验证指标的证据链。
      </figcaption>
    </figure>
  );
}

export function QuestionChecklistLab() {
  const [active, setActive] = useState(0);
  const dimension = dimensions[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="tablist" aria-label="技术面试六类考查维度">
          {dimensions.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`min-h-11 border px-2 py-2 text-xs font-semibold ${active === index ? "border-accent bg-accent/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 border-l-4 border-accent bg-bg p-4">
          <p className="m-0 text-sm font-semibold text-primary">{dimension.question}</p>
          <p className="mb-0 mt-2 text-sm text-secondary"><strong className="text-success">可观察证据：</strong>{dimension.evidence}</p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        六类信号相互补充；刷出正确答案不能替代代码质量、沟通和边界意识。
      </figcaption>
    </figure>
  );
}
