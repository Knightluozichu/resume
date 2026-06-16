"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AcquireReleaseSyncDiagram>：acquire-release 配对建立同步关系的双泳道动画（HEL-234，§5 主 Demo）。
 *
 * 餐厅后厨隐喻（承接本书「对讲机」比喻）：经典「标志位 + 数据」发布模式。
 *  线程1（生产）：① data=42（普通写，把菜备好）；② ready.store(true, release)（按对讲机：发布）。
 *  线程2（消费）：③ while(!ready.load(acquire))（盯着对讲机，听到才开工）；④ 读 data（取菜）。
 *
 * 全章最硬的「synchronizes-with（同步专线）」就靠这张图掰碎：
 *  - 先点亮 ①②（线程1 写 data、release 存 ready）；
 *  - 点亮 ③（线程2 acquire 真的读到了 ready=true）——**正是这一拍**在 ②→③ 之间画出一条醒目的
 *    「同步专线 synchronizes-with」彩色虚线箭头；
 *  - 点亮 ④ 并高亮「data=42 此刻对线程2 可见」——强调正是这条专线让 ① happens-before ④，
 *    所以线程2 读到的必是 42 而非旧值。
 *
 * 时间线 = 一条 anime.js timeline，4 拍。每个 step 的 label 锚定在「对应节点点亮到最亮」的
 * 时刻（lit = TEACHING_BEAT_MS*(beat+1)），与 CASConceptDiagram / CondVarWaitNotifyDiagram
 * 同款写法，修正 off-by-one。同步专线 sync 与 ③ 同起同止 → 在「③ 点亮完成」那一拍出现。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 动态
 * import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / danger / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。几何：各 text 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 600;
const VIEW_H = 396; // 末节点底边 ~344、其下「可见」标注 baseline ~376，留 ≥18px 到底边

const T1_COLOR = "var(--accent)"; // 线程1（生产）
const T2_COLOR = "var(--success)"; // 线程2（消费）
const SYNC_COLOR = "var(--warning)"; // 同步专线 synchronizes-with
const VIS_COLOR = "var(--success)"; // data 可见高亮

// —— 双泳道几何：线程1 左列、线程2 右列；各两个操作盒，竖排 ——
const BOX_W = 248;
const BOX_H = 56;

const T1_X = 32; // 左列左缘（左侧文字距边 ≥14px：盒内 padding 留足）
const T2_X = VIEW_W - 32 - BOX_W; // 右列左缘 = 600-32-248 = 320

const ROW1_Y = 100; // 第一排：① 与 ③
const ROW2_Y = 196; // 第二排：② 与 ④

type Op = {
  id: string;
  text: string;
  sub: string;
  color: string;
  x: number;
  y: number;
};

// 操作盒：①data 写 / ②release 存 ready / ③acquire 读 ready / ④读 data。
const OPS: readonly Op[] = [
  {
    id: "write-data",
    text: "① data = 42",
    sub: "普通写（把菜备好）",
    color: T1_COLOR,
    x: T1_X,
    y: ROW1_Y,
  },
  {
    id: "store-ready",
    text: "② ready.store(true, release)",
    sub: "按对讲机：发布",
    color: T1_COLOR,
    x: T1_X,
    y: ROW2_Y,
  },
  {
    id: "load-ready",
    text: "③ while(!ready.load(acquire))",
    sub: "听到对讲机才开工（读到 true）",
    color: T2_COLOR,
    x: T2_X,
    y: ROW1_Y,
  },
  {
    id: "read-data",
    text: "④ 读 data → 必得 42",
    sub: "取菜：拿到的一定是新值",
    color: T2_COLOR,
    x: T2_X,
    y: ROW2_Y,
  },
];

const OP_BY_ID: Record<string, Op> = Object.fromEntries(
  OPS.map((o) => [o.id, o]),
);

