/**
 * <SetupPipelineDiagram>：「你好窗口」§3 的管线位置示意图（HEL-40）。
 *
 * 取代原先误用首页跑车海报当占位图的 <Figure src="/hero-poster.webp" .../>。
 * 准确表达本章四个角色 + 「渲染循环包住整体、每帧重复」的关系：
 *  ③ 渲染循环 = 最外层圆角虚线框 + 右侧循环回箭头（⟳，每帧重复）
 *  框内左→右流程：② WebGL2 上下文 gl —命令→ GPU —输出→ ① canvas 画板（显示器矩形）
 *  ④ 每帧：清屏 → 绘制 = 框内底部标注
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与 stepper.tsx 行内 SVG 一致：token 色（var(--accent) / --border / --bg /
 * --bg-elevated / --text-primary / --text-secondary）、简洁线框、rx 圆角、无阴影（硬规则 5）。
 * 响应式：max-width 居中、宽度自适应正文栏。
 */

export function SetupPipelineDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 300"
          role="img"
          aria-label="渲染循环作为最外层包住整个流程、每帧重复：循环框内从左到右是 WebGL2 上下文 gl 把命令发给 GPU、GPU 输出到 canvas 画板；每一帧先清屏再绘制"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ③ 渲染循环：最外层圆角虚线框，包住整个流程 */}
          <rect
            x="20"
            y="44"
            width="600"
            height="216"
            rx="12"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          {/* 循环框左上角标签：③ 渲染循环（每帧重复） */}
          <text
            x="36"
            y="32"
            fontSize="15"
            fontWeight="600"
            fill="var(--accent)"
          >
            ③ 渲染循环（每帧重复）
          </text>

          {/* 右上角循环回箭头 ⟳：从框右上弯回，表达「每帧重复」 */}
          <path
            d="M584 30 a18 18 0 1 1 -13 -5"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M566 18 l8 8 l-10 4 z" fill="var(--accent)" />

          {/* ② WebGL2 上下文 gl：贴 GPU 的「画笔/总开关」 */}
          <rect
            x="48"
            y="96"
            width="148"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="122"
            y="126"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ② WebGL2 上下文
          </text>
          <text
            x="122"
            y="148"
            textAnchor="middle"
            fontSize="13"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            gl（画笔 / 总开关）
          </text>

          {/* ② → GPU：命令 */}
          <line
            x1="196"
            y1="132"
            x2="252"
            y2="132"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M252 132 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="224"
            y="122"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            命令
          </text>

          {/* GPU：真正执行的显卡 */}
          <rect
            x="254"
            y="100"
            width="104"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="306"
            y="137"
            textAnchor="middle"
            fontSize="15"
            fontWeight="600"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            GPU
          </text>

          {/* GPU → ① canvas：输出 */}
          <line
            x1="358"
            y1="132"
            x2="414"
            y2="132"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path d="M414 132 l-10 -5 l0 10 z" fill="var(--accent)" />
          <text
            x="386"
            y="122"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            输出
          </text>

          {/* ① canvas 画板：画成显示器矩形（最终输出落脚的板子，呼应 Stepper 显示器图） */}
          <rect
            x="436"
            y="92"
            width="132"
            height="80"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 显示器底座 */}
          <rect x="494" y="172" width="16" height="10" fill="var(--border)" />
          <rect
            x="478"
            y="182"
            width="48"
            height="4"
            rx="2"
            fill="var(--border)"
          />
          <text
            x="502"
            y="128"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ① canvas
          </text>
          <text
            x="502"
            y="148"
            textAnchor="middle"
            fontSize="13"
            fill="var(--text-secondary)"
          >
            画板（往哪画）
          </text>

          {/* ④ 每帧：清屏 → 绘制 —— 循环框内底部标注 */}
          <text
            x="320"
            y="232"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            ④ 每帧：先清屏 → 再绘制
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        网页上钉一块 ① canvas 画板，从它身上拿到 ② WebGL2 上下文（画笔 gl）；③
        渲染循环在最外层包住整体、每帧重复，④
        每帧先清屏、再绘制。本章只走到「清屏」——画三角形是下一章。
      </figcaption>
    </figure>
  );
}
