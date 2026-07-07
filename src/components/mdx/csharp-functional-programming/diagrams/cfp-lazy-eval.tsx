/**
 * <CfpLazyEvalDiagram>：延迟求值 vs 立即求值。
 *
 * 上半：立即求值（Eager）——所有步骤一次性执行。
 * 下半：延迟求值（Lazy）——构建管道时不执行，迭代时按需计算。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CfpLazyEvalDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="延迟求值 vs 立即求值。上半展示立即求值：Where和Select一次性执行生成中间集合。下半展示延迟求值：构建管道时不执行，迭代时按需流水线计算。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            延迟求值（Lazy Evaluation）
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            迭代器 · yield · 按需计算 · 管道融合
          </text>

          {/* 上半：立即求值 */}
          <rect x={40} y={72} width={640} height={130} rx="8" fill={danger} fillOpacity="0.03" stroke={danger} strokeWidth="1.2" />
          <text x={360} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>立即求值（Eager）：每步生成中间集合</text>

          {/* 数据流 */}
          <rect x={60} y={104} width={100} height={30} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={110} y={124} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">{"[1,2,3,4,5]"}</text>

          <line x1={165} y1={119} x2={185} y2={119} stroke={danger} strokeWidth="1.2" markerEnd="url(#cfp-le-arrow-r)" />

          <rect x={185} y={104} width={100} height={30} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" />
          <text x={235} y={124} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">{"Where >2"}</text>
          <text x={235} y={148} textAnchor="middle" fontSize="9" fill={secondary}>立即执行</text>

          <rect x={300} y={104} width={90} height={30} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={345} y={124} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">{"[3,4,5]"}</text>
          <text x={345} y={148} textAnchor="middle" fontSize="9" fill={secondary}>中间集合</text>

          <line x1={395} y1={119} x2={415} y2={119} stroke={danger} strokeWidth="1.2" markerEnd="url(#cfp-le-arrow-r)" />

          <rect x={415} y={104} width={100} height={30} rx="4" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1" />
          <text x={465} y={124} textAnchor="middle" fontSize="11" fill={danger} fontFamily="monospace">{"Select *2"}</text>
          <text x={465} y={148} textAnchor="middle" fontSize="9" fill={secondary}>立即执行</text>

          <rect x={525} y={104} width={90} height={30} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={570} y={124} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">{"[6,8,10]"}</text>
          <text x={570} y={148} textAnchor="middle" fontSize="9" fill={secondary}>中间集合</text>

          <text x={360} y={180} textAnchor="middle" fontSize="10" fill={danger}>两步执行 · 两个中间集合 · 全量计算</text>

          {/* 分隔线 */}
          <line x1={32} y1={222} x2={VIEW_W - 32} y2={222} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：延迟求值 */}
          <rect x={40} y={232} width={640} height={130} rx="8" fill={success} fillOpacity="0.03" stroke={success} strokeWidth="1.2" />
          <text x={360} y={252} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>延迟求值（Lazy）：管道融合，按需计算</text>

          {/* 构建阶段 */}
          <text x={70} y={272} fontSize="11" fontWeight="600" fill={secondary}>构建管道：</text>
          <rect x={150} y={260} width={80} height={24} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={190} y={276} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"Where"}</text>
          <text x={234} y={276} fontSize="10" fill={secondary}>+</text>
          <rect x={244} y={260} width={80} height={24} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={284} y={276} textAnchor="middle" fontSize="10" fill={success} fontFamily="monospace">{"Select"}</text>
          <text x={330} y={276} fontSize="10" fill={secondary}>→ 返回 IEnumerable（不执行）</text>

          {/* 迭代阶段 */}
          <text x={70} y={306} fontSize="11" fontWeight="600" fill={accent}>迭代时：</text>

          <text x={70} y={328} fontSize="10" fill={primary} fontFamily="monospace">取 1 → Where: 不满足 → 取 2 → Where: 不满足 → 取 3 → Where: 满足 → Select: 6 → 产出 6</text>
          <text x={70} y={344} fontSize="10" fill={primary} fontFamily="monospace">取 4 → Where: 满足 → Select: 8 → 产出 8 → 取 5 → Where: 满足 → Select: 10 → 产出 10</text>

          <text x={360} y={360} textAnchor="middle" fontSize="10" fill={success}>一次迭代 · 无中间集合 · 按需计算 · 可处理无限序列</text>

          {/* 底部总结 */}
          <line x1={32} y1={380} x2={VIEW_W - 32} y2={380} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            yield return 生成迭代器 · LINQ 默认延迟 · ToList/ToArray 触发执行
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="10" fill={secondary}>
            延迟 = 构建配方 · 迭代 = 执行配方 · 无中间集合 · 支持无限流
          </text>

          <defs>
            <marker id="cfp-le-arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="2" orient="auto">
              <path d="M0 0 L5 2 L0 4 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        立即求值每步生成中间集合，延迟求值管道融合按需计算。
      </figcaption>
    </figure>
  );
}
