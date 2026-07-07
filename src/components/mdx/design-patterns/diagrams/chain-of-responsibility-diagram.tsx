/**
 * <ChainOfResponsibilityDiagram>：责任链模式链式传递图（design-patterns 课程）。
 *
 * 横向链：Client → HandlerA → HandlerB → HandlerC →（无人处理）。
 *   - 每个 Handler 框持有 successor 引用并声明 handleRequest() 方法
 *   - 箭头连接相邻节点，上方统一标注「请求无法处理则传递给下一个」
 *   - 链尾节点为圆角药丸，以 danger 色标注「无人处理」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×300（≥660）、四周留白 ≥32、
 * 文字距边界 ≥24、字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、
 * 三段垂直分层（标题 / 链式主体 / 底部总结）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 300;

// Client 药丸（左）
const CLIENT = { x: 32, y: 108, w: 96, h: 84 };
// 三个 Handler 框（中，尺寸统一）
const HANDLER_W = 104;
const HANDLER_H = 116;
const HANDLER_Y = 92;
const HANDLER_XS = [166, 308, 450] as const; // A / B / C 左上 x
// 链尾药丸（右）
const END = { x: 592, y: 108, w: 96, h: 84 };
// 链路纵向中心（Client / Handler / End 中心一致）
const CHAIN_Y = 150;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const danger = "var(--danger)";

export function ChainOfResponsibilityDiagram() {
  // 相邻节点之间的连接箭头：从左节点右边缘 → 右节点左边缘
  const segments = [
    { x1: CLIENT.x + CLIENT.w, x2: HANDLER_XS[0] },
    { x1: HANDLER_XS[0] + HANDLER_W, x2: HANDLER_XS[1] },
    { x1: HANDLER_XS[1] + HANDLER_W, x2: HANDLER_XS[2] },
    { x1: HANDLER_XS[2] + HANDLER_W, x2: END.x },
  ] as const;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="责任链模式链式传递图。从左到右一条横向链：Client 发出请求，依次经过 HandlerA、HandlerB、HandlerC，每个 Handler 持有 successor 引用并声明 handleRequest 方法；箭头上方统一标注「请求无法处理则传递给下一个」。链尾是一个红色药丸标注「无人处理」。底部说明：责任链——请求沿链传递，直到被处理或到达链尾。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 链路传递箭头：实心三角（指向下一个节点） */}
            <marker
              id="chain-pass-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="40"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            责任链模式 · 链式传递
          </text>

          {/* ===== 链路统一标注 ===== */}
          <text
            x={VIEW_W / 2}
            y="72"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={accent}
          >
            请求无法处理则传递给下一个
          </text>

          {/* ===== 传递箭头（先画，置于节点下方） ===== */}
          {segments.map((s, i) => (
            <line
              key={`seg-${i}`}
              x1={s.x1}
              y1={CHAIN_Y}
              x2={s.x2 - 2}
              y2={CHAIN_Y}
              stroke={accent}
              strokeWidth="1.8"
              markerEnd="url(#chain-pass-arrow)"
            />
          ))}

          {/* ===== Client 药丸 ===== */}
          <g>
            <rect
              x={CLIENT.x}
              y={CLIENT.y}
              width={CLIENT.w}
              height={CLIENT.h}
              rx={CLIENT.h / 2}
              fill={accent}
              fillOpacity="0.1"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={CLIENT.x + CLIENT.w / 2}
              y={CLIENT.y + 32}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              Client
            </text>
            <line
              x1={CLIENT.x + 16}
              y1={CLIENT.y + 44}
              x2={CLIENT.x + CLIENT.w - 16}
              y2={CLIENT.y + 44}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={CLIENT.x + CLIENT.w / 2}
              y={CLIENT.y + 64}
              textAnchor="middle"
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + request()
            </text>
          </g>

          {/* ===== 三个 Handler 框 ===== */}
          {(["A", "B", "C"] as const).map((tag, i) => {
            const x = HANDLER_XS[i];
            return (
              <g key={`handler-${tag}`}>
                <rect
                  x={x}
                  y={HANDLER_Y}
                  width={HANDLER_W}
                  height={HANDLER_H}
                  rx="10"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.8"
                />
                <text
                  x={x + HANDLER_W / 2}
                  y={HANDLER_Y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {`Handler${tag}`}
                </text>
                <line
                  x1={x}
                  y1={HANDLER_Y + 32}
                  x2={x + HANDLER_W}
                  y2={HANDLER_Y + 32}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={x + 12}
                  y={HANDLER_Y + 50}
                  fontSize="11"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  - successor
                </text>
                <line
                  x1={x}
                  y1={HANDLER_Y + 60}
                  x2={x + HANDLER_W}
                  y2={HANDLER_Y + 60}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={x + 12}
                  y={HANDLER_Y + 78}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + handleRequest()
                </text>
                <text
                  x={x + 12}
                  y={HANDLER_Y + 96}
                  fontSize="11"
                  fill={accent}
                  fontStyle="italic"
                >
                  // 处理或传递
                </text>
              </g>
            );
          })}

          {/* ===== 链尾「无人处理」药丸 ===== */}
          <g>
            <rect
              x={END.x}
              y={END.y}
              width={END.w}
              height={END.h}
              rx={END.h / 2}
              fill={danger}
              fillOpacity="0.1"
              stroke={danger}
              strokeWidth="1.8"
            />
            <text
              x={END.x + END.w / 2}
              y={END.y + 34}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
            >
              （链尾）
            </text>
            <text
              x={END.x + END.w / 2}
              y={END.y + 56}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={danger}
              fontFamily="monospace"
            >
              无人处理
            </text>
          </g>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="276"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            责任链：请求沿链传递，直到被处理或到达链尾
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Client 只需把请求交给链首，无需知道谁会处理。每个 Handler
        决定自己处理还是传给 successor——发送者与接收者解耦，链的组装可在运行时调整。
      </figcaption>
    </figure>
  );
}
