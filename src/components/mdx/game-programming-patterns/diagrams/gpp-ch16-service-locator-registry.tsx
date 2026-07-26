"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh16ServiceLocatorRegistry>：服务定位器注册表机制动画（GPP 第16章 · 图1）。
 *
 * 核心：提供一个全局注册表，服务把自己登记进去，使用方通过注册表按接口查找服务——
 * 比单例解耦、比依赖注入省事。
 *
 * 场景：ServiceLocator::register(audio) 把音频服务登记；游戏各处 ServiceLocator::getAudio()
 * 按接口取用。可替换实现（真实音频 / 静音 Null 服务 / 日志装饰器）。
 *
 * 节拍：
 *  ① ServiceLocator 注册表（接口 → 实现 的映射）
 *  ② RealAudio 服务 register 登记进表（IAudio → RealAudio）
 *  ③ 使用方登场（游戏逻辑 / UI / 脚本）
 *  ④ 使用方 getAudio() 查表取服务——只认接口，不认实现
 *  ⑤ 换实现：登记 NullAudio（测试用），使用方拿到的随之变化，无需改使用方
 *  ⑥ 比单例解耦、比依赖注入省事；代价是服务仍需被某处登记
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

const IMPLS = [
  { id: "real", name: "RealAudio", emoji: "🔊", color: "#5AA9E6", behavior: "真正播放声音", y: 98 },
  { id: "null", name: "NullAudio", emoji: "🔇", color: "#8a8a8a", behavior: "静默，什么都不做", y: 162 },
  { id: "logging", name: "LoggingAudio", emoji: "📝", color: "#C792EA", behavior: "记录日志后转发", y: 226 },
];

