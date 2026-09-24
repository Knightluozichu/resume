"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

// MODEL START: deterministic rectangles and event snapshots, not synthetic scores.
export type ScoringRect = { x: number; y: number; w: number; h: number };
export type ScoringWorld = {
  active: boolean;
  score: number;
  high: number;
  level: number;
  lives: number;
  speed: number;
  points: number;
  direction: number;
  shipX: number;
  aliens: ScoringRect[];
  bullets: ScoringRect[];
};
export type ScoringSample = "start" | "restart" | "multiple" | "clear" | "life";
export const PLAY_RECT = { x: 90, y: 244, w: 160, h: 56 };
export const scoringFleet = (): ScoringRect[] =>
  [0, 1, 2, 3].map((i) => ({ x: 36 + i * 68, y: 160, w: 36, h: 26 }));
export function initialScoringWorld(): ScoringWorld {
  return {
    active: false,
    score: 0,
    high: 0,
    level: 1,
    lives: 3,
    speed: 1,
    points: 50,
    direction: 1,
    shipX: 170,
    aliens: scoringFleet(),
    bullets: [],
  };
}
export function scoringFixture(sample: ScoringSample): ScoringWorld {
  const s = initialScoringWorld();
  if (sample === "start") return s;
  Object.assign(s, {
    active: true,
    score: 950,
    high: 950,
    level: 2,
    speed: 1.1,
    points: 75,
  });
  if (sample === "restart")
    Object.assign(s, {
      active: false,
      level: 3,
      speed: 1.21,
      points: 112,
      lives: 0,
      direction: -1,
      shipX: 75,
      bullets: [{ x: 72, y: 322, w: 4, h: 12 }],
    });
  if (sample === "multiple") {
    // A wide diagnostic bullet genuinely overlaps two rectangles.
    s.aliens = [
      { x: 70, y: 160, w: 36, h: 26 },
      { x: 108, y: 160, w: 36, h: 26 },
      ...s.aliens.slice(2),
    ];
    s.bullets = [{ x: 100, y: 178, w: 20, h: 18 }];
  }
  if (sample === "clear") {
    s.aliens = s.aliens.slice(0, 1);
    s.bullets = [{ x: 50, y: 178, w: 4, h: 18 }];
  }
  if (sample === "life") {
    s.lives = 1;
    s.aliens = [{ x: 158, y: 339, w: 36, h: 26 }];
  }
  return s;
}
export function scoringHit(r: ScoringRect, x: number, y: number) {
  return x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h;
}
function overlap(a: ScoringRect, b: ScoringRect) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}
export function scoringTrace(
  seed: ScoringWorld,
  sample: ScoringSample,
  point: { x: number; y: number },
  fault: boolean,
) {
  const copy = (s: ScoringWorld): ScoringWorld => ({
    ...s,
    aliens: s.aliens.map((a) => ({ ...a })),
    bullets: s.bullets.map((b) => ({ ...b })),
  });
  const frames = [copy(seed)];
  let s = copy(seed);
  let hits = 0;
  let keys = 0;
  const accepted = !s.active && scoringHit(PLAY_RECT, point.x, point.y);
  if (sample === "start" || sample === "restart") {
    frames.push(copy(s), copy(s)); // No partial new game is observable.
    if (accepted) {
      s = { ...initialScoringWorld(), high: s.high, active: true };
      if (fault) {
        s.speed = seed.speed;
        s.points = seed.points;
      }
    }
  } else if (s.active && sample === "life") {
    frames.push(copy(s));
    if (
      s.aliens.some((a) =>
        overlap(a, { x: s.shipX - 18, y: 340, w: 36, h: 24 }),
      )
    ) {
      s.lives = Math.max(0, s.lives - 1);
      s.active = s.lives > 0;
      s.bullets = [];
      if (s.active) {
        s.aliens = scoringFleet();
        s.shipX = 170;
      }
    }
    frames.push(copy(s));
  } else if (s.active) {
    s.bullets = s.bullets.filter((b) => {
      const targets = s.aliens.filter((a) => overlap(a, b));
      if (!targets.length) return true;
      keys += 1;
      hits += targets.length;
      s.aliens = s.aliens.filter((a) => !targets.includes(a));
      return false;
    });
    frames.push(copy(s));
    s.score += (fault ? keys : hits) * s.points;
    s.high = Math.max(s.high, s.score);
    frames.push(copy(s));
    if (s.aliens.length === 0) {
      s.bullets = [];
      s.aliens = scoringFleet();
      s.speed *= 1.1;
      s.points = Math.trunc(s.points * 1.5);
      s.level += 1;
    }
  } else {
    frames.push(copy(s), copy(s));
  }
  frames.push(copy(s));
  return { frames, hits, keys, accepted };
}
// MODEL END

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const STEPS = [
  { label: "before", caption: "事件前：保留旧状态" },
  { label: "geometry", caption: "几何检测：命中区域或碰撞对象" },
  { label: "score", caption: "结算：旧关分值与最高分" },
  { label: "commit", caption: "提交：新局完整重置 / 补队升级" },
] as const;
const buildTimeline: BuildTimeline = (tl) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, i) => {
    tl.label(label, i * 1300);
    tl.add(clock, { tick: i + 1, duration: 1300, ease: "linear" }, i * 1300);
  });
};
const samples: [ScoringSample, string][] = [
  ["start", "首次开始 / 边界命中"],
  ["restart", "高难度结束后重开"],
  ["multiple", "一弹命中两只"],
  ["clear", "命中最后一只并升级"],
  ["life", "最后一条生命被撞"],
];
const buttonClass =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

