"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <ReActVsCoTDiagram>：「纯 CoT vs ReAct」对比交互演示（HEL-256，
 * 《ReAct：推理与行动循环》篇2·1，知识点 4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。同一个**需要实时信息**的问题
 * ——「现在从北京去上海，最快的高铁几点发车」——两条路对比：
 *   - 纯 CoT（思维链）：只在脑子里一步步推理，但它**不知道实时时刻表**，只能瞎猜 / 编一个，
 *     结果可能是幻觉（标红 ⚠）；
 *   - ReAct（推理 + 行动）：推理之后**真去调时刻表工具查**，拿到真实数据，答对（标绿 ✓）。
 * 突出：闷头推理 vs 推理 + 实证——需要实时 / 事实信息的任务，必须 ReAct。
 *
 * toggle 切换看哪条路：默认停在 ReAct（先看「靠谱」的那条）。两列并排，单一 y 公式各自纵向
 * 堆叠步骤卡；切到哪条，哪条高亮、另一条淡显。几何守 HEL-274：禁套整圈容器大框、单一 y
 * 公式、text/rect 距 viewBox 边 ≥14px、字号 ≥10px。
 *
 * 诚实声明：两条路的步骤文本为按格式预写的示意（非实时调用模型）。必有重置（回到 ReAct）。
 *
 * 为何 client：toggle 是真交互（受控状态），用状态直接选高亮列——「对比 + 猜一猜」落地
 * （参考 StructuredOutputDemo 的 toggle 范式）。颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

// —— 画布与两列几何（viewBox 0 0 680 360；单一 y 公式；卡距边 ≥14px）。 ——
const VIEW_W = 680;
const VIEW_H = 360;

const COL_W = 312; // 单列卡宽
const COL_GAP = 24; // 两列间距
const LEFT_X = 16; // 左列卡左边（距左边 16 ≥14）
const RIGHT_X = LEFT_X + COL_W + COL_GAP; // = 352，右列卡左边；右端 664，距右边 16 ≥14

const CARD_H = 50;
const ROW_GAP = 12;
const TOP_Y = 76; // 第 1 张步骤卡顶边（上方留列标题）
// 单一 y 公式：第 i 张步骤卡顶边 y。
const rowY = (i: number) => TOP_Y + i * (CARD_H + ROW_GAP);

type Path = "cot" | "react";

type PathStep = {
  /** 步骤标签（思考 / 行动 / 观察 / 答案）。 */
  tag: string;
  /** 步骤内容。 */
  body: string;
  /** 这一步是不是「翻车 / 命中」标记行。 */
  verdict?: "bad" | "good";
};

// 纯 CoT：只推理，编一个时刻 → 可能是幻觉。
const COT_STEPS: readonly PathStep[] = [
  { tag: "思考", body: "京沪高铁很多，最快的应该是复兴号 G 字头……" },
  { tag: "思考", body: "印象里早上有一班很早的，大概 7 点出头？" },
  {
    tag: "答案",
    body: "最快的是 G1 次，07:00 发车。",
    verdict: "bad",
  },
];

// ReAct：推理 + 真去查时刻表 → 拿真实数据。
const REACT_STEPS: readonly PathStep[] = [
  { tag: "思考", body: "我不知道今天的实时时刻表，得去查，别瞎猜。" },
  { tag: "行动", body: 'train_schedule("北京","上海")  ← 调时刻表工具' },
  { tag: "观察", body: "系统填回：今天最早 G1 次 06:20 发车。" },
  {
    tag: "答案",
    body: "最快的是 G1 次，今天 06:20 发车。",
    verdict: "good",
  },
];

const QUESTION = "现在从北京去上海，最快的高铁几点发车？（需要实时时刻表）";

