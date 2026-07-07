/**
 * <VsiFunctionalSafetyDiagram>：功能安全 ISO 26262 图解。
 *
 * 左半区 ASIL 等级评定：严重度 S × 暴露度 E × 可控性 C → ASIL QM/A/B/C/D。
 * 右半区 V 模型开发流程：安全需求 → 系统设计 → 软件实现（左臂自顶向下），
 *   软件实现 → 集成测试 → 整车验证（右臂自底向上），层间虚线为验证对应关系。
 * 底部标注安全目标与安全机制（看门狗、冗余、降级）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×540（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 540;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const LEFT_X = 32;
const LEFT_W = 320;
const RIGHT_X = 372;
const RIGHT_W = 316;

interface Factor {
  name: string;
  levels: string[];
}

const FACTORS: readonly Factor[] = [
  { name: "严重度 S", levels: ["S1 轻微", "S2 严重", "S3 致命"] },
  { name: "暴露度 E", levels: ["E1 低", "E2 中", "E3 高", "E4 很高"] },
  { name: "可控性 C", levels: ["C1 易控", "C2 一般", "C3 难控"] },
];

interface Asil {
  code: string;
  desc: string;
  color: string;
  strong?: boolean;
}

const ASILS: readonly Asil[] = [
  { code: "QM", desc: "无需", color: secondary },
  { code: "A", desc: "低", color: success },
  { code: "B", desc: "中", color: accent },
  { code: "C", desc: "高", color: warning },
  { code: "D", desc: "最高", color: warning, strong: true },
];

export function VsiFunctionalSafetyDiagram() {
  // V 模型节点
  const vNodes = [
    { label: "安全需求", x: 388, y: 100, side: "L" },
    { label: "系统设计", x: 458, y: 180, side: "L" },
    { label: "软件实现", x: 530, y: 264, side: "A" },
    { label: "集成测试", x: 602, y: 180, side: "R" },
    { label: "整车验证", x: 672, y: 100, side: "R" },
  ];
  const boxW = 64;
  const boxH = 38;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="功能安全 ISO 26262 图解。左半 ASIL 等级评定：严重度 S、暴露度 E、可控性 C 三因子组合得到 ASIL QM/A/B/C/D。右半 V 模型：安全需求→系统设计→软件实现（左臂自顶向下），软件实现→集成测试→整车验证（右臂自底向上），层间虚线为验证对应。底部标注安全目标与安全机制（看门狗、冗余、降级）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="vfs-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="vfs-arrow-acc" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={accent} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            功能安全 · ISO 26262
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            左：ASIL 评定定等级 · 右：V 模型控流程 · 底：安全机制兜底
          </text>

          {/* ========== 左半 ASIL 评定 ========== */}
          <rect x={LEFT_X} y={78} width={LEFT_W} height={368} rx="12" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          <rect x={LEFT_X} y={78} width={LEFT_W} height="26" rx="12" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="1.2" />
          <text x={LEFT_X + LEFT_W / 2} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            ASIL 等级评定
          </text>

          {/* 三个因子 */}
          {FACTORS.map((f, i) => {
            const y = 122 + i * 56;
            return (
              <g key={f.name}>
                <text x={LEFT_X + 14} y={y} fontSize="11" fontWeight="700" fill={primary}>
                  {f.name}
                </text>
                {f.levels.map((lv, li) => {
                  const lvW = 56;
                  const gap = 6;
                  const startX = LEFT_X + 80;
                  const lx = startX + li * (lvW + gap);
                  return (
                    <g key={lv}>
                      <rect x={lx} y={y - 12} width={lvW} height="22" rx="5" fill={primary} fillOpacity="0.05" stroke={border} strokeWidth="1" />
                      <text x={lx + lvW / 2} y={y + 3} textAnchor="middle" fontSize="11" fill={secondary}>
                        {lv}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 组合箭头 */}
          <line x1={LEFT_X + LEFT_W / 2} y1={298} x2={LEFT_X + LEFT_W / 2} y2={322} stroke={accent} strokeWidth="1.6" markerEnd="url(#vfs-arrow-acc)" />
          <text x={LEFT_X + LEFT_W / 2} y={316} textAnchor="middle" fontSize="11" fill={accent}>
            组合评定
          </text>

          {/* ASIL 结果梯 */}
          <text x={LEFT_X + LEFT_W / 2} y={340} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>
            安全等级
          </text>
          {ASILS.map((a, i) => {
            const bw = 52;
            const gap = 8;
            const startX = LEFT_X + (LEFT_W - (ASILS.length * bw + (ASILS.length - 1) * gap)) / 2;
            const bx = startX + i * (bw + gap);
            return (
              <g key={a.code}>
                <rect
                  x={bx}
                  y={352}
                  width={bw}
                  height={48}
                  rx="8"
                  fill={a.color}
                  fillOpacity={a.strong ? 0.28 : 0.14}
                  stroke={a.color}
                  strokeWidth={a.strong ? 2 : 1.4}
                />
                <text x={bx + bw / 2} y={372} textAnchor="middle" fontSize="14" fontWeight="700" fill={a.color}>
                  {a.code}
                </text>
                <text x={bx + bw / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
                  {a.desc}
                </text>
              </g>
            );
          })}
          <text x={LEFT_X + LEFT_W / 2} y={420} textAnchor="middle" fontSize="11" fill={secondary}>
            QM 无需安全措施 · D 最高需独立冗余
          </text>

          {/* 安全目标标注 */}
          <rect x={LEFT_X + 14} y={396} width={LEFT_W - 28} height="0" fill="none" />
          <rect x={LEFT_X + 14} y={432} width={LEFT_W - 28} height={0} fill="none" />

          {/* ========== 右半 V 模型 ========== */}
          <rect x={RIGHT_X} y={78} width={RIGHT_W} height={368} rx="12" fill={primary} fillOpacity="0.03" stroke={border} strokeWidth="1.2" />
          <rect x={RIGHT_X} y={78} width={RIGHT_W} height="26" rx="12" fill={success} fillOpacity="0.14" stroke={success} strokeWidth="1.2" />
          <text x={RIGHT_X + RIGHT_W / 2} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            V 模型开发流程
          </text>

          {/* V 形连线（左臂下行、右臂上行） */}
          <polyline points="388,100 458,180 530,264" fill="none" stroke={accent} strokeWidth="2" strokeOpacity="0.6" />
          <polyline points="530,264 602,180 672,100" fill="none" stroke={success} strokeWidth="2" strokeOpacity="0.6" />

          {/* 验证对应虚线 */}
          <line x1="388" y1="100" x2="672" y2="100" stroke={secondary} strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.6" />
          <line x1="458" y1="180" x2="602" y2="180" stroke={secondary} strokeWidth="1.2" strokeDasharray="5 4" strokeOpacity="0.6" />
          <text x={530} y={96} textAnchor="middle" fontSize="11" fill={secondary}>需求 ↔ 验证</text>
          <text x={530} y={176} textAnchor="middle" fontSize="11" fill={secondary}>设计 ↔ 测试</text>

          {/* V 节点 */}
          {vNodes.map((n) => {
            const color = n.side === "L" ? accent : n.side === "R" ? success : primary;
            return (
              <g key={n.label}>
                <rect x={n.x - boxW / 2} y={n.y - boxH / 2} width={boxW} height={boxH} rx="8" fill={color} fillOpacity={n.side === "A" ? 0.16 : 0.1} stroke={color} strokeWidth="1.6" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
                  {n.label}
                </text>
              </g>
            );
          })}

          {/* 臂标注 */}
          <text x={420} y={150} textAnchor="middle" fontSize="11" fill={accent}>设计开发</text>
          <text x={420} y={232} textAnchor="middle" fontSize="11" fill={accent}>（自顶向下）</text>
          <text x={640} y={150} textAnchor="middle" fontSize="11" fill={success}>测试验证</text>
          <text x={640} y={232} textAnchor="middle" fontSize="11" fill={success}>（自底向上）</text>

          {/* 安全目标 */}
          <rect x={RIGHT_X + 16} y={312} width={RIGHT_W - 32} height="56" rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeDasharray="4 3" />
          <text x={RIGHT_X + RIGHT_W / 2} y={332} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            安全目标 SG
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={350} textAnchor="middle" fontSize="11" fill={secondary}>
            由 HARA 危害分析导出 · 贯穿 V 模型两侧
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={432} textAnchor="middle" fontSize="11" fill={secondary}>
            左臂建安全 · 右臂证安全
          </text>

          {/* ========== 底部 安全机制 ========== */}
          <line x1={32} y1={458} x2={VIEW_W - 32} y2={458} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            安全机制 · 失效兜底
          </text>
          {[
            { name: "看门狗", desc: "超时复位", x: 56 },
            { name: "冗余", desc: "双通道表决", x: 280 },
            { name: "降级运行", desc: "Limp Home", x: 504 },
          ].map((m) => (
            <g key={m.name}>
              <rect x={m.x} y={490} width={160} height={36} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.3" />
              <text x={m.x + 80} y={506} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
                {m.name}
              </text>
              <text x={m.x + 80} y={520} textAnchor="middle" fontSize="11" fill={secondary}>
                {m.desc}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        功能安全 ISO 26262：左半 ASIL 等级评定由严重度 S、暴露度 E、可控性 C 组合得到 QM/A/B/C/D；右半 V 模型左臂自顶向下（安全需求→系统设计→软件实现）、右臂自底向上（集成测试→整车验证），层间虚线为验证对应，安全目标由 HARA 危害分析导出贯穿两侧；底部安全机制含看门狗、冗余、降级运行。
      </figcaption>
    </figure>
  );
}
