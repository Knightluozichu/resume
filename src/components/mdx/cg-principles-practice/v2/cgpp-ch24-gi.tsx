"use client";

import { useMemo, useRef, useState, type MutableRefObject } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 380;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type View = "transport" | "cache" | "throughput";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "transport",
    label: "光能传输",
    detail: "拆开直接光、间接光和表面反射，观察一条能量路径如何汇入像素。",
  },
  {
    id: "cache",
    label: "可见性与缓存",
    detail: "调整探针覆盖、遮挡和缓存更新，比较间接光估计的空间一致性。",
  },
  {
    id: "throughput",
    label: "硬件吞吐",
    detail: "调整光线任务、样本和访问等待，区分并行计算与内存延迟。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "direct",
    caption: "先计算直接光：光源、可见性和表面反射决定第一份能量输入。",
  },
  {
    label: "bounce",
    caption:
      "再传播间接光：交点把部分能量反射到其他表面，路径长度和遮挡共同影响结果。",
  },
  {
    label: "estimate",
    caption: "随后估计全局贡献：采样、探针或缓存用有限证据近似大量可能路径。",
  },
  {
    label: "resolve",
    caption: "最后合成与测量：亮度、噪声、缓存陈旧度和硬件等待必须分别记录。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Record<
  (typeof STEPS)[number]["label"],
  { title: string; input: string; evidence: string }
> = {
  direct: {
    title: "直接光",
    input: "光源 · 可见性",
    evidence: "第一份能量",
  },
  bounce: {
    title: "间接反弹",
    input: "法线 · 反射率",
    evidence: "二次路径",
  },
  estimate: {
    title: "路径估计",
    input: "采样 · 探针 · 缓存",
    evidence: "间接光近似",
  },
  resolve: {
    title: "合成测量",
    input: "颜色 · 噪声",
    evidence: "质量与成本",
  },
};

function ViewButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const display = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

function TransportView({
  bounces,
  light,
  nodeRefs,
  reflectance,
}: {
  bounces: number;
  light: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  reflectance: number;
}) {
  const indirect = Math.min(0.88, reflectance * bounces * 0.18);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        全局光照：直接光与间接光共同进入像素
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每一次反弹都携带能量，但遮挡、反射率和路径长度会决定它是否有贡献。
      </text>
      <g
        ref={(node) => {
          nodeRefs.current.direct = node;
        }}
        opacity="1"
      >
        <rect
          x="28"
          y="92"
          width="326"
          height="208"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="52"
          y="126"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          传输路径
        </text>
        <circle cx="84" cy="174" r="11" fill={COLORS.warning} />
        <line
          x1="95"
          y1="174"
          x2="170"
          y2="220"
          stroke={COLORS.warning}
          strokeWidth="4"
          markerEnd="url(#cgpp-ch24-gi-arrow)"
        />
        <polygon
          points="170,242 262,242 226,176"
          fill="var(--accent)"
          fillOpacity="0.16"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        {Array.from(
          { length: Math.max(1, Math.min(4, bounces)) },
          (_, index) => (
            <path
              key={`bounce-path-${index}`}
              d={`M${226 + index * 4} ${176 + index * 9} Q${288 - index * 12} ${142 + index * 12} ${306 - index * 8} ${214 - index * 5}`}
              fill="none"
              stroke={COLORS.accent}
              strokeOpacity={0.72 - index * 0.1}
              strokeWidth="3"
              markerEnd="url(#cgpp-ch24-gi-arrow)"
            />
          ),
        )}
        <text x="52" y="278" fontSize="13" fill={COLORS.secondary}>
          Light（光）输入 · 反弹次数：{bounces}
        </text>
      </g>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch24-gi-arrow)"
      />
      <g
        ref={(node) => {
          nodeRefs.current.bounce = node;
        }}
        opacity="0.35"
      >
        <rect
          x="436"
          y="92"
          width="280"
          height="208"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="460"
          y="126"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          能量账本
        </text>
        <text x="460" y="162" fontSize="13" fill={COLORS.warning}>
          直接光：{light.toFixed(2)}
        </text>
        <text x="460" y="195" fontSize="13" fill={COLORS.accent}>
          Reflectance（反射率）：{reflectance.toFixed(2)}
        </text>
        <text x="460" y="228" fontSize="13" fill={COLORS.primary}>
          间接贡献：{indirect.toFixed(2)}
        </text>
        <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
          Radiometry（辐射度量）保持能量语义。
        </text>
      </g>
      <text x="28" y="338" fontSize="13" fill={COLORS.accent}>
        预测：增加反弹次数会让所有间接路径都有贡献，还是只增加潜在路径数量？
      </text>
    </g>
  );
}

