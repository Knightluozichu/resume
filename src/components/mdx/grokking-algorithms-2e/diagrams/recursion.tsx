"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const baseCaseCases = [
  {
    label: "countdown(3)",
    fields: [
      ["当前参数", "number=3"],
      ["基线判断", "3不等于0"],
      ["本层动作", "输出3"],
      ["递归调用", "countdown(2)"],
    ],
  },
  {
    label: "countdown(2)",
    fields: [
      ["当前参数", "number=2"],
      ["基线判断", "2不等于0"],
      ["本层动作", "输出2"],
      ["递归调用", "countdown(1)"],
    ],
  },
  {
    label: "countdown(1)",
    fields: [
      ["当前参数", "number=1"],
      ["基线判断", "1不等于0"],
      ["本层动作", "输出1"],
      ["递归调用", "countdown(0)"],
    ],
  },
  {
    label: "countdown(0)",
    fields: [
      ["当前参数", "number=0"],
      ["基线判断", "命中"],
      ["本层动作", "输出完成并返回"],
      ["后续调用", "无"],
    ],
    alert: "正确性不仅需要基线条件存在，还需要每次递归调用都严格向它靠近。",
  },
] as const;

const choiceCases = [
  {
    label: "递归",
    fields: [
      ["状态位置", "隐含在调用栈帧中"],
      ["适合", "树、嵌套结构、自相似定义"],
      ["优势", "代码贴近问题结构"],
      ["风险", "深度过大会耗尽调用栈"],
    ],
  },
  {
    label: "循环",
    fields: [
      ["状态位置", "局部变量显式更新"],
      ["适合", "单方向计数和简单重复"],
      ["优势", "通常没有逐层调用开销"],
      ["风险", "复杂回溯状态可能难表达"],
    ],
  },
  {
    label: "显式栈",
    fields: [
      ["状态位置", "程序管理的容器"],
      ["适合", "深层遍历、需暂停或恢复"],
      ["优势", "容量和帧内容可控制"],
      ["风险", "需要自己写压栈与弹栈逻辑"],
    ],
  },
  {
    label: "深输入",
    fields: [
      ["先测", "最大深度和运行时限制"],
      ["再选", "循环或显式栈"],
      ["不要假设", "Python会自动优化尾递归"],
      ["验证", "边界测试与深度压力测试"],
    ],
    alert: "递归与循环常有相同时间量级，但空间上可能分别是O(depth)与O(1)。",
  },
] as const;

export function RecursionSearchDiagram() {
  const boxes = [
    { label: "旧行李箱", note: "取出盒A", x: 40, y: 102, tone: accent },
    { label: "盒A", note: "取出盒B", x: 220, y: 102, tone: accent },
    { label: "盒B", note: "取出盒C", x: 400, y: 102, tone: accent },
    { label: "盒C", note: "找到钥匙", x: 580, y: 102, tone: success },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-label="从旧行李箱开始，依次打开盒A、盒B、盒C，最后在最小问题中找到钥匙，再沿调用链返回。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="recursion-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
            <marker id="return-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={success} />
            </marker>
          </defs>
          <text x="380" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            “在盒中找钥匙”的递归结构
          </text>
          <text x="380" y="54" textAnchor="middle" fontSize="10.5" fill={secondary}>
            每层只解决一步：检查当前盒，并把更小的同类问题交给下一次调用
          </text>

          {boxes.slice(0, -1).map((box, index) => (
            <line
              key={box.label}
              x1={box.x + 120}
              y1="139"
              x2={boxes[index + 1].x - 10}
              y2="139"
              stroke={accent}
              strokeWidth="1.6"
              markerEnd="url(#recursion-arrow)"
            />
          ))}
          {boxes.map((box, index) => (
            <g key={box.label}>
              <rect x={box.x} y={box.y} width="130" height="74" rx="4" fill={box.tone} fillOpacity="0.1" stroke={box.tone} />
              <text x={box.x + 65} y={box.y + 28} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{box.label}</text>
              <text x={box.x + 65} y={box.y + 50} textAnchor="middle" fontSize="10" fill={secondary}>{box.note}</text>
              <text x={box.x + 65} y={box.y + 67} textAnchor="middle" fontSize="9" fill={index === boxes.length - 1 ? success : accent}>
                {index === boxes.length - 1 ? "基线条件" : "递归条件"}
              </text>
            </g>
          ))}

          <path d="M645 204 C645 292, 115 292, 115 204" fill="none" stroke={success} strokeWidth="1.7" strokeDasharray="6 4" markerEnd="url(#return-arrow)" />
          <text x="380" y="273" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>返回阶段：钥匙结果沿尚未完成的调用逐层传回</text>
          <rect x="150" y="304" width="460" height="34" rx="4" fill="var(--bg)" stroke={border} />
          <text x="380" y="325" textAnchor="middle" fontSize="10.5" fill={primary}>
            终止证明 = 存在可直接回答的基线条件 + 每次调用都缩小未解决问题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        递归不是“神奇地得到答案”，而是把同类小问题排队，等最小问题返回后再逐层完成。
      </figcaption>
    </figure>
  );
}

export function BaseAndRecursiveCaseLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={baseCaseCases}
      caption="countdown(3)的四层调用展示递归条件怎样单调靠近基线条件。"
      tone="cyan"
    />
  );
}

export function CallStackFramesDiagram() {
  const frames = [
    { title: "greet(name='Maggie')", detail: "暂停点：等待greet2返回", y: 240, tone: accent },
    { title: "greet2(name='Maggie')", detail: "暂停点：等待bye返回", y: 168, tone: warning },
    { title: "bye(name='Maggie')", detail: "栈顶：输出后立即返回", y: 96, tone: success },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="greet调用greet2，greet2再调用bye。三个栈帧由下向上压入，每帧分别保存参数name和返回位置，随后从bye开始后进先出地弹出。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>函数调用栈：后进先出</text>
          <text x="380" y="52" textAnchor="middle" fontSize="10.5" fill={secondary}>每次调用创建独立栈帧；当前调用返回后，上一帧才从暂停点继续</text>

          <rect x="160" y="76" width="440" height="250" fill="var(--bg)" stroke={border} />
          {frames.map((frame, index) => (
            <g key={frame.title}>
              <rect x="185" y={frame.y} width="390" height="58" rx="4" fill={frame.tone} fillOpacity="0.1" stroke={frame.tone} />
              <text x="205" y={frame.y + 23} fontSize="11.5" fontWeight="700" fill={primary}>{frame.title}</text>
              <text x="205" y={frame.y + 43} fontSize="9.5" fill={secondary}>{frame.detail}</text>
              <text x="552" y={frame.y + 33} textAnchor="end" fontSize="9.5" fill={frame.tone}>{index === frames.length - 1 ? "最先弹出" : "等待"}</text>
            </g>
          ))}
          <line x1="625" y1="278" x2="625" y2="108" stroke={accent} strokeWidth="1.5" />
          <path d="M619 116 L625 106 L631 116" fill="none" stroke={accent} strokeWidth="1.5" />
          <text x="647" y="198" fontSize="10" fill={accent} transform="rotate(-90 647 198)">压栈方向</text>
          <line x1="688" y1="108" x2="688" y2="278" stroke={success} strokeWidth="1.5" />
          <path d="M682 270 L688 280 L694 270" fill="none" stroke={success} strokeWidth="1.5" />
          <text x="710" y="198" fontSize="10" fill={success} transform="rotate(90 710 198)">弹栈方向</text>
          <rect x="160" y="344" width="440" height="27" rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeOpacity="0.5" />
          <text x="380" y="362" textAnchor="middle" fontSize="10" fill={primary}>递归越深，未完成的栈帧越多；每帧都占用有限栈空间。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不同栈帧可以拥有同名局部变量；它们互不覆盖，因为每次函数调用都有独立上下文。
      </figcaption>
    </figure>
  );
}

export function RecursionChoiceLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={choiceCases}
      caption="选择表达方式时同时比较问题结构、状态存放位置、最大深度和运行时限制。"
      tone="violet"
    />
  );
}
