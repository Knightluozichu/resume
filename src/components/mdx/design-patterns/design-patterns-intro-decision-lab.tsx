"use client";

import { useId, useState } from "react";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const OFFICIAL_NODES = [
  "导论",
  "案例研究：设计一个文档编辑器",
  "创建型模式",
  "结构型模式",
  "行为型模式",
  "结论",
  "附录 A：术语表",
  "附录 B：记号指南",
  "附录 C：基础类",
  "参考文献",
  "索引",
] as const;

const FORCES = [
  {
    key: "editor",
    label: "文档编辑器",
    node: "案例研究：设计一个文档编辑器",
    context: "多种文档、撤销和导出同时存在",
    change: "新增一种导出格式",
    participants: "文档、编辑器、导出器",
    tradeoff: "隔离变化，但增加间接层",
    alternative: "保留一个小型直接分支",
  },
  {
    key: "creation",
    label: "创建规则",
    node: "创建型模式",
    context: "客户端不应知道具体产品类",
    change: "产品族或构造规则变化",
    participants: "创建者、产品、客户端",
    tradeoff: "隐藏构造，但增加创建入口",
    alternative: "直接构造一个稳定类型",
  },
  {
    key: "structure",
    label: "对象结构",
    node: "结构型模式",
    context: "已有对象需要组成更大结构",
    change: "接口、所有权或组合关系变化",
    participants: "客户端、组件、适配层",
    tradeoff: "降低耦合，但引入转发路径",
    alternative: "修改调用方并接受耦合",
  },
  {
    key: "behavior",
    label: "协作算法",
    node: "行为型模式",
    context: "算法或状态在多个对象间协作",
    change: "规则、状态或消息路径变化",
    participants: "触发者、协作者、状态持有者",
    tradeoff: "职责更清晰，但追踪更间接",
    alternative: "保留一个局部函数或状态机",
  },
] as const;

const LENSES = [
  {
    key: "context",
    label: "上下文",
    detail: "先确认问题和边界真的重复",
  },
  {
    key: "participants",
    label: "参与者",
    detail: "再核对职责、消息和所有权",
  },
  {
    key: "consequences",
    label: "后果",
    detail: "最后比较收益、代价和替代方案",
  },
] as const;

type ForceKey = (typeof FORCES)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function DesignPatternsIntroDecisionLab() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `design-patterns-intro-decision-arrow-${instanceId}`;
  const [forceKey, setForceKey] = useState<ForceKey>("editor");
  const [lensKey, setLensKey] = useState<LensKey>("context");
  const [contextMismatch, setContextMismatch] = useState(false);

  const force = FORCES.find((item) => item.key === forceKey) ?? FORCES[0];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[0];
  const verdict = contextMismatch
    ? {
        color: COLORS.warning,
        title: "拒绝：上下文与候选模式错配",
        detail:
          "当前变化压力不足以支付新增间接层；保留错配反例，优先选择直接实现或补充可验证的变化证据。",
      }
    : {
        color: COLORS.success,
        title: "可继续：评审卡已展开",
        detail: `${force.label}聚焦“${lens.label}”：${lens.detail}。这不是自动推荐，仍需运行样例并记录最终后果。`,
      };

  function reset() {
    setForceKey("editor");
    setLensKey("context");
    setContextMismatch(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="design-patterns-intro-decision-lab"
      data-unit-id="designpatterns-01"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DESIGN PATTERNS · INTRO
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              模式选择评审台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先选变化压力，再切换评审镜头；故障开关会注入一个上下文错配反例。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置模式选择评审台"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择变化压力">
          <span className="self-center text-xs text-secondary">变化压力：</span>
          {FORCES.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={forceKey === item.key}
              onClick={() => setForceKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                forceKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择评审镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {LENSES.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={lensKey === item.key}
                onClick={() => setLensKey(item.key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  lensKey === item.key
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={contextMismatch}
            onClick={() => setContextMismatch((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              contextMismatch
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {contextMismatch ? "恢复上下文" : "注入上下文错配"}
          </button>
        </div>

        <svg
          aria-label="模式选择评审图：从问题上下文连接到参与者结构，再连接到后果与替代方案；支持变化压力、评审镜头、上下文错配故障和重置。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 760 560"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0L8 4L0 8Z" fill={COLORS.secondary} />
            </marker>
          </defs>

          <rect
            fill={COLORS.background}
            height="520"
            rx="16"
            stroke={COLORS.border}
            width="720"
            x="20"
            y="20"
          />
          <text fill={COLORS.secondary} fontSize="13" x="48" y="54">
            当前：{force.label} · {force.node} · {OFFICIAL_NODES.length}{" "}
            个正式节点 · 只改变评审焦点
          </text>

          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="204"
            x2="274"
            y1="216"
            y2="216"
          />
          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="486"
            x2="556"
            y1="216"
            y2="216"
          />

          <g>
            <rect
              fill={lensKey === "context" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "context" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "context" ? "2" : "1"}
              width="224"
              x="40"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="60"
              y="122"
            >
              问题上下文
            </text>
            <text fill={COLORS.primary} fontSize="14" x="60" y="164">
              {contextMismatch ? "变化压力不足" : force.context}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="212">
              变化轴：{force.change}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="240">
              边界：触发者 + 成功条件
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="286">
              当前镜头：{lensKey === "context" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="334">
              故障：{contextMismatch ? "已注入" : "未注入"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "participants" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={
                lensKey === "participants" ? COLORS.accent : COLORS.border
              }
              strokeWidth={lensKey === "participants" ? "2" : "1"}
              width="224"
              x="268"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="288"
              y="122"
            >
              参与者结构
            </text>
            <text fill={COLORS.primary} fontSize="14" x="288" y="164">
              {force.participants}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="212">
              创建 / 组合 / 协作职责
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="240">
              消息路径：可以画出来
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="268">
              所有权：需要明确
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="306">
              当前镜头：{lensKey === "participants" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="334">
              状态：{contextMismatch ? "待重新划界" : "可复核"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "consequences" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={
                lensKey === "consequences" ? COLORS.accent : COLORS.border
              }
              strokeWidth={lensKey === "consequences" ? "2" : "1"}
              width="224"
              x="496"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="516"
              y="122"
            >
              后果与替代
            </text>
            <text fill={COLORS.primary} fontSize="14" x="516" y="164">
              {contextMismatch ? "候选模式被拒绝" : force.tradeoff}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="212">
              收益：隔离变化压力
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="240">
              代价：间接层与调试路径
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="268">
              替代：{force.alternative}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="306">
              当前镜头：{lensKey === "consequences" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="334">
              结论：{contextMismatch ? "保留拒绝理由" : "继续运行样例"}
            </text>
          </g>

          <rect
            fill={verdict.color}
            height="82"
            rx="12"
            width="676"
            x="42"
            y="394"
          />
          <text
            fill={COLORS.background}
            fontSize="14"
            fontWeight="700"
            x="64"
            y="426"
          >
            {verdict.title}
          </text>
          <text fill={COLORS.background} fontSize="12" x="64" y="452">
            {verdict.detail}
          </text>
        </svg>

        <p className="mt-3 text-xs leading-5 text-secondary">
          记录合同：问题上下文、变化轴、参与者、力量、后果、替代方案和拒绝条件。
        </p>
      </div>
    </figure>
  );
}
