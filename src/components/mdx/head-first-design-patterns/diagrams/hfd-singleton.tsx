"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <HfdSingletonDiagram>：巧克力锅炉单例动画（Head First 设计模式 · 第5章）。
 *
 * 核心：构造函数私有 + 静态唯一实例 + getInstance 全局访问点。
 * 首次调用才创建（懒加载），之后都返回同一实例；多线程下用双检锁 + volatile 保证唯一。
 *
 * 节拍：
 *  ① 结构：私有构造 + static instance + getInstance()（此时 instance = null）
 *  ② 懒加载：线程 A 首次调用 → instance 为空 → new 出唯一实例
 *  ③ 唯一性：线程 B 再调用 → instance 非空 → 返回同一个实例
 *  ④ 线程安全：双检锁只在为空时加锁，volatile 防指令重排
 *  ⑤ 破坏与推荐：反射/序列化可破坏，静态内部类/枚举更稳
 */

const VIEW_W = 720;
const VIEW_H = 450;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const THREAD_A = "#5AA9E6";
const THREAD_B = "#C792EA";
const LOCK_COLOR = "#E5B567";
const DANGER = "#E5534B";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "structure", caption: "构造函数私有，静态 instance 初始为 null，getInstance() 是唯一入口" },
  { label: "lazy", caption: "线程 A 首次调用 getInstance()——instance 为空，new 出唯一实例（懒加载）" },
  { label: "unique", caption: "线程 B 再调用——instance 非空，直接返回同一个实例，不会new第二个" },
  { label: "dcl", caption: "双检锁：只在 instance 为空时加锁创建；volatile 防 new 的指令重排" },
  { label: "conclusion", caption: "反射/序列化可能破坏唯一性——用静态内部类或枚举实现更稳" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function HfdSingletonDiagram() {
  const classRef = useRef<SVGGElement | null>(null);
  const emptySlotRef = useRef<SVGGElement | null>(null);
  const threadARef = useRef<SVGGElement | null>(null);
  const threadBRef = useRef<SVGGElement | null>(null);
  const createArrowRef = useRef<SVGLineElement | null>(null);
  const instanceRef = useRef<SVGGElement | null>(null);
  const instanceGlowRef = useRef<SVGRectElement | null>(null);
  const newBadgeRef = useRef<SVGGElement | null>(null);
  const sameBadgeRef = useRef<SVGGElement | null>(null);
  const lockRef = useRef<SVGGElement | null>(null);
  const breakRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① structure（0→T）：类结构 + 空实例槽
      tl.add(classRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(emptySlotRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("structure", 0);

      // ② lazy（T→2T）：线程 A 移向 getInstance，创建箭头，实例出现
      tl.add(threadARef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(threadARef.current!, { x: [380, 320], y: [330, 240], duration: T * 0.5, ease: "inOut(2)" }, T);
      tl.add(createArrowRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.4);
      tl.add(emptySlotRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.add(instanceRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.5);
      tl.add(newBadgeRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 1.6);
      tl.label("lazy", T);

      // ③ unique（2T→3T）：线程 B 移向 getInstance，实例点亮，返回同一实例
      tl.add(threadBRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(threadBRef.current!, { x: [480, 320], y: [350, 262], duration: T * 0.5, ease: "inOut(2)" }, T * 2);
      tl.add(instanceGlowRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.4);
      tl.add(sameBadgeRef.current!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 2.5);
      tl.label("unique", T * 2);

      // ④ dcl（3T→4T）：锁 + volatile 徽章
      tl.add(lockRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("dcl", T * 3);

      // ⑤ conclusion（4T→5T）：破坏警告 + 推荐
      tl.add(breakRef.current!, { opacity: [0, 1], duration: T * 0.45, ease: "out(3)" }, T * 4);
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.3);
      tl.label("conclusion", T * 4);
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
          aria-label="单例模式动画。ChocolateBoiler 构造函数私有，静态 instance 初始为空，getInstance 是唯一入口。线程 A 首次调用时 instance 为空，new 出唯一实例（懒加载）。线程 B 再调用时 instance 非空，返回同一个实例。双检锁只在为空时加锁，volatile 防止指令重排。反射和序列化可能破坏唯一性，推荐静态内部类或枚举实现。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            单例模式 · 巧克力锅炉
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            全局唯一实例 + 全局访问点——构造私有，getInstance 统一入口
          </text>

          {/* 类结构 */}
          <g ref={classRef} style={{ opacity: 0 }}>
            <rect x={48} y={95} width={270} height={200} rx="10" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x={183} y={120} textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              ChocolateBoiler
            </text>
            <text x={183} y={138} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              Singleton
            </text>
            <text x={62} y={168} fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              - ChocolateBoiler()  // 私有构造
            </text>
            <text x={62} y={192} fontSize="10" fontFamily="monospace" fill="var(--text-primary)">
              - static instance: ChocolateBoiler
            </text>
            {/* getInstance 入口高亮框 */}
            <rect x={60} y={205} width={246} height={34} rx="6" fill={ACCENT} fillOpacity="0.18" stroke={ACCENT} strokeWidth="1.4" />
            <text x={183} y={226} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={ACCENT}>
              + static getInstance()
            </text>
            <text x={62} y={262} fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              + boil() / drain()  // 锅炉操作
            </text>
          </g>

          {/* 空实例槽（instance = null） */}
          <g ref={emptySlotRef} style={{ opacity: 0 }}>
            <rect x={470} y={100} width={200} height={110} rx="10" fill="none" stroke="var(--border)" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={570} y={150} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
              instance = null
            </text>
            <text x={570} y={172} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              （还没创建）
            </text>
          </g>

          {/* 唯一实例 */}
          <g ref={instanceRef} style={{ opacity: 0 }}>
            <rect x={470} y={100} width={200} height={110} rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x={570} y={130} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              ChocolateBoiler 实例
            </text>
            <text x={570} y={152} textAnchor="middle" fontSize="10" fill="var(--text-primary)">
              唯一实例
            </text>
            <text x={570} y={176} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-secondary)">
              empty=true, boiled=false
            </text>
          </g>
          <rect ref={instanceGlowRef} x={467} y={97} width={206} height={116} rx="12" fill="none" stroke={OK_COLOR} strokeWidth="2.6" style={{ opacity: 0 }} />

          {/* 创建箭头 getInstance → 实例 */}
          <line ref={createArrowRef} x1={318} y1={222} x2={468} y2={170} stroke={OK_COLOR} strokeWidth="1.8" strokeDasharray="5 3" style={{ opacity: 0 }} />

          {/* new 徽章 */}
          <g ref={newBadgeRef} style={{ opacity: 0 }}>
            <rect x={330} y={180} width={130} height={22} rx="5" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x={395} y={195} textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>
              new（仅此一次）
            </text>
          </g>

          {/* 同一实例徽章 */}
          <g ref={sameBadgeRef} style={{ opacity: 0 }}>
            <rect x={330} y={282} width={150} height={22} rx="5" fill={THREAD_B} fillOpacity="0.16" stroke={THREAD_B} strokeWidth="1.2" />
            <text x={405} y={297} textAnchor="middle" fontSize="10" fontWeight="700" fill={THREAD_B}>
              返回同一个实例
            </text>
          </g>

          {/* 线程 A */}
          <g ref={threadARef} style={{ opacity: 0, transform: "translate(380px, 330px)" }}>
            <circle cx={0} cy={0} r="14" fill={THREAD_A} fillOpacity="0.2" stroke={THREAD_A} strokeWidth="1.6" />
            <text x={0} y={4} textAnchor="middle" fontSize="10" fontWeight="700" fill={THREAD_A}>
              A
            </text>
            <text x={0} y={30} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              线程 A
            </text>
          </g>

          {/* 线程 B */}
          <g ref={threadBRef} style={{ opacity: 0, transform: "translate(480px, 350px)" }}>
            <circle cx={0} cy={0} r="14" fill={THREAD_B} fillOpacity="0.2" stroke={THREAD_B} strokeWidth="1.6" />
            <text x={0} y={4} textAnchor="middle" fontSize="10" fontWeight="700" fill={THREAD_B}>
              B
            </text>
            <text x={0} y={30} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              线程 B
            </text>
          </g>

          {/* 双检锁徽章 */}
          <g ref={lockRef} style={{ opacity: 0 }}>
            <rect x={60} y={310} width={246} height={44} rx="8" fill={LOCK_COLOR} fillOpacity="0.12" stroke={LOCK_COLOR} strokeWidth="1.4" />
            <text x={183} y={328} textAnchor="middle" fontSize="10" fontWeight="700" fill={LOCK_COLOR}>
              双检锁：if(null) → synchronized → if(null)
            </text>
            <text x={183} y={344} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
              volatile 禁止 new 的指令重排
            </text>
          </g>

          {/* 破坏警告 */}
          <g ref={breakRef} style={{ opacity: 0 }}>
            <rect x={90} y={368} width={540} height={28} rx="7" fill={DANGER} fillOpacity="0.08" stroke={DANGER} strokeWidth="1.3" />
            <text x={360} y={386} textAnchor="middle" fontSize="11" fontWeight="700" fill={DANGER}>
              ⚠ 反射 newInstance / 序列化 readObject 可能破坏唯一性
            </text>
          </g>

          {/* 结论 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={90} y={404} width={540} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={360} y={423} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              推荐：静态内部类（Holder）或枚举实现，JVM 机制保证唯一
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单例确保一个类只有一个实例，并提供全局访问点。关键是私有构造 + 延迟创建 + 线程安全。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单例模式让类自己保证唯一实例：构造函数私有，外部只能通过 getInstance()
        获取。首次调用才创建（懒加载），之后共享同一实例。
        多线程环境要用双检锁 + volatile 或静态内部类保证创建的唯一性。
      </figcaption>
    </figure>
  );
}
