"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <AutonomySpectrumExplorer>：「自治性谱系」交互演示（HEL-253，《什么是 AI Agent》篇1·1，
 * 知识点 4）。
 *
 * 5 级自治谱系 L1→L5，从「辅助建议」到「全自治」，核心变量 = 谁来做决策（人 vs Agent）：
 *   L1 辅助建议 / L2 人工确认 / L3 半自治 / L4 监督自治 / L5 全自治。
 * 上方一条水平谱系条，5 个停靠点，选中点高亮；下方一条「决策权」分裂条，随级别变化人 vs
 * Agent 的占比（用 token 色），并给一句典型例子 caption。拖滑块或点按钮切级别，必有重置，
 * 初始停在 L3（半自治，对比一眼可见）。
 *
 * 为何 client：滑块/按钮是真交互（受控状态），用状态直接算 SVG 属性——这是 chapter-spec
 * 「每个知识点配可视化」里「CSS/SVG 轻量演示」的落地方式（无 WebGL，参考 RgbMixerDemo 范式）。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）：人=--text-secondary、Agent=--accent，
 * 选中高亮=--accent；几何常量具名且为 4 的倍数。
 */

// —— 画布与谱系条几何（viewBox 0 0 680 280；节点 ≥12px 距边；字号 ≥10px）。 ——
const VIEW_W = 680;
const VIEW_H = 280;

const TRACK_X = 56; // 谱系条左端
const TRACK_W = 568; // 谱系条宽度（右端 624，距右边 56）
const TRACK_Y = 64; // 谱系条 y
const LEVELS = 5;
// 停靠点单一 x 公式：5 个点均匀分布在 [TRACK_X, TRACK_X+TRACK_W]。
const stopX = (i: number) => TRACK_X + (TRACK_W * i) / (LEVELS - 1);

// 决策权分裂条几何。
const SPLIT_X = TRACK_X;
const SPLIT_W = TRACK_W;
const SPLIT_Y = 168;
const SPLIT_H = 44;

type Level = {
  id: number;
  name: string;
  /** 这一级谁来做决策 / Agent 自治到什么程度（一句话）。 */
  desc: string;
  /** 典型例子。 */
  example: string;
  /** Agent 掌握的决策权占比（0~1），其余归人。 */
  agentShare: number;
};

const LEVELS_DATA: readonly Level[] = [
  {
    id: 1,
    name: "L1 辅助建议",
    desc: "Agent 只给建议，做不做、怎么做全由人决定",
    example: "搜索框给你补全候选词——选不选你说了算",
    agentShare: 0.1,
  },
  {
    id: 2,
    name: "L2 人工确认",
    desc: "Agent 草拟方案，每一步都要人点「确认」才执行",
    example: "小特拟好订票方案，弹窗让你点确认才下单",
    agentShare: 0.3,
  },
  {
    id: 3,
    name: "L3 半自治",
    desc: "Agent 自己跑多数步骤，遇到关键决策才找人",
    example: "小特自己比价、下单，只在超预算时才问你",
    agentShare: 0.55,
  },
  {
    id: 4,
    name: "L4 监督自治",
    desc: "Agent 全程自己干，人只在旁边盯着、可随时叫停",
    example: "小特独立办完整趟差旅，你只看进度、随时能喊停",
    agentShare: 0.8,
  },
  {
    id: 5,
    name: "L5 全自治",
    desc: "Agent 全权处理，无需人介入（方向盘完全交给它）",
    example: "把整件事丢给小特，办完才告诉你结果",
    agentShare: 1,
  },
];

const INITIAL_LEVEL = 3; // 初始停在 L3（半自治，对比一眼可见）

