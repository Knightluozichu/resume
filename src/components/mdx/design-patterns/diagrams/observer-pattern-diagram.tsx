/**
 * <ObserverPatternDiagram>：观察者模式通知流程图（design-patterns 课程）。
 *
 * 展示 Subject（被观察者）+ 3 个 Observer（观察者）的通知流程：
 *   - Subject 在左侧，内含 state 属性、observers 列表（数组风格 3 格）、attach/detach/notify 方法
 *   - 3 个 Observer 在右侧纵向排列，各自有 update() 方法
 *   - notify() 发出的通知经一条 bus 分叉到每个 Observer.update()，箭头标「notify()」
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 主体 / 底部总结）。
 * 间距用 4 的倍数，主要坐标均为 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// Subject 类框（左）
const SUBJECT = { x: 48, y: 76, w: 232, h: 240 };
// Subject 内 observers 数组盒（3 格横排）
const ARR = { x: 64, y: 160, w: 200, h: 32, cellW: 64, gap: 4 };
// 三个 Observer 框（右侧纵向，尺寸统一）
const OBS_W = 196;
const OBS_H = 64;
const OBS_X = 476;
const OBS_LIST = [
  { y: 84, tag: "ObserverA" },
  { y: 168, tag: "ObserverB" },
  { y: 252, tag: "ObserverC" },
] as const;
// Subject.notify() 行的 y（通知出发点）
const NOTIFY_Y = 264;
// 通知 bus 竖线的 x（Subject 右边缘与 Observer 左边缘之间）
const BUS_X = 340;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function ObserverPatternDiagram() {
  // 每个 Observer 框内 update() 方法的行 y（框 y + 52）
  const updateY = (y: number) => y + 52;
  const busTop = updateY(OBS_LIST[0].y); // 136
  const busBottom = updateY(OBS_LIST[2].y); // 304

  // observers 数组三格中心 x
  const cellCenters = [
    ARR.x + ARR.cellW / 2, // 96
    ARR.x + ARR.cellW + ARR.gap + ARR.cellW / 2, // 164
    ARR.x + 2 * (ARR.cellW + ARR.gap) + ARR.cellW / 2, // 232
  ];
  // 数组格竖向分隔线 x
  const cellDividers = [
    ARR.x + ARR.cellW + ARR.gap / 2, // 130
    ARR.x + 2 * ARR.cellW + ARR.gap + ARR.gap / 2, // 198
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="观察者模式通知流程图。左侧 Subject 类包含 state 属性、observers 观察者列表（数组风格三格 O1/O2/O3）、attach 与 detach 注册方法以及 notify 通知方法。右侧三个 ObserverA/B/C 纵向排列，各自实现 update 方法。从 Subject 的 notify 方法发出紫色箭头，经一条总线分叉指向每个 Observer 的 update 方法，箭头标注 notify。底部说明：Subject 状态变化时自动通知所有注册的 Observer——Observer 主动订阅，Subject 被动通知。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 通知箭头：实心三角（指向 Observer.update） */}
            <marker
              id="observer-notify-arrow"
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
            观察者模式 · 通知流程
          </text>

          {/* ===== Subject 类框 ===== */}
          <g>
            <rect
              x={SUBJECT.x}
              y={SUBJECT.y}
              width={SUBJECT.w}
              height={SUBJECT.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            {/* 类名 */}
            <text
              x={SUBJECT.x + SUBJECT.w / 2}
              y={SUBJECT.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Subject
            </text>
            <line
              x1={SUBJECT.x}
              y1={SUBJECT.y + 36}
              x2={SUBJECT.x + SUBJECT.w}
              y2={SUBJECT.y + 36}
              stroke={border}
              strokeWidth="1"
            />
            {/* 属性：状态 */}
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 56}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - state: T
            </text>
            {/* 属性：观察者列表标签 */}
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 76}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - observers:
            </text>
            {/* observers 数组盒（3 格） */}
            <rect
              x={ARR.x}
              y={ARR.y}
              width={ARR.w}
              height={ARR.h}
              rx="6"
              fill={accent}
              fillOpacity="0.08"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            {cellDividers.map((dx) => (
              <line
                key={`arr-div-${dx}`}
                x1={dx}
                y1={ARR.y}
                x2={dx}
                y2={ARR.y + ARR.h}
                stroke={accent}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            ))}
            {["O1", "O2", "O3"].map((label, i) => (
              <text
                key={`arr-cell-${label}`}
                x={cellCenters[i]}
                y={ARR.y + ARR.h / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={accent}
                fontFamily="monospace"
              >
                {label}
              </text>
            ))}
            <line
              x1={SUBJECT.x}
              y1={SUBJECT.y + 128}
              x2={SUBJECT.x + SUBJECT.w}
              y2={SUBJECT.y + 128}
              stroke={border}
              strokeWidth="1"
            />
            {/* 方法 */}
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 148}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + attach(o)
            </text>
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 168}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + detach(o)
            </text>
            {/* notify() 高亮（通知发起点） */}
            <text
              x={SUBJECT.x + 14}
              y={SUBJECT.y + 188}
              fontSize="12"
              fontWeight="700"
              fill={accent}
              fontFamily="monospace"
            >
              + notify()
            </text>
          </g>

          {/* ===== 通知箭头：主干 + bus + 3 分支 ===== */}
          {/* 主干：Subject.notify() 右边缘 → bus */}
          <line
            x1={SUBJECT.x + SUBJECT.w}
            y1={NOTIFY_Y}
            x2={BUS_X}
            y2={NOTIFY_Y}
            stroke={accent}
            strokeWidth="1.8"
          />
          {/* bus 竖线：连接三个 Observer 的 update 行 */}
          <line
            x1={BUS_X}
            y1={busTop}
            x2={BUS_X}
            y2={busBottom}
            stroke={accent}
            strokeWidth="1.8"
          />
          {/* 三条分支：bus → 每个 Observer.update() */}
          {OBS_LIST.map((o) => {
            const y = updateY(o.y);
            return (
              <line
                key={`notify-branch-${o.tag}`}
                x1={BUS_X}
                y1={y}
                x2={OBS_X - 4}
                y2={y}
                stroke={accent}
                strokeWidth="1.8"
                markerEnd="url(#observer-notify-arrow)"
              />
            );
          })}
          {/* notify() 标注 */}
          <text
            x={(SUBJECT.x + SUBJECT.w + BUS_X) / 2}
            y={NOTIFY_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            notify()
          </text>

          {/* ===== 三个 Observer 框 ===== */}
          {OBS_LIST.map((o) => {
            const cx = OBS_X + OBS_W / 2;
            return (
              <g key={o.tag}>
                <rect
                  x={OBS_X}
                  y={o.y}
                  width={OBS_W}
                  height={OBS_H}
                  rx="10"
                  fill={elevated}
                  stroke={border}
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={o.y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {o.tag}
                </text>
                <line
                  x1={OBS_X}
                  y1={o.y + 32}
                  x2={OBS_X + OBS_W}
                  y2={o.y + 32}
                  stroke={border}
                  strokeWidth="1"
                />
                <text
                  x={OBS_X + 14}
                  y={o.y + 52}
                  fontSize="12"
                  fill={primary}
                  fontFamily="monospace"
                >
                  + update()
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            Subject 状态变化时自动通知所有注册的 Observer——Observer 主动订阅，Subject 被动通知
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Subject 持有观察者列表并提供 attach/detach 管理注册；状态改变时
        notify 遍历列表调用每个 Observer 的 update——订阅方与被观察者通过接口解耦，互不感知具体实现。
      </figcaption>
    </figure>
  );
}