const CONSUMERS = [
  { name: "游戏逻辑", y: 98 },
  { name: "UI 系统", y: 162 },
  { name: "脚本引擎", y: 226 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "locator", caption: "ServiceLocator 注册表：记录 接口 → 实现 的映射" },
  { label: "register", caption: "RealAudio 服务 register 登记进表：IAudio → RealAudio" },
  { label: "consumers", caption: "使用方登场：游戏逻辑 / UI / 脚本，都要用音频" },
  { label: "lookup", caption: "使用方 getAudio() 查表取服务——只认接口 IAudio，不认实现" },
  { label: "swap", caption: "换实现：登记 NullAudio（测试用静默），使用方拿到的随之变化，无需改使用方" },
  { label: "insight", caption: "比单例解耦、比依赖注入省事；代价是服务仍需被某处登记、对定位器有隐式依赖" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh16ServiceLocatorRegistry() {
  const locatorRef = useRef<SVGGElement | null>(null);
  const entryRealRef = useRef<SVGTextElement | null>(null);
  const entryNullRef = useRef<SVGTextElement | null>(null);
  const implsRef = useRef<SVGGElement | null>(null);
  const regRealRef = useRef<SVGGElement | null>(null);
  const regNullRef = useRef<SVGGElement | null>(null);
  const consumersRef = useRef<SVGGElement | null>(null);
  const lookupRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① locator（t: 0→T）：注册表 + 默认表项浮现
      tl.add(locatorRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("locator", 0);

      // ② register（t: T→2T）：服务实现 + RealAudio 登记箭头
      tl.add(implsRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.add(regRealRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.3);
      tl.label("register", T);

      // ③ consumers（t: 2T→3T）：使用方浮现
      tl.add(consumersRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 2);
      tl.label("consumers", T * 2);

      // ④ lookup（t: 3T→4T）：查表箭头亮起
      tl.add(lookupRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 3);
      tl.label("lookup", T * 3);

      // ⑤ swap（t: 4T→5T）：换登记 NullAudio，表项切换
      tl.add(regRealRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(regNullRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.1);
      tl.add(entryRealRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4.2);
      tl.add(entryNullRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.3);
      tl.label("swap", T * 4);

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
            <span aria-hidden="true">🔌</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="服务定位器机制动画。中央是 ServiceLocator 注册表，记录接口 IAudio 到实现的映射。RealAudio 服务通过 register 登记进表，表项为 IAudio 指向 RealAudio。使用方游戏逻辑、UI、脚本通过 getAudio 按接口查表取用，只认接口不认实现。换实现时登记 NullAudio 用于测试静默，表项切换，使用方拿到的随之变化但无需修改使用方。比单例解耦、比依赖注入省事，代价是服务仍需被某处登记、对定位器有隐式依赖。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp16-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-secondary)" />
            </marker>
            <marker id="gpp16-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x="32" y="28" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            服务定位器：按接口查表取服务
          </text>
          <text x="32" y="48" fontSize="11" fill="var(--text-secondary)">
            服务登记进注册表，使用方按接口查找——只认接口，不认实现
          </text>

          {/* 服务实现（左） */}
          <g ref={implsRef} style={{ opacity: 0 }}>
            <text x="40" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">服务实现（register 登记）</text>
            {IMPLS.map((im) => (
              <g key={im.id}>
                <rect x="40" y={im.y} width="180" height="52" rx="8" fill={im.color} fillOpacity="0.06" stroke={im.color} strokeWidth="1.3" />
                <text x="54" y={im.y + 22} fontSize="12" fontWeight="700" fill="var(--text-primary)">{im.emoji} {im.name}</text>
                <text x="54" y={im.y + 40} fontSize="11" fill="var(--text-secondary)">{im.behavior}</text>
              </g>
            ))}
          </g>

          {/* RealAudio 登记（箭头 + 已登记） */}
          <g ref={regRealRef} style={{ opacity: 0 }}>
            <line x1="222" y1="124" x2="268" y2="180" stroke="#5AA9E6" strokeWidth="1.8" markerEnd="url(#gpp16-arrow)" />
            <text x="206" y="128" textAnchor="end" fontSize="11" fontWeight="700" fill="#5AA9E6">已登记 ✓</text>
          </g>
          {/* NullAudio 登记（swap） */}
          <g ref={regNullRef} style={{ opacity: 0 }}>
            <line x1="222" y1="188" x2="268" y2="182" stroke="#8a8a8a" strokeWidth="1.8" markerEnd="url(#gpp16-arrow)" />
            <text x="206" y="192" textAnchor="end" fontSize="11" fontWeight="700" fill="#8a8a8a">已登记 ✓</text>
          </g>

          {/* 注册表（中央） */}
          <g ref={locatorRef} style={{ opacity: 0 }}>
            <rect x="270" y="98" width="180" height="180" rx="12" fill={ACCENT} fillOpacity="0.08" stroke={ACCENT} strokeWidth="2" />
            <text x="360" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>ServiceLocator</text>
            <text x="360" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">注册表（接口 → 实现）</text>
            <rect x="288" y="158" width="144" height="44" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1.2" />
            <text x="298" y="176" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">IAudio</text>
            <text x="360" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">getAudio() 返回当前登记者</text>
            <text x="360" y="256" textAnchor="middle" fontSize="11" fill={ACCENT}>使用方只依赖接口 IAudio</text>
          </g>
          {/* 表项实现（可切换） */}
          <text ref={entryRealRef} x="298" y="194" fontSize="11" fontWeight="700" fontFamily="monospace" fill="#5AA9E6" style={{ opacity: 1 }}>→ RealAudio</text>
          <text ref={entryNullRef} x="298" y="194" fontSize="11" fontWeight="700" fontFamily="monospace" fill="#8a8a8a" style={{ opacity: 0 }}>→ NullAudio</text>

          {/* 使用方（右） */}
          <g ref={consumersRef} style={{ opacity: 0 }}>
            <text x="500" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">使用方（getAudio 查表）</text>
            {CONSUMERS.map((c) => (
              <g key={c.name}>
                <rect x="500" y={c.y} width="180" height="52" rx="8" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.3" />
                <text x="514" y={c.y + 22} fontSize="12" fontWeight="700" fill="var(--text-primary)">{c.name}</text>
                <text x="514" y={c.y + 40} fontSize="11" fill="var(--text-secondary)">getAudio() → 当前登记者</text>
              </g>
            ))}
          </g>

          {/* 查表箭头 */}
          <g ref={lookupRef} style={{ opacity: 0 }}>
            {CONSUMERS.map((c) => (
              <line key={`lk-${c.name}`} x1="452" y1="180" x2="498" y2={c.y + 26} stroke={ACCENT} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#gpp16-arrow-accent)" />
            ))}
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="320" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="60" y="344" fontSize="12" fontWeight="700" fill={OK_COLOR}>比单例解耦、比依赖注入省事</text>
            <text x="60" y="364" fontSize="11" fill="var(--text-secondary)">切换实现（测试时用 NullAudio 静默）无需改使用方；代价是服务仍需被某处登记</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="服务定位器提供全局注册表：服务登记进去，使用方按接口查表取用，只依赖接口不依赖实现，因此可替换实现。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        服务定位器（Service Locator）：提供一个全局注册表，服务把自己登记进去，使用方
        通过注册表按接口查找服务。使用方只依赖接口、不依赖具体实现，因此可替换实现。
      </figcaption>
    </figure>
  );
}
