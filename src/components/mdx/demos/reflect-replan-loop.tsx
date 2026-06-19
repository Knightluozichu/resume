"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <ReflectReplanLoop>：「计划 → 执行 →（出问题）→ 反思 → 改计划 → 再执行」闭环交互演示
 * （HEL-302，《规划与任务分解 Planning》篇2·4，知识点 4：反思与重规划）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。计划不是定死的，是边执行边修的：小特按计划订酒店，
 * 发现订满了（执行失败）→ 反思（原计划那家不行）→ 改计划（换一家 / 换日期）→ 继续。
 *
 * 交互：切换两条路径对比——
 *   - 顺利路径：计划 → 执行（订酒店）→ 成功 → 继续下一步。一条直线走完。
 *   - 受阻重规划路径：计划 → 执行（订酒店）→ ⚠ 出问题（那家订满了）→ 反思（原计划行不通）
 *     → 改计划（换一家）→ 再执行 → 成功。多出一段「反思 → 改计划」的回环。
 * 切到「受阻」时，那段重规划回环高亮显出；切到「顺利」时回环淡显——突出**计划行不通时，
 * Agent 要能反思 + 改计划再继续，而不是一条道走到黑**。
 *
 * 几何守规则：横向主流程单一 x 公式排布；重规划回环画在主流程下方、用 warning 标注；
 * 所有 text 居中、距 viewBox 边 ≥16px、字号 ≥10px；不套整圈大框。非当前路径的节点保持
 * 基底可见（opacity 不为 0，HEL-292 精神：首帧 / 非选中态非全空）。
 *
 * 为何 client：路径切换是真交互（受控状态）。颜色 / 间距 / 圆角 / 动效全部走 DESIGN token
 * （硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 300;
const MARGIN_X = 24;
const INNER_W = VIEW_W - 2 * MARGIN_X;

// 主流程 4 个节点：计划 → 执行 → 出问题/成功 → 继续。单一 x 公式。
const MAIN_CY = 78;
const NODE_W = 116;
const NODE_H = 44;
const NMAIN = 4;
const mainCx = (i: number) => MARGIN_X + ((i + 0.5) * INNER_W) / NMAIN;

// 重规划回环两个节点：反思 / 改计划，画在主流程下方。
const LOOP_CY = 196;
const LOOP_W = 116;
const LOOP_H = 44;

type Path = "smooth" | "blocked";

