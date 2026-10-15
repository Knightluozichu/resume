"use client";

import { useState } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";

// 需求清单：前言专属年代分叉、来源能力矩阵、双轨复现对齐；交互改变路径/格子/断点；
// 三个旧 export 由 bridge 保留；独立重置、键盘控制、44px 触控、窄屏可读；不模拟 API 成功率。
const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

// 只复用控制原语，不共享领域图形。局部样式补足现有控制条的触控尺寸；隐藏其
// aria-hidden 的重复步点，键盘仍可使用上/下一步和进度条，避免隐藏区可聚焦。
const labClass =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input[type=range]]:min-h-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_ol[aria-hidden=true]]:hidden [&_.justify-center]:flex-wrap";
const svgClass = "mx-auto block h-auto w-full max-w-md";
const buttonClass =
  "rounded-lg border border-border px-3 py-2 text-sm text-primary hover:border-accent";

const EDITION_STEPS = [
  { label: "first-edition", caption: "第一版语境：先固定原书坐标" },
  { label: "translation", caption: "2024-02：中文出版，不等于接口升级" },
  { label: "migration", caption: "2026 学习迁移：另开核对轨，不覆盖历史" },
] as const satisfies readonly TeachingStep[];

const BOUNDARY_ROWS = [
  {
    label: "chat-completion",
    caption: "ChatCompletion：目录涉及不等于旧调用今天能运行",
    title: "对话调用",
    detail: "ChatCompletion",
    book: true,
    current: true,
    explanation:
      "第一版目录 2.5 涉及 ChatCompletion；现行迁移指南讨论 Chat Completions 与 Responses。两侧都有来源，不表示旧 SDK 方法签名、默认参数或模型名仍可直接使用。",
  },
  {
    label: "responses",
    caption: "Responses：现行迁移资料不能反向补写第一版",
    title: "现行接口",
    detail: "Responses",
    book: false,
    current: true,
    explanation:
      "Responses 属于现行迁移核对轨，不能放进第一版目录。现行指南可说明迁移方向，但一次请求能否成功仍需检查所用 SDK、模型和账户条件。",
  },
  {
    label: "tool-execution",
    caption: "工具扩展：原书插件与现行工具不能画等号",
    title: "工具扩展",
    detail: "插件 ≠ 现行工具",
    book: true,
    current: true,
    explanation:
      "第一版第 5 章列出 LangChain 与 GPT-4 插件；迁移指南介绍现行工具能力。这里比较的是学习主题，不是相同协议，更不意味着模型提出的动作已经获得业务授权。",
  },
  {
    label: "reliability",
    caption: "稳定交付：目录与接口说明都不能代替运行评测",
    title: "稳定交付",
    detail: "需另存运行证据",
    book: false,
    current: false,
    explanation:
      "空圈表示仅凭该列来源不能证明稳定交付，不表示模型完全没有这种能力。必须另存版本、输入、输出、验收标准与人工判断；一次成功也不是稳定性证明。",
  },
] as const;

const REPLAY_STEPS = [
  { label: "aligned", caption: "可核对基线：固定输入与标准，分别记录版本" },
  { label: "missing-version", caption: "缺少历史版本：接口行断开，无法归因" },
  { label: "changed-input", caption: "同时改了输入：实验行错位，不能公平比较" },
] as const satisfies readonly TeachingStep[];

function usePrefaceSequence(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(timeline) {
      const clock = { beat: 0 };
      steps.forEach((step, index) => {
        const start = index * TEACHING_BEAT_MS;
        timeline.label(step.label, start);
        timeline.add(
          clock,
          {
            beat: [index, index + 1],
            duration: TEACHING_BEAT_MS,
            ease: "linear",
          },
          start,
        );
      });
    },
  });
}

function captions(steps: readonly TeachingStep[]) {
  return Object.fromEntries(
    steps.map((step) => [step.label, step.caption ?? step.label]),
  );
}

