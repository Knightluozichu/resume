"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh06SingletonFailure>：单例模式反例复位动画（GPP 第6章 · 图3）。
 *
 * 故事：7 个模块都通过 Singleton::instance() 访问共享服务。
 *  ① 初始：模块 → 单例，看起来"整洁"
 *  ② 反例：任何模块都能偷偷拿到单例 → 隐式依赖蔓延成蛛网（8 条隐式耦合）
 *  ③ 反例结果：改一处 → 蛛网中任何节点都可能受影响，单测无法隔离 ✗
 *  ④ 复位：依赖注入——构造函数声明依赖，Injector 显式注入
 *  ⑤ 复位结果：依赖显式、可追踪、可 mock ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const MODULES = [
  { id: "battle", label: "战斗", x: 100, y: 80 },
  { id: "ai", label: "AI", x: 260, y: 60 },
  { id: "ui", label: "UI", x: 420, y: 80 },
  { id: "audio", label: "音频", x: 580, y: 60 },
  { id: "save", label: "存档", x: 160, y: 200 },
  { id: "net", label: "网络", x: 360, y: 220 },
  { id: "physics", label: "物理", x: 540, y: 200 },
];

const SINGLETON_POS = { x: 360, y: 140 };

// 隐式依赖对（反例时的蛛网连线）
const IMPLICIT_DEPS: [string, string][] = [
  ["battle", "ai"], ["battle", "save"], ["ai", "net"],
  ["ui", "audio"], ["ui", "save"], ["physics", "net"],
  ["audio", "save"], ["ai", "physics"],
];

const getModule = (id: string) => MODULES.find((m) => m.id === id)!;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "初始：7 个模块都通过 Singleton::instance() 访问共享服务" },
  { label: "web", caption: "反例：任何模块都能偷偷拿到单例 → 隐式依赖蔓延成蛛网" },
  { label: "coupled", caption: "反例结果：改一处 → 蛛网中任何节点都可能受影响，单测无法隔离 ✗" },
  { label: "di", caption: "复位：依赖注入——构造函数声明依赖，Injector 显式注入" },
  { label: "explicit", caption: "复位结果：依赖显式、可追踪、可 mock ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh06SingletonFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const singletonLinesRef = useRef<SVGGElement | null>(null);
  const singletonRef = useRef<SVGGElement | null>(null);
  const webRef = useRef<SVGGElement | null>(null);
  const diRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：模块 + 单例 + 连线
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(singletonLinesRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.add(singletonRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② web（t: T→2T）：蛛网连线（红虚线）出现
      tl.add(webRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 1.1);
      tl.label("web", T);

      // ③ coupled（t: 2T→3T）：判定✗
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("coupled", T * 2);

      // ④ di（t: 3T→4T）：蛛网+单例淡出，DI 注入器 + 注入连线（绿）出现
      tl.add(webRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(singletonRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(singletonLinesRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(diRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3.3);
      tl.label("di", T * 3);

      // ⑤ explicit（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("explicit", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span>
            反例与复位
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="单例模式反例复位动画。初始时七个模块都通过 Singleton instance 访问共享服务。反例是任何模块都能偷偷拿到单例，隐式依赖蔓延成蛛网，改一处蛛网中任何节点都可能受影响，单测无法隔离。复位是依赖注入，构造函数声明依赖，Injector 显式注入，依赖显式可追踪可 mock。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：隐式依赖蔓延 → 蛛网耦合 → DI 复位
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            单例的代价不是"只有一个"，而是"所有人都能偷偷拿到"
          </text>

          {/* 场景：模块节点 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {MODULES.map((m) => (
              <g key={m.id}>
                <rect x={m.x - 35} y={m.y + 84} width="70" height="32" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={m.x} y={m.y + 105} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{m.label}</text>
              </g>
            ))}
          </g>

          {/* 模块 → 单例连线 */}
          <g ref={singletonLinesRef} style={{ opacity: 0 }}>
            {MODULES.map((m) => (
              <line key={m.id} x1={m.x} y1={m.y + 100} x2={SINGLETON_POS.x} y2={SINGLETON_POS.y + 100} stroke={ACCENT} strokeWidth="1.2" opacity="0.5" />
            ))}
          </g>

          {/* 单例节点 */}
          <g ref={singletonRef} style={{ opacity: 0 }}>
            <rect x={SINGLETON_POS.x - 65} y={SINGLETON_POS.y + 80} width="130" height="40" rx="10" fill={ACCENT} fillOpacity="0.08" stroke={ACCENT} strokeWidth="1.5" />
            <text x={SINGLETON_POS.x} y={SINGLETON_POS.y + 105} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>Singleton</text>
          </g>

          {/* 蛛网（隐式依赖） */}
          <g ref={webRef} style={{ opacity: 0 }}>
            {IMPLICIT_DEPS.map(([a, b], i) => {
              const ma = getModule(a);
              const mb = getModule(b);
              return (
                <line key={i} x1={ma.x} y1={ma.y + 100} x2={mb.x} y2={mb.y + 100} stroke={FAIL_COLOR} strokeWidth="1.2" opacity="0.5" strokeDasharray="3 2" />
              );
            })}
          </g>

          {/* DI 注入（复位） */}
          <g ref={diRef} style={{ opacity: 0 }}>
            <rect x="310" y="80" width="100" height="34" rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="360" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>Injector</text>
            {MODULES.map((m) => (
              <line key={m.id} x1="360" y1="114" x2={m.x} y2={m.y + 100} stroke={OK_COLOR} strokeWidth="1.2" opacity="0.6" />
            ))}
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="330" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="96" y="357" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 隐式依赖蔓延：改一处牵全身，单测无法隔离（8 条隐式耦合）</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="330" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="96" y="357" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 依赖注入：依赖显式、可追踪、可 mock</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="386" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="409" fontSize="11" fontWeight="700" fill={OK_COLOR}>用 DI / 服务定位器让依赖显式化，每个模块的依赖在签名中可见</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：单例的全局访问点让隐式依赖蔓延成蛛网。复位：依赖注入让依赖显式、可追踪、可 mock。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：单例的全局访问点让任何模块都能偷偷拿到它，隐式依赖蔓延成蛛网、改一处牵全身；用依赖注入让依赖显式化。
      </figcaption>
    </figure>
  );
}
