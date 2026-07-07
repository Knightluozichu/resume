/**
 * <CtrMemoryTestDiagram>：智能指针关系与循环引用修复。
 *
 * 上半部：三种智能指针的 ownership 语义（unique 独占 / shared 计数 / weak 弱引用）。
 * 下半部：shared_ptr 循环引用泄漏 → weak_ptr 打破环的修复对照。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CARD_W = 180;
const CARD_H = 96;
const CARD_Y = 84;
const cardX = (i: number) => 48 + i * (CARD_W + 28);

interface PtrCard {
  name: string;
  color: string;
  trait: string;
  detail: string;
}

const CARDS: readonly PtrCard[] = [
  { name: "unique_ptr", color: accent, trait: "独占所有权", detail: "不可拷贝·可移动·零开销" },
  { name: "shared_ptr", color: success, trait: "共享·引用计数", detail: "use_count 归零才释放" },
  { name: "weak_ptr", color: warning, trait: "弱引用·不增计数", detail: "lock() 提升后访问" },
];

const NODE_W = 92;
const NODE_H = 60;

export function CtrMemoryTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能指针关系与循环引用修复。上半三种指针：unique_ptr 独占、shared_ptr 引用计数、weak_ptr 弱引用不增计数。下半左为循环引用泄漏（A 与 B 互持 shared_ptr 形成环，红叉标记泄漏），下半右为 weak_ptr 修复（B 改持 weak_ptr 打破环，绿勾标记已修复）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            智能指针与循环引用
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            独占 · 共享计数 · 弱引用打破环
          </text>

          {/* 上半：三种指针卡片 */}
          {CARDS.map((c, i) => {
            const x = cardX(i);
            return (
              <g key={c.name}>
                <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="10" fill={elevated} stroke={c.color} strokeWidth="1.6" strokeOpacity="0.6" />
                <rect x={x} y={CARD_Y} width={CARD_W} height={30} rx="10" fill={c.color} fillOpacity="0.14" />
                <rect x={x} y={CARD_Y + 16} width={CARD_W} height={14} fill={c.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={CARD_Y + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill={c.color} fontFamily="monospace">
                  {c.name}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 50} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
                  {c.trait}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 70} textAnchor="middle" fontSize="11" fill={secondary}>
                  {c.detail}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 84} textAnchor="middle" fontSize="10" fill={secondary} fontFamily="monospace">
                  {i === 0 ? "delete 1 次" : i === 1 ? "count→0 释放" : "观察不拥有"}
                </text>
              </g>
            );
          })}

          {/* 分隔线 */}
          <line x1={32} y1={216} x2={VIEW_W - 32} y2={216} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={240} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            循环引用泄漏与 weak_ptr 修复
          </text>

          {/* 下半左：循环引用泄漏 */}
          <g>
            <text x={170} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
              泄漏：互持 shared_ptr
            </text>
            {/* A 节点 */}
            <rect x={70} y={286} width={NODE_W} height={NODE_H} rx="8" fill={elevated} stroke={danger} strokeWidth="1.6" />
            <text x={116} y={312} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">A</text>
            <text x={116} y={332} textAnchor="middle" fontSize="10" fill={secondary}>shared→B</text>
            {/* B 节点 */}
            <rect x={180} y={286} width={NODE_W} height={NODE_H} rx="8" fill={elevated} stroke={danger} strokeWidth="1.6" />
            <text x={226} y={312} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">B</text>
            <text x={226} y={332} textAnchor="middle" fontSize="10" fill={secondary}>shared→A</text>
            {/* 双向箭头 */}
            <line x1={162} y1={306} x2={180} y2={306} stroke={danger} strokeWidth="2" markerEnd="url(#ctr-mem-red)" />
            <line x1={180} y1={326} x2={162} y2={326} stroke={danger} strokeWidth="2" markerEnd="url(#ctr-mem-redl)" />
            {/* 泄漏标记 */}
            <text x={170} y={376} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>永不析构 · 内存泄漏</text>
          </g>

          {/* 下半右：weak_ptr 修复 */}
          <g>
            <text x={540} y={268} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
              修复：一端改 weak_ptr
            </text>
            {/* A 节点 */}
            <rect x={440} y={286} width={NODE_W} height={NODE_H} rx="8" fill={elevated} stroke={success} strokeWidth="1.6" />
            <text x={486} y={312} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">A</text>
            <text x={486} y={332} textAnchor="middle" fontSize="10" fill={secondary}>shared→B</text>
            {/* B 节点 */}
            <rect x={550} y={286} width={NODE_W} height={NODE_H} rx="8" fill={elevated} stroke={success} strokeWidth="1.6" />
            <text x={596} y={312} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">B</text>
            <text x={596} y={332} textAnchor="middle" fontSize="10" fill={secondary}>weak→A</text>
            {/* 实线 + 虚线 */}
            <line x1={532} y1={306} x2={550} y2={306} stroke={success} strokeWidth="2" markerEnd="url(#ctr-mem-green)" />
            <line x1={550} y1={326} x2={532} y2={326} stroke={success} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#ctr-mem-greenl)" />
            <text x={540} y={376} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>环断开 · 正常释放</text>
          </g>

          <defs>
            <marker id="ctr-mem-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
            <marker id="ctr-mem-redl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={danger} />
            </marker>
            <marker id="ctr-mem-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
            <marker id="ctr-mem-greenl" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={466} x2={VIEW_W - 32} y2={466} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={490} textAnchor="middle" fontSize="12" fill={secondary}>
            默认首选 unique_ptr · 共享用 shared_ptr · 破环/观察用 weak_ptr
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种智能指针：unique_ptr 独占零开销、shared_ptr 引用计数共享、weak_ptr 弱引用打破循环引用。
      </figcaption>
    </figure>
  );
}
