"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <RenderingInputsDiagram>：主图（示意 / 流程，轻 anime）——「一帧画面 = 网格 × 材质 × 光照」（HEL-288）。
 *
 * 三个输入并排（左列竖排）→ 汇入中间的 Renderer → 输出右侧成品画面（屏幕像素）：
 *  ① Mesh（网格 / 形状轮廓）——决定「长什么形状」。
 *  ② Material（材质 / 外观，标 Shader + 参数）——决定「表面什么质感、什么颜色」。
 *  ③ Light（光照）——决定「被什么灯照、明暗如何」。
 *  → Renderer（渲染器）把三者合起来算 → 屏幕像素（成品画面）。
 *
 * 动画分 4 步（lit = BEAT*(i+1)）：三个输入依次点亮（Mesh → Material → Light），
 * 再点亮 Renderer 与输出画面（汇流）。各节点 opacity 渐入；汇流箭头随 Renderer 点亮。
 *
 * 所有坐标整数常量（无 Math 浮点算坐标）。视觉全部 DESIGN token、无裸 hex；
 * 时长走 TEACHING_BEAT_MS（硬规则 5）。所有 <text> 距 viewBox 任意边 ≥20px。
 */

const VIEW_W = 736;
// VIEW_H=372：底部说明基线 348、bbox 底 ~351，距底边 ~21px（≥20）。纵向利用率 ~88%。
const VIEW_H = 372;

// ── 左列三个输入（竖排），整数坐标 ──
const IN_X = 28;
const IN_W = 196;
const IN_H = 74;
const IN_Y0 = 70; // 第一个输入 y
const IN_DY = 92; // 行距（3 个：70 / 162 / 254）

const IN1_Y = IN_Y0; // Mesh
const IN2_Y = IN_Y0 + IN_DY; // Material
const IN3_Y = IN_Y0 + 2 * IN_DY; // Light

// ── 中间 Renderer ──
const REND_X = 322;
const REND_W = 152;
const REND_H = 116;
const REND_Y = 132; // 竖向居中对齐三输入区
const REND_CX = REND_X + REND_W / 2; // 398
const REND_CY = REND_Y + REND_H / 2; // 190

// ── 右侧输出画面（屏幕像素 / 成品） ──
const OUT_X = 560;
const OUT_W = 148;
const OUT_H = 120;
const OUT_Y = 130;
const OUT_CX = OUT_X + OUT_W / 2; // 634
const OUT_CY = OUT_Y + OUT_H / 2; // 190
// 输出框内副标题基线（OUT_Y + 116 = 246，距框底 250 仍在框内）。
const OUT_SUB_Y = OUT_Y + 116;

