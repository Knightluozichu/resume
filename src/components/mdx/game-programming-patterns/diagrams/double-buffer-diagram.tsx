/**
 * <DoubleBufferDiagram>：双缓冲模式切换图（game-programming-patterns 课程）。
 *
 * 两行 × 三列网格：行 = 缓冲 A / 缓冲 B（固定身份），列 = 帧 1 / 帧 2 / 帧 3。
 * 每个单元格显示该缓冲在该帧的角色：写入中（紫，下一缓冲）/ 显示中（绿，当前缓冲）。
 * 帧间用双向交换箭头 + 序号 ①② 标注交换过程：帧1 写 B → ①交换 → 帧2 写 A → ②交换 → 帧3 写 B。
 * 底部总结栏：双缓冲——写入和读取分离，读到的永远是完整的上一帧。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×360、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 网格主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 360;

// 标签列 + 三个帧列。
const LABEL_X = 76; // 标签列中心
const CELL_W = 176;
const CELL_GAP = 20;
const CELL_X = [116, 312, 508]; // 三列起始 x
const cellCx = (i: number) => CELL_X[i] + CELL_W / 2;
// 列间交换中心
const swapCx = (i: number) => (CELL_X[i] + CELL_W + CELL_X[i + 1]) / 2;

const ROW_A_Y = 104;
const ROW_B_Y = 168;
const CELL_H = 44;
const cellTextY = (rowY: number) => rowY + CELL_H / 2 + 4;

// 0 = 显示(success) 1 = 写入(accent)：每行三帧的角色
const ROW_A_ROLES = [0, 1, 0]; // A: 显示 / 写入 / 显示
const ROW_B_ROLES = [1, 0, 1]; // B: 写入 / 显示 / 写入
const roleColor = (r: number) => (r === 1 ? "var(--accent)" : "var(--success)");
const roleLabel = (r: number) => (r === 1 ? "写入中" : "显示中");

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";

export function DoubleBufferDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="双缓冲模式切换图。两行三列网格：第一行缓冲 A，第二行缓冲 B；三列分别代表帧 1、帧 2、帧 3。帧 1：A 显示中（绿）、B 写入中（紫）；随后①交换；帧 2：A 写入中、B 显示中；随后②交换；帧 3：A 显示中、B 写入中。两个缓冲交替承担写入与显示角色，写入和读取分离。底部总结：双缓冲——写入和读取分离，读到的永远是完整的上一帧。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 交换箭头：实心小三角，向下/向上共用 */}
            <marker
              id="db-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 z" fill={accent} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            双缓冲 · 帧间切换
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            两个缓冲交替承担「写入」与「显示」角色
          </text>

          {/* ===== 帧头 ===== */}
          {[0, 1, 2].map((i) => (
            <text
              key={`frame-${i}`}
              x={cellCx(i)}
              y="84"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              帧 {i + 1}
            </text>
          ))}

          {/* ===== 行标签 ===== */}
          <text
            x={LABEL_X}
            y={cellTextY(ROW_A_Y)}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            缓冲 A
          </text>
          <text
            x={LABEL_X}
            y={cellTextY(ROW_B_Y)}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            缓冲 B
          </text>

          {/* ===== 网格单元 ===== */}
          {/* 行 A */}
          {ROW_A_ROLES.map((r, i) => (
            <g key={`a-${i}`}>
              <rect
                x={CELL_X[i]}
                y={ROW_A_Y}
                width={CELL_W}
                height={CELL_H}
                rx="8"
                fill={roleColor(r)}
                fillOpacity="0.12"
                stroke={roleColor(r)}
                strokeWidth="1.2"
              />
              <text
                x={cellCx(i)}
                y={cellTextY(ROW_A_Y)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={roleColor(r)}
              >
                {roleLabel(r)}
              </text>
            </g>
          ))}
          {/* 行 B */}
          {ROW_B_ROLES.map((r, i) => (
            <g key={`b-${i}`}>
              <rect
                x={CELL_X[i]}
                y={ROW_B_Y}
                width={CELL_W}
                height={CELL_H}
                rx="8"
                fill={roleColor(r)}
                fillOpacity="0.12"
                stroke={roleColor(r)}
                strokeWidth="1.2"
              />
              <text
                x={cellCx(i)}
                y={cellTextY(ROW_B_Y)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={roleColor(r)}
              >
                {roleLabel(r)}
              </text>
            </g>
          ))}

          {/* ===== 交换箭头（帧间，双向）+ 序号 ===== */}
          {[0, 1].map((i) => {
            const gx = swapCx(i);
            return (
              <g key={`swap-${i}`}>
                {/* A→B 向下 */}
                <line
                  x1={gx - 4}
                  y1={ROW_A_Y + CELL_H + 2}
                  x2={gx - 4}
                  y2={ROW_B_Y - 2}
                  stroke={accent}
                  strokeWidth="1.6"
                  markerEnd="url(#db-arrow)"
                />
                {/* B→A 向上 */}
                <line
                  x1={gx + 4}
                  y1={ROW_B_Y - 2}
                  x2={gx + 4}
                  y2={ROW_A_Y + CELL_H + 2}
                  stroke={accent}
                  strokeWidth="1.6"
                  markerEnd="url(#db-arrow)"
                />
                {/* 序号 */}
                <text
                  x={gx}
                  y="232"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={accent}
                >
                  {i === 0 ? "① 交换" : "② 交换"}
                </text>
              </g>
            );
          })}

          {/* ===== 图例 ===== */}
          <text
            x={VIEW_W / 2}
            y="258"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            <tspan fill={accent}>■</tspan>
            <tspan fill={primary}> 写入中（下一缓冲）</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--success)">■</tspan>
            <tspan fill={primary}> 显示中（当前缓冲）</tspan>
          </text>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="60"
            y="280"
            width={VIEW_W - 120}
            height="56"
            rx="12"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="306"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            双缓冲：写入和读取分离
          </text>
          <text
            x={VIEW_W / 2}
            y="326"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            读到的永远是完整的上一帧——不会看到写了一半的中间状态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        渲染从「当前缓冲」读取完整一帧的同时，下一帧的内容写入「下一缓冲」；写完后交换二者。读取方永远拿到一份完整的画面，避免了边写边读产生的撕裂与半成品。
      </figcaption>
    </figure>
  );
}
