/**
 * <GiaArraysSlicesDiagram>：Go 数组与切片的内存模型与关系。
 *
 * 展示数组固定长度值类型、切片的 ptr+len+cap 三元组及扩容机制。
 * Server Component，viewBox 720×400，CSS 变量配色。
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function GiaArraysSlicesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Go 数组与切片：数组是固定长度值类型，切片是 ptr+len+cap 引用底层数组，扩容时分配新数组。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            数组 vs 切片：值类型 vs 引用类型
          </text>

          {/* 数组 */}
          <rect x={36} y={50} width={300} height={120} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={186} y={72} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>数组 [5]int（值类型）</text>
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <rect x={60 + i * 50} y={86} width={46} height={36} rx="4" fill={elevated} stroke={border} />
                <text x={83 + i * 50} y={108} textAnchor="middle" fontSize="11" fill={primary}>{i * 10}</text>
              </g>
            ))}
          </g>
          <text x={186} y={142} textAnchor="middle" fontSize="10" fill={secondary}>固定长度 · 赋值/传参复制全部</text>
          <text x={186} y={158} textAnchor="middle" fontSize="10" fill={warning}>长度是类型的一部分：[5]int ≠ [6]int</text>

          {/* 切片 */}
          <rect x={36} y={190} width={648} height={120} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={360} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>切片 []int（引用类型：ptr + len + cap）</text>
          {/* 切片头 */}
          <rect x={60} y={226} width={80} height={30} rx="4" fill={success} fillOpacity="0.15" stroke={success} />
          <text x={100} y={245} textAnchor="middle" fontSize="10" fill={success}>ptr</text>
          <rect x={140} y={226} width={60} height={30} rx="4" fill={success} fillOpacity="0.15" stroke={success} />
          <text x={170} y={245} textAnchor="middle" fontSize="10" fill={success}>len=3</text>
          <rect x={200} y={226} width={60} height={30} rx="4" fill={success} fillOpacity="0.15" stroke={success} />
          <text x={230} y={245} textAnchor="middle" fontSize="10" fill={success}>cap=5</text>
          {/* 指向底层数组 */}
          <line x1={100} y1={256} x2={300} y2={280} stroke={success} strokeWidth="1.2" markerEnd="url(#gia-as-arrow)" />
          {/* 底层数组 */}
          <text x={300} y={276} textAnchor="middle" fontSize="9" fill={secondary}>底层数组</text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={282 + i * 56} y={282} width={50} height={20} rx="3" fill={i < 3 ? success : border} fillOpacity={i < 3 ? "0.2" : "0.4"} stroke={border} />
              <text x={307 + i * 56} y={296} textAnchor="middle" fontSize="9" fill={i < 3 ? primary : secondary}>{i < 3 ? `${i * 10}` : "?"}</text>
            </g>
          ))}
          <text x={360} y={318} textAnchor="middle" fontSize="10" fill={secondary}>ptr 指向底层数组 · len 可见元素数 · cap 底层数组从 ptr 起的容量</text>

          {/* 扩容 */}
          <line x1={36} y1={326} x2={684} y2={326} stroke={border} strokeWidth="1" />
          <text x={360} y={348} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>append 扩容机制</text>
          <text x={180} y={372} textAnchor="middle" fontSize="10" fill={accent}>cap &lt; 256: 翻倍扩容</text>
          <text x={540} y={372} textAnchor="middle" fontSize="10" fill={accent}>cap &gt;= 256: 约 1.25 倍增长</text>
          <text x={360} y={392} textAnchor="middle" fontSize="10" fill={danger}>扩容分配新底层数组，原切片 ptr 不变但新切片指向新数组——注意 append 返回值</text>

          <defs>
            <marker id="gia-as-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数组是固定长度值类型；切片是 ptr+len+cap 三元组引用底层数组，append 超容时重新分配。
      </figcaption>
    </figure>
  );
}
