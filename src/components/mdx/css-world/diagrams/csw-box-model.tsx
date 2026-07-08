/**
 * <CswBoxModelDiagram>：盒模型图解。
 * 对比 content-box 与 border-box 的尺寸计算，展示 margin 合并。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswBoxModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="盒模型图解：content-box 与 border-box 对比及 margin 合并"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            盒模型：content-box vs border-box
          </text>

          {/* 左侧：content-box */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">content-box（默认 W3C 盒）</text>

          {/* margin 层 */}
          <rect x="40" y="72" width="280" height="160" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="56" y="88" fontSize="9" fill="var(--warning)">margin: 20px</text>

          {/* border 层 */}
          <rect x="60" y="92" width="240" height="120" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="76" y="108" fontSize="9" fill="var(--accent)">border: 5px</text>

          {/* padding 层 */}
          <rect x="70" y="102" width="220" height="100" rx="3" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="86" y="118" fontSize="9" fill="var(--success)">padding: 15px</text>

          {/* content 层 */}
          <rect x="100" y="132" width="160" height="40" rx="2" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="180" y="156" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">content: 200px</text>

          <text x="180" y="250" textAnchor="middle" fontSize="10" fill="var(--danger)">实际宽 = 200 + 15×2 + 5×2 = 240px</text>
          <text x="180" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">设置的 width 只是 content，放大会撑破布局</text>

          {/* 右侧：border-box */}
          <text x="560" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">border-box（IE 盒 / 现代首选）</text>

          <rect x="420" y="72" width="280" height="160" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="436" y="88" fontSize="9" fill="var(--warning)">margin: 20px</text>

          <rect x="440" y="92" width="240" height="120" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="456" y="108" fontSize="9" fill="var(--accent)">border: 5px</text>

          <rect x="450" y="102" width="220" height="100" rx="3" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="466" y="118" fontSize="9" fill="var(--success)">padding: 15px</text>

          {/* content 层（被压缩） */}
          <rect x="480" y="132" width="120" height="40" rx="2" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="540" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">content</text>
          <text x="540" y="164" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">= 160px（自动收缩）</text>

          <text x="560" y="250" textAnchor="middle" fontSize="10" fill="var(--success)">实际宽 = 200px（width 已含 border+padding）</text>
          <text x="560" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">设置多少就是多少，所见即所得</text>

          {/* 下方：margin 合并 */}
          <rect x="40" y="286" width="660" height="150" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="308" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">margin 合并：相邻块级垂直外边距取大值</text>

          {/* 合并前 */}
          <rect x="70" y="322" width="170" height="48" rx="4" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="155" y="350" textAnchor="middle" fontSize="10" fill="var(--text-primary)">块A margin-bottom:30</text>

          <rect x="70" y="370" width="170" height="48" rx="4" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="155" y="398" textAnchor="middle" fontSize="10" fill="var(--text-primary)">块B margin-top:20</text>

          <text x="155" y="432" textAnchor="middle" fontSize="10" fill="var(--danger)">间距 = max(30, 20) = 30px（非 50px）</text>

          {/* 阻止合并 */}
          <text x="450" y="340" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">阻止合并的手段</text>
          <text x="450" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">父元素触发 BFC（overflow:hidden）</text>
          <text x="450" y="378" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">中间插入 padding / border / 行内块</text>
          <text x="450" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">父元素加 padding-top / border-top</text>
          <text x="450" y="416" textAnchor="middle" fontSize="9" fill="var(--success)">合并只发生在「相邻块级正常流」</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        盒模型——content-box 与 border-box 尺寸差异、margin 垂直合并规则
      </figcaption>
    </figure>
  );
}
