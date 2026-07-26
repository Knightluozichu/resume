"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh17DataLocalityCache>：数据局部性与缓存行动画（GPP 第17章）。
 *
 * 核心：把会被一起处理的数据在内存中连续存放，喂饱 CPU 缓存行（cache line），
 * 避免昂贵的缓存缺失。
 *
 * 场景：遍历更新所有游戏实体。
 *  数组（连续）：实体 0,1,2,3 紧挨着占满一个 cache line，扫描头平滑滑过，
 *    一次缺失就带入 4 个实体——命中率高。
 *  链表（散落）：节点散布内存各处，扫描头按指针跳来跳去，每访问一个就缺失一次。
 *
 * 节拍：
 *  ① 数组连续：扫描头平滑扫过一个 cache line，带入 4 个实体（绿·命中）
 *  ② 数组缺失计数低（1 次）
 *  ③ 链表散落：扫描头按指针跳跃，每次只命中一个（红·缺失）
 *  ④ 链表缺失计数高（4 次）
 *  ⑤ 洞见：连续 = 缓存友好 = 快
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const MISS_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

// 数组（连续）布局
const ARR_X = 90;
const ARR_Y = 130;
const CELL_W = 64;
const CELL_H = 44;

// 链表散落节点位置
const NODES = [
  { x: 110, y: 320 },
  { x: 320, y: 380 },
  { x: 230, y: 300 },
  { x: 480, y: 350 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "arr-scan", caption: "数组连续存放：4 个实体占满一个 cache line，扫描头平滑滑过，一次缺失带入整行（绿·命中）" },
  { label: "arr-count", caption: "数组遍历 4 个实体只缺失 1 次——cache line 把相邻数据一并带入" },
  { label: "list-scan", caption: "链表散落各处：扫描头按指针跳来跳去，每访问一个节点就缺失一次（红·缺失）" },
  { label: "list-count", caption: "链表遍历 4 个节点缺失 4 次——每次都去内存不同处取，cache 帮不上忙" },
  { label: "insight", caption: "数据局部性：把一起处理的数据连续存放，喂饱 cache line，性能藏在内存布局里" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh17DataLocalityCache() {
  const arrHeadRef = useRef<SVGGElement | null>(null);
  const arrCountRef = useRef<SVGGElement | null>(null);
  const listRef = useRef<SVGGElement | null>(null);
  const listHeadRef = useRef<SVGGElement | null>(null);
  const listCountRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① arr-scan（t: 0→T）：扫描头平滑扫过数组（4 格）
      tl.add(
        arrHeadRef.current!,
        { x: [ARR_X, ARR_X + CELL_W * 4], duration: T * 0.9, ease: "inOut(2)" },
        0,
      );
      tl.label("arr-scan", 0);

      // ② arr-count（t: T→2T）：缺失计数 1（绿）
      tl.add(arrCountRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("arr-count", T);

      // ③ list-scan（t: 2T→3T）：链表淡入，扫描头在散落节点间跳跃
      tl.add(listRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      NODES.forEach((n, i) => {
        tl.add(
          listHeadRef.current!,
          { x: [i === 0 ? NODES[0].x : NODES[i - 1].x, n.x], y: [i === 0 ? NODES[0].y : NODES[i - 1].y, n.y], duration: T * 0.2, ease: "out(3)" },
          T * 2 + i * T * 0.2,
        );
      });
      tl.label("list-scan", T * 2);

      // ④ list-count（t: 3T→4T）：缺失计数 4（红）
      tl.add(listCountRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("list-count", T * 3);

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
          aria-label="数据局部性动画。数组连续存放：实体 0、1、2、3 紧挨着占满一个 cache line，扫描头平滑滑过，一次缓存缺失就带入整行 4 个实体，命中率高，遍历只缺失 1 次。链表散落各处：节点散布内存，扫描头按指针跳来跳去，每访问一个节点就缺失一次，遍历缺失 4 次。把一起处理的数据连续存放能喂饱缓存行，性能藏在内存布局里。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            数据局部性：连续存放喂饱缓存行
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            数组连续 → 一次缺失带入整行；链表散落 → 每次访问都缺失
          </text>

          {/* 数组（连续） */}
          <text x={ARR_X} y={ARR_Y - 30} fontSize="11" fontWeight="700" fill={OK_COLOR}>
            数组（结构体数组，连续内存）
          </text>
          {/* cache line 框（包住 4 格） */}
          <rect x={ARR_X - 6} y={ARR_Y - 6} width={CELL_W * 4 + 12} height={CELL_H + 12} rx="8" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.4" strokeDasharray="4 3" />
          <text x={ARR_X + CELL_W * 2} y={ARR_Y - 12} textAnchor="middle" fontSize="11" fill={OK_COLOR}>
            一个 cache line（64B）
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={`arr-${i}`}>
              <rect x={ARR_X + i * CELL_W} y={ARR_Y} width={CELL_W - 4} height={CELL_H} rx="5" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.4" />
              <text x={ARR_X + i * CELL_W + (CELL_W - 4) / 2} y={ARR_Y + CELL_H / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
                实体{i}
              </text>
            </g>
          ))}
          {/* 数组扫描头 */}
          <g ref={arrHeadRef} style={{ transform: `translateX(${ARR_X}px)` }}>
            <path d="M 0 -18 l -7 -12 l 14 0 z" fill={OK_COLOR} transform={`translate(0, ${ARR_Y})`} />
          </g>
          {/* 数组缺失计数 */}
          <g ref={arrCountRef} style={{ opacity: 0 }}>
            <rect x={ARR_X + CELL_W * 4 + 30} y={ARR_Y} width={150} height={CELL_H} rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={ARR_X + CELL_W * 4 + 105} y={ARR_Y + 18} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              缓存缺失
            </text>
            <text x={ARR_X + CELL_W * 4 + 105} y={ARR_Y + 36} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>
              1 次 ✓
            </text>
          </g>

          {/* 链表（散落） */}
          <g ref={listRef} style={{ opacity: 0 }}>
            <text x={ARR_X} y={280} fontSize="11" fontWeight="700" fill={MISS_COLOR}>
              链表（节点散落内存各处）
            </text>
            {/* 指针连线 */}
            {NODES.slice(0, -1).map((n, i) => (
              <line key={`ptr-${i}`} x1={n.x + 20} y1={n.y} x2={NODES[i + 1].x - 20} y2={NODES[i + 1].y} stroke={MISS_COLOR} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#gpp17-arrow)" />
            ))}
            {/* 节点 */}
            {NODES.map((n, i) => (
              <g key={`node-${i}`}>
                <rect x={n.x - 24} y={n.y - 18} width={48} height={36} rx="6" fill={MISS_COLOR} fillOpacity="0.14" stroke={MISS_COLOR} strokeWidth="1.4" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
                  节点{i}
                </text>
              </g>
            ))}
          </g>
          {/* 链表扫描头 */}
          <g ref={listHeadRef} style={{ transform: `translate(${NODES[0].x}px, ${NODES[0].y}px)` }}>
            <circle cx="0" cy="-30" r="6" fill={MISS_COLOR} />
          </g>
          {/* 链表缺失计数 */}
          <g ref={listCountRef} style={{ opacity: 0 }}>
            <rect x={540} y={300} width={150} height={CELL_H + 12} rx="8" fill={MISS_COLOR} fillOpacity="0.12" stroke={MISS_COLOR} strokeWidth="1.6" />
            <text x={615} y={322} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              缓存缺失
            </text>
            <text x={615} y={342} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill={MISS_COLOR}>
              4 次 ✗
            </text>
          </g>

          <defs>
            <marker id="gpp17-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={MISS_COLOR} />
            </marker>
          </defs>

          {/* 洞见 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x={ARR_X} y={VIEW_H - 44} width={560} height={30} rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1.6" />
            <text x={ARR_X + 280} y={VIEW_H - 25} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              连续 = 缓存友好 = 快；性能藏在内存布局里，而非仅算法里
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="CPU 按 cache line（如 64B）整块取数据。连续存放让一次缺失带入多个实体；散落存放则每次访问都缺失。优化数据布局（连续数组、打包数据、热冷分离）常比优化算法更能提速。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        数据局部性（Data Locality）：CPU 缓存按 cache line 整块读写内存。把会一起处理的
        数据连续存放，一次缓存缺失就能带入一整行，命中率高；若数据散落（如指针追逐的链表），
        每次访问几乎都缺失。因此内存布局常常比算法更影响性能——连续即缓存友好。
      </figcaption>
    </figure>
  );
}
