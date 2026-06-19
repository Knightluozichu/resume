"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CoroutineFrameTimeline>：协程「在帧之间暂停、之后从断点恢复」的可控教学动画（HEL-283）。
 *
 * 本章最难的概念——一个普通函数一旦进去就一口气跑完；而协程能在 `yield return` 处
 * 「就地暂停」，把控制权交还引擎，等条件满足（这里是等 1 秒 ≈ 若干帧）后，再
 * **从断点那一行**继续往下跑。本图把这件事掰碎成 5 步演给读者：
 *  ① 第 N 帧：协程被 StartCoroutine 启动，函数体从第 1 行开始跑（高亮推进到第 1 行）。
 *  ② 第 N 帧：跑到第 2 行 `yield return new WaitForSeconds(1)`——就地暂停（断点高亮、挂起标）。
 *  ③ 第 N+1…N+k 帧：协程「挂起中」——这些帧里函数体一行都不跑，引擎照常画别的帧（等待条淡入）。
 *  ④ 1 秒到了的那一帧：协程**从断点的下一行**（第 3 行）继续，而不是从头重来（恢复箭头 + 第 3 行高亮）。
 *  ⑤ 同帧继续跑完第 4 行，协程结束。
 *
 * 上半部是连续帧轴（Frame N, N+1, …），下半部是协程函数体的 4 行代码；一个「执行指针」高亮
 * 当前正在跑的那一行，配合帧轴上方的「当前帧」高亮，让读者看清：暂停期间帧在走、代码不动；
 * 恢复时代码从断点续，不是从头。
 *
 * 每步用 anime.js timeline 控制各行高亮 / 挂起标 / 等待条 / 恢复箭头的可见性。
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；帧格与代码行互不重叠。
 */

const VIEW_W = 700;
const VIEW_H = 462;

// ===== 上半：连续帧轴 =====
const FRAME_Y = 92;
const FRAME_H = 56;
const FRAME_X0 = 30;
const FRAME_COUNT = 5; // Frame N, N+1, N+2, N+3, N+4
const FRAME_GAP = 10;
const FRAME_W =
  (VIEW_W - 2 * FRAME_X0 - (FRAME_COUNT - 1) * FRAME_GAP) / FRAME_COUNT;
const frameX = (i: number) => FRAME_X0 + i * (FRAME_W + FRAME_GAP);
const frameCX = (i: number) => frameX(i) + FRAME_W / 2;
const FRAME_LABELS = ["Frame N", "N+1", "N+2", "N+3", "N+k"];

// ===== 下半：协程函数体 4 行代码 =====
const CODE_X = 30;
const CODE_W = VIEW_W - 2 * CODE_X;
const CODE_Y = 224;
const LINE_H = 38;
const LINE_GAP = 6;
const lineY = (i: number) => CODE_Y + 30 + i * (LINE_H + LINE_GAP);

