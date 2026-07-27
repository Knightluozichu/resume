"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdAdapterFacadeDiagram>：适配器 + 外观对比动画（Head First 设计模式 · 第7章）。
 *
 * 适配器：TurkeyAdapter 实现 Duck 接口、持有 Turkey 引用，把 quack() 转成 gobble()
 * ——接口转换器（1 对 1），让不兼容的类协作。
 * 外观：HomeTheaterFacade 持有子系统组件引用，watchMovie() 一个方法协调灯光/屏幕/
 * 投影/功放/播放器——复杂度屏蔽层（多对 1）。
 *
 * 节拍：
 *  ① Client 想用 Duck 接口，但只有 Turkey——接口不匹配
 *  ② TurkeyAdapter 实现 Duck 并持有 Turkey，补上缺口
 *  ③ 调用链：duck.quack() → 适配器转换 → turkey.gobble()
 *  ④ 外观：watchMovie() 一个调用协调五个子系统组件
 *  ⑤ 对比：适配器转换接口（1 对 1），外观简化入口（多对 1）
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const DANGER = "#E5534B";
const TURKEY_COLOR = "#E5B567";
const CLIENT_COLOR = "#5AA9E6";

const T = TEACHING_BEAT_MS;

// 外观子系统五个组件
const CHIPS = [
  { id: "light", label: "light.dim(10)", y: 290, color: "#E5B567" },
  { id: "screen", label: "screen.down()", y: 316, color: "#5AA9E6" },
  { id: "projector", label: "projector.on()", y: 342, color: "#C792EA" },
  { id: "amp", label: "amp.on()", y: 368, color: "#3FB97F" },
  { id: "player", label: "player.play(movie)", y: 394, color: "#E5534B" },
] as const;
const CHIP_X = 500;
const CHIP_W = 180;
const CHIP_H = 22;

