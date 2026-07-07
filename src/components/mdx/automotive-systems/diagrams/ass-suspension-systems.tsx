/**
 * <AssSuspensionSystemsDiagram>：悬架系统对比图。
 *
 * 三种悬架并排卡片（侧视示意）：
 *   - 麦弗逊（success 绿）：螺旋弹簧 + 液压减振器一体支柱，结构简单紧凑，前驱前悬常用
 *   - 多连杆（accent 紫）：多根连杆精确控制轮迹，操控与舒适兼顾，高端车后悬常见
 *   - 空气悬架（warning 暖）：空气弹簧替代螺旋弹簧，高度可调、舒适极佳，豪华车装配
 * 每张卡片含结构简图、弹簧类型、特点、适用车型。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×560（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 560;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const MARGIN = 40;
const CARD_W = 200;
const GAP = 20;
const cardX = (i: number) => MARGIN + i * (CARD_W + GAP);
const CARD_Y = 78;
const CARD_H = 420;

interface SusCard {
  name: string;
  en: string;
  color: string;
  schematic: "macpherson" | "multilink" | "air";
  spring: string;
  features: string[];
  useCase: string;
}

const CARDS: readonly SusCard[] = [
  {
    name: "麦弗逊",
    en: "MacPherson",
    color: success,
    schematic: "macpherson",
    spring: "螺旋弹簧 + 液压减振器",
    features: ["结构简单紧凑", "占用空间小", "成本低 / 维护易"],
    useCase: "前驱车前悬 · 经济型车",
  },
  {
    name: "多连杆",
    en: "Multi-link",
    color: accent,
    schematic: "multilink",
    spring: "螺旋弹簧 + 多连杆",
    features: ["轮迹控制精确", "操控与舒适兼顾", "结构较复杂"],
    useCase: "中高端车 · 后悬常见",
  },
  {
    name: "空气悬架",
    en: "Air Suspension",
    color: warning,
    schematic: "air",
    spring: "空气弹簧（气囊）",
    features: ["车身高度可调", "滤振舒适极佳", "成本高 / 维护贵"],
    useCase: "豪华车 · SUV · MPV",
  },
];

// 螺旋弹簧：折线
function CoilSpring({ x, y0, y1, amp }: { x: number; y0: number; y1: number; amp: number }) {
  const step = 8;
  let d = `M ${x} ${y0}`;
  for (let y = y0 + step; y <= y1; y += step) {
    const side = ((y - y0) / step) % 2 === 1 ? amp : -amp;
    d += ` L ${x + side} ${y}`;
  }
  d += ` L ${x} ${y1}`;
  return <path d={d} fill="none" stroke="var(--text-primary)" strokeWidth="1.3" />;
}

function Schematic({ type, ox, oy, color }: { type: SusCard["schematic"]; ox: number; oy: number; color: string }) {
  if (type === "macpherson") {
    return (
      <g>
        {/* 车身（上安装点） */}
        <line x1={ox + 30} y1={oy} x2={ox + 140} y2={oy} stroke={primary} strokeWidth="2" />
        {/* 减振器支柱 */}
        <rect x={ox + 86} y={oy + 4} width="8" height="78" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.3" />
        <CoilSpring x={ox + 90} y0={oy + 6} y1={oy + 76} amp={8} />
        {/* 下摆臂（L 形） */}
        <line x1={ox + 44} y1={oy + 96} x2={ox + 90} y2={oy + 84} stroke={primary} strokeWidth="1.8" />
        <line x1={ox + 44} y1={oy + 96} x2={ox + 44} y2={oy + 104} stroke={primary} strokeWidth="1.8" />
        {/* 转向节 → 轮毂 */}
        <line x1={ox + 90} y1={oy + 84} x2={ox + 108} y2={oy + 96} stroke={primary} strokeWidth="1.8" />
        {/* 车轮 */}
        <circle cx={ox + 118} cy={oy + 104} r="18" fill="none" stroke={primary} strokeWidth="2" />
        <circle cx={ox + 118} cy={oy + 104} r="7" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
        {/* 地面 */}
        <line x1={ox + 24} y1={oy + 124} x2={ox + 146} y2={oy + 124} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
      </g>
    );
  }
  if (type === "multilink") {
    return (
      <g>
        {/* 副车架（上下两横） */}
        <line x1={ox + 30} y1={oy} x2={ox + 140} y2={oy} stroke={primary} strokeWidth="2" />
        <line x1={ox + 36} y1={oy + 96} x2={ox + 96} y2={oy + 96} stroke={primary} strokeWidth="1.8" />
        {/* 螺旋弹簧 + 减振器 */}
        <rect x={ox + 70} y={oy + 4} width="7" height="72" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.3" />
        <CoilSpring x={ox + 74} y0={oy + 6} y1={oy + 72} amp={7} />
        {/* 多根连杆 */}
        <line x1={ox + 44} y1={oy + 96} x2={ox + 96} y2={oy + 84} stroke={color} strokeWidth="1.6" />
        <line x1={ox + 60} y1={oy + 96} x2={ox + 98} y2={oy + 78} stroke={color} strokeWidth="1.6" />
        <line x1={ox + 80} y1={oy + 96} x2={ox + 100} y2={oy + 72} stroke={color} strokeWidth="1.6" />
        <line x1={ox + 92} y1={oy + 96} x2={ox + 102} y2={oy + 70} stroke={color} strokeWidth="1.6" />
        {/* 轮毂节点 */}
        <circle cx={ox + 100} cy={oy + 80} r="3" fill={color} />
        {/* 车轮 */}
        <circle cx={ox + 118} cy={oy + 104} r="18" fill="none" stroke={primary} strokeWidth="2" />
        <circle cx={ox + 118} cy={oy + 104} r="7" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
        <line x1={ox + 24} y1={oy + 124} x2={ox + 146} y2={oy + 124} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
      </g>
    );
  }
  // air
  return (
    <g>
      {/* 车身 */}
      <line x1={ox + 30} y1={oy} x2={ox + 140} y2={oy} stroke={primary} strokeWidth="2" />
      {/* 空气弹簧（气囊，鼓肚形） */}
      <path
        d={`M ${ox + 82} ${oy + 4} L ${ox + 78} ${oy + 20} C ${ox + 66} ${oy + 32}, ${ox + 66} ${oy + 52}, ${ox + 78} ${oy + 64} L ${ox + 82} ${oy + 78} L ${ox + 100} ${oy + 78} L ${ox + 104} ${oy + 64} C ${ox + 116} ${oy + 52}, ${ox + 116} ${oy + 32}, ${ox + 104} ${oy + 20} L ${ox + 100} ${oy + 4} Z`}
        fill={color}
        fillOpacity="0.16"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* 气囊皱褶 */}
      <line x1={ox + 74} y1={oy + 30} x2={ox + 108} y2={oy + 30} stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1={ox + 74} y1={oy + 50} x2={ox + 108} y2={oy + 50} stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
      {/* 下摆臂 */}
      <line x1={ox + 44} y1={oy + 96} x2={ox + 90} y2={oy + 84} stroke={primary} strokeWidth="1.8" />
      <line x1={ox + 90} y1={oy + 84} x2={ox + 108} y2={oy + 96} stroke={primary} strokeWidth="1.8" />
      {/* 车轮 */}
      <circle cx={ox + 118} cy={oy + 104} r="18" fill="none" stroke={primary} strokeWidth="2" />
      <circle cx={ox + 118} cy={oy + 104} r="7" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.2" />
      <line x1={ox + 24} y1={oy + 124} x2={ox + 146} y2={oy + 124} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
      {/* 高度可调箭头 */}
      <line x1={ox + 138} y1={oy + 30} x2={ox + 138} y2={oy + 60} stroke={color} strokeWidth="1.4" markerEnd="url(#ass-air-arrow)" />
      <line x1={ox + 144} y1={oy + 60} x2={ox + 144} y2={oy + 30} stroke={color} strokeWidth="1.4" markerEnd="url(#ass-air-arrow)" />
      <text x={ox + 152} y={oy + 48} fontSize="11" fill={color}>可调</text>
    </g>
  );
}

