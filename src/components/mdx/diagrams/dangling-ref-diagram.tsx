"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <DanglingRefDiagram>：detach 后悬空引用的「翻车动画」（HEL-230，§7 trap「错误模式」）。
 *
 * 餐厅后厨隐喻：oops() 是主厨临时支起的一张小工作台（栈帧），上面摆着局部变量 local
 * （一块砧板）。主厨喊来帮厨（子线程）并塞给它一张指向这块砧板的便签（std::ref(local)），
 * 然后 detach 放养。可主厨随手把工作台收了（oops 返回、栈帧销毁、砧板没了），帮厨却还
 * 攥着那张便签去够那块已经不存在的砧板——够到的是别人的东西甚至空气：悬空引用，💥。
 *
 * 分步（4 关键帧）：
 *  ① oops() 栈帧里有局部变量 local；
 *  ② std::thread t(func, std::ref(local)); t.detach(); 子线程持引用箭头指向 local；
 *  ③ oops() 返回 → 栈帧销毁、local 红色打叉消失；
 *  ④ 后台子线程仍按那条箭头去读 → 指向已释放内存 💥。
 *
 * 每个 step 点亮对应元素 + caption。label 锚定在「该步元素点亮到最亮」的时刻（lit），
 * 修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），经 mdx-components 注册时 next/dynamic(ssr:false)
 * 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / danger / success / warning / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 600;
const VIEW_H = 360;

// —— 几何：左侧 oops() 栈帧，右侧后台子线程，中间一条引用箭头 ——
const FRAME_X = 28;
const FRAME_Y = 64;
const FRAME_W = 224;
const FRAME_H = 196;

const LOCAL_X = FRAME_X + 28;
const LOCAL_Y = FRAME_Y + 92;
const LOCAL_W = FRAME_W - 56;
const LOCAL_H = 56;

const CHILD_X = 372;
const CHILD_Y = 84;
const CHILD_W = 200;
const CHILD_H = 156;

