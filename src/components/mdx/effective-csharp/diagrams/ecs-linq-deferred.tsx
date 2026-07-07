/**
 * <EcsLinqDeferredDiagram>：LINQ 延迟执行（条款 33-36）。
 *
 * 上：查询构造 vs 枚举执行——Where/Select 构造表达式树，foreach 才真正执行
 * 中：延迟执行的双刃——数据源变化会反映到结果（好）/ 重复枚举重复执行（坏）
 * 下：三种「物化」手段 ToList / ToArray / 缓存
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsLinqDeferredDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="LINQ 延迟执行。上：查询构造 Where Select 只构造表达式，foreach 才真正执行；中：延迟执行双刃剑，数据源变化反映到结果但重复枚举重复执行；下：三种物化手段 ToList、ToArray、缓存。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-linq-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            LINQ 延迟执行
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            构造查询不执行 · 枚举时才求值
          </text>

          {/* 上：构造 vs 执行时间线 */}
          <g>
            <rect x={40} y={76} width={300} height={80} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.6" />
            <text x={190} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
              构造（不执行）
            </text>
            <text x={56} y={120} fontSize="11" fontFamily="monospace" fill={primary}>{"var q = src"}</text>
            <text x={56} y={136} fontSize="11" fontFamily="monospace" fill={primary}>{"  .Where(x => x > 0)"}</text>
            <text x={56} y={152} fontSize="11" fontFamily="monospace" fill={primary}>{"  .Select(x => x * 2);"}</text>
          </g>

          <line x1={344} y1={116} x2={376} y2={116} stroke={secondary} strokeWidth="1.6" markerEnd="url(#ecs-linq-arrow)" />
          <text x={360} y={108} textAnchor="middle" fontSize="10" fill={secondary}>延迟</text>

          <g>
            <rect x={380} y={76} width={300} height={80} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
            <text x={530} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              枚举（才执行）
            </text>
            <text x={396} y={120} fontSize="11" fontFamily="monospace" fill={primary}>{"foreach (var x in q)"}</text>
            <text x={396} y={136} fontSize="11" fontFamily="monospace" fill={primary}>{"  Console.WriteLine(x);"}</text>
            <text x={396} y={152} fontSize="11" fill={success}>此时 Where/Select 才跑</text>
          </g>

          {/* 中：双刃剑 */}
          <text x={VIEW_W / 2} y={184} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            延迟执行的双刃剑
          </text>

          <g>
            <rect x={40} y={198} width={316} height={86} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={198} y={220} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
              利：反映最新数据
            </text>
            <text x={56} y={242} fontSize="11" fill={primary}>数据源后续追加元素</text>
            <text x={56} y={260} fontSize="11" fill={primary}>下次枚举自动看到新数据</text>
            <text x={56} y={276} fontSize="11" fill={secondary}>无需手动刷新查询</text>
          </g>

          <g>
            <rect x={364} y={198} width={316} height={86} rx="8" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={522} y={220} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
              弊：重复枚举重复执行
            </text>
            <text x={380} y={242} fontSize="11" fill={primary}>两次 foreach 各跑一遍</text>
            <text x={380} y={260} fontSize="11" fill={primary}>若源是远程/昂贵查询 = 浪费</text>
            <text x={380} y={276} fontSize="11" fill={danger}>Count() 后再 foreach = 两轮</text>
          </g>

          {/* 下：物化手段 */}
          <text x={VIEW_W / 2} y={308} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            物化：一次执行，多次读取
          </text>
          {[
            { label: "ToList()", desc: "立即求值存入 List", color: accent },
            { label: "ToArray()", desc: "立即求值存入数组", color: success },
            { label: "缓存中间结果", desc: "避免重复远程查询", color: warning },
          ].map((m, i) => {
            const bx = 56 + i * 210;
            return (
              <g key={m.label}>
                <rect x={bx} y={322} width={190} height={46} rx="8" fill={m.color} fillOpacity="0.07" stroke={m.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={bx + 95} y={342} textAnchor="middle" fontSize="12" fontWeight="700" fill={m.color} fontFamily="monospace">
                  {m.label}
                </text>
                <text x={bx + 95} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
                  {m.desc}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={396} textAnchor="middle" fontSize="11" fill={secondary}>
            查询变量只是「配方」· 枚举才「下锅」· 需多次读取就先物化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        LINQ 查询在构造时不执行，只在枚举时求值。这让它能反映数据源的最新状态，但重复枚举会重复执行；需要多次读取时用 ToList/ToArray 物化。
      </figcaption>
    </figure>
  );
}
