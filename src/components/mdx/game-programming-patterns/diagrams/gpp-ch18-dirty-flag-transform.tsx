"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh18DirtyFlagTransform>：脏标记延迟重算动画（GPP 第18章）。
 *
 * 核心：当某个昂贵计算的结果依赖会变化的输入时，标记"脏"，把重算推迟到真正需要结果的
 * 那一刻，且只算一次。
 *
 * 场景：场景图中子节点的"世界变换"= 父变换 × 局部变换。移动父节点 A 时不立即重算所有
 * 后代的世界变换，而是给 A/B/C 打上 dirty 标记；直到渲染读取 C 的世界变换，才沿链
 * （A→B→C）重算并清除标记。
 *
 * 节拍：
 *  ① 移动父节点 A：A、B、C 全部标脏（红灯），但不立即重算
 *  ② 中间多帧过去，脏标记保持——省下这些帧的重算算力
 *  ③ 渲染读取 C.world，触发沿链重算（A→B→C）
 *  ④ 重算完毕，dirty 灯逐个转绿
 *  ⑤ 洞见：标记+延迟，把"每次变化都重算"变成"需要时才算一次"
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const DIRTY_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

// 场景树节点（竖向链 A→B→C）
const NODES = [
  { id: "A", name: "父节点 A", x: 220, y: 130, local: "local: 平移" },
  { id: "B", name: "子节点 B", x: 220, y: 240, local: "local: 旋转" },
  { id: "C", name: "孙节点 C", x: 220, y: 350, local: "local: 缩放" },
];

const NODE_W = 200;
const NODE_H = 64;

