"use client";

const VIEW_W = 720;
const VIEW_H = 430;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
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
                <text x={x + 74} y="144" textAnchor="middle" fontSize="11" fill={primary}>{stage.detail}</text>
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
          <text x="134" y="290" textAnchor="middle" fontSize="11" fill={secondary}>证明：若结束，答案满足规格</text>

          <rect x="260" y="220" width="200" height="92" rx="7" fill={warning} fillOpacity="0.05" stroke={border} />
          <text x="360" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>排名函数</text>
          <text x="360" y="268" textAnchor="middle" fontSize="11" fill={primary}>非负 · 每步严格下降</text>
          <text x="360" y="290" textAnchor="middle" fontSize="11" fill={secondary}>证明：过程不可能无限继续</text>

          <rect x="486" y="220" width="200" height="92" rx="7" fill={danger} fillOpacity="0.05" stroke={border} />
          <text x="586" y="245" textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>代价模型</text>
          <text x="586" y="268" textAnchor="middle" fontSize="11" fill={primary}>输入规模 · 基本操作</text>
          <text x="586" y="290" textAnchor="middle" fontSize="11" fill={secondary}>量化：最坏、平均或随机期望</text>

          <rect x="34" y="338" width="652" height="60" rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.55" />
          <text x="360" y="362" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>
            反例推翻策略，证明覆盖全部合法输入，测试检查实现是否忠于算法
          </text>
          <text x="360" y="383" textAnchor="middle" fontSize="11" fill={secondary}>
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
