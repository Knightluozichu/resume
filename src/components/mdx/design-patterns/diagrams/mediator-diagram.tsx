/**
 * <MediatorDiagram>：中介者模式星型通信对比图（design-patterns 课程）。
 *
 * 上下两段对比：
 *   - 上段「没有中介者」：4 个 Colleague 两两相连（多对多网状），中心标「混乱」
 *   - 中间过渡：向下箭头 + 「引入中介者后」
 *   - 下段「有中介者」：同样 4 个 Colleague 全部连到中心 Mediator（星型），标「清晰」
 *   - Mediator 框声明 send()，Colleague 框声明 receive()
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层
 * （标题 / 对比主体 / 说明）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// 上段：4 个 Colleague（2×2，简化药丸，仅展示拓扑）
const UP_W = 116;
const UP_H = 44;
const UP_TOP_Y = 86;
const UP_BOT_Y = 150;
const UP_LEFT_X = 132; // C1 / C3 左上 x
const UP_RIGHT_X = 472; // C2 / C4 左上 x
const UP_LEFT_CX = UP_LEFT_X + UP_W / 2; // 190
const UP_RIGHT_CX = UP_RIGHT_X + UP_W / 2; // 530

// 下段：Mediator 中心框 + 4 个 Colleague（带 receive 方法）
const MEDIATOR = { x: 300, y: 288, w: 120, h: 60 };
const MEDIATOR_CX = MEDIATOR.x + MEDIATOR.w / 2; // 360
const LOW_W = 120;
const LOW_H = 48;
// 4 个 Colleague 中心坐标（左上 / 右上 / 左下 / 右下）
const LOW_CENTERS = [
  { x: 156, y: 308 }, // TL
  { x: 564, y: 308 }, // TR
  { x: 236, y: 384 }, // BL
  { x: 484, y: 384 }, // BR
] as const;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const danger = "var(--danger)";
const success = "var(--success)";

export function MediatorDiagram() {
  // 上段 6 条网状连线（全部两两相连，中心交叉体现「混乱」）
  const meshPairs: ReadonlyArray<readonly [number, number]> = [
    [0, 1], // C1-C2 上边
    [2, 3], // C3-C4 下边
    [0, 2], // C1-C3 左边
    [1, 3], // C2-C4 右边
    [0, 3], // C1-C4 对角
    [1, 2], // C2-C3 对角
  ];
  const upCenters = [
    { x: UP_LEFT_CX, y: UP_TOP_Y + UP_H / 2 }, // C1 (190,108)
    { x: UP_RIGHT_CX, y: UP_TOP_Y + UP_H / 2 }, // C2 (530,108)
    { x: UP_LEFT_CX, y: UP_BOT_Y + UP_H / 2 }, // C3 (190,172)
    { x: UP_RIGHT_CX, y: UP_BOT_Y + UP_H / 2 }, // C4 (530,172)
  ];

  // 下段星型连线：每个 Colleague 中心 → Mediator 边框交点（箭头落点）
  const starEndpoints = [
    { x: MEDIATOR.x, y: 315 }, // TL → 左边
    { x: MEDIATOR.x + MEDIATOR.w, y: 315 }, // TR → 右边
    { x: 304, y: MEDIATOR.y + MEDIATOR.h }, // BL → 底边
    { x: 416, y: MEDIATOR.y + MEDIATOR.h }, // BR → 底边
  ] as const;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="中介者模式星型通信对比图。上段「没有中介者」：四个 Colleague 两两相连形成多对多网状，中心以红色标注「混乱」。中间一个向下箭头标注「引入中介者后」。下段「有中介者」：同样四个 Colleague 全部连到中心的 Mediator 形成星型拓扑，以绿色标注「清晰」；Mediator 框声明 send 方法，Colleague 框声明 receive 方法。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 过渡向下箭头 */}
            <marker
              id="med-down-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="9"
              orient="auto"
            >
              <path d="M0 0 L5 9 L10 0 z" fill={accent} />
            </marker>
            {/* 星型发送箭头：Colleague → Mediator */}
            <marker
              id="med-send-arrow"
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
            y="38"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            中介者模式 · 网状 → 星型
          </text>

          {/* ===== 上段标签 ===== */}
          <text
            x={VIEW_W / 2}
            y="62"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            没有中介者：多对多网状
          </text>

          {/* ===== 上段网状连线（先画，置于节点下方） ===== */}
          {meshPairs.map(([a, b], i) => (
            <line
              key={`mesh-${i}`}
              x1={upCenters[a].x}
              y1={upCenters[a].y}
              x2={upCenters[b].x}
              y2={upCenters[b].y}
              stroke={danger}
              strokeWidth="1.4"
              strokeOpacity="0.7"
            />
          ))}

          {/* 「混乱」标注（带底色，压在交叉线之上） */}
          <rect
            x={330}
            y={128}
            width={60}
            height={24}
            rx="12"
            fill={elevated}
            stroke={danger}
            strokeWidth="1.2"
          />
          <text
            x={360}
            y={145}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={danger}
          >
            混乱
          </text>

          {/* ===== 上段 4 个 Colleague（简化药丸） ===== */}
          {upCenters.map((c, i) => {
            const x = c.x - UP_W / 2;
            const y = i < 2 ? UP_TOP_Y : UP_BOT_Y;
            return (
              <g key={`up-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={UP_W}
                  height={UP_H}
                  rx="10"
                  fill={elevated}
                  stroke={danger}
                  strokeWidth="1.6"
                />
                <text
                  x={c.x}
                  y={y + UP_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {`Colleague${i + 1}`}
                </text>
              </g>
            );
          })}

          {/* ===== 过渡：向下箭头 + 「引入中介者后」 ===== */}
          <line
            x1={360}
            y1={200}
            x2={360}
            y2={228}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#med-down-arrow)"
          />
          <text
            x={376}
            y={218}
            fontSize="12"
            fontWeight="600"
            fill={accent}
          >
            引入中介者后
          </text>

          {/* ===== 下段标签 ===== */}
          <text
            x={VIEW_W / 2}
            y="252"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            有中介者：星型通信
          </text>

          {/* 「清晰」标注 */}
          <text
            x={VIEW_W / 2}
            y="272"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
          >
            清晰
          </text>

          {/* ===== 下段星型连线：Colleague → Mediator ===== */}
          {LOW_CENTERS.map((c, i) => (
            <line
              key={`star-${i}`}
              x1={c.x}
              y1={c.y}
              x2={starEndpoints[i].x}
              y2={starEndpoints[i].y}
              stroke={accent}
              strokeWidth="1.6"
              markerEnd="url(#med-send-arrow)"
            />
          ))}

          {/* ===== Mediator 中心框 ===== */}
          <g>
            <rect
              x={MEDIATOR.x}
              y={MEDIATOR.y}
              width={MEDIATOR.w}
              height={MEDIATOR.h}
              rx="10"
              fill={accent}
              fillOpacity="0.1"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={MEDIATOR_CX}
              y={MEDIATOR.y + 22}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              Mediator
            </text>
            <line
              x1={MEDIATOR.x}
              y1={MEDIATOR.y + 30}
              x2={MEDIATOR.x + MEDIATOR.w}
              y2={MEDIATOR.y + 30}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={MEDIATOR_CX}
              y={MEDIATOR.y + 50}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              + send()
            </text>
          </g>

          {/* ===== 下段 4 个 Colleague（带 receive 方法） ===== */}
          {LOW_CENTERS.map((c, i) => {
            const x = c.x - LOW_W / 2;
            const y = c.y - LOW_H / 2;
            return (
              <g key={`low-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={LOW_W}
                  height={LOW_H}
                  rx="10"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.8"
                />
                <text
                  x={c.x}
                  y={y + 18}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {`Colleague${i + 1}`}
                </text>
                <line
                  x1={x}
                  y1={y + 26}
                  x2={x + LOW_W}
                  y2={y + 26}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={c.x}
                  y={y + 42}
                  textAnchor="middle"
                  fontSize="11"
                  fill={accent}
                  fontFamily="monospace"
                >
                  + receive()
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        没有 Mediator 时，N 个 Colleague 两两直连需 O(N²) 条链路；引入 Mediator
        后所有通信经它中转，降为 O(N)。Colleague 之间互不引用，新增同事只需向 Mediator 注册。
      </figcaption>
    </figure>
  );
}
