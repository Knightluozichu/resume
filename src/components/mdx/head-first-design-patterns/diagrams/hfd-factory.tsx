"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdFactoryDiagram>：披萨店工厂方法动画（Head First 设计模式 · 第4章）。
 *
 * 核心：orderPizza() 只管流程（prepare/bake/cut/box），创建委托给抽象方法
 * createPizza()，由子类（NYPizzaStore/ChicagoPizzaStore）决定造哪种披萨。
 * 加新风味只需加子类，orderPizza 一行不改——依赖倒置 + 开闭原则。
 *
 * 节拍：
 *  ① orderPizza 流水线出现，createPizza 槽位是抽象（虚线）
 *  ② 创建委托给子类 NYPizzaStore
 *  ③ NYPizzaStore.createPizza 造出 NYStyleCheesePizza
 * ④ 披萨穿过 prepare→bake→cut→box 流程
 *  ⑤ 新增 ChicagoPizzaStore——同一条流水线，不同风味，orderPizza 零改动
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const NY_COLOR = "#5AA9E6";
const CHI_COLOR = "#E5B567";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

// 流水线五个步骤的几何（y 中心 138）
const PIPE_Y = 110;
const PIPE_H = 56;
const PIPE_MID = PIPE_Y + PIPE_H / 2; // 138
const STEPS_X = [
  { id: "create", label: "createPizza(type)", sub: "abstract · 委托子类", x: 40, color: ACCENT },
  { id: "prepare", label: "prepare()", sub: "准备", x: 162, color: OK_COLOR },
  { id: "bake", label: "bake()", sub: "烘焙", x: 284, color: OK_COLOR },
  { id: "cut", label: "cut()", sub: "切割", x: 406, color: OK_COLOR },
  { id: "box", label: "box()", sub: "装盒", x: 528, color: OK_COLOR },
] as const;
const BOX_W = 110;
const CREATE_CX = 95; // createPizza 中心 x
const BOX_CX = 583; // box 中心 x

