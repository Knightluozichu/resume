/**
 * <CtrConcurrencyTestDiagram>：死锁循环与原子内存序阶梯。
 *
 * 左面板：死锁循环（线程 A 持 M1 等 M2、线程 B 持 M2 等 M1）及四条件。
 * 右面板：内存序强度阶梯（relaxed < release/acquire < seq_cst）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const LEFT_X = 32;
const LEFT_W = 348;
const RIGHT_X = 396;
const RIGHT_W = 292;

export function CtrConcurrencyTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="死锁循环与内存序阶梯。左面板死锁循环：线程 A 持有 M1 等待 M2、线程 B 持有 M2 等待 M1，形成循环等待，下方列死锁四条件（互斥/占有并等待/不可剥夺/循环等待）。右面板内存序强度阶梯：relaxed 最弱只保原子、release/acquire 配对做发布消费同步、seq_cst 最强全局一致为默认。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ctr-cyc-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
            <marker id="ctr-cyc-up" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            死锁循环与原子内存序
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            破环靠加锁顺序/scoped_lock · 内存序按需放松
          </text>

          {/* 左面板：死锁循环 */}
          <g>
            <rect x={LEFT_X} y={80} width={LEFT_W} height={340} rx="10" fill={elevated} stroke={border} strokeWidth="1.4" />
            <rect x={LEFT_X} y={80} width={LEFT_W} height={32} rx="10" fill="var(--danger)" fillOpacity="0.14" />
            <rect x={LEFT_X} y={102} width={LEFT_W} height={10} fill="var(--danger)" fillOpacity="0.14" />
            <text x={LEFT_X + LEFT_W / 2} y={101} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
              死锁循环
            </text>

            {/* 线程 A */}
            <rect x={LEFT_X + 24} y={132} width={120} height={68} rx="8" fill={elevated} stroke="var(--accent)" strokeWidth="1.6" />
            <text x={LEFT_X + 84} y={154} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--accent)">线程 A</text>
            <text x={LEFT_X + 84} y={174} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">持 M1</text>
            <text x={LEFT_X + 84} y={190} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">等 M2</text>

            {/* 线程 B */}
            <rect x={LEFT_X + 204} y={132} width={120} height={68} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.6" />
            <text x={LEFT_X + 264} y={154} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--success)">线程 B</text>
            <text x={LEFT_X + 264} y={174} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">持 M2</text>
            <text x={LEFT_X + 264} y={190} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">等 M1</text>

            {/* 循环箭头 */}
            <line x1={LEFT_X + 144} y1={156} x2={LEFT_X + 204} y2={156} stroke="var(--danger)" strokeWidth="2" markerEnd="url(#ctr-cyc-red)" />
            <line x1={LEFT_X + 204} y1={176} x2={LEFT_X + 144} y2={176} stroke="var(--danger)" strokeWidth="2" markerEnd="url(#ctr-cyc-red)" />

            {/* 四条件 */}
            <text x={LEFT_X + LEFT_W / 2} y={232} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>死锁四必要条件</text>
            {["1. 互斥：资源独占", "2. 占有并等待", "3. 不可剥夺", "4. 循环等待"].map((c, i) => (
              <text key={c} x={LEFT_X + 28} y={256 + i * 24} textAnchor="start" fontSize="11.5" fill={secondary}>{c}</text>
            ))}
            <text x={LEFT_X + LEFT_W / 2} y={372} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
              破任一条件即可 · scoped_lock 原子多锁
            </text>
          </g>

          {/* 右面板：内存序阶梯 */}
          <g>
            <rect x={RIGHT_X} y={80} width={RIGHT_W} height={340} rx="10" fill={elevated} stroke={border} strokeWidth="1.4" />
            <rect x={RIGHT_X} y={80} width={RIGHT_W} height={32} rx="10" fill="var(--accent)" fillOpacity="0.14" />
            <rect x={RIGHT_X} y={102} width={RIGHT_W} height={10} fill="var(--accent)" fillOpacity="0.14" />
            <text x={RIGHT_X + RIGHT_W / 2} y={101} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
              内存序强度阶梯
            </text>

            {/* seq_cst 最强（顶） */}
            <rect x={RIGHT_X + 18} y={132} width={RIGHT_W - 36} height={68} rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.6" />
            <text x={RIGHT_X + RIGHT_W / 2} y={156} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--accent)" fontFamily="monospace">seq_cst</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={176} textAnchor="middle" fontSize="11" fill={primary}>全局一致·最强</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={192} textAnchor="middle" fontSize="11" fill={secondary}>默认值·最慢</text>

            <line x1={RIGHT_X + RIGHT_W / 2} y1={208} x2={RIGHT_X + RIGHT_W / 2} y2={222} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ctr-cyc-up)" />

            {/* release/acquire 中 */}
            <rect x={RIGHT_X + 18} y={228} width={RIGHT_W - 36} height={68} rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.6" />
            <text x={RIGHT_X + RIGHT_W / 2} y={252} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--success)" fontFamily="monospace">release/acquire</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={272} textAnchor="middle" fontSize="11" fill={primary}>发布-消费同步</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={288} textAnchor="middle" fontSize="11" fill={secondary}>happens-before</text>

            <line x1={RIGHT_X + RIGHT_W / 2} y1={304} x2={RIGHT_X + RIGHT_W / 2} y2={318} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ctr-cyc-up)" />

            {/* relaxed 最弱（底） */}
            <rect x={RIGHT_X + 18} y={324} width={RIGHT_W - 36} height={68} rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.6" />
            <text x={RIGHT_X + RIGHT_W / 2} y={348} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--warning)" fontFamily="monospace">relaxed</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={368} textAnchor="middle" fontSize="11" fill={primary}>只保原子·不同步</text>
            <text x={RIGHT_X + RIGHT_W / 2} y={384} textAnchor="middle" fontSize="11" fill={secondary}>仅计数器用</text>
          </g>

          {/* 底部总结 */}
          <line x1={32} y1={442} x2={VIEW_W - 32} y2={442} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={466} textAnchor="middle" fontSize="12" fill={secondary}>
            DCLP 旧 bug 源于无内存模型 · C++11 后 Meyers/call_once 正确
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死锁需满足四条件，scoped_lock 原子多锁破循环等待；内存序从 relaxed 到 seq_cst 逐级增强，按需放松减开销。
      </figcaption>
    </figure>
  );
}
