"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TsanDetectionDiagram>：ThreadSanitizer 如何抓数据竞争动画（HEL-240，§5 辅 Demo）。
 *
 * 演收官章「测试与调试」核心工具 TSan 的工作原理：靠 happens-before 分析自动抓数据竞争
 * （呼应第 6 章 happens-before）。
 *
 * 餐厅后厨隐喻：给后厨装一套监控（消毒器/TSan），自动盯着「两人同时碰一份料、却没打招呼」。
 *
 * 五拍：
 *  ① 线程 A 写 x、线程 B 读 x，两者之间没有任何同步（无锁、无原子、无 happens-before 边）；
 *  ② TSan 在每次内存访问处插桩（instrument），记录访问者：哪个线程、是否加锁、向量时钟；
 *  ③ 把 A 写 x 与 B 读 x 两条记录摆到一起比对：它们之间有没有 happens-before 关系？
 *  ④ 发现两条访问之间无 happens-before、且至少一个是写 → 判定数据竞争（标红）；
 *  ⑤ TSan 报告：打印冲突的两处访问（A 的写、B 的读）与各自调用栈。
 *
 * 共用一条 anime.js timeline，5 个关键帧逐拍点亮对应层。label 锚在「该拍点亮到最亮」时刻
 * （lit = beat*(i+1)），与 FalseSharingDiagram 同款，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6）。视觉全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS。
 */

const VIEW_W = 680;
const VIEW_H = 470;

const A_COLOR = "var(--accent)"; // 线程 A（写）
const B_COLOR = "var(--warning)"; // 线程 B（读）
const TSAN_COLOR = "var(--success)"; // TSan 插桩 / 监控
const RACE_COLOR = "var(--danger)"; // 数据竞争判定
const MUTED = "var(--text-secondary)";

// —— 两线程访问节点（顶部）——
const ACC_Y = 62;
const ACC_H = 54;
const ACC_W = 220;
const A_X = 32;
const B_X = VIEW_W - 32 - ACC_W; // 右对齐，与 A 之间有大间隙

// —— 中央共享变量 x ——
const VAR_X = VIEW_W / 2 - 44;
const VAR_Y = 132;
const VAR_W = 88;
const VAR_H = 42;

// —— TSan 插桩记录表（中部，两条记录并排）——
const REC_Y = 212;
const REC_H = 56;
const REC_W = 300;
const RECA_X = 32;
const RECB_X = VIEW_W - 32 - REC_W; // 右记录，与左记录 16px 间隙（32+300=332，348-332=16）

// —— 比对问号药丸（独立一带，落在记录与判定条之间，不压记录）——
const CMP_W = 150;
const CMP_H = 24;
const CMP_X = VIEW_W / 2 - CMP_W / 2;
const CMP_Y = 278;

// —— 判定 / 报告条（底部，两条上下叠放，互不重叠）——
const VERDICT_X = 32;
const VERDICT_Y = 314;
const VERDICT_W = VIEW_W - 64;
const VERDICT_H = 40;

const REPORT_X = 32;
const REPORT_Y = 362;
const REPORT_W = VIEW_W - 64;
const REPORT_H = 68;

