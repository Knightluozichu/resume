"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh05PrototypeSpawner>：原型克隆创建对象机制动画（GPP 第5章 · 图1）。
 *
 * 核心：用"克隆一个已配置好的现有对象"来创建新对象，避免重复初始化或庞大的构造分支。
 *
 * 场景：游戏里有多种怪物。与其为每种怪物写构造分支（spawn 函数表），不如放一个配置好的
 * "原型恶魔"，需要时 clone() 出一个状态相同的新恶魔。
 *
 * 节拍：
 *  ① 放置已配置好的原型恶魔（health 100 / attack fire / speed 2）
 *  ② 对原型调用 clone()，生成克隆恶魔 #1，状态与原型相同
 *  ③ 再 clone()，#2、#3 依次生成，id 递增
 *  ④ 克隆体都继承原型属性（hp100·fire·sp2），各自是独立实例
 *  ⑤ 新增种类"幽灵"：只需新增一个原型对象，不写构造分支
 *  ⑥ 把"如何创建"交给被克隆的对象自己，避免庞大的 spawn 函数表
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

const EMOJI = "👹";

const STEPS: readonly TeachingStep[] = [
  { label: "prototype", caption: "放置一个已配置好的原型恶魔：health 100 / attack fire / speed 2" },
  { label: "clone1", caption: "对原型调用 clone()，生成克隆恶魔 #1，状态与原型完全相同" },
  { label: "clone2", caption: "再 clone()，#2、#3 依次生成，id 递增，都从原型复制状态" },
  { label: "inherit", caption: "克隆体都继承原型属性（hp100·fire·sp2），但各自是独立实例" },
  { label: "newkind", caption: "新增种类'幽灵'：只需新增一个原型对象，不用写构造分支" },
  { label: "insight", caption: "把'如何创建'交给被克隆的对象自己，避免庞大的 spawn 函数表" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const CLONES = [
  { id: 1, x: 320 },
  { id: 2, x: 416 },
  { id: 3, x: 512 },
];

export function GppCh05PrototypeSpawner() {
  const prototypeRef = useRef<SVGGElement | null>(null);
  const gearRef = useRef<SVGGElement | null>(null);
  const cloneRefs = useRef<Record<string, SVGGElement | null>>({});
  const inheritRef = useRef<SVGGElement | null>(null);
  const newKindRef = useRef<SVGGElement | null>(null);
  const spawnTableRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① prototype（t: 0→T）：原型浮现
      tl.add(prototypeRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("prototype", 0);

      // ② clone1（t: T→2T）：齿轮转动，克隆 #1 浮现
      tl.add(gearRef.current!, { opacity: [0.4, 1, 0.6], duration: T * 0.6, ease: "inOut(2)" }, T);
      tl.add(cloneRefs.current["1"]!, { opacity: [0, 1], scale: [0.6, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.3);
      tl.label("clone1", T);

      // ③ clone2（t: 2T→3T）：齿轮再转，#2、#3 依次浮现
      tl.add(gearRef.current!, { opacity: [0.6, 1, 0.6], duration: T * 0.6, ease: "inOut(2)" }, T * 2);
      tl.add(cloneRefs.current["2"]!, { opacity: [0, 1], scale: [0.6, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.2);
      tl.add(cloneRefs.current["3"]!, { opacity: [0, 1], scale: [0.6, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.5);
      tl.label("clone2", T * 2);

      // ④ inherit（t: 3T→4T）：继承高亮浮现
      tl.add(inheritRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("inherit", T * 3);

      // ⑤ newkind（t: 4T→5T）：幽灵原型卡片浮现 + spawn 表对照淡入
      tl.add(newKindRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.add(spawnTableRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.2);
      tl.label("newkind", T * 4);

      // ⑥ insight（t: 5T→6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">👹</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型模式机制动画。与其为每种怪物写构造分支，不如放一个配置好的原型恶魔（生命100、攻击fire、速度2）。对它调用 clone 生成克隆恶魔1号，状态与原型相同；再 clone 出2号3号，id 递增。克隆体都继承原型属性 hp100 fire sp2，但各自是独立实例。新增种类幽灵时只需新增一个原型对象，不用写构造分支；对照 spawn 函数表方式要加 spawn 函数和 switch 分支。把如何创建交给被克隆的对象自己，避免庞大的 spawn 函数表。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp05-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <text x="32" y="28" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            原型：克隆一个已配置好的对象来创建新对象
          </text>
          <text x="32" y="48" fontSize="11" fill="var(--text-secondary)">
            把"如何创建"交给被克隆的对象自己，新增种类只需新增原型
          </text>

          {/* 原型对象 */}
          <g ref={prototypeRef} style={{ opacity: 0 }}>
            <rect x="40" y="80" width="180" height="130" rx="12" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x="130" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              {EMOJI} 原型恶魔
            </text>
            <text x="56" y="130" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">health: 100</text>
            <text x="56" y="148" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">attack: "fire"</text>
            <text x="56" y="166" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">speed: 2</text>
            <text x="56" y="192" fontSize="11" fill={ACCENT}>已配置好的原型</text>
          </g>

          {/* clone() 齿轮 */}
          <g ref={gearRef} style={{ opacity: 0.4 }}>
            <text x="258" y="140" textAnchor="middle" fontSize="24">⚙️</text>
            <text x="258" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-secondary)">clone()</text>
            <line x1="222" y1="145" x2="240" y2="145" stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#gpp05-arrow)" />
            <line x1="276" y1="145" x2="304" y2="145" stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#gpp05-arrow)" />
          </g>

          {/* 克隆体 */}
          <text x="320" y="80" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            克隆体（继承原型属性，id 递增）
          </text>
          {CLONES.map((c) => (
            <g key={`clone-${c.id}`} ref={(el) => { cloneRefs.current[String(c.id)] = el; }} style={{ opacity: 0 }}>
              <rect x={c.x} y="96" width="88" height="50" rx="8" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
              <text x={c.x + 12} y="118" fontSize="13">{EMOJI}</text>
              <text x={c.x + 34} y="118" fontSize="11" fontWeight="700" fill="var(--text-primary)">恶魔#{c.id}</text>
              <text x={c.x + 12} y="136" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">hp100·fire·sp2</text>
            </g>
          ))}

          {/* 继承高亮 */}
          <g ref={inheritRef} style={{ opacity: 0 }}>
            <rect x="312" y="90" width="296" height="62" rx="10" fill="none" stroke={OK_COLOR} strokeWidth="2" strokeDasharray="5 3" />
            <text x="460" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>都从原型复制状态，各自独立实例</text>
          </g>

          {/* 新增种类对照 */}
          <g ref={newKindRef} style={{ opacity: 0 }}>
            <rect x="40" y="220" width="310" height="70" rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="56" y="242" fontSize="11" fontWeight="700" fill={OK_COLOR}>原型方式 · 新增'幽灵'</text>
            <text x="56" y="262" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">ghostProto = new Ghost(...)</text>
            <text x="56" y="280" fontSize="11" fill="var(--text-secondary)">只需新增一个原型对象，无分支</text>
          </g>
          <g ref={spawnTableRef} style={{ opacity: 0 }}>
            <rect x="370" y="220" width="310" height="70" rx="8" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="386" y="242" fontSize="11" fontWeight="700" fill={WARN_COLOR}>spawn 函数表方式</text>
            <text x="386" y="262" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">case "ghost": spawnGhost();</text>
            <text x="386" y="280" fontSize="11" fill="var(--text-secondary)">要加 spawn 函数 + switch 分支，膨胀</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="310" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="334" fontSize="12" fontWeight="700" fill={OK_COLOR}>把"如何创建"交给被克隆的对象自己</text>
            <text x="56" y="354" fontSize="11" fill="var(--text-secondary)">新增种类只需新增原型，避免庞大的构造分支；浅拷贝时共享的可变子对象需小心</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="原型用一个已配置好的对象做模板，clone 出继承其状态的新对象。新增种类只需新增原型，避免庞大的 spawn 函数表。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型（Prototype）：用一个已配置好的现有对象作为原型，通过克隆（clone）来创建新对象，
        新对象继承原型的状态。这样把"如何创建"交给对象自身，新增种类只需新增原型，
        避免了庞大的构造分支（spawn 函数表）。
      </figcaption>
    </figure>
  );
}
