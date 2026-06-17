"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ButtonClickFlowDiagram>：辅图——「点击 Button → onClick → 注册的方法 → 代码改 UI」（HEL-287）。
 *
 * 一条因果链，把「事件接线 + 代码改 UI」串起来：
 *  ① 用户点击 Button（光标点一下）。
 *  ② 触发 Button 的 onClick 事件。
 *  ③ 之前用 AddListener(OnClick) 注册的 OnClick 方法被调用。
 *  ④ 方法里 scoreText.text = ... 更新某个 UI（这里：点击计数 +1，Text 从 0 变 1）。
 *
 * 动画分 4 步（lit = BEAT*(i+1)）：依次点亮 Button → onClick → 方法块 → Text 计数变化。
 *
 * 光标用 translate/opacity 点一下；各节点 opacity 渐入点亮；计数 Text 内容用两个叠放文本
 * 交叉淡入淡出表达「0 → 1」。所有坐标整数常量（无 Math 浮点算坐标）。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；四个节点横向排开互不重叠。
 */

const VIEW_W = 736;
// VIEW_H=308：底部说明基线 286、bbox 底 ~289，距底边 ~19px（≥14）。纵向利用率 ~85%。
const VIEW_H = 308;

// 四个节点（横向链），整数坐标。
const NODE_W = 150;
const NODE_H = 96;
const NODE_Y = 108;
const N1_X = 24; // ① Button
const N2_X = 220; // ② onClick
const N3_X = 416; // ③ OnClick 方法
const N4_X = 562; // ④ Text 更新（稍宽到右边缘内）
const N4_W = 150;
const NODE_CY = NODE_Y + NODE_H / 2; // 156

const N1_CX = N1_X + NODE_W / 2; // 99
const N2_CX = N2_X + NODE_W / 2; // 295
const N3_CX = N3_X + NODE_W / 2; // 491
const N4_CX = N4_X + N4_W / 2; // 637

