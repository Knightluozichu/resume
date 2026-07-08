/**
 * <FlpGeneratorsDiagram>：生成器的惰性求值与 yield 暂停/恢复。
 *
 * 上半：next() 驱动 yield 逐个产出的状态时间线。
 * 下半：list（立即求值、全进内存）vs generator（惰性、O(1) 内存）对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const STATES = [
  { x: 40, w: 116, label: "gen = squares()", sub: "创建·暂停在起点", color: accent },
  { x: 172, w: 116, label: "next() → 1", sub: "执行到 yield", color: success },
  { x: 304, w: 116, label: "next() → 4", sub: "恢复·再 yield", color: success },
  { x: 436, w: 116, label: "next() → 9", sub: "恢复·再 yield", color: success },
  { x: 568, w: 116, label: "next() → 停", sub: "抛 StopIteration", color: danger },
];

export function FlpGeneratorsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="生成器惰性求值：next驱动yield逐个产出、暂停恢复；list立即求值全进内存而generator仅O(1)内存。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            生成器：yield 让函数可暂停、可恢复
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            惰性求值——按需产出，不预生成全部
          </text>

          {/* 状态时间线 */}
          <text x={48} y={82} fontSize="12" fontWeight="700" fill={secondary}>
            next() 驱动的暂停 / 恢复
          </text>
          {STATES.map((s, i) => (
            <g key={s.label}>
              <rect x={s.x} y={92} width={s.w} height={58} rx="8" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={s.x + s.w / 2} y={116} textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>
                {s.label}
              </text>
              <text x={s.x + s.w / 2} y={136} textAnchor="middle" fontSize="10" fill={secondary}>
                {s.sub}
              </text>
              {i < STATES.length - 1 && (
                <line x1={s.x + s.w + 2} y1={121} x2={STATES[i + 1].x - 4} y2={121} stroke={secondary} strokeWidth="1.4" markerEnd="url(#flp-gen-arrow)" />
              )}
            </g>
          ))}

          {/* 代码盒 */}
          <rect x={120} y={168} width={480} height={56} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={360} y={190} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>
            def squares():  n = 0
          </text>
          <text x={360} y={210} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>
            while True:  n += 1;  yield n * n   # 可表达无限序列
          </text>

          {/* list vs generator 内存对比 */}
          <text x={48} y={252} fontSize="12" fontWeight="700" fill={secondary}>
            内存对比
          </text>
          <rect x={48} y={264} width={300} height={86} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={198} y={288} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            list：立即求值
          </text>
          <text x={64} y={312} fontSize="11" fill={primary}>[x*x for x in range(10**8)]</text>
          <text x={64} y={332} fontSize="11" fill={secondary}>一次性生成全部，O(n) 内存</text>

          <rect x={372} y={264} width={300} height={86} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={522} y={288} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            generator：惰性求值
          </text>
          <text x={388} y={312} fontSize="11" fill={primary}>(x*x for x in range(10**8))</text>
          <text x={388} y={332} fontSize="11" fill={secondary}>逐个产出，O(1) 内存</text>

          <defs>
            <marker id="flp-gen-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={362} x2={VIEW_W - 32} y2={362} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={382} textAnchor="middle" fontSize="11" fill={secondary}>
            yield 把函数变成生成器；只能前向迭代一次，不支持随机索引——这是惰性的代价
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生成器的暂停/恢复机制与惰性内存优势。
      </figcaption>
    </figure>
  );
}
