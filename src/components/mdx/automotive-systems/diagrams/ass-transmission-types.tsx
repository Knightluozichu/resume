/**
 * <AssTransmissionTypesDiagram>：变速器类型对比图。
 *
 * 四种变速器并排卡片：MT / AT / CVT / DCT，每张卡片含：
 *   - 标题栏（缩写 + 全称）
 *   - 结构简图（离合器/液力变矩器/钢带锥轮/双离合示意）
 *   - 优点 / 缺点
 *   - 适用场景
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×570（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 570;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const MARGIN = 36;
const CARD_W = 156;
const GAP = 8;
const cardX = (i: number) => MARGIN + i * (CARD_W + GAP);
const CARD_Y = 80;
const CARD_H = 440;

interface TransCard {
  abbr: string;
  full: string;
  color: string;
  schematic: "mt" | "at" | "cvt" | "dct";
  pros: string[];
  cons: string[];
  useCase: string;
}

const CARDS: readonly TransCard[] = [
  {
    abbr: "MT",
    full: "手动变速器",
    color: success,
    schematic: "mt",
    pros: ["结构简单", "传动效率高", "成本低 / 可靠"],
    cons: ["操作强度大", "拥堵易疲劳"],
    useCase: "入门车 · 性能取向",
  },
  {
    abbr: "AT",
    full: "自动变速器",
    color: accent,
    schematic: "at",
    pros: ["换挡平顺", "操作简单", "成熟可靠"],
    cons: ["效率略低", "响应较慢"],
    useCase: "家用 · 舒适取向",
  },
  {
    abbr: "CVT",
    full: "无级变速器",
    color: warning,
    schematic: "cvt",
    pros: ["无级变速", "平顺省油", "速比连续"],
    cons: ["承载扭矩有限", "驾驶感弱"],
    useCase: "经济型家轿",
  },
  {
    abbr: "DCT",
    full: "双离合变速器",
    color: accent,
    schematic: "dct",
    pros: ["换挡极快", "效率高", "动力直接"],
    cons: ["低速顿挫", "成本较高"],
    useCase: "性能车 · 运动取向",
  },
];

function Schematic({ type, ox, oy }: { type: TransCard["schematic"]; ox: number; oy: number }) {
  const s = secondary;
  const p = primary;
  if (type === "mt") {
    return (
      <g>
        {/* 离合器：两片对合 */}
        <rect x={ox + 8} y={oy + 40} width="10" height="24" rx="2" fill="none" stroke={s} strokeWidth="1.4" />
        <rect x={ox + 20} y={oy + 40} width="10" height="24" rx="2" fill="none" stroke={s} strokeWidth="1.4" />
        <text x={ox + 19} y={oy + 78} textAnchor="middle" fontSize="11" fill={s}>离合器</text>
        {/* 三个啮合齿轮 */}
        {[44, 70, 96].map((gx, i) => (
          <g key={i}>
            <circle cx={ox + gx} cy={oy + 52} r={i === 1 ? 9 : 11} fill="none" stroke={p} strokeWidth="1.4" />
            <circle cx={ox + gx} cy={oy + 52} r="2.5" fill={p} />
          </g>
        ))}
        <text x={ox + 70} y={oy + 88} textAnchor="middle" fontSize="11" fill={s}>齿轮组</text>
        <line x1={ox + 107} y1={oy + 52} x2={ox + 124} y2={oy + 52} stroke={s} strokeWidth="1.4" markerEnd="url(#atx-arrow)" />
      </g>
    );
  }
  if (type === "at") {
    return (
      <g>
        {/* 液力变矩器：同心椭圆 */}
        <ellipse cx={ox + 30} cy={oy + 52} rx="18" ry="20" fill="none" stroke={p} strokeWidth="1.4" />
        <ellipse cx={ox + 30} cy={oy + 52} rx="9" ry="11" fill="none" stroke={s} strokeWidth="1.2" />
        <text x={ox + 30} y={oy + 88} textAnchor="middle" fontSize="11" fill={s}>液力变矩器</text>
        {/* 行星齿轮：太阳 + 行星 + 齿圈 */}
        <circle cx={ox + 92} cy={oy + 52} r="22" fill="none" stroke={s} strokeWidth="1.2" />
        <circle cx={ox + 92} cy={oy + 52} r="4" fill={p} />
        {[0, 120, 240].map((deg) => {
          const r = 13;
          const px = ox + 92 + r * Math.cos((deg * Math.PI) / 180);
          const py = oy + 52 + r * Math.sin((deg * Math.PI) / 180);
          return <circle key={deg} cx={px} cy={py} r="4" fill="none" stroke={p} strokeWidth="1.2" />;
        })}
        <text x={ox + 92} y={oy + 88} textAnchor="middle" fontSize="11" fill={s}>行星齿轮</text>
        <line x1={ox + 48} y1={oy + 52} x2={ox + 70} y2={oy + 52} stroke={s} strokeWidth="1.4" markerEnd="url(#atx-arrow)" />
      </g>
    );
  }
  if (type === "cvt") {
    return (
      <g>
        {/* 左锥轮（主动，小半径） */}
        <polygon points={`${ox + 28},${oy + 36} ${ox + 44},${oy + 30} ${ox + 44},${oy + 74} ${ox + 28},${oy + 68}`} fill="none" stroke={p} strokeWidth="1.4" />
        {/* 右锥轮（从动，大半径） */}
        <polygon points={`${ox + 84},${oy + 44} ${ox + 100},${oy + 38} ${ox + 100},${oy + 66} ${ox + 84},${oy + 60}`} fill="none" stroke={p} strokeWidth="1.4" />
        {/* 钢带 */}
        <line x1={ox + 40} y1={oy + 38} x2={ox + 92} y2={oy + 50} stroke={accent} strokeWidth="1.8" />
        <line x1={ox + 40} y1={oy + 66} x2={ox + 92} y2={oy + 54} stroke={accent} strokeWidth="1.8" />
        <text x={ox + 64} y={oy + 88} textAnchor="middle" fontSize="11" fill={s}>钢带 + 锥轮</text>
      </g>
    );
  }
  // dct
  return (
    <g>
      {/* 两组离合器并排 */}
      <rect x={ox + 12} y={oy + 40} width="14" height="22" rx="2" fill="none" stroke={accent} strokeWidth="1.4" />
      <rect x={ox + 28} y={oy + 40} width="14" height="22" rx="2" fill="none" stroke={warning} strokeWidth="1.4" />
      <text x={ox + 20} y={oy + 36} textAnchor="middle" fontSize="11" fill={accent}>奇</text>
      <text x={ox + 36} y={oy + 36} textAnchor="middle" fontSize="11" fill={warning}>偶</text>
      <text x={ox + 28} y={oy + 78} textAnchor="middle" fontSize="11" fill={s}>双离合器</text>
      {/* 两组齿轮 */}
      {[64, 92].map((gx, i) => (
        <g key={i}>
          <circle cx={ox + gx} cy={oy + 52} r="10" fill="none" stroke={i === 0 ? accent : warning} strokeWidth="1.4" />
          <circle cx={ox + gx} cy={oy + 52} r="2.5" fill={p} />
        </g>
      ))}
      <text x={ox + 78} y={oy + 88} textAnchor="middle" fontSize="11" fill={s}>奇偶齿轮组</text>
      <line x1={ox + 44} y1={oy + 52} x2={ox + 54} y2={oy + 52} stroke={s} strokeWidth="1.4" markerEnd="url(#atx-arrow)" />
    </g>
  );
}

