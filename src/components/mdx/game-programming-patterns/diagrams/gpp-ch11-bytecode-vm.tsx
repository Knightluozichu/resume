"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh11BytecodeVm>：字节码栈机执行动画（GPP 第11章）。
 *
 * 核心：把行为编码成数据（指令序列），由一个虚拟机解释执行，从而让行为像数据一样
 * 可配置、可组合、可下发。
 *
 * 场景：一个法术用字节码表达 [LITERAL 5, LITERAL 3, ADD, SET_HEALTH]。虚拟机逐条
 * 取指、解码、在操作数栈上执行：LITERAL 把常量压栈，ADD 弹出两数相加再压回，
 * SET_HEALTH 弹出栈顶设为生命值。
 *
 * 节拍：
 *  ① LITERAL 5：把 5 压入操作数栈
 *  ② LITERAL 3：把 3 压入栈（栈 [5, 3]）
 *  ③ ADD：弹出 3 与 5，计算 5+3=8 压回（栈 [8]）
 *  ④ SET_HEALTH：弹出 8，设为生命值
 *  ⑤ 洞见：行为=数据，字节码可配置、可组合、可热更
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const STACK_COLOR = "#5AA9E6";

const T = TEACHING_BEAT_MS;

// 字节码程序
const PROGRAM = [
  { op: "LITERAL", arg: "5", desc: "压入常量 5" },
  { op: "LITERAL", arg: "3", desc: "压入常量 3" },
  { op: "ADD", arg: "", desc: "弹出 5、3，压入 8" },
  { op: "SET_HEALTH", arg: "", desc: "弹出 8，设为生命" },
];

// 各节拍的操作数栈状态（栈顶在右）
const STACK_STATES: readonly (readonly string[])[] = [
  ["5"],
  ["5", "3"],
  ["8"],
  [],
];

const PROG_X = 60;
const PROG_Y = 110;
const PROG_ROW_H = 44;
const PROG_W = 230;

const STACK_X = 470;
const STACK_SLOT_W = 56;
const STACK_Y = 200;