type CodeLine = { text: string; note: string };
const CODE_LINES: readonly CodeLine[] = [
  { text: 'Debug.Log("开始");', note: "第 1 行：进来先跑这句" },
  {
    text: "yield return new WaitForSeconds(1);",
    note: "第 2 行：就地暂停 1 秒（交还控制权）",
  },
  {
    text: 'Debug.Log("1 秒后");',
    note: "第 3 行：恢复后从这里续跑（不是从头）",
  },
  { text: 'Debug.Log("结束");', note: "第 4 行：跑完，协程结束" },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "start",
    caption:
      "① 第 N 帧：StartCoroutine 启动协程，函数体从第 1 行开始跑，打印「开始」",
  },
  {
    label: "suspend",
    caption:
      "② 还在第 N 帧：跑到 yield return WaitForSeconds(1) —— 协程「就地暂停」，把控制权交还引擎",
  },
  {
    label: "waiting",
    caption:
      "③ 第 N+1…N+k 帧：协程挂起中，这些帧函数体一行都不跑；引擎照常画别的帧（协程不阻塞）",
  },
  {
    label: "resume",
    caption:
      "④ 1 秒到了的那一帧：协程从「断点的下一行」第 3 行继续——不是从头重来",
  },
  {
    label: "done",
    caption:
      "⑤ 同帧接着跑完第 4 行，协程结束。一件事被分散到多帧、按时间排好了顺序",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function CoroutineFrameTimeline() {
  // 帧高亮（当前帧框）：N / 等待段(N+1..) / 恢复帧(N+k)
  const frameNGlowRef = useRef<SVGRectElement | null>(null);
  const frameWaitGlowRef = useRef<SVGGElement | null>(null);
  const frameResumeGlowRef = useRef<SVGRectElement | null>(null);

  // 代码行高亮
  const line1GlowRef = useRef<SVGRectElement | null>(null);
  const line2GlowRef = useRef<SVGRectElement | null>(null);
  const line3GlowRef = useRef<SVGRectElement | null>(null);
  const line4GlowRef = useRef<SVGRectElement | null>(null);

  // 挂起标 / 等待条 / 恢复箭头
  const suspendMarkRef = useRef<SVGGElement | null>(null);
  const waitBarRef = useRef<SVGGElement | null>(null);
  const resumeArrowRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：第 N 帧高亮 + 第 1 行高亮（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (frameNGlowRef.current) {
        tl.add(
          frameNGlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      if (line1GlowRef.current) {
        tl.add(
          line1GlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s0,
        );
      }
      tl.label("start", TEACHING_BEAT_MS * 1);

      // 步②：还在第 N 帧——第 1 行淡出焦点、第 2 行高亮 + 挂起标淡入（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (line1GlowRef.current) {
        tl.add(
          line1GlowRef.current,
          { opacity: [1, 0.25], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s1,
        );
      }
      if (line2GlowRef.current) {
        tl.add(
          line2GlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (suspendMarkRef.current) {
        tl.add(
          suspendMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("suspend", TEACHING_BEAT_MS * 2);

      // 步③：挂起中——第 N 帧高亮淡出、等待帧段高亮 + 等待条淡入（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (frameNGlowRef.current) {
        tl.add(
          frameNGlowRef.current,
          { opacity: [1, 0.2], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s2,
        );
      }
      if (frameWaitGlowRef.current) {
        tl.add(
          frameWaitGlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (waitBarRef.current) {
        tl.add(
          waitBarRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("waiting", TEACHING_BEAT_MS * 3);

      // 步④：恢复——等待段淡出、恢复帧高亮 + 恢复箭头 + 第 3 行高亮（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (frameWaitGlowRef.current) {
        tl.add(
          frameWaitGlowRef.current,
          { opacity: [1, 0.2], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s3,
        );
      }
      if (suspendMarkRef.current) {
        tl.add(
          suspendMarkRef.current,
          { opacity: [1, 0.2], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s3,
        );
      }
      if (line2GlowRef.current) {
        tl.add(
          line2GlowRef.current,
          { opacity: [1, 0.25], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s3,
        );
      }
      if (frameResumeGlowRef.current) {
        tl.add(
          frameResumeGlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      if (resumeArrowRef.current) {
        tl.add(
          resumeArrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      if (line3GlowRef.current) {
        tl.add(
          line3GlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      tl.label("resume", TEACHING_BEAT_MS * 4);

      // 步⑤：同帧跑完第 4 行——第 3 行淡出焦点、第 4 行高亮（start = BEAT*4）。
      const s4 = TEACHING_BEAT_MS * 4;
      if (line3GlowRef.current) {
        tl.add(
          line3GlowRef.current,
          { opacity: [1, 0.25], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s4,
        );
      }
      if (line4GlowRef.current) {
        tl.add(
          line4GlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s4,
        );
      }
      tl.label("done", TEACHING_BEAT_MS * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="协程在帧之间暂停、之后从断点恢复的动画。上半部是一条连续的帧轴，从左到右是第 N 帧、N+1、N+2、N+3、到第 N+k 帧。下半部是一个协程函数体的四行代码：第一行打印开始，第二行是 yield return new WaitForSeconds(1) 也就是就地暂停一秒，第三行打印一秒后，第四行打印结束。动画分五步。第一步在第 N 帧里协程被 StartCoroutine 启动，执行指针落到第一行，打印开始。第二步还在第 N 帧，执行推进到第二行 yield return WaitForSeconds(1)，协程就地暂停，把控制权交还引擎，挂起标点亮。第三步是第 N+1 到 N+k 帧，协程一直挂起，这几帧函数体一行都不跑，引擎照常绘制别的帧，所以协程不会阻塞画面，一条等待条横跨这些帧。第四步是一秒到了的那一帧，协程从断点的下一行也就是第三行继续，而不是从函数头重新开始，一条恢复箭头从挂起处指向第三行。第五步在同一帧里接着跑完第四行，协程结束，一件事就这样被分散到多帧、按时间排好了顺序。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={30}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            协程：在 yield 处暂停，等到时候从「断点」继续
          </text>
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            上轨 = 一帧帧的时间轴；下轨 =
            协程函数体。暂停时帧在走、代码不动；恢复时从断点续
          </text>

          {/* ===== 帧轴小标题 ===== */}
          <text
            x={FRAME_X0}
            y={FRAME_Y - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            时间轴（一格 = 一帧）→
          </text>

          {/* ===== 帧格 ===== */}
          {FRAME_LABELS.map((label, i) => (
            <g key={label}>
              <rect
                x={frameX(i)}
                y={FRAME_Y}
                width={FRAME_W}
                height={FRAME_H}
                rx="7"
                fill="var(--text-secondary)"
                fillOpacity="0.06"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={frameCX(i)}
                y={FRAME_Y + FRAME_H / 2 + 4}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                {label}
              </text>
            </g>
          ))}

          {/* ===== 第 N 帧高亮（步①②：协程在这帧启动并暂停） ===== */}
          <rect
            ref={frameNGlowRef}
            x={frameX(0)}
            y={FRAME_Y}
            width={FRAME_W}
            height={FRAME_H}
            rx="7"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0"
          />

          {/* ===== 等待帧段高亮（步③：N+1..N+k 协程挂起，引擎照画别的帧） ===== */}
          <g ref={frameWaitGlowRef} opacity="0">
            {[1, 2, 3].map((i) => (
              <rect
                key={i}
                x={frameX(i)}
                y={FRAME_Y}
                width={FRAME_W}
                height={FRAME_H}
                rx="7"
                fill="var(--warning)"
                fillOpacity="0.14"
                stroke="var(--warning)"
                strokeWidth="1.8"
              />
            ))}
          </g>

          {/* ===== 恢复帧高亮（步④：N+k，1 秒到了协程恢复） ===== */}
          <rect
            ref={frameResumeGlowRef}
            x={frameX(4)}
            y={FRAME_Y}
            width={FRAME_W}
            height={FRAME_H}
            rx="7"
            fill="var(--success)"
            fillOpacity="0.16"
            stroke="var(--success)"
            strokeWidth="2"
            opacity="0"
          />

          {/* ===== 等待条：横跨 N+1..N+k，标「挂起中 · 约 1 秒 ≈ 若干帧」 ===== */}
          <g ref={waitBarRef} opacity="0">
            <line
              x1={frameCX(1)}
              y1={FRAME_Y + FRAME_H + 18}
              x2={frameCX(4)}
              y2={FRAME_Y + FRAME_H + 18}
              stroke="var(--warning)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text
              x={(frameCX(1) + frameCX(4)) / 2}
              y={FRAME_Y + FRAME_H + 36}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="600"
              fill="var(--warning)"
            >
              协程挂起中 · 等约 1 秒 ≈ 若干帧（这些帧里代码不跑）
            </text>
          </g>

          {/* ===== 下半：协程函数体框 ===== */}
          <rect
            x={CODE_X}
            y={CODE_Y}
            width={CODE_W}
            height={30 + 4 * (LINE_H + LINE_GAP) + 6}
            rx="10"
            fill="var(--code-bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={CODE_X + 14}
            y={CODE_Y + 20}
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            IEnumerator Demo() {"{"} … 协程函数体 …
          </text>

          {/* ===== 4 行代码 + 各自的高亮覆层 ===== */}
          {CODE_LINES.map((ln, i) => (
            <g key={i}>
              <text
                x={CODE_X + 24}
                y={lineY(i) + LINE_H / 2 - 2}
                fontSize="11.5"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {ln.text}
              </text>
              <text
                x={CODE_X + 24}
                y={lineY(i) + LINE_H / 2 + 14}
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {ln.note}
              </text>
            </g>
          ))}

          {/* 第 1 行高亮（accent） */}
          <rect
            ref={line1GlowRef}
            x={CODE_X + 12}
            y={lineY(0)}
            width={CODE_W - 24}
            height={LINE_H}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="1.6"
            opacity="0"
          />
          {/* 第 2 行高亮（warning：暂停处） */}
          <rect
            ref={line2GlowRef}
            x={CODE_X + 12}
            y={lineY(1)}
            width={CODE_W - 24}
            height={LINE_H}
            rx="6"
            fill="var(--warning)"
            fillOpacity="0.14"
            stroke="var(--warning)"
            strokeWidth="1.6"
            opacity="0"
          />
          {/* 第 3 行高亮（success：恢复处） */}
          <rect
            ref={line3GlowRef}
            x={CODE_X + 12}
            y={lineY(2)}
            width={CODE_W - 24}
            height={LINE_H}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.6"
            opacity="0"
          />
          {/* 第 4 行高亮（success） */}
          <rect
            ref={line4GlowRef}
            x={CODE_X + 12}
            y={lineY(3)}
            width={CODE_W - 24}
            height={LINE_H}
            rx="6"
            fill="var(--success)"
            fillOpacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.6"
            opacity="0"
          />

          {/* ===== 挂起标：贴在第 2 行右端，提示「就地暂停」 ===== */}
          <g ref={suspendMarkRef} opacity="0">
            <rect
              x={CODE_X + CODE_W - 156}
              y={lineY(1) + 4}
              width={132}
              height={LINE_H - 8}
              rx="6"
              fill="var(--warning)"
              fillOpacity="0.22"
              stroke="var(--warning)"
              strokeWidth="1.4"
            />
            <text
              x={CODE_X + CODE_W - 90}
              y={lineY(1) + LINE_H / 2 + 3}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--warning)"
            >
              ⏸ 在此暂停
            </text>
          </g>

          {/* ===== 恢复箭头：从暂停帧 N+k 向下指向第 3 行（断点的下一行） ===== */}
          <g ref={resumeArrowRef} opacity="0">
            <path
              d={`M ${frameCX(4)} ${FRAME_Y + FRAME_H + 6} C ${frameCX(4)} ${lineY(2) - 30}, ${CODE_X + CODE_W - 60} ${lineY(2) - 24}, ${CODE_X + CODE_W - 30} ${lineY(2) + LINE_H / 2}`}
              fill="none"
              stroke="var(--success)"
              strokeWidth="2"
              markerEnd="url(#cft-resume-arrow)"
            />
            <text
              x={frameCX(4)}
              y={lineY(2) - 34}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="var(--success)"
            >
              从断点续
            </text>
          </g>

          <defs>
            <marker
              id="cft-resume-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：协程在第 2 行 yield 暂停的那 1 秒里，引擎是「干等着」、还是照常去画别的帧？单步走第③步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        协程能在 yield return
        处「就地暂停」、把控制权交还引擎；等条件满足（这里等 1 秒）后，
        从「断点的下一行」继续往下跑——而不是从函数头重来。暂停期间它不阻塞，引擎照常画别的帧。
      </figcaption>
    </figure>
  );
}
