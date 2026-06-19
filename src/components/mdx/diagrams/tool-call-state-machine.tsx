"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <ToolCallStateMachine>：工具调用执行的状态流转 + 错误处理交互演示（HEL-298，
 * 《工具调用 Tool Calling》篇2·2，知识点 4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。一轮工具调用走到「执行」之后会分叉：
 *   共享前段（产出 tool_call → 解析 → 执行）之后——
 *     · 成功路径：拿到返回值 → 回填结果（role:"tool"）→ LLM 续答；
 *     · 失败路径：工具报错 / 参数非法 → 捕获错误 → 把错误也回填给模型 → LLM 改参重试 或 降级。
 * 突出本章一条关键直觉：**错误也要回填给模型，让它自我纠正**——把异常吞掉、什么都不回填，
 * 模型就会卡死（既没结果也没错误，不知道该干嘛）。
 *
 * toggle 切「成功路径 vs 失败路径」：默认停在成功路径（先看顺的那条）；切到哪条，哪条分支
 * 高亮、另一条淡显，分叉箭头也跟着高亮，旁注说明走哪条、为什么。必有重置（回到成功路径）。
 *
 * 几何守 HEL-274：禁套整圈容器大框、单一 x/y 公式、text/rect 距 viewBox 边 ≥14px、字号 ≥10px。
 * 共享前段三张卡居中纵向堆叠（单一 y 公式），分叉后左右两列各自单一 y 公式纵向堆叠。
 *
 * 为何 client：toggle 是真交互（受控状态），用状态直接选高亮分支——「成功/失败两条路 + 猜一猜」
 * 落地（参考 ReActVsCoTDiagram 的 toggle 范式）。颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

// —— 画布几何（viewBox 0 0 680 470；距边 ≥14px）。 ——
const VIEW_W = 680;
const VIEW_H = 470;

// 共享前段：三张卡居中纵向堆叠。
const SHARED_W = 320;
const SHARED_X = (VIEW_W - SHARED_W) / 2; // = 180，距左右边 ≥14
const SHARED_CARD_H = 38;
const SHARED_GAP = 9;
const SHARED_TOP_Y = 46;
const sharedY = (i: number) => SHARED_TOP_Y + i * (SHARED_CARD_H + SHARED_GAP);

// 分叉点 y（最后一张共享卡底部 + 间隔）。
const FORK_Y = sharedY(2) + SHARED_CARD_H + 20; // 三张共享卡之后

// 两列分支几何。
const COL_W = 312;
const COL_GAP = 16;
const LEFT_X = 16; // 左列卡左边（距左边 16 ≥14）
const RIGHT_X = LEFT_X + COL_W + COL_GAP; // = 344，右列卡左边；右端 656，距右边 24 ≥14
const BRANCH_CARD_H = 42;
const BRANCH_GAP = 10;
const BRANCH_TOP_Y = FORK_Y + 28; // 分支标题行之下
const branchY = (i: number) => BRANCH_TOP_Y + i * (BRANCH_CARD_H + BRANCH_GAP);

type Path = "success" | "fail";

type Card = {
  tag: string;
  body: string;
  mono?: boolean;
};

// 共享前段（两条路都先走这三步）。
const SHARED: readonly Card[] = [
  { tag: "产出 tool_call", body: 'weather, {"city":"上海"}', mono: true },
  { tag: "解析", body: "json.loads + 按名找函数", mono: true },
  { tag: "执行", body: "调真实函数 → 这里可能成功，也可能抛错" },
];

// 成功路径。
const SUCCESS: readonly Card[] = [
  { tag: "✓ 拿到返回值", body: '{"weather":"小雨","temp":18}', mono: true },
  { tag: "回填结果", body: '加一条 {role:"tool"} 消息', mono: true },
  { tag: "LLM 续答", body: "带着结果给最终答案 / 或再调下一个工具" },
];

// 失败路径。
const FAIL: readonly Card[] = [
  { tag: "✗ 工具报错 / 参数非法", body: "城市名为空 或 网络超时，抛异常" },
  { tag: "捕获错误", body: "try/except 兜住，别让程序崩" },
  {
    tag: "把错误也回填",
    body: '加一条 {role:"tool", content:"出错: ..."}',
    mono: true,
  },
  { tag: "LLM 改参重试 / 降级", body: "模型看到错误，自己改参数再调 或 换路" },
];

const QUESTION = "一轮工具调用走到「执行」之后，会分两条路——看你切哪条：";