const STEPS: readonly TeachingStep[] = [
  { label: "order", caption: "orderPizza(type) 是固定流程：创建 → 准备 → 烘焙 → 切割 → 装盒" },
  { label: "delegate", caption: "创建这一步是抽象方法 createPizza()，委托给子类决定" },
  { label: "create", caption: "NYPizzaStore 实现 createPizza()，造出 NYStyleCheesePizza" },
  { label: "flow", caption: "披萨穿过 prepare/bake/cut/box——流程代码不关心披萨是谁" },
  { label: "extend", caption: "新增 ChicagoPizzaStore，同一条流水线造芝加哥风味——orderPizza 零改动" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdFactoryDiagram() {
  const pipelineRef = useRef<SVGGElement | null>(null);
  const nyStoreRef = useRef<SVGGElement | null>(null);
  const chiStoreRef = useRef<SVGGElement | null>(null);
  const delegateNyRef = useRef<SVGLineElement | null>(null);
  const delegateChiRef = useRef<SVGLineElement | null>(null);
  const pizzaRef = useRef<SVGGElement | null>(null);
  const pizzaBadgeRef = useRef<SVGGElement | null>(null);
  const glowRefs = useRef<Record<string, SVGRectElement | null>>({});
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① order（0→T）：流水线淡入
      tl.add(pipelineRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("order", 0);

      // ② delegate（T→2T）：NY 店淡入，委托线画出
      tl.add(nyStoreRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.add(delegateNyRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.3);
      tl.label("delegate", T);

      // ③ create（2T→3T）：披萨在 createPizza 槽位出现
      tl.add(pizzaRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.add(pizzaBadgeRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.label("create", T * 2);

      // ④ flow（3T→4T）：披萨穿过流水线，各步依次点亮
      tl.add(
        pizzaRef.current!,
        { opacity: [1, 1], x: [CREATE_CX, BOX_CX], y: [PIPE_MID, PIPE_MID], duration: T * 0.9, ease: "inOut(2)" },
        T * 3,
      );
      ["prepare", "bake", "cut", "box"].forEach((id, i) => {
        tl.add(glowRefs.current[id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.1 + i * T * 0.2);
      });
      tl.label("flow", T * 3);

      // ⑤ extend（4T→5T）：芝加哥店淡入 + 委托线 + 结论
      tl.add(chiStoreRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.add(delegateChiRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.2);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("extend", T * 4);
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
          aria-label="工厂方法模式动画。PizzaStore 的 orderPizza 是固定流水线：创建、准备、烘焙、切割、装盒。创建这一步是抽象方法 createPizza，委托给子类。NYPizzaStore 实现它造出纽约风味披萨，披萨穿过流水线各步。新增 ChicagoPizzaStore 子类造芝加哥风味，orderPizza 流程代码零改动。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            工厂方法 · 披萨店
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            orderPizza 只管流程，createPizza 委托子类——子类决定造哪种披萨
          </text>

          {/* 流水线 */}
          <g ref={pipelineRef} style={{ opacity: 0 }}>
            {STEPS_X.map((s, i) => (
              <g key={s.id}>
                <rect
                  x={s.x}
                  y={PIPE_Y}
                  width={BOX_W}
                  height={PIPE_H}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.1"
                  stroke={s.color}
                  strokeWidth={s.id === "create" ? 1.8 : 1.4}
                  strokeDasharray={s.id === "create" ? "5 3" : undefined}
                />
                <text x={s.x + BOX_W / 2} y={PIPE_Y + 24} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
                  {s.label}
                </text>
                <text x={s.x + BOX_W / 2} y={PIPE_Y + 42} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
                  {s.sub}
                </text>
                {i < STEPS_X.length - 1 && (
                  <path
                    d={`M${s.x + BOX_W + 2} ${PIPE_MID} h8 M${s.x + BOX_W + 7} ${PIPE_MID - 4} l5 4 l-5 4`}
                    fill="none"
                    stroke="var(--text-secondary)"
                    strokeWidth="1.4"
                  />
                )}
              </g>
            ))}
            <text x={40} y={98} fontSize="11" fontWeight="700" fill={ACCENT}>
              PizzaStore.orderPizza(type)
            </text>
          </g>

          {/* 流水线步骤点亮描边（create 除外） */}
          {STEPS_X.filter((s) => s.id !== "create").map((s) => (
            <rect
              key={`glow-${s.id}`}
              ref={(el) => {
                glowRefs.current[s.id] = el;
              }}
              x={s.x - 3}
              y={PIPE_Y - 3}
              width={BOX_W + 6}
              height={PIPE_H + 6}
              rx="10"
              fill="none"
              stroke={OK_COLOR}
              strokeWidth="2.2"
              style={{ opacity: 0 }}
            />
          ))}

          {/* 披萨（沿流水线移动） */}
          <g ref={pizzaRef} style={{ opacity: 0, transform: `translate(${CREATE_CX}px, ${PIPE_MID}px)` }}>
            <circle cx={0} cy={0} r="11" fill={NY_COLOR} fillOpacity="0.9" stroke="var(--elevated)" strokeWidth="2" />
            <circle cx={0} cy={0} r="5" fill="var(--elevated)" fillOpacity="0.6" />
          </g>
          {/* 披萨类型徽章 */}
          <g ref={pizzaBadgeRef} style={{ opacity: 0 }}>
            <rect x={CREATE_CX - 78} y={180} width={156} height={22} rx="5" fill={NY_COLOR} fillOpacity="0.16" stroke={NY_COLOR} strokeWidth="1.2" />
            <text x={CREATE_CX} y={195} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill={NY_COLOR}>
              NYStyleCheesePizza
            </text>
          </g>

          {/* 委托线：createPizza → NY 店 */}
          <line ref={delegateNyRef} x1={CREATE_CX} y1={PIPE_Y + PIPE_H} x2={230} y2={250} stroke={NY_COLOR} strokeWidth="1.6" strokeDasharray="5 3" style={{ opacity: 0 }} />
          {/* 委托线：createPizza → Chicago 店 */}
          <line ref={delegateChiRef} x1={CREATE_CX} y1={PIPE_Y + PIPE_H} x2={490} y2={250} stroke={CHI_COLOR} strokeWidth="1.6" strokeDasharray="5 3" style={{ opacity: 0 }} />

          {/* NY 店 */}
          <g ref={nyStoreRef} style={{ opacity: 0 }}>
            <rect x={120} y={250} width={220} height={80} rx="10" fill={NY_COLOR} fillOpacity="0.1" stroke={NY_COLOR} strokeWidth="1.8" />
            <text x={230} y={276} textAnchor="middle" fontSize="13" fontWeight="700" fill={NY_COLOR}>
              NYPizzaStore
            </text>
            <text x={230} y={298} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              createPizza() →
            </text>
            <text x={230} y={316} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              纽约风味（薄底 + 番茄酱）
            </text>
          </g>

          {/* Chicago 店（扩展时出现） */}
          <g ref={chiStoreRef} style={{ opacity: 0 }}>
            <rect x={380} y={250} width={220} height={80} rx="10" fill={CHI_COLOR} fillOpacity="0.1" stroke={CHI_COLOR} strokeWidth="1.8" />
            <text x={490} y={276} textAnchor="middle" fontSize="13" fontWeight="700" fill={CHI_COLOR}>
              ChicagoPizzaStore
            </text>
            <text x={490} y={298} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              createPizza() →
            </text>
            <text x={490} y={316} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              芝加哥风味（厚底 + 芝士）
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={380} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={399} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              加新风味 = 加一个子类，orderPizza 流程代码零改动——开闭原则
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="PizzaStore 只依赖 Pizza 抽象类，不依赖任何具体披萨——高层不依赖低层，两者都依赖抽象（依赖倒置）。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工厂方法把对象创建从使用中解耦：orderPizza() 负责不变的流程，
        createPizza() 这个抽象方法由子类实现，决定创建哪种产品。
        新增产品只需新增工厂子类，已有代码不受影响。
      </figcaption>
    </figure>
  );
}