const STEPS: readonly TeachingStep[] = [
  {
    label: "click",
    caption: "① 用户点了一下 Button——按钮被按下",
  },
  {
    label: "onclick",
    caption: "② 这一点触发了 Button 的 onClick 事件（按钮自带的「点击事件」）",
  },
  {
    label: "invoke",
    caption:
      "③ 之前用 button.onClick.AddListener(OnClick) 注册过的 OnClick 方法，被自动调用",
  },
  {
    label: "update",
    caption:
      "④ OnClick 方法里写 scoreText.text = …：计数 +1，Text 从「0」变成「1」——UI 被代码更新了",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ButtonClickFlowDiagram() {
  const cursorRef = useRef<SVGGElement | null>(null);
  const btnRef = useRef<SVGRectElement | null>(null);
  const onclickRef = useRef<SVGGElement | null>(null);
  const methodRef = useRef<SVGGElement | null>(null);
  // Text 计数：两个叠放文本「0」「1」交叉淡入淡出。
  const count0Ref = useRef<SVGTextElement | null>(null);
  const count1Ref = useRef<SVGTextElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：光标落到 Button 上「点一下」+ Button 高亮（start = BEAT*0）。
      const s0 = TEACHING_BEAT_MS * 0;
      if (cursorRef.current) {
        tl.add(
          cursorRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s0,
        );
      }
      if (btnRef.current) {
        tl.add(
          btnRef.current,
          {
            fillOpacity: [0.1, 0.3],
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s0,
        );
      }
      tl.label("click", TEACHING_BEAT_MS * 1);

      // 步②：onClick 节点点亮（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (onclickRef.current) {
        tl.add(
          onclickRef.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("onclick", TEACHING_BEAT_MS * 2);

      // 步③：OnClick 方法块点亮（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (methodRef.current) {
        tl.add(
          methodRef.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("invoke", TEACHING_BEAT_MS * 3);

      // 步④：Text 计数 0 → 1（两个叠放文本交叉淡入淡出）（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (count0Ref.current) {
        tl.add(
          count0Ref.current,
          { opacity: [1, 0], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3,
        );
      }
      if (count1Ref.current) {
        tl.add(
          count1Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3,
        );
      }
      tl.label("update", TEACHING_BEAT_MS * 4);
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
          aria-label="按钮点击事件流的因果链动画，横向四个节点。第一个节点是 Button 按钮，第二个是 onClick 事件，第三个是用 AddListener 注册的 OnClick 方法，第四个是被更新的 Text 文本，显示点击计数。动画分四步：用户点一下 Button，按钮高亮；这一点触发 Button 的 onClick 事件；之前用 button.onClick.AddListener 注册过的 OnClick 方法被自动调用；OnClick 方法里执行 scoreText.text 赋值，让 Text 的计数从 0 变成 1。核心是点击按钮会触发 onClick 事件，事件调用你提前注册的方法，方法里用代码更新某个 UI 元素。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            点击 Button → onClick 事件 → 注册的方法 → 代码改 UI
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            「事件接线 + 代码改 UI」的完整因果链
          </text>

          {/* ===== 节点间因果箭头（先画，框盖线头）===== */}
          <line
            x1={N1_X + NODE_W}
            y1={NODE_CY}
            x2={N2_X}
            y2={NODE_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#bc-arrow)"
          />
          <line
            x1={N2_X + NODE_W}
            y1={NODE_CY}
            x2={N3_X}
            y2={NODE_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#bc-arrow)"
          />
          <line
            x1={N3_X + NODE_W}
            y1={NODE_CY}
            x2={N4_X}
            y2={NODE_CY}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#bc-arrow-accent)"
          />

          {/* ===== ① Button ===== */}
          <rect
            ref={btnRef}
            x={N1_X}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={N1_CX}
            y={NODE_Y + 30}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Button
          </text>
          <text
            x={N1_CX}
            y={NODE_Y + 52}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            ① 用户点一下
          </text>
          {/* 光标（点击手势），初始隐藏，步①淡入 */}
          <g ref={cursorRef} opacity="0">
            <text
              x={N1_CX + 18}
              y={NODE_Y + 78}
              textAnchor="middle"
              fontSize="20"
            >
              👆
            </text>
          </g>

          {/* ===== ② onClick 事件 ===== */}
          <g ref={onclickRef} opacity="0.3">
            <rect
              x={N2_X}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <text
              x={N2_CX}
              y={NODE_Y + 30}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              onClick
            </text>
            <text
              x={N2_CX}
              y={NODE_Y + 52}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              ② 触发点击事件
            </text>
            <text
              x={N2_CX}
              y={NODE_Y + 70}
              textAnchor="middle"
              fontSize="8"
              fill="var(--text-secondary)"
            >
              按钮自带的事件
            </text>
          </g>

          {/* ===== ③ OnClick 方法（AddListener 注册的） ===== */}
          <g ref={methodRef} opacity="0.3">
            <rect
              x={N3_X}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <text
              x={N3_CX}
              y={NODE_Y + 30}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              OnClick()
            </text>
            <text
              x={N3_CX}
              y={NODE_Y + 52}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              ③ 注册的方法被调用
            </text>
            <text
              x={N3_CX}
              y={NODE_Y + 70}
              textAnchor="middle"
              fontSize="8"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              AddListener 接的线
            </text>
          </g>

          {/* ===== ④ Text 更新（计数 0 → 1） ===== */}
          <rect
            x={N4_X}
            y={NODE_Y}
            width={N4_W}
            height={NODE_H}
            rx="10"
            fill="var(--success)"
            fillOpacity="0.08"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x={N4_CX}
            y={NODE_Y + 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
          >
            Text 更新
          </text>
          <text
            x={N4_CX}
            y={NODE_Y + 46}
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            ④ scoreText.text = …
          </text>
          {/* 计数显示：0 / 1 叠放交叉淡入淡出 */}
          <text
            ref={count0Ref}
            x={N4_CX}
            y={NODE_Y + 80}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
            opacity="1"
          >
            0
          </text>
          <text
            ref={count1Ref}
            x={N4_CX}
            y={NODE_Y + 80}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--success)"
            opacity="0"
          >
            1
          </text>

          {/* ===== 底部一句话点题 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 22}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            提前用 AddListener「接好线」，之后每次点击都会自动跑你的方法去改 UI
          </text>

          <defs>
            <marker
              id="bc-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="bc-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：你点一下按钮，是它「自己知道」要去改 Text，还是你提前用 AddListener 把方法「接」上去、点击才触发它？单步走一遍看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `Button` 自带一个 `onClick` 事件。你提前用
        `button.onClick.AddListener(OnClick)`
        把自己的方法「接」上去；之后每次点击就触发 `onClick`、自动调用 `OnClick`
        方法，方法里用 `scoreText.text = …` 之类的代码更新 UI（如点击计数
        +1）。**接线一次、点击多次**——这就是 UI 事件的基本玩法。
      </figcaption>
    </figure>
  );
}
