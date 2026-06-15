/**
 * <ResourceQualifierDiagram />：《Android 编程权威指南》intent-data/localization 章
 * 「资源限定符如何在运行时被解析」配图（HEL-186）。
 *
 * 画面内容：左边一棵 res/ 目录树，并列若干带限定符的资源目录（values/ 默认、
 * values-zh-rCN/、values-es/，以及 drawable-hdpi/ / drawable-xxhdpi/ 等示例），
 * 每个目录里有 strings.xml。右边一台「设备」标注当前配置（Locale=西班牙语 es、
 * 密度=xxhdpi）。中间用箭头表达系统运行时的解析/回退链：
 *  设备配置 → 在所有候选限定符目录里匹配最佳 → 命中 values-es/strings.xml（--success 高亮）；
 *  若没有任何匹配 → 回退默认 values/（--text-secondary）。
 * 额外标注：限定符优先级（地区完全匹配 > 仅语言 > 默认）、找不到就回退默认、
 * 代码里 @string/app_name 不变（运行期按配置自动换目录）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无动画）。
 * 视觉语言：全部 DESIGN token 配色（默认目录 --text-secondary / 命中目录 --success /
 * 设备 --accent），无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 左侧 res/ 下的候选资源目录：label = 目录名；hit 标记运行时命中的那个；fallback 标记默认目录。 ——
type ResDir = {
  /** 目录名（带限定符后缀）。 */
  label: string;
  /** 一句话说明这个限定符匹配什么配置。 */
  note: string;
  /** 运行时是否被选中（命中走 --success 高亮）。 */
  hit?: boolean;
  /** 是否默认目录（无匹配时的回退，走 --text-secondary）。 */
  fallback?: boolean;
};

const RES_DIRS: readonly ResDir[] = [
  { label: "values/", note: "默认 · 无匹配时回退到这里", fallback: true },
  { label: "values-zh-rCN/", note: "中文（中国大陆）" },
  { label: "values-es/", note: "西班牙语 · 与设备 Locale 命中", hit: true },
  { label: "drawable-hdpi/", note: "高密度图片资源" },
  { label: "drawable-xxhdpi/", note: "超高密度 · 与设备密度命中", hit: true },
];

// —— 设备当前配置：决定解析时拿哪些限定符去匹配。 ——
const DEVICE_CONFIG: readonly { key: string; value: string }[] = [
  { key: "Locale", value: "es（西班牙语）" },
  { key: "密度", value: "xxhdpi" },
];

// —— 布局常量（间距走 4 的倍数语言）。 ——
const VIEW_W = 760;
const TOP = 64; // 标题区留白
const DIR_X = 24; // 左侧目录列左边距
const DIR_W = 288; // 目录卡宽
const DIR_H = 48; // 目录卡高（含目录名 + strings.xml 子项 + 注释）
const DIR_GAP = 12; // 目录卡之间竖向间距
const TREE_X = 16; // res/ 竖干 x
const DEVICE_X = 524; // 右侧设备框左边距
const DEVICE_W = 212; // 设备框宽
const DEVICE_Y = 96; // 设备框顶部 y
const DEVICE_H = 132; // 设备框高
const ROW_H = 24; // 设备配置行高
const RESOLVER_Y = 296; // 底部「解析/回退」说明带 y
const RESOLVER_H = 96; // 说明带高
const VIEW_H = 416;

/** 第 i 个目录卡的顶部 y。 */
function dirTop(i: number): number {
  return TOP + 16 + i * (DIR_H + DIR_GAP);
}

/** 目录卡的语义配色 token：命中 → success，默认回退 → text-secondary，其余候选 → border 中性。 */
function dirColor(d: ResDir): string {
  if (d.hit) return "var(--success)";
  if (d.fallback) return "var(--text-secondary)";
  return "var(--border)";
}

