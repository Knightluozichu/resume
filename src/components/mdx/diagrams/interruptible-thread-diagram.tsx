"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <InterruptibleThreadDiagram>：协作式中断（cooperative interruption）的动画（HEL-238，§5 辅 Demo）。
 *
 * 餐厅后厨隐喻：给帮厨发「下班」信号（interrupt 置位 interrupt_flag），他不会被当场拽走，
 * 而是干到一个段落点（中断点 interruption_point）抬头看一眼信号——没置位就继续干，
 * 置位了就收工（抛出/退出，干净收尾）。不是强杀，是发信号、线程到安全点自己退。
 *
 * 布局：上泳道 = 目标工作线程的执行轨（一串「干活 → 中断点检查」交替的节点），
 * 下方 = 主线程，某拍调 interrupt() 把 interrupt_flag 置位（中间画一个 flag 指示灯）。
 * 分 4 拍：
 *  ① 线程跑到第 1 个中断点，检查 flag=false → 继续干（绿色「继续」）；
 *  ② 主线程 interrupt()：把 interrupt_flag 由 false 置为 true（指示灯变红）；
 *  ③ 线程跑到第 2 个中断点，检查 flag=true → 决定退出；
 *  ④ 线程抛 thread_interrupted / 退出循环，干净收尾（不是被强杀）。
 *
 * 可视化核心：中断是「置标志 + 线程到中断点自查」的协作式握手，不是强制 kill。
 *
 * 时间线 = anime.js timeline，playhead 横扫 4 拍分段点亮（每拍一个快照覆盖层）。
 * label 锚定「点亮到最亮」时刻（lit = beat*(i+1)），同款写法。
 *
 * 视觉全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 300;

// 线程执行轨：本端在左，沿时间向右；包含两个「中断点」检查节点。
const TRACK_Y = 92;
const NODE_H = 50;
const NODE_W = 116;
const NODE_GAP = 18;
const TRACK_X0 = 150; // 左侧留给「工作线程」标签
const nodeX = (i: number) => TRACK_X0 + i * (NODE_W + NODE_GAP);

// 轨上 3 个节点：干活块、中断点1、中断点2。
const NODE_COUNT = 3;

// 主线程行 + flag 指示灯位置。
const MAIN_Y = 200;
const FLAG_X = nodeX(1) + NODE_W + NODE_GAP / 2 - 10;

const RUN_COLOR = "var(--success)"; // 继续干 / 正常运行
const CHECK_COLOR = "var(--accent)"; // 中断点检查
const FLAG_OFF = "var(--text-secondary)"; // flag=false
const FLAG_ON = "var(--danger)"; // flag=true / 退出

type Beat = {
  label: string;
  caption: string;
  // 当前 flag 值。
  flag: boolean;
  // 当前线程停在第几个节点（0 干活 / 1 中断点1 / 2 中断点2 / 3 已退出）。
  pos: number;
  // 当前节点的判定文案与状态。
  verdict: "run" | "check-false" | "check-true" | "exit";
  // 主线程这一拍是否在调 interrupt()。
  interrupting: boolean;
};

const BEATS: readonly Beat[] = [
  {
    label: "check1-false",
    caption:
      "线程跑到第 1 个中断点，检查 interrupt_flag = false → 没让下班，继续干",
    flag: false,
    pos: 1,
    verdict: "check-false",
    interrupting: false,
  },
  {
    label: "main-interrupt",
    caption:
      "主线程调 interrupt()：把目标线程的 interrupt_flag 由 false 置为 true（发「下班」信号）",
    flag: true,
    pos: 1,
    verdict: "run",
    interrupting: true,
  },
  {
    label: "check2-true",
    caption: "线程跑到第 2 个中断点，检查 interrupt_flag = true → 该收工了",
    flag: true,
    pos: 2,
    verdict: "check-true",
    interrupting: false,
  },
  {
    label: "exit",
    caption:
      "线程在中断点抛 thread_interrupted / 退出循环，干净收尾——不是被强杀，是自己到安全点退",
    flag: true,
    pos: 3,
    verdict: "exit",
    interrupting: false,
  },
];

