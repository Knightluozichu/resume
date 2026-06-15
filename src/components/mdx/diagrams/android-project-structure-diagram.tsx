/**
 * <AndroidProjectStructureDiagram />：《Android 编程权威指南》first-app 章「项目结构」配图（HEL-171）。
 *
 * 画面内容：Android Studio 项目目录树的树状解剖图。
 *  - app/ 模块根，向下展开 manifests / java / res / Gradle Scripts 四大块。
 *  - 每个关键节点右侧用注释框标「装什么」（manifests=组件声明与权限，res/layout=UI 布局 XML …）。
 *  - 树状缩进 + 折线连接（竖干 + 横枝），层级靠 x 缩进表达。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：全部 DESIGN token 配色（accent / success / warning / border / text-*），
 * 无裸 hex，rx 圆角，无阴影（硬规则 5）。
 */

// —— 树节点：depth = 缩进层级；kind 决定配色 token；note = 右侧「装什么」注释（可选）。 ——
type TreeNode = {
  /** 显示文本（目录名 / 文件名）。 */
  label: string;
  /** 缩进层级（0 = app/ 根）。 */
  depth: number;
  /** 配色语义：dir 目录用 accent，file 文件用 text-primary，group 分组标题用 success。 */
  kind: "root" | "dir" | "file" | "group";
  /** 右侧「装什么」注释；缺省则不画注释框。 */
  note?: string;
};

const NODES: readonly TreeNode[] = [
  { label: "app/", depth: 0, kind: "root", note: "应用模块（你的代码与资源都在这里）" },
  { label: "manifests/", depth: 1, kind: "dir" },
  { label: "AndroidManifest.xml", depth: 2, kind: "file", note: "组件声明与权限：应用「身份证」" },
  { label: "java/", depth: 1, kind: "dir" },
  { label: "com.example.app/", depth: 2, kind: "dir" },
  { label: "MainActivity.kt", depth: 3, kind: "file", note: "Kotlin 源码：界面的「大脑」" },
  { label: "res/", depth: 1, kind: "dir", note: "资源目录（与代码分开管理）" },
  { label: "layout/", depth: 2, kind: "dir", note: "UI 布局 XML：界面长什么样" },
  { label: "values/", depth: 2, kind: "dir", note: "字符串 / 颜色等常量" },
  { label: "drawable/", depth: 2, kind: "dir", note: "矢量图 / 图片资源" },
  { label: "mipmap/", depth: 2, kind: "dir", note: "应用启动图标（多分辨率）" },
  { label: "Gradle Scripts", depth: 1, kind: "group", note: "构建脚本（怎么编、依赖谁）" },
  { label: "build.gradle.kts (项目级)", depth: 2, kind: "file", note: "全局插件与仓库配置" },
  { label: "build.gradle.kts (模块级)", depth: 2, kind: "file", note: "本模块 SDK 版本与依赖" },
  { label: "settings.gradle.kts", depth: 2, kind: "file", note: "声明工程包含哪些模块" },
];

// —— 布局常量（间距走 4 倍数语言：行高 32，缩进 28，左边距 24）。 ——
const ROW_H = 32;
const INDENT = 28;
const X0 = 24; // 第一列文本左边距
const TOP = 44; // 第一行 baseline 之上的标题留白
const ICON_W = 16; // 行首图标占位宽
const NOTE_X = 300; // 右侧注释框统一左对齐起点
const NOTE_W = 252;
const NOTE_H = 22;
const VIEW_W = 580;
const VIEW_H = TOP + NODES.length * ROW_H + 16;

/** 行首文本 x（按缩进推进）。 */
function rowTextX(depth: number): number {
  return X0 + depth * INDENT + ICON_W;
}

/** 该节点的语义配色 token。 */
function nodeColor(kind: TreeNode["kind"]): string {
  if (kind === "root") return "var(--accent)";
  if (kind === "dir") return "var(--accent)";
  if (kind === "group") return "var(--success)";
  return "var(--text-primary)";
}

