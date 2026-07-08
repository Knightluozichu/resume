/**
 * <PccVariablesListsDiagram>：Python 变量与列表的内存模型。
 *
 * 展示变量名→对象引用、列表的动态扩容与索引结构。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
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

export function PccVariablesListsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 变量与列表内存模型：变量名是标签，指向堆中的对象；列表存储引用数组，通过索引访问元素。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            变量与列表：引用语义与索引结构
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            变量是标签而非盒子 · 列表存储引用 · 索引从 0 开始
          </text>

          {/* 左侧：变量与对象引用 */}
          <text x={140} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            变量 → 对象引用
          </text>

          {/* 变量名（标签） */}
          <rect x={50} y={92} width={80} height={32} rx="6" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={90} y={112} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>message</text>

          <rect x={50} y={136} width={80} height={32} rx="6" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={90} y={156} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>count</text>

          <rect x={50} y={180} width={80} height={32} rx="6" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={90} y={200} textAnchor="middle" fontSize="12" fontWeight="600" fill={accent}>pi</text>

          {/* 箭头 */}
          <line x1={130} y1={108} x2={180} y2={108} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-vl-arrow)" />
          <line x1={130} y1={152} x2={180} y2={152} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-vl-arrow)" />
          <line x1={130} y1={196} x2={180} y2={196} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-vl-arrow)" />

          {/* 对象（堆） */}
          <rect x={180} y={92} width={100} height={32} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={230} y={112} textAnchor="middle" fontSize="12" fill={primary}>"Hello"</text>

          <rect x={180} y={136} width={100} height={32} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={230} y={156} textAnchor="middle" fontSize="12" fill={primary}>42</text>

          <rect x={180} y={180} width={100} height={32} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={230} y={200} textAnchor="middle" fontSize="12" fill={primary}>3.14</text>

          <text x={230} y={230} textAnchor="middle" fontSize="10" fill={secondary}>堆内存中的对象</text>

          {/* 分隔线 */}
          <line x1={320} y1={70} x2={320} y2={300} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：列表结构 */}
          <text x={500} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            列表：引用数组
          </text>

          {/* 列表头 */}
          <rect x={380} y={92} width={240} height={28} rx="6" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={500} y={110} textAnchor="middle" fontSize="12" fontWeight="600" fill={warning}>numbers = [...]</text>

          {/* 索引标注 */}
          <text x={420} y={138} textAnchor="middle" fontSize="11" fill={secondary}>[0]</text>
          <text x={480} y={138} textAnchor="middle" fontSize="11" fill={secondary}>[1]</text>
          <text x={540} y={138} textAnchor="middle" fontSize="11" fill={secondary}>[2]</text>
          <text x={600} y={138} textAnchor="middle" fontSize="11" fill={secondary}>[3]</text>

          {/* 列表元素格子 */}
          <rect x={392} y={144} width={56} height={32} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={420} y={164} textAnchor="middle" fontSize="12" fill={primary}>10</text>

          <rect x={452} y={144} width={56} height={32} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={480} y={164} textAnchor="middle" fontSize="12" fill={primary}>20</text>

          <rect x={512} y={144} width={56} height={32} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={540} y={164} textAnchor="middle" fontSize="12" fill={primary}>30</text>

          <rect x={572} y={144} width={56} height={32} rx="4" fill={elevated} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={600} y={164} textAnchor="middle" fontSize="11" fill={secondary}>append</text>

          <text x={500} y={196} textAnchor="middle" fontSize="10" fill={secondary}>动态扩容 · 末尾追加 O(1)</text>

          {/* 负索引说明 */}
          <line x1={32} y1={250} x2={VIEW_W - 32} y2={250} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={272} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            负索引与切片
          </text>

          <rect x={100} y={288} width={60} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={130} y={306} textAnchor="middle" fontSize="11" fill={primary}>[-3]</text>
          <rect x={164} y={288} width={60} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={194} y={306} textAnchor="middle" fontSize="11" fill={primary}>[-2]</text>
          <rect x={228} y={288} width={60} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={258} y={306} textAnchor="middle" fontSize="11" fill={primary}>[-1]</text>

          <text x={330} y={306} textAnchor="middle" fontSize="11" fill={secondary}>从末尾倒数</text>

          <rect x={440} y={288} width={100} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={490} y={306} textAnchor="middle" fontSize="11" fill={success}>numbers[1:3]</text>
          <text x={490} y={330} textAnchor="middle" fontSize="10" fill={secondary}>切片 = [20, 30]</text>

          <rect x={560} y={288} width={100} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={610} y={306} textAnchor="middle" fontSize="11" fill={success}>numbers[:2]</text>
          <text x={610} y={330} textAnchor="middle" fontSize="10" fill={secondary}>切片 = [10, 20]</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            变量是标签 → 列表存储引用 → 修改列表影响所有引用者
          </text>

          <defs>
            <marker id="pcc-vl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 变量是标签而非盒子，列表通过索引访问存储在堆中的对象引用。
      </figcaption>
    </figure>
  );
}
