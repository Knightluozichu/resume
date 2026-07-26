"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh02CommandUndoStack>：命令对象与撤销栈动画（GPP 第2章）。
 *
 * 核心：把"请求"封装成对象，于是可以排队、记录、撤销——请求从"动作"变成"东西"。
 *
 * 场景：玩家按键操控演员 Bjørn。每次按键生成一个 Command 对象（MoveRight / Jump），
 * 交给 actor 执行，并压入 undo 栈；按"撤销"时栈顶命令弹出并反向执行。
 *
 * 节拍：
 *  ① 按"→"键，生成 MoveRight 命令对象（请求被对象化）
 *  ② 命令执行 actor.moveRight()，Bjørn 右移一格，命令压入 undo 栈
 *  ③ 按"跳跃"键，生成 Jump 命令
 *  ④ Jump 执行，Bjørn 跳起，命令压入 undo 栈（栈有两层）
 *  ⑤ 撤销：栈顶 Jump 弹出并反向执行，Bjørn 落地
 *  ⑥ 再撤销：MoveRight 反向执行，Bjørn 回到起点
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const UNDO_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

// Bjørn 舞台位置（x 轨道 0/1，跳跃 y 偏移）
const STAGE_X0 = 250;
const STAGE_STEP = 70;
const STAGE_Y = 250;

// undo 栈位置（右侧竖立）
const STACK_X = 560;
const STACK_CARD_W = 130;
const STACK_CARD_H = 40;
const STACK_TOP_Y = 300; // 栈顶卡片 y
const STACK_GAP = 8;

