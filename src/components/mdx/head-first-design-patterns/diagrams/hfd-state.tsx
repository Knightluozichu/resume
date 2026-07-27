"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdStateDiagram>：口香糖机状态模式动画（Head First 设计模式 · 第10章）。
 *
 * 核心：把每种状态封装成独立的 State 对象，Context（GumballMachine）持有当前
 * state 引用，行为委托给 state 执行；状态转移 = 切换 state 引用。加状态只需加类。
 *
 * 节拍：
 *  ① 结构：Context + 四个状态对象（没25分/有25分/售出/售罄），转移箭头标注动作
 *  ② 投币：insertQuarter() → 从 NoQuarter 转到 HasQuarter
 *  ③ 转把手：turnCrank() → Sold，dispense() 发糖后回到 NoQuarter
 *  ④ 扩展：新增 WinnerState（中奖状态）只需加一个类，Context 零改动
 *  ⑤ 对比：if-else 版本加状态要改大 switch，状态模式把行为分散到状态对象
 */

const VIEW_W = 720;
const VIEW_H = 440;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const DANGER = "#E5534B";

const T = TEACHING_BEAT_MS;

// 状态中心坐标
const NOQUARTER = { x: 412, y: 116 };
const HASQUARTER = { x: 607, y: 116 };
const SOLD = { x: 607, y: 286 };

