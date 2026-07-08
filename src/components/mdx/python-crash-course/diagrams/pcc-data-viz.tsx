/**
 * <PccDataVizDiagram>：Python 数据可视化——Matplotlib 与 Plotly。
 *
 * 数据处理流程、Matplotlib 折线图/散点图/直方图、Plotly 交互式图表。
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
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccDataVizDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 数据可视化：数据从文件读取后经处理生成图表。Matplotlib 适合静态图表，Plotly 适合交互式图表。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            数据可视化：从数据到图表
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            读取数据 → 处理分析 → 生成图表 · Matplotlib 静态 / Plotly 交互
          </text>

          {/* 数据处理流水线 */}
          <text x={VIEW_W / 2} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            数据可视化流水线
          </text>

          <rect x={40} y={90} width={120} height={48} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={100} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>1. 读取</text>
          <text x={100} y={126} textAnchor="middle" fontSize="10" fill={secondary}>CSV / JSON</text>

          <line x1={160} y1={114} x2={190} y2={114} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-dv-arrow)" />

          <rect x={190} y={90} width={120} height={48} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={250} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>2. 处理</text>
          <text x={250} y={126} textAnchor="middle" fontSize="10" fill={secondary}>pandas 清洗</text>

          <line x1={310} y1={114} x2={340} y2={114} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-dv-arrow)" />

          <rect x={340} y={90} width={120} height={48} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={400} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>3. 绘制</text>
          <text x={400} y={126} textAnchor="middle" fontSize="10" fill={secondary}>matplotlib/plotly</text>

          <line x1={460} y1={114} x2={490} y2={114} stroke={secondary} strokeWidth="1.4" markerEnd="url(#pcc-dv-arrow)" />

          <rect x={490} y={90} width={120} height={48} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={550} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>4. 展示</text>
          <text x={550} y={126} textAnchor="middle" fontSize="10" fill={secondary}>save / show</text>

          {/* 分隔线 */}
          <line x1={32} y1={156} x2={VIEW_W - 32} y2={156} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 图表类型对比 */}
          <text x={180} y={180} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Matplotlib（静态）
          </text>
          <text x={540} y={180} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            Plotly（交互）
          </text>

          {/* 左侧：Matplotlib 示例 */}
          <rect x={40} y={194} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={212} fontSize="11" fill={primary}>折线图 plot()</text>
          <text x={200} y={212} fontSize="11" fill={secondary}>趋势变化</text>

          <rect x={40} y={230} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={248} fontSize="11" fill={primary}>散点图 scatter()</text>
          <text x={200} y={248} fontSize="11" fill={secondary}>变量关系</text>

          <rect x={40} y={266} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={284} fontSize="11" fill={primary}>直方图 hist()</text>
          <text x={200} y={284} fontSize="11" fill={secondary}>数据分布</text>

          <rect x={40} y={302} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={52} y={320} fontSize="11" fill={primary}>条形图 bar()</text>
          <text x={200} y={320} fontSize="11" fill={secondary}>数值对比</text>

          {/* 右侧：Plotly 示例 */}
          <rect x={380} y={194} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={212} fontSize="11" fill={primary}>交互折线 Scatter</text>
          <text x={560} y={212} fontSize="11" fill={secondary}>悬停/缩放</text>

          <rect x={380} y={230} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={248} fontSize="11" fill={primary}>地理地图</text>
          <text x={560} y={248} fontSize="11" fill={secondary}>世界地图投影</text>

          <rect x={380} y={266} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={284} fontSize="11" fill={primary}>动态动画</text>
          <text x={560} y={284} fontSize="11" fill={secondary}>时间轴变化</text>

          <rect x={380} y={302} width={300} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={320} fontSize="11" fill={primary}>HTML 导出</text>
          <text x={560} y={320} fontSize="11" fill={secondary}>浏览器交互</text>

          {/* 底部说明 */}
          <line x1={32} y1={348} x2={VIEW_W - 32} y2={348} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={370} textAnchor="middle" fontSize="11" fill={secondary}>
            Matplotlib：科学计算/论文/报告 → 静态高质量图表
          </text>
          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            Plotly：数据探索/Web展示 → 鼠标悬停/缩放/筛选交互
          </text>

          <defs>
            <marker id="pcc-dv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据可视化流水线：读取数据、清洗处理、选择合适的图表类型生成可视化。
      </figcaption>
    </figure>
  );
}