const STEPS: readonly TeachingStep[] = [
  { label: "move", caption: "移动父节点 A：不立即重算，而是给 A、B、C 全部打上 dirty 标记（红灯）" },
  { label: "defer", caption: "接下来几帧什么都不重算——脏标记保持，省下这些帧的计算" },
  { label: "read", caption: "渲染要画 C，读取 C.world，触发沿链重算：A.world → B.world → C.world" },
  { label: "clean", caption: "重算完毕，A、B、C 的 dirty 灯逐个转绿，世界变换已是最新" },
  { label: "insight", caption: "标记+延迟：把'每次变化都重算'变成'真正需要时才算一次'" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh18DirtyFlagTransform() {
  const dirtyRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const cleanRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const recomputeRef = useRef<SVGGElement | null>(null);
  const deferRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① move（t: 0→T）：三个节点 dirty 灯变红
      NODES.forEach((n, i) => {
        tl.add(dirtyRefs.current[n.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, i * T * 0.15);
        tl.add(cleanRefs.current[n.id]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, i * T * 0.15);
      });
      tl.label("move", 0);

      // ② defer（t: T→2T）：提示"多帧不重算"
      tl.add(deferRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("defer", T);

      // ③ read（t: 2T→3T）：沿链重算箭头浮现
      tl.add(deferRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(recomputeRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 2);
      tl.label("read", T * 2);

      // ④ clean（t: 3T→4T）：dirty 灯逐个转绿（A→B→C）
      NODES.forEach((n, i) => {
        tl.add(dirtyRefs.current[n.id]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3 + i * T * 0.18);
        tl.add(cleanRefs.current[n.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3 + i * T * 0.18);
      });
      tl.label("clean", T * 3);

      // ⑤ insight（t: 4T→5T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("insight", T * 4);
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
          aria-label="脏标记动画。场景树父节点 A、子节点 B、孙节点 C。移动父节点 A 时不立即重算，而是给 A、B、C 全部打上 dirty 标记变红；中间几帧保持脏标记、省下重算；渲染读取 C 的世界变换时触发沿链重算 A→B→C；重算完毕 dirty 灯逐个转绿。标记加延迟把每次变化都重算变成需要时才算一次。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            脏标记：标脏 + 延迟，需要时才重算一次
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            移动父节点不立即重算后代，标脏；读取世界变换时才沿链重算并清标记
          </text>

          {/* 场景树连线 */}
          <line x1={220} y1={NODES[0].y + NODE_H / 2} x2={220} y2={NODES[1].y - NODE_H / 2} stroke="var(--border)" strokeWidth="1.6" />
          <line x1={220} y1={NODES[1].y + NODE_H / 2} x2={220} y2={NODES[2].y - NODE_H / 2} stroke="var(--border)" strokeWidth="1.6" />
          <text x={232} y={(NODES[0].y + NODES[1].y) / 2} fontSize="11" fill="var(--text-secondary)">
            world = 父.world × local
          </text>

          {/* 节点 */}
          {NODES.map((n) => (
            <g key={n.id}>
              <rect x={n.x - NODE_W / 2} y={n.y - NODE_H / 2} width={NODE_W} height={NODE_H} rx="9" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.4" />
              <text x={n.x - NODE_W / 2 + 14} y={n.y - 6} fontSize="12" fontWeight="700" fill="var(--text-primary)">
                {n.name}
              </text>
              <text x={n.x - NODE_W / 2 + 14} y={n.y + 14} fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
                {n.local}
              </text>
              {/* dirty 灯（红） */}
              <circle
                ref={(el) => {
                  dirtyRefs.current[n.id] = el;
                }}
                cx={n.x + NODE_W / 2 - 20}
                cy={n.y}
                r="9"
                fill={DIRTY_COLOR}
                style={{ opacity: 0 }}
              />
              {/* clean 灯（绿，初始亮） */}
              <circle
                ref={(el) => {
                  cleanRefs.current[n.id] = el;
                }}
                cx={n.x + NODE_W / 2 - 20}
                cy={n.y}
                r="9"
                fill={OK_COLOR}
                style={{ opacity: 1 }}
              />
              <text x={n.x + NODE_W / 2 - 20} y={n.y + 26} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                dirty
              </text>
            </g>
          ))}

          {/* 沿链重算箭头（右侧） */}
          <g ref={recomputeRef} style={{ opacity: 0 }}>
            <path d={`M ${220 + NODE_W / 2 + 30} ${NODES[2].y} C ${220 + NODE_W / 2 + 90} ${NODES[2].y}, ${220 + NODE_W / 2 + 90} ${NODES[0].y}, ${220 + NODE_W / 2 + 30} ${NODES[0].y}`} fill="none" stroke={ACCENT} strokeWidth="1.8" markerEnd="url(#gpp18-arrow)" />
            <text x={220 + NODE_W / 2 + 96} y={(NODES[0].y + NODES[2].y) / 2} fontSize="11" fontWeight="700" fill={ACCENT} transform={`rotate(90, ${220 + NODE_W / 2 + 96}, ${(NODES[0].y + NODES[2].y) / 2})`}>
              读取触发沿链重算
            </text>
          </g>

          {/* 延迟提示 */}
          <g ref={deferRef} style={{ opacity: 0 }}>
            <rect x={440} y={NODES[1].y - 20} width={220} height={40} rx="8" fill={DIRTY_COLOR} fillOpacity="0.1" stroke={DIRTY_COLOR} strokeWidth="1.4" />
            <text x={550} y={NODES[1].y - 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={DIRTY_COLOR}>
              帧 N+1, N+2, N+3…
            </text>
            <text x={550} y={NODES[1].y + 14} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              保持脏，不重算（省算力）
            </text>
          </g>

          <defs>
            <marker id="gpp18-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
            </marker>
          </defs>

          {/* 洞见 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x={120} y={VIEW_H - 44} width={480} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={VIEW_H - 25} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              标记 + 延迟：变化时只标脏，读取时才重算一次（代价：须保住旧结果、及时设脏）
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="父节点变化只标脏后代，不立即重算；真正读取世界变换时才沿链重算一次并清标记。代价：要把上一次的派生结果留在内存、每次状态变化都得记得设脏、拖太久会读到过期值。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        脏标记（Dirty Flag）：当昂贵计算（如世界变换）的输入发生变化时，不立即重算，
        而是打上一个"脏"标记；等到真正需要结果时才重算一次并清除标记。这样把"每次变化
        都重算"优化为"需要时才算一次"。代价是要缓存上次结果、确保每次变化都设脏。
      </figcaption>
    </figure>
  );
}