function CacheView({
  cache,
  occlusion,
  samples,
}: {
  cache: number;
  occlusion: number;
  samples: number;
}) {
  const visible = Math.max(1, Math.round(cache * (1 - occlusion * 0.45)));
  const stale = Math.max(0.04, occlusion * 0.38);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        可见性与间接光缓存：空间一致性胜过单点亮度
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        探针覆盖、遮挡比例和样本数共同影响缓存能否代表附近表面的间接光。
      </text>
      <rect
        x="28"
        y="92"
        width="326"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="126" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        探针覆盖
      </text>
      {Array.from({ length: 12 }, (_, index) => {
        const x = 60 + (index % 4) * 62;
        const y = 154 + Math.floor(index / 4) * 34;
        const active = index < visible;
        return (
          <circle
            key={`probe-${index}`}
            cx={x}
            cy={y}
            r="8"
            fill={active ? COLORS.accent : COLORS.border}
            stroke={active ? COLORS.accent : COLORS.secondary}
          />
        );
      })}
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        有效探针：{visible} · 遮挡：{occlusion.toFixed(2)} · 样本：{samples}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch24-gi-arrow)"
      />
      <rect
        x="436"
        y="92"
        width="280"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="126"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        缓存证据
      </text>
      <text x="460" y="162" fontSize="13" fill={COLORS.accent}>
        覆盖一致性：{(visible / 12).toFixed(2)}
      </text>
      <text x="460" y="195" fontSize="13" fill={COLORS.warning}>
        陈旧风险：{stale.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        可见性先于插值，样本先于亮度结论。
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        缓存更新需与场景变化同步。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        增加探针不等于消除遮挡；先检查空间覆盖和缓存陈旧度。
      </text>
    </g>
  );
}

function ThroughputView({
  latency,
  rays,
  samples,
}: {
  latency: number;
  rays: number;
  samples: number;
}) {
  const total = Math.round(rays * samples * 0.24);
  const waiting = Math.min(
    total - 1,
    Math.max(1, Math.round(total * latency * 0.7)),
  );
  const completed = total - waiting;
  const parallelism = Math.max(0.1, 1 - latency * 0.56);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        Modern Graphics Hardware（现代图形硬件）：全局路径的并行吞吐
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个方格是一条光照任务；样本、反弹和缓存访问会共同改变工作量。
      </text>
      <rect
        x="28"
        y="92"
        width="326"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="126" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        光照任务队列
      </text>
      {Array.from({ length: Math.min(total, 16) }, (_, index) => {
        const x = 54 + (index % 4) * 64;
        const y = 149 + Math.floor(index / 4) * 34;
        const isWaiting = index >= Math.min(completed, 16);
        return (
          <rect
            key={`gi-task-${index}`}
            x={x}
            y={y}
            width="44"
            height="22"
            rx="6"
            fill={isWaiting ? "var(--warning)" : "var(--accent)"}
            fillOpacity="0.84"
            stroke={isWaiting ? COLORS.warning : COLORS.border}
          />
        );
      })}
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        完成：{completed} · 等待：{waiting} · 总任务：{total}
      </text>
      <line
        x1="356"
        y1="190"
        x2="414"
        y2="190"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cgpp-ch24-gi-arrow)"
      />
      <rect
        x="436"
        y="92"
        width="280"
        height="208"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="126"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        硬件证据
      </text>
      <text x="460" y="162" fontSize="13" fill={COLORS.accent}>
        Parallelism（并行性）：{parallelism.toFixed(2)}
      </text>
      <text x="460" y="195" fontSize="13" fill={COLORS.warning}>
        memory latency（内存延迟）：{latency.toFixed(2)}
      </text>
      <text x="460" y="228" fontSize="13" fill={COLORS.secondary}>
        有效吞吐：{(completed / total).toFixed(2)}
      </text>
      <text x="460" y="262" fontSize="13" fill={COLORS.secondary}>
        先裁剪无贡献路径，再扩大任务批次。
      </text>
      <text x="28" y="338" fontSize="13" fill={COLORS.secondary}>
        并行执行能隐藏部分路径计算，却不能消除共享缓存和纹理访问等待。
      </text>
    </g>
  );
}

