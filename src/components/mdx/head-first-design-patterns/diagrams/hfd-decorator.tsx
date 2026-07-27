"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdDecoratorDiagram>：咖啡装饰器模式动画（Head First 设计模式 · 第3章）。
 *
 * 核心：装饰器继承 Component 获得类型、持有 Component 引用获得行为委托，
 * 层层包裹动态叠加职责。cost() 调用链由外向内委托，价格由内向外累加。
 *
 * 节拍：
 *  ① DarkRoast 具体组件（$0.99）
 *  ② Mocha 装饰器包裹（+$0.20）
 *  ③ Whip 装饰器再包裹（+$0.10）
 *  ④ cost() 由外向内层层委托，算出 $1.29
 *  ⑤ 对比继承方案类爆炸——装饰器用组合动态叠加，双份摩卡只需再包一层
 */

const VIEW_W = 720;
const VIEW_H = 450;

const ACCENT = "#E5B567"; // DarkRoast 咖啡色
const MOCHA = "#C792EA";
const WHIP = "#5AA9E6";
const OK_COLOR = "#3FB97F";
const DANGER = "#E5534B";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "component", caption: "DarkRoast 是具体组件，继承 Beverage，自己的价格 $0.99" },
  { label: "mocha", caption: "Mocha 装饰器包裹 DarkRoast——继承 Beverage 获得类型，持有引用获得委托" },
  { label: "whip", caption: "Whip 装饰器再包一层——装饰器可以继续被装饰器包裹" },
  { label: "cost", caption: "cost() 由外向内层层委托，价格由内向外累加：0.99 + 0.20 + 0.10 = 1.29" },
  { label: "compare", caption: "继承方案每种组合一个子类（15 个还爆炸），装饰器用组合动态叠加，双份摩卡只需再包一层" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdDecoratorDiagram() {
  const coreRef = useRef<SVGGElement | null>(null);
  const mochaRef = useRef<SVGGElement | null>(null);
  const whipRef = useRef<SVGGElement | null>(null);
  const calc1Ref = useRef<SVGTextElement | null>(null);
  const calc2Ref = useRef<SVGTextElement | null>(null);
  const calc3Ref = useRef<SVGTextElement | null>(null);
  const calcTotalRef = useRef<SVGGElement | null>(null);
  const packetRef = useRef<SVGGElement | null>(null);
  const compareRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① component（0→T）：DarkRoast 核心 + 第一行算式
      tl.add(coreRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(calc1Ref.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("component", 0);

      // ② mocha（T→2T）：Mocha 环包裹 + 第二行算式
      tl.add(mochaRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.add(calc2Ref.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.4);
      tl.label("mocha", T);

      // ③ whip（2T→3T）：Whip 环包裹 + 第三行算式
      tl.add(whipRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.add(calc3Ref.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.4);
      tl.label("whip", T * 2);

      // ④ cost（3T→4T）：委托包由外向内穿过各层，总价点亮
      tl.add(
        packetRef.current!,
        { opacity: [1, 1], x: [100, 240], y: [198, 198], duration: T * 0.7, ease: "inOut(2)" },
        T * 3,
      );
      tl.add(packetRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 3.7);
      tl.add(calcTotalRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 3.5);
      tl.label("cost", T * 3);

      // ⑤ compare（4T→5T）：继承 vs 装饰器对比 + 结论
      tl.add(compareRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("compare", T * 4);
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
          aria-label="装饰器模式动画。DarkRoast 具体组件价格 0.99 美元，Mocha 装饰器包裹它加 0.20 美元，Whip 装饰器再包一层加 0.10 美元。调用 cost 时由外向内层层委托，价格由内向外累加得到 1.29 美元。对比继承方案需要 15 个组合子类且继续爆炸，装饰器用组合动态叠加，双份摩卡只需再包一层。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            装饰器模式 · 星巴克咖啡
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            装饰器层层包裹，cost() 层层委托——动态叠加职责，不用继承
          </text>

          {/* Whip 环（最外层） */}
          <g ref={whipRef} style={{ opacity: 0 }}>
            <rect x={95} y={95} width={310} height={205} rx="16" fill={WHIP} fillOpacity="0.07" stroke={WHIP} strokeWidth="1.8" />
            <text x={250} y={116} textAnchor="middle" fontSize="12" fontWeight="700" fill={WHIP}>
              Whip（奶泡） +$0.10
            </text>
          </g>

          {/* Mocha 环（中层） */}
          <g ref={mochaRef} style={{ opacity: 0 }}>
            <rect x={135} y={128} width={230} height={140} rx="12" fill={MOCHA} fillOpacity="0.08" stroke={MOCHA} strokeWidth="1.8" />
            <text x={250} y={149} textAnchor="middle" fontSize="12" fontWeight="700" fill={MOCHA}>
              Mocha（摩卡） +$0.20
            </text>
          </g>

          {/* DarkRoast 核心 */}
          <g ref={coreRef} style={{ opacity: 0 }}>
            <rect x={180} y={162} width={140} height={72} rx="8" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
            <text x={250} y={192} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              DarkRoast
            </text>
            <text x={250} y={212} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              $0.99
            </text>
          </g>

          {/* cost() 委托包（由外向内） */}
          <g ref={packetRef} style={{ opacity: 0, transform: "translate(100px, 198px)" }}>
            <circle cx={0} cy={0} r="7" fill={OK_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 算式面板 */}
          <rect x={470} y={95} width={210} height={205} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x={575} y={118} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            cost() 层层委托
          </text>
          <text ref={calc1Ref} x={485} y={150} fontSize="11" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 0 }}>
            DarkRoast    $0.99
          </text>
          <text ref={calc2Ref} x={485} y={178} fontSize="11" fontFamily="monospace" fill={MOCHA} style={{ opacity: 0 }}>
            + Mocha      $0.20
          </text>
          <text ref={calc3Ref} x={485} y={206} fontSize="11" fontFamily="monospace" fill={WHIP} style={{ opacity: 0 }}>
            + Whip       $0.10
          </text>
          <line x1={485} y1={222} x2={665} y2={222} stroke="var(--border)" strokeWidth="1" />
          <g ref={calcTotalRef} style={{ opacity: 0 }}>
            <text x={485} y={252} fontSize="14" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>
              = $1.29
            </text>
            <text x={485} y={280} fontSize="10" fill="var(--text-secondary)">
              Dark Roast, Mocha, Whip
            </text>
          </g>

          {/* 继承 vs 装饰器对比 */}
          <g ref={compareRef} style={{ opacity: 0 }}>
            <rect x={32} y={320} width={656} height={32} rx="8" fill={DANGER} fillOpacity="0.08" stroke={DANGER} strokeWidth="1.3" />
            <text x={48} y={340} fontSize="11" fontWeight="700" fill={DANGER}>
              ✗ 继承方案：每种组合一个子类——MochaWhipDarkRoast… 4 种调料要 15 个类，加调料就爆炸
            </text>
            <rect x={32} y={360} width={656} height={32} rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.3" />
            <text x={48} y={380} fontSize="11" fontWeight="700" fill={OK_COLOR}>
              ✓ 装饰器方案：调料各是一个类，运行时层层包裹自由组合，双份摩卡就再包一层 Mocha
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={402} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={421} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              动态给对象叠加职责，比继承更灵活——行为来自组合，类型来自继承
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="装饰器继承 Component 是为了类型匹配（能顶替被装饰对象），持有引用是为了行为委托。Java I/O 的 InputStream 就是它。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        装饰器模式动态地为对象添加额外职责。装饰器与被装饰对象实现同一接口，
        客户端无感知；功能通过层层包裹叠加，而非继承出一堆组合子类。
        需要多少功能，就包多少层——运行时组合，互不干扰。
      </figcaption>
    </figure>
  );
}