// 关键帧步骤：①写 data → ②release 存 → ③acquire 读到（同步专线出现）→ ④读到 42（可见）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "write-data",
    caption: "① 线程1 先普通写 data = 42——这只是写进内存，还没「发布」",
  },
  {
    label: "store-ready",
    caption:
      "② 线程1 用 release 存 ready=true——「按下对讲机」，把 ① 的写一并对外发布",
  },
  {
    label: "load-ready",
    caption:
      "③ 线程2 用 acquire 读到 ready=true——「听到对讲机」，此刻 ②→③ 接通一条同步专线 synchronizes-with",
  },
  {
    label: "read-data",
    caption:
      "④ 线程2 读 data——同步专线让 ① happens-before ④，所以读到的一定是 42，绝不是旧值",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function AcquireReleaseSyncDiagram() {
  const opRefs = useRef<Record<string, SVGGElement | null>>({});
  const syncRef = useRef<SVGGElement | null>(null); // 同步专线（③ 那拍出现）
  const visRef = useRef<SVGGElement | null>(null); // data 可见高亮（④ 那拍出现）

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      OPS.forEach((o) => {
        const el = opRefs.current[o.id];
        if (!el) return;
        const beat = BEAT_OF[o.id] ?? 0;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(o.id, lit);
      });

      // 同步专线：与 ③（load-ready）同起同止 → 在「③ 点亮完成」那拍出现。
      if (syncRef.current) {
        const beat = BEAT_OF["load-ready"] ?? 2;
        tl.add(
          syncRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
      }

      // data 可见高亮：与 ④（read-data）同起同止。
      if (visRef.current) {
        const beat = BEAT_OF["read-data"] ?? 3;
        tl.add(
          visRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
      }
    },
  });

  const renderOp = (o: Op) => (
    <g
      key={o.id}
      ref={(el) => {
        opRefs.current[o.id] = el;
      }}
      style={{ opacity: 0 }}
    >
      <rect
        x={o.x}
        y={o.y}
        width={BOX_W}
        height={BOX_H}
        rx="8"
        fill={o.color}
        fillOpacity="0.16"
        stroke={o.color}
        strokeWidth="2"
      />
      <text
        x={o.x + BOX_W / 2}
        y={o.y + 23}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {o.text}
      </text>
      <text
        x={o.x + BOX_W / 2}
        y={o.y + 42}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        {o.sub}
      </text>
    </g>
  );

  // 同步专线端点：从 ②（store-ready）右缘中点 → ③（load-ready）左缘中点。
  const STORE = OP_BY_ID["store-ready"];
  const LOAD = OP_BY_ID["load-ready"];
  const syncX1 = STORE.x + BOX_W; // ② 右缘
  const syncY1 = STORE.y + BOX_H / 2;
  const syncX2 = LOAD.x; // ③ 左缘
  const syncY2 = LOAD.y + BOX_H / 2;

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
          aria-label="acquire-release 配对建立同步关系的双泳道动画。左泳道是线程1（生产者）：第一步普通写 data 等于 42，第二步用 release 内存序存 ready 等于 true，相当于按下对讲机发布。右泳道是线程2（消费者）：第三步用 acquire 内存序在循环里读 ready，直到读到 true，相当于听到对讲机才开工——正是在这一步，第二步的 release 存与第三步的 acquire 读之间接通一条同步专线 synchronizes-with。第四步线程2 读 data，由于同步专线让第一步的写 happens-before 第四步的读，所以读到的一定是 42 而非旧值。播放时依次点亮四个操作，第三步出现同步专线、第四步高亮 data 可见。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="arsync-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={SYNC_COLOR} />
            </marker>
            <marker
              id="arsync-seq"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="20"
            y="31"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            acquire-release 配对：一按一听，连出同步专线
          </text>

          {/* 泳道标题 */}
          <text
            x={T1_X + 4}
            y="68"
            fontSize="12"
            fontWeight="700"
            fill={T1_COLOR}
          >
            线程1（生产）
          </text>
          <text
            x={T2_X + 4}
            y="68"
            fontSize="12"
            fontWeight="700"
            fill={T2_COLOR}
          >
            线程2（消费）
          </text>

          {/* 线程1 内 ①→② 的 sequenced-before（同泳道竖直实线） */}
          <line
            x1={T1_X + BOX_W / 2}
            y1={ROW1_Y + BOX_H}
            x2={T1_X + BOX_W / 2}
            y2={ROW2_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#arsync-seq)"
            opacity="0.7"
          />
          {/* 线程2 内 ③→④ 的 sequenced-before */}
          <line
            x1={T2_X + BOX_W / 2}
            y1={ROW1_Y + BOX_H}
            x2={T2_X + BOX_W / 2}
            y2={ROW2_Y}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#arsync-seq)"
            opacity="0.7"
          />

          {/* 四个操作盒 */}
          {OPS.map(renderOp)}

          {/* 同步专线 synchronizes-with：② release → ③ acquire（③ 那拍出现） */}
          <g ref={syncRef} style={{ opacity: 0 }}>
            <line
              x1={syncX1}
              y1={syncY1}
              x2={syncX2}
              y2={syncY2}
              stroke={SYNC_COLOR}
              strokeWidth="2.5"
              strokeDasharray="7 5"
              markerEnd="url(#arsync-arrow)"
            />
            <text
              x={(syncX1 + syncX2) / 2}
              y={(syncY1 + syncY2) / 2 - 10}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill={SYNC_COLOR}
            >
              同步专线
            </text>
            <text
              x={(syncX1 + syncX2) / 2}
              y={(syncY1 + syncY2) / 2 + 6}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={SYNC_COLOR}
            >
              synchronizes-with
            </text>
          </g>

          {/* data 可见高亮（④ 那拍出现）：底部一行强调 ① 的写对 ④ 可见 */}
          <g ref={visRef} style={{ opacity: 0 }}>
            <rect
              x={T2_X}
              y={ROW2_Y + BOX_H + 12}
              width={BOX_W}
              height={30}
              rx="6"
              fill={VIS_COLOR}
              fillOpacity="0.14"
              stroke={VIS_COLOR}
              strokeWidth="1.5"
            />
            <text
              x={T2_X + BOX_W / 2}
              y={ROW2_Y + BOX_H + 31}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={VIS_COLOR}
            >
              data=42 此刻对线程2 可见 ✓
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="① 写 data → ② release 存 ready（按对讲机）→ ③ acquire 读到 ready（听到对讲机，此刻接通同步专线）→ ④ 读 data 必得 42。正是这条专线让 ① happens-before ④。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        acquire-release 配对：release 存与「读到该值的」acquire 读之间建立
        synchronizes-with（同步专线）。这条专线让 release 之前的所有写（含
        data=42）都对 acquire 之后可见——所以线程2 读到的一定是
        42。这正是「标志位 + 数据」发布模式的原理。
      </figcaption>
    </figure>
  );
}