export function PccScoringLab() {
  const [sample, setSample] = useState<ScoringSample>("start");
  const [fault, setFault] = useState(false);
  const [point, setPoint] = useState({ x: 170, y: 272 });
  const [seed, setSeed] = useState(initialScoringWorld);
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const id = useId();
  const trace = scoringTrace(seed, sample, point, fault);
  const step = timeline.currentStep;
  const s = trace.frames[step];
  const isPlay = sample === "start" || sample === "restart";
  const prepare = (next: ScoringSample) => {
    timeline.goToStep(0);
    setSample(next);
    setSeed(scoringFixture(next));
    setPoint({ x: 170, y: 272 });
  };
  const choosePoint = (p: { x: number; y: number }) => {
    timeline.goToStep(0);
    setPoint(p);
  };
  const reset = () => {
    prepare("start");
    setFault(false);
  };
  return (
    <section
      aria-label="计分实验：按钮命中、碰撞计分和跨局重置"
      className="my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11"
    >
      <h3 className="mt-0 text-lg font-semibold text-primary">
        计分不是数字动画，而是事件结算
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={`${id}-sample`} className="text-sm text-secondary">
          样本
        </label>
        <select
          id={`${id}-sample`}
          value={sample}
          onChange={(e) => prepare(e.target.value as ScoringSample)}
          className="min-h-11 min-w-0 max-w-full rounded-control border border-border bg-elevated px-2 text-sm text-primary"
        >
          {samples.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={fault}
            onChange={(e) => {
              timeline.goToStep(0);
              setFault(e.target.checked);
            }}
          />
          故障：漏重置难度 / 按子弹计分
        </label>
        <button type="button" className={buttonClass} onClick={reset}>
          完整重置实验
        </button>
      </div>
      <p className="text-sm text-secondary">
        先预测，再单步或播放。战场可点按设置命中坐标；键盘用下方按钮做同样操作。虚线框是检测区域，不是额外得分目标。
      </p>
      <svg
        viewBox="0 0 340 430"
        width="340"
        height="430"
        className="mx-auto block h-auto w-full max-w-[400px] touch-manipulation"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        onPointerDown={(e) => {
          if (!isPlay) return;
          const matrix = e.currentTarget.getScreenCTM();
          if (!matrix) return;
          const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(
            matrix.inverse(),
          );
          choosePoint({ x: Math.floor(p.x), y: Math.floor(p.y) });
        }}
      >
        <title id={`${id}-title`}>{`外星人入侵：第${s.level}关，得分${s.score}，最高分${s.high}，生命${s.lives}`}</title>
        <desc id={`${id}-desc`}>
          开始与重开只在非活动时接受按钮内的点。碰撞移除真实矩形，随后按消灭的外星人数计分。生命减至零停止；高分跨局保留但不存磁盘。
        </desc>
        <rect
          x="1"
          y="1"
          width="338"
          height="428"
          rx="10"
          fill={C.bg}
          stroke={C.border}
        />
        <g fill={C.text} fontSize="17">
          <text x="16" y="29">
            最高 {s.high.toLocaleString("en-US")}
          </text>
          <text x="324" y="29" textAnchor="end">
            得分 {s.score.toLocaleString("en-US")}
          </text>
          <text x="16" y="58">
            {s.active ? "活动中" : "等待 Play"}
          </text>
          <text x="324" y="58" textAnchor="end">
            第 {s.level} 关
          </text>
          <text x="16" y="89">
            生命 {s.lives}
          </text>
          <text x="324" y="89" textAnchor="end">
            每只 {s.points} 分
          </text>
        </g>
        {Array.from({ length: s.lives }, (_, i) => (
          <path
            key={i}
            d="M0 14 L10 0 L20 14 L10 10 Z"
            transform={`translate(${20 + i * 30} 101)`}
            fill={C.accent}
          />
        ))}
        <line x1="12" y1="130" x2="328" y2="130" stroke={C.border} />
        {s.aliens.map((a, i) => (
          <g key={i}>
            <path
              d={`M${a.x} ${a.y + 8} l8 -8 h20 l8 8 v14 h-8 v-6 h-20 v6 h-8 Z`}
              fill={C.accent}
            />
            <path
              d={`M${a.x + 9} ${a.y + 10} h4 M${a.x + 23} ${a.y + 10} h4`}
              stroke={C.bg}
              strokeWidth="3"
            />
            <rect
              x={a.x}
              y={a.y}
              width={a.w}
              height={a.h}
              fill="none"
              stroke={C.muted}
              strokeDasharray="3 3"
            />
          </g>
        ))}
        {s.bullets.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill={C.text}
          />
        ))}
        {(sample === "multiple" || sample === "clear") && step > 0 && (
          <g fill={fault ? C.danger : C.accent} fontSize="17">
            <text x="170" y="223" textAnchor="middle">
              移除 {trace.hits} 只 / 命中弹 {trace.keys} 颗
            </text>
            <text x="170" y="252" textAnchor="middle">
              {step > 1
                ? `+${(fault ? trace.keys : trace.hits) * seed.points} 分`
                : "先移除，再结算"}
            </text>
          </g>
        )}
        {!s.active && (
          <g>
            <rect
              {...{
                x: PLAY_RECT.x,
                y: PLAY_RECT.y,
                width: PLAY_RECT.w,
                height: PLAY_RECT.h,
              }}
              rx="6"
              fill={C.elevated}
              stroke={C.accent}
              strokeWidth="2"
            />
            <text
              x="170"
              y="278"
              textAnchor="middle"
              fill={C.text}
              fontSize="20"
            >
              Play
            </text>
          </g>
        )}
        {isPlay && step < 3 && (
          <g stroke={trace.accepted ? C.accent : C.danger} strokeWidth="2">
            <circle cx={point.x} cy={point.y} r="7" fill="none" />
            <path
              d={`M${point.x - 11} ${point.y} h22 M${point.x} ${point.y - 11} v22`}
            />
          </g>
        )}
        <path
          d={`M${s.shipX - 18} 364 L${s.shipX} 340 L${s.shipX + 18} 364 L${s.shipX} 357 Z`}
          fill={s.lives ? C.text : C.muted}
        />
        <line x1="12" y1="376" x2="328" y2="376" stroke={C.border} />
        <text x="16" y="401" fontSize="16" fill={C.text}>
          速度 ×{s.speed.toFixed(2)}
        </text>
        <line
          x1="176"
          y1="398"
          x2={176 + 84 * s.speed}
          y2="398"
          stroke={C.accent}
          strokeWidth="5"
        />
        <text x="16" y="422" fontSize="16" fill={C.muted}>
          横线长度 = 同时长移动距离
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!isPlay}
          className={buttonClass}
          onClick={() => choosePoint({ x: 170, y: 272 })}
        >
          测试 Play 中心
        </button>
        <button
          type="button"
          disabled={!isPlay}
          className={buttonClass}
          onClick={() => choosePoint({ x: 250, y: 272 })}
        >
          测试右边界 x=250
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={step !== 3}
          onClick={() => {
            timeline.goToStep(0);
            setSeed(s);
            setSample("restart");
            setPoint({ x: 170, y: 272 });
          }}
        >
          保留结果再点 Play
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-16 text-sm text-primary">
        {isPlay
          ? `点 (${point.x}, ${point.y})：${trace.accepted ? "命中且未在游戏中，最后一步才原子提交新局" : "拒绝：点在区域外，或游戏已活动"}。`
          : `碰撞返回 ${trace.keys} 个子弹键、${trace.hits} 个外星人；以事件前每只 ${seed.points} 分结算。`}
        {` 当前得分 ${s.score}，最高 ${s.high}，第 ${s.level} 关，生命 ${s.lives}。`}
        {sample === "life"
          ? "本实验生命减到零即停止；这与作者示例的先检查再扣减边界不同。"
          : ""}
        {fault ? " 故障已开启，请对照正常结果；不是额外游戏规则。" : ""}
      </p>
      <div className="[&_ol]:hidden [&_.justify-center]:flex-wrap [&_button>span]:hidden">
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(STEPS.map((s) => [s.label, s.caption]))}
        />
      </div>
      <p className="text-sm text-secondary">
        四步是事件回放，不是游戏帧率。切换样本装入固定夹具；“完整重置实验”清除高分、故障和回放位置，“Play”只重开本局并保留高分。
      </p>
    </section>
  );
}