const STEPS: readonly TeachingStep[] = [
  {
    label: "frame",
    caption:
      "① oops() 被调用：栈上支起它的工作台，里面有局部变量 local（一块砧板）",
  },
  {
    label: "ref",
    caption:
      "② std::thread t(func, std::ref(local)); t.detach();——子线程拿到指向 local 的引用，被放养到后台",
  },
  {
    label: "destroy",
    caption: "③ oops() 返回：它的栈帧连同 local 一起销毁——砧板没了（红叉）",
  },
  {
    label: "crash",
    caption:
      "④ 后台子线程仍按那条引用去读 local → 指向已释放内存💥：悬空引用，未定义行为",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function DanglingRefDiagram() {
  // 各分步要点亮 / 变化的元素引用。
  const frameRef = useRef<SVGGElement | null>(null);
  const refArrowRef = useRef<SVGGElement | null>(null);
  const childRef = useRef<SVGGElement | null>(null);
  const crossRef = useRef<SVGGElement | null>(null); // local 上的红叉（步③出现）
  const localBoxRef = useRef<SVGRectElement | null>(null); // local 高亮层（步①点亮、步③转红）
  const boomRef = useRef<SVGGElement | null>(null); // 💥（步④出现）

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① 栈帧 + local 点亮（beat 0）
      if (frameRef.current) {
        tl.add(
          frameRef.current,
          { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          0,
        );
      }
      if (localBoxRef.current) {
        tl.add(
          localBoxRef.current,
          {
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          0,
        );
      }
      tl.label("frame", TEACHING_BEAT_MS);

      // ② 子线程 + 引用箭头点亮（beat 1）
      if (childRef.current) {
        tl.add(
          childRef.current,
          { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS,
        );
      }
      if (refArrowRef.current) {
        tl.add(
          refArrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS,
        );
      }
      tl.label("ref", TEACHING_BEAT_MS * 2);

      // ③ 栈帧销毁：栈帧整体淡出、local 红叉出现（beat 2）
      if (frameRef.current) {
        tl.add(
          frameRef.current,
          { opacity: [1, 0.25], duration: TEACHING_BEAT_MS, ease: "in(2)" },
          TEACHING_BEAT_MS * 2,
        );
      }
      if (crossRef.current) {
        tl.add(
          crossRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 2,
        );
      }
      tl.label("destroy", TEACHING_BEAT_MS * 3);

      // ④ 子线程仍去读 → 💥（beat 3）
      if (boomRef.current) {
        tl.add(
          boomRef.current,
          {
            opacity: [0, 1],
            scale: [0.6, 1],
            duration: TEACHING_BEAT_MS,
            ease: "out(4)",
          },
          TEACHING_BEAT_MS * 3,
        );
      }
      tl.label("crash", TEACHING_BEAT_MS * 4);
    },
  });

  // 引用箭头：从子线程左缘指向 local 右缘（一条贝塞尔）。
  const arrowStartX = CHILD_X;
  const arrowStartY = CHILD_Y + CHILD_H / 2;
  const arrowEndX = LOCAL_X + LOCAL_W;
  const arrowEndY = LOCAL_Y + LOCAL_H / 2;
  const arrowMidX = (arrowStartX + arrowEndX) / 2;

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
          aria-label="detach 后悬空引用的翻车动画。左侧是函数 oops() 的栈帧，里面有局部变量 local。第一步栈帧与 local 出现。第二步执行 std::thread t(func, std::ref(local)) 后 detach，右侧后台子线程拿到一条指向 local 的引用箭头。第三步 oops() 返回，栈帧连同 local 一起销毁，local 被打上红叉。第四步后台子线程仍按那条引用去读 local，但 local 所在内存已被释放，引发未定义行为，崩溃爆炸。播放时按四步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="drd-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0 L7 3.5 L0 7 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* ===== 左：oops() 栈帧（步③整体淡出表示销毁）===== */}
          <g ref={frameRef} style={{ opacity: 0.2 }}>
            <rect
              x={FRAME_X}
              y={FRAME_Y}
              width={FRAME_W}
              height={FRAME_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.4"
            />
            <text
              x={FRAME_X + FRAME_W / 2}
              y={FRAME_Y + 26}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              oops() 栈帧
            </text>
            <text
              x={FRAME_X + FRAME_W / 2}
              y={FRAME_Y + 46}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              函数一返回就整个销毁
            </text>
          </g>

          {/* local 底框（常驻）+ 高亮层（步①点亮）。高亮层放在 frame 之外，便于独立控制。 */}
          <rect
            x={LOCAL_X}
            y={LOCAL_Y}
            width={LOCAL_W}
            height={LOCAL_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <rect
            ref={localBoxRef}
            x={LOCAL_X}
            y={LOCAL_Y}
            width={LOCAL_W}
            height={LOCAL_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <text
            x={LOCAL_X + LOCAL_W / 2}
            y={LOCAL_Y + 24}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            int local
          </text>
          <text
            x={LOCAL_X + LOCAL_W / 2}
            y={LOCAL_Y + 42}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            局部变量（砧板）
          </text>

          {/* local 上的红叉（步③出现） */}
          <g ref={crossRef} style={{ opacity: 0 }}>
            <line
              x1={LOCAL_X + 8}
              y1={LOCAL_Y + 8}
              x2={LOCAL_X + LOCAL_W - 8}
              y2={LOCAL_Y + LOCAL_H - 8}
              stroke="var(--danger)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={LOCAL_X + LOCAL_W - 8}
              y1={LOCAL_Y + 8}
              x2={LOCAL_X + 8}
              y2={LOCAL_Y + LOCAL_H - 8}
              stroke="var(--danger)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text
              x={LOCAL_X + LOCAL_W / 2}
              y={LOCAL_Y + LOCAL_H + 16}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--danger)"
            >
              已释放
            </text>
          </g>

          {/* ===== 中：引用箭头（步②出现，从子线程指向 local）===== */}
          <g ref={refArrowRef} style={{ opacity: 0 }}>
            <path
              d={`M ${arrowStartX} ${arrowStartY} C ${arrowMidX} ${arrowStartY}, ${arrowMidX} ${arrowEndY}, ${arrowEndX + 6} ${arrowEndY}`}
              fill="none"
              stroke="var(--danger)"
              strokeWidth="2"
              markerEnd="url(#drd-arrow)"
            />
            <text
              x={arrowMidX}
              y={(arrowStartY + arrowEndY) / 2 - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fontFamily="var(--font-mono)"
              fill="var(--danger)"
            >
              std::ref(local)
            </text>
          </g>

          {/* ===== 右：后台子线程（步②点亮）===== */}
          <g ref={childRef} style={{ opacity: 0.2 }}>
            <rect
              x={CHILD_X}
              y={CHILD_Y}
              width={CHILD_W}
              height={CHILD_H}
              rx="10"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={CHILD_X + CHILD_W / 2}
              y={CHILD_Y + 26}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--success)"
            >
              后台子线程
            </text>
            <text
              x={CHILD_X + CHILD_W / 2}
              y={CHILD_Y + 46}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              detach 后独立跑
            </text>
            <text
              x={CHILD_X + CHILD_W / 2}
              y={CHILD_Y + 76}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              func(local)
            </text>
            <text
              x={CHILD_X + CHILD_W / 2}
              y={CHILD_Y + 96}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              持有指向 local 的引用
            </text>
          </g>

          {/* 💥（步④出现，盖在引用箭头终点附近） */}
          <g ref={boomRef} style={{ opacity: 0 }}>
            <text
              x={arrowEndX - LOCAL_W / 2}
              y={LOCAL_Y - 16}
              textAnchor="middle"
              fontSize="26"
            >
              💥
            </text>
            <text
              x={arrowEndX - LOCAL_W / 2}
              y={LOCAL_Y - 40}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--danger)"
            >
              读已释放内存：未定义行为
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="detach 后子线程还攥着指向局部变量的引用，可那块栈内存随函数返回已被销毁——悬空引用。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        detach
        的子线程可能比创建它的函数活得更久。若它还持有指向那个函数局部变量的引用，
        函数一返回，引用就悬空——再去读写就是访问已释放内存的未定义行为。
      </figcaption>
    </figure>
  );
}