export function AndroidProjectStructureDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android Studio 项目目录树解剖图。根是 app 模块，向下分四块：manifests 目录下有 AndroidManifest.xml（组件声明与权限，应用身份证）；java 目录下是包 com.example.app，里面有 MainActivity.kt（Kotlin 源码，界面的大脑）；res 资源目录下有 layout（UI 布局 XML，界面长什么样）、values（字符串与颜色常量）、drawable（图片资源）、mipmap（应用启动图标）；Gradle Scripts 分组下有项目级 build.gradle.kts（全局插件与仓库）、模块级 build.gradle.kts（本模块 SDK 版本与依赖）、settings.gradle.kts（声明工程包含哪些模块）。每个关键节点右侧标注它装什么。"
          className="mx-auto block h-auto w-full max-w-[580px]"
        >
          {/* 标题 */}
          <text
            x={X0}
            y="26"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            项目结构：app 模块的目录树
          </text>

          {/* —— 树状连线：每个非根节点画一条「从父级竖干引出的横枝」。 —— */}
          {NODES.map((n, i) => {
            if (n.depth === 0) return null;
            const y = TOP + i * ROW_H + ROW_H / 2;
            // 竖干 x：父级缩进列中心；横枝从竖干到本行文本左侧。
            const trunkX = X0 + (n.depth - 1) * INDENT + ICON_W / 2;
            const branchEndX = X0 + n.depth * INDENT + ICON_W / 2 - 2;
            // 找上一个 depth = n.depth-1 的父节点行号，竖干从父行中心延到本行中心。
            let parentRow = i - 1;
            for (let k = i - 1; k >= 0; k--) {
              if (NODES[k].depth === n.depth - 1) {
                parentRow = k;
                break;
              }
            }
            const parentY = TOP + parentRow * ROW_H + ROW_H / 2;
            return (
              <g key={`edge-${n.label}-${i}`}>
                <line
                  x1={trunkX}
                  y1={parentY}
                  x2={trunkX}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <line
                  x1={trunkX}
                  y1={y}
                  x2={branchEndX}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
              </g>
            );
          })}

          {/* —— 节点行：图标点 + 标签 + 右侧「装什么」注释框 —— */}
          {NODES.map((n, i) => {
            const y = TOP + i * ROW_H + ROW_H / 2;
            const tx = rowTextX(n.depth);
            const color = nodeColor(n.kind);
            const isFile = n.kind === "file";
            const iconCx = tx - ICON_W / 2 - 2;
            return (
              <g key={`node-${n.label}-${i}`}>
                {/* 行首图标：目录用实心圆点（accent/success），文件用空心方块 */}
                {isFile ? (
                  <rect
                    x={iconCx - 4}
                    y={y - 4}
                    width="8"
                    height="8"
                    rx="2"
                    fill="var(--bg)"
                    stroke="var(--text-secondary)"
                    strokeWidth="1.2"
                  />
                ) : (
                  <circle cx={iconCx} cy={y} r="4" fill={color} opacity="0.9" />
                )}
                {/* 标签文本 */}
                <text
                  x={tx}
                  y={y + 4}
                  fontSize={n.kind === "root" || n.kind === "group" ? 13 : 12}
                  fontWeight={n.kind === "root" || n.kind === "group" ? 700 : 500}
                  fontFamily={isFile ? "var(--font-mono)" : undefined}
                  fill={n.kind === "file" ? "var(--text-primary)" : color}
                >
                  {n.label}
                </text>

                {/* 右侧「装什么」注释框（有 note 才画） + 一条引导虚线 */}
                {n.note && (
                  <>
                    <line
                      x1={tx + n.label.length * 6.4 + 10}
                      y1={y}
                      x2={NOTE_X - 6}
                      y2={y}
                      stroke="var(--border)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.7"
                    />
                    <rect
                      x={NOTE_X}
                      y={y - NOTE_H / 2}
                      width={NOTE_W}
                      height={NOTE_H}
                      rx="6"
                      fill={color}
                      fillOpacity="0.08"
                      stroke={color}
                      strokeWidth="1"
                      opacity="0.85"
                    />
                    <text
                      x={NOTE_X + 10}
                      y={y + 3.5}
                      fontSize="10"
                      fill="var(--text-secondary)"
                    >
                      {n.note}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android Studio 项目「三间房 + 一份脚本」：manifests 放清单（身份证）、java
        放 Kotlin 代码、res 放资源（布局 / 值 / 图片 / 图标），Gradle Scripts
        决定怎么把它们编成 APK。
      </figcaption>
    </figure>
  );
}
