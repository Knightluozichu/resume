/**
 * <UhmAdvancedHmiDiagram>：高级 HMI 技术图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmAdvancedHmiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="高级 HMI 技术图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            高级 HMI 三大趋势
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            3D 仪表盘 · 多屏联动 · 多模态交互
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="180" height="110" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">3D 仪表盘</text>
          <text x="160" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">RenderTexture 嵌入</text>
          <text x="160" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">3D 车辆模型</text>
          <text x="160" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面数 &lt;5 万</text>
          <text x="160" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">LOD + ASTC 压缩</text>

          <rect x="270" y="100" width="180" height="110" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">多屏联动</text>
          <text x="360" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">统一数据源</text>
          <text x="360" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">事件广播</text>
          <text x="360" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">帧内一致性</text>
          <text x="360" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">仪表/中控/副驾/后排</text>

          <rect x="470" y="100" width="180" height="110" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="560" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">多模态交互</text>
          <text x="560" y="144" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">语音（解放双手）</text>
          <text x="560" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">手势（直观）</text>
          <text x="560" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">眼动（自然）</text>
          <text x="560" y="192" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">触控（精确）</text>

          <rect x="70" y="230" width="580" height="50" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            统一逻辑动作层：所有模态映射到 Confirm/Cancel/Navigate
          </text>
          <text x={VIEW_W / 2} y="268" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            系统根据场景选择最佳模态响应
          </text>

          <text x={VIEW_W / 2} y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            从 2D 到 3D · 从单屏到多屏 · 从触控到多模态
          </text>
          <text x={VIEW_W / 2} y="326" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            3D 嵌入 GPU 开销大，需控制模型面数和纹理大小
          </text>
          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            多屏同步：同一帧内广播，保证帧内一致性
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高级 HMI 技术——3D 仪表盘、多屏联动与多模态交互
      </figcaption>
    </figure>
  );
}