export function ReflectReplanLoop() {
  const [path, setPath] = useState<Path>("blocked");
  const reset = () => setPath("blocked");
  const blocked = path === "blocked";

  // 主流程第 3 个盒（index 2）：受阻时是「⚠ 出问题」，顺利时是「✓ 成功」。
  const thirdLabel = blocked ? "⚠ 订满了" : "✓ 订到了";
  const thirdColor = blocked ? "var(--danger)" : "var(--success)";
  // 第 4 个盒：受阻时是「再执行→成功」，顺利时是「继续下一步」。
  const fourthLabel = blocked ? "改后再订→成功" : "继续下一步";
  const fourthColor = blocked ? "var(--success)" : "var(--accent)";

  const mainNodes = [
    { label: "① 按计划", sub: "订那家酒店", color: "var(--accent)" },
    { label: "② 执行", sub: "去下单", color: "var(--accent)" },
    {
      label: thirdLabel,
      sub: blocked ? "执行失败" : "执行成功",
      color: thirdColor,
    },
    { label: fourthLabel, sub: "", color: fourthColor },
  ];

  return (
    <DemoStage
      title="计划不是定死的：执行受阻时，反思 → 改计划 → 再执行（边执行边修）"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            切换两条路径对比：
          </span>
          <button
            type="button"
            onClick={() => setPath("smooth")}
            aria-pressed={path === "smooth"}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              path === "smooth"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            顺利路径
          </button>
          <button
            type="button"
            onClick={() => setPath("blocked")}
            aria-pressed={path === "blocked"}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              path === "blocked"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            受阻重规划路径
          </button>
        </div>
      }
    >
      <div className="w-full max-w-[660px] text-sm">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={
            blocked
              ? "受阻重规划路径：小特按计划订那家酒店、去下单执行，结果那家订满了，执行失败。这时小特不会一条道走到黑，而是往下走一段重规划回环：先反思原计划那家行不通，再改计划换一家酒店，然后回到执行、改后再订成功。突出计划不是定死的，是边执行边修的。"
              : "顺利路径：小特按计划订那家酒店、去下单执行，顺利订到了、执行成功，直接继续下一步。下方的反思和改计划回环这条路上没用到，淡显着。"
          }
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部标题行（y=28 让 11px 文字 bbox 顶 ≥16px，HEL-296/299）—— */}
          <text
            x={MARGIN_X}
            y={28}
            textAnchor="start"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            {blocked
              ? "受阻重规划：订酒店发现订满了 → 反思 → 改计划 → 再执行 ↓"
              : "顺利路径：订酒店一次订到 → 直接继续下一步 ↓"}
          </text>

          {/* —— 主流程横向连线 —— */}
          {[0, 1, 2].map((i) => (
            <line
              key={`main-edge-${i}`}
              x1={mainCx(i) + NODE_W / 2}
              y1={MAIN_CY}
              x2={mainCx(i + 1) - NODE_W / 2}
              y2={MAIN_CY}
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              markerEnd="url(#rrl-arrow)"
              opacity="0.7"
            />
          ))}

          {/* —— 主流程 4 个节点 —— */}
          {mainNodes.map((node, i) => (
            <g key={`main-node-${i}`}>
              <rect
                x={mainCx(i) - NODE_W / 2}
                y={MAIN_CY - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--bg)"
                stroke={node.color}
                strokeWidth="1.8"
              />
              <text
                x={mainCx(i)}
                y={node.sub ? MAIN_CY - 3 : MAIN_CY + 4}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={node.color}
              >
                {node.label}
              </text>
              {node.sub && (
                <text
                  x={mainCx(i)}
                  y={MAIN_CY + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {node.sub}
                </text>
              )}
            </g>
          ))}

          {/* —— 重规划回环：从「出问题」节点向下 → 反思 → 改计划 → 回到「再执行」节点 —— */}
          {/* 回环两节点居于主流程第 3、第 2 列下方（受阻时高亮，顺利时淡显） */}
          {(() => {
            const reflectCx = mainCx(2);
            const replanCx = mainCx(1);
            const loopOpacity = blocked ? 1 : 0.22;
            const loopColor = "var(--warning)";
            return (
              <g opacity={loopOpacity}>
                {/* 出问题盒底 → 反思盒顶（向下） */}
                <line
                  x1={reflectCx}
                  y1={MAIN_CY + NODE_H / 2}
                  x2={reflectCx}
                  y2={LOOP_CY - LOOP_H / 2}
                  stroke={loopColor}
                  strokeWidth="2"
                  markerEnd="url(#rrl-arrow-warn)"
                />
                {/* 反思 → 改计划（向左） */}
                <line
                  x1={reflectCx - LOOP_W / 2}
                  y1={LOOP_CY}
                  x2={replanCx + LOOP_W / 2}
                  y2={LOOP_CY}
                  stroke={loopColor}
                  strokeWidth="2"
                  markerEnd="url(#rrl-arrow-warn)"
                />
                {/* 改计划盒顶 → 回到主流程「再执行」节点（向上凹弧回到第 4 列） */}
                <path
                  d={`M ${replanCx} ${LOOP_CY - LOOP_H / 2} C ${replanCx} ${LOOP_CY - 56}, ${mainCx(3)} ${LOOP_CY - 56}, ${mainCx(3)} ${MAIN_CY + NODE_H / 2}`}
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  markerEnd="url(#rrl-arrow-success)"
                />

                {/* 反思盒 */}
                <rect
                  x={reflectCx - LOOP_W / 2}
                  y={LOOP_CY - LOOP_H / 2}
                  width={LOOP_W}
                  height={LOOP_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={loopColor}
                  strokeWidth="1.8"
                />
                <text
                  x={reflectCx}
                  y={LOOP_CY - 3}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={loopColor}
                >
                  ③ 反思
                </text>
                <text
                  x={reflectCx}
                  y={LOOP_CY + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  原计划那家不行
                </text>

                {/* 改计划盒 */}
                <rect
                  x={replanCx - LOOP_W / 2}
                  y={LOOP_CY - LOOP_H / 2}
                  width={LOOP_W}
                  height={LOOP_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={loopColor}
                  strokeWidth="1.8"
                />
                <text
                  x={replanCx}
                  y={LOOP_CY - 3}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={loopColor}
                >
                  ④ 改计划
                </text>
                <text
                  x={replanCx}
                  y={LOOP_CY + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  换一家 / 换日期
                </text>
              </g>
            );
          })()}

          {/* 底部一句话点题（距底边 ≥16px） */}
          <text
            x={MARGIN_X}
            y={VIEW_H - 18}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            {blocked
              ? "执行行不通 → 反思哪错了 → 改剩下的计划 → 再执行：计划是边执行边修的，不是定死的"
              : "顺利时一条直线走完；但真实任务常会卡壳，这时就得靠反思 + 重规划绕过去"}
          </text>

          {/* 共用箭头标记 */}
          <defs>
            <marker
              id="rrl-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="rrl-arrow-warn"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="rrl-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>

        {/* 旁注 */}
        <div className="mt-3 rounded-control border border-border bg-elevated p-3">
          {blocked ? (
            <p className="text-xs text-secondary">
              <strong className="text-danger">受阻</strong>
              ：小特按计划去订那家酒店，发现
              <strong className="text-danger">订满了</strong>
              （执行失败）。它不会卡死在这一步，而是
              <strong className="text-warning">反思</strong>
              （原计划那家行不通）、
              <strong className="text-warning">改计划</strong>
              （换一家或换日期），再回到执行——
              <strong className="text-primary">绕过障碍，把活办成</strong>。
            </p>
          ) : (
            <p className="text-xs text-secondary">
              <strong className="text-success">顺利</strong>
              ：这次那家酒店一订就到，执行成功，直接
              <strong className="text-accent">继续下一步</strong>
              。下方的「反思 →
              改计划」回环这条路没用上。但真实任务常会卡壳，所以
              <strong className="text-primary">重规划能力必须有</strong>
              ——切到「受阻」看它怎么绕过去。
            </p>
          )}
        </div>

        {/* 一句话强调 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">核心</strong>
          ：计划<strong className="text-warning">不是定死的</strong>
          ，是边执行边修的——执行某步失败、前提变了，Agent
          就得反思哪里错了、调整剩余步骤再继续，而不是一条道走到黑。
        </p>
      </div>
    </DemoStage>
  );
}