const STEPS: readonly TeachingStep[] = [
  {
    label: "access",
    caption:
      "① 线程 A 写 x、线程 B 读 x，两者之间没有任何同步——没加锁、没用原子、没有 happens-before 边",
  },
  {
    label: "instrument",
    caption:
      "② TSan 在每次内存访问处插桩，记下：哪个线程、是读是写、当时是否加锁、它的向量时钟（happens-before 信息）",
  },
  {
    label: "compare",
    caption:
      "③ 把「A 写 x」和「B 读 x」两条记录摆到一起比对：它们之间存在 happens-before 关系吗？",
  },
  {
    label: "verdict",
    caption:
      "④ 发现两条访问之间无 happens-before、且至少一个是写 → 判定为数据竞争",
  },
  {
    label: "report",
    caption:
      "⑤ TSan 报告冲突：打印两处互相竞争的访问（A 的写、B 的读）和各自的调用栈，定位到代码行",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function TsanDetectionDiagram() {
  const instrumentRef = useRef<SVGGElement | null>(null);
  const recARef = useRef<SVGGElement | null>(null);
  const recBRef = useRef<SVGGElement | null>(null);
  const compareRef = useRef<SVGGElement | null>(null);
  const verdictRef = useRef<SVGGElement | null>(null);
  const reportRef = useRef<SVGGElement | null>(null);

  const beatOf: Record<string, number> = Object.fromEntries(
    STEPS.map((s, i) => [s.label, i]),
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fadeIn = (
        ref: React.RefObject<SVGGElement | null>,
        beat: number,
      ) => {
        if (!ref.current) return;
        tl.add(
          ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
      };

      // ② 插桩标注 + 两条记录一起出现。
      fadeIn(instrumentRef, beatOf.instrument);
      fadeIn(recARef, beatOf.instrument);
      fadeIn(recBRef, beatOf.instrument);
      // ③ 比对连线/问号出现。
      fadeIn(compareRef, beatOf.compare);
      // ④ 判定条。
      fadeIn(verdictRef, beatOf.verdict);
      // ⑤ 报告条。
      fadeIn(reportRef, beatOf.report);

      STEPS.forEach((s, i) => {
        tl.label(s.label, TEACHING_BEAT_MS * (i + 1));
      });
    },
  });

  // 一个访问节点（线程 + 操作）。
  const accessNode = (x: number, color: string, thread: string, op: string) => (
    <g>
      <rect
        x={x}
        y={ACC_Y}
        width={ACC_W}
        height={ACC_H}
        rx="10"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.6"
      />
      <text
        x={x + ACC_W / 2}
        y={ACC_Y + 23}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={color}
      >
        {thread}
      </text>
      <text
        x={x + ACC_W / 2}
        y={ACC_Y + 43}
        textAnchor="middle"
        fontSize="11.5"
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {op}
      </text>
    </g>
  );

  // 一条 TSan 记录卡。
  const recordCard = (
    x: number,
    ref: React.RefObject<SVGGElement | null>,
    color: string,
    title: string,
    line2: string,
    line3: string,
  ) => (
    <g ref={ref} style={{ opacity: 0 }}>
      <rect
        x={x}
        y={REC_Y}
        width={REC_W}
        height={REC_H}
        rx="9"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.6"
      />
      <text
        x={x + 14}
        y={REC_Y + 20}
        fontSize="11"
        fontWeight="700"
        fill={color}
      >
        {title}
      </text>
      <text
        x={x + 14}
        y={REC_Y + 38}
        fontSize="10"
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {line2}
      </text>
      <text x={x + 14} y={REC_Y + 54} fontSize="10" fill={MUTED}>
        {line3}
      </text>
    </g>
  );

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
          aria-label="ThreadSanitizer 如何抓数据竞争动画。顶部左边是线程 A 写变量 x，右边是线程 B 读变量 x，中间是共享变量 x，两者之间没有任何同步。第一步：A 写 x、B 读 x 无锁无原子无 happens-before 边。第二步：TSan 在每次内存访问处插桩，记录哪个线程、读还是写、是否加锁、向量时钟。第三步：把 A 写 x 和 B 读 x 两条记录摆在一起比对，看它们之间有没有 happens-before 关系。第四步：发现两条访问之间没有 happens-before 关系、且至少一个是写，判定为数据竞争。第五步：TSan 报告冲突的两处访问和各自调用栈，定位到代码行。播放时按五步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            ThreadSanitizer：靠 happens-before 分析自动抓数据竞争
          </text>
          <text x="20" y="48" fontSize="11" fill="var(--text-secondary)">
            给后厨装监控——盯着「两人同时碰一份料、却没打招呼」
          </text>

          {/* 中央共享变量 x（先画，置于下层） */}
          <rect
            x={VAR_X}
            y={VAR_Y}
            width={VAR_W}
            height={VAR_H}
            rx="8"
            fill="var(--text-secondary)"
            fillOpacity="0.08"
            stroke="var(--border)"
            strokeWidth="1.6"
          />
          <text
            x={VAR_X + VAR_W / 2}
            y={VAR_Y + VAR_H / 2 + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            x
          </text>
          <text
            x={VAR_X + VAR_W / 2}
            y={VAR_Y - 8}
            textAnchor="middle"
            fontSize="10"
            fill={MUTED}
          >
            共享变量（无保护）
          </text>

          {/* A 写 x、B 读 x 的指向线（静态，常驻） */}
          <line
            x1={A_X + ACC_W}
            y1={ACC_Y + ACC_H}
            x2={VAR_X + 8}
            y2={VAR_Y}
            stroke={A_COLOR}
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          <line
            x1={B_X}
            y1={ACC_Y + ACC_H}
            x2={VAR_X + VAR_W - 8}
            y2={VAR_Y}
            stroke={B_COLOR}
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />

          {/* 两个访问节点 */}
          {accessNode(A_X, A_COLOR, "线程 A", "x = 42;  // 写")}
          {accessNode(B_X, B_COLOR, "线程 B", "int y = x;  // 读")}

          {/* ② TSan 插桩标注（中央变量旁） */}
          <g ref={instrumentRef} style={{ opacity: 0 }}>
            <text
              x={VIEW_W / 2}
              y={VAR_Y + VAR_H + 18}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={TSAN_COLOR}
            >
              TSan 在每次访问处插桩，记录线程 / 读写 / 锁 / 向量时钟
            </text>
          </g>

          {/* ② 两条插桩记录卡 */}
          {recordCard(
            RECA_X,
            recARef,
            A_COLOR,
            "记录①：线程 A · 写 x",
            "lockset = {} · 时钟 VC_A",
            "无持锁",
          )}
          {recordCard(
            RECB_X,
            recBRef,
            B_COLOR,
            "记录②：线程 B · 读 x",
            "lockset = {} · 时钟 VC_B",
            "无持锁",
          )}

          {/* ③ 比对：两记录底部各引一条线汇到中央问号药丸（药丸落在独立一带，不压记录） */}
          <g ref={compareRef} style={{ opacity: 0 }}>
            <line
              x1={RECA_X + REC_W / 2}
              y1={REC_Y + REC_H}
              x2={CMP_X + 6}
              y2={CMP_Y + CMP_H / 2}
              stroke={MUTED}
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <line
              x1={RECB_X + REC_W / 2}
              y1={REC_Y + REC_H}
              x2={CMP_X + CMP_W - 6}
              y2={CMP_Y + CMP_H / 2}
              stroke={MUTED}
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <rect
              x={CMP_X}
              y={CMP_Y}
              width={CMP_W}
              height={CMP_H}
              rx="6"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.2"
            />
            <text
              x={VIEW_W / 2}
              y={CMP_Y + CMP_H / 2 + 4}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill={MUTED}
            >
              两者间有 happens-before？
            </text>
          </g>

          {/* ④ 判定条 */}
          <g ref={verdictRef} style={{ opacity: 0 }}>
            <rect
              x={VERDICT_X}
              y={VERDICT_Y}
              width={VERDICT_W}
              height={VERDICT_H}
              rx="8"
              fill={RACE_COLOR}
              fillOpacity="0.1"
              stroke={RACE_COLOR}
              strokeWidth="1.6"
            />
            <text
              x={VIEW_W / 2}
              y={VERDICT_Y + VERDICT_H / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={RACE_COLOR}
            >
              无 happens-before + 至少一个是写 → 判定：数据竞争 ⚠
            </text>
          </g>

          {/* ⑤ 报告条 */}
          <g ref={reportRef} style={{ opacity: 0 }}>
            <rect
              x={REPORT_X}
              y={REPORT_Y}
              width={REPORT_W}
              height={REPORT_H}
              rx="8"
              fill={TSAN_COLOR}
              fillOpacity="0.07"
              stroke={TSAN_COLOR}
              strokeWidth="1.6"
            />
            <text
              x={REPORT_X + 14}
              y={REPORT_Y + 20}
              fontSize="11"
              fontWeight="700"
              fill={TSAN_COLOR}
            >
              WARNING: ThreadSanitizer: data race
            </text>
            <text
              x={REPORT_X + 14}
              y={REPORT_Y + 38}
              fontSize="10"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              Write of size 4 by thread A · Previous read by thread B
            </text>
            <text
              x={REPORT_X + 14}
              y={REPORT_Y + 56}
              fontSize="10"
              fill={MUTED}
            >
              并打印两处访问各自的调用栈，把你直接带到出问题的代码行
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="A 写、B 读、无同步 → 插桩记录线程/锁/时钟 → 比对有无 happens-before → 无且含写=数据竞争 → 报告冲突两处。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ThreadSanitizer
        不靠运气复现：它在每次内存访问处插桩，记录访问者的线程、锁集和向量时钟，
        再用 happens-before
        关系判断两次访问是否真有先后保证。一旦发现两次访问之间毫无
        happens-before、又至少有一个是写，就判定为数据竞争并报告冲突的两处代码——把「时有时无」的
        bug 变成「每跑必抓」的确定结果。
      </figcaption>
    </figure>
  );
}
