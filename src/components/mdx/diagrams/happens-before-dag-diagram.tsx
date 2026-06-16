"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <HappensBeforeDAG>：happens-before 关系的有向图动画（HEL-234，§3 辅 Demo）。
 *
 * 把抽象的「关系三件套」画成一张能「顺着边走」的有向图（DAG）：
 *  - 同一线程内上→下的箭头 = sequenced-before（实线，灰）；
 *  - 跨线程的 release→读到它的 acquire = synchronizes-with（醒目彩色虚线）；
 *  - happens-before = 顺着这些边的传递闭包（能走到 = happens-before）。
 *
 * 节点（竖排两泳道）：
 *  线程1：A1 data=42（普通写）→ A2 ready.store(release）
 *  线程2：B1 ready.load(acquire)（读到 true）→ B2 读 data
 * 边：A1→A2（seq）、B1→B2（seq）、A2⇢B1（sync）。
 *
 * 分步：先点亮各节点与各边，最后高亮一条从 A1 经 sync 边走到 B2 的 happens-before 路径
 * （A1→A2⇢B1→B2 全程描成 happens-before 色），让读者亲眼看到「顺着边能走到 = happens-before」。
 *
 * 时间线 = 一条 anime.js timeline，7 拍：A1 → A2 → A1→A2 边 → sync 边 → B1 → B2 → 高亮 HB 路径。
 * label 锚定在「对应元素点亮完成」时刻（lit = beat 累加）；HB 路径高亮在最后一拍点亮，
 * 与 CASConceptDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import 切
 * 独立 chunk（硬规则 2/6），经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 几何：各 text 距 viewBox 任意边 ≥14px；节点/边/标签留足间距，互不压字。
 */

const VIEW_W = 600;
const VIEW_H = 380; // 末节点底边 ~330，下方留 ≥18px；底部 HB 图例 baseline ~362

const SEQ_COLOR = "var(--text-secondary)"; // sequenced-before（实线灰）
const SYNC_COLOR = "var(--warning)"; // synchronizes-with（彩色虚线）
const HB_COLOR = "var(--accent)"; // happens-before 路径高亮
const T1_COLOR = "var(--accent)"; // 线程1 节点
const T2_COLOR = "var(--success)"; // 线程2 节点

// —— 双泳道竖排几何 ——
const NODE_W = 210;
const NODE_H = 52;

const T1_X = 28; // 左列
const T2_X = VIEW_W - 28 - NODE_W; // 右列 = 600-28-210 = 362

const TOP_Y = 96; // 上排节点 y（A1 / B1）
const BOT_Y = 224; // 下排节点 y（A2 / B2）

type Node = {
  id: string;
  text: string;
  sub: string;
  color: string;
  x: number;
  y: number;
};

const NODES: readonly Node[] = [
  {
    id: "a1",
    text: "A1: data = 42",
    sub: "普通写",
    color: T1_COLOR,
    x: T1_X,
    y: TOP_Y,
  },
  {
    id: "a2",
    text: "A2: ready.store(release)",
    sub: "发布",
    color: T1_COLOR,
    x: T1_X,
    y: BOT_Y,
  },
  {
    id: "b1",
    text: "B1: ready.load(acquire)",
    sub: "读到 true",
    color: T2_COLOR,
    x: T2_X,
    y: TOP_Y,
  },
  {
    id: "b2",
    text: "B2: 读 data",
    sub: "拿到 42",
    color: T2_COLOR,
    x: T2_X,
    y: BOT_Y,
  },
];

const NODE_BY_ID: Record<string, Node> = Object.fromEntries(
  NODES.map((n) => [n.id, n]),
);

// 关键帧步骤（7 拍）：A1 → A2 → seq边A1→A2 → sync边A2⇢B1 → B1 → B2 → 高亮 HB 路径。
const STEPS: readonly TeachingStep[] = [
  { label: "a1", caption: "线程1 的 A1：普通写 data = 42" },
  { label: "a2", caption: "线程1 的 A2：用 release 发布 ready" },
  {
    label: "seq-a",
    caption: "A1 → A2 是 sequenced-before（同一线程内、源码先后）：实线灰箭头",
  },
  {
    label: "sync",
    caption:
      "A2 ⇢ B1 是 synchronizes-with：release 存与「读到它」的 acquire 读之间，彩色虚线",
  },
  { label: "b1", caption: "线程2 的 B1：用 acquire 读到 ready=true" },
  { label: "b2", caption: "线程2 的 B2：读 data" },
  {
    label: "hb",
    caption:
      "顺着 A1→A2⇢B1→B2 一路能走到 = A1 happens-before B2，所以 B2 读到的一定是 42",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function HappensBeforeDAG() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const seqRef = useRef<SVGGElement | null>(null); // A1→A2 实线
  const syncRef = useRef<SVGGElement | null>(null); // A2⇢B1 虚线
  const hbRef = useRef<SVGGElement | null>(null); // HB 路径高亮叠层

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: Element | null, beat: number) => {
        if (!el) return;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
      };

      // 节点：a1(0) / a2(1) / b1(4) / b2(5)。
      ["a1", "a2", "b1", "b2"].forEach((id) => {
        const beat = BEAT_OF[id] ?? 0;
        fade(nodeRefs.current[id], beat);
        tl.label(id, TEACHING_BEAT_MS * (beat + 1));
      });

      // 边：seq(2) / sync(3)。
      fade(seqRef.current, BEAT_OF["seq-a"] ?? 2);
      tl.label("seq-a", TEACHING_BEAT_MS * ((BEAT_OF["seq-a"] ?? 2) + 1));
      fade(syncRef.current, BEAT_OF["sync"] ?? 3);
      tl.label("sync", TEACHING_BEAT_MS * ((BEAT_OF["sync"] ?? 3) + 1));

      // HB 路径高亮：最后一拍(6)点亮。
      fade(hbRef.current, BEAT_OF["hb"] ?? 6);
      tl.label("hb", TEACHING_BEAT_MS * ((BEAT_OF["hb"] ?? 6) + 1));
    },
  });

  const renderNode = (n: Node) => (
    <g
      key={n.id}
      ref={(el) => {
        nodeRefs.current[n.id] = el;
      }}
      style={{ opacity: 0 }}
    >
      <rect
        x={n.x}
        y={n.y}
        width={NODE_W}
        height={NODE_H}
        rx="8"
        fill={n.color}
        fillOpacity="0.16"
        stroke={n.color}
        strokeWidth="2"
      />
      <text
        x={n.x + NODE_W / 2}
        y={n.y + 22}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {n.text}
      </text>
      <text
        x={n.x + NODE_W / 2}
        y={n.y + 40}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-secondary)"
      >
        {n.sub}
      </text>
    </g>
  );

  // 各边端点。
  const A1 = NODE_BY_ID["a1"];
  const A2 = NODE_BY_ID["a2"];
  const B1 = NODE_BY_ID["b1"];
  const B2 = NODE_BY_ID["b2"];

  // seq A1→A2（左列竖直）。
  const seqAX = A1.x + NODE_W / 2;
  // sync A2 右缘 → B1 左缘（斜跨）。
  const syncX1 = A2.x + NODE_W;
  const syncY1 = A2.y + NODE_H / 2;
  const syncX2 = B1.x;
  const syncY2 = B1.y + NODE_H / 2;
  // seq B1→B2（右列竖直）。
  const seqBX = B1.x + NODE_W / 2;

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
          aria-label="happens-before 关系的有向图动画。左列是线程1 的两个操作：A1 普通写 data 等于 42，A2 用 release 发布 ready；A1 到 A2 由一条实线灰箭头连接，表示同一线程内源码先后的 sequenced-before 关系。右列是线程2 的两个操作：B1 用 acquire 读到 ready 等于 true，B2 读 data；B1 到 B2 同样是 sequenced-before。跨线程的 A2 到 B1 由一条醒目的彩色虚线箭头连接，表示 release 存与读到它的 acquire 读之间的 synchronizes-with 关系。最后高亮一条从 A1 经 A2、同步边、B1 一路走到 B2 的路径，说明顺着这些边能走到就是 happens-before，因此 A1 happens-before B2，B2 读到的一定是 42。播放时依次点亮节点与边，最后点亮 happens-before 路径。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="hbdag-seq"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={SEQ_COLOR} />
            </marker>
            <marker
              id="hbdag-sync"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={SYNC_COLOR} />
            </marker>
            <marker
              id="hbdag-hb"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill={HB_COLOR} />
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
            happens-before = 顺着边能走到
          </text>

          {/* 泳道标题 */}
          <text
            x={T1_X + 4}
            y="76"
            fontSize="12"
            fontWeight="700"
            fill={T1_COLOR}
          >
            线程1
          </text>
          <text
            x={T2_X + 4}
            y="76"
            fontSize="12"
            fontWeight="700"
            fill={T2_COLOR}
          >
            线程2
          </text>

          {/* seq 边 A1→A2（与节点同层先画底，再由高亮层叠加） */}
          <g ref={seqRef} style={{ opacity: 0 }}>
            <line
              x1={seqAX}
              y1={A1.y + NODE_H}
              x2={seqAX}
              y2={A2.y}
              stroke={SEQ_COLOR}
              strokeWidth="2"
              markerEnd="url(#hbdag-seq)"
            />
            <text
              x={seqAX + 8}
              y={(A1.y + NODE_H + A2.y) / 2 + 4}
              fontSize="10"
              fontWeight="600"
              fill={SEQ_COLOR}
            >
              sequenced-before
            </text>
          </g>

          {/* seq 边 B1→B2（随 B1 节点那拍已可见——独立画在 b2 之前，opacity 随 b2 拍点亮） */}
          {/* 简化：B1→B2 实线常驻低亮，避免再加一拍；它不是教学重点边 */}
          <line
            x1={seqBX}
            y1={B1.y + NODE_H}
            x2={seqBX}
            y2={B2.y}
            stroke={SEQ_COLOR}
            strokeWidth="2"
            markerEnd="url(#hbdag-seq)"
            opacity="0.55"
          />

          {/* 四个节点 */}
          {NODES.map(renderNode)}

          {/* sync 边 A2⇢B1（彩色虚线，③ 那拍出现） */}
          <g ref={syncRef} style={{ opacity: 0 }}>
            <line
              x1={syncX1}
              y1={syncY1}
              x2={syncX2}
              y2={syncY2}
              stroke={SYNC_COLOR}
              strokeWidth="2.5"
              strokeDasharray="7 5"
              markerEnd="url(#hbdag-sync)"
            />
            <text
              x={(syncX1 + syncX2) / 2}
              y={(syncY1 + syncY2) / 2 - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={SYNC_COLOR}
            >
              synchronizes-with
            </text>
          </g>

          {/* HB 路径高亮叠层：A1→A2⇢B1→B2 整条描成 accent 色（最后一拍） */}
          <g ref={hbRef} style={{ opacity: 0 }}>
            {/* A1→A2 */}
            <line
              x1={seqAX}
              y1={A1.y + NODE_H}
              x2={seqAX}
              y2={A2.y}
              stroke={HB_COLOR}
              strokeWidth="3"
              markerEnd="url(#hbdag-hb)"
            />
            {/* A2⇢B1 */}
            <line
              x1={syncX1}
              y1={syncY1}
              x2={syncX2}
              y2={syncY2}
              stroke={HB_COLOR}
              strokeWidth="3"
              markerEnd="url(#hbdag-hb)"
            />
            {/* B1→B2 */}
            <line
              x1={seqBX}
              y1={B1.y + NODE_H}
              x2={seqBX}
              y2={B2.y}
              stroke={HB_COLOR}
              strokeWidth="3"
              markerEnd="url(#hbdag-hb)"
            />
            {/* HB 路径标注（放底部空白，不压节点/边） */}
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 18}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={HB_COLOR}
            >
              happens-before 路径：A1 → A2 ⇢ B1 → B2（A1 一定先于 B2 且可见）
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="实线灰 = sequenced-before（同线程源码先后）；彩色虚线 = synchronizes-with（release→读到它的 acquire）。最后高亮的整条路径 = happens-before（顺着边能走到）。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        happens-before 是 sequenced-before（同线程内）与
        synchronizes-with（跨线程
        release→acquire）的传递闭包：只要顺着这些边能从一个操作走到另一个，前者就一定先于后者、且其成果对后者可见。图中
        A1 经同步边可达 B2，故 A1 happens-before B2。
      </figcaption>
    </figure>
  );
}
