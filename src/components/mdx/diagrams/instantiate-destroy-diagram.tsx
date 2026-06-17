"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <InstantiateDestroyDiagram>：Instantiate 克隆对象 / Destroy 销毁对象的可控教学动画（HEL-282）。
 *
 * 数字片场隐喻——Instantiate = 照着「模板演员」复制一个临时演员上场；Destroy = 让某个演员下场。
 * 左侧一个 prefab/模板（始终在），右侧「场景」里随步骤增减克隆出来的实例，分 4 步：
 *  ① 有个 prefab 模板（场景里还没有克隆）。
 *  ② Instantiate(prefab) —— 场景里多出一个克隆 #1（从模板复制进场）。
 *  ③ 再 Instantiate(prefab) —— 又多一个克隆 #2（同一个模板可复制无数次）。
 *  ④ Destroy(克隆 #1) —— 被销毁的那个从场景消失（标红、淡出）。
 *
 * 每步用 anime.js timeline 控制场景里三个槽位的可见性：克隆出现 = opacity 0→1，
 * 销毁 = opacity 1→0.12 + danger 描边。label 锚定「该步动作完成」的时刻
 * （lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；场景槽位与模板框互不重叠。
 */

const VIEW_W = 660;
const VIEW_H = 420;

// 左侧 prefab 模板框。
const TPL_X = 30;
const TPL_Y = 150;
const TPL_W = 150;
const TPL_H = 120;

// 右侧「场景」容器。
const SCENE_X = 250;
const SCENE_Y = 96;
const SCENE_W = VIEW_W - 30 - SCENE_X;
const SCENE_H = 252;

// 场景里三个克隆槽位（横排，等距）。
const SLOT_W = 96;
const SLOT_H = 110;
const SLOT_CY = SCENE_Y + 132; // 槽位竖直中心
const SLOT_GAP = (SCENE_W - SLOT_W * 3) / 4; // 三槽四间隙均分
const slotX = (i: number) => SCENE_X + SLOT_GAP + i * (SLOT_W + SLOT_GAP);

// 一个「小人」图标（演员）：圆头 + 梯形身。颜色由调用方给。
function ActorIcon({
  cx,
  cy,
  color,
}: {
  cx: number;
  cy: number;
  color: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy - 18} r="11" fill={color} fillOpacity="0.85" />
      <path
        d={`M ${cx - 16} ${cy + 22} Q ${cx} ${cy - 6} ${cx + 16} ${cy + 22} Z`}
        fill={color}
        fillOpacity="0.85"
      />
    </g>
  );
}