const STEPS: readonly TeachingStep[] = [
  { label: "lit5", caption: "取指 LITERAL 5 并执行：把常量 5 压入操作数栈" },
  { label: "lit3", caption: "取指 LITERAL 3 并执行：把 3 压栈，现在栈里是 [5, 3]" },
  { label: "add", caption: "取指 ADD 并执行：弹出栈顶 3 和 5，算出 5+3=8 压回栈" },
  { label: "sethp", caption: "取指 SET_HEALTH 并执行：弹出栈顶 8，把它设为生命值" },
  { label: "insight", caption: "行为=数据：法术是一段可配置、可组合、可热更的字节码，由 VM 解释" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh11BytecodeVm() {
  const highlightRef = useRef<SVGRectElement | null>(null);
  const stackStateRefs = useRef<Record<number, SVGGElement | null>>({});
  const hpRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 高亮框随节拍下移；栈状态逐个切换
      STACK_STATES.forEach((_, i) => {
        // 高亮移到第 i 条指令
        tl.add(
          highlightRef.current!,
          { y: [PROG_Y + i * PROG_ROW_H, PROG_Y + i * PROG_ROW_H], duration: T * 0.3, ease: "out(3)" },
          T * i,
        );
        // 栈状态 i 淡入，其余淡出
        STACK_STATES.forEach((__, j) => {
          const el = stackStateRefs.current[j];
          if (!el) return;
          tl.add(el, { opacity: j === i ? 1 : 0, duration: T * 0.4, ease: "out(3)" }, T * i + T * 0.3);
        });
      });
      tl.label("lit5", 0);
      tl.label("lit3", T);
      tl.label("add", T * 2);

      // ④ sethp（t: 3T→4T）：高亮 SET_HEALTH，HP 显示浮现
      tl.add(
        highlightRef.current!,
        { y: [PROG_Y + 3 * PROG_ROW_H, PROG_Y + 3 * PROG_ROW_H], duration: T * 0.3, ease: "out(3)" },
        T * 3,
      );
      tl.add(hpRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3.3);
      tl.label("sethp", T * 3);

      // ⑤ insight（t: 4T→5T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("insight", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字节码栈机动画。法术是一段字节码：LITERAL 5、LITERAL 3、ADD、SET_HEALTH。虚拟机逐条取指执行：LITERAL 5 把 5 压入操作数栈，LITERAL 3 把 3 压栈成 [5,3]，ADD 弹出 5 和 3 算出 8 压回栈，SET_HEALTH 弹出 8 设为生命值。行为被编码成数据，由虚拟机解释，因此可配置、可组合、可热更。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            字节码：把行为编码成数据，由虚拟机解释
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            法术 = 一段指令序列；VM 逐条取指、在操作数栈上执行
          </text>

          {/* 字节码程序带 */}
          <text x={PROG_X} y={PROG_Y - 16} fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            字节码程序（法术）
          </text>
          {/* 当前指令高亮框（动画下移） */}
          <rect
            ref={highlightRef}
            x={PROG_X - 4}
            y={PROG_Y}
            width={PROG_W + 8}
            height={PROG_ROW_H - 6}
            rx="7"
            fill={ACCENT}
            fillOpacity="0.16"
            stroke={ACCENT}
            strokeWidth="2"
            style={{ transform: `translateY(${PROG_Y}px)` }}
          />
          {PROGRAM.map((ins, i) => (
            <g key={`ins-${i}`}>
              <rect x={PROG_X} y={PROG_Y + i * PROG_ROW_H} width={PROG_W} height={PROG_ROW_H - 6} rx="6" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.2" />
              <text x={PROG_X + 12} y={PROG_Y + i * PROG_ROW_H + 18} fontSize="12" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
                {ins.op}
                {ins.arg ? ` ${ins.arg}` : ""}
              </text>
              <text x={PROG_X + 12} y={PROG_Y + i * PROG_ROW_H + 32} fontSize="11" fill="var(--text-secondary)">
                {ins.desc}
              </text>
            </g>
          ))}

          {/* VM（中央） */}
          <rect x={320} y={130} width={110} height={120} rx="10" fill={ACCENT} fillOpacity="0.08" stroke={ACCENT} strokeWidth="1.6" />
          <text x={375} y={158} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
            虚拟机
          </text>
          <text x={375} y={182} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            取指
          </text>
          <text x={375} y={200} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            ↓ 解码
          </text>
          <text x={375} y={218} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            ↓ 执行
          </text>
          <text x={375} y={240} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
            PC →
          </text>

          {/* 操作数栈 */}
          <text x={STACK_X} y={STACK_Y - 40} fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            操作数栈（栈顶在右）
          </text>
          <rect x={STACK_X - 8} y={STACK_Y - 8} width={STACK_SLOT_W * 3 + 16} height={56} rx="8" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* 各节拍的栈状态（叠加，按节拍切换透明度） */}
          {STACK_STATES.map((state, i) => (
            <g
              key={`stack-${i}`}
              ref={(el) => {
                stackStateRefs.current[i] = el;
              }}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {state.map((val, slot) => (
                <g key={`s${i}-${slot}`}>
                  <rect x={STACK_X + slot * STACK_SLOT_W} y={STACK_Y} width={STACK_SLOT_W - 8} height={40} rx="6" fill={STACK_COLOR} fillOpacity="0.2" stroke={STACK_COLOR} strokeWidth="1.6" />
                  <text x={STACK_X + slot * STACK_SLOT_W + (STACK_SLOT_W - 8) / 2} y={STACK_Y + 26} textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
                    {val}
                  </text>
                </g>
              ))}
              {state.length === 0 && (
                <text x={STACK_X + 20} y={STACK_Y + 26} fontSize="11" fill="var(--text-secondary)">
                  （栈已弹出清空）
                </text>
              )}
            </g>
          ))}

          {/* 生命值结果 */}
          <g ref={hpRef} style={{ opacity: 0 }}>
            <rect x={STACK_X} y={STACK_Y + 80} width={180} height={44} rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={STACK_X + 16} y={STACK_Y + 100} fontSize="11" fill="var(--text-secondary)">
              英雄生命值
            </text>
            <text x={STACK_X + 16} y={STACK_Y + 118} fontSize="16" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>
              HP = 8
            </text>
          </g>

          {/* 洞见 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x={PROG_X} y={VIEW_H - 46} width={580} height={30} rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1.6" />
            <text x={PROG_X + 290} y={VIEW_H - 27} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              行为 = 数据：字节码可配置、可组合、可下发热更（代价：需前端、失去调试器）
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="VM 逐条解释字节码，用操作数栈传递中间结果。把行为变成数据后，关卡设计师可不改代码就调整法术。代价：需要写编译器前端、虚拟机比原生代码慢、调试更难。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字节码（Bytecode）：把行为编码成一串指令（数据），交由虚拟机解释执行。
        于是行为像数据一样可被存储、组合、下发与热更，让非程序员也能定义游戏行为。
        代价是需要一套指令集与虚拟机、失去原生调试器、执行比编译代码慢。
      </figcaption>
    </figure>
  );
}