export function AssTransmissionTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="变速器类型对比。四种变速器并排：MT 手动（绿色，齿轮组加离合器，结构简单效率高但操作强度大）；AT 自动（紫色，液力变矩器加行星齿轮，平顺可靠但效率略低）；CVT 无级（黄色，钢带加锥轮，无级变速省油但承载有限）；DCT 双离合（紫色，两组离合器，换挡快效率高但低速顿挫）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="atx-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            四种变速器 · 结构与特性对比
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            MT 手动 / AT 自动 / CVT 无级 / DCT 双离合
          </text>

          {/* 四张卡片 */}
          {CARDS.map((c) => {
            const cx = cardX(CARDS.indexOf(c));
            return (
              <g key={c.abbr}>
                {/* 卡片外框 */}
                <rect x={cx} y={CARD_Y} width={CARD_W} height={CARD_H} rx="10" fill={c.color} fillOpacity="0.04" stroke={border} strokeWidth="1.2" />
                {/* 标题栏 */}
                <rect x={cx} y={CARD_Y} width={CARD_W} height="32" rx="10" fill={c.color} fillOpacity="0.14" />
                <rect x={cx} y={CARD_Y + 18} width={CARD_W} height="14" fill={c.color} fillOpacity="0.14" />
                <text x={cx + CARD_W / 2} y={CARD_Y + 21} textAnchor="middle" fontSize="15" fontWeight="700" fill={c.color}>{c.abbr}</text>

                {/* 结构简图区 */}
                <rect x={cx + 10} y={CARD_Y + 42} width={CARD_W - 20} height="96" rx="6" fill="none" stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                <text x={cx + CARD_W / 2} y={CARD_Y + 56} textAnchor="middle" fontSize="11" fontWeight="600" fill={c.color}>{c.full}</text>
                <Schematic type={c.schematic} ox={cx + 14} oy={CARD_Y + 60} />

                {/* 优点 */}
                <text x={cx + 12} y={CARD_Y + 162} fontSize="12" fontWeight="700" fill={success}>优点</text>
                {c.pros.map((p, i) => (
                  <text key={p} x={cx + 12} y={CARD_Y + 182 + i * 18} fontSize="11" fill={primary}>+ {p}</text>
                ))}

                {/* 缺点 */}
                <text x={cx + 12} y={CARD_Y + 248} fontSize="12" fontWeight="700" fill={warning}>缺点</text>
                {c.cons.map((p, i) => (
                  <text key={p} x={cx + 12} y={CARD_Y + 268 + i * 18} fontSize="11" fill={primary}>− {p}</text>
                ))}

                {/* 适用场景 */}
                <line x1={cx + 12} y1={CARD_Y + 320} x2={cx + CARD_W - 12} y2={CARD_Y + 320} stroke={border} strokeWidth="1" />
                <text x={cx + 12} y={CARD_Y + 340} fontSize="12" fontWeight="700" fill={secondary}>适用场景</text>
                <text x={cx + 12} y={CARD_Y + 360} fontSize="11" fill={primary}>{c.useCase}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={36} y1={536} x2={VIEW_W - 36} y2={536} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={556} textAnchor="middle" fontSize="12" fill={secondary}>
            选型权衡：效率与平顺不可兼得，DCT 偏运动、AT 偏舒适、CVT 偏经济、MT 偏纯粹
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种变速器对比：MT（齿轮组+离合器，效率高但操作强度大）、AT（液力变矩器+行星齿轮，平顺可靠）、CVT（钢带+锥轮，无级省油）、DCT（双离合器，换挡快效率高但低速顿挫）。各有取舍，按效率、平顺、成本、运动性权衡选型。
      </figcaption>
    </figure>
  );
}