const STEPS: readonly TeachingStep[] = [
  { label: "mismatch", caption: "Client 面向 Duck 接口编程，但手头只有 Turkey（gobble）——接口不匹配" },
  { label: "adapt", caption: "TurkeyAdapter 实现 Duck 接口、持有 Turkey 引用——补上接口缺口" },
  { label: "convert", caption: "Client 调 duck.quack()，适配器内部转成 turkey.gobble()——Client 无感知" },
  { label: "facade", caption: "HomeTheaterFacade 持有子系统引用，watchMovie() 一个方法协调五个组件" },
  { label: "compare", caption: "适配器是接口转换器（1 对 1），外观是复杂度屏蔽层（多对 1）" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdAdapterFacadeDiagram() {
  const adapterHeadRef = useRef<SVGGElement | null>(null);
  const clientARef = useRef<SVGGElement | null>(null);
  const turkeyRef = useRef<SVGGElement | null>(null);
  const mismatchRef = useRef<SVGGElement | null>(null);
  const adapterRef = useRef<SVGGElement | null>(null);
  const arrow1Ref = useRef<SVGLineElement | null>(null);
  const arrow2Ref = useRef<SVGLineElement | null>(null);
  const convPacketRef = useRef<SVGGElement | null>(null);
  const convLabelRef = useRef<SVGGElement | null>(null);
  const facadeHeadRef = useRef<SVGGElement | null>(null);
  const clientFRef = useRef<SVGGElement | null>(null);
  const facadeRef = useRef<SVGGElement | null>(null);
  const facadeArrowRef = useRef<SVGLineElement | null>(null);
  const facadePacketRef = useRef<SVGGElement | null>(null);
  const fanArrowsRef = useRef<SVGGElement | null>(null);
  const chipGlowRefs = useRef<Record<string, SVGRectElement | null>>({});
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① mismatch（0→T）：Client + Turkey + 不匹配缺口
      tl.add(adapterHeadRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(clientARef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.1);
      tl.add(turkeyRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.2);
      tl.add(mismatchRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("mismatch", 0);

      // ② adapt（T→2T）：缺口淡出，适配器出现 + 两条箭头
      tl.add(mismatchRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(adapterRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(arrow1Ref.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.4);
      tl.add(arrow2Ref.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.5);
      tl.label("adapt", T);

      // ③ convert（2T→3T）：调用包 Client→Adapter→Turkey，转换标签
      tl.add(convPacketRef.current!, { opacity: [1, 1], x: [150, 360], y: [133, 133], duration: T * 0.45, ease: "inOut(2)" }, T * 2);
      tl.add(convPacketRef.current!, { opacity: [1, 1], x: [360, 620], y: [133, 133], duration: T * 0.45, ease: "inOut(2)" }, T * 2.45);
      tl.add(convPacketRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.9);
      tl.add(convLabelRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.5);
      tl.label("convert", T * 2);

      // ④ facade（3T→4T）：外观区出现，一个调用扇出点亮五个组件
      tl.add(facadeHeadRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3);
      tl.add(clientFRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.1);
      tl.add(facadeRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.add(facadeArrowRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.3);
      tl.add(facadePacketRef.current!, { opacity: [1, 1], x: [150, 320], y: [328, 328], duration: T * 0.4, ease: "inOut(2)" }, T * 3.3);
      tl.add(facadePacketRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.7);
      tl.add(fanArrowsRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 3.5);
      CHIPS.forEach((c, i) => {
        tl.add(chipGlowRefs.current[c.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.55 + i * T * 0.08);
      });
      tl.label("facade", T * 3);

      // ⑤ compare（4T→5T）：结论
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" }, T * 4);
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
          aria-label="适配器与外观模式对比动画。适配器部分：Client 面向 Duck 接口但只有 Turkey，TurkeyAdapter 实现 Duck 并持有 Turkey，把 quack 转成 gobble，Client 无感知。外观部分：HomeTheaterFacade 持有灯光、屏幕、投影、功放、播放器引用，watchMovie 一个方法依次协调五个组件。适配器是接口转换器一对一，外观是复杂度屏蔽层多对一。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            适配器 &amp; 外观 · 让接口好用
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            适配器转换接口（火鸡变鸭子），外观简化入口（一键看电影）
          </text>

          {/* ===== 适配器区 ===== */}
          <g ref={adapterHeadRef} style={{ opacity: 0 }}>
            <text x="32" y="88" fontSize="12" fontWeight="700" fill={ACCENT}>
              适配器 —— 接口转换器
            </text>
          </g>

          {/* Client */}
          <g ref={clientARef} style={{ opacity: 0 }}>
            <rect x={40} y={105} width={105} height={56} rx="8" fill={CLIENT_COLOR} fillOpacity="0.12" stroke={CLIENT_COLOR} strokeWidth="1.6" />
            <text x={92} y={128} textAnchor="middle" fontSize="12" fontWeight="700" fill={CLIENT_COLOR}>
              Client
            </text>
            <text x={92} y={146} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              面向 Duck 编程
            </text>
          </g>

          {/* Turkey */}
          <g ref={turkeyRef} style={{ opacity: 0 }}>
            <rect x={575} y={105} width={105} height={56} rx="8" fill={TURKEY_COLOR} fillOpacity="0.12" stroke={TURKEY_COLOR} strokeWidth="1.6" />
            <text x={627} y={128} textAnchor="middle" fontSize="12" fontWeight="700" fill={TURKEY_COLOR}>
              Turkey
            </text>
            <text x={627} y={146} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              gobble() fly()
            </text>
          </g>

          {/* 不匹配缺口 */}
          <g ref={mismatchRef} style={{ opacity: 0 }}>
            <rect x={270} y={105} width={180} height={56} rx="8" fill="none" stroke={DANGER} strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={360} y={128} textAnchor="middle" fontSize="11" fontWeight="700" fill={DANGER}>
              ✗ 接口不匹配
            </text>
            <text x={360} y={146} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              Client 要 quack()，Turkey 只有 gobble()
            </text>
          </g>

          {/* TurkeyAdapter */}
          <g ref={adapterRef} style={{ opacity: 0 }}>
            <rect x={270} y={105} width={180} height={56} rx="8" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2" />
            <text x={360} y={126} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              TurkeyAdapter
            </text>
            <text x={360} y={143} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-primary)">
              implements Duck · 持有 Turkey
            </text>
            <text x={360} y={156} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              quack() → gobble()
            </text>
          </g>

          {/* 箭头 Client→Adapter、Adapter→Turkey */}
          <line ref={arrow1Ref} x1={147} y1={133} x2={268} y2={133} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />
          <line ref={arrow2Ref} x1={452} y1={133} x2={573} y2={133} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />

          {/* 调用包 */}
          <g ref={convPacketRef} style={{ opacity: 0, transform: "translate(150px, 133px)" }}>
            <circle cx={0} cy={0} r="7" fill={ACCENT} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 转换标签 */}
          <g ref={convLabelRef} style={{ opacity: 0 }}>
            <rect x={245} y={172} width={230} height={22} rx="5" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="1.2" />
            <text x={360} y={187} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill={ACCENT}>
              duck.quack() → turkey.gobble()
            </text>
          </g>

          {/* 分隔线 */}
          <line x1={32} y1={258} x2={688} y2={258} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 4" />

          {/* ===== 外观区 ===== */}
          <g ref={facadeHeadRef} style={{ opacity: 0 }}>
            <text x="32" y={282} fontSize="12" fontWeight="700" fill={OK_COLOR}>
              外观 —— 复杂度屏蔽层
            </text>
          </g>

          {/* Client（外观） */}
          <g ref={clientFRef} style={{ opacity: 0 }}>
            <rect x={40} y={300} width={105} height={56} rx="8" fill={CLIENT_COLOR} fillOpacity="0.12" stroke={CLIENT_COLOR} strokeWidth="1.6" />
            <text x={92} y={323} textAnchor="middle" fontSize="12" fontWeight="700" fill={CLIENT_COLOR}>
              Client
            </text>
            <text x={92} y={341} textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)">
              只想看电影
            </text>
          </g>

          {/* Facade */}
          <g ref={facadeRef} style={{ opacity: 0 }}>
            <rect x={230} y={295} width={180} height={66} rx="8" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="2" />
            <text x={320} y={318} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              HomeTheaterFacade
            </text>
            <text x={320} y={336} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              watchMovie(movie)
            </text>
            <text x={320} y={352} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
              一个方法搞定
            </text>
          </g>

          {/* Client→Facade 箭头 + 包 */}
          <line ref={facadeArrowRef} x1={147} y1={328} x2={228} y2={328} stroke="var(--text-secondary)" strokeWidth="1.5" style={{ opacity: 0 }} />
          <g ref={facadePacketRef} style={{ opacity: 0, transform: "translate(150px, 328px)" }}>
            <circle cx={0} cy={0} r="7" fill={OK_COLOR} stroke="var(--elevated)" strokeWidth="2" />
          </g>

          {/* 扇出箭头 */}
          <g ref={fanArrowsRef} style={{ opacity: 0 }}>
            {CHIPS.map((c) => (
              <line key={`fan-${c.id}`} x1={412} y1={328} x2={CHIP_X - 2} y2={c.y + CHIP_H / 2} stroke={c.color} strokeWidth="1.3" strokeDasharray="4 3" />
            ))}
          </g>

          {/* 五个子系统组件 + 点亮描边 */}
          {CHIPS.map((c) => (
            <g key={c.id}>
              <rect x={CHIP_X} y={c.y} width={CHIP_W} height={CHIP_H} rx="5" fill={c.color} fillOpacity="0.1" stroke={c.color} strokeWidth="1.2" />
              <text x={CHIP_X + CHIP_W / 2} y={c.y + 15} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
                {c.label}
              </text>
              <rect
                ref={(el) => {
                  chipGlowRefs.current[c.id] = el;
                }}
                x={CHIP_X - 3}
                y={c.y - 3}
                width={CHIP_W + 6}
                height={CHIP_H + 6}
                rx="7"
                fill="none"
                stroke={c.color}
                strokeWidth="2.2"
                style={{ opacity: 0 }}
              />
            </g>
          ))}

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={440} width={540} height={34} rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x={360} y={455} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>
              适配器 = 接口转换器（1 对 1，让不兼容的类协作）
            </text>
            <text x={360} y={469} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
              外观 = 复杂度屏蔽层（多对 1，让子系统简单易用）
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="两者都让客户端更简单：适配器改变接口让类能协作，外观不改变接口只提供更简单的入口（最少知识原则）。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        适配器把一个类的接口转换成客户期望的接口，让原本不兼容的类协作；
        外观为子系统的一组接口提供统一的高层入口，屏蔽内部复杂度。
        外观是可选的简化层，不限制直接访问子系统。
      </figcaption>
    </figure>
  );
}