export function AutonomySpectrumExplorer() {
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const reset = () => setLevel(INITIAL_LEVEL);

  const cur = LEVELS_DATA[level - 1];
  const agentW = SPLIT_W * cur.agentShare; // Agent 段宽
  const humanW = SPLIT_W - agentW; // 人 段宽
  const selX = stopX(level - 1);

  return (
    <DemoStage
      title="自治性谱系：级别越高，方向盘越多地交给 Agent"
      onReset={reset}
      controls={
        <>
          <Slider
            label="自治级别"
            min={1}
            max={5}
            step={1}
            value={level}
            onChange={setLevel}
            format={(v) => `L${v}`}
          />
          <div className="flex flex-wrap gap-2">
            {LEVELS_DATA.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLevel(l.id)}
                aria-pressed={level === l.id}
                className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  level === l.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`自治性谱系，当前选中 ${cur.name}。谱系条从左到右是 L1 辅助建议、L2 人工确认、L3 半自治、L4 监督自治、L5 全自治五个级别，级别越高，决策权越多地从人交给 Agent。当前级别：${cur.desc}。下方决策权分裂条显示，这一级里 Agent 大约掌握 ${Math.round(cur.agentShare * 100)}% 的决策权，其余归人。典型例子：${cur.example}。`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 谱系条底线 —— */}
        <line
          x1={TRACK_X}
          y1={TRACK_Y}
          x2={TRACK_X + TRACK_W}
          y2={TRACK_Y}
          stroke="var(--border)"
          strokeWidth="3"
        />
        {/* 已点亮段（左端到当前级别） */}
        <line
          x1={TRACK_X}
          y1={TRACK_Y}
          x2={selX}
          y2={TRACK_Y}
          stroke="var(--accent)"
          strokeWidth="3"
        />

        {/* —— 5 个停靠点 + 级别标签 —— */}
        {LEVELS_DATA.map((l, i) => {
          const x = stopX(i);
          const active = l.id === level;
          return (
            <g key={l.id}>
              <circle
                cx={x}
                cy={TRACK_Y}
                r={active ? 9 : 6}
                fill={active ? "var(--accent)" : "var(--bg)"}
                stroke={active ? "var(--accent)" : "var(--border)"}
                strokeWidth="2"
              />
              <text
                x={x}
                y={TRACK_Y - 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight={active ? 700 : 600}
                fill={active ? "var(--accent)" : "var(--text-secondary)"}
              >
                {`L${l.id}`}
              </text>
            </g>
          );
        })}

        {/* 谱系两端语义标注 */}
        <text
          x={TRACK_X}
          y={TRACK_Y + 26}
          textAnchor="start"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          ← 人主导
        </text>
        <text
          x={TRACK_X + TRACK_W}
          y={TRACK_Y + 26}
          textAnchor="end"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          Agent 主导 →
        </text>

        {/* —— 决策权分裂条标题 —— */}
        <text
          x={SPLIT_X}
          y={SPLIT_Y - 12}
          textAnchor="start"
          fontSize="11"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          {`决策权：谁做主（${cur.name}）`}
        </text>

        {/* —— 决策权分裂条：人段（左，灰）+ Agent 段（右，accent）—— */}
        {/* 人段 */}
        <rect
          x={SPLIT_X}
          y={SPLIT_Y}
          width={Math.max(0, humanW)}
          height={SPLIT_H}
          rx="8"
          fill="var(--text-secondary)"
          fillOpacity="0.25"
          stroke="var(--border)"
          strokeWidth="1.2"
        />
        {humanW > 56 && (
          <text
            x={SPLIT_X + humanW / 2}
            y={SPLIT_Y + SPLIT_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            {`人 ${Math.round((1 - cur.agentShare) * 100)}%`}
          </text>
        )}
        {/* Agent 段 */}
        <rect
          x={SPLIT_X + humanW}
          y={SPLIT_Y}
          width={Math.max(0, agentW)}
          height={SPLIT_H}
          rx="8"
          fill="var(--accent)"
          fillOpacity="0.22"
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
        {agentW > 56 && (
          <text
            x={SPLIT_X + humanW + agentW / 2}
            y={SPLIT_Y + SPLIT_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            {`Agent ${Math.round(cur.agentShare * 100)}%`}
          </text>
        )}

        {/* —— 当前级别一句话描述 —— */}
        <text
          x={VIEW_W / 2}
          y={SPLIT_Y + SPLIT_H + 28}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          fill="var(--text-primary)"
        >
          {cur.desc}
        </text>
        {/* —— 典型例子（在描述下一行，距底边 ≥14px）—— */}
        <text
          x={VIEW_W / 2}
          y={SPLIT_Y + SPLIT_H + 46}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {`例：${cur.example}`}
        </text>
      </svg>
    </DemoStage>
  );
}