export function LaePrefaceEditionTimelineLab() {
  const timeline = usePrefaceSequence(EDITION_STEPS);
  const stage = timeline.currentStep;
  const positions = [
    [38, 72],
    [38, 174],
    [276, 318],
  ] as const;
  const [cursorX, cursorY] = positions[stage];

  return (
    <section
      className={labClass}
      data-visual-kind="preface-edition-branch-timeline"
      aria-label="前言实验一：历史第一版与现行迁移时间轴"
    >
      <h3 className="text-base font-semibold text-primary">
        年代分叉：保留历史，另开迁移轨
      </h3>
      <p className="mt-2 text-sm text-secondary">
        节点只表示本课程的阅读顺序，不按年距缩放；2026 是学习迁移语境，不是
        Responses 发布日期。
      </p>
      <svg
        className={svgClass}
        viewBox="0 0 360 420"
        role="img"
        aria-label={`版本时间轴，当前为${EDITION_STEPS[stage].caption}。历史轨保持第一版坐标，迁移轨独立分叉。`}
      >
        <title>第一版语境、2024 年中文出版与 2026 年迁移核对</title>
        <path d="M38 72 V344" fill="none" stroke={C.border} strokeWidth="3" />
        <path
          d="M38 174 V220 Q38 244 64 244 H250 Q276 244 276 270 V318"
          fill="none"
          stroke={C.border}
          strokeWidth="3"
          strokeDasharray="5 5"
        />
        {stage >= 1 && (
          <path d="M38 72 V174" fill="none" stroke={C.accent} strokeWidth="4" />
        )}
        {stage >= 2 && (
          <g>
            <path
              d="M38 174 V220 Q38 244 64 244 H250 Q276 244 276 270 V318"
              fill="none"
              stroke={C.accent}
              strokeWidth="4"
            />
            <path
              d="m269 306 7 12 7-12"
              fill="none"
              stroke={C.accent}
              strokeWidth="3"
            />
            <text
              x="145"
              y="232"
              textAnchor="middle"
              fontSize="16"
              fill={C.accent}
            >
              新增迁移记录
            </text>
          </g>
        )}
        {positions.map(([x, y], index) => (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="7"
            fill={index <= stage ? C.accent : C.bg}
            stroke={index <= stage ? C.accent : C.border}
            strokeWidth="2"
          />
        ))}
        <circle
          cx={cursorX}
          cy={cursorY}
          r="14"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <g fontSize="16" fill={C.text}>
          <text x="64" y="68">
            第一版语境
          </text>
          <text x="64" y="170">
            2024-02 中文出版
          </text>
          <text x="170" y="352">
            2026 迁移核对
          </text>
        </g>
        <g fontSize="16" fill={C.muted}>
          <text x="64" y="92">
            ChatCompletion / Completion
          </text>
          <text x="64" y="114">
            GPT-4 插件、当时的微调流程
          </text>
          <text x="64" y="194">
            五章目录；不据此推断 API 版本
          </text>
          <text x="12" y="370">
            历史坐标
          </text>
          <text x="12" y="391">
            继续保留
          </text>
          <text x="170" y="374">
            Responses / 现行工具
          </text>
          <text x="170" y="396">
            逐项查当前文档与实测
          </text>
        </g>
      </svg>
      <p className="text-sm text-secondary" role="status">
        {EDITION_STEPS[stage].caption}
        。双圈是当前节点；分叉不是“新接口自动兼容旧代码”。
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={captions(EDITION_STEPS)}
        reset={{ label: "重置时间轴", onClick: () => timeline.goToStep(0) }}
      />
    </section>
  );
}

