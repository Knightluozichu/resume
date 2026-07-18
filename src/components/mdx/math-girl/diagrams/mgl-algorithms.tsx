"use client";

import { MathGirlOfficialLab } from "./official-lab";

const VIEW_W = 720;
const VIEW_H = 430;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const specificationCases = [
  {
    label: "问题规格",
    fields: [
      ["输入域", "允许哪些实例"],
      ["输出", "必须返回什么"],
      ["前置条件", "调用者保证"],
      ["后置条件", "算法必须保证"],
    ],
  },
  {
    label: "部分正确性",
    fields: [
      ["前提", "算法若终止"],
      ["结论", "输出满足后置条件"],
      ["循环工具", "初始化、保持、退出"],
      ["递归工具", "归纳假设"],
    ],
  },
  {
    label: "终止性",
    fields: [
      ["量", "非负整数排名函数"],
      ["每步", "严格下降"],
      ["下界", "不能无限下降"],
      ["递归", "实例规模必须缩小"],
    ],
  },
  {
    label: "完整正确性",
    fields: [
      ["组成", "部分正确性加终止性"],
      ["边界", "空输入、重复值、极值"],
      ["证据", "证明而非样例通过"],
      ["实现", "仍需测试规格一致性"],
    ],
    alert: "样例测试只能发现错误，不能替代对全部合法输入的正确性证明。",
  },
] as const;

const strategyCases = [
  {
    label: "穷举",
    fields: [
      ["动作", "枚举候选并验证"],
      ["优势", "基准可靠、容易证明"],
      ["代价", "候选数常为指数级"],
      ["改进", "剪枝、对称消除"],
    ],
  },
  {
    label: "分治",
    fields: [
      ["动作", "分解、递归、合并"],
      ["要求", "同类小问题且可组合"],
      ["不要求", "子问题绝对独立"],
      ["分析", "建立并求解递推式"],
    ],
  },
  {
    label: "贪心",
    fields: [
      ["动作", "承诺一个局部选择"],
      ["证明", "交换、割或领先论证"],
      ["反例", "局部最优可能锁死"],
      ["Dijkstra", "只适用非负边权"],
    ],
  },
  {
    label: "动态规划",
    fields: [
      ["状态", "保留未来需要的信息"],
      ["转移", "枚举最后一步"],
      ["顺序", "依赖先算、环需另解"],
      ["优化", "证明最优子结构"],
    ],
    alert: "设计动态规划的核心是状态是否充分、转移是否完备；“有重复计算”不是完整设计。",
  },
] as const;

const analysisCases = [
  {
    label: "规模与模型",
    fields: [
      ["规模n", "输入编码长度或元素数"],
      ["基本操作", "比较、访存或算术"],
      ["单位成本", "必须明确假设"],
      ["空间", "峰值额外存储"],
    ],
  },
  {
    label: "三种量化",
    fields: [
      ["最坏", "同规模实例取最大"],
      ["平均", "对输入分布求平均"],
      ["期望", "固定输入对内部随机求期望"],
      ["注意", "概率空间不同"],
    ],
  },
  {
    label: "渐近阶",
    fields: [
      ["O", "渐近上界"],
      ["Ω", "渐近下界"],
      ["Θ", "上下界同阶"],
      ["用途", "比较增长而非秒数"],
    ],
  },
  {
    label: "下界与保证",
    fields: [
      ["决策树", "叶子数迫使树高"],
      ["排序", "比较模型下Ω(n log n)"],
      ["随机", "写清失败事件与概率"],
      ["交付", "正确性加资源上界"],
    ],
    alert: "复杂度属于算法、输入模型和计算模型三者的组合，不能只给一个脱离条件的 O 记号。",
  },
] as const;