export function AssSuspensionSystemsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="悬架系统对比。三种悬架并排：麦弗逊（绿色，螺旋弹簧加液压减振器一体支柱，结构简单紧凑，前驱前悬常用）；多连杆（紫色，多根连杆精确控制轮迹，操控与舒适兼顾，中高端车后悬常见）；空气悬架（黄色，空气弹簧替代螺旋弹簧，高度可调舒适极佳，豪华车装配）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ass-air-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0 0 L5 3 L0 6 z" fill={warning} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            三种悬架 · 结构与特性对比
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill={secondary}>
            麦弗逊 · 多连杆 · 空气悬架，弹簧类型决定舒适与可调性
          </text>

          {/* 三张卡片 */}
          {CARDS.map((c, i) => {
            const cx = cardX(i);
            return (
              <g key={c.name}>
                <rect x={cx} y={CARD_Y} width={CARD_W} height={CARD_H} rx="10" fill={c.color} fillOpacity="0.04" stroke={border} strokeWidth="1.2" />
                {/* 标题栏 */}
                <rect x={cx} y={CARD_Y} width={CARD_W} height="32" rx="10" fill={c.color} fillOpacity="0.14" />
                <rect x={cx} y={CARD_Y + 18} width={CARD_W} height="14" fill={c.color} fillOpacity="0.14" />
                <text x={cx + CARD_W / 2} y={CARD_Y + 21} textAnchor="middle" fontSize="14" fontWeight="700" fill={c.color}>{c.name}</text>
                <text x={cx + CARD_W / 2} y={CARD_Y + 44} textAnchor="middle" fontSize="11" fill={secondary}>{c.en}</text>

                {/* 结构简图 */}
                <rect x={cx + 12} y={CARD_Y + 52} width={CARD_W - 24} height="140" rx="6" fill="none" stroke={border} strokeWidth="1" strokeDasharray="3 2" />
                <Schematic type={c.schematic} ox={cx + 22} oy={CARD_Y + 72} color={c.color} />
                <text x={cx + CARD_W / 2} y={CARD_Y + 208} textAnchor="middle" fontSize="11" fill={secondary}>侧视结构简图</text>

                {/* 弹簧类型 */}
                <line x1={cx + 14} y1={CARD_Y + 222} x2={cx + CARD_W - 14} y2={CARD_Y + 222} stroke={border} strokeWidth="1" />
                <text x={cx + 14} y={CARD_Y + 242} fontSize="12" fontWeight="700" fill={c.color}>弹簧类型</text>
                <text x={cx + 14} y={CARD_Y + 260} fontSize="11" fill={primary}>{c.spring}</text>

                {/* 特点 */}
                <text x={cx + 14} y={CARD_Y + 284} fontSize="12" fontWeight="700" fill={secondary}>特点</text>
                {c.features.map((f, fi) => (
                  <text key={f} x={cx + 14} y={CARD_Y + 304 + fi * 18} fontSize="11" fill={primary}>· {f}</text>
                ))}

                {/* 适用车型 */}
                <line x1={cx + 14} y1={CARD_Y + 366} x2={cx + CARD_W - 14} y2={CARD_Y + 366} stroke={border} strokeWidth="1" />
                <text x={cx + 14} y={CARD_Y + 386} fontSize="12" fontWeight="700" fill={secondary}>适用车型</text>
                <text x={cx + 14} y={CARD_Y + 406} fontSize="11" fill={primary}>{c.useCase}</text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={40} y1={516} x2={VIEW_W - 40} y2={516} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={540} textAnchor="middle" fontSize="12" fill={secondary}>
            麦弗逊胜在紧凑 · 多连杆胜在精确 · 空气悬架胜在可调与舒适
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种悬架对比：麦弗逊（螺旋弹簧+减振器一体支柱，简单紧凑，前驱前悬常用）、多连杆（多连杆精确控制轮迹，操控舒适兼顾，中高端后悬）、空气悬架（空气弹簧替代螺旋弹簧，高度可调舒适极佳，豪华车装配）。
      </figcaption>
    </figure>
  );
}
