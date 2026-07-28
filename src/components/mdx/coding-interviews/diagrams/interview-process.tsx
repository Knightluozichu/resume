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