export function MglAlgorithmsDiagram() {
  const stages = [
    { title: "问题规格", detail: "输入、输出、前后条件", color: accent },
    { title: "算法构造", detail: "步骤、状态、选择", color: success },
    { title: "正确性", detail: "不变量、终止性", color: warning },
    { title: "复杂度", detail: "时间、空间、概率", color: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="算法交付链路：先规定输入输出和前后条件，再构造算法，用不变量与排名函数证明正确和终止，最后在明确代价模型下分析最坏、平均或期望复杂度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-algorithm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            从问题到可交付算法
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill={secondary}>
            算法不是代码片段，而是规格、构造、证明与资源保证的组合
          </text>

          {stages.map((stage, index) => {
            const x = 26 + index * 174;
            return (
              <g key={stage.title}>
                <rect x={x} y="88" width="148" height="82" rx="7" fill={stage.color} fillOpacity="0.08" stroke={stage.color} strokeWidth="1.2" />
                <text x={x + 74} y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill={stage.color}>{stage.title}</text>
                <text x={x + 74} y="144" textAnchor="middle" fontSize="10.5" fill={primary}>{stage.detail}</text>
                {index < stages.length - 1 ? (
                  <line x1={x + 151} y1="129" x2={x + 169} y2="129" stroke={secondary} strokeWidth="1.5" markerEnd="url(#mgl-algorithm-arrow)" />
                ) : null}
              </g>
            );
          })}

          <line x1="360" y1="184" x2="360" y2="212" stroke={border} strokeWidth="1.2" markerEnd="url(#mgl-algorithm-arrow)" />

          <rect x="34" y="220" width="200" height="92" rx="7" fill={accent} fillOpacity="0.05" stroke={border} />
          <text x="134" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>循环不变量</text>
          <text x="134" y="268" textAnchor="middle" fontSize="11" fill={primary}>初始化 · 保持 · 退出</text>
          <text x="134" y="290" textAnchor="middle" fontSize="10.5" fill={secondary}>证明：若结束，答案满足规格</text>

          <rect x="260" y="220" width="200" height="92" rx="7" fill={warning} fillOpacity="0.05" stroke={border} />
          <text x="360" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>排名函数</text>
          <text x="360" y="268" textAnchor="middle" fontSize="11" fill={primary}>非负 · 每步严格下降</text>
          <text x="360" y="290" textAnchor="middle" fontSize="10.5" fill={secondary}>证明：过程不可能无限继续</text>

          <rect x="486" y="220" width="200" height="92" rx="7" fill={danger} fillOpacity="0.05" stroke={border} />
          <text x="586" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>代价模型</text>
          <text x="586" y="268" textAnchor="middle" fontSize="11" fill={primary}>输入规模 · 基本操作</text>
          <text x="586" y="290" textAnchor="middle" fontSize="10.5" fill={secondary}>量化：最坏、平均或随机期望</text>

          <rect x="34" y="338" width="652" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.55" />
          <text x="360" y="362" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>
            反例推翻策略，证明覆盖全部合法输入，测试检查实现是否忠于算法
          </text>
          <text x="360" y="383" textAnchor="middle" fontSize="10.5" fill={secondary}>
            正确性与效率是两条独立验收线：快但错误、正确但不可承受，都不是完成
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法从精确规格开始，经构造、正确性与终止性证明，最后在明确模型下给出资源边界。
      </figcaption>
    </figure>
  );
}

export function MglAlgorithmSpecificationLab() {
  return (
    <MathGirlOfficialLab
      cases={specificationCases}
      caption="部分正确性回答“结束时是否对”，排名函数回答“是否一定结束”；两者合起来才是完整正确性。"
      tone="cyan"
    />
  );
}

export function MglAlgorithmStrategyLab() {
  return (
    <MathGirlOfficialLab
      cases={strategyCases}
      caption="穷举、分治、贪心和动态规划是不同构造策略；选择依据来自问题结构与可证明性。"
      tone="amber"
    />
  );
}

export function MglAlgorithmAnalysisLab() {
  return (
    <MathGirlOfficialLab
      cases={analysisCases}
      caption="先固定输入规模和代价模型，再区分最坏、输入平均与算法内部随机期望，复杂度才有明确含义。"
      tone="violet"
    />
  );
}
