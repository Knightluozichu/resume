/**
 * Poeaa24Ch16LockStrategiesDiagram：第16章离线并发锁策略对比图。
 *
 * 展示 4 种锁策略的获取/持有/释放时序对比：
 *   Optimistic Offline Lock / Pessimistic Offline Lock / Coarse-Grained Lock / Implicit Lock
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 460;

const STRATEGIES = [
  {
    name: "Optimistic Lock",
    desc: "提交时检查版本号",
    timeline: "读 → 编辑 → 提交时校验 version",
    cost: "冲突时重试",
    color: "#3FB97F",
  },
  {
    name: "Pessimistic Lock",
    desc: "读取时立即加锁",
    timeline: "读 + LOCK → 编辑 → 提交 + UNLOCK",
    cost: "持有期间阻塞他人",
    color: "#E5B567",
  },
  {
    name: "Coarse-Grained Lock",
    desc: "一次锁住整个聚合",
    timeline: "锁聚合根 → 编辑子对象 → 释放",
    cost: "锁范围大、并发低",
    color: T.accent,
  },
  {
    name: "Implicit Lock",
    desc: "框架自动加锁",
    timeline: "框架拦截 → 自动 LOCK/UNLOCK",
    cost: "隐藏复杂度但难调试",
    color: T.secondary,
  },
] as const;

export function Poeaa24Ch16LockStrategiesDiagram() {
  const startX = 48;
  const startY = 80;
  const rowH = 84;
  const boxW = 624;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="第16章离线并发模式锁策略对比图。四种策略按行排列：Optimistic Offline Lock 在提交时检查版本号，冲突时重试；Pessimistic Offline Lock 在读取时立即加锁，持有期间阻塞他人；Coarse-Grained Lock 一次锁住整个聚合根；Implicit Lock 由框架自动管理。每种策略标注时序和代价。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="离线并发：四种锁策略对比" />

          {/* 时间轴标签 */}
          <text x={startX + 180} y={72} fontSize="11" fill={T.secondary}>
            读取
          </text>
          <text x={startX + 340} y={72} fontSize="11" fill={T.secondary}>
            编辑
          </text>
          <text x={startX + 520} y={72} fontSize="11" fill={T.secondary}>
            提交
          </text>

          {STRATEGIES.map((s, i) => {
            const y = startY + i * rowH;
            return (
              <g key={s.name}>
                {/* 背景行 */}
                <rect
                  x={startX}
                  y={y}
                  width={boxW}
                  height={72}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.04"
                  stroke={s.color}
                  strokeWidth="1"
                />
                {/* 模式名 */}
                <text
                  x={startX + 12}
                  y={y + 20}
                  fontSize="12"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.name}
                </text>
                <text
                  x={startX + 12}
                  y={y + 38}
                  fontSize="11"
                  fill={T.secondary}
                >
                  {s.desc}
                </text>
                {/* 时序 */}
                <text
                  x={startX + 12}
                  y={y + 58}
                  fontSize="11"
                  fontFamily="monospace"
                  fill={T.primary}
                >
                  {s.timeline}
                </text>
                {/* 代价 */}
                <text
                  x={startX + boxW - 12}
                  y={y + 20}
                  textAnchor="end"
                  fontSize="11"
                  fill={T.danger}
                >
                  {s.cost}
                </text>
                {/* 时间轴刻度 */}
                <line
                  x1={startX + 180}
                  y1={y + 44}
                  x2={startX + 180}
                  y2={y + 64}
                  stroke={T.border}
                  strokeWidth="0.8"
                />
                <line
                  x1={startX + 340}
                  y1={y + 44}
                  x2={startX + 340}
                  y2={y + 64}
                  stroke={T.border}
                  strokeWidth="0.8"
                />
                <line
                  x1={startX + 520}
                  y1={y + 44}
                  x2={startX + 520}
                  y2={y + 64}
                  stroke={T.border}
                  strokeWidth="0.8"
                />
              </g>
            );
          })}

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="冲突少 → 乐观锁；冲突多 → 悲观锁；聚合边界清晰 → 粗粒度锁"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        离线并发模式族包含四种锁策略。乐观锁适合冲突少的场景（提交时校验版本号），
        悲观锁适合冲突多的场景（读取时加锁），粗粒度锁锁住整个聚合，隐式锁由框架自动管理。
      </figcaption>
    </figure>
  );
}