export function ReActVsCoTDiagram() {
  // 默认停在 ReAct（先看靠谱的那条），toggle 关 = 切到纯 CoT。
  const [react, setReact] = useState(true);
  const reset = () => setReact(true);
  const path: Path = react ? "react" : "cot";

  return (
    <DemoStage
      title="同一个需要实时信息的问题：闷头推理 vs 推理 + 真去查"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Toggle
            checked={react}
            onChange={setReact}
            label={
              react ? "当前：ReAct（推理 + 行动）" : "当前：纯 CoT（只推理）"
            }
          />
          <span className="text-xs text-secondary">
            （关掉开关切到「纯 CoT」，看它怎么瞎猜）
          </span>
        </div>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`纯 CoT 思维链与 ReAct 的对比，当前高亮 ${
          react ? "ReAct" : "纯 CoT"
        }。同一个需要实时信息的问题：现在从北京去上海最快的高铁几点发车。左列是纯 CoT：只在脑子里推理——京沪高铁很多最快应该是复兴号、印象里早上有一班大概 7 点出头，最后瞎猜一个答案 G1 次 07:00 发车，但它不知道今天的实时时刻表，这个答案可能是幻觉，标红翻车。右列是 ReAct：先推理「我不知道实时时刻表，得去查别瞎猜」，然后行动调时刻表工具 train_schedule(北京,上海)，观察拿到系统填回的真实数据「今天最早 G1 次 06:20 发车」，最后给出查证过的答案 G1 次今天 06:20 发车，标绿命中。结论：需要实时或事实信息的任务必须用 ReAct，闷头推理的纯 CoT 只能瞎猜。`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 顶部公共问题行（左对齐，距左右边 ≥14px）—— */}
        <text
          x={LEFT_X}
          y={20}
          textAnchor="start"
          fontSize="11"
          fontWeight="700"
          fill="var(--text-secondary)"
        >
          问题（两条路答同一个）：
        </text>
        <text
          x={LEFT_X}
          y={38}
          textAnchor="start"
          fontSize="11.5"
          fontWeight="700"
          fill="var(--accent)"
        >
          {QUESTION}
        </text>

        {/* —— 左列：纯 CoT —— */}
        <g opacity={path === "cot" ? 1 : 0.32}>
          <text
            x={LEFT_X}
            y={66}
            textAnchor="start"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            纯 CoT（只闷头推理）
          </text>
          {COT_STEPS.map((s, i) => {
            const y = rowY(i);
            const bad = s.verdict === "bad";
            const color = bad ? "var(--danger)" : "var(--text-secondary)";
            return (
              <g key={`cot-${i}`}>
                <rect
                  x={LEFT_X}
                  y={y}
                  width={COL_W}
                  height={CARD_H}
                  rx="9"
                  fill="var(--bg)"
                  stroke={color}
                  strokeWidth={bad ? 1.8 : 1.4}
                />
                <rect
                  x={LEFT_X}
                  y={y}
                  width={5}
                  height={CARD_H}
                  rx="2.5"
                  fill={color}
                />
                <text
                  x={LEFT_X + 18}
                  y={y + 19}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="700"
                  fill={color}
                >
                  {bad ? `${s.tag} ⚠ 瞎猜，可能是幻觉` : s.tag}
                </text>
                <text
                  x={LEFT_X + 18}
                  y={y + 37}
                  textAnchor="start"
                  fontSize="10.5"
                  fill="var(--text-primary)"
                >
                  {s.body}
                </text>
              </g>
            );
          })}
        </g>

        {/* —— 右列：ReAct —— */}
        <g opacity={path === "react" ? 1 : 0.32}>
          <text
            x={RIGHT_X}
            y={66}
            textAnchor="start"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            ReAct（推理 + 真去查）
          </text>
          {REACT_STEPS.map((s, i) => {
            const y = rowY(i);
            const good = s.verdict === "good";
            const color = good
              ? "var(--success)"
              : s.tag === "行动"
                ? "var(--warning)"
                : "var(--accent)";
            return (
              <g key={`react-${i}`}>
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={COL_W}
                  height={CARD_H}
                  rx="9"
                  fill="var(--bg)"
                  stroke={color}
                  strokeWidth={good ? 1.8 : 1.4}
                />
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={5}
                  height={CARD_H}
                  rx="2.5"
                  fill={color}
                />
                <text
                  x={RIGHT_X + 18}
                  y={y + 19}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="700"
                  fill={color}
                >
                  {good ? `${s.tag} ✓ 查证过，答对` : s.tag}
                </text>
                <text
                  x={RIGHT_X + 18}
                  y={y + 37}
                  textAnchor="start"
                  fontSize="10.5"
                  fontFamily={s.tag === "行动" ? "var(--font-mono)" : undefined}
                  fill="var(--text-primary)"
                >
                  {s.body}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </DemoStage>
  );
}
