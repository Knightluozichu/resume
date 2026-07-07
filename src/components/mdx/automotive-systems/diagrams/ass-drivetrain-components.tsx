/**
 * <AssDrivetrainComponentsDiagram>：传动系统核心部件图。
 *
 * 上部为完整动力传递链（以 FR 为参照）：
 *   发动机 → 离合器 → 变速器 → 传动轴 → 差速器 → 半轴 → 车轮
 *   每个部件下方标注功能。
 * 下部为三种驱动布局对比卡片（俯视示意）：
 *   - FF 前驱：发动机前置、前轮驱动，无传动轴，结构紧凑
 *   - FR 后驱：发动机前置、后轮驱动，传动轴纵贯，操控平衡
 *   - AWD 四驱：全轮驱动，含中央差速器，抓地最强
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

// 动力链部件
const CHAIN = [
  { label: "发动机", fn: "动力源", w: 72 },
  { label: "离合器", fn: "接合 / 切断", w: 64 },
  { label: "变速器", fn: "改变传动比", w: 64 },
  { label: "传动轴", fn: "传递动力", w: 64 },
  { label: "差速器", fn: "分配左右轮", w: 60 },
  { label: "半轴", fn: "驱动车轮", w: 52 },
  { label: "车轮", fn: "接触地面", w: 56 },
] as const;

const CHAIN_GAP = 8;
const chainTotalW = CHAIN.reduce((a, b) => a + b.w, 0) + (CHAIN.length - 1) * CHAIN_GAP;
const chainStartX = (VIEW_W - chainTotalW) / 2;
const CHAIN_Y = 100;
const CHAIN_H = 44;

const chainX = (i: number) => chainStartX + CHAIN.slice(0, i).reduce((a, b) => a + b.w + CHAIN_GAP, 0);

// 三种布局卡片
const LAYOUTS = [
  {
    key: "FF",
    name: "前驱",
    color: success,
    desc: "发动机前置 · 前轮驱动",
    trait: "结构紧凑、空间大、成本低",
    driven: "front" as const,
    driveshaft: false,
    centerDiff: false,
  },
  {
    key: "FR",
    name: "后驱",
    color: accent,
    desc: "发动机前置 · 后轮驱动",
    trait: "前后配重平衡、操控好",
    driven: "rear" as const,
    driveshaft: true,
    centerDiff: false,
  },
  {
    key: "AWD",
    name: "四驱",
    color: warning,
    desc: "全轮驱动",
    trait: "抓地最强、循迹性好",
    driven: "all" as const,
    driveshaft: true,
    centerDiff: true,
  },
] as const;

const L_MARGIN = 40;
const L_CARD_W = 200;
const L_GAP = 20;
const lCardX = (i: number) => L_MARGIN + i * (L_CARD_W + L_GAP);
const L_CARD_Y = 200;
const L_CARD_H = 240;

function CarLayout({ layout, ox, oy }: { layout: typeof LAYOUTS[number]; ox: number; oy: number }) {
  const drivenFront = layout.driven === "front" || layout.driven === "all";
  const drivenRear = layout.driven === "rear" || layout.driven === "all";
  const wheelFill = (driven: boolean) => (driven ? layout.color : "none");
  const wheelOp = (driven: boolean) => (driven ? 0.45 : 0);

  return (
    <g>
      {/* 车身（俯视，车头朝右） */}
      <path
        d={`M ${ox + 18} ${oy + 56} L ${ox + 28} ${oy + 32} L ${ox + 62} ${oy + 28} L ${ox + 112} ${oy + 28} L ${ox + 148} ${oy + 46} L ${ox + 162} ${oy + 54} L ${ox + 162} ${oy + 80} L ${ox + 18} ${oy + 80} Z`}
        fill={primary}
        fillOpacity="0.05"
        stroke={primary}
        strokeWidth="1.4"
      />
      {/* 前后轴示意线 */}
      <line x1={ox + 42} y1={oy + 30} x2={ox + 42} y2={oy + 80} stroke={border} strokeWidth="1" strokeDasharray="2 2" />
      <line x1={ox + 138} y1={oy + 30} x2={ox + 138} y2={oy + 80} stroke={border} strokeWidth="1" strokeDasharray="2 2" />

      {/* 后轮（左） */}
      <rect x={ox + 30} y={oy + 24} width="22" height="12" rx="2" fill={wheelFill(drivenRear)} fillOpacity={wheelOp(drivenRear)} stroke={drivenRear ? layout.color : primary} strokeWidth={drivenRear ? 1.8 : 1.2} />
      <rect x={ox + 30} y={oy + 72} width="22" height="12" rx="2" fill={wheelFill(drivenRear)} fillOpacity={wheelOp(drivenRear)} stroke={drivenRear ? layout.color : primary} strokeWidth={drivenRear ? 1.8 : 1.2} />
      {/* 前轮（右） */}
      <rect x={ox + 126} y={oy + 24} width="22" height="12" rx="2" fill={wheelFill(drivenFront)} fillOpacity={wheelOp(drivenFront)} stroke={drivenFront ? layout.color : primary} strokeWidth={drivenFront ? 1.8 : 1.2} />
      <rect x={ox + 126} y={oy + 72} width="22" height="12" rx="2" fill={wheelFill(drivenFront)} fillOpacity={wheelOp(drivenFront)} stroke={drivenFront ? layout.color : primary} strokeWidth={drivenFront ? 1.8 : 1.2} />

      {/* 发动机标记 E（前置） */}
      <rect x={ox + 118} y={oy + 44} width="18" height="20" rx="3" fill="none" stroke={primary} strokeWidth="1.2" />
      <text x={ox + 127} y={oy + 57} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>E</text>

      {/* 传动轴（FR / AWD） */}
      {layout.driveshaft && (
        <>
          <line x1={ox + 92} y1={oy + 54} x2={ox + 42} y2={oy + 54} stroke={layout.color} strokeWidth="1.8" strokeDasharray="4 2" />
          <text x={ox + 67} y={oy + 48} textAnchor="middle" fontSize="11" fill={layout.color}>传动轴</text>
        </>
      )}

      {/* 中央差速器（AWD） */}
      {layout.centerDiff && (
        <>
          <circle cx={ox + 92} cy={oy + 54} r="7" fill="none" stroke={layout.color} strokeWidth="1.4" />
          <text x={ox + 92} y={oy + 72} textAnchor="middle" fontSize="11" fill={layout.color}>中差</text>
        </>
      )}

      {/* 车头方向 */}
      <text x={ox + 170} y={oy + 30} fontSize="11" fill={secondary}>前</text>
      <text x={ox + 8} y={oy + 30} fontSize="11" fill={secondary}>后</text>
    </g>
  );
}

