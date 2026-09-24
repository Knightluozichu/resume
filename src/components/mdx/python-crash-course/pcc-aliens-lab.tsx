"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

// MODEL START — integer rectangles, matching the chapter's explicit Pygame calls.
export type AlienRect = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
export type AlienWorld = {
  width: number;
  aliens: AlienRect[];
  bullets: AlienRect[];
  ship: AlienRect;
  direction: number;
  lives: number;
  active: boolean;
  wave: number;
  frame: number;
  drops: number;
  hits: string[];
  reason: string;
};
export type AlienScenario =
  | "fleet"
  | "edge"
  | "touch"
  | "overlap"
  | "double"
  | "refill"
  | "ship"
  | "bottom"
  | "last";
export const ALIEN_H = 300;
export function fleetLayout(width: number): AlienRect[] {
  const columns = Math.max(0, Math.floor((width - 48) / 48));
  const rows = Math.max(0, Math.floor((ALIEN_H - 54 - 16) / 36));
  return Array.from({ length: columns * rows }, (_, i) => ({
    id: `A${i + 1}`,
    x: 24 + 48 * (i % columns),
    y: 18 + 36 * Math.floor(i / columns),
    w: 24,
    h: 18,
  }));
}
export function rectOverlap(a: AlienRect, b: AlienRect): boolean {
  return (
    a.w > 0 &&
    a.h > 0 &&
    b.w > 0 &&
    b.h > 0 &&
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}
export function initialAlienWorld(
  width = 320,
  scenario: AlienScenario = "fleet",
): AlienWorld {
  const ship = { id: "S", x: width / 2 - 16, y: 272, w: 32, h: 16 };
  const a = { id: "A1", x: 96, y: 90, w: 24, h: 18 };
  const state: AlienWorld = {
    width,
    aliens: fleetLayout(width),
    bullets: [],
    ship,
    direction: 1,
    lives: scenario === "last" ? 1 : 3,
    active: true,
    wave: 1,
    frame: 0,
    drops: 0,
    hits: [],
    reason: "",
  };
  if (scenario === "edge")
    state.aliens = [
      { ...a, x: width - 24, y: 18 },
      { ...a, id: "A2", x: width - 24, y: 54 },
    ];
  if (["touch", "overlap", "double", "refill"].includes(scenario)) {
    state.aliens = [a];
    if (scenario !== "refill")
      state.aliens.push({ ...a, id: "A2", x: 24, y: 18 });
    state.bullets = [
      { id: "B1", x: 108, y: scenario === "touch" ? 116 : 115, w: 4, h: 8 },
    ];
    if (scenario === "double")
      state.bullets.push({ ...state.bullets[0], id: "B2" });
  }
  if (scenario === "ship" || scenario === "last")
    state.aliens = [{ ...a, x: ship.x - 2, y: ship.y }];
  if (scenario === "bottom") state.aliens = [{ ...a, x: 24, y: 282 }];
  return state;
}
export function alienFrameTrace(
  input: AlienWorld,
  repeatedDrop = false,
): AlienWorld[] {
  let s: AlienWorld = {
    ...input,
    frame: input.frame + Number(input.active),
    drops: 0,
    hits: [],
    reason: "",
  };
  const frames = [s];
  if (!s.active) return Array.from({ length: 6 }, () => s);
  // Same order as the runnable Python: bullets → groupcollide → refill → fleet → hazard.
  s = {
    ...s,
    bullets: s.bullets
      .map((b) => ({ ...b, y: b.y - 8 }))
      .filter((b) => b.y + b.h > 0),
  };
  frames.push(s);
  let aliens = [...s.aliens];
  const bullets: AlienRect[] = [];
  const hits: string[] = [];
  // pygame 2.6.1 groupcollide(..., True, True): each bullet sees the surviving group.
  // Do NOT compute all pairs first: B2 must not hit an alien already killed by B1.
  for (const bullet of s.bullets) {
    const victims = aliens.filter((a) => rectOverlap(bullet, a));
    if (victims.length) {
      hits.push(`${bullet.id} → ${victims.map((a) => a.id).join(", ")}`);
      aliens = aliens.filter((a) => !victims.includes(a));
    } else bullets.push(bullet);
  }
  s = { ...s, aliens, bullets, hits };
  frames.push(s);
  if (!s.aliens.length)
    s = {
      ...s,
      aliens: fleetLayout(s.width),
      bullets: [],
      direction: 1,
      wave: s.wave + 1,
    };
  frames.push(s);
  const edgeCount = s.aliens.filter(
    (a) => a.x <= 0 || a.x + a.w >= s.width,
  ).length;
  const drops = repeatedDrop ? edgeCount : Number(edgeCount > 0);
  const direction = drops % 2 ? -s.direction : s.direction;
  s = {
    ...s,
    drops,
    direction,
    aliens: s.aliens.map((a) => ({
      ...a,
      x: a.x + 2 * direction,
      y: a.y + 18 * drops,
    })),
  };
  frames.push(s);
  const shipHit = s.aliens.some((a) => rectOverlap(s.ship, a));
  const bottom = s.aliens.some((a) => a.y + a.h >= ALIEN_H);
  if (shipHit || bottom) {
    const lives = s.lives - 1;
    s = {
      ...s,
      lives,
      active: lives > 0,
      reason: shipHit ? "飞船碰撞" : "外星人触底",
      bullets: [],
      aliens: lives > 0 ? fleetLayout(s.width) : [],
      direction: lives > 0 ? 1 : s.direction,
      ship: lives > 0 ? { ...s.ship, x: s.width / 2 - 16 } : s.ship,
    };
  }
  frames.push(s);
  return frames;
}
// MODEL END

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const STEPS = [
  { label: "start", caption: "帧开始：读取坐标" },
  { label: "bullets", caption: "子弹上移 8，移除出界子弹" },
  { label: "collision", caption: "逐颗处理矩形碰撞与删除" },
  { label: "refill", caption: "若舰队为空，清弹并补队" },
  { label: "fleet", caption: "聚合碰边、统一下降与横移" },
  { label: "life", caption: "飞船碰撞或触底：最多扣一次生命" },
] as const;
const buildTimeline: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, i) => {
    timeline.label(label, i * 1200);
    timeline.add(
      clock,
      { tick: i + 1, duration: 1200, ease: "linear" },
      i * 1200,
    );
  });
};
const scenarios: [AlienScenario, string][] = [
  ["fleet", "完整舰队"],
  ["edge", "两只同时碰右边"],
  ["touch", "子弹仅贴边"],
  ["overlap", "子弹重叠 1 像素"],
  ["double", "两弹争同一目标"],
  ["refill", "命中最后一只"],
  ["ship", "飞船被撞"],
  ["bottom", "外星人触底"],
  ["last", "最后一条生命"],
];

