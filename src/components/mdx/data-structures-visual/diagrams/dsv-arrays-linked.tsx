/**
 * <DsvArraysLinkedDiagram>：数组与链表存储模型对比图（dsv-arrays-linked 章）。
 *
 * 左右对比：左侧数组（连续内存方块）+ 操作复杂度表，右侧链表（分散节点+箭头）+ 操作复杂度表。
 * 底部总结栏点出核心取舍。
 *
 * 纯静态展示，无交互。Server Component。
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

export function DsvArraysLinkedDiagram() {
  // 数组方块
  const arrY = 120;
  const arrBoxW = 48;
  const arrBoxH = 40;
  const arrData = [10, 20, 30, 40, 50];
  const arrX0 = 48;

  // 链表节点
  const llY = 260;
  const llBoxW = 72;
  const llBoxH = 40;
  const llGap = 20;
  const llData = [10, 20, 30, 40, 50];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="数组与链表存储模型对比。上方为数组：五个连续内存方块存 10,20,30,40,50，下方标注下标 0-4，随机访问 O(1)。下方为链表：五个分散节点用箭头串联，每个节点含数据和 next 指针，查找 O(n) 但插入删除 O(1)。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            数组 vs 链表：存储模型对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill={secondary}>
            连续存储随机访问快　分散存储插入删除快
          </text>

          {/* ===== 数组区域 ===== */}
          <text x="48" y="92" fontSize="13" fontWeight="700" fill={accent}>数组（顺序存储）</text>

          {arrData.map((v, i) => (
            <g key={i}>
              <rect x={arrX0 + i * arrBoxW} y={arrY} width={arrBoxW} height={arrBoxH} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" />
              <text x={arrX0 + i * arrBoxW + arrBoxW / 2} y={arrY + arrBoxH / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="600" fill={primary}>{v}</text>
              <text x={arrX0 + i * arrBoxW + arrBoxW / 2} y={arrY + arrBoxH + 16} textAnchor="middle" fontSize="11" fill={secondary}>[{i}]</text>
            </g>
          ))}
          {/* 连续内存标注 */}
          <line x1={arrX0} y1={arrY - 8} x2={arrX0 + arrData.length * arrBoxW} y2={arrY - 8} stroke={success} strokeWidth="1.5" />
          <text x={arrX0 + arrData.length * arrBoxW / 2} y={arrY - 14} textAnchor="middle" fontSize="11" fill={success}>连续内存</text>

          {/* 数组复杂度表 */}
          <g>
            <text x="340" y="100" fontSize="11" fontWeight="700" fill={secondary}>操作复杂度</text>
            {[
              { op: "访问 arr[i]", c: "O(1)", color: success },
              { op: "查找", c: "O(n)", color: warning },
              { op: "头部插入", c: "O(n)", color: danger },
              { op: "尾部插入", c: "O(1)均摊", color: success },
            ].map((r, i) => (
              <g key={r.op}>
                <text x="340" y={120 + i * 18} fontSize="11" fill={primary}>{r.op}</text>
                <text x="470" y={120 + i * 18} fontSize="11" fontWeight="600" fill={r.color}>{r.c}</text>
              </g>
            ))}
          </g>

          {/* 分隔线 */}
          <line x1="48" y1="232" x2={VIEW_W - 48} y2="232" stroke={border} strokeWidth="1" strokeDasharray="4 4" />

          {/* ===== 链表区域 ===== */}
          <text x="48" y="254" fontSize="13" fontWeight="700" fill={success}>链表（链式存储）</text>

          {llData.map((v, i) => {
            const x = arrX0 + i * (llBoxW + llGap);
            return (
              <g key={i}>
                <rect x={x} y={llY} width={llBoxW} height={llBoxH} rx="4" fill="var(--bg)" stroke={success} strokeWidth="1.2" />
                <line x1={x + 44} y1={llY} x2={x + 44} y2={llY + llBoxH} stroke={border} strokeWidth="1" />
                <text x={x + 22} y={llY + llBoxH / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="600" fill={primary}>{v}</text>
                <circle cx={x + 58} cy={llY + llBoxH / 2} r="3" fill={success} />
                {i < llData.length - 1 && (
                  <line x1={x + 61} y1={llY + llBoxH / 2} x2={x + llBoxW + llGap - 3} y2={llY + llBoxH / 2} stroke={success} strokeWidth="1.4" markerEnd="" />
                )}
                {i === llData.length - 1 && (
                  <text x={x + llBoxW + 8} y={llY + llBoxH / 2 + 5} fontSize="11" fill={secondary}>NULL</text>
                )}
              </g>
            );
          })}
          {/* 分散内存标注 */}
          <text x={arrX0 + llData.length * (llBoxW + llGap) / 2} y={llY + llBoxH + 20} textAnchor="middle" fontSize="11" fill={success}>分散内存，靠指针串联</text>

          {/* 链表复杂度表 */}
          <g>
            <text x="340" y="262" fontSize="11" fontWeight="700" fill={secondary}>操作复杂度</text>
            {[
              { op: "访问 list[i]", c: "O(n)", color: danger },
              { op: "查找", c: "O(n)", color: warning },
              { op: "已知位置插入", c: "O(1)", color: success },
              { op: "已知位置删除", c: "O(1)", color: success },
            ].map((r, i) => (
              <g key={r.op}>
                <text x="340" y={282 + i * 18} fontSize="11" fill={primary}>{r.op}</text>
                <text x="470" y={282 + i * 18} fontSize="11" fontWeight="600" fill={r.color}>{r.c}</text>
              </g>
            ))}
          </g>

          {/* 底部总结 */}
          <rect x="48" y="378" width={VIEW_W - 96} height="32" rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="399" textAnchor="middle" fontSize="11" fill={secondary}>
            数组擅长随机访问，链表擅长动态增删——根据操作频率选择
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数组连续存储带来 O(1) 随机访问但插入删除 O(n)；链表分散存储带来 O(1) 插入删除但访问 O(n)。两者是线性结构的两极。
      </figcaption>
    </figure>
  );
}
