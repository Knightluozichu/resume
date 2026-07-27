"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdIteratorCompositeDiagram>：菜单树组合+迭代器动画（Head First 设计模式 · 第9章）。
 *
 * 核心：Composite 把菜单（容器）和菜单项（叶子）统一成 MenuComponent，组成树形结构；
 * Iterator 提供统一遍历，透明地穿过嵌套子菜单——Waitress 不需要知道菜单的嵌套方式。
 *
 * 节拍：
 *  ① 树形结构：allMenus 根菜单下挂三个菜单，DinerMenu 还嵌套 DessertMenu
 *  ② 统一对待：容器和叶子都实现 MenuComponent，可以一视同仁
 *  ③ 迭代器从根开始遍历，依次访问各节点
 *  ④ 迭代器透明进入嵌套的 DessertMenu——不关心是容器还是叶子
 *  ⑤ Composite 让树统一，Iterator 让遍历统一——客户代码与结构解耦
 */

const VIEW_W = 720;
const VIEW_H = 450;

const CONTAINER = "var(--accent)";
const LEAF = "#3FB97F";
const VISIT = "#E5B567";

const T = TEACHING_BEAT_MS;

// 节点几何（id → 位置与尺寸）
const NODES = {
  root: { x: 280, y: 85, w: 160, h: 44 },
  pancake: { x: 40, y: 170, w: 170, h: 44 },
  diner: { x: 275, y: 170, w: 170, h: 44 },
  cafe: { x: 510, y: 170, w: 170, h: 44 },
  dessert: { x: 225, y: 255, w: 140, h: 40 },
  veggie: { x: 385, y: 255, w: 140, h: 40 },
  applepie: { x: 225, y: 335, w: 140, h: 40 },
} as const;