export function PccAliensLab() {
  const [width, setWidth] = useState(320);
  const [scenario, setScenario] = useState<AlienScenario>("fleet");
  const [bug, setBug] = useState(false);
  const [seed, setSeed] = useState(() => initialAlienWorld());
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const id = useId().replace(/:/g, "");
  const trace = alienFrameTrace(seed, bug);
  const step = timeline.currentStep;
  const s = trace[step];
  const tested = trace[1];
  const first = s.aliens[0];
  const bullet = tested.bullets[0];
  const target = tested.aliens.find((a) => a.id === "A1");
  const restart = (w: number, sample: AlienScenario, fault: boolean) => {
    timeline.goToStep(0);
    setWidth(w);
    setScenario(sample);
    setBug(fault);
    setSeed(initialAlienWorld(w, sample));
  };
  const reset = () => restart(320, "fleet", false);
  const ghosts =
    step === 2
      ? tested.aliens.filter((a) => !s.aliens.some((b) => b.id === a.id))
      : [];
  return (
    <section
      aria-label="外星人舰队：空间、矩形碰撞与生命状态实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 text-sm text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:whitespace-normal [&_input]:min-h-11 [&_select]:min-h-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent"
    >
      <h3 className="text-lg font-semibold">舰队实验台：一帧拆成六个检查点</h3>
      <p className="my-2 text-secondary">
        蓝框是外星人的碰撞矩形，实心细条是子弹，底部轮廓是飞船。虚线表示本阶段被删除的目标。坐标单位为像素。
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0">
          战场宽度 W = {width}
          <input
            className="block w-full accent-accent"
            type="range"
            min={192}
            max={320}
            step={16}
            value={width}
            onChange={(e) => restart(Number(e.target.value), scenario, bug)}
          />
        </label>
        <label className="min-w-0">
          边界样本
          <select
            className="block w-full min-w-0 rounded-control border border-border bg-elevated px-2"
            value={scenario}
            onChange={(e) =>
              restart(width, e.target.value as AlienScenario, bug)
            }
          >
            {scenarios.map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="my-2 flex min-h-11 items-center gap-2">
        <input
          type="checkbox"
          className="h-11 w-11 shrink-0 accent-accent"
          checked={bug}
          onChange={(e) => restart(width, scenario, e.target.checked)}
        />
        注入错误：按碰边对象数重复下降与反向
      </label>
      <p className="text-secondary">
        切换宽度、样本或错误模式会从帧起点重建。先预测结果，再点“下一步”到相应检查点。
      </p>
      <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-2">
        <svg
          viewBox="0 0 340 350"
          className="block w-full min-w-0"
          role="img"
          aria-label={`战场宽${width}高300，${s.aliens.length}只外星人，${s.bullets.length}颗子弹；方向${s.direction}，本帧下降${s.drops}次。`}
          fontSize={16}
        >
          <title>舰队按实际坐标绘制；碰边统一处理，矩形严格重叠才命中</title>
          <text x={10} y={19} fill={C.text}>
            x = 0
          </text>
          <text x={10 + width} y={19} textAnchor="end" fill={C.text}>
            x = {width}
          </text>
          <g transform="translate(10 28)">
            <rect
              width={width}
              height={ALIEN_H}
              fill={C.bg}
              stroke={C.border}
            />
            {[72, 144, 216].map((y) => (
              <line
                key={y}
                x1={0}
                x2={width}
                y1={y}
                y2={y}
                stroke={C.border}
                strokeDasharray="3 6"
              />
            ))}
            {s.aliens.map((a) => (
              <g key={a.id}>
                <rect
                  x={a.x}
                  y={a.y}
                  width={a.w}
                  height={a.h}
                  fill={C.accent}
                  fillOpacity={0.18}
                  stroke={C.accent}
                />
                <path
                  d={`M${a.x + 6} ${a.y + 6}v3m12 -3v3M${a.x + 6} ${a.y + 13}h12`}
                  stroke={C.accent}
                  strokeWidth={2}
                />
              </g>
            ))}
            {ghosts.map((a) => (
              <rect
                key={a.id}
                x={a.x}
                y={a.y}
                width={a.w}
                height={a.h}
                fill="none"
                stroke={C.danger}
                strokeDasharray="3 2"
              />
            ))}
            {s.bullets.map((b) => (
              <rect
                key={b.id}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill={C.text}
              />
            ))}
            <rect
              x={s.ship.x}
              y={s.ship.y}
              width={s.ship.w}
              height={s.ship.h}
              stroke={C.text}
              fill="none"
            />
            <path
              d={`M${s.ship.x} ${s.ship.y + 16}L${s.ship.x + 16} ${s.ship.y}L${s.ship.x + 32} ${s.ship.y + 16}`}
              stroke={C.text}
              fill="none"
            />
            <line
              x1={0}
              x2={width}
              y1={ALIEN_H}
              y2={ALIEN_H}
              stroke={C.danger}
              strokeWidth={2}
            />
          </g>
          <text x={10} y={346} fill={C.muted}>
            底线 y = 300；飞船顶边 y = 272
          </text>
        </svg>
        <div className="min-w-0 space-y-3">
          <p aria-live="polite">
            {STEPS[step].caption}。第 {s.frame} 帧，第 {s.wave} 波；方向{" "}
            {s.direction === 1 ? "向右" : "向左"}，下降 {s.drops} 次。
          </p>
          <p>
            完整布局：{Math.floor((width - 48) / 48)} 列 × 6 行。首个存活目标：
            {first
              ? `${first.id}，左上 (${first.x}, ${first.y})，右下 (${first.x + first.w}, ${first.y + first.h})`
              : "无"}
            。
          </p>
          {seed.frame === 0 && bullet && target && (
            <div className="rounded-control border border-border p-2">
              <p>首帧碰撞坐标（子弹上移后）</p>
              <p>
                目标 A1：x [{target.x}, {target.x + target.w})，y [{target.y},{" "}
                {target.y + target.h})
              </p>
              <p>
                子弹 B1：x [{bullet.x}, {bullet.x + bullet.w})，y [{bullet.y},{" "}
                {bullet.y + bullet.h})
              </p>
              <svg
                viewBox="0 0 340 150"
                className="block w-full"
                role="img"
                aria-label={`放大碰撞几何：${rectOverlap(bullet, target) ? "重叠一像素，命中" : "仅接触，不命中"}`}
                fontSize={16}
              >
                <rect
                  x={48}
                  y={12}
                  width={96}
                  height={72}
                  fill={C.accent}
                  fillOpacity={0.18}
                  stroke={C.accent}
                />
                <rect
                  x={96}
                  y={12 + (bullet.y - target.y) * 4}
                  width={16}
                  height={32}
                  fill={C.text}
                />
                <line
                  x1={40}
                  x2={320}
                  y1={84}
                  y2={84}
                  stroke={C.danger}
                  strokeDasharray="4 3"
                />
                <text x={158} y={40} fill={C.text}>
                  目标底边 108
                </text>
                <text x={158} y={64} fill={C.text}>
                  子弹顶边 {bullet.y}
                </text>
                <text x={48} y={143} fill={C.text}>
                  {rectOverlap(bullet, target)
                    ? "重叠 1 像素 → 命中"
                    : "只有接触 → 不命中"}
                </text>
              </svg>
            </div>
          )}
          <p>
            命中记录：{s.hits.length ? s.hits.join("；") : "无"}；剩余子弹：
            {s.bullets.map((b) => b.id).join("、") || "无"}。
          </p>
          <p
            className={
              s.reason || (bug && s.drops > 1)
                ? "text-danger"
                : "text-secondary"
            }
          >
            {s.reason
              ? `${s.reason}：扣一次生命，${s.active ? "清场、居中并重建" : "结束，后续帧停止更新"}。`
              : bug && s.drops > 1
                ? "错误已显现：同帧下降两次，方向翻转两次等于没翻转，还会越界。"
                : "正常规则：碰边取“是否有”，而不是“共有几只”。"}
          </p>
        </div>
      </div>
      <svg
        viewBox="0 0 340 116"
        className="mt-2 block w-full"
        role="img"
        aria-label={`生命状态：剩余${s.lives}，game_active=${s.active}；每次碰船或触底仅向右转移一次。`}
        fontSize={16}
      >
        <defs>
          <marker
            id={`life-${id}`}
            markerWidth={8}
            markerHeight={8}
            refX={7}
            refY={4}
            orient="auto"
          >
            <path d="M0 0L8 4L0 8" fill={C.muted} />
          </marker>
        </defs>
        <text x={170} y={18} textAnchor="middle" fill={C.text}>
          每次碰船或触底：仅扣一次
        </text>
        {[3, 2, 1, 0].map((life, i) => (
          <g key={life}>
            {i < 3 && (
              <line
                x1={64 + i * 80}
                x2={95 + i * 80}
                y1={58}
                y2={58}
                stroke={C.muted}
                markerEnd={`url(#life-${id})`}
              />
            )}
            <circle
              cx={40 + i * 80}
              cy={58}
              r={23}
              fill={C.bg}
              stroke={s.lives === life ? C.accent : C.border}
              strokeWidth={s.lives === life ? 3 : 1}
            />
            <text x={40 + i * 80} y={64} textAnchor="middle" fill={C.text}>
              {life}
            </text>
            <text x={40 + i * 80} y={104} textAnchor="middle" fill={C.text}>
              {life ? "运行" : "结束"}
            </text>
          </g>
        ))}
      </svg>
      <div className="[&_ol]:hidden [&_input]:h-11 [&_.justify-center]:flex-wrap [&_button>span]:hidden">
        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(STEPS.map((s) => [s.label, s.caption]))}
          reset={{ label: "完整重置", onClick: reset }}
        />
      </div>
      <button
        type="button"
        className="mt-3 rounded-control border border-border px-3 py-2 disabled:opacity-50"
        disabled={step !== 5 || !s.active}
        onClick={() => {
          setSeed(trace[5]);
          timeline.goToStep(0);
        }}
      >
        从结算结果继续下一帧
      </button>
      <p className="mt-3 text-secondary">
        这是固定整数步长的教学模型，不是浏览器里的
        Pygame。时间线只拆解一帧，可倒放重算；真实程序每帧原子地执行同一顺序。图形使用矩形而非透明像素遮罩；样本中的
        B1 先于 B2 插入组。
      </p>
    </section>
  );
}