export function ResourceQualifierDiagram() {
  // 命中目录中心 y（用于从设备引一条命中箭头）。取第一个 hit 的 values-es/。
  const hitIndex = RES_DIRS.findIndex((d) => d.hit);
  const hitMidY = dirTop(hitIndex) + DIR_H / 2;
  // 默认目录中心 y（回退箭头落点）。
  const fbIndex = RES_DIRS.findIndex((d) => d.fallback);
  const fbMidY = dirTop(fbIndex) + DIR_H / 2;
  // 设备框右缘中点（箭头出发点）。
  const deviceMidY = DEVICE_Y + DEVICE_H / 2;
  const dirRightX = DIR_X + DIR_W;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="本地化资源限定符的运行时解析与回退图。左边是 res 目录树，并列若干候选资源目录，每个目录里都有 strings.xml：values 是默认目录（无匹配时回退到这里），values-zh-rCN 对应中文中国大陆，values-es 对应西班牙语，drawable-hdpi 是高密度图片资源，drawable-xxhdpi 是超高密度图片资源。右边是一台设备，标注当前配置：Locale 等于 es 西班牙语，密度等于 xxhdpi。中间箭头表示系统运行时的解析过程：拿设备配置去所有候选限定符目录里匹配最佳的那个，Locale 等于 es 命中 values-es 目录的 strings.xml（绿色高亮选中），密度 xxhdpi 命中 drawable-xxhdpi。匹配优先级从高到低是：语言加地区完全匹配，仅语言匹配，最后是默认值。如果没有任何限定符目录匹配，就回退到默认的 values 目录。代码里始终写 at string 斜杠 app_name 这样的引用不变，运行期由系统按设备配置自动选择对应目录，开发者不手动判断语言。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* —— 标题 —— */}
          <text
            x={DIR_X}
            y="28"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            资源限定符：运行时按设备配置自动选目录，匹配不到就回退默认
          </text>
          <text
            x={DIR_X}
            y="48"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            代码里只写 @string/app_name —— 选哪个目录由系统在运行期按配置决定
          </text>

          {/* —— 左侧 res/ 根标签 + 竖干 —— */}
          <text
            x={TREE_X}
            y={TOP + 4}
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            res/
          </text>
          <line
            x1={TREE_X + 4}
            y1={TOP + 12}
            x2={TREE_X + 4}
            y2={dirTop(RES_DIRS.length - 1) + DIR_H / 2}
            stroke="var(--border)"
            strokeWidth="1.4"
          />

          {/* —— 候选资源目录卡 —— */}
          {RES_DIRS.map((d, i) => {
            const y = dirTop(i);
            const midY = y + DIR_H / 2;
            const color = dirColor(d);
            const isHit = !!d.hit;
            // 从竖干引一条横枝到目录卡左缘。
            return (
              <g key={d.label}>
                <line
                  x1={TREE_X + 4}
                  y1={midY}
                  x2={DIR_X - 2}
                  y2={midY}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <rect
                  x={DIR_X}
                  y={y}
                  width={DIR_W}
                  height={DIR_H}
                  rx="8"
                  fill={isHit ? "var(--success)" : "var(--bg)"}
                  fillOpacity={isHit ? "0.12" : "1"}
                  stroke={color}
                  strokeWidth={isHit ? "1.6" : "1.2"}
                />
                {/* 目录名 */}
                <text
                  x={DIR_X + 16}
                  y={y + 20}
                  fontSize="11.5"
                  fontWeight={isHit || d.fallback ? "700" : "600"}
                  fontFamily="var(--font-mono)"
                  fill={
                    isHit
                      ? "var(--success)"
                      : d.fallback
                        ? "var(--text-secondary)"
                        : "var(--text-primary)"
                  }
                >
                  {d.label}
                </text>
                {/* strings.xml 子项（缩进 + 文件方块图标） */}
                <rect
                  x={DIR_X + 20}
                  y={y + 28}
                  width="8"
                  height="8"
                  rx="2"
                  fill="var(--bg)"
                  stroke="var(--text-secondary)"
                  strokeWidth="1.2"
                />
                <text
                  x={DIR_X + 34}
                  y={y + 35}
                  fontSize="9.5"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  strings.xml
                </text>
                {/* 右侧一句话说明（紧贴卡右内缘） */}
                <text
                  x={DIR_X + DIR_W - 12}
                  y={y + 31}
                  textAnchor="end"
                  fontSize="9"
                  fill={isHit ? "var(--success)" : "var(--text-secondary)"}
                >
                  {d.note}
                </text>
                {/* 命中目录右上角「选中」徽标 */}
                {isHit && (
                  <text
                    x={DIR_X + DIR_W - 12}
                    y={y + 16}
                    textAnchor="end"
                    fontSize="9"
                    fontWeight="700"
                    fill="var(--success)"
                  >
                    ✓ 选中
                  </text>
                )}
              </g>
            );
          })}

          {/* —— 右侧设备框（当前配置） —— */}
          <rect
            x={DEVICE_X}
            y={DEVICE_Y}
            width={DEVICE_W}
            height={DEVICE_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          {/* 设备「听筒」装饰条 */}
          <rect
            x={DEVICE_X + DEVICE_W / 2 - 16}
            y={DEVICE_Y + 12}
            width="32"
            height="4"
            rx="2"
            fill="var(--accent)"
            opacity="0.6"
          />
          <text
            x={DEVICE_X + DEVICE_W / 2}
            y={DEVICE_Y + 36}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            设备当前配置
          </text>
          {DEVICE_CONFIG.map((c, i) => {
            const ry = DEVICE_Y + 52 + i * ROW_H;
            return (
              <g key={c.key}>
                <text
                  x={DEVICE_X + 20}
                  y={ry + 14}
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {c.key}
                </text>
                <text
                  x={DEVICE_X + DEVICE_W - 20}
                  y={ry + 14}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {c.value}
                </text>
              </g>
            );
          })}
          <text
            x={DEVICE_X + DEVICE_W / 2}
            y={DEVICE_Y + DEVICE_H - 12}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            系统据此挑限定符目录
          </text>

          {/* —— 命中箭头：设备 → values-es/（success 实线） —— */}
          <path
            d={`M ${DEVICE_X} ${deviceMidY}
                C ${DEVICE_X - 64} ${deviceMidY},
                  ${dirRightX + 64} ${hitMidY},
                  ${dirRightX + 8} ${hitMidY}`}
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.8"
          />
          <path
            d={`M ${dirRightX + 8} ${hitMidY}
                l 8 -4
                l 0 8 Z`}
            fill="var(--success)"
          />
          <text
            x={dirRightX + 80}
            y={hitMidY - 8}
            fontSize="9.5"
            fontWeight="600"
            fill="var(--success)"
          >
            匹配最佳限定符 → 命中
          </text>

          {/* —— 回退箭头：设备 → 默认 values/（虚线，无匹配时） —— */}
          <path
            d={`M ${DEVICE_X} ${deviceMidY + 24}
                C ${DEVICE_X - 96} ${deviceMidY + 24},
                  ${dirRightX + 96} ${fbMidY},
                  ${dirRightX + 8} ${fbMidY}`}
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <path
            d={`M ${dirRightX + 8} ${fbMidY}
                l 8 -4
                l 0 8 Z`}
            fill="var(--text-secondary)"
          />
          <text
            x={dirRightX + 96}
            y={fbMidY - 8}
            fontSize="9.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            都不匹配 → 回退默认
          </text>

          {/* —— 底部：解析优先级说明带 —— */}
          <rect
            x={DIR_X}
            y={RESOLVER_Y}
            width={VIEW_W - DIR_X * 2}
            height={RESOLVER_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.3"
          />
          <text
            x={DIR_X + 16}
            y={RESOLVER_Y + 22}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            限定符匹配优先级（最具体匹配优先）
          </text>
          <text
            x={DIR_X + 16}
            y={RESOLVER_Y + 44}
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            语言+地区完全匹配（values-es-rES）
            <tspan fill="var(--accent)">{"  >  "}</tspan>
            仅语言匹配（values-es）
            <tspan fill="var(--accent)">{"  >  "}</tspan>
            默认（values）
          </text>
          <text
            x={DIR_X + 16}
            y={RESOLVER_Y + 66}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            • 设备 Locale=es 时优先命中 values-es/；连默认都缺该条目才会报缺资源
          </text>
          <text
            x={DIR_X + 16}
            y={RESOLVER_Y + 84}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            • 改语言只新增一个限定符目录，代码与 layout 的 @string 引用一行都不用动
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        系统在运行期拿设备配置（<code> Locale </code>、屏幕密度等）去所有候选限定符目录里挑
        <strong> 最具体匹配 </strong>的那个：西班牙语设备命中
        <code> values-es/strings.xml</code>、超高密度屏命中
        <code> drawable-xxhdpi/</code>；任何一项匹配不到就回退默认
        <code> values/</code>。代码里 <code>@string/app_name </code>始终不变——换语言只是多加一个目录。
      </figcaption>
    </figure>
  );
}
