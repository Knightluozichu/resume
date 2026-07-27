"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdStrategyDiagram>：鸭子策略模式动画（Head First 设计模式 · 第1章）。
 *
 * 核心：把飞行行为抽成 FlyBehavior 接口，Duck 用组合持有引用并委托调用；
 * setFlyBehavior() 让行为在运行时替换——一只不会飞的鸭子可以获得火箭飞行。
 *
 * 节拍：
 *  ① 行为族：FlyBehavior 接口 + 三个具体策略（翅膀飞/不会飞/火箭飞）
 *  ② 组合注入：ModelDuck 持有 flyBehavior 引用，初始指向 FlyNoWay
 *  ③ 委托调用：performFly() 委托给 flyBehavior.fly() → "不会飞"
 *  ④ 运行时切换：setFlyBehavior(new FlyRocketPowered())，引用改指火箭策略
 *  ⑤ 再次委托：performFly() → "火箭飞行！" 新增行为只需加实现类，Duck 零改动
 */

const VIEW_W = 720;
const VIEW_H = 450;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const PACKET_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

// Duck（Context）几何
const DUCK_X = 48;
const DUCK_Y = 160;
const DUCK_W = 200;
const DUCK_H = 140;
const DUCK_RIGHT = DUCK_X + DUCK_W; // 248
const REF_Y = DUCK_Y + 72; // 引用出口 y = 232

// 策略族几何
const STRAT_X = 440;
const STRAT_W = 232;
const STRAT_H = 48;

const NOWAY_Y = 258; // FlyNoWay 中心
const ROCKET_Y = 322; // FlyRocketPowered 中心

