"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <SingleVsMultiMatrix>：单 Agent vs 多 Agent 选型矩阵交互（HEL-308，《多智能体协作模式》
 * 篇4·1，知识点 4：单 vs 多 Agent 选型）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。不是越多越好——多 Agent 引入协调开销、更慢更贵、
 * 更难调试；任务简单 / 单领域时单 Agent 更省。只有任务复杂、跨多领域、要不同专长 / 视角时，
 * 多 Agent 才划算。突出「别为多而多」。
 *
 * 交互：点一个场景 → 显示推荐「单」还是「多」+ 理由（简单 / 单领域 → 单；复杂 / 跨多领域 /
 * 要多视角 → 多），并在「多」推荐时点名多 Agent 的代价。必有重置。
 *
 * 为何 client：场景切换是真交互（受控状态高亮 + 换推荐）。颜色 / 间距 / 圆角 / 动效全走
 * DESIGN token（硬规则 5）。
 */

type Pick = "single" | "multi";

type Scenario = {
  id: string;
  text: string;
  pick: Pick;
  /** 推荐理由。 */
  why: string;
  /** 维度判定（给读者一眼看出按什么判）。 */
  traits: readonly string[];
};

const SCENARIOS: readonly Scenario[] = [
  {
    id: "translate",
    text: "把一句话翻译成英文",
    pick: "single",
    why: "简单、单领域、一步就完——一个 Agent 顺手就办了。动用一支多 Agent 小队纯属杀鸡用牛刀：协调开销比活儿本身还大，更慢更贵还更容易出岔子。",
    traits: ["简单", "单领域", "一步完成"],
  },
  {
    id: "commonsense",
    text: "回答一个常识问题（「水的沸点是多少」）",
    pick: "single",
    why: "单轮问答、不跨领域、不需要多种专长或视角——一个 Agent 直接答即可。拆成多 Agent 只会平白增加来回传话的开销，没有任何收益。",
    traits: ["单轮", "单领域", "无需多视角"],
  },
  {
    id: "deepreport",
    text: "写一份要查资料 + 写作 + 校对的深度报告",
    pick: "multi",
    why: "复杂、跨多个环节、需要不同专长：查资料、写作、校对各是一门手艺，挤在一个 Agent 里既要严谨又要发散，角色容易打架。拆成研究员 / 写手 / 审查三个专精 Agent，各管一摊更稳更可控。",
    traits: ["复杂多步", "需多种专长", "角色会打架"],
  },
  {
    id: "approval",
    text: "跨财务 + 法务 + 技术多部门的复杂审批",
    pick: "multi",
    why: "跨多个领域、每个领域要专门视角：财务看成本、法务看合规、技术看可行性。一个全能 Agent 很难同时把三套专业判断都做扎实，拆成各领域专精 Agent 分别把关、再汇总，才靠谱。",
    traits: ["跨多领域", "需多种视角", "专业判断重"],
  },
];

const PICK_META: Record<Pick, { label: string; color: string; tag: string }> = {
  single: {
    label: "单 Agent",
    color: "var(--accent)",
    tag: "够用就别复杂化",
  },
  multi: {
    label: "多 Agent",
    color: "var(--success)",
    tag: "值得拆，收益大于开销",
  },
};

export function SingleVsMultiMatrix() {
  const [active, setActive] = useState<string | null>(null);
  const reset = () => setActive(null);
  const current = SCENARIOS.find((s) => s.id === active) ?? null;

  return (
    <DemoStage
      title="单 vs 多 Agent 选型：点一个场景，看该用单还是多 + 为什么（别为多而多）"
      onReset={reset}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            点一个任务场景，看推荐用「单 Agent」还是「多 Agent」：
          </span>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={active === s.id}
                className={`rounded-control border px-3 py-1.5 text-left text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  active === s.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[480px] text-sm">
        {current === null ? (
          <div className="rounded-control border border-dashed border-border bg-bg p-6 text-center">
            <p className="text-xs text-secondary">
              ← 点上面任意一个场景，看看它该用单 Agent 还是多
              Agent，以及为什么。
            </p>
          </div>
        ) : (
          <div className="rounded-control border border-border bg-bg p-4">
            {/* 场景 */}
            <p className="mb-3 text-xs text-secondary">
              <strong className="text-primary">任务</strong>：{current.text}
            </p>

            {/* 推荐徽标 */}
            <div className="mb-3 flex items-center gap-2">
              <span
                className="rounded-control border px-3 py-1 text-xs font-bold"
                style={{
                  color: PICK_META[current.pick].color,
                  borderColor: PICK_META[current.pick].color,
                }}
              >
                推荐：{PICK_META[current.pick].label}
              </span>
              <span className="text-[11px] text-secondary">
                {PICK_META[current.pick].tag}
              </span>
            </div>

            {/* 维度判定标签 */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {current.traits.map((t) => (
                <span
                  key={t}
                  className="rounded-control border border-border px-2 py-0.5 text-[10.5px] text-secondary"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 理由 */}
            <p className="text-xs leading-relaxed text-secondary">
              <strong className="text-primary">为什么</strong>：{current.why}
            </p>
          </div>
        )}

        {/* 一句话判据 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">判据</strong>：简单 / 单领域 /
          一步完成 →<strong className="text-accent">单 Agent</strong>；复杂 /
          跨多领域 / 要不同专长和视角 →{" "}
          <strong className="text-success">多 Agent</strong>
          。多 Agent 不是越多越好——它带来协调开销、更慢更贵更难调试，
          <strong className="text-primary">别为多而多</strong>。
        </p>
      </div>
    </DemoStage>
  );
}