const STEPS: readonly TeachingStep[] = [
  {
    label: "mesh",
    caption: "① Mesh（网格）——决定这个东西「长什么形状」：一团点连成的骨架轮廓",
  },
  {
    label: "material",
    caption:
      "② Material（材质）——给表面「刷什么漆 / 什么质感」：颜色、贴图、是不是金属、光不光滑（它内部用一个 Shader）",
  },
  {
    label: "light",
    caption:
      "③ Light（光照）——给场景「打什么灯」：没灯再好的材质也黑乎乎，灯决定明暗",
  },
  {
    label: "render",
    caption:
      "④ Renderer（渲染器）把「形状 + 质感 + 灯光」三者合起来一算，输出屏幕上一帧成品画面（每个像素的颜色）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function RenderingInputsDiagram() {
  const meshRef = useRef<SVGGElement | null>(null);
  const matRef = useRef<SVGGElement | null>(null);
  const lightRef = useRef<SVGGElement | null>(null);
  const rendRef = useRef<SVGGElement | null>(null);
  const outRef = useRef<SVGGElement | null>(null);
  const flowRef = useRef<SVGGElement | null>(null); // 汇流箭头组（三输入→Renderer + Renderer→输出）

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：Mesh 点亮（start = BEAT*0）。
      if (meshRef.current) {
        tl.add(
          meshRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 0,
        );
      }
      tl.label("mesh", TEACHING_BEAT_MS * 1);

      // 步②：Material 点亮（start = BEAT*1）。
      if (matRef.current) {
        tl.add(
          matRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 1,
        );
      }
      tl.label("material", TEACHING_BEAT_MS * 2);

      // 步③：Light 点亮（start = BEAT*2）。
      if (lightRef.current) {
        tl.add(
          lightRef.current,
          { opacity: [0.25, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * 2,
        );
      }
      tl.label("light", TEACHING_BEAT_MS * 3);

      // 步④：汇流箭头 + Renderer + 输出画面一起点亮（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (flowRef.current) {
        tl.add(
          flowRef.current,
          { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3,
        );
      }
      if (rendRef.current) {
        tl.add(
          rendRef.current,
          { opacity: [0.3, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      if (outRef.current) {
        tl.add(
          outRef.current,
          { opacity: [0.2, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3 + TEACHING_BEAT_MS / 2,
        );
      }
      tl.label("render", TEACHING_BEAT_MS * 4);
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
          aria-label="一帧画面是怎么来的示意图。左侧竖排三个输入：第一个 Mesh 网格，决定东西长什么形状；第二个 Material 材质，决定表面什么质感什么颜色，它内部用一个 Shader 加上一组参数；第三个 Light 光照，决定打什么灯、明暗如何。三个输入用箭头汇入中间的 Renderer 渲染器，渲染器把形状、质感、灯光三者合起来计算，输出右侧一帧成品画面，也就是屏幕上每个像素的颜色。核心是：屏幕上看到的画面等于网格乘以材质乘以光照，三者缺一不可，由渲染器算成最终像素。动画分四步依次点亮三个输入再汇入渲染器输出画面，可播放、暂停、单步、拖动进度。"
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
            一帧画面 = 网格（形状） × 材质（外观） × 光照（照明）
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            三个输入汇进渲染器，算出屏幕上每个像素的颜色
          </text>

          {/* ===== 汇流箭头组（先画，节点框盖线头）===== */}
          <g ref={flowRef} opacity="0.2">
            {/* 三个输入 → Renderer 左边 */}
            <path
              d={`M ${IN_X + IN_W} ${IN1_Y + IN_H / 2} C ${IN_X + IN_W + 50} ${IN1_Y + IN_H / 2}, ${REND_X - 50} ${REND_CY}, ${REND_X} ${REND_CY}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              markerEnd="url(#ri-arrow)"
            />
            <line
              x1={IN_X + IN_W}
              y1={IN2_Y + IN_H / 2}
              x2={REND_X}
              y2={REND_CY}
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              markerEnd="url(#ri-arrow)"
            />
            <path
              d={`M ${IN_X + IN_W} ${IN3_Y + IN_H / 2} C ${IN_X + IN_W + 50} ${IN3_Y + IN_H / 2}, ${REND_X - 50} ${REND_CY}, ${REND_X} ${REND_CY}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.8"
              markerEnd="url(#ri-arrow)"
            />
            {/* Renderer → 输出画面 */}
            <line
              x1={REND_X + REND_W}
              y1={REND_CY}
              x2={OUT_X}
              y2={OUT_CY}
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#ri-arrow-accent)"
            />
          </g>

          {/* ============ 左列：① Mesh ============ */}
          <g ref={meshRef} opacity="0.25">
            <rect
              x={IN_X}
              y={IN1_Y}
              width={IN_W}
              height={IN_H}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.1"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={IN_X + 16}
              y={IN1_Y + 26}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--accent)"
            >
              ① Mesh 网格
            </text>
            <text
              x={IN_X + 16}
              y={IN1_Y + 46}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              形状轮廓（点连成的骨架）
            </text>
            <text
              x={IN_X + 16}
              y={IN1_Y + 62}
              textAnchor="start"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              决定「长什么样」
            </text>
            {/* 形状小图标：线框三角面 */}
            <path
              d={`M ${IN_X + IN_W - 38} ${IN1_Y + 18} L ${IN_X + IN_W - 14} ${IN1_Y + 30} L ${IN_X + IN_W - 26} ${IN1_Y + 54} Z`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
            />
          </g>

          {/* ============ 左列：② Material ============ */}
          <g ref={matRef} opacity="0.25">
            <rect
              x={IN_X}
              y={IN2_Y}
              width={IN_W}
              height={IN_H}
              rx="10"
              fill="var(--success)"
              fillOpacity="0.08"
              stroke="var(--success)"
              strokeWidth="2"
            />
            <text
              x={IN_X + 16}
              y={IN2_Y + 26}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--success)"
            >
              ② Material 材质
            </text>
            <text
              x={IN_X + 16}
              y={IN2_Y + 46}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              外观 = Shader + 一组参数
            </text>
            <text
              x={IN_X + 16}
              y={IN2_Y + 62}
              textAnchor="start"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              颜色 / 贴图 / 金属 / 光滑
            </text>
            {/* 质感小图标：填色球 */}
            <circle
              cx={IN_X + IN_W - 26}
              cy={IN2_Y + 36}
              r="13"
              fill="var(--success)"
              fillOpacity="0.35"
              stroke="var(--success)"
              strokeWidth="1.4"
            />
          </g>

          {/* ============ 左列：③ Light ============ */}
          <g ref={lightRef} opacity="0.25">
            <rect
              x={IN_X}
              y={IN3_Y}
              width={IN_W}
              height={IN_H}
              rx="10"
              fill="var(--warning)"
              fillOpacity="0.08"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            <text
              x={IN_X + 16}
              y={IN3_Y + 26}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--warning)"
            >
              ③ Light 光照
            </text>
            <text
              x={IN_X + 16}
              y={IN3_Y + 46}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              给场景打的灯
            </text>
            <text
              x={IN_X + 16}
              y={IN3_Y + 62}
              textAnchor="start"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              决定明暗，没灯就全黑
            </text>
            {/* 灯小图标：太阳 */}
            <text
              x={IN_X + IN_W - 26}
              y={IN3_Y + 42}
              textAnchor="middle"
              fontSize="22"
            >
              ☀
            </text>
          </g>

          {/* ============ 中间：Renderer ============ */}
          <g ref={rendRef} opacity="0.3">
            <rect
              x={REND_X}
              y={REND_Y}
              width={REND_W}
              height={REND_H}
              rx="12"
              fill="var(--bg)"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
            <text
              x={REND_CX}
              y={REND_Y + 36}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              Renderer
            </text>
            <text
              x={REND_CX}
              y={REND_Y + 56}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              渲染器
            </text>
            <text
              x={REND_CX}
              y={REND_Y + 80}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              把三者合起来
            </text>
            <text
              x={REND_CX}
              y={REND_Y + 96}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              算成像素
            </text>
          </g>

          {/* ============ 右侧：输出画面（屏幕像素） ============ */}
          <g ref={outRef} opacity="0.2">
            <rect
              x={OUT_X}
              y={OUT_Y}
              width={OUT_W}
              height={OUT_H}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            {/* 成品画面：打了光的球 */}
            <circle
              cx={OUT_CX}
              cy={OUT_Y + 52}
              r="28"
              fill="var(--accent)"
              fillOpacity="0.45"
            />
            <circle
              cx={OUT_CX - 9}
              cy={OUT_Y + 43}
              r="8"
              fill="var(--bg-elevated)"
              fillOpacity="0.85"
            />
            <text
              x={OUT_CX}
              y={OUT_Y + 100}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--accent)"
            >
              一帧成品画面
            </text>
            <text
              x={OUT_CX}
              y={OUT_SUB_Y}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
            >
              屏幕上的像素
            </text>
          </g>

          {/* ===== 底部一句话点题 ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            少了形状画不出东西、少了材质不知刷什么、少了灯一片漆黑——三者缺一，画面就不对
          </text>

          <defs>
            <marker
              id="ri-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="ri-arrow-accent"
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
          caption="猜一猜：同一个网格（形状不变），只把它的材质从「木纹」换成「金属」、再把灯关掉——屏幕上那帧画面会变吗？单步走一遍，看「形状 × 材质 × 光照」是怎么合成画面的。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        屏幕上的一帧画面，是 **Mesh（形状）+ Material（外观）+ Light（光照）**
        三样东西交给 **Renderer（渲染器）**
        算出来的：网格定形状、材质定质感、光照定明暗。三者缺一画面就不对——这是本章的主心骨。
      </figcaption>
    </figure>
  );
}