const STEPS: readonly TeachingStep[] = [
  { label: "structure", caption: "每种状态是一个对象，Context 持有当前 state 引用，转移箭头标注触发动作" },
  { label: "insert", caption: "投币 insertQuarter()——当前状态从 NoQuarter 切到 HasQuarter" },
  { label: "crank", caption: "转把手 turnCrank()——切到 Sold，dispense() 发糖后回到 NoQuarter" },
  { label: "extend", caption: "新增 WinnerState（10% 中奖）只需加一个状态类，GumballMachine 零改动" },
  { label: "compare", caption: "if-else 版本加状态要改大 switch；状态模式把行为分散到状态对象，转移显式" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdStateDiagram() {
  const contextRef = useRef<SVGGElement | null>(null);
  const statesRef = useRef<SVGGElement | null>(null);
  const indicatorRef = useRef<SVGGElement | null>(null);
  const insertArrowRef = useRef<SVGGElement | null>(null);
  const crankArrowRef = useRef<SVGGElement | null>(null);
  const dispenseArrowRef = useRef<SVGGElement | null>(null);
  const winnerRef = useRef<SVGGElement | null>(null);
  const compareRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① structure（0→T）：Context + 状态机淡入，指示点在 NoQuarter
      tl.add(contextRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(statesRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 0.2);
      tl.add(indicatorRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.6);
      tl.label("structure", 0);

      // ② insert（T→2T）：投币箭头点亮，指示点 NoQuarter→HasQuarter
      tl.add(insertArrowRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T);
      tl.add(indicatorRef.current!, { x: [NOQUARTER.x, HASQUARTER.x], y: [NOQUARTER.y, HASQUARTER.y], duration: T * 0.6, ease: "inOut(2)" }, T * 1.1);
      tl.label("insert", T);

      // ③ crank（2T→3T）：转把手箭头点亮，指示点 HasQuarter→Sold，再 dispense 回 NoQuarter
      tl.add(crankArrowRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(indicatorRef.current!, { x: [HASQUARTER.x, SOLD.x], y: [HASQUARTER.y, SOLD.y], duration: T * 0.4, ease: "inOut(2)" }, T * 2.1);
      tl.add(dispenseArrowRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.add(indicatorRef.current!, { x: [SOLD.x, NOQUARTER.x], y: [SOLD.y, NOQUARTER.y], duration: T * 0.4, ease: "inOut(2)" }, T * 2.55);
      tl.label("crank", T * 2);

      // ④ extend（3T→4T）：WinnerState 出现
      tl.add(winnerRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("extend", T * 3);

      // ⑤ compare（4T→5T）：对比 + 结论
      tl.add(compareRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.3);
      tl.label("compare", T * 4);
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
          aria-label="状态模式动画。口香糖机 Context 持有当前状态引用，四个状态对象：没25分钱、有25分钱、售出、售罄。投币 insertQuarter 从没25分转到有25分，转把手 turnCrank 转到售出，dispense 发糖后回到没25分。新增中奖状态 WinnerState 只需加一个类，Context 零改动。对比 if-else 版本加状态要改大 switch，状态模式把行为分散到状态对象。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态模式 · 口香糖机
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            每种状态是一个对象——Context 切换 state 引用，行为随状态改变
          </text>

          {/* Context */}
          <g ref={contextRef} style={{ opacity: 0 }}>
            <rect x={48} y={100} width={190} height={130} rx="10" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x={143} y={125} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              GumballMachine
            </text>
            <text x={143} y={143} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Context · 持有当前状态
            </text>
            <text x={143} y={170} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              state: State
            </text>
            <text x={143} y={192} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              insertQuarter()
            </text>
            <text x={143} y={210} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              turnCrank()
            </text>
          </g>

          {/* 状态机：四个状态 + 静态转移箭头 */}
          <g ref={statesRef} style={{ opacity: 0 }}>
            {/* NoQuarter */}
            <rect x={330} y={85} width={165} height={62} rx="9" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.6" />
            <text x={412} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              NoQuarterState
            </text>
            <text x={412} y={132} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              没投币
            </text>

            {/* HasQuarter */}
            <rect x={525} y={85} width={165} height={62} rx="9" fill="#E5B567" fillOpacity="0.1" stroke="#E5B567" strokeWidth="1.6" />
            <text x={607} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              HasQuarterState
            </text>
            <text x={607} y={132} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              已投币
            </text>

            {/* SoldOut */}
            <rect x={330} y={255} width={165} height={62} rx="9" fill="#8892A6" fillOpacity="0.1" stroke="#8892A6" strokeWidth="1.6" />
            <text x={412} y={282} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              SoldOutState
            </text>
            <text x={412} y={302} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              售罄
            </text>

            {/* Sold */}
            <rect x={525} y={255} width={165} height={62} rx="9" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={607} y={282} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              SoldState
            </text>
            <text x={607} y={302} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              售出（发糖中）
            </text>

            {/* 静态转移：ejectQuarter（HasQuarter→NoQuarter） */}
            <line x1={523} y1={128} x2={499} y2={128} stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="4 3" />
            <polygon points="497,128 505,124 505,132" fill="var(--text-secondary)" />
            <text x={509} y={143} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
              ejectQuarter()
            </text>

            {/* 静态转移：Sold→SoldOut（售罄） */}
            <line x1={523} y1={300} x2={499} y2={300} stroke="var(--text-secondary)" strokeWidth="1.2" strokeDasharray="4 3" />
            <polygon points="497,300 505,296 505,304" fill="var(--text-secondary)" />
            <text x={509} y={315} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
              糖卖光了
            </text>
          </g>

          {/* 主转移：insertQuarter（NoQuarter→HasQuarter） */}
          <g ref={insertArrowRef} style={{ opacity: 0 }}>
            <line x1={497} y1={104} x2={521} y2={104} stroke="#E5B567" strokeWidth="2" />
            <polygon points="523,104 515,100 515,108" fill="#E5B567" />
            <text x={509} y={96} textAnchor="middle" fontSize="9" fontWeight="700" fill="#E5B567">
              insertQuarter()
            </text>
          </g>

          {/* 主转移：turnCrank（HasQuarter→Sold） */}
          <g ref={crankArrowRef} style={{ opacity: 0 }}>
            <line x1={607} y1={149} x2={607} y2={251} stroke={OK_COLOR} strokeWidth="2" />
            <polygon points="607,253 603,245 611,245" fill={OK_COLOR} />
            <text x={632} y={205} fontSize="9" fontWeight="700" fill={OK_COLOR}>
              turnCrank()
            </text>
          </g>

          {/* 主转移：dispense（Sold→NoQuarter） */}
          <g ref={dispenseArrowRef} style={{ opacity: 0 }}>
            <line x1={525} y1={272} x2={442} y2={152} stroke={ACCENT} strokeWidth="2" strokeDasharray="6 3" />
            <polygon points="440,150 448,156 440,160" fill={ACCENT} />
            <text x={468} y={220} fontSize="9" fontWeight="700" fill={ACCENT}>
              dispense() 发糖
            </text>
          </g>

          {/* 当前状态指示点 */}
          <g ref={indicatorRef} style={{ opacity: 0, transform: `translate(${NOQUARTER.x}px, ${NOQUARTER.y}px)` }}>
            <circle cx={0} cy={0} r="10" fill={ACCENT} stroke="var(--elevated)" strokeWidth="2.5" />
            <circle cx={0} cy={0} r="4" fill="var(--elevated)" />
          </g>

          {/* WinnerState（扩展） */}
          <g ref={winnerRef} style={{ opacity: 0 }}>
            <rect x={48} y={275} width={190} height={58} rx="9" fill="#C792EA" fillOpacity="0.1" stroke="#C792EA" strokeWidth="1.6" strokeDasharray="5 3" />
            <text x={143} y={298} textAnchor="middle" fontSize="12" fontWeight="700" fill="#C792EA">
              WinnerState（新增）
            </text>
            <text x={143} y={318} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              10% 中奖免单 · 加一个类即可
            </text>
          </g>

          {/* 对比 */}
          <g ref={compareRef} style={{ opacity: 0 }}>
            <rect x={48} y={345} width={624} height={28} rx="7" fill={DANGER} fillOpacity="0.08" stroke={DANGER} strokeWidth="1.3" />
            <text x={360} y={363} textAnchor="middle" fontSize="11" fontWeight="700" fill={DANGER}>
              ✗ if-else 版本：加一个状态 = 改动庞大的 switch，容易漏分支
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={383} width={540} height={34} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={398} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              ✓ 状态模式：行为分散到状态对象，转移显式
            </text>
            <text x={360} y={412} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              加状态 = 加一个类，Context 零改动——用对象组合替代条件分支
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="状态转移 = 切换 state 引用。Context 不关心当前是哪个状态，只把行为委托给 state 对象。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态模式把状态相关行为分散到独立的状态对象，Context 持有当前状态引用并委托行为。
        状态转移通过切换引用显式表达，替代不断膨胀的 if-else / switch。
        新增状态只需新增状态类，Context 与其他状态不受影响。
      </figcaption>
    </figure>
  );
}
