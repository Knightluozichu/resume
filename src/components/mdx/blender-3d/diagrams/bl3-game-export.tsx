/**
 * <Bl3GameExportDiagram>：Blender 游戏导出工作流图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3GameExportDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 游戏导出工作流图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 游戏导出工作流</text>
          <rect x="60" y="75" width="100" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Blender</text>
          <text x="210" y="105" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">FBX/glTF</text>
          <line x1="170" y1="100" x2="260" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="5,3" />
          <rect x="560" y="75" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="105" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">引擎</text>
          <line x1="460" y1="100" x2="550" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="5,3" />
          <text x="360" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">导出检查清单</text>
          <rect x="80" y="185" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="170" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">应用缩放 (Ctrl+A)</text>
          <rect x="280" y="185" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="370" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">重算法线 (Ctrl+N)</text>
          <rect x="480" y="185" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="570" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">坐标系转换 (Y/Z-up)</text>
          <rect x="80" y="220" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="170" y="239" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Apply Modifiers</text>
          <rect x="280" y="220" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="370" y="239" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Tangent Space</text>
          <rect x="480" y="220" width="180" height="28" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="570" y="239" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Selected Objects</text>
          <text x="360" y="290" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">导出 = 翻译（坐标系/单位/材质映射）</text>
          <text x="360" y="315" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">导入引擎后逐项验证：大小/朝向/材质/法线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 游戏导出工作流——玩转 Blender
      </figcaption>
    </figure>
  );
}
