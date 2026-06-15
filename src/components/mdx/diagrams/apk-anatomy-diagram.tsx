/**
 * <ApkAnatomyDiagram />：《Android 编程权威指南》first-app 章「APK 是什么」配图（HEL-171）。
 *
 * 画面内容：把 APK 画成一个剖开的 ZIP 容器（左侧掀开的「盖子」+ 右侧分层内胆），
 * 内部逐块列出 APK 的组成，每块右侧标注用途：
 *  - classes.dex（Dalvik/ART 字节码）
 *  - resources.arsc（编译后的资源表）
 *  - res/（图片 / 布局等资源）
 *  - assets/（原始资源，原样打包）
 *  - lib/（.so 原生库，按 ABI 分目录）
 *  - AndroidManifest.xml（二进制清单）
 *  - META-INF/（签名信息）
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影（硬规则 5）。
 */

// —— APK 内部分块：color 为语义色 token，note 为「装什么 / 用途」。 ——
type ApkEntry = {
  /** 条目名（zip 内路径 / 文件名）。 */
  name: string;
  /** 用途说明。 */
  note: string;
  /** 该块语义色 token。 */
  color: string;
};

const ENTRIES: readonly ApkEntry[] = [
  {
    name: "classes.dex",
    note: "编译后的字节码（ART 运行的就是它）",
    color: "var(--accent)",
  },
  {
    name: "resources.arsc",
    note: "编译后的资源表（id → 资源的映射）",
    color: "var(--accent)",
  },
  {
    name: "res/",
    note: "图片 / 布局等资源（已编译为二进制）",
    color: "var(--accent)",
  },
  {
    name: "assets/",
    note: "原始资源：按原样打包，按文件名读取",
    color: "var(--text-primary)",
  },
  {
    name: "lib/",
    note: "原生库 .so（按 ABI 分目录，如 arm64-v8a）",
    color: "var(--warning)",
  },
  {
    name: "AndroidManifest.xml",
    note: "二进制清单：组件声明与权限",
    color: "var(--warning)",
  },
  {
    name: "META-INF/",
    note: "签名信息：证书与各文件摘要",
    color: "var(--success)",
  },
];

// —— 布局常量（间距走 4 倍数）。 ——
const ROW_H = 36;
const GAP = 6;
const BOX_X = 150; // 内胆条目左边距（盖子在其左侧）
const BOX_W = 188; // 条目块宽
const NOTE_X = BOX_X + BOX_W + 16; // 右侧注释起点
const TOP = 56;
const VIEW_W = 580;
const VIEW_H = TOP + ENTRIES.length * (ROW_H + GAP) + 20;

export function ApkAnatomyDiagram() {
  // 内胆整体高度（含上下 padding），用于画 ZIP「容器外壳」。
  const shellTop = TOP - 12;
  const shellH = ENTRIES.length * (ROW_H + GAP) - GAP + 24;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="APK 解剖图。APK 本质是一个 zip 压缩包，画成一个剖开的容器。内部从上到下分块列出组成：classes.dex（编译后的字节码，ART 运行的就是它）、resources.arsc（编译后的资源表，id 到资源的映射）、res 目录（图片与布局等已编译为二进制的资源）、assets 目录（原始资源，按原样打包按文件名读取）、lib 目录（原生库 .so，按 ABI 分目录如 arm64-v8a）、AndroidManifest.xml（二进制清单，组件声明与权限）、META-INF 目录（签名信息，证书与各文件摘要）。每块右侧标注它的用途。"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          {/* 标题 */}
          <text
            x="24"
            y="26"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            APK 解剖：一个剖开的 zip 压缩包
          </text>
          <text
            x="24"
            y="42"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            把 .apk 后缀改成 .zip 就能直接解压，里面是这些东西
          </text>

          {/* —— ZIP 容器外壳（内胆边框）+ 左侧掀开的「盖子」—— */}
          <rect
            x={BOX_X - 16}
            y={shellTop}
            width={BOX_W + 28}
            height={shellH}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 掀开的盖子（左侧斜置面板，虚线表示「被剖开」） */}
          <path
            d={`M ${BOX_X - 16} ${shellTop}
                L ${BOX_X - 92} ${shellTop + 18}
                L ${BOX_X - 92} ${shellTop + shellH - 18}
                L ${BOX_X - 16} ${shellTop + shellH} Z`}
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text
            x={BOX_X - 54}
            y={shellTop + shellH / 2 - 6}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            MyApp
          </text>
          <text
            x={BOX_X - 54}
            y={shellTop + shellH / 2 + 12}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            .apk
          </text>
          <text
            x={BOX_X - 54}
            y={shellTop + shellH / 2 + 30}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            （= zip）
          </text>

          {/* —— 内部条目块 + 右侧用途注释 —— */}
          {ENTRIES.map((e, i) => {
            const y = TOP + i * (ROW_H + GAP);
            const cy = y + ROW_H / 2;
            return (
              <g key={e.name}>
                {/* 条目块 */}
                <rect
                  x={BOX_X}
                  y={y}
                  width={BOX_W}
                  height={ROW_H}
                  rx="6"
                  fill={e.color}
                  fillOpacity="0.1"
                  stroke={e.color}
                  strokeWidth="1.3"
                />
                {/* 左侧色条（强调语义色） */}
                <rect
                  x={BOX_X}
                  y={y}
                  width="4"
                  height={ROW_H}
                  rx="2"
                  fill={e.color}
                />
                {/* 条目名 */}
                <text
                  x={BOX_X + 14}
                  y={cy + 4}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {e.name}
                </text>
                {/* 引导虚线 → 用途注释 */}
                <line
                  x1={BOX_X + BOX_W}
                  y1={cy}
                  x2={NOTE_X - 6}
                  y2={cy}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.7"
                />
                <text
                  x={NOTE_X}
                  y={cy + 4}
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {e.note}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        APK 就是一个 zip 包：字节码（classes.dex）、资源表（resources.arsc）、res /
        assets / lib 各类资源、二进制清单和 META-INF 签名，全压在一起。安装时系统把它解开铺到设备上。
      </figcaption>
    </figure>
  );
}
