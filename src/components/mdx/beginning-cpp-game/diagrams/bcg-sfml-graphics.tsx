/**
 * <BcgSfmlGraphicsDiagram>：SFML 图形渲染流程图（beginning-cpp-game-programming 图形章）。
 *
 * 横向流水线五步：创建窗口 → 清屏 → 绘制精灵 → 显示 → 循环回清屏。
 * 每步是一个彩色节点，标注 SFML 关键 API；下方一行「纹理→精灵→窗口」资源绑定关系。
 * 底部对比「clear/draw/display 三件套」为什么必须成对出现。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 流水线主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const NODE_W = 116;
const NODE_H = 64;
const NODE_GAP = 18;
const PIPE_TOP = 100;
const PIPE_LEFT = 40;

type Step = { id: string; name: string; api: string; color: string };

const STEPS: readonly Step[] = [
  { id: "window", name: "创建窗口", api: "RenderWindow", color: "var(--success)" },
  { id: "clear", name: "清屏", api: "window.clear()", color: "var(--accent)" },
  { id: "draw", name: "绘制精灵", api: "window.draw(sprite)", color: "var(--warning)" },
  { id: "display", name: "显示", api: "window.display()", color: "var(--danger)" },
];

const stepX = (i: number) => PIPE_LEFT + i * (NODE_W + NODE_GAP);

export function BcgSfmlGraphicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SFML 图形渲染流程图。横向流水线四步：创建窗口（绿色，RenderWindow）、清屏（紫色，window.clear）、绘制精灵（橙色，window.draw sprite）、显示（红色，window.display）。清屏到显示之间循环往复。下方资源绑定关系：纹理 Texture 加载图片 → 精灵 Sprite 绑定纹理 → 设置位置后交给窗口绘制。底部总结：clear、draw、display 三件套必须成对，缺一不可。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="bcg-sfml-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            SFML 图形渲染 · 流水线
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            窗口创建 → clear → draw → display，每帧循环
          </text>

          {/* ===== 横向流水线 ===== */}
          {STEPS.map((s, i) => {
            const x = stepX(i);
            const cx = x + NODE_W / 2;
            return (
              <g key={s.id}>
                <rect x={x} y={PIPE_TOP} width={NODE_W} height={NODE_H} rx="10" fill="var(--bg)" stroke={s.color} strokeWidth="1.6" />
                <text x={cx} y={PIPE_TOP + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={s.color}>{s.name}</text>
                <text x={cx} y={PIPE_TOP + 46} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{s.api}</text>

                {/* 向右箭头 */}
                {i < STEPS.length - 1 && (
                  <line x1={x + NODE_W} y1={PIPE_TOP + NODE_H / 2} x2={x + NODE_W + NODE_GAP - 2} y2={PIPE_TOP + NODE_H / 2} stroke="var(--accent)" strokeWidth="1.6" markerEnd="url(#bcg-sfml-arrow)" />
                )}
              </g>
            );
          })}

          {/* 回环箭头：display → clear */}
          {(() => {
            const clearX = stepX(1) + NODE_W / 2;
            const displayX = stepX(3) + NODE_W / 2;
            const loopY = PIPE_TOP + NODE_H + 30;
            return (
              <>
                <path
                  d={`M ${displayX} ${PIPE_TOP + NODE_H} L ${displayX} ${loopY} L ${clearX} ${loopY} L ${clearX} ${PIPE_TOP + NODE_H}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  strokeOpacity="0.6"
                  markerEnd="url(#bcg-sfml-arrow)"
                />
                <text x={(clearX + displayX) / 2} y={loopY - 6} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每帧循环</text>
              </>
            );
          })()}

          {/* ===== 资源绑定关系（纹理→精灵→窗口） ===== */}
          <text x={VIEW_W / 2} y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            资源绑定：纹理 → 精灵 → 窗口
          </text>

          {(() => {
            const y = 252;
            const items = [
              { label: "Texture 纹理", desc: "加载图片到显存", color: "var(--success)", x: 80 },
              { label: "Sprite 精灵", desc: "绑定纹理 + 位置", color: "var(--warning)", x: 300 },
              { label: "Window 窗口", desc: "draw(sprite) 提交", color: "var(--danger)", x: 520 },
            ];
            return (
              <>
                {items.map((it, i) => (
                  <g key={it.label}>
                    <rect x={it.x} y={y} width={120} height={56} rx="8" fill="var(--bg)" stroke={it.color} strokeWidth="1.4" />
                    <text x={it.x + 60} y={y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={it.color}>{it.label}</text>
                    <text x={it.x + 60} y={y + 42} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{it.desc}</text>
                    {i < items.length - 1 && (
                      <line x1={it.x + 120} y1={y + 28} x2={items[i + 1].x - 2} y2={y + 28} stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#bcg-sfml-arrow)" />
                    )}
                  </g>
                ))}
              </>
            );
          })()}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            clear / draw / display 三件套必须成对——漏 display 会黑屏，漏 clear 会残留残影
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SFML 每帧先 clear 清空画布，再 draw 把精灵画上去，最后 display 交换缓冲显示。纹理是图片数据，精灵是纹理的可绘制实例，窗口是最终输出目标。
      </figcaption>
    </figure>
  );
}
