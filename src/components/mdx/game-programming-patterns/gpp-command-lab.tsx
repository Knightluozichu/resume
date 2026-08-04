"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppCommandLab> —— Ch02 Command 模式定制图解（HEL 教学动画标准）。
 *
 * 设计语言（每章专属，不套模板）：
 *  - 视觉隐喻「命令管道」：输入(Input) → 命令对象(Command) → 接收者(Receiver)，
 *    命令对象作为可传递的"票据"沿管道从左向右流动。
 *  - 左栏：类关系栈（interface 虚框 + 实现类实框 + 接收者/调用者），层次堆叠。
 *  - 右栏：执行泳道，命令卡片沿时间轴平移（translateX），接收者高亮脉冲。
 *  - 单 accent 系统：主色 electric blue（--accent），中性锌底；正确/警示态
 *    只在关键时刻出现，不参与常驻配色。
 *  - 无 emoji：状态用几何标记（▷ 执行中 / ◇ 未执行 / ● 完成）。
 *  - 步骤 label 打在动画起始时刻（时序规范）。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "var(--accent)";
const OK = "#3FB97F";
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";

const STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "① 输入事件到达 InputHandler：handleInput() 把按键转成命令对象" },
  { label: "bind", caption: "② 命令对象诞生：JumpCommand 携带接收者引用与参数（重绑定/回放的前提）" },
  { label: "queue", caption: "③ 命令被排队/记录：同一命令可延迟执行、可重放、可撤销" },
  { label: "exec", caption: "④ execute()：命令对象把请求转发给接收者 Player" },
  { label: "act", caption: "⑤ Player.jump() 执行真实行为——调用者与执行者完全解耦" },
  { label: "undo", caption: "⑥ 历史栈支持 undo()：撤销 = 逆序执行已记录命令的逆操作" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppCommandLab() {
  // 左栏类图
  const ifaceRef = useRef<SVGGElement>(null);
  const concreteRef = useRef<SVGGElement>(null);
  const receiverRef = useRef<SVGGElement>(null);
  const invokerRef = useRef<SVGGElement>(null);
  // 右栏泳道
  const cmdCardRef = useRef<SVGGElement>(null);
  const execRef = useRef<SVGGElement>(null);
  const playerRef = useRef<SVGGElement>(null);
  const undoRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(ifaceRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.label("input", 0);
      tl.add(concreteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.label("bind", T);
      tl.add(invokerRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.label("queue", T * 2);
      // 命令卡片沿泳道平移：从调用者位置滑向接收者
      tl.add(cmdCardRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(cmdCardRef.current!, { translateX: [0, 118], duration: T * 0.7, ease: "inOut(2)" }, T * 3);
      tl.label("exec", T * 3);
      tl.add(playerRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4);
      tl.label("act", T * 4);
      tl.add(undoRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 5);
      tl.label("undo", T * 5);
    },
  });

  // 左栏类图几何
  const L_X = 40, L_W = 320;
  const stack = [
    { y: 78, h: 54, ref: ifaceRef, kind: "iface", title: "«interface» Command", lines: ["+ execute()", "+ undo()"] },
    { y: 152, h: 62, ref: concreteRef, kind: "impl", title: "JumpCommand", lines: ["- receiver: Player", "+ execute()"] },
    { y: 240, h: 54, ref: receiverRef, kind: "recv", title: "Player（接收者）", lines: ["+ jump()  +  fire()"] },
    { y: 320, h: 54, ref: invokerRef, kind: "invk", title: "InputHandler（调用者）", lines: ["+ handleInput(): Command"] },
  ];

  // 右栏泳道几何
  const laneY = 96, laneH = 250;
  const swim = [
    { x: 470, w: 120, label: "InputHandler", color: ACCENT },
    { x: 640, w: 200, label: "Command 管道", color: LINE },
  ];
  const playerX = 660;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Design Pattern · Revisited</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Command — 把动作变成可传递的对象</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Command 模式定制图解：左栏类关系栈，右栏命令沿管道从调用者流向接收者，最后演示撤销历史栈。可播放、暂停、单步、拖动进度。">
          {/* 副题 */}
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>把"按下跳跃键"从一句调用，变成一张可流转的票据</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>重绑定 · 回放 · 撤销 · AI 驱动 —— 全部来自"命令即对象"这一个转变</text>

          {/* ═══ 左栏：类关系栈 ═══ */}
          <text x={L_X} y={72} fontSize={11} fontWeight={600} fill={MUTE}>类关系 · 一次解耦</text>
          {stack.map((s) => (
            <g key={s.title} ref={s.ref} style={{ opacity: 0 }}>
              <rect
                x={L_X} y={s.y} width={L_W} height={s.h} rx={8}
                fill={s.kind === "iface" ? "transparent" : "var(--bg)"}
                stroke={s.kind === "iface" ? LINE : ACCENT}
                strokeWidth={s.kind === "iface" ? 1.4 : 1.6}
                strokeDasharray={s.kind === "iface" ? "6,4" : "none"}
              />
              <text x={L_X + 14} y={s.y + 22} fontSize={12} fontWeight={600} fill={s.kind === "iface" ? MUTE : INK} fontStyle={s.kind === "iface" ? "italic" : "normal"}>
                {s.title}
              </text>
              {s.lines.map((l, i) => (
                <text key={l} x={L_X + 14} y={s.y + 22 + 17 * (i + 1)} fontSize={11} fill={MUTE} fontFamily="var(--font-mono)">{l}</text>
              ))}
            </g>
          ))}
          {/* 类间关系线 */}
          <g ref={concreteRef} style={{ opacity: 0 }}>
            <line x1={L_X + 36} y1={152} x2={L_X + 36} y2={132} stroke={LINE} strokeWidth={1} strokeDasharray="4,3" />
            <polygon points={`${L_X + 32},${136} ${L_X + 36},${132} ${L_X + 40},${136}`} fill={MUTE} />
            <text x={L_X + 46} y={146} fontSize={10} fill={MUTE}>实现</text>
            <line x1={L_X + 190} y1={214} x2={L_X + 190} y2={240} stroke={LINE} strokeWidth={1} />
            <text x={L_X + 200} y={232} fontSize={10} fill={MUTE}>关联</text>
          </g>

          {/* ═══ 右栏：执行泳道 ═══ */}
          <text x={470} y={72} fontSize={11} fontWeight={600} fill={MUTE}>执行管道 · 命令流动</text>
          {/* 泳道底框 */}
          <rect x={460} y={88} width={400} height={258} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.2} />
          {/* 调用者泳道 */}
          <g ref={invokerRef} style={{ opacity: 0 }}>
            <rect x={478} y={110} width={120} height={60} rx={8} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.4} />
            <text x={538} y={136} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK}>InputHandler</text>
            <text x={538} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>handleInput()</text>
          </g>
          {/* 命令卡片（沿泳道平移） */}
          <g ref={cmdCardRef} style={{ opacity: 0 }}>
            <rect x={478} y={196} width={120} height={52} rx={8} fill={ACCENT} opacity={0.92} />
            <text x={538} y={218} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">JumpCommand</text>
            <text x={538} y={236} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.85)">receiver: Player</text>
          </g>
          {/* 接收者泳道 */}
          <g ref={playerRef} style={{ opacity: 0 }}>
            <rect x={660} y={110} width={176} height={60} rx={8} fill="var(--bg)" stroke={LINE} strokeWidth={1.4} />
            <text x={748} y={136} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK}>Player（接收者）</text>
            <text x={748} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>执行真实行为</text>
            {/* 高亮脉冲框 */}
            <rect x={652} y={102} width={192} height={76} rx={12} fill="transparent" stroke={OK} strokeWidth={1.6} strokeDasharray="6,4" opacity={0.6} />
          </g>
          {/* 执行标签 */}
          <g ref={execRef} style={{ opacity: 0 }}>
            <text x={538} y={270} textAnchor="middle" fontSize={11} fill={MUTE}>execute() 转发</text>
            <line x1={598} y1={224} x2={660} y2={224} stroke={OK} strokeWidth={1.6} strokeDasharray="4,3" />
            <polygon points={`${656},${220} ${660},${224} ${656},${228}`} fill={OK} />
          </g>
          {/* 撤销历史栈 */}
          <g ref={undoRef} style={{ opacity: 0 }}>
            <rect x={478} y={292} width={360} height={40} rx={8} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.2} />
            <text x={658} y={317} textAnchor="middle" fontSize={11} fontWeight={600} fill={OK}>历史栈：undo() = 逆序执行逆操作 → 撤销支持</text>
          </g>

          {/* 时序基线 */}
          <line x1={470} y1={356} x2={860} y2={356} stroke={LINE} strokeWidth={0.8} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={470 + i * 65} cy={356} r={3} fill={MUTE} />
              <text x={470 + i * 65} y={372} textAnchor="middle" fontSize={10} fill={MUTE}>{i + 1}</text>
            </g>
          ))}
        </svg>

        <TimelineControls timeline={timeline} labelText={LABEL} caption="命令把「按哪个键」与「做什么」拆开：改键位、录回放、做撤销，都只是对命令对象的不同处理。" />
      </div>
    </div>
  );
}