export function LaePrefaceCapabilityBoundaryLab() {
  const timeline = usePrefaceSequence(BOUNDARY_ROWS);
  const [backfill, setBackfill] = useState(false);
  const selected = timeline.currentStep;
  const selectedRow = BOUNDARY_ROWS[selected];
  const reset = () => {
    setBackfill(false);
    timeline.goToStep(0);
  };

  return (
    <section
      className={labClass}
      data-visual-kind="preface-source-capability-matrix"
      aria-label="前言实验二：来源与能力边界对照"
    >
      <h3 className="text-base font-semibold text-primary">
        来源能证明什么，不能证明什么
      </h3>
      <p className="mt-2 text-sm text-secondary">
        方块＝该类主题有来源；空圈＝仅凭该来源不能证明；叉号＝错误倒填。不是能力评分或完整功能清单。
      </p>
      <svg
        className={svgClass}
        viewBox="0 0 360 410"
        role="img"
        aria-label={`能力边界矩阵，当前核对${selectedRow.title}。${backfill ? "错误示例开启：Responses 被从现行资料倒填到第一版。" : "第一版没有被倒填 Responses。"}`}
      >
        <title>第一版目录与现行迁移文档的证据能力矩阵</title>
        <g fontSize="16" fill={C.text} textAnchor="middle">
          <text x="211" y="28">
            第一版
          </text>
          <text x="307" y="28">
            现行迁移
          </text>
          <text x="211" y="48">
            目录
          </text>
          <text x="307" y="48">
            文档
          </text>
        </g>
        <path d="M163 59 V370 M259 59 V370" stroke={C.border} fill="none" />
        {BOUNDARY_ROWS.map((row, index) => {
          const y = 92 + index * 80;
          return (
            <g key={row.label}>
              {selected === index && (
                <rect
                  x="3"
                  y={y - 29}
                  width="354"
                  height="66"
                  rx="8"
                  fill={C.elevated}
                  stroke={C.accent}
                  strokeWidth="2"
                />
              )}
              <text x="12" y={y - 5} fontSize="16" fill={C.text}>
                {row.title}
              </text>
              <text x="12" y={y + 17} fontSize="16" fill={C.muted}>
                {row.detail}
              </text>
              {[row.book, row.current].map((supported, column) => {
                const x = 211 + column * 96;
                return supported ? (
                  <rect
                    key={column}
                    x={x - 10}
                    y={y - 10}
                    width="20"
                    height="20"
                    fill={selected === index ? C.accent : C.muted}
                  />
                ) : (
                  <circle
                    key={column}
                    cx={x}
                    cy={y}
                    r="10"
                    fill={C.bg}
                    stroke={C.muted}
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          );
        })}
        {backfill && (
          <g fill="none" stroke={C.danger} strokeWidth="3">
            <path
              d="M307 159 Q259 117 211 159 M211 149 V159 H222"
              strokeDasharray="4 3"
            />
            <path d="m202 163 18 18 m0-18-18 18" />
          </g>
        )}
        <text
          x="180"
          y="400"
          textAnchor="middle"
          fontSize="16"
          fill={backfill ? C.danger : C.muted}
        >
          {backfill
            ? "错误：当前资料不能改写第一版"
            : "两列有标记，也不代表接口等价"}
        </text>
      </svg>
      <button
        type="button"
        className={buttonClass}
        aria-pressed={backfill}
        onClick={() => {
          timeline.pause();
          setBackfill(!backfill);
          timeline.goToStep(1);
        }}
      >
        {backfill
          ? "关闭错误示例：现代接口倒填原书"
          : "开启错误示例：现代接口倒填原书"}
      </button>
      <p className="mt-3 text-sm text-secondary" role="status">
        {selectedRow.explanation}
        {backfill && " 红色虚线逆向连线和叉号是待纠正的错误，不是新增事实。"}
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={captions(BOUNDARY_ROWS)}
        reset={{ label: "重置边界对照", onClick: reset }}
      />
    </section>
  );
}

const SNAPSHOT_ROWS = [
  { label: "目录坐标", historical: "2.5 对话调用", migration: "仍对齐 2.5" },
  { label: "接口与依赖", historical: "历史快照 A", migration: "迁移快照 B" },
  { label: "固定输入", historical: "同一份样本", migration: "同一份样本" },
  { label: "验收标准", historical: "同一套标准", migration: "同一套标准" },
] as const;

export function LaePrefaceReplayAlignmentLab() {
  const timeline = usePrefaceSequence(REPLAY_STEPS);
  const fault = timeline.currentStep;
  const brokenRow = fault === 1 ? 1 : fault === 2 ? 2 : -1;
  const explanations = [
    "四行均可核对：A、B 是分别保存的快照占位，不是具体版本号，也不要求两个时代使用相同接口。图只说明记录条件齐备，不证明请求成功或输出可靠。",
    "历史快照缺失：不知道原调用依赖什么 SDK、模型和参数。接口行出现断口，不能把结果差异归因于迁移；应补回真实记录，不能猜一个版本号。",
    "迁移时还换了样本：输入行向下错位，差异可能来自输入而非接口。恢复同一份样本再评测，并保留这次失败比较。",
  ];

  return (
    <section
      className={labClass}
      data-visual-kind="preface-replay-snapshot-alignment"
      aria-label="前言实验三：历史与迁移实验记录对齐"
    >
      <h3 className="text-base font-semibold text-primary">
        复现记录：两个时代，一组可比条件
      </h3>
      <p className="mt-2 text-sm text-secondary">
        横线表示可核对，不代表数值相等。逐步注入“缺版本”和“换输入”，观察断口与错位。
      </p>
      <svg
        className={svgClass}
        viewBox="0 0 360 420"
        role="img"
        aria-label={`双轨实验记录，当前为${REPLAY_STEPS[fault].caption}。${brokenRow < 0 ? "四行条件可以核对，仍需真实评测。" : `${SNAPSHOT_ROWS[fault === 1 ? 1 : 2].label}行已失去可比性。`}`}
      >
        <title>历史快照和迁移快照的逐项对齐图</title>
        <g textAnchor="middle" fontSize="16" fill={C.text}>
          <text x="83" y="29">
            历史复现
          </text>
          <text x="277" y="29">
            现行迁移
          </text>
        </g>
        <path d="M83 49 V362 M277 49 V362" stroke={C.border} strokeWidth="3" />
        {SNAPSHOT_ROWS.map((row, index) => {
          const y = 84 + index * 84;
          const broken = index === brokenRow;
          const rightY = fault === 2 && index === 2 ? y + 24 : y;
          return (
            <g key={row.label}>
              <text
                x="180"
                y={y - 22}
                textAnchor="middle"
                fontSize="16"
                fill={broken ? C.danger : C.muted}
              >
                {row.label}
              </text>
              {broken ? (
                <g fill="none" stroke={C.danger} strokeWidth="3">
                  <path
                    d={`M83 ${y} H156 M204 ${rightY} H277`}
                    strokeDasharray="5 4"
                  />
                  <path d={`m171 ${y - 8} 18 16 m0-16-18 16`} />
                  {fault === 2 && <path d={`M294 ${y} v24 m-5-6 5 6 5-6`} />}
                </g>
              ) : (
                <path d={`M83 ${y} H277`} stroke={C.accent} strokeWidth="3" />
              )}
              <circle
                cx="83"
                cy={y}
                r="8"
                fill={fault === 1 && index === 1 ? C.bg : C.accent}
                stroke={broken ? C.danger : C.accent}
                strokeWidth="2"
              />
              <circle
                cx="277"
                cy={rightY}
                r="8"
                fill={broken ? C.danger : C.accent}
              />
              <g fontSize="16" textAnchor="middle" fill={C.text}>
                <text x="83" y={y + 24}>
                  {fault === 1 && index === 1 ? "版本未记录" : row.historical}
                </text>
                <text x="277" y={rightY + 24}>
                  {fault === 2 && index === 2
                    ? "换了另一份样本"
                    : row.migration}
                </text>
              </g>
            </g>
          );
        })}
        <text
          x="180"
          y="400"
          textAnchor="middle"
          fontSize="16"
          fill={brokenRow < 0 ? C.muted : C.danger}
        >
          {brokenRow < 0
            ? "记录可比 ≠ 已经验证能力"
            : "先修复断点，再解释结果差异"}
        </text>
      </svg>
      <p className="text-sm text-secondary" role="status">
        {explanations[fault]}
      </p>
      <TimelineControls
        timeline={timeline}
        labelText={captions(REPLAY_STEPS)}
        reset={{ label: "重置复现对照", onClick: () => timeline.goToStep(0) }}
      />
    </section>
  );
}
