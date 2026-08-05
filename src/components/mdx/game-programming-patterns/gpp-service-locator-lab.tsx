"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const WARN = "#E5675C";
const VW = 900;
const VH = 420;

const ACCENT = "#3FB97F"; // emerald
const STEPS: readonly TeachingStep[] = [
  { label: "register", caption: "① 服务注册：音频/渲染/网络注册到定位器" },
  { label: "request", caption: "② 客户端请求：locator.get(\"Audio\")——按名获取" },
  { label: "dispatch", caption: "③ 定位器返回服务实例：客户端不知道实现" },
  { label: "benefit", caption: "④ 收益：换实现只改注册；但定位器是全局变量，缺失要兜底" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppServiceLocatorLab() {
  const regRef = useRef<SVGGElement>(null);
  const reqRef = useRef<SVGGElement>(null);
  const dispRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(regRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("register", 0);
      tl.add(reqRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("request", T);
      tl.add(dispRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("dispatch", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  const services = ["AudioService", "RenderService", "NetworkService", "SaveService"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Decoupling Pattern · Service Locator</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Service Locator — 服务的电话簿</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Service Locator 模式定制图解：服务注册到定位器，客户端按名请求，定位器返回实例。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>客户端只认服务名，实现是谁随时可换</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>服务注册到定位器，客户端按名获取</text>

          <g ref={regRef} style={{ opacity: 0 }}>
            <rect x={80} y={90} width={300} height={220} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={230} y={120} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>ServiceLocator</text>
            <text x={230} y={140} textAnchor="middle" fontSize={11} fill={MUTE}>服务注册表</text>
            <line x1={90} y1={152} x2={370} y2={152} stroke={LINE} strokeWidth={1} />
            {services.map((s, i) => (
              <text key={s} x={100} y={180 + i * 30} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>▸ {s}</text>
            ))}
          </g>

          <g ref={reqRef} style={{ opacity: 0 }}>
            <rect x={520} y={110} width={200} height={80} rx={10} fill="var(--bg)" stroke={WARN} strokeWidth={1.5} />
            <text x={620} y={140} textAnchor="middle" fontSize={12} fontWeight={600} fill={WARN}>客户端</text>
            <text x={620} y={168} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>locator.get("Audio")</text>
            <line x1={520} y1={150} x2={380} y2={150} stroke={LINE} strokeWidth={1.5} strokeDasharray="4,3" />
            <text x={450} y={140} textAnchor="middle" fontSize={11} fill={ACCENT}>请求</text>
          </g>

          <g ref={dispRef} style={{ opacity: 0 }}>
            <line x1={380} y1={190} x2={520} y2={190} stroke={OK} strokeWidth={1.5} />
            <polygon points={`${516},${186} ${520},${190} ${516},${194}`} fill={OK} />
            <text x={450} y={208} textAnchor="middle" fontSize={11} fill={OK}>返回实例</text>
            <rect x={520} y={220} width={200} height={60} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.2} />
            <text x={620} y={246} textAnchor="middle" fontSize={11} fill={INK}>AudioService 实现</text>
            <text x={620} y={266} textAnchor="middle" fontSize={11} fill={MUTE}>客户端不知道具体实现</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={80} y={330} width={740} height={44} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.3} />
            <text x={450} y={357} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>换实现（OpenAL→DirectSound）只改注册；null 服务兜底缺失，避免空指针</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="定位器是服务的电话簿：客户端只认名字，具体实现可随时替换——但要管理缺失与范围。" />
      </div>
    </div>
  );
}