const STEPS: readonly TeachingStep[] = [
  { label: "tree", caption: "菜单是树：allMenus 根下挂三个菜单，DinerMenu 里还嵌套 DessertMenu" },
  { label: "uniform", caption: "容器（Menu）和叶子（MenuItem）都实现 MenuComponent——可以一视同仁" },
  { label: "iterate", caption: "createIterator() 从根开始，依次访问每个节点" },
  { label: "nested", caption: "迭代器透明地进入嵌套的 DessertMenu——不关心当前是容器还是叶子" },
  { label: "value", caption: "Composite 让树结构统一，Iterator 让遍历统一——客户代码与嵌套方式解耦" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdIteratorCompositeDiagram() {
  const treeRef = useRef<SVGGElement | null>(null);
  const uniformRef = useRef<SVGGElement | null>(null);
  const nestedNoteRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);
  const glowRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① tree（0→T）：整棵树淡入
      tl.add(treeRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("tree", 0);

      // ② uniform（T→2T）：统一对待徽章
      tl.add(uniformRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T);
      tl.label("uniform", T);

      // ③ iterate（2T→3T）：依次点亮 root → pancake → diner → veggie
      ["root", "pancake", "diner", "veggie"].forEach((id, i) => {
        tl.add(glowRefs.current[id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2 + i * T * 0.2);
      });
      tl.label("iterate", T * 2);

      // ④ nested（3T→4T）：点亮 dessert → applepie → cafe，嵌套说明浮现
      ["dessert", "applepie", "cafe"].forEach((id, i) => {
        tl.add(glowRefs.current[id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3 + i * T * 0.2);
      });
      tl.add(nestedNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.3);
      tl.label("nested", T * 3);

      // ⑤ value（4T→5T）：结论
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("value", T * 4);
    },
  });

  // 节点渲染辅助
  const containerNode = (id: keyof typeof NODES, name: string, sub: string) => {
    const n = NODES[id];
    return (
      <g key={id}>
        <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8" fill={CONTAINER} fillOpacity="0.1" stroke={CONTAINER} strokeWidth="1.6" />
        <text x={n.x + n.w / 2} y={n.y + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
          {name}
        </text>
        <text x={n.x + n.w / 2} y={n.y + 34} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
          {sub}
        </text>
      </g>
    );
  };
  const leafNode = (id: keyof typeof NODES, name: string, sub: string) => {
    const n = NODES[id];
    return (
      <g key={id}>
        <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8" fill={LEAF} fillOpacity="0.1" stroke={LEAF} strokeWidth="1.4" />
        <text x={n.x + n.w / 2} y={n.y + 17} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
          {name}
        </text>
        <text x={n.x + n.w / 2} y={n.y + 32} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
          {sub}
        </text>
      </g>
    );
  };

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
          aria-label="组合与迭代器模式动画。菜单组成树形结构：allMenus 根菜单下挂煎饼屋菜单、餐厅菜单、咖啡菜单，餐厅菜单里还嵌套甜点菜单和菜单项。容器和叶子都实现 MenuComponent 接口，可以一视同仁。迭代器从根开始依次访问每个节点，透明地进入嵌套的甜点菜单，不关心当前是容器还是叶子。组合让树结构统一，迭代器让遍历统一，客户代码与嵌套方式解耦。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            组合 + 迭代器 · 餐厅菜单
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            菜单组成树，迭代器统一遍历——容器和叶子一视同仁
          </text>

          {/* 整棵树 */}
          <g ref={treeRef} style={{ opacity: 0 }}>
            {/* 树边 */}
            <line x1={360} y1={129} x2={125} y2={170} stroke="var(--border)" strokeWidth="1.3" />
            <line x1={360} y1={129} x2={360} y2={170} stroke="var(--border)" strokeWidth="1.3" />
            <line x1={360} y1={129} x2={595} y2={170} stroke="var(--border)" strokeWidth="1.3" />
            <line x1={360} y1={214} x2={295} y2={255} stroke="var(--border)" strokeWidth="1.3" />
            <line x1={360} y1={214} x2={455} y2={255} stroke="var(--border)" strokeWidth="1.3" />
            <line x1={295} y1={295} x2={295} y2={335} stroke="var(--border)" strokeWidth="1.3" />

            {/* 容器节点 */}
            {containerNode("root", "allMenus", "Menu · 容器（根）")}
            {containerNode("pancake", "PancakeHouseMenu", "Menu · 容器")}
            {containerNode("diner", "DinerMenu", "Menu · 容器")}
            {containerNode("cafe", "CafeMenu", "Menu · 容器")}
            {containerNode("dessert", "DessertMenu", "Menu · 嵌套子菜单")}

            {/* 叶子节点 */}
            {leafNode("veggie", "VegetarianBLT", "MenuItem · 叶子")}
            {leafNode("applepie", "Apple Pie", "MenuItem · 叶子")}
          </g>

          {/* 遍历点亮描边 */}
          {Object.entries(NODES).map(([id, n]) => (
            <rect
              key={`glow-${id}`}
              ref={(el) => {
                glowRefs.current[id] = el;
              }}
              x={n.x - 3}
              y={n.y - 3}
              width={n.w + 6}
              height={n.h + 6}
              rx="10"
              fill="none"
              stroke={VISIT}
              strokeWidth="2.4"
              style={{ opacity: 0 }}
            />
          ))}

          {/* 统一对待徽章 */}
          <g ref={uniformRef} style={{ opacity: 0 }}>
            <rect x={40} y={335} width={170} height={40} rx="8" fill={CONTAINER} fillOpacity="0.1" stroke={CONTAINER} strokeWidth="1.4" />
            <text x={125} y={352} textAnchor="middle" fontSize="10" fontWeight="700" fill={CONTAINER}>
              容器 + 叶子
            </text>
            <text x={125} y={367} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              都实现 MenuComponent
            </text>
          </g>

          {/* 嵌套说明 */}
          <g ref={nestedNoteRef} style={{ opacity: 0 }}>
            <rect x={440} y={280} width={240} height={40} rx="8" fill={VISIT} fillOpacity="0.12" stroke={VISIT} strokeWidth="1.4" />
            <text x={560} y={297} textAnchor="middle" fontSize="10" fontWeight="700" fill={VISIT}>
              迭代器透明进入嵌套菜单
            </text>
            <text x={560} y={312} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              hasNext() / next() 不关心容器还是叶子
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={392} width={540} height={40} rx="8" fill={LEAF} fillOpacity="0.1" stroke={LEAF} strokeWidth="1.6" />
            <text x={360} y={409} textAnchor="middle" fontSize="12" fontWeight="700" fill={LEAF}>
              Composite 让树统一，Iterator 让遍历统一
            </text>
            <text x={360} y={425} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              Waitress 调一个 printMenu() 打印全部——不关心菜单怎么嵌套
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="组合模式把对象组成树形结构，迭代器模式提供统一遍历——两者配合，客户代码与对象的嵌套结构彻底解耦。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组合模式把容器和叶子统一成同一接口，组成树形结构，客户可以一视同仁地对待单个对象和组合对象；
        迭代器模式提供顺序访问聚合对象的方式，不暴露其内部表示。
        两者配合：菜单任意嵌套，遍历代码始终如一。
      </figcaption>
    </figure>
  );
}
