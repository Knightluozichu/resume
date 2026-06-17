"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <AaAgentMapExplorer>：「全书地图」交互件（HEL-273，本章点睛）。
 *
 * 列出智能体五大件为可点卡片；点某件 → 高亮 + 展示它的职责 + 隐喻物 +
 * 「本书哪一篇专门讲它」。读者点一遍就拿到全书地图：模型已在篇1 讲过，提示→篇2、
 * 工具→篇3、记忆→篇4、规划→篇5；并提一句篇6 多智能体、篇7 上生产。默认选中「模型」。
 *
 * 为何 client：卡片选中 + 详情切换是真交互（受控 state）。纯 React，无 Canvas/WebGL；
 * reduced-motion 友好（仅颜色/边框过渡，globals 已对 reduced 置 0）。
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */

type Piece = {
  id: string;
  name: string; // 名称
  metaphor: string; // 隐喻物
  duty: string; // 一句话职责
  /** 对应全书哪一篇（done = 本篇已讲）。 */
  book: { tag: string; done?: boolean };
  /** 详情：这件干什么 / 治哪个短板。 */
  detail: string;
  color: string;
};

const PIECES: readonly Piece[] = [
  {
    id: "model",
    name: "模型",
    metaphor: "🧠 失忆天才本人",
    duty: "大脑：读纸条、做决策",
    book: { tag: "篇 1 · 认识智能体", done: true },
    detail:
      "整个智能体的大脑，负责「动脑」——读懂处境、想下一步该做什么。它就是关在小屋里的失忆天才本人，天生会幻觉、记不住、动不了手，所以才需要下面四件来补。已在本篇（篇 1）讲过。",
    color: "var(--accent)",
  },
  {
    id: "prompt",
    name: "提示",
    metaphor: "🗒 塞进去的纸条",
    duty: "怎么跟它说话",
    book: { tag: "篇 2 · 驾驭大模型" },
    detail:
      "你和失忆天才唯一的沟通方式，就是从门缝塞进去的那张纸条。把任务讲清楚、控制它下笔的风格、让它按格式回话——纸条写不好，再聪明的大脑也答非所问。篇 2「驾驭大模型」专门教你把纸条写好。",
    color: "var(--success)",
  },
  {
    id: "tools",
    name: "工具",
    metaphor: "📞 伸出屋外的电话",
    duty: "替它出屋做事",
    book: { tag: "篇 3 · 让智能体行动" },
    detail:
      "失忆天才出不了屋、不能上网算账。给屋子装一部「电话」（工具调用）：他在纸条上写「请帮我做 X」，我们替他做完、把结果塞回去。这就治了「动不了手」。篇 3「让智能体行动」专门讲它。",
    color: "var(--warning)",
  },
  {
    id: "memory",
    name: "记忆",
    metaphor: "📓 笔记本 + 资料库",
    duty: "治失忆、补私有知识",
    book: { tag: "篇 4 · 记忆与知识" },
    detail:
      "给天才一个笔记本（短期记忆）+ 一座可检索的资料库（长期记忆 / RAG）。该记的存下来、要用时取回塞进窗口；答之前先去查、有依据再说——这就治了「记不住」和「会幻觉」。篇 4「记忆与知识」专门讲它。",
    color: "var(--danger)",
  },
  {
    id: "planning",
    name: "规划",
    metaphor: "✅ 待办清单",
    duty: "拆多步任务 + 自检",
    book: { tag: "篇 5 · 规划与反思" },
    detail:
      "给天才一张待办清单：把大任务拆成一步步子任务，做完还回头检查自己的作业、错了就纠。这治了「大任务无从下手、会犯错不自知」。篇 5「规划与反思」专门讲它。",
    color: "var(--accent)",
  },
];

// 后续两篇（不是单独「一件」，但属全书地图，作尾注提一句）。
const LATER_BOOKS: readonly { tag: string; note: string }[] = [
  { tag: "篇 6 · 多智能体协作", note: "再雇一屋子各有专长的天才组队协同" },
  { tag: "篇 7 · 走向生产", note: "让这个团队安全、可观测地上线干活" },
];

const DEFAULT_ID = "model";

export function AaAgentMapExplorer() {
  const [selected, setSelected] = useState<string>(DEFAULT_ID);
  const piece = PIECES.find((p) => p.id === selected)!;
  const isDirty = selected !== DEFAULT_ID;

  return (
    <DemoStage
      title="点一件，看它干什么 + 本书哪一篇专门讲它"
      onReset={isDirty ? () => setSelected(DEFAULT_ID) : undefined}
      controls={
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">
            点选五大件中的任意一件：
          </span>
          <div className="flex flex-wrap gap-2">
            {PIECES.map((p) => {
              const active = p.id === selected;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p.id)}
                  aria-pressed={active}
                  className="rounded-control border px-3 py-2 text-left text-xs transition-colors duration-(--duration-hover) ease-standard"
                  style={{
                    borderColor: active ? p.color : "var(--border)",
                    background: active ? "var(--accent-glow)" : "transparent",
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="ml-1 opacity-80">{p.metaphor}</span>
                </button>
              );
            })}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-xl">
        {/* 选中件详情卡 */}
        <div
          className="rounded-control border p-4"
          style={{ borderColor: piece.color, background: "var(--bg)" }}
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-base font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {piece.metaphor} {piece.name}
            </span>
            <span className="text-xs text-secondary">·</span>
            <span className="text-xs text-secondary">{piece.duty}</span>
          </div>

          {/* 对应全书哪一篇 */}
          <div className="mt-3">
            <span
              className="inline-flex items-center gap-1 rounded-control border px-2 py-1 text-xs font-semibold"
              style={{ borderColor: piece.color, color: piece.color }}
            >
              {piece.book.done ? "✓ 已在此讲：" : "📖 专门讲它："}
              {piece.book.tag}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-secondary">
            {piece.detail}
          </p>
        </div>

        {/* 全书地图尾注：后续两篇 */}
        <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
          <span className="text-xs text-secondary">
            五件之外，全书地图还剩两篇：
          </span>
          <div className="flex flex-col gap-1">
            {LATER_BOOKS.map((b) => (
              <span key={b.tag} className="text-xs text-secondary">
                <span className="font-semibold text-primary">{b.tag}</span>
                {" — "}
                {b.note}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-secondary">
          点一遍五件，你就拿到了整本书的地图：每一件配件，后面都有专门一篇手把手教你给失忆天才装上。
        </p>
      </div>
    </DemoStage>
  );
}