const STEPS: readonly TeachingStep[] = [
  {
    label: "template",
    caption:
      "① 有一个 prefab 模板（预制体）——它本身不在场景里跑，只是「复制的样板」",
  },
  {
    label: "clone1",
    caption:
      "② Instantiate(prefab)：照模板复制出一个克隆，进入场景——这是个真正在跑的新对象",
  },
  {
    label: "clone2",
    caption:
      "③ 再 Instantiate(prefab) 一次：同一个模板可以复制无数次，场景里又多一个克隆",
  },
  {
    label: "destroy",
    caption:
      "④ Destroy(克隆 #1)：让某个对象下场——它从场景消失（注意不是立即，本帧结束才真正销毁）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function InstantiateDestroyDiagram() {
  const clone1Ref = useRef<SVGGElement | null>(null);
  const clone2Ref = useRef<SVGGElement | null>(null);
  const destroyMarkRef = useRef<SVGGElement | null>(null);
  const arrow1Ref = useRef<SVGGElement | null>(null);
  const arrow2Ref = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步②：克隆 #1 + 它的「复制箭头」淡入（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (arrow1Ref.current) {
        tl.add(
          arrow1Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (clone1Ref.current) {
        tl.add(
          clone1Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("clone1", TEACHING_BEAT_MS * 2);

      // 步③：克隆 #2 + 第二条复制箭头淡入（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (arrow2Ref.current) {
        tl.add(
          arrow2Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (clone2Ref.current) {
        tl.add(
          clone2Ref.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("clone2", TEACHING_BEAT_MS * 3);

      // 步④：销毁克隆 #1 —— 淡出到近透明，同时「已销毁」红标淡入（start = BEAT*3）。
      const s3 = TEACHING_BEAT_MS * 3;
      if (clone1Ref.current) {
        tl.add(
          clone1Ref.current,
          { opacity: [1, 0.12], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          s3,
        );
      }
      if (destroyMarkRef.current) {
        tl.add(
          destroyMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s3,
        );
      }
      tl.label("destroy", TEACHING_BEAT_MS * 4);

      // 步① label 在 t=0（首帧只有模板，场景空）。
      tl.label("template", 0);
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
          aria-label="Instantiate 克隆对象与 Destroy 销毁对象的动画。左侧是一个 prefab 模板（预制体），它本身不在场景里运行，只是复制的样板。右侧是场景容器，里面有三个槽位。动画分四步：第一步场景里还是空的，只有左侧的模板；第二步调用 Instantiate(prefab)，照模板复制出克隆一号进入场景，一条复制箭头从模板指向它，它是一个真正在运行的新对象；第三步再调用一次 Instantiate(prefab)，同一个模板可以复制无数次，场景里又多出克隆二号；第四步调用 Destroy(克隆一号)，被销毁的对象从场景淡出消失并标红，提示销毁不是立即生效、本帧结束才真正销毁。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Instantiate 复制临时演员上场 · Destroy 让演员下场
          </text>
          <text
            x={VIEW_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个模板可复制无数实例；销毁的实例从场景消失
          </text>

          {/* ===== 左侧：prefab 模板框（始终在，不随步骤变） ===== */}
          <rect
            x={TPL_X}
            y={TPL_Y}
            width={TPL_W}
            height={TPL_H}
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <text
            x={TPL_X + TPL_W / 2}
            y={TPL_Y - 10}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            prefab 模板
          </text>
          <ActorIcon
            cx={TPL_X + TPL_W / 2}
            cy={TPL_Y + 52}
            color="var(--accent)"
          />
          <text
            x={TPL_X + TPL_W / 2}
            y={TPL_Y + TPL_H - 14}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            样板 · 不在场景跑
          </text>

          {/* ===== 右侧：场景容器 ===== */}
          <rect
            x={SCENE_X}
            y={SCENE_Y}
            width={SCENE_W}
            height={SCENE_H}
            rx="12"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={SCENE_X + 14}
            y={SCENE_Y - 10}
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            场景（运行中的对象都在这）
          </text>

          {/* ===== 复制箭头①：模板 → 槽位 0（克隆 #1） ===== */}
          <g ref={arrow1Ref} opacity="0">
            <line
              x1={TPL_X + TPL_W + 4}
              y1={TPL_Y + 30}
              x2={slotX(0) + SLOT_W / 2}
              y2={SLOT_CY - SLOT_H / 2 - 6}
              stroke="var(--success)"
              strokeWidth="1.8"
              markerEnd="url(#idd-arrow)"
            />
          </g>

          {/* ===== 复制箭头②：模板 → 槽位 1（克隆 #2） ===== */}
          <g ref={arrow2Ref} opacity="0">
            <line
              x1={TPL_X + TPL_W + 4}
              y1={TPL_Y + 78}
              x2={slotX(1) + SLOT_W / 2}
              y2={SLOT_CY - SLOT_H / 2 - 6}
              stroke="var(--success)"
              strokeWidth="1.8"
              markerEnd="url(#idd-arrow)"
            />
          </g>

          {/* ===== 克隆 #1（槽位 0） ===== */}
          <g ref={clone1Ref} opacity="0">
            <rect
              x={slotX(0)}
              y={SLOT_CY - SLOT_H / 2}
              width={SLOT_W}
              height={SLOT_H}
              rx="9"
              fill="var(--success)"
              fillOpacity="0.14"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <ActorIcon
              cx={slotX(0) + SLOT_W / 2}
              cy={SLOT_CY - 6}
              color="var(--success)"
            />
            <text
              x={slotX(0) + SLOT_W / 2}
              y={SLOT_CY + SLOT_H / 2 - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              克隆 #1
            </text>
          </g>

          {/* ===== 克隆 #2（槽位 1） ===== */}
          <g ref={clone2Ref} opacity="0">
            <rect
              x={slotX(1)}
              y={SLOT_CY - SLOT_H / 2}
              width={SLOT_W}
              height={SLOT_H}
              rx="9"
              fill="var(--success)"
              fillOpacity="0.14"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <ActorIcon
              cx={slotX(1) + SLOT_W / 2}
              cy={SLOT_CY - 6}
              color="var(--success)"
            />
            <text
              x={slotX(1) + SLOT_W / 2}
              y={SLOT_CY + SLOT_H / 2 - 12}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              克隆 #2
            </text>
          </g>

          {/* ===== 「已销毁」红标（覆在克隆 #1 槽位上方） ===== */}
          <g ref={destroyMarkRef} opacity="0">
            <rect
              x={slotX(0)}
              y={SLOT_CY - SLOT_H / 2}
              width={SLOT_W}
              height={SLOT_H}
              rx="9"
              fill="none"
              stroke="var(--danger)"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            />
            <line
              x1={slotX(0) + 14}
              y1={SLOT_CY - SLOT_H / 2 + 14}
              x2={slotX(0) + SLOT_W - 14}
              y2={SLOT_CY + SLOT_H / 2 - 14}
              stroke="var(--danger)"
              strokeWidth="1.8"
            />
            <text
              x={slotX(0) + SLOT_W / 2}
              y={SLOT_CY - SLOT_H / 2 - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--danger)"
            >
              已销毁
            </text>
          </g>

          <defs>
            <marker
              id="idd-arrow"
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
          caption="猜一猜：执行完 Destroy(go) 这一行，紧接着的下一句还能访问 go 吗？单步走到第④步看说明。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Instantiate(prefab)
        照模板复制一个新对象进场景（可复制无数次）；Destroy(obj)
        让某个对象下场、从场景消失。注意 Destroy
        不立即生效——本帧结束才真正销毁。
      </figcaption>
    </figure>
  );
}