const STEPS: readonly TeachingStep[] = [
  { label: "family", caption: "把飞行行为抽成 FlyBehavior 接口，三个具体策略各自封装一种飞法" },
  { label: "compose", caption: "ModelDuck 用组合持有 flyBehavior 引用，初始指向 FlyNoWay（不会飞）" },
  { label: "delegate", caption: "performFly() 委托给 flyBehavior.fly()——Duck 只管调接口，不关心怎么飞" },
  { label: "swap", caption: "setFlyBehavior(new FlyRocketPowered())——引用在运行时改指火箭策略" },
  { label: "fly", caption: "再次 performFly() → 火箭飞行！新增飞法只需加实现类，Duck 一行不改" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdStrategyDiagram() {
  const familyRef = useRef<SVGGElement | null>(null);
  const duckRef = useRef<SVGGElement | null>(null);
  const lineNoWayRef = useRef<SVGLineElement | null>(null);
  const lineRocketRef = useRef<SVGLineElement | null>(null);
  const glowNoWayRef = useRef<SVGRectElement | null>(null);
  const glowRocketRef = useRef<SVGRectElement | null>(null);
  const packetRef = useRef<SVGGElement | null>(null);
  const resultNoWayRef = useRef<SVGGElement | null>(null);
  const resultRocketRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① family（0→T）：接口 + 三个策略淡入
      tl.add(familyRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("family", 0);

      // ② compose（T→2T）：Duck 淡入，引用线指向 FlyNoWay，NoWay 点亮
      tl.add(duckRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.add(lineNoWayRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.3);
      tl.add(glowNoWayRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.4);
      tl.label("compose", T);

      // ③ delegate（2T→3T）：委托包飞向 FlyNoWay，结果徽章"不会飞"
      tl.add(
        packetRef.current!,
        { opacity: [1, 1], x: [DUCK_RIGHT, STRAT_X - 14], y: [REF_Y, NOWAY_Y], duration: T * 0.6, ease: "inOut(2)" },
        T * 2,
      );
      tl.add(packetRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 2.65);
      tl.add(resultNoWayRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.5);
      tl.label("delegate", T * 2);

      // ④ swap（3T→4T）：旧引用线淡出，新引用线指向 Rocket，Rocket 点亮，NoWay 熄灭
      tl.add(lineNoWayRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(glowNoWayRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resultNoWayRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(lineRocketRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.add(glowRocketRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.3);
      tl.label("swap", T * 3);

      // ⑤ fly（4T→5T）：委托包飞向 Rocket，结果"火箭飞行"，结论点亮
      tl.add(
        packetRef.current!,
        { opacity: [1, 1], x: [DUCK_RIGHT, STRAT_X - 14], y: [REF_Y, ROCKET_Y], duration: T * 0.6, ease: "inOut(2)" },
        T * 4,
      );
      tl.add(packetRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4.65);
      tl.add(resultRocketRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.4);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.5);
      tl.label("fly", T * 4);
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
          aria-label="策略模式动画。FlyBehavior 接口与翅膀飞、不会飞、火箭飞三个具体策略组成行为族。ModelDuck 用组合持有 flyBehavior 引用，初始指向 FlyNoWay，performFly 委托调用显示不会飞。调用 setFlyBehavior 注入 FlyRocketPowered 后引用改指火箭策略，再次 performFly 显示火箭飞行。新增飞行方式只需新增实现类，Duck 代码零改动。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            策略模式 · 会飞的鸭子
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            行为抽成接口，Context 用组合持有引用——运行时可替换算法
          </text>

          {/* 行为族：接口 + 三个策略 */}
          <g ref={familyRef} style={{ opacity: 0 }}>
            <rect x={STRAT_X} y={80} width={STRAT_W} height={56} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" strokeDasharray="4 3" />
            <text x={STRAT_X + STRAT_W / 2} y={102} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              «interface» FlyBehavior
            </text>
            <text x={STRAT_X + STRAT_W / 2} y={124} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              + fly()
            </text>

            {/* FlyWithWings */}
            <rect x={STRAT_X} y={170} width={STRAT_W} height={STRAT_H} rx="8" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.4" />
            <text x={STRAT_X + STRAT_W / 2} y={190} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              FlyWithWings
            </text>
            <text x={STRAT_X + STRAT_W / 2} y={208} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              用翅膀飞
            </text>

            {/* FlyNoWay */}
            <rect x={STRAT_X} y={234} width={STRAT_W} height={STRAT_H} rx="8" fill="#8892A6" fillOpacity="0.1" stroke="#8892A6" strokeWidth="1.4" />
            <text x={STRAT_X + STRAT_W / 2} y={254} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              FlyNoWay
            </text>
            <text x={STRAT_X + STRAT_W / 2} y={272} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              不会飞
            </text>

            {/* FlyRocketPowered */}
            <rect x={STRAT_X} y={298} width={STRAT_W} height={STRAT_H} rx="8" fill={PACKET_COLOR} fillOpacity="0.1" stroke={PACKET_COLOR} strokeWidth="1.4" />
            <text x={STRAT_X + STRAT_W / 2} y={318} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              FlyRocketPowered
            </text>
            <text x={STRAT_X + STRAT_W / 2} y={336} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              火箭推进飞行
            </text>
          </g>

          {/* 策略点亮描边 */}
          <rect ref={glowNoWayRef} x={STRAT_X - 3} y={231} width={STRAT_W + 6} height={STRAT_H + 6} rx="10" fill="none" stroke="#8892A6" strokeWidth="2.4" style={{ opacity: 0 }} />
          <rect ref={glowRocketRef} x={STRAT_X - 3} y={295} width={STRAT_W + 6} height={STRAT_H + 6} rx="10" fill="none" stroke={PACKET_COLOR} strokeWidth="2.4" style={{ opacity: 0 }} />

          {/* Duck（Context） */}
          <g ref={duckRef} style={{ opacity: 0 }}>
            <rect x={DUCK_X} y={DUCK_Y} width={DUCK_W} height={DUCK_H} rx="10" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
            <text x={DUCK_X + DUCK_W / 2} y={DUCK_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              ModelDuck
            </text>
            <text x={DUCK_X + DUCK_W / 2} y={DUCK_Y + 42} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              Duck · Context
            </text>
            <text x={DUCK_X + 14} y={DUCK_Y + 72} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              flyBehavior: FlyBehavior
            </text>
            <text x={DUCK_X + 14} y={DUCK_Y + 96} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">
              performFly()
            </text>
            <text x={DUCK_X + 14} y={DUCK_Y + 118} fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
              setFlyBehavior(fb)
            </text>
          </g>

          {/* 引用线：Duck → FlyNoWay（初始） */}
          <line ref={lineNoWayRef} x1={DUCK_RIGHT} y1={REF_Y} x2={STRAT_X} y2={NOWAY_Y} stroke="#8892A6" strokeWidth="1.8" strokeDasharray="5 3" style={{ opacity: 0 }} />
          {/* 引用线：Duck → FlyRocketPowered（切换后） */}
          <line ref={lineRocketRef} x1={DUCK_RIGHT} y1={REF_Y} x2={STRAT_X} y2={ROCKET_Y} stroke={PACKET_COLOR} strokeWidth="1.8" strokeDasharray="5 3" style={{ opacity: 0 }} />

          {/* 委托包 */}
          <g ref={packetRef} style={{ opacity: 0, transform: `translate(${DUCK_RIGHT}px, ${REF_Y}px)` }}>
            <circle cx={0} cy={0} r="7" fill={PACKET_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 结果徽章：不会飞 */}
          <g ref={resultNoWayRef} style={{ opacity: 0 }}>
            <rect x={DUCK_X} y={DUCK_Y + DUCK_H + 16} width={DUCK_W} height={28} rx="6" fill="#8892A6" fillOpacity="0.16" stroke="#8892A6" strokeWidth="1.2" />
            <text x={DUCK_X + DUCK_W / 2} y={DUCK_Y + DUCK_H + 34} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8892A6">
              performFly() → 不会飞
            </text>
          </g>
          {/* 结果徽章：火箭飞行 */}
          <g ref={resultRocketRef} style={{ opacity: 0 }}>
            <rect x={DUCK_X} y={DUCK_Y + DUCK_H + 16} width={DUCK_W} height={28} rx="6" fill={PACKET_COLOR} fillOpacity="0.16" stroke={PACKET_COLOR} strokeWidth="1.2" />
            <text x={DUCK_X + DUCK_W / 2} y={DUCK_Y + DUCK_H + 34} textAnchor="middle" fontSize="11" fontWeight="700" fill={PACKET_COLOR}>
              performFly() → 火箭飞行！
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={396} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={415} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              行为是独立对象，运行时可替换——新增飞法加实现类即可，Duck 零改动
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="从「继承获得行为」到「组合注入行为」：Duck 不再继承飞行，而是持有飞行行为对象，用 setter 在运行时替换。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        策略模式定义算法族，把每个算法分别封装起来，让它们可以互相替换。
        Context 只依赖策略接口，算法的变化独立于使用它的客户端——
        继承把行为写死在编译期，组合让行为活到运行时。
      </figcaption>
    </figure>
  );
}
