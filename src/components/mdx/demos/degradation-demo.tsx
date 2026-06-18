"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <DegradationDemo>：一次请求的「超时 → 重试 → 降级 → 兜底」可靠性路径交互演示
 * （HEL-320，《生产化部署》篇5·3，知识点 3：超时·降级·重试）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。生产里 LLM / 工具会超时、会失败。这一节给小特
 * 装上「可靠性三件套」：超时（卡太久就掐断）、重试（失败了自动再试几次）、降级 / 兜底
 * （主模型挂了切备用、实在不行返回一个安全的兜底答案，绝不直接把错误抛给用户）。
 *
 * 玩法：三个场景按钮——
 *   - 正常：主模型一次就返回 → 用户拿到主模型答案；
 *   - 主模型超时：主模型超时 → 重试仍超时 → 降级到备用模型 → 备用模型答案；
 *   - 全挂：主备都失败 → 返回安全兜底答案（而不是报错给用户）。
 * 切换看「这次请求经历了哪几步降级、用户最终拿到什么」——每一步一张状态卡，
 * 用语义色标 ✓ 成功 / ⏱ 超时 / ✗ 失败 / 🛟 兜底。
 *
 * canned（标注「路径示意，非实时」）——不真去跑模型 / 真超时，每一步的成败是预置的，
 * 只为直观展示「降级路径」长什么样。必有重置（回默认：看「正常」场景）。
 *
 * 为何 client：场景切换是真交互（受控状态 + 重算降级路径与最终结果）。颜色 / 间距 / 圆角
 * 全走 DESIGN token（硬规则 5）；状态用语义色（success / warning / danger / accent）；
 * 字号 ≥10px；无 WebGL。
 */

type StepKind = "ok" | "timeout" | "fail" | "fallback";

type Step = {
  /** 这一步在干啥。 */
  label: string;
  /** 这一步的结果。 */
  kind: StepKind;
  /** 一句话说明。 */
  note: string;
};

type Scenario = {
  id: string;
  /** 按钮文案。 */
  name: string;
  /** 降级路径：一步步走下来。 */
  steps: readonly Step[];
  /** 用户最终拿到的东西。 */
  finalLabel: string;
  /** 最终结果是哪种答案。 */
  finalKind: "primary" | "backup" | "fallback";
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "normal",
    name: "正常",
    steps: [
      {
        label: "调主模型（带超时）",
        kind: "ok",
        note: "1.2 秒内返回，没超时——一次就成功",
      },
    ],
    finalLabel: "用户拿到：主模型的答案",
    finalKind: "primary",
  },
  {
    id: "timeout",
    name: "主模型超时",
    steps: [
      {
        label: "调主模型（带超时 3s）",
        kind: "timeout",
        note: "卡了 3 秒还没返回 → 超时掐断，别让用户干等",
      },
      {
        label: "自动重试主模型（第 2 次）",
        kind: "timeout",
        note: "重试一次仍超时——主模型这会儿确实不行",
      },
      {
        label: "降级到备用模型",
        kind: "fallback",
        note: "切到备用模型（可能小一点 / 便宜一点），它正常返回了",
      },
    ],
    finalLabel: "用户拿到：备用模型的答案",
    finalKind: "backup",
  },
  {
    id: "alldown",
    name: "全挂",
    steps: [
      {
        label: "调主模型（带超时）",
        kind: "timeout",
        note: "超时，重试也超时——主模型不可用",
      },
      {
        label: "降级到备用模型",
        kind: "fail",
        note: "备用模型也返回错误——这下主备都挂了",
      },
      {
        label: "返回安全兜底答案",
        kind: "fallback",
        note: "走兜底：返回一句安全的话（如「服务繁忙，请稍后再试」），绝不把内部报错抛给用户",
      },
    ],
    finalLabel: "用户拿到：安全兜底答案（不是报错）",
    finalKind: "fallback",
  },
];

const DEFAULT_ID = "normal";

const KIND_STYLE: Record<
  StepKind,
  { icon: string; color: string; tag: string }
> = {
  ok: { icon: "✓", color: "var(--success)", tag: "成功" },
  timeout: { icon: "⏱", color: "var(--warning)", tag: "超时" },
  fail: { icon: "✗", color: "var(--danger)", tag: "失败" },
  fallback: { icon: "🛟", color: "var(--accent)", tag: "降级 / 兜底" },
};

const FINAL_COLOR: Record<Scenario["finalKind"], string> = {
  primary: "var(--success)",
  backup: "var(--accent)",
  fallback: "var(--accent)",
};

export function DegradationDemo() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_ID);
  const reset = () => setActiveId(DEFAULT_ID);

  const current = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];
  const finalColor = FINAL_COLOR[current.finalKind];

  return (
    <DemoStage
      title="可靠性三件套：超时 → 重试 → 降级 → 兜底，看一次请求怎么一步步降级、用户最终拿到什么"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            选一个场景，看这次请求经历了哪几步降级：
          </span>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                aria-pressed={activeId === s.id}
                className={`rounded-control border px-3 py-1.5 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  activeId === s.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[520px] text-sm">
        {/* 降级路径：一步步往下走 */}
        <ol className="flex flex-col gap-2">
          {current.steps.map((step, i) => {
            const st = KIND_STYLE[step.kind];
            return (
              <li
                key={`${current.id}-${i}`}
                className="rounded-control border bg-bg p-2.5"
                style={{ borderColor: st.color }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="font-mono text-base font-bold"
                      style={{ color: st.color }}
                    >
                      {st.icon}
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      第 {i + 1} 步 · {step.label}
                    </span>
                  </span>
                  <span
                    className="shrink-0 rounded-control border px-1.5 py-0.5 text-[10px] font-bold"
                    style={{ color: st.color, borderColor: st.color }}
                  >
                    {st.tag}
                  </span>
                </div>
                <p className="mt-1 pl-7 text-[11px] leading-relaxed text-secondary">
                  {step.note}
                </p>
              </li>
            );
          })}
        </ol>

        {/* 最终用户拿到什么 */}
        <div
          className="mt-3 rounded-control border bg-bg p-3"
          style={{ borderColor: finalColor }}
        >
          <p className="text-xs font-bold" style={{ color: finalColor }}>
            <span aria-hidden="true">🙋 </span>
            {current.finalLabel}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-secondary">
            {current.finalKind === "primary"
              ? "一切正常时，用户当然拿到主模型的答案。降级机制只在出问题时才登场——平时它静静待命。"
              : current.finalKind === "backup"
                ? "关键点：主模型超时了，用户并没有看到任何报错——超时掐断 + 重试 + 降级到备用，让请求悄悄走通了另一条路。"
                : "最坏情况下主备都挂了，但用户拿到的仍是一句安全、得体的兜底答案，而不是一堆吓人的内部错误堆栈——体验不崩，也不泄露内部信息。"}
          </p>
        </div>

        {/* canned 标注 + 点题 */}
        <p className="mt-3 rounded-control border border-warning/40 bg-bg p-2 text-[10.5px] leading-relaxed text-secondary">
          ⚠️ 降级路径为
          <strong className="text-primary">示意、非实时调用模型</strong>
          。重点看：一个做了降级的 Agent，主模型超时 / 全挂时
          <strong className="text-accent">不是直接报错</strong>
          ，而是重试 → 切备用 → 实在不行给兜底答案，把失败兜住。
        </p>
      </div>
    </DemoStage>
  );
}
