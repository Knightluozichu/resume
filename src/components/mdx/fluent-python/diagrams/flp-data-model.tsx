/**
 * <FlpDataModelDiagram>：Python 数据模型——语法到特殊方法的分发。
 *
 * 展示内置语法/函数如何通过调用特殊方法（dunder methods）与对象交互。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface Row {
  syntax: string;
  method: string;
  purpose: string;
  color: string;
}

const ROWS: readonly Row[] = [
  { syntax: "len(obj)", method: "__len__", purpose: "长度", color: accent },
  { syntax: "obj[i] / obj[a:b]", method: "__getitem__", purpose: "索引与切片", color: accent },
  { syntax: "for x in obj", method: "__iter__ / __next__", purpose: "迭代", color: success },
  { syntax: "repr(obj)", method: "__repr__", purpose: "开发者表示", color: warning },
  { syntax: "a + b", method: "__add__", purpose: "运算符重载", color: warning },
  { syntax: "with obj as x:", method: "__enter__ / __exit__", purpose: "上下文管理", color: secondary },
];

const COL1_X = 48;
const COL1_W = 176;
const COL2_X = 300;
const COL2_W = 188;
const COL3_X = 532;
const ROW_H = 40;
const ROW_TOP = 100;

export function FlpDataModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python数据模型：内置语法与函数通过调用特殊方法与对象交互的对照表，包含 len、索引、for 迭代、repr、加法运算、with 上下文管理六组映射。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Python 数据模型：语法 → 特殊方法
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            内置语法只是糖衣，真正干活的是对象上的特殊方法
          </text>

          {/* 列头 */}
          <text x={COL1_X + COL1_W / 2} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
            语法 / 内置函数
          </text>
          <text x={COL2_X + COL2_W / 2} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
            特殊方法
          </text>
          <text x={COL3_X + 40} y={80} textAnchor="middle" fontSize="12" fontWeight="700" fill={secondary}>
            用途
          </text>
          <line x1={32} y1={88} x2={VIEW_W - 32} y2={88} stroke={border} strokeWidth="1" />

          {/* 数据行 */}
          {ROWS.map((r, i) => {
            const y = ROW_TOP + i * ROW_H;
            return (
              <g key={r.syntax}>
                <rect x={COL1_X} y={y - 15} width={COL1_W} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
                <text x={COL1_X + COL1_W / 2} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                  {r.syntax}
                </text>

                <line x1={COL1_X + COL1_W + 6} y1={y} x2={COL2_X - 8} y2={y} stroke={r.color} strokeWidth="1.4" markerEnd="url(#flp-dm-arrow)" />

                <rect x={COL2_X} y={y - 15} width={COL2_W} height={30} rx="6" fill={r.color} fillOpacity="0.10" stroke={r.color} strokeWidth="1.2" strokeOpacity="0.6" />
                <text x={COL2_X + COL2_W / 2} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={r.color}>
                  {r.method}
                </text>

                <text x={COL3_X} y={y + 4} fontSize="11" fill={primary}>
                  {r.purpose}
                </text>
              </g>
            );
          })}

          <defs>
            <marker id="flp-dm-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={350} x2={VIEW_W - 32} y2={350} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={370} textAnchor="middle" fontSize="11" fill={secondary}>
            实现相应特殊方法，自定义类型即可被内置函数与语法无缝接受
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 内置语法/函数与特殊方法的分发关系。
      </figcaption>
    </figure>
  );
}
