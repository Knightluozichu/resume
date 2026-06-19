"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <PrefabInstanceLinkDiagram>：主图（示意 / 流程，轻 anime）——「预制体资产 ↔ 场景实例联动 + 覆盖 + Apply」（HEL-289）。
 *
 * 左侧一个「预制体资产（模板）」，箭头连到右侧场景里三个「实例（克隆体）」。
 * 动画分 5 步（lit = BEAT*(i+1)），把 Unity 5 经典（扁平）预制体工作流掰碎：
 *  ① 基线：资产 + 三实例都「跟随资产」（同一颜色，标「跟随资产」）。
 *  ② 改资产某属性（标「资产改了」）→ 三个实例「同步变」（一起换色）。
 *  ③ 给「实例 2」override 一个属性（标「已覆盖」）→ 只它变、且脱开资产（连线变虚 / 淡）。
 *  ④ 在「实例 2」上 Apply → 把它的改动「推回资产」（回流箭头点亮）。
 *  ⑤ 推回后：资产更新 → 其它实例（1、3）也跟着变成实例 2 的样子。
 *
 * 全程「资产 ↔ 实例联动」「override 脱钩」「Apply 回流」三件事掰清。
 * 说明：Unity 5 是扁平预制体——无嵌套预制体 / 变体（2018.3 才有），本图不涉及。
 *
 * 所有坐标整数常量（无 Math 浮点算坐标）。视觉全部 DESIGN token、无裸 hex；
 * 时长走 TEACHING_BEAT_MS（硬规则 5）。所有 <text> 距 viewBox 任意边 ≥20px。
 */

const VIEW_W = 736;
// VIEW_H=408：底部说明基线 384、bbox 底 ~387，距底边 ~21px（≥20）。纵向利用率 ~88%。
const VIEW_H = 408;

// ── 左侧预制体资产（模板） ──
const ASSET_X = 28;
const ASSET_Y = 116;
const ASSET_W = 196;
const ASSET_H = 132;
const ASSET_CX = ASSET_X + ASSET_W / 2; // 126
const ASSET_CY = ASSET_Y + ASSET_H / 2; // 182
const ASSET_SWATCH_CY = ASSET_Y + 92; // 资产色块中心 y = 208

// ── 右侧三个实例（竖排） ──
const INST_X = 432;
const INST_W = 276;
const INST_H = 80;
const INST_Y0 = 70; // 第一个实例 y
const INST_DY = 100; // 行距（3 个：70 / 170 / 270）
const INST_SWATCH_CX = INST_X + 38; // 实例色块中心 x
const INST_SWATCH_R = 19;

// 三实例 y / 中心 y（整数）。
const INST1_Y = INST_Y0; // 70
const INST2_Y = INST_Y0 + INST_DY; // 170（被 override 的那一个）
const INST3_Y = INST_Y0 + 2 * INST_DY; // 270
const INST1_CY = INST1_Y + INST_H / 2; // 110
const INST2_CY = INST2_Y + INST_H / 2; // 210
const INST3_CY = INST3_Y + INST_H / 2; // 310