export function ToolCallStateMachine() {
  // 默认停在成功路径（先看顺的那条），toggle 关 = 切到失败路径。
  const [success, setSuccess] = useState(true);
  const reset = () => setSuccess(true);
  const path: Path = success ? "success" : "fail";

  const okColor = "var(--success)";
  const badColor = "var(--danger)";
  const sharedColor = "var(--accent)";

  return (
    <DemoStage
      title="工具调用的状态流转：成功回填，还是出错也回填让模型自纠"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Toggle
            checked={success}
            onChange={setSuccess}
            label={
              success
                ? "当前：成功路径（执行成功）"
                : "当前：失败路径（执行出错）"
            }
          />
          <span className="text-xs text-secondary">
            （关掉开关切到「失败路径」，看错误怎么回填让模型自纠）
          </span>
        </div>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`工具调用执行的状态流转与错误处理，当前高亮 ${
          success ? "成功路径" : "失败路径"
        }。两条路都先走共享前段三步：产出 tool_call（weather，city 上海）、解析（json.loads 加按名找函数）、执行（调真实函数，这里可能成功也可能抛错）。执行之后分叉：成功路径——拿到返回值小雨 18 度、回填结果加一条 role 等于 tool 的消息、LLM 续答带着结果给最终答案或再调下一个工具。失败路径——工具报错或参数非法比如城市名为空或网络超时抛异常、用 try except 捕获错误别让程序崩、把错误也回填加一条 role 等于 tool 内容是出错信息的消息、LLM 看到错误自己改参数再调或降级换路。关键直觉：错误也要回填给模型让它自我纠正，把异常吞掉什么都不回填，模型就会卡死。`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 顶部说明行（左对齐，距左右边 ≥14px）—— */}
        <text
          x={LEFT_X}
          y={26}
          textAnchor="start"
          fontSize="11.5"
          fontWeight="700"
          fill="var(--text-secondary)"
        >
          {QUESTION}
        </text>

        {/* —— 共享前段：三张卡居中纵向堆叠 —— */}
        {SHARED.map((c, i) => {
          const y = sharedY(i);
          return (
            <g key={`shared-${i}`}>
              <rect
                x={SHARED_X}
                y={y}
                width={SHARED_W}
                height={SHARED_CARD_H}
                rx="9"
                fill="var(--bg)"
                stroke={sharedColor}
                strokeWidth="1.6"
              />
              <text
                x={SHARED_X + 14}
                y={y + 17}
                textAnchor="start"
                fontSize="11"
                fontWeight="700"
                fill={sharedColor}
              >
                {c.tag}
              </text>
              <text
                x={SHARED_X + 14}
                y={y + 32}
                textAnchor="start"
                fontSize="10"
                fontFamily={c.mono ? "var(--font-mono)" : undefined}
                fill="var(--text-primary)"
              >
                {c.body}
              </text>
              {/* 卡间向下小箭头 */}
              {i < SHARED.length - 1 && (
                <text
                  x={VIEW_W / 2}
                  y={y + SHARED_CARD_H + 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  ↓
                </text>
              )}
            </g>
          );
        })}

        {/* —— 分叉：从共享底部到左右两列各一条斜线 —— */}
        {/* 左斜线（到成功列），成功时高亮 */}
        <line
          x1={VIEW_W / 2}
          y1={FORK_Y - 14}
          x2={LEFT_X + COL_W / 2}
          y2={BRANCH_TOP_Y - 16}
          stroke={path === "success" ? okColor : "var(--border)"}
          strokeWidth={path === "success" ? 2 : 1.2}
        />
        {/* 右斜线（到失败列），失败时高亮 */}
        <line
          x1={VIEW_W / 2}
          y1={FORK_Y - 14}
          x2={RIGHT_X + COL_W / 2}
          y2={BRANCH_TOP_Y - 16}
          stroke={path === "fail" ? badColor : "var(--border)"}
          strokeWidth={path === "fail" ? 2 : 1.2}
        />

        {/* —— 左列：成功路径 —— */}
        <g opacity={path === "success" ? 1 : 0.3}>
          <text
            x={LEFT_X + COL_W / 2}
            y={BRANCH_TOP_Y - 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={okColor}
          >
            成功路径
          </text>
          {SUCCESS.map((c, i) => {
            const y = branchY(i);
            return (
              <g key={`ok-${i}`}>
                <rect
                  x={LEFT_X}
                  y={y}
                  width={COL_W}
                  height={BRANCH_CARD_H}
                  rx="9"
                  fill="var(--bg)"
                  stroke={okColor}
                  strokeWidth="1.5"
                />
                <rect
                  x={LEFT_X}
                  y={y}
                  width={5}
                  height={BRANCH_CARD_H}
                  rx="2.5"
                  fill={okColor}
                />
                <text
                  x={LEFT_X + 16}
                  y={y + 18}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="700"
                  fill={okColor}
                >
                  {c.tag}
                </text>
                <text
                  x={LEFT_X + 16}
                  y={y + 35}
                  textAnchor="start"
                  fontSize="10"
                  fontFamily={c.mono ? "var(--font-mono)" : undefined}
                  fill="var(--text-primary)"
                >
                  {c.body}
                </text>
              </g>
            );
          })}
        </g>

        {/* —— 右列：失败路径 —— */}
        <g opacity={path === "fail" ? 1 : 0.3}>
          <text
            x={RIGHT_X + COL_W / 2}
            y={BRANCH_TOP_Y - 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={badColor}
          >
            失败路径（出错也回填）
          </text>
          {FAIL.map((c, i) => {
            const y = branchY(i);
            return (
              <g key={`bad-${i}`}>
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={COL_W}
                  height={BRANCH_CARD_H}
                  rx="9"
                  fill="var(--bg)"
                  stroke={badColor}
                  strokeWidth="1.5"
                />
                <rect
                  x={RIGHT_X}
                  y={y}
                  width={5}
                  height={BRANCH_CARD_H}
                  rx="2.5"
                  fill={badColor}
                />
                <text
                  x={RIGHT_X + 16}
                  y={y + 18}
                  textAnchor="start"
                  fontSize="11"
                  fontWeight="700"
                  fill={badColor}
                >
                  {c.tag}
                </text>
                <text
                  x={RIGHT_X + 16}
                  y={y + 35}
                  textAnchor="start"
                  fontSize="10"
                  fontFamily={c.mono ? "var(--font-mono)" : undefined}
                  fill="var(--text-primary)"
                >
                  {c.body}
                </text>
              </g>
            );
          })}
        </g>

        {/* 底部一句话点题（左对齐，距底边/左右边 ≥14px） */}
        <text
          x={LEFT_X}
          y={VIEW_H - 14}
          textAnchor="start"
          fontSize="10.5"
          fill="var(--text-secondary)"
        >
          {path === "success"
            ? "成功：把结果回填，模型续答——一轮闭合。"
            : "失败：错误也回填给模型，它才能自纠（改参重试 / 降级）；吞掉错误 = 模型卡死。"}
        </text>
      </svg>
    </DemoStage>
  );
}
