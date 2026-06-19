"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <AaTaskFitExplorer>：「这个任务该用 聊天机器人 / 工作流 / 智能体？」选型交互件（HEL-271）。
 *
 * 读者拨动三个任务属性开关，组件实时给出推荐方案 + 一句话解释为什么——把「自主性光谱」
 * 与「何时该用 Agent」从抽象判断变成动手试。也内置几个示例任务，一键填入对照。
 *
 * 三个属性（覆盖选型的三条关键轴）：
 *  - 多步骤：任务要不要好几步才能完成？
 *  - 临场决定：路径是否需要看中间结果临时改主意（而非每次走同一条死路）？
 *  - 调外部工具：要不要查实时信息 / 调外部工具（搜索、算账、读文件）？
 *
 * 决策规则（稳妥、可解释，非黑箱）：
 *  - 需要临场决定 → 智能体（只有它能按情况自己改下一步）
 *  - 不临场决定，但多步 + 调工具 → 工作流（步骤固定，人写死流程即可）
 *  - 否则（单步一问一答）→ 聊天机器人
 *
 * 为何 client：开关 + 实时推荐 + 示例填入 + 重置都是真交互（受控状态）。纯 React，
 * 无 Canvas / WebGL；reduced-motion 友好（仅颜色/边框过渡，globals 已对 reduced 置 0）。
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

type Verdict = "chatbot" | "workflow" | "agent";

type TaskTraits = {
  multiStep: boolean; // 需要多步骤
  adaptive: boolean; // 需要临场决定路径
  tools: boolean; // 需要调外部工具 / 查实时信息
};

const VERDICTS: Record<
  Verdict,
  { name: string; color: string; why: (t: TaskTraits) => string }
> = {
  chatbot: {
    name: "聊天机器人",
    color: "var(--text-secondary)",
    why: () =>
      "一问一答就够了：单步、路径固定、不用调外部工具。直接让模型回一段话即可，杀鸡不必用牛刀。",
  },
  workflow: {
    name: "工作流",
    color: "var(--warning)",
    why: (t) => {
      const extra =
        t.multiStep && t.tools
          ? "（哪怕有多步、要调工具）"
          : t.multiStep
            ? "（哪怕有多步）"
            : t.tools
              ? "（哪怕要调工具）"
              : "";
      return `路径是固定的、不用临场改主意${extra}，每次都走同一条路——人事先把流程写死最稳、最省、最好调试，不必动用智能体。`;
    },
  },
  agent: {
    name: "智能体",
    color: "var(--accent)",
    why: () =>
      "路径需要看中间结果临场决定，没法事先写死——这正是智能体的主场：它靠「感知—决策—行动—观察」循环，按情况自己决定下一步。",
  },
};

/** 决策规则：临场决定 → 智能体；多步或需调工具（路径固定）→ 工作流；否则聊天机器人。 */
function decide(t: TaskTraits): Verdict {
  if (t.adaptive) return "agent";
  if (t.multiStep || t.tools) return "workflow";
  return "chatbot";
}

type Example = { name: string; traits: TaskTraits };
const EXAMPLES: readonly Example[] = [
  {
    name: "把这段英文翻成中文",
    traits: { multiStep: false, adaptive: false, tools: false },
  },
  {
    name: "每天定时抓汇率、套同一个模板生成日报",
    traits: { multiStep: true, adaptive: false, tools: true },
  },
  {
    name: "帮我订一张明天最便宜的高铁票（要查、要比、要改计划）",
    traits: { multiStep: true, adaptive: true, tools: true },
  },
];

const DEFAULT_TRAITS: TaskTraits = {
  multiStep: false,
  adaptive: false,
  tools: false,
};

export function AaTaskFitExplorer() {
  const [traits, setTraits] = useState<TaskTraits>(DEFAULT_TRAITS);
  // 当前是否由某个示例填入（仅作高亮提示，不影响逻辑）。
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const set = (patch: Partial<TaskTraits>) => {
    setTraits((prev) => ({ ...prev, ...patch }));
    setActiveExample(null);
  };

  const fillExample = (ex: Example) => {
    setTraits(ex.traits);
    setActiveExample(ex.name);
  };

  const reset = () => {
    setTraits(DEFAULT_TRAITS);
    setActiveExample(null);
  };

  const verdict = decide(traits);
  const info = VERDICTS[verdict];

  const isDirty =
    traits.multiStep !== DEFAULT_TRAITS.multiStep ||
    traits.adaptive !== DEFAULT_TRAITS.adaptive ||
    traits.tools !== DEFAULT_TRAITS.tools;

  return (
    <DemoStage
      title="拨开关，看这个任务该用 聊天机器人 / 工作流 / 智能体"
      onReset={isDirty ? reset : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <span className="text-xs text-secondary">
            勾选任务的属性，下面实时给出推荐：
          </span>
          <Toggle
            checked={traits.multiStep}
            onChange={(v) => set({ multiStep: v })}
            label="需要多个步骤才能完成"
          />
          <Toggle
            checked={traits.adaptive}
            onChange={(v) => set({ adaptive: v })}
            label="路径要看中间结果临场决定（不是每次走同一条死路）"
          />
          <Toggle
            checked={traits.tools}
            onChange={(v) => set({ tools: v })}
            label="需要调外部工具 / 查实时信息"
          />
          <div className="mt-1 flex flex-col gap-2 border-t border-border pt-3">
            <span className="text-xs text-secondary">
              或一键填入示例任务：
            </span>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  type="button"
                  onClick={() => fillExample(ex)}
                  className={`rounded-control border px-3 py-1.5 text-left text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    activeExample === ex.name
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-lg">
        {/* 三档光谱：当前推荐高亮 */}
        <div className="mb-4 flex items-stretch gap-2">
          {(["chatbot", "workflow", "agent"] as const).map((v) => {
            const active = v === verdict;
            return (
              <div
                key={v}
                className="flex-1 rounded-control border px-2 py-3 text-center transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: active ? VERDICTS[v].color : "var(--border)",
                  background: active ? "var(--accent-glow)" : "transparent",
                  opacity: active ? 1 : 0.5,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  {VERDICTS[v].name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 推荐结论 + 解释 */}
        <div
          className="rounded-control border p-4"
          style={{ borderColor: info.color, background: "var(--bg)" }}
          aria-live="polite"
        >
          <p className="text-sm">
            <span className="text-secondary">推荐：</span>
            <span
              className="font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {info.name}
            </span>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-secondary">
            {info.why(traits)}
          </p>
        </div>

        <p className="mt-3 text-xs text-secondary">
          猜一猜：把「路径临场决定」打开，推荐会变成谁？为什么这一条最能决定要不要用智能体？
        </p>
      </div>
    </DemoStage>
  );
}