const STEPS: readonly TeachingStep[] = [
  { label: "press", caption: "按下'→'键：不是直接动 Bjørn，而是生成一个 MoveRight 命令对象——请求被对象化" },
  { label: "exec1", caption: "命令调用 actor.moveRight()，Bjørn 右移一格；执行完的命令压入 undo 栈" },
  { label: "press2", caption: "再按'跳跃'键，生成一个 Jump 命令对象" },
  { label: "exec2", caption: "Jump 执行，Bjørn 跳起；命令压入 undo 栈，现在栈里有两层命令" },
  { label: "undo1", caption: "点撤销：栈顶 Jump 弹出并反向执行，Bjørn 落回地面" },
  { label: "undo2", caption: "再撤销：MoveRight 反向执行，Bjørn 退回起点——因为命令被记录了下来" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh02CommandUndoStack() {
  const keyRightRef = useRef<SVGGElement | null>(null);
  const keyJumpRef = useRef<SVGGElement | null>(null);
  const cmdMoveRef = useRef<SVGGElement | null>(null);
  const cmdJumpRef = useRef<SVGGElement | null>(null);
  const bjornRef = useRef<SVGGElement | null>(null);
  const stackMoveRef = useRef<SVGGElement | null>(null);
  const stackJumpRef = useRef<SVGGElement | null>(null);
  const undoBadgeRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① press（t: 0→T）：右移键按下，MoveRight 命令卡片浮现
      tl.add(keyRightRef.current!, { opacity: [0.3, 1, 0.3], duration: T * 0.6, ease: "inOut(2)" }, 0);
      tl.add(cmdMoveRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 0.3);
      tl.label("press", 0);

      // ② exec1（t: T→2T）：Bjørn 右移 0→1，MoveRight 命令入栈
      tl.add(bjornRef.current!, { x: [STAGE_X0, STAGE_X0 + STAGE_STEP], duration: T * 0.6, ease: "out(3)" }, T);
      tl.add(cmdMoveRef.current!, { opacity: [1, 0.35], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.add(stackMoveRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 0.5);
      tl.label("exec1", T);

      // ③ press2（t: 2T→3T）：跳跃键按下，Jump 命令卡片浮现
      tl.add(keyJumpRef.current!, { opacity: [0.3, 1, 0.3], duration: T * 0.6, ease: "inOut(2)" }, T * 2);
      tl.add(cmdJumpRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.label("press2", T * 2);

      // ④ exec2（t: 3T→4T）：Bjørn 跳起（y 上移），Jump 命令入栈（栈顶）
      tl.add(bjornRef.current!, { y: [STAGE_Y, STAGE_Y - 46], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.add(cmdJumpRef.current!, { opacity: [1, 0.35], duration: T * 0.4, ease: "out(3)" }, T * 3.5);
      tl.add(stackJumpRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3.5);
      tl.label("exec2", T * 3);

      // ⑤ undo1（t: 4T→5T）：栈顶 Jump 弹出，Bjørn 落地
      tl.add(undoBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(stackJumpRef.current!, { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" }, T * 4.1);
      tl.add(bjornRef.current!, { y: [STAGE_Y - 46, STAGE_Y], duration: T * 0.5, ease: "out(3)" }, T * 4.2);
      tl.label("undo1", T * 4);

      // ⑥ undo2（t: 5T→6T）：MoveRight 弹出，Bjørn 回起点
      tl.add(stackMoveRef.current!, { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" }, T * 5.1);
      tl.add(bjornRef.current!, { x: [STAGE_X0 + STAGE_STEP, STAGE_X0], duration: T * 0.5, ease: "out(3)" }, T * 5.2);
      tl.label("undo2", T * 5);
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
          aria-label="命令模式动画。玩家按键操控 Bjørn：按右移键生成 MoveRight 命令对象并执行，Bjørn 右移一格，命令压入 undo 栈；按跳跃键生成 Jump 命令并执行，Bjørn 跳起，命令入栈。点撤销时栈顶命令弹出并反向执行：先撤销 Jump 让 Bjørn 落地，再撤销 MoveRight 让 Bjørn 退回起点。请求被封装成对象，因此能记录与撤销。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            命令：把请求封装成对象，于是能撤销
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            按键不直接动演员，而是生成命令对象 → 执行 → 入栈，撤销时弹出反向执行
          </text>

          {/* 输入区：按键 */}
          <text x="60" y="120" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            输入（按键）
          </text>
          <g ref={keyRightRef} style={{ opacity: 0.3 }}>
            <rect x="60" y="132" width="80" height="40" rx="8" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="1.6" />
            <text x="100" y="157" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              → 右移
            </text>
          </g>
          <g ref={keyJumpRef} style={{ opacity: 0.3 }}>
            <rect x="60" y="184" width="80" height="40" rx="8" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="1.6" />
            <text x="100" y="209" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              ↑ 跳跃
            </text>
          </g>

          {/* 命令对象卡片（生成时浮现） */}
          <g ref={cmdMoveRef} style={{ opacity: 0 }}>
            <rect x="180" y="132" width="120" height="40" rx="8" fill="var(--text-secondary)" fillOpacity="0.08" stroke={ACCENT} strokeWidth="1.6" />
            <text x="240" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              MoveRight
            </text>
            <text x="240" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              target: Bjørn
            </text>
          </g>
          <g ref={cmdJumpRef} style={{ opacity: 0 }}>
            <rect x="180" y="184" width="120" height="40" rx="8" fill="var(--text-secondary)" fillOpacity="0.08" stroke={ACCENT} strokeWidth="1.6" />
            <text x="240" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              Jump
            </text>
            <text x="240" y="216" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              target: Bjørn
            </text>
          </g>

          {/* actor 舞台 */}
          <text x={STAGE_X0} y="120" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            actor 舞台
          </text>
          {/* 位置轨道刻度 */}
          {[0, 1].map((pos) => (
            <text key={pos} x={STAGE_X0 + pos * STAGE_STEP} y={STAGE_Y + 40} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              x={pos}
            </text>
          ))}
          <line x1={STAGE_X0} y1={STAGE_Y + 24} x2={STAGE_X0 + STAGE_STEP} y2={STAGE_Y + 24} stroke="var(--border)" strokeWidth="1.4" />
          {/* 地面线 */}
          <line x1={STAGE_X0 - 30} y1={STAGE_Y + 24} x2={STAGE_X0 + STAGE_STEP + 40} y2={STAGE_Y + 24} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
          {/* Bjørn（可移动） */}
          <g ref={bjornRef} style={{ transform: `translate(${STAGE_X0}px, ${STAGE_Y}px)` }}>
            <circle cx="0" cy="0" r="16" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fontSize="14">
              🧝
            </text>
            <text x="0" y="-24" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>
              Bjørn
            </text>
          </g>

          {/* undo 栈（右侧竖立） */}
          <text x={STACK_X} y="120" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            undo 栈（栈顶在上）
          </text>
          <rect x={STACK_X - 6} y={STACK_TOP_Y - 6} width={STACK_CARD_W + 12} height={STACK_CARD_H * 2 + STACK_GAP + 12} rx="8" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* 栈底：MoveRight */}
          <g ref={stackMoveRef} style={{ opacity: 0 }}>
            <rect x={STACK_X} y={STACK_TOP_Y + STACK_CARD_H + STACK_GAP} width={STACK_CARD_W} height={STACK_CARD_H} rx="6" fill={UNDO_COLOR} fillOpacity="0.16" stroke={UNDO_COLOR} strokeWidth="1.6" />
            <text x={STACK_X + STACK_CARD_W / 2} y={STACK_TOP_Y + STACK_CARD_H + STACK_GAP + 25} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              MoveRight
            </text>
          </g>
          {/* 栈顶：Jump */}
          <g ref={stackJumpRef} style={{ opacity: 0 }}>
            <rect x={STACK_X} y={STACK_TOP_Y} width={STACK_CARD_W} height={STACK_CARD_H} rx="6" fill={UNDO_COLOR} fillOpacity="0.24" stroke={UNDO_COLOR} strokeWidth="2" />
            <text x={STACK_X + STACK_CARD_W / 2} y={STACK_TOP_Y + 25} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              Jump（栈顶）
            </text>
          </g>

          {/* 撤销徽章 */}
          <g ref={undoBadgeRef} style={{ opacity: 0 }}>
            <rect x={STACK_X} y={STACK_TOP_Y - 40} width={STACK_CARD_W} height={26} rx="6" fill={UNDO_COLOR} fillOpacity="0.18" stroke={UNDO_COLOR} strokeWidth="1.4" />
            <text x={STACK_X + STACK_CARD_W / 2} y={STACK_TOP_Y - 23} textAnchor="middle" fontSize="11" fontWeight="700" fill={UNDO_COLOR}>
              ↩ 撤销：弹出栈顶
            </text>
          </g>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={VIEW_H - 20} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            命令是"被对象化的请求"：可执行、可记录、可撤销、可重放
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按键生成命令对象而非直接动作，命令执行后入栈；撤销时栈顶命令弹出反向执行。同一机制还能做重做、操作队列与宏。代价：为每个请求多建一个对象。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命令（Command）：把一个请求封装成一个对象。于是请求可以被传递、排队、
        记录进撤销栈，并在需要时反向执行。调用者（按键）与接收者（演员）之间
        多了一个命令对象作为中介，从而获得撤销、重做、队列等能力。
      </figcaption>
    </figure>
  );
}
