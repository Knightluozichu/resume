"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdLeftoverPatternsDiagram>：附录模式速览动画（Head First 设计模式 · 附录A）。
 *
 * 主体章节没展开的模式，按 GoF 三大类一屏速览：每个模式一句话意图 + 适用信号。
 * 目的不是背结构，而是建立「模式词汇表」——遇到对应问题能想起它，再深入查阅。
 *
 * 节拍：
 *  ① 创建型：Prototype（复制创建）、Builder（分步构建）
 *  ② 结构型：Bridge（抽象与实现分离）、Flyweight（共享细粒度对象）
 *  ③ 行为型：职责链、中介者、备忘录、访问者
 *  ④ 用法：记意图和适用信号，结构随用随查
 *  ⑤ 模式是词汇表——能命名问题，就能找到解法
 */

const VIEW_W = 720;
const VIEW_H = 460;

const CREATE_COLOR = "#5AA9E6";
const STRUCT_COLOR = "#C792EA";
const BEHAV_COLOR = "#3FB97F";
const ACCENT = "var(--accent)";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "creational", caption: "创建型：Prototype 复制已有实例创建，Builder 分步构建复杂对象" },
  { label: "structural", caption: "结构型：Bridge 分离抽象与实现，Flyweight 共享细粒度对象省内存" },
  { label: "behavioral", caption: "行为型：职责链传递请求、中介者集中交互、备忘录存状态、访问者加操作" },
  { label: "usage", caption: "附录的用法：记住意图和适用信号即可，结构细节随用随查" },
  { label: "vocabulary", caption: "模式是设计词汇表——能给问题命名，就能找到对应的解法" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdLeftoverPatternsDiagram() {
  const creationalRef = useRef<SVGGElement | null>(null);
  const structuralRef = useRef<SVGGElement | null>(null);
  const behavioralRef = useRef<SVGGElement | null>(null);
  const usageRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① creational（0→T）
      tl.add(creationalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("creational", 0);

      // ② structural（T→2T）
      tl.add(structuralRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("structural", T);

      // ③ behavioral（2T→3T）
      tl.add(behavioralRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("behavioral", T * 2);

      // ④ usage（3T→4T）
      tl.add(usageRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 3);
      tl.label("usage", T * 3);

      // ⑤ vocabulary（4T→5T）
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
      tl.label("vocabulary", T * 4);
    },
  });

  // 分类标题
  const categoryHeader = (x: number, y: number, text: string, color: string) => (
    <g>
      <rect x={x} y={y - 14} width={74} height={20} rx="5" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.2" />
      <text x={x + 37} y={y} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>
        {text}
      </text>
    </g>
  );

  // 模式行：名称 + 意图/适用
  const patternRow = (y: number, name: string, desc: string, color: string) => (
    <g>
      <text x={60} y={y} fontSize="11" fontWeight="700" fontFamily="monospace" fill={color}>
        {name}
      </text>
      <text x={185} y={y} fontSize="10" fill="var(--text-primary)">
        {desc}
      </text>
    </g>
  );

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
          aria-label="附录模式速览动画。创建型：Prototype 复制已有实例创建对象，Builder 分步构建复杂对象。结构型：Bridge 分离抽象与实现，Flyweight 共享细粒度对象省内存。行为型：职责链传递请求、中介者集中交互、备忘录保存恢复状态、访问者给稳定结构加操作。用法是记住意图和适用信号，结构随用随查。模式是设计词汇表，能给问题命名就能找到解法。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            附录 · 其他模式速览
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            主体章节没展开的模式——一句话意图 + 适用信号，建立模式词汇表
          </text>

          {/* 创建型 */}
          <g ref={creationalRef} style={{ opacity: 0 }}>
            {categoryHeader(48, 92, "创建型", CREATE_COLOR)}
            {patternRow(116, "Prototype", "复制已有实例创建新对象 · 适用：创建成本高、实例差异小", CREATE_COLOR)}
            {patternRow(144, "Builder", "分步构建复杂对象，构造与表示分离 · 适用：构建步骤多、组合多", CREATE_COLOR)}
          </g>

          {/* 结构型 */}
          <g ref={structuralRef} style={{ opacity: 0 }}>
            {categoryHeader(48, 184, "结构型", STRUCT_COLOR)}
            {patternRow(208, "Bridge", "抽象与实现分离，两者独立变化 · 适用：抽象和实现两个维度都要变", STRUCT_COLOR)}
            {patternRow(236, "Flyweight", "共享细粒度对象，减少内存占用 · 适用：大量相似对象、状态可外置", STRUCT_COLOR)}
          </g>

          {/* 行为型 */}
          <g ref={behavioralRef} style={{ opacity: 0 }}>
            {categoryHeader(48, 276, "行为型", BEHAV_COLOR)}
            {patternRow(300, "ChainOfResp", "请求沿处理者链传递，直到有人处理 · 适用：处理者不确定", BEHAV_COLOR)}
            {patternRow(328, "Mediator", "用中介对象集中多对多交互 · 适用：对象间耦合复杂", BEHAV_COLOR)}
            {patternRow(356, "Memento", "捕获对象状态以便日后恢复 · 适用：撤销、快照、回滚", BEHAV_COLOR)}
            {patternRow(384, "Visitor", "给稳定结构增加新操作而不改类 · 适用：结构稳定、操作常变", BEHAV_COLOR)}
          </g>

          {/* 用法说明 */}
          <g ref={usageRef} style={{ opacity: 0 }}>
            <rect x={480} y={78} width={192} height={64} rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.4" />
            <text x={576} y={98} textAnchor="middle" fontSize="10" fontWeight="700" fill={ACCENT}>
              附录怎么用？
            </text>
            <text x={576} y={116} textAnchor="middle" fontSize="9" fill="var(--text-primary)">
              记意图 + 适用信号
            </text>
            <text x={576} y={132} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              结构细节随用随查
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={404} width={540} height={40} rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={360} y={421} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              模式是设计词汇表
            </text>
            <text x={360} y={437} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              能给问题命名，就能找到对应解法——团队沟通也因此高效
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="GoF 23 个模式不必全部精通——掌握意图和适用场景，遇到问题能对上号，再深入查阅结构。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        附录收录了主体章节未展开的模式。学习的重点不是背诵每个模式的类图，
        而是建立「问题→模式」的映射：看到「创建成本高」想到 Prototype，
        看到「大量相似对象」想到 Flyweight，看到「结构稳定操作常变」想到 Visitor。
        模式词汇表的价值在于命名问题、指引方向。
      </figcaption>
    </figure>
  );
}
