/**
 * <WjGdiRenderingDiagram>：GDI 图形设备接口渲染管线图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function WjGdiRenderingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GDI 图形设备接口渲染管线图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GDI 渲染管线
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            获取DC → 选入GDI对象 → 绘制原语 → 释放对象 → 释放DC
          </text>

          {/* 流程节点 */}
          <rect x="40" y="70" width="130" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="105" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">GetDC / BeginPaint</text>
          <text x="105" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">获取设备上下文</text>

          <text x="185" y="95" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="200" y="70" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="265" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">SelectObject</text>
          <text x="265" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">选入画笔/画刷/字体</text>

          <text x="345" y="95" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="360" y="70" width="130" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="425" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">绘制原语</text>
          <text x="425" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TextOut / Rectangle / LineTo</text>

          <text x="505" y="95" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="520" y="70" width="130" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="585" y="92" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">DeleteObject</text>
          <text x="585" y="108" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">释放GDI对象</text>

          <text x="665" y="95" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="680" y="70" width="40" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="700" y="92" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">Release</text>
          <text x="700" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DC</text>

          {/* GDI 对象分类 */}
          <rect x="40" y="148" width="340" height="160" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="210" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">GDI 对象六大家族</text>
          <line x1="60" y1="180" x2="360" y2="180" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="60" y="198" fontSize="10" fill="var(--text-secondary)">HPEN</text>
          <text x="180" y="198" fontSize="10" fill="var(--text-tertiary)">画笔——线条颜色/样式/宽度</text>
          <text x="60" y="214" fontSize="10" fill="var(--text-secondary)">HBRUSH</text>
          <text x="180" y="214" fontSize="10" fill="var(--text-tertiary)">画刷——填充颜色/图案</text>
          <text x="60" y="230" fontSize="10" fill="var(--text-secondary)">HFONT</text>
          <text x="180" y="230" fontSize="10" fill="var(--text-tertiary)">字体——文字样式</text>
          <text x="60" y="246" fontSize="10" fill="var(--text-secondary)">HBITMAP</text>
          <text x="180" y="246" fontSize="10" fill="var(--text-tertiary)">位图——图像数据</text>
          <text x="60" y="262" fontSize="10" fill="var(--text-secondary)">HRGN</text>
          <text x="180" y="262" fontSize="10" fill="var(--text-tertiary)">区域——裁剪/命中测试</text>
          <text x="60" y="278" fontSize="10" fill="var(--text-secondary)">HPALETTE</text>
          <text x="180" y="278" fontSize="10" fill="var(--text-tertiary)">调色板——256色模式</text>
          <text x="60" y="296" fontSize="9" fill="var(--text-tertiary)">创建后必须 SelectObject 选入 DC 才生效</text>

          {/* 绘制原语分类 */}
          <rect x="400" y="148" width="300" height="160" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">绘制原语分类</text>
          <line x1="420" y1="180" x2="680" y2="180" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="420" y="198" fontSize="10" fill="var(--text-secondary)">TextOut / DrawText</text>
          <text x="580" y="198" fontSize="10" fill="var(--text-tertiary)">文本绘制</text>
          <text x="420" y="214" fontSize="10" fill="var(--text-secondary)">MoveToEx / LineTo</text>
          <text x="580" y="214" fontSize="10" fill="var(--text-tertiary)">直线绘制</text>
          <text x="420" y="230" fontSize="10" fill="var(--text-secondary)">Rectangle / Ellipse</text>
          <text x="580" y="230" fontSize="10" fill="var(--text-tertiary)">闭合图形</text>
          <text x="420" y="246" fontSize="10" fill="var(--text-secondary)">Polyline / Polygon</text>
          <text x="580" y="246" fontSize="10" fill="var(--text-tertiary)">多点连线</text>
          <text x="420" y="262" fontSize="10" fill="var(--text-secondary)">BitBlt / StretchBlt</text>
          <text x="580" y="262" fontSize="10" fill="var(--text-tertiary)">位图拷贝</text>
          <text x="420" y="278" fontSize="10" fill="var(--text-secondary)">FillRect / FrameRect</text>
          <text x="580" y="278" fontSize="10" fill="var(--text-tertiary)">区域填充</text>
          <text x="420" y="296" fontSize="9" fill="var(--text-tertiary)">所有绘制都经 DC 映射到物理设备</text>

          {/* 映射模式 */}
          <rect x="40" y="330" width="660" height="50" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">映射模式（Map Mode）</text>
          <text x="370" y="368" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MM_TEXT（像素） / MM_LOMETRIC（0.1mm） / MM_ISOTROPIC（自定义等比）——逻辑坐标到设备坐标的转换</text>

          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：GDI = 设备上下文（DC）+ GDI 对象 + 绘制原语，通过 DC 实现设备无关性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GDI 渲染管线——设备上下文、GDI 对象六大家族、绘制原语与映射模式的完整体系
      </figcaption>
    </figure>
  );
}
