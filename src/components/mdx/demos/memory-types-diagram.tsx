"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <MemoryTypesDiagram>：三类记忆（情景 / 语义 / 程序）并排对比交互演示（HEL-301，
 * 《记忆系统 Memory》篇2·3，知识点 4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。长期记忆按内容性质分三类：
 *   - 情景记忆（episodic）：发生过的事 / 对话历史，如「上次你订了去上海的票」
 *   - 语义记忆（semantic）：事实知识，如「你预算 500、喜欢靠窗」
 *   - 程序记忆（procedural）：怎么做某事的步骤 / 技能，如「订票的标准流程：查→比价→下单→确认」
 * 三张卡并排，各配一句定义 + 小特的例子；点一张卡高亮 + 展开旁注（这类记忆装什么、什么时候用）。
 *
 * 用 HTML 卡片（非 SVG）：三类记忆各含一段长定义 + 例子，HTML 卡片排版比 SVG 文本更稳，
 * 几何天然守规则（无 viewBox 利用率 / text bbox 距边问题）。分组靠标题 + 网格对齐，
 * **不套整圈容器大框**（HEL-274）。
 *
 * 为何 client：卡片点击是真交互（受控状态），用状态直接高亮 + 展开旁注——「三类型对比 +
 * 点击看清」落地（参考 ToolSchemaAnatomy 的 curated 范式）。颜色 / 间距 / 圆角全部走
 * DESIGN token（硬规则 5）。
 */

type TypeKey = "episodic" | "semantic" | "procedural";

type MemoryType = {
  key: TypeKey;
  /** 中文名 + 英文名。 */
  label: string;
  en: string;
  color: string;
  /** 一句话定义。 */
  def: string;
  /** 小特的例子。 */
  example: string;
  /** 点开后的旁注：这类记忆装什么、什么时候用。 */
  note: string;
};

const TYPES: readonly MemoryType[] = [
  {
    key: "episodic",
    label: "情景记忆",
    en: "episodic",
    color: "var(--accent)",
    def: "发生过的事、对话历史——「什么时候发生了什么」。",
    example: "「上次你订了去上海的票。」",
    note: "装的是「经历过的具体事件」，带时间线。小特靠它记住你们之前聊过什么、办过什么——下次接着上回的茬，而不是每次都从零开始。对应人脑里「记得昨天去过哪」那种记忆。",
  },
  {
    key: "semantic",
    label: "语义记忆",
    en: "semantic",
    color: "var(--success)",
    def: "事实知识、稳定的偏好——「关于你的客观事实」。",
    example: "「你预算 500、喜欢靠窗。」",
    note: "装的是「不带时间、长期为真的事实」：你的偏好、设定、画像。小特靠它把你当熟人对待，订票自动按你预算、自动选靠窗，不用你每次重说。对应人脑里「知道水会结冰」那种记忆。",
  },
  {
    key: "procedural",
    label: "程序记忆",
    en: "procedural",
    color: "var(--warning)",
    def: "怎么做某事的步骤、技能——「办这件事的标准流程」。",
    example: "「订票流程：查→比价→下单→确认。」",
    note: "装的是「做某事的套路 / 技能」：完成一类任务该走哪几步。小特靠它把「订票」这种活按固定流程办利索，不用每次现想步骤。对应人脑里「会骑车」那种说不太清、但一上手就会的记忆。",
  },
];

export function MemoryTypesDiagram() {
  // null = 全览（无高亮）。
  const [active, setActive] = useState<TypeKey | null>(null);
  const reset = () => setActive(null);

  const activeType = active ? TYPES.find((t) => t.key === active)! : null;

  return (
    <DemoStage
      title="长期记忆的三种类型：情景 / 语义 / 程序，各装不同的东西"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            点一类看它装什么、什么时候用：
          </span>
          {TYPES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(active === t.key ? null : t.key)}
              aria-pressed={active === t.key}
              className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                active === t.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="w-full max-w-[620px] text-sm">
        {/* 三类记忆并排（网格对齐，不套整圈大框） */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TYPES.map((t) => {
            const on = active === t.key;
            const dim = active !== null && !on;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(on ? null : t.key)}
                aria-pressed={on}
                className="flex flex-col gap-2 rounded-control border-l-2 p-3 text-left transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: on ? t.color : "var(--border)",
                  borderLeftColor: t.color,
                  backgroundColor: on ? "var(--bg-elevated)" : "var(--bg)",
                  opacity: dim ? 0.45 : 1,
                }}
              >
                <span className="text-sm font-bold" style={{ color: t.color }}>
                  {t.label}
                  <span className="ml-1 font-mono text-[10px] font-normal text-secondary">
                    {t.en}
                  </span>
                </span>
                <span className="text-xs text-secondary">{t.def}</span>
                <span className="text-xs font-medium text-primary">
                  {t.example}
                </span>
              </button>
            );
          })}
        </div>

        {/* 旁注：选中类型装什么、什么时候用 */}
        <div className="mt-3 rounded-control border border-border bg-elevated p-3">
          {activeType ? (
            <>
              <p
                className="mb-1 text-xs font-semibold"
                style={{ color: activeType.color }}
              >
                {activeType.label}（{activeType.en}）
              </p>
              <p className="text-xs text-secondary">{activeType.note}</p>
            </>
          ) : (
            <p className="text-xs text-secondary">
              长期记忆按内容分三类：
              <strong className="text-accent">情景</strong>
              （发生过的事）、
              <strong className="text-success">语义</strong>
              （事实知识）、
              <strong className="text-warning">程序</strong>
              （怎么做某事的步骤）。点上面任意一类，看它具体装什么、小特什么时候用得上。
            </p>
          )}
        </div>

        {/* 一句话区分强调 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">一句话区分</strong>：情景 = 记
          <strong className="text-accent">「发生过什么」</strong>，语义 = 记
          <strong className="text-success">「关于你的事实」</strong>，程序 = 记
          <strong className="text-warning">「这事该怎么办」</strong>。
        </p>
      </div>
    </DemoStage>
  );
}
