"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <CompressionCompare>：「上下文压缩 / 摘要」前后对比交互演示（HEL-306，《上下文工程与压缩》
 * 篇3·2，知识点 3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。当对话历史 / 资料太长、快撑爆桌面（上下文窗口）时，
 * 一招是**摘要压缩**——把一长段浓缩成几句要点，丢掉冗余、留住关键，腾出窗口空间。代价是
 * 可能丢细节，得权衡压多狠。
 *
 * 这个 Demo：左边是「压缩前」的一长段对话历史（占很多 token），右边 / 切换后是「压缩后」的
 * 几句要点摘要（省下大半 token）。toggle 在「原文」和「摘要」之间切，顶部读出「压缩前 N token
 * → 压缩后 M token，省下 X%」，并明确标注「压缩可能丢了什么细节」（权衡）。全 curated 数据、
 * 标「示意·非实时」。
 *
 * 为何 client：toggle 是真交互（受控状态）。纯 DOM/CSS 排版（无 WebGL / 无 SVG 几何），
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。参考 ChunkingDemo 的卡片排版范式。
 */

// curated 对话历史（多轮闲聊 + 夹着一条关键事实）。token 数为示意估算。
const ORIGINAL_TURNS: readonly { role: string; text: string }[] = [
  { role: "用户", text: "在吗？想问个事，不过先吐个槽，今天地铁挤死了。" },
  { role: "小特", text: "在的～地铁高峰确实难熬。你慢慢说，我都听着。" },
  {
    role: "用户",
    text: "对了我上周二买的那台咖啡机，型号是 X-200，用了三天发现漏水。",
  },
  { role: "小特", text: "X-200 漏水确实让人头疼，能描述下是从哪儿漏吗？" },
  {
    role: "用户",
    text: "从底座那圈漏的。哦还有，我是在你们官网下的单，订单号 88321。",
  },
  { role: "小特", text: "记下了：X-200、底座漏水、订单 88321。想退还是换？" },
  {
    role: "用户",
    text: "想退。顺便问下，你们客服电话多少？我妈也想买个别的。",
  },
  {
    role: "小特",
    text: "退货可以的。客服 400-820-XXXX。你妈想看哪类我也能推荐。",
  },
];

const ORIGINAL_TOKENS = 420; // 示意：整段原文约占的 token
const COMPRESSED_TOKENS = 96; // 示意：摘要后约占的 token

// 压缩后的要点摘要（留住关键事实、丢掉闲聊）。
const SUMMARY_POINTS: readonly string[] = [
  "用户要退货：咖啡机 X-200，上周二在官网下单，订单号 88321。",
  "故障：用了三天，底座那圈漏水。",
  "用户已确认要「退货」（非换货）。已告知客服电话 400-820-XXXX。",
];

// 压缩丢掉的细节（权衡：摘要省了窗口，但这些被舍掉了）。
const DROPPED: readonly string[] = [
  "「地铁挤死了」等闲聊寒暄（与任务无关，丢掉无损）",
  "用户提到「我妈也想买别的、想要推荐」——这条其实有用，却在压缩里被当闲聊舍掉了（压太狠的代价）",
];

const SAVED_PCT = Math.round(
  ((ORIGINAL_TOKENS - COMPRESSED_TOKENS) / ORIGINAL_TOKENS) * 100,
);

export function CompressionCompare() {
  // false = 看原文（压缩前）；true = 看摘要（压缩后）。
  const [compressed, setCompressed] = useState(false);

  const reset = () => setCompressed(false);
  const shownTokens = compressed ? COMPRESSED_TOKENS : ORIGINAL_TOKENS;

  return (
    <DemoStage
      title="压缩 / 摘要：长对话历史浓缩成几句要点，腾出窗口——代价是可能丢细节"
      onReset={reset}
      controls={
        <Toggle
          checked={compressed}
          onChange={setCompressed}
          label={
            compressed ? "正在看：压缩后（摘要）" : "正在看：压缩前（原文）"
          }
        />
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        {/* 顶部读数：压缩前 → 压缩后，省下多少 */}
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="rounded-control bg-accent-glow px-2 py-1 font-mono text-xs font-bold text-accent">
            压缩前 {ORIGINAL_TOKENS}t
          </span>
          <span className="text-secondary" aria-hidden="true">
            →
          </span>
          <span className="rounded-control border border-success/60 px-2 py-1 font-mono text-xs font-bold text-success">
            压缩后 {COMPRESSED_TOKENS}t
          </span>
          <span className="font-mono text-xs font-bold text-success">
            省下 {SAVED_PCT}%
          </span>
          <span className="ml-auto font-mono text-[11px] text-secondary">
            当前展示约 {shownTokens}t
          </span>
        </div>

        {/* 主体：按开关切换原文 / 摘要 */}
        {!compressed ? (
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="mb-2 text-xs font-semibold text-secondary">
              压缩前 · 8 轮对话原文（很占窗口）
            </p>
            <div className="flex flex-col gap-1.5">
              {ORIGINAL_TURNS.map((t, i) => (
                <p key={i} className="text-[13px] leading-relaxed">
                  <span
                    className={`mr-1 font-semibold ${
                      t.role === "小特" ? "text-accent" : "text-primary"
                    }`}
                  >
                    {t.role}：
                  </span>
                  <span className="text-secondary">{t.text}</span>
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-control border border-success/50 bg-bg p-3">
            <p className="mb-2 text-xs font-semibold text-success">
              压缩后 · 摘要成 3 句要点（省下大半窗口）
            </p>
            <ul className="flex flex-col gap-1.5">
              {SUMMARY_POINTS.map((p, i) => (
                <li
                  key={i}
                  className="text-[13px] leading-relaxed text-primary"
                >
                  <span className="mr-1 text-success">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 权衡：压缩丢了什么（始终展示，强调代价） */}
        <div className="mt-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-1 text-xs font-semibold text-warning">
            压缩的代价 · 被舍掉的细节（权衡）
          </p>
          <ul className="flex flex-col gap-1">
            {DROPPED.map((d, i) => (
              <li key={i} className="text-xs leading-relaxed text-secondary">
                <span className="mr-1 text-warning">–</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* 诚实声明 */}
        <p className="mt-2 text-[11px] leading-relaxed text-secondary">
          说明：本演示为<strong className="text-primary">示意·非实时</strong>
          ，token 数为估算、摘要为预置示例。真实里压缩常由另一次 LLM
          调用（「请把以下对话总结成要点」）完成，压多狠是个权衡——压太松省不下窗口，压太狠会丢掉后面可能用得上的细节。
        </p>
      </div>
    </DemoStage>
  );
}