const STEPS: readonly TeachingStep[] = BEATS.map((b) => ({
  label: b.label,
  caption: b.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  BEATS.map((b) => [b.label, b.caption]),
);

const NODE_TEXT = ["干活…", "中断点①", "中断点②"] as const;

const SWEEP_LEFT = TRACK_X0 - 14;
const SWEEP_RIGHT = nodeX(NODE_COUNT - 1) + NODE_W + 20;

export function InterruptibleThreadDiagram() {
  const beatRefs = useRef<Record<string, SVGGElement | null>>({});
  const playheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      if (playheadRef.current) {
        tl.add(
          playheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * BEATS.length,
            ease: "linear",
          },
          0,
        );
      }
      BEATS.forEach((b, i) => {
        const el = beatRefs.current[b.label];
        if (!el) return;
        const lit = TEACHING_BEAT_MS * (i + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * i,
        );
        if (i > 0) {
          const prev = beatRefs.current[BEATS[i - 1].label];
          if (prev) {
            tl.add(
              prev,
              { opacity: [1, 0], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              TEACHING_BEAT_MS * i,
            );
          }
        }
        tl.label(b.label, lit);
      });
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
          aria-label="协作式中断的动画。上方是目标工作线程的执行轨，沿时间排着「干活」「中断点①」「中断点②」三个节点；下方是主线程，中间有一个 interrupt_flag 指示灯。第一步线程跑到第一个中断点，检查 interrupt_flag 为 false，没让下班，于是继续干。第二步主线程调用 interrupt，把目标线程的 interrupt_flag 由 false 置为 true，发出下班信号，指示灯变红。第三步线程跑到第二个中断点，检查 interrupt_flag 为 true，该收工了。第四步线程在中断点抛出 thread_interrupted 异常或退出循环，干净收尾，强调这不是被强杀，而是线程自己跑到安全点才退出。播放时 playhead 从左向右横扫，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            协作式中断：发「下班」信号，线程到中断点自己退
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            interrupt() 置位
            interrupt_flag，线程每到中断点查一次——置位了才退，不是强杀
          </text>

          {/* 泳道标签 */}
          <text
            x="20"
            y={TRACK_Y + NODE_H / 2 + 4}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            工作线程
          </text>
          <text
            x="20"
            y={MAIN_Y + 18}
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            主线程
          </text>

          {/* 执行轨底框（常驻三个节点轮廓） */}
          {Array.from({ length: NODE_COUNT }).map((_, i) => {
            const x = nodeX(i);
            const isCheck = i > 0;
            return (
              <g key={`base-node-${i}`}>
                <rect
                  x={x}
                  y={TRACK_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={(isCheck ? CHECK_COLOR : RUN_COLOR) as string}
                  fillOpacity="0.06"
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray={isCheck ? "5 4" : undefined}
                />
                <text
                  x={x + NODE_W / 2}
                  y={TRACK_Y + 19}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {NODE_TEXT[i]}
                </text>
                {isCheck && (
                  <text
                    x={x + NODE_W / 2}
                    y={TRACK_Y + 37}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    查 flag
                  </text>
                )}
              </g>
            );
          })}

          {/* 节点间连线 */}
          {Array.from({ length: NODE_COUNT - 1 }).map((_, i) => (
            <line
              key={`link-${i}`}
              x1={nodeX(i) + NODE_W}
              y1={TRACK_Y + NODE_H / 2}
              x2={nodeX(i + 1)}
              y2={TRACK_Y + NODE_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              opacity="0.5"
            />
          ))}

          {/* 每拍快照覆盖层 */}
          {BEATS.map((b, bi) => {
            const flagColor = b.flag ? FLAG_ON : FLAG_OFF;
            return (
              <g
                key={b.label}
                ref={(el) => {
                  beatRefs.current[b.label] = el;
                }}
                style={{ opacity: bi === 0 ? 1 : 0 }}
              >
                {/* 当前节点高亮（pos<3 时落在某节点；pos=3 退出无高亮节点） */}
                {b.pos < NODE_COUNT && (
                  <rect
                    x={nodeX(b.pos)}
                    y={TRACK_Y}
                    width={NODE_W}
                    height={NODE_H}
                    rx="8"
                    fill={
                      (b.verdict === "check-true"
                        ? FLAG_ON
                        : b.pos > 0
                          ? CHECK_COLOR
                          : RUN_COLOR) as string
                    }
                    fillOpacity="0.2"
                    stroke={
                      (b.verdict === "check-true"
                        ? FLAG_ON
                        : b.pos > 0
                          ? CHECK_COLOR
                          : RUN_COLOR) as string
                    }
                    strokeWidth="2.4"
                  />
                )}

                {/* 判定气泡（节点上方） */}
                {b.verdict === "check-false" && (
                  <text
                    x={nodeX(b.pos) + NODE_W / 2}
                    y={TRACK_Y - 12}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={RUN_COLOR}
                  >
                    flag=false → 继续 ✓
                  </text>
                )}
                {b.verdict === "check-true" && (
                  <text
                    x={nodeX(b.pos) + NODE_W / 2}
                    y={TRACK_Y - 12}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={FLAG_ON}
                  >
                    flag=true → 该退出
                  </text>
                )}

                {/* 退出态：在轨右端、节点②之外的空隙画收工竖标（不压节点框） */}
                {b.verdict === "exit" && (
                  <g>
                    <rect
                      x={nodeX(NODE_COUNT - 1) + NODE_W + 8}
                      y={TRACK_Y - 4}
                      width={4}
                      height={NODE_H + 8}
                      rx="2"
                      fill={FLAG_ON}
                      opacity="0.6"
                    />
                    <text
                      x={nodeX(NODE_COUNT - 1) + NODE_W / 2}
                      y={TRACK_Y - 12}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={FLAG_ON}
                    >
                      抛 thread_interrupted → 干净收尾
                    </text>
                  </g>
                )}

                {/* interrupt_flag 指示灯 */}
                <circle
                  cx={FLAG_X}
                  cy={(TRACK_Y + NODE_H + MAIN_Y) / 2}
                  r="13"
                  fill={flagColor}
                  fillOpacity="0.22"
                  stroke={flagColor}
                  strokeWidth="2"
                />
                <text
                  x={FLAG_X}
                  y={(TRACK_Y + NODE_H + MAIN_Y) / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={flagColor}
                >
                  {b.flag ? "ON" : "off"}
                </text>
                <text
                  x={FLAG_X}
                  y={(TRACK_Y + NODE_H + MAIN_Y) / 2 + 30}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill="var(--text-secondary)"
                >
                  interrupt_flag
                </text>

                {/* 主线程 interrupt() 动作 */}
                {b.interrupting ? (
                  <g>
                    <line
                      x1={FLAG_X}
                      y1={MAIN_Y + 6}
                      x2={FLAG_X}
                      y2={(TRACK_Y + NODE_H + MAIN_Y) / 2 + 16}
                      stroke={FLAG_ON}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      markerEnd="url(#it-arrow)"
                    />
                    <text
                      x={FLAG_X + 18}
                      y={MAIN_Y + 18}
                      fontSize="11.5"
                      fontWeight="700"
                      fill={FLAG_ON}
                    >
                      interrupt()：置位 flag → true 🔔
                    </text>
                  </g>
                ) : (
                  <text
                    x={FLAG_X + 18}
                    y={MAIN_Y + 18}
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    主线程：做别的事，未发信号
                  </text>
                )}
              </g>
            );
          })}

          <defs>
            <marker
              id="it-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* playhead */}
          <g
            ref={playheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={TRACK_Y - 26}
              x2="0"
              y2={MAIN_Y + 24}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${TRACK_Y - 26} L 5 ${TRACK_Y - 26} L 0 ${TRACK_Y - 21} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="中断不是强杀：主线程 interrupt() 只把 interrupt_flag 置位；目标线程每跑到一个「中断点」就查一次 flag——没置位继续干，置位了就抛出/退出、干净收尾。这就是协作式中断。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协作式中断：给帮厨发「下班」信号（主线程 interrupt() 把 interrupt_flag
        置位），他不会被当场拽走，而是干到一个段落点（中断点
        interruption_point）抬头看一眼信号——没置位继续干，置位了就收工。线程到安全点自己退，不是被强杀。
      </figcaption>
    </figure>
  );
}
