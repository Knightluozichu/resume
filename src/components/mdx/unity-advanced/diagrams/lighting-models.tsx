/**
 * <LightingModels>：光照模型对比图
 *
 * 展示4种经典光照模型的核心区别：
 * - Lambert：漫反射，N·L
 * - Phong：漫反射 + 镜面反射(R·V)^n
 * - Blinn-Phong：半角向量H，N·H（Phong的优化）
 * - PBR：基于物理的渲染，BRDF（Albedo+Metallic+Roughness+Normal+AO+Emission）
 * 用球面光照示意直观展示各模型效果差异
 */

const VIEW_W = 780;
const VIEW_H = 440;

type Model = {
  name: string;
  sub: string;
  color: string;
  formula: string;
  key: string;
  x: number;
  highlightX: number;  // 高光位置（球面角度偏移）
  highlightSize: number;
  highlightSoftness: number;
};

const MODELS: readonly Model[] = [
  {
    name: "Lambert", sub: "漫反射", color: "var(--accent)",
    formula: "Cd * (N·L) * Al",
    key: "只算漫反射·无高光",
    x: 100, highlightX: 0, highlightSize: 0, highlightSoftness: 0,
  },
  {
    name: "Phong", sub: "冯氏光照", color: "var(--warning)",
    formula: "Cd*(N·L) + Cs*(R·V)^n",
    key: "镜面反射·硬高光",
    x: 280, highlightX: -12, highlightSize: 14, highlightSoftness: 0.3,
  },
  {
    name: "Blinn-Phong", sub: "半角向量", color: "var(--success)",
    formula: "Cd*(N·L) + Cs*(N·H)^n",
    key: "H=(L+V)/|L+V|·快",
    x: 460, highlightX: -8, highlightSize: 16, highlightSoftness: 0.5,
  },
  {
    name: "PBR", sub: "基于物理", color: "var(--danger)",
    formula: "BRDF: D*F*G/(4(N·V)(N·L))",
    key: "能量守恒·GGX·菲涅尔",
    x: 640, highlightX: -6, highlightSize: 20, highlightSoftness: 1.2,
  },
];

const SPHERE_CY = 155;
const SPHERE_R = 48;

