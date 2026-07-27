"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdCommandDiagram>：遥控器命令模式动画（Head First 设计模式 · 第6章）。
 *
 * 核心：把请求封装成命令对象。Invoker（遥控器）持有 Command，按键调 execute()，
 * Command 委托 Receiver（灯）执行；undo() 执行相反操作——请求者与执行者解耦，
 * 请求可存储、排队、撤销、宏组合。
 *
 * 节拍：
 *  ① 三个角色：Invoker（遥控器）、Command（开灯命令）、Receiver（灯）
 *  ② 按下按钮 → Invoker 调 command.execute()
 *  ③ Command 委托 light.on() → 灯亮
 *  ④ 按撤销 → command.undo() → light.off() → 灯灭
 *  ⑤ 命令是对象化的请求：可存储、排队、撤销、宏组合
 */

const VIEW_W = 720;
const VIEW_H = 370;

const ACCENT = "var(--accent)";
const CMD_COLOR = "#C792EA";
const BULB_COLOR = "#E5B567";
const ON_COLOR = "#3FB97F";
const OFF_COLOR = "#E5534B";

const T = TEACHING_BEAT_MS;

const FLOW_Y = 232; // 调用流所在 y

const STEPS: readonly TeachingStep[] = [
  { label: "roles", caption: "三个角色：Invoker 持有命令、Command 封装请求、Receiver 真正干活" },
  { label: "press", caption: "按下按钮——Invoker 调 command.execute()，它不知道命令背后是灯" },
  { label: "execute", caption: "Command 委托 light.on()——灯亮了。请求通过命令对象间接到达执行者" },
  { label: "undo", caption: "按撤销——Invoker 调 command.undo()，Command 调 light.off()，灯灭" },
  { label: "value", caption: "命令是对象化的请求：可存储、可排队、可撤销、可宏组合——脱离调用栈" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdCommandDiagram() {
  const invokerRef = useRef<SVGGElement | null>(null);
  const commandRef = useRef<SVGGElement | null>(null);
  const receiverRef = useRef<SVGGElement | null>(null);
  const arrow1Ref = useRef<SVGLineElement | null>(null);
  const arrow2Ref = useRef<SVGLineElement | null>(null);
  const pressBadgeRef = useRef<SVGGElement | null>(null);
  const undoBadgeRef = useRef<SVGGElement | null>(null);
  const execPacketRef = useRef<SVGGElement | null>(null);
  const undoPacketRef = useRef<SVGGElement | null>(null);
  const execLabelRef = useRef<SVGGElement | null>(null);
  const onLabelRef = useRef<SVGGElement | null>(null);
  const undoLabelRef = useRef<SVGGElement | null>(null);
  const bulbOnRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① roles（0→T）：三个角色淡入
      tl.add(invokerRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(commandRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.2);
      tl.add(receiverRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.add(arrow1Ref.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.6);
      tl.add(arrow2Ref.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.7);
      tl.label("roles", 0);

      // ② press（T→2T）：按钮徽章 + 包 Invoker→Command + execute 标签
      tl.add(pressBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(execPacketRef.current!, { opacity: [1, 1], x: [240, 367], y: [FLOW_Y, FLOW_Y], duration: T * 0.5, ease: "inOut(2)" }, T * 1.1);
      tl.add(execLabelRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.2);
      tl.label("press", T);

      // ③ execute（2T→3T）：包 Command→Light，灯亮
      tl.add(execPacketRef.current!, { opacity: [1, 1], x: [367, 530], y: [FLOW_Y, FLOW_Y], duration: T * 0.5, ease: "inOut(2)" }, T * 2);
      tl.add(execPacketRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.5);
      tl.add(onLabelRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 2.2);
      tl.add(bulbOnRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 2.4);
      tl.label("execute", T * 2);

      // ④ undo（3T→4T）：撤销徽章 + undo 包走完全程，灯灭
      tl.add(pressBadgeRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 3);
      tl.add(execLabelRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 3);
      tl.add(onLabelRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 3);
      tl.add(undoBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(undoPacketRef.current!, { opacity: [1, 1], x: [240, 530], y: [FLOW_Y, FLOW_Y], duration: T * 0.6, ease: "inOut(2)" }, T * 3.1);
      tl.add(undoPacketRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.7);
      tl.add(undoLabelRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 3.3);
      tl.add(bulbOnRef.current!, { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" }, T * 3.5);
      tl.label("undo", T * 3);

      // ⑤ value（4T→5T）：结论
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("value", T * 4);
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
          aria-label="命令模式动画。遥控器作为 Invoker 持有开灯命令，按下按钮调用 command.execute，命令委托 light.on，灯亮。按撤销调用 command.undo，命令委托 light.off，灯灭。Invoker 不知道命令背后是灯，请求者与执行者解耦。命令是对象化的请求，可存储、排队、撤销、宏组合。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            命令模式 · 智能遥控器
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            把请求封装成对象——Invoker 调命令，命令调接收者，请求可撤销可组合
          </text>

          {/* Invoker（遥控器） */}
          <g ref={invokerRef} style={{ opacity: 0 }}>
            <rect x={48} y={110} width={185} height={140} rx="10" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x={140} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              RemoteControl
            </text>
            <text x={140} y={153} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Invoker · 持有命令
            </text>
            <text x={140} y={180} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              onCommands[slot]
            </text>
            <text x={140} y={200} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              undoButtonPressed()
            </text>
          </g>

          {/* Command（开灯命令） */}
          <g ref={commandRef} style={{ opacity: 0 }}>
            <rect x={280} y={110} width={175} height={140} rx="10" fill={CMD_COLOR} fillOpacity="0.1" stroke={CMD_COLOR} strokeWidth="1.8" />
            <text x={367} y={135} textAnchor="middle" fontSize="13" fontWeight="700" fill={CMD_COLOR}>
              LightOnCommand
            </text>
            <text x={367} y={153} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Command · 封装请求
            </text>
            <text x={367} y={180} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              execute() → light.on()
            </text>
            <text x={367} y={200} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              undo() → light.off()
            </text>
          </g>

          {/* Receiver（灯） */}
          <g ref={receiverRef} style={{ opacity: 0 }}>
            <rect x={500} y={110} width={172} height={140} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.6" />
            {/* 灯泡（灭） */}
            <circle cx={586} cy={162} r={20} fill="var(--border)" fillOpacity="0.25" stroke="var(--border)" strokeWidth="1.4" />
            <text x={586} y={212} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
              Light
            </text>
            <text x={586} y={230} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Receiver · 真正干活
            </text>
          </g>

          {/* 灯泡（亮） */}
          <g ref={bulbOnRef} style={{ opacity: 0 }}>
            <circle cx={586} cy={162} r={30} fill={BULB_COLOR} fillOpacity="0.18" />
            <circle cx={586} cy={162} r={20} fill={BULB_COLOR} stroke={BULB_COLOR} strokeWidth="1.6" />
            <text x={586} y={167} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg)">
              💡
            </text>
          </g>

          {/* 调用箭头 */}
          <line ref={arrow1Ref} x1={235} y1={FLOW_Y} x2={278} y2={FLOW_Y} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />
          <line ref={arrow2Ref} x1={457} y1={FLOW_Y} x2={498} y2={FLOW_Y} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />

          {/* 按钮徽章 */}
          <g ref={pressBadgeRef} style={{ opacity: 0 }}>
            <rect x={70} y={82} width={140} height={22} rx="5" fill={ON_COLOR} fillOpacity="0.16" stroke={ON_COLOR} strokeWidth="1.2" />
            <text x={140} y={97} textAnchor="middle" fontSize="10" fontWeight="700" fill={ON_COLOR}>
              ▶ 按下「开」按钮
            </text>
          </g>
          <g ref={undoBadgeRef} style={{ opacity: 0 }}>
            <rect x={70} y={82} width={140} height={22} rx="5" fill={OFF_COLOR} fillOpacity="0.16" stroke={OFF_COLOR} strokeWidth="1.2" />
            <text x={140} y={97} textAnchor="middle" fontSize="10" fontWeight="700" fill={OFF_COLOR}>
              ↩ 按下「撤销」按钮
            </text>
          </g>

          {/* execute 包 */}
          <g ref={execPacketRef} style={{ opacity: 0, transform: `translate(240px, ${FLOW_Y}px)` }}>
            <circle cx={0} cy={0} r="7" fill={ON_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>
          {/* undo 包 */}
          <g ref={undoPacketRef} style={{ opacity: 0, transform: `translate(240px, ${FLOW_Y}px)` }}>
            <circle cx={0} cy={0} r="7" fill={OFF_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 调用标签 */}
          <g ref={execLabelRef} style={{ opacity: 0 }}>
            <text x={256} y={220} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={ON_COLOR}>
              execute()
            </text>
          </g>
          <g ref={onLabelRef} style={{ opacity: 0 }}>
            <text x={477} y={220} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={ON_COLOR}>
              light.on()
            </text>
          </g>
          <g ref={undoLabelRef} style={{ opacity: 0 }}>
            <text x={367} y={262} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="monospace" fill={OFF_COLOR}>
              undo() → light.off()
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={296} width={540} height={44} rx="8" fill={CMD_COLOR} fillOpacity="0.1" stroke={CMD_COLOR} strokeWidth="1.6" />
            <text x={360} y={314} textAnchor="middle" fontSize="12" fontWeight="700" fill={CMD_COLOR}>
              命令 = 对象化的请求
            </text>
            <text x={360} y={332} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
              可存储 · 可排队 · 可撤销 · 可宏组合——请求脱离调用栈独立管理
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="Invoker 只和 Command 接口对话，不知道 Receiver 是谁——请求者和执行者彻底解耦。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命令模式把「请求」封装成对象：Invoker 发出请求，Command 封装请求并委托
        Receiver 执行。请求因此可以被存储、传递、排队、撤销和组合——
        宏命令一次执行一组操作，撤销栈记录历史，都是命令对象化的红利。
      </figcaption>
    </figure>
  );
}
