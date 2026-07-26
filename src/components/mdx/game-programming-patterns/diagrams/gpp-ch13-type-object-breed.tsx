"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh13TypeObjectBreed>：类型对象替代继承机制动画（GPP 第13章 · 图1）。
 *
 * 核心：与其为每种"类型"建一个子类，不如造一个"类型对象"来描述该类型的属性，实例引用它——
 * 类型可在运行时定义和增减。
 *
 * 场景：怪物系统。不为 Dragon/Ghost 各写子类，而建一个 Breed 类型对象（health、attack、
 * sprite）。每个 Monster 实例引用某个 Breed。新增怪物种类只需新增一个 Breed 数据，无需改代码。
 *
 * 节拍：
 *  ① Breed 类型对象（Dragon/Troll/Ghost）——运行时数据，可增删
 *  ② Monster 实例，各自引用一个 Breed
 *  ③ 实例指向共享的 Breed 类型对象（引用线）
 *  ④ 同种实例共享同一个 Breed（m1、m2 都是 Dragon）
 *  ⑤ 新增种类"幽灵龙"：只需加一条 Breed 记录，无需子类/重编译
 *  ⑥ "类型"从编译期的类降级为运行期的数据，获得灵活性
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

type Breed = { id: string; name: string; emoji: string; color: string; health: number; attack: string };

const BREEDS: readonly Breed[] = [
  { id: "dragon", name: "Dragon", emoji: "🐉", color: "#E5675C", health: 100, attack: "fire" },
  { id: "troll", name: "Troll", emoji: "🧌", color: "#3FB97F", health: 80, attack: "club" },
  { id: "ghost", name: "Ghost", emoji: "👻", color: "#5AA9E6", health: 30, attack: "curse" },
];

const INSTANCES = [
  { id: "m1", breed: "dragon" },
  { id: "m2", breed: "dragon" },
  { id: "m3", breed: "troll" },
  { id: "m4", breed: "ghost" },
  { id: "m5", breed: "troll" },
  { id: "m6", breed: "ghost" },
];

const BREED_MAP: Record<string, Breed> = Object.fromEntries(BREEDS.map((b) => [b.id, b]));
const breedCenterX = (breedId: string) => 40 + BREEDS.findIndex((b) => b.id === breedId) * 220 + 100;