const STEPS: readonly TeachingStep[] = [
  {
    label: "base",
    caption:
      "① 一个预制体资产（模板）在 Project 里，场景里有它的 3 个实例（克隆体）。此刻三个实例都「跟随资产」——长得和资产一模一样",
  },
  {
    label: "editAsset",
    caption:
      "② 改资产的某个属性（比如颜色）→ 3 个实例「同步变」：改模板，所有跟随它的实例一起更新。这是预制体最大的价值",
  },
  {
    label: "override",
    caption:
      "③ 单独把「实例 2」的颜色调成另一种（override 覆盖）→ 只它变，且这个属性「脱开资产」（连线变虚），以后资产再改这个属性，它也不再跟随",
  },
  {
    label: "apply",
    caption:
      "④ 在「实例 2」上点 Apply → 把它的改动「推回资产」（回流箭头）：相当于说「以这个实例为准，更新模板」",
  },
  {
    label: "synced",
    caption:
      "⑤ 资产被更新后 → 其它跟随它的实例（1、3）也跟着变成实例 2 的样子。Apply = 影响全体；只想改一个、别影响别人，就保持实例 override 别 Apply",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function PrefabInstanceLinkDiagram() {
  const assetSwatchRef = useRef<SVGCircleElement | null>(null); // 资产色块（②改它）
  const assetEditTagRef = useRef<SVGGElement | null>(null); // 「资产改了」标签
  const inst1SwatchRef = useRef<SVGCircleElement | null>(null);
  const inst2SwatchRef = useRef<SVGCircleElement | null>(null);
  const inst3SwatchRef = useRef<SVGCircleElement | null>(null);
  const overrideTagRef = useRef<SVGGElement | null>(null); // 实例2「已覆盖」标签
  const link2Ref = useRef<SVGLineElement | null>(null); // 资产 → 实例2 的连线（③变虚）
  const applyArrowRef = useRef<SVGGElement | null>(null); // 实例2 → 资产 回流箭头组（④）

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步①：基线（label 在 t=0）。
      tl.label("base", 0);

      // 步②：改资产颜色 → 三实例同步变（start = BEAT*0）。
      const s1 = TEACHING_BEAT_MS * 0;
      if (assetEditTagRef.current) {
        tl.add(
          assetEditTagRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (assetSwatchRef.current) {
        tl.add(
          assetSwatchRef.current,
          {
            fill: "var(--success)",
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s1,
        );
      }
      // 三实例随后一起变（稍延迟，体现「跟随资产」）。
      for (const r of [
        inst1SwatchRef.current,
        inst2SwatchRef.current,
        inst3SwatchRef.current,
      ]) {
        if (r) {
          tl.add(
            r,
            {
              fill: "var(--success)",
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            s1 + TEACHING_BEAT_MS / 2,
          );
        }
      }
      tl.label("editAsset", TEACHING_BEAT_MS * 1);

      // 步③：实例2 override（脱开资产）（start = BEAT*1）。
      const s2 = TEACHING_BEAT_MS * 1;
      if (inst2SwatchRef.current) {
        tl.add(
          inst2SwatchRef.current,
          {
            fill: "var(--warning)",
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s2,
        );
      }
      if (overrideTagRef.current) {
        tl.add(
          overrideTagRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (link2Ref.current) {
        // 连线变淡 + 虚线感（opacity 降低，示意「这个属性脱钩」）。
        tl.add(
          link2Ref.current,
          { opacity: [1, 0.28], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s2,
        );
      }
      tl.label("override", TEACHING_BEAT_MS * 2);

      // 步④：Apply 回流（实例2 → 资产）（start = BEAT*2）。
      const s3 = TEACHING_BEAT_MS * 2;
      if (applyArrowRef.current) {
        tl.add(
          applyArrowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s3,
        );
      }
      // 资产被「推回」成实例2 的颜色（warning）。
      if (assetSwatchRef.current) {
        tl.add(
          assetSwatchRef.current,
          {
            fill: "var(--warning)",
            duration: TEACHING_BEAT_MS,
            ease: "out(2)",
          },
          s3 + TEACHING_BEAT_MS / 2,
        );
      }
      tl.label("apply", TEACHING_BEAT_MS * 3);

      // 步⑤：资产更新 → 实例1、3 也跟着变（start = BEAT*3）。
      const s4 = TEACHING_BEAT_MS * 3;
      for (const r of [inst1SwatchRef.current, inst3SwatchRef.current]) {
        if (r) {
          tl.add(
            r,
            {
              fill: "var(--warning)",
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            s4,
          );
        }
      }
      // 实例2 的连线恢复（Apply 后它与资产又一致了）。
      if (link2Ref.current) {
        tl.add(
          link2Ref.current,
          { opacity: [0.28, 1], duration: TEACHING_BEAT_MS, ease: "out(2)" },
          s4,
        );
      }
      tl.label("synced", TEACHING_BEAT_MS * 4);
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
          aria-label="预制体资产与场景实例的联动示意图。左边一个预制体资产，是配好组件和参数的可复用模板，放在 Project 里。它用箭头连到右边场景里的三个实例，也就是它的克隆体。动画分五步演示 Unity 5 经典扁平预制体的工作流。第一步基线：三个实例都跟随资产，长得和资产一样。第二步改资产的某个属性比如颜色，三个实例同步一起变，这是预制体最大的价值，改模板所有实例一起更新。第三步单独把实例二的颜色调成另一种，这叫覆盖 override，只有实例二变，而且这个属性脱开了资产，连线变虚，以后资产再改这个属性实例二也不跟随。第四步在实例二上点 Apply，把实例二的改动推回资产，一个回流箭头从实例二指向资产。第五步资产被更新后，其它跟随它的实例一和实例三也跟着变成实例二的样子。结论：Apply 影响全体；只想改一个不影响别人，就保持实例覆盖、不要 Apply。Unity 5 是扁平预制体，没有嵌套预制体。动画可播放、暂停、单步、拖动进度。"
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
            预制体资产（模板） ↔ 场景实例（克隆体）：联动 · 覆盖 · Apply
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            改模板，所有实例同步变；某个实例可单独「覆盖」脱钩；Apply
            把实例改动推回模板
          </text>

          {/* ===== 连线：资产右边 → 每个实例左边（先画，框盖线头）===== */}
          <line
            x1={ASSET_X + ASSET_W}
            y1={ASSET_CY}
            x2={INST_X}
            y2={INST1_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#pil-arrow)"
          />
          <line
            ref={link2Ref}
            x1={ASSET_X + ASSET_W}
            y1={ASSET_CY}
            x2={INST_X}
            y2={INST2_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#pil-arrow)"
          />
          <line
            x1={ASSET_X + ASSET_W}
            y1={ASSET_CY}
            x2={INST_X}
            y2={INST3_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.8"
            markerEnd="url(#pil-arrow)"
          />

          {/* ===== Apply 回流箭头（实例2 → 资产，弧线在主连线上方，④点亮）===== */}
          <g ref={applyArrowRef} opacity="0">
            <path
              d={`M ${INST_X} ${INST2_Y + 6} C ${INST_X - 80} ${INST2_Y - 40}, ${ASSET_X + ASSET_W + 60} ${ASSET_Y - 30}, ${ASSET_X + ASSET_W - 20} ${ASSET_Y}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#pil-arrow-accent)"
            />
            <text
              x={(INST_X + ASSET_X + ASSET_W) / 2}
              y={ASSET_Y - 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              Apply：推回资产
            </text>
          </g>

          {/* ============ 左侧：预制体资产 ============ */}
          <rect
            x={ASSET_X}
            y={ASSET_Y}
            width={ASSET_W}
            height={ASSET_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={ASSET_CX}
            y={ASSET_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            Prefab 资产
          </text>
          <text
            x={ASSET_CX}
            y={ASSET_Y + 46}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            模板（在 Project 里）
          </text>
          {/* 资产外观色块（②④会变色） */}
          <circle
            ref={assetSwatchRef}
            cx={ASSET_CX}
            cy={ASSET_SWATCH_CY}
            r="20"
            fill="var(--accent)"
            fillOpacity="0.85"
          />
          <text
            x={ASSET_CX}
            y={ASSET_Y + 122}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            配好组件 / 参数，可复用
          </text>
          {/* 「资产改了」标签（②点亮，放资产框上方） */}
          <g ref={assetEditTagRef} opacity="0">
            <rect
              x={ASSET_X + 30}
              y={ASSET_Y - 26}
              width={136}
              height={20}
              rx="6"
              fill="var(--success)"
              fillOpacity="0.18"
              stroke="var(--success)"
              strokeWidth="1.2"
            />
            <text
              x={ASSET_CX}
              y={ASSET_Y - 12}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="var(--success)"
            >
              ② 改资产某属性
            </text>
          </g>

          {/* ============ 右侧：三个实例 ============ */}
          {/* 实例 1 */}
          <g>
            <rect
              x={INST_X}
              y={INST1_Y}
              width={INST_W}
              height={INST_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <circle
              ref={inst1SwatchRef}
              cx={INST_SWATCH_CX}
              cy={INST1_CY}
              r={INST_SWATCH_R}
              fill="var(--accent)"
              fillOpacity="0.85"
            />
            <text
              x={INST_X + 72}
              y={INST1_Y + 32}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              实例 1（克隆体）
            </text>
            <text
              x={INST_X + 72}
              y={INST1_Y + 52}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              跟随资产 · 在场景 Hierarchy 里
            </text>
          </g>

          {/* 实例 2（被 override 的那一个） */}
          <g>
            <rect
              x={INST_X}
              y={INST2_Y}
              width={INST_W}
              height={INST_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <circle
              ref={inst2SwatchRef}
              cx={INST_SWATCH_CX}
              cy={INST2_CY}
              r={INST_SWATCH_R}
              fill="var(--accent)"
              fillOpacity="0.85"
            />
            <text
              x={INST_X + 72}
              y={INST2_Y + 32}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              实例 2（克隆体）
            </text>
            <text
              x={INST_X + 72}
              y={INST2_Y + 52}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              单独改 → 覆盖（override）
            </text>
            {/* 「已覆盖」徽标（③点亮） */}
            <g ref={overrideTagRef} opacity="0">
              <rect
                x={INST_X + INST_W - 84}
                y={INST2_Y + 12}
                width={72}
                height={20}
                rx="6"
                fill="var(--warning)"
                fillOpacity="0.18"
                stroke="var(--warning)"
                strokeWidth="1.2"
              />
              <text
                x={INST_X + INST_W - 48}
                y={INST2_Y + 26}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="700"
                fill="var(--warning)"
              >
                已覆盖
              </text>
            </g>
          </g>

          {/* 实例 3 */}
          <g>
            <rect
              x={INST_X}
              y={INST3_Y}
              width={INST_W}
              height={INST_H}
              rx="10"
              fill="var(--bg)"
              stroke="var(--border)"
              strokeWidth="1.6"
            />
            <circle
              ref={inst3SwatchRef}
              cx={INST_SWATCH_CX}
              cy={INST3_CY}
              r={INST_SWATCH_R}
              fill="var(--accent)"
              fillOpacity="0.85"
            />
            <text
              x={INST_X + 72}
              y={INST3_Y + 32}
              textAnchor="start"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              实例 3（克隆体）
            </text>
            <text
              x={INST_X + 72}
              y={INST3_Y + 52}
              textAnchor="start"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              跟随资产 · 在场景 Hierarchy 里
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
            改资产 = 全体同步；override = 单个脱钩；Apply =
            把单个改动推回资产再影响全体（Unity 5 是扁平预制体，无嵌套）
          </text>

          <defs>
            <marker
              id="pil-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="pil-arrow-accent"
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
          caption="猜一猜：你单独把「实例 2」的颜色改了（override），这时去改资产的颜色，实例 2 会跟着变吗？再单步到 Apply，看它怎么把改动「推回」资产、连带影响其它实例。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        **预制体资产**是「模板」，场景里是它的**实例**（克隆体）。改资产 →
        所有实例**同步更新**（预制体最大的价值）；单独改某个实例 = **覆盖
        override**，该属性脱钩、不再跟随资产；在实例上 **Apply** =
        把改动**推回资产**、连带影响其它实例。**Unity 5
        是扁平预制体，没有嵌套预制体**（那是 2018.3 之后才有的）。
      </figcaption>
    </figure>
  );
}