export function LightingModels() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 680 }}
        role="img"
        aria-label="光照模型对比图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={28} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          光照模型演进：Lambert → Phong → Blinn-Phong → PBR
        </text>
        <text x={VIEW_W / 2} y={46} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          从经验模型到基于物理，核心是&quot;如何计算物体对光的反射&quot;
        </text>

        {/* 光源标识 */}
        <g>
          <circle cx={40} cy={100} r={14} fill="var(--warning)" fillOpacity="0.8" />
          <text x={40} y={104} textAnchor="middle" fill="var(--bg)" fontSize="9" fontWeight="700" fontFamily="system-ui">L</text>
          <text x={40} y={130} textAnchor="middle" fill="var(--warning)" fontSize="8" fontFamily="system-ui">光源</text>
        </g>

        {/* 每个光照模型 */}
        {MODELS.map((m) => {
          const cx = m.x;
          const cy = SPHERE_CY;
          const r = SPHERE_R;

          return (
            <g key={m.name}>
              {/* 卡片背景 */}
              <rect x={cx - 70} y={70} width={140} height={220} fill="var(--bg)" stroke={m.color} strokeWidth="1" strokeOpacity="0.3" rx="8" />
              <rect x={cx - 70} y={70} width={140} height={3} fill={m.color} rx="1" />

              {/* 模型名称 */}
              <text x={cx} y={88} textAnchor="middle" fill={m.color} fontSize="13" fontWeight="700" fontFamily="system-ui">{m.name}</text>
              <text x={cx} y={102} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">{m.sub}</text>

              {/* 球面光照示意（渐变圆） */}
              <defs>
                <radialGradient id={`lm-sphere-${m.name}`} cx="0.35" cy="0.35" r="0.8">
                  <stop offset="0%" fill="var(--bg-elevated)" />
                  <stop offset="40%" fill={m.color} stopOpacity="0.3" />
                  <stop offset="100%" fill={m.color} stopOpacity="0.7" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r={r} fill={`url(#lm-sphere-${m.name})`} stroke={m.color} strokeWidth="1" strokeOpacity="0.4" />

              {/* 高光 */}
              {m.highlightSize > 0 && (
                <ellipse
                  cx={cx + m.highlightX}
                  cy={cy - 10}
                  rx={m.highlightSize}
                  ry={m.highlightSize * 0.7}
                  fill="white"
                  fillOpacity={0.5 + m.highlightSoftness * 0.1}
                  filter={m.highlightSoftness > 1 ? "blur(2px)" : undefined}
                />
              )}
              {/* PBR 额外边缘光（菲涅尔效应示意） */}
              {m.name === "PBR" && (
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
              )}

              {/* 法向量N示意 */}
              <line x1={cx} y1={cy} x2={cx} y2={cy - r - 8} stroke="var(--text-secondary)" strokeWidth="0.8" strokeDasharray="2 1" />
              <text x={cx} y={cy - r - 12} textAnchor="middle" fill="var(--text-secondary)" fontSize="7" fontFamily="JetBrains Mono, monospace">N</text>

              {/* 光线L示意 */}
              <line x1={cx - 35} y1={cy - 35} x2={cx - 10} y2={cy - 10} stroke="var(--warning)" strokeWidth="0.8" markerEnd="url(#lm-arrow-warn)" />
              <text x={cx - 40} y={cy - 32} fill="var(--warning)" fontSize="7" fontFamily="JetBrains Mono, monospace">L</text>

              {/* 视线V示意（仅Phong+Blinn+PBR） */}
              {m.name !== "Lambert" && (
                <>
                  <line x1={cx + 40} y1={cy - 40} x2={cx + 8} y2={cy - 8} stroke="var(--text-secondary)" strokeWidth="0.8" markerEnd="url(#lm-arrow-gray)" />
                  <text x={cx + 44} y={cy - 38} fill="var(--text-secondary)" fontSize="7" fontFamily="JetBrains Mono, monospace">V</text>
                </>
              )}

              {/* Blinn-Phong: 半角向量H */}
              {m.name === "Blinn-Phong" && (
                <>
                  <line x1={cx} y1={cy} x2={cx - 2} y2={cy - 25} stroke="var(--success)" strokeWidth="1" markerEnd="url(#lm-arrow-success)" />
                  <text x={cx + 4} y={cy - 20} fill="var(--success)" fontSize="7" fontWeight="600" fontFamily="JetBrains Mono, monospace">H</text>
                </>
              )}

              {/* Phong: 反射向量R */}
              {m.name === "Phong" && (
                <>
                  <line x1={cx} y1={cy} x2={cx + 15} y2={cy - 22} stroke="var(--warning)" strokeWidth="1" markerEnd="url(#lm-arrow-warn2)" />
                  <text x={cx + 18} y={cy - 16} fill="var(--warning)" fontSize="7" fontWeight="600" fontFamily="JetBrains Mono, monospace">R</text>
                </>
              )}

              {/* 公式 */}
              <rect x={cx - 65} y={cy + r + 8} width={130} height={22} fill={m.color} fillOpacity="0.06" stroke={m.color} strokeWidth="0.5" strokeOpacity="0.3" rx="3" />
              <text x={cx} y={cy + r + 23} textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontFamily="JetBrains Mono, monospace">{m.formula}</text>

              {/* 关键特点 */}
              <text x={cx} y={cy + r + 45} textAnchor="middle" fill={m.color} fontSize="8" fontWeight="600" fontFamily="system-ui">{m.key}</text>
            </g>
          );
        })}

        {/* PBR 核心参数面板 */}
        <g>
          <rect x={30} y={310} width={720} height={110} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={50} y={332} fill="var(--danger)" fontSize="12" fontWeight="600" fontFamily="system-ui">PBR 核心参数（Unity Standard/URP Lit）</text>

          {[
            { name: "Albedo", desc: "基础色·非金属F0=0.04", color: "var(--accent)" },
            { name: "Metallic", desc: "金属度0~1·金属反射率高", color: "var(--text-secondary)" },
            { name: "Roughness", desc: "粗糙度0~1·控制高光大小", color: "var(--warning)" },
            { name: "Normal", desc: "法线贴图·表面凹凸细节", color: "var(--success)" },
            { name: "AO", desc: "环境光遮蔽·缝隙变暗", color: "var(--danger)" },
            { name: "Emission", desc: "自发光·不受光照影响", color: "var(--warning)" },
          ].map((p, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const px = 50 + col * 235;
            const py = 344 + row * 38;
            return (
              <g key={p.name}>
                <rect x={px} y={py} width={220} height={30} fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="0.5" strokeOpacity="0.4" rx="4" />
                <text x={px + 8} y={py + 13} fill={p.color} fontSize="9" fontWeight="600" fontFamily="JetBrains Mono, monospace">{p.name}</text>
                <text x={px + 8} y={py + 25} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">{p.desc}</text>
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="lm-arrow-warn" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--warning)" />
          </marker>
          <marker id="lm-arrow-warn2" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--warning)" />
          </marker>
          <marker id="lm-arrow-gray" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--text-secondary)" />
          </marker>
          <marker id="lm-arrow-success" markerWidth="5" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="var(--success)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
