/**
 * <CfpImmutableDataDiagram>：可变 vs 不可变数据建模。
 *
 * 上半：可变 class（原地修改）vs 不可变 record（with 创建副本）。
 * 下半：with 表达式的工作机制——拷贝并修改。
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

export function CfpImmutableDataDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="可变 vs 不可变数据。上半展示可变 class 原地修改属性 vs 不可变 record 用 with 表达式创建副本。下半展示 with 的工作机制：拷贝原数据再修改指定字段。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            可变 class vs 不可变 record
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            原地修改 vs 创建副本 · with 表达式 · 值语义
          </text>

          {/* 上半：可变 vs 不可变 */}
          {/* 可变 class（左） */}
          <rect x={40} y={74} width={305} height={130} rx="8" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={192} y={94} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>可变 class：原地修改</text>
          <text x={54} y={114} fontSize="11" fill={primary} fontFamily="monospace">{"class Person"}</text>
          <text x={54} y={130} fontSize="11" fill={primary} fontFamily="monospace">{"{"}</text>
          <text x={54} y={146} fontSize="11" fill={primary} fontFamily="monospace">{"  public string Name {get;set;}"}</text>
          <text x={54} y={162} fontSize="11" fill={primary} fontFamily="monospace">{"}"}</text>
          <line x1={54} y1={170} x2={330} y2={170} stroke={danger} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={54} y={186} fontSize="11" fill={danger} fontFamily="monospace">{"p.Name = \"Bob\";"}</text>
          <text x={54} y={200} fontSize="10" fill={secondary}>原对象被修改 · 共享引用有风险</text>

          {/* 不可变 record（右） */}
          <rect x={375} y={74} width={305} height={130} rx="8" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={527} y={94} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>不可变 record：创建副本</text>
          <text x={389} y={114} fontSize="11" fill={primary} fontFamily="monospace">{"record Person"}</text>
          <text x={389} y={130} fontSize="11" fill={primary} fontFamily="monospace">{"{"}</text>
          <text x={389} y={146} fontSize="11" fill={primary} fontFamily="monospace">{"  public string Name {get;init;}"}</text>
          <text x={389} y={162} fontSize="11" fill={primary} fontFamily="monospace">{"}"}</text>
          <line x1={389} y1={170} x2={665} y2={170} stroke={success} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x={389} y={186} fontSize="11" fill={success} fontFamily="monospace">{"var p2 = p with { Name = \"Bob\" };"}</text>
          <text x={389} y={200} fontSize="10" fill={secondary}>原对象不变 · 新对象是副本</text>

          {/* 分隔线 */}
          <line x1={32} y1={226} x2={VIEW_W - 32} y2={226} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：with 表达式机制 */}
          <text x={VIEW_W / 2} y={252} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            with 表达式：拷贝并修改
          </text>

          {/* 原始 record */}
          <rect x={40} y={268} width={180} height={80} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={130} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>原始 record</text>
          <text x={54} y={310} fontSize="11" fill={primary} fontFamily="monospace">{"Person {"}</text>
          <text x={54} y={326} fontSize="11" fill={primary} fontFamily="monospace">{"  Name = \"Alice\","}</text>
          <text x={54} y={342} fontSize="11" fill={primary} fontFamily="monospace">{"  Age = 30 }"}</text>

          {/* 箭头 + with */}
          <line x1={225} y1={308} x2={270} y2={308} stroke={accent} strokeWidth="1.4" markerEnd="url(#cfp-im-arrow)" />
          <text x={248} y={298} textAnchor="middle" fontSize="10" fill={accent}>with</text>
          <text x={248} y={322} textAnchor="middle" fontSize="9" fill={secondary}>Age=31</text>

          {/* 新 record */}
          <rect x={270} y={268} width={180} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={360} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>新 record（副本）</text>
          <text x={284} y={310} fontSize="11" fill={primary} fontFamily="monospace">{"Person {"}</text>
          <text x={284} y={326} fontSize="11" fill={success} fontFamily="monospace">{"  Name = \"Alice\","}</text>
          <text x={284} y={342} fontSize="11" fill={warning} fontFamily="monospace">{"  Age = 31 }"}</text>

          {/* 优势列表 */}
          <rect x={480} y={268} width={200} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" />
          <text x={580} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>不可变的优势</text>
          <text x={494} y={306} fontSize="10" fill={secondary}>线程安全：无共享状态竞争</text>
          <text x={494} y={320} fontSize="10" fill={secondary}>可缓存：相同输入相同对象</text>
          <text x={494} y={334} fontSize="10" fill={secondary}>可推演：创建后永不变化</text>
          <text x={494} y={348} fontSize="10" fill={secondary}>值相等：== 比较内容非引用</text>

          {/* 底部总结 */}
          <line x1={32} y1={372} x2={VIEW_W - 32} y2={372} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            record 默认不可变 · with 创建副本而非修改 · init-only 属性 · 值语义相等
          </text>
          <text x={VIEW_W / 2} y={406} textAnchor="middle" fontSize="10" fill={secondary}>
            不可变数据是函数式编程的安全基石 · 消除共享状态导致的并发 bug
          </text>

          <defs>
            <marker id="cfp-im-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可变 class 原地修改属性，不可变 record 用 with 表达式创建修改后的副本。
      </figcaption>
    </figure>
  );
}