export function AssDrivetrainComponentsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="传动系统核心部件图。上部为动力传递链：发动机、离合器、变速器、传动轴、差速器、半轴、车轮，依次箭头连接。下部三种驱动布局对比：FF 前驱（前轮驱动，绿色高亮前轮，结构紧凑）、FR 后驱（传动轴纵贯，后轮驱动，紫色高亮后轮，操控平衡）、AWD 四驱（中央差速器，全轮驱动，黄色高亮四轮，抓地最强）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="adc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            传动系统 · 从发动机到车轮
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            动力依次传递：发动机 → 离合器 → 变速器 → 传动轴 → 差速器 → 半轴 → 车轮
          </text>

          {/* 动力传递链 */}
          {CHAIN.map((c, i) => {
            const x = chainX(i);
            return (
              <g key={c.label}>
                <rect x={x} y={CHAIN_Y} width={c.w} height={CHAIN_H} rx="6" fill={primary} fillOpacity="0.06" stroke={primary} strokeWidth="1.4" />
                <text x={x + c.w / 2} y={CHAIN_Y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{c.label}</text>
                <text x={x + c.w / 2} y={CHAIN_Y + 36} textAnchor="middle" fontSize="11" fill={secondary}>{c.fn}</text>
                {i < CHAIN.length - 1 && (
                  <line x1={x + c.w + 1} y1={CHAIN_Y + CHAIN_H / 2} x2={chainX(i + 1) - 3} y2={CHAIN_Y + CHAIN_H / 2} stroke={secondary} strokeWidth="1.6" markerEnd="url(#adc-arrow)" />
                )}
              </g>
            );
          })}

          {/* 三种布局卡片 */}
          {LAYOUTS.map((l, i) => {
            const cx = lCardX(i);
            return (
              <g key={l.key}>
                <rect x={cx} y={L_CARD_Y} width={L_CARD_W} height={L_CARD_H} rx="10" fill={l.color} fillOpacity="0.04" stroke={border} strokeWidth="1.2" />
                {/* 标题栏 */}
                <rect x={cx} y={L_CARD_Y} width={L_CARD_W} height="30" rx="10" fill={l.color} fillOpacity="0.14" />
                <rect x={cx} y={L_CARD_Y + 16} width={L_CARD_W} height="14" fill={l.color} fillOpacity="0.14" />
                <text x={cx + L_CARD_W / 2} y={L_CARD_Y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill={l.color}>{l.key} · {l.name}</text>

                {/* 车辆俯视图 */}
                <CarLayout layout={l} ox={cx + 16} oy={L_CARD_Y + 40} />

                {/* 描述 */}
                <line x1={cx + 14} y1={L_CARD_Y + 152} x2={cx + L_CARD_W - 14} y2={L_CARD_Y + 152} stroke={border} strokeWidth="1" />
                <text x={cx + L_CARD_W / 2} y={L_CARD_Y + 172} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{l.desc}</text>
                <text x={cx + L_CARD_W / 2} y={L_CARD_Y + 192} textAnchor="middle" fontSize="11" fill={secondary}>{l.trait}</text>
                {/* 驱动轮标注 */}
                <text x={cx + L_CARD_W / 2} y={L_CARD_Y + 214} textAnchor="middle" fontSize="11" fill={l.color}>
                  {l.driven === "front" ? "驱动轮：前轮" : l.driven === "rear" ? "驱动轮：后轮" : "驱动轮：全轮"}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={460} x2={VIEW_W - 40} y2={460} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={482} textAnchor="middle" fontSize="12" fill={secondary}>
            布局决定配重与特性：FF 紧凑经济 · FR 操控平衡 · AWD 抓地最强
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        传动系统动力链：发动机→离合器→变速器→传动轴→差速器→半轴→车轮。三种布局对比——FF 前驱结构紧凑经济、FR 后驱传动轴纵贯操控平衡、AWD 四驱配中央差速器抓地最强，高亮轮表示驱动轮。
      </figcaption>
    </figure>
  );
}