/** 第24章专属实验：把直接光、间接光缓存与硬件吞吐串成全局光照证据链。 */
export function CgppCh24GiLab() {
  const [view, setView] = useState<View>("transport");
  const [bounces, setBounces] = useState(2);
  const [light, setLight] = useState(0.72);
  const [reflectance, setReflectance] = useState(0.58);
  const [cache, setCache] = useState(8);
  const [samples, setSamples] = useState(10);
  const [latency, setLatency] = useState(0.32);
  const [occlusion, setOcclusion] = useState(0.28);
  const [rays, setRays] = useState(16);
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.35, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setView("transport");
    setBounces(2);
    setLight(0.72);
    setReflectance(0.58);
    setCache(8);
    setSamples(10);
    setLatency(0.32);
    setOcclusion(0.28);
    setRays(16);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="全局光照专属光能传输、可见性缓存与硬件吞吐实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgpp-ch24-global-illumination"
      data-unit-id="cgp-01 cgp-26 cgp-38"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 GlobalIlluminationViz · 光能传输、缓存与并行吞吐
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让一束光展示它如何照亮全局并留下可测证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只改变反弹、缓存或访问等待时，哪类全局光照证据会先变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择全局光照观察视角">
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="反弹次数"
            min={1}
            max={5}
            step={1}
            value={bounces}
            onChange={setBounces}
          />
          <RangeControl
            label="光能量"
            min={0.2}
            max={1.3}
            step={0.01}
            value={light}
            onChange={setLight}
          />
          <RangeControl
            label="反射率"
            min={0.1}
            max={0.95}
            step={0.01}
            value={reflectance}
            onChange={setReflectance}
          />
          <RangeControl
            label="缓存探针"
            min={4}
            max={16}
            step={1}
            value={cache}
            onChange={setCache}
          />
          <RangeControl
            label="样本数量"
            min={4}
            max={20}
            step={1}
            value={samples}
            onChange={setSamples}
          />
          <RangeControl
            label="遮挡比例"
            min={0.05}
            max={0.85}
            step={0.01}
            value={occlusion}
            onChange={setOcclusion}
          />
          <RangeControl
            label="射线任务"
            min={8}
            max={24}
            step={1}
            value={rays}
            onChange={setRays}
          />
          <RangeControl
            label="访问等待"
            min={0.1}
            max={0.9}
            step={0.01}
            value={latency}
            onChange={setLatency}
          />
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cgpp-ch24-gi-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            {view === "transport" ? (
              <TransportView
                bounces={bounces}
                light={light}
                nodeRefs={nodeRefs}
                reflectance={reflectance}
              />
            ) : view === "cache" ? (
              <CacheView
                cache={cache}
                occlusion={occlusion}
                samples={samples}
              />
            ) : (
              <ThroughputView latency={latency} rays={rays} samples={samples} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
        {view === "transport" && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="先用单步确认直接光到间接光的责任边界，再播放整条路径；改参数后用同一输入重放。"
            reset={{
              label: "重置光照流程",
              ariaLabel: "重置第24章全局光照流程时间线",
              onClick: reset,
            }}
          />
        )}
        {view !== "transport" && (
          <button
            type="button"
            onClick={reset}
            aria-label="重置第24章全局光照实验"
            className="mx-auto block min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            重置实验
          </button>
        )}
      </div>
    </section>
  );
}