const STEPS: readonly TeachingStep[] = [
  { label: "breeds", caption: "Breed 类型对象：Dragon / Troll / Ghost，是运行时数据，可增删" },
  { label: "instances", caption: "Monster 实例登场，各自引用一个 Breed" },
  { label: "reference", caption: "实例指向共享的 Breed 类型对象（引用线）" },
  { label: "share", caption: "同种实例共享同一个 Breed：m1、m2 都引用 Dragon" },
  { label: "newtype", caption: "新增种类'幽灵龙'：只需加一条 Breed 记录，无需新增子类、无需重新编译" },
  { label: "insight", caption: "'类型'从编译期的类降级为运行期的数据，可运行时增减、甚至让玩家自定义" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh13TypeObjectBreed() {
  const breedsRef = useRef<SVGGElement | null>(null);
  const instancesRef = useRef<SVGGElement | null>(null);
  const linesRef = useRef<SVGGElement | null>(null);
  const shareRef = useRef<SVGGElement | null>(null);
  const newTypeRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① breeds（t: 0→T）：类型对象浮现
      tl.add(breedsRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("breeds", 0);

      // ② instances（t: T→2T）：实例浮现
      tl.add(instancesRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T);
      tl.label("instances", T);

      // ③ reference（t: 2T→3T）：引用线亮起
      tl.add(linesRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 2);
      tl.label("reference", T * 2);

      // ④ share（t: 3T→4T）：共享高亮（m1/m2）
      tl.add(shareRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("share", T * 3);

      // ⑤ newtype（t: 4T→5T）：新增 Breed 记录浮现
      tl.add(newTypeRef.current!, { opacity: [0, 1], scale: [0.8, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("newtype", T * 4);

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
            <span aria-hidden="true">🧬</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型对象机制动画。不为每种怪物写子类，而建 Breed 类型对象描述该种怪物属性：Dragon 生命100攻击fire、Troll 生命80攻击club、Ghost 生命30攻击curse，它们是运行时数据可增删。Monster 实例各自引用一个 Breed，实例指向共享的类型对象，同种实例如 m1 m2 都引用 Dragon 共享同一个 Breed。新增种类幽灵龙只需加一条 Breed 记录，无需新增子类或重新编译。类型从编译期的类降级为运行期的数据，可运行时增减甚至让玩家自定义。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="28" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类型对象：用数据对象描述"类型"，替代继承
          </text>
          <text x="32" y="48" fontSize="11" fill="var(--text-secondary)">
            实例引用一个 Breed 类型对象；新增种类只需新增数据，无需改代码
          </text>

          {/* Breed 类型对象 */}
          <g ref={breedsRef} style={{ opacity: 0 }}>
            <text x="40" y="80" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
              Breed 类型对象（运行时数据，可增删）
            </text>
            {BREEDS.map((b, i) => {
              const x = 40 + i * 220;
              return (
                <g key={b.id}>
                  <rect x={x} y="92" width={200} height={92} rx="10" fill={b.color} fillOpacity="0.1" stroke={b.color} strokeWidth="1.5" />
                  <text x={x + 14} y="118" fontSize="13" fontWeight="700" fill="var(--text-primary)">{b.emoji} {b.name}</text>
                  <text x={x + 14} y="140" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">health: {b.health}</text>
                  <text x={x + 14} y="158" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">attack: "{b.attack}"</text>
                  <text x={x + 14} y="176" fontSize="11" fill={b.color}>类型对象（共享）</text>
                </g>
              );
            })}
          </g>

          {/* 引用线 */}
          <g ref={linesRef} style={{ opacity: 0 }}>
            {INSTANCES.map((inst, i) => {
              const breed = BREED_MAP[inst.breed];
              const x = 40 + i * 108;
              return (
                <line key={`line-${inst.id}`} x1={x + 44} y1={248} x2={breedCenterX(inst.breed)} y2={184} stroke={breed.color} strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 3" />
              );
            })}
          </g>

          {/* Monster 实例 */}
          <g ref={instancesRef} style={{ opacity: 0 }}>
            <text x="40" y="230" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
              Monster 实例（各自引用一个 Breed）
            </text>
            {INSTANCES.map((inst, i) => {
              const breed = BREED_MAP[inst.breed];
              const x = 40 + i * 108;
              return (
                <g key={inst.id}>
                  <rect x={x} y={248} width={88} height={50} rx="8" fill={breed.color} fillOpacity="0.06" stroke={breed.color} strokeWidth="1.2" />
                  <text x={x + 12} y={270} fontSize="13">{breed.emoji}</text>
                  <text x={x + 34} y={270} fontSize="11" fontWeight="700" fill="var(--text-primary)">{inst.id}</text>
                  <text x={x + 12} y={288} fontSize="11" fill="var(--text-secondary)">→ {breed.name}</text>
                </g>
              );
            })}
          </g>

          {/* 共享高亮（m1/m2 → Dragon） */}
          <g ref={shareRef} style={{ opacity: 0 }}>
            <rect x="36" y="244" width={88 + 8} height={58} rx="10" fill="none" stroke={ACCENT} strokeWidth="2.4" />
            <rect x="144" y="244" width={88 + 8} height={58} rx="10" fill="none" stroke={ACCENT} strokeWidth="2.4" />
            <text x="40" y="322" fontSize="11" fontWeight="700" fill={ACCENT}>m1、m2 共享同一个 Dragon Breed（类型对象只一份）</text>
          </g>

          {/* 新增种类 */}
          <g ref={newTypeRef} style={{ opacity: 0 }}>
            <rect x="40" y="338" width="360" height="52" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="56" y="360" fontSize="12" fontWeight="700" fill={OK_COLOR}>🐲 GhostDragon（新增一条 Breed 记录）</text>
            <text x="56" y="380" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">health: 120, attack: "soul" — 无需子类/重编译</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="420" y="338" width="260" height="52" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="436" y="360" fontSize="11" fontWeight="700" fill={OK_COLOR}>"类型"降级为运行时数据</text>
            <text x="436" y="380" fontSize="11" fill="var(--text-secondary)">可运行时增减，甚至让玩家自定义</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="类型对象用数据对象（Breed）描述类型，实例引用它。类型从编译期的类降级为运行期的数据，新增种类只需新增数据。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类型对象（Type Object）：不为每种类型建一个子类，而是造一个"类型对象"（如 Breed）
        来描述该类型的属性，实例引用它。于是"类型"从编译期的类降级为运行期的数据，
        可以在运行时定义、增减，甚至让玩家自定义。
      </figcaption>
    </figure>
  );
}
