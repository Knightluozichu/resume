"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;

const STEPS = [
  { label: "instances", caption: "创建 A、B 两辆车" },
  { label: "alias", caption: "alias 指向 A，不创建车" },
  { label: "update", caption: "通过 alias 更新 A 到 40" },
  { label: "increment", caption: "给 B 增加 20" },
  { label: "append", caption: "向 A 的列表追加 check" },
  { label: "reject", caption: "拒绝把 A 改回 10" },
] as const;

const CODE = [
  'a, b = Car("A"), Car("B")',
  "alias = a",
  "alias.update_odometer(40)",
  "b.increment_odometer(20)",
  'a.services.append("check")',
  "a.update_odometer(10)  # ValueError",
];
const LABEL_TEXT = Object.fromEntries(
  STEPS.map(({ label, caption }) => [label, caption]),
);
const BEAT_MS = 1600;

// Each label begins its snapshot, including the last step. Seeking reconstructs
// state from the executed prefix, rather than accumulating mutable side effects.
const buildTimeline: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, index) => {
    timeline.label(label, index * BEAT_MS);
    timeline.add(
      clock,
      { tick: index + 1, duration: BEAT_MS, ease: "linear" },
      index * BEAT_MS,
    );
  });
};

function Odometer({
  x,
  name,
  mileage,
  receiving,
  rejected,
}: {
  x: number;
  name: string;
  mileage: number;
  receiving: boolean;
  rejected: boolean;
}) {
  const angle = ((-135 + (mileage / 60) * 270) * Math.PI) / 180;
  const stroke = rejected ? C.danger : receiving ? C.accent : C.border;
  return (
    <g>
      <text x={x} y={344} textAnchor="middle" fill={C.primary}>
        实例 {name}
      </text>
      <circle
        cx={x}
        cy={440}
        r={86}
        fill={C.elevated}
        stroke={stroke}
        strokeWidth={4}
      />
      {/* A needle and filled arc encode magnitude, not just a numeric label. */}
      <circle
        cx={x}
        cy={440}
        r={72}
        fill="none"
        stroke={C.accent}
        strokeWidth={10}
        strokeDasharray={`${(mileage / 60) * 452.4} 452.4`}
        transform={`rotate(-90 ${x} 440)`}
      />
      <line
        x1={x}
        y1={440}
        x2={x + Math.sin(angle) * 57}
        y2={440 - Math.cos(angle) * 57}
        stroke={C.primary}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <circle cx={x} cy={440} r={9} fill={C.primary} />
      <text x={x} y={576} textAnchor="middle" fill={C.primary}>
        {mileage} km
      </text>
      <text x={x} y={620} textAnchor="middle" fill={C.secondary}>
        odometer
      </text>
      {rejected && (
        <g stroke={C.danger} strokeWidth={5}>
          <line x1={x + 72} y1={360} x2={x + 100} y2={388} />
          <line x1={x + 100} y1={360} x2={x + 72} y2={388} />
        </g>
      )}
    </g>
  );
}

function ServiceList({
  x,
  y,
  identity,
  count,
  shared,
}: {
  x: number;
  y: number;
  identity: string;
  count: number;
  shared: boolean;
}) {
  return (
    <g>
      <rect
        x={x - 160}
        y={y}
        width={320}
        height={150}
        rx={10}
        fill={C.bg}
        stroke={shared ? C.danger : C.border}
        strokeWidth={3}
      />
      <text x={x} y={y + 40} textAnchor="middle" fill={C.secondary}>
        {identity}
      </text>
      {count > 0 ? (
        <g>
          <rect
            x={x - 140}
            y={y + 60}
            width={280}
            height={70}
            rx={6}
            fill={C.accent}
            fillOpacity={0.14}
          />
          <circle cx={x - 110} cy={y + 95} r={9} fill={C.accent} />
          <text x={x + 12} y={y + 106} textAnchor="middle" fill={C.primary}>
            check
          </text>
        </g>
      ) : (
        <text x={x} y={y + 106} textAnchor="middle" fill={C.secondary}>
          空列表
        </text>
      )}
    </g>
  );
}

export function PccClassesLab() {
  const [sharedServices, setSharedServices] = useState(false);
  const [prediction, setPrediction] = useState<"" | "A" | "both">("");
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const markerId = `classes-arrow-${useId().replace(/:/g, "")}`;
  const step = timeline.currentStep;
  const hasAlias = step >= 1;
  const aMileage = step >= 2 ? 40 : 0;
  const bMileage = step >= 3 ? 20 : 0;
  const appended = step >= 4;
  const rejected = step === 5;
  const receiver = step === 2 || rejected ? "A" : step === 3 ? "B" : null;
  const aRecords = appended ? 1 : 0;
  const bRecords = appended && sharedServices ? 1 : 0;
  const explanation = [
    "两个圆圈是两个实例。每次 Car(...) 都初始化自己的里程；下面的连线说明维修列表归谁持有。",
    "alias 的新连线和 a 汇合到 A；对象仍只有两个。新名字不等于新实例。",
    "alias 接收的普通方法绑定到 A：self 就是 A。只有 A 的指针转到 40，B 保持 0。",
    "这次 self 是 B，先读 B 的 0，再加 20。A 保持 40；方法代码可以共用，接收对象不同。",
    sharedServices
      ? "两条 services 查找路线汇合到 Car.services。append 只改一个列表，但 A、B 都能看到 check；车辆身份仍不同。"
      : "A.services 和 B.services 分别指向两份列表。append 只给 A 的列表新增一格，B 仍为空。",
    "40 → 10 被 update_odometer 的检查拒绝；红叉表示拒绝写入，A 的指针保持 40。这不是自动属性保护。",
  ][step];

  const reset = () => {
    timeline.goToStep(0);
    setSharedServices(false);
    setPrediction("");
  };

  return (
    <section
      aria-label="类与实例实验：预测接收对象，用里程仪表和列表引用比较独立实例与共享类属性"
      className="not-prose my-8 min-w-0 max-w-full rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:whitespace-normal [&_button]:break-words [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input[type=range]]:min-h-11 [&_input[type=range]]:focus-visible:outline-2 [&_input[type=range]]:focus-visible:outline-accent"
    >
      <h3 className="m-0 text-base font-semibold text-primary">
        两辆车，几份状态？
      </h3>
      <p className="mt-2 text-sm text-secondary">
        先预测第 3 步：通过 alias 更新里程，哪些仪表会变？选择后单步验证。
      </p>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="记录你的里程预测"
      >
        {(
          [
            ["A", "只有 A"],
            ["both", "A 和 B"],
          ] as const
        ).map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={prediction === value}
            onClick={() => setPrediction(value)}
            className={`rounded-control border px-3 py-2 text-sm ${prediction === value ? "border-accent text-accent" : "border-border text-primary"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-pressed={sharedServices}
        onClick={() => {
          timeline.pause();
          setSharedServices((shared) => !shared);
        }}
        className={`w-full rounded-control border px-3 py-2 text-left text-sm ${sharedServices ? "border-danger text-primary" : "border-border text-primary"}`}
      >
        {sharedServices
          ? "已开启：共享列表错误模式"
          : "每辆车独立列表（点此注入共享错误）"}
      </button>
      <p className="mt-2 break-words text-sm text-secondary">
        {sharedServices
          ? "错误定义：把 services = [] 移到类体，并去掉 self.services = []。里程仍在实例上。"
          : "正确定义：在 __init__ 内执行 self.services = []，每辆车得到新的列表。"}
      </p>

      <svg
        viewBox="0 0 780 1060"
        role="img"
        aria-label={`第${step + 1}步对象引用图。a${hasAlias ? "和alias" : ""}指向A，b指向B。A里程${aMileage}，B里程${bMileage}。${sharedServices ? "共享一个类属性列表" : "两个实例分别持有独立列表"}。A可见${aRecords}条记录，B可见${bRecords}条记录。${rejected ? "倒退更新被拒绝。" : ""}`}
        className="mx-auto block h-auto w-full max-w-[620px]"
        style={{ fontSize: 32, fontFamily: "var(--font-mono), monospace" }}
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX={9}
            refY={5}
            markerWidth={8}
            markerHeight={8}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="context-stroke" />
          </marker>
        </defs>
        <rect
          x={30}
          y={20}
          width={720}
          height={140}
          rx={12}
          fill={C.bg}
          stroke={C.border}
          strokeWidth={3}
        />
        <text x={390} y={65} textAnchor="middle" fill={C.primary}>
          Car 的方法实现（共用）
        </text>
        <text
          x={390}
          y={115}
          textAnchor="middle"
          fill={receiver ? C.accent : C.secondary}
        >
          {receiver ? `本次 self → 实例 ${receiver}` : "实例调用时才绑定 self"}
        </text>
        {receiver && (
          <path
            d={
              receiver === "A"
                ? "M 45 155 C 5 265 45 335 112 393"
                : "M 735 155 C 775 265 735 335 668 393"
            }
            fill="none"
            stroke={rejected ? C.danger : C.accent}
            strokeWidth={5}
            strokeDasharray="12 8"
            markerEnd={`url(#${markerId})`}
          />
        )}
        <g fill={C.primary}>
          <text x={120} y={220} textAnchor="middle">
            a
          </text>
          <text x={640} y={220} textAnchor="middle">
            b
          </text>
          {hasAlias && (
            <text x={340} y={220} textAnchor="middle">
              alias
            </text>
          )}
        </g>
        <g
          fill="none"
          stroke={C.accent}
          strokeWidth={4}
          markerEnd={`url(#${markerId})`}
        >
          <path d="M 120 238 L 175 303" />
          <path d="M 640 238 L 605 303" />
          {hasAlias && <path d="M 340 238 Q 320 295 216 306" />}
        </g>
        <Odometer
          x={190}
          name="A"
          mileage={aMileage}
          receiving={receiver === "A"}
          rejected={rejected}
        />
        <Odometer
          x={590}
          name="B"
          mileage={bMileage}
          receiving={receiver === "B"}
          rejected={false}
        />
        <g
          fill="none"
          stroke={sharedServices ? C.danger : C.accent}
          strokeWidth={4}
          markerEnd={`url(#${markerId})`}
        >
          {sharedServices ? (
            <>
              <path d="M 112 496 C 0 610 50 680 320 782" />
              <path d="M 668 496 C 780 610 730 680 460 782" />
            </>
          ) : (
            <>
              <path d="M 112 496 C 10 630 70 710 160 757" />
              <path d="M 668 496 C 770 630 710 710 620 757" />
            </>
          )}
        </g>
        {sharedServices ? (
          <>
            <text x={390} y={688} textAnchor="middle" fill={C.danger}>
              类属性：一份列表
            </text>
            <ServiceList
              x={390}
              y={800}
              identity="Car.services"
              count={aRecords}
              shared
            />
          </>
        ) : (
          <>
            <ServiceList
              x={190}
              y={775}
              identity="A.services → L1"
              count={aRecords}
              shared={false}
            />
            <ServiceList
              x={590}
              y={775}
              identity="B.services → L2"
              count={bRecords}
              shared={false}
            />
          </>
        )}
        <text x={390} y={1020} textAnchor="middle" fill={C.secondary}>
          {sharedServices ? "A ≠ B，但列表身份相同" : "A ≠ B，列表身份也不同"}
        </text>
      </svg>

      <div className="rounded-control border border-border bg-[var(--bg)] p-3">
        <p className="m-0 text-sm text-secondary">
          当前执行行（第 {step + 1} / {STEPS.length} 步）
        </p>
        <code className="mt-2 block whitespace-pre-wrap break-all text-sm text-primary">
          {CODE[step]}
        </code>
        <p
          className="mt-3 text-sm text-primary"
          aria-live="polite"
          aria-atomic="true"
        >
          {explanation}
        </p>
        {step >= 2 && prediction && (
          <p className="mt-2 text-sm text-accent">
            {prediction === "A"
              ? "预测吻合：只有 A 改变。"
              : "对照你的预测：B 没有跟着变，alias 并未指向 B。"}{" "}
            第 3 步结果为 A=40、B=0。
          </p>
        )}
        <p className="mt-2 text-sm text-secondary">
          现在：A={aMileage} km，B={bMileage} km；A 可见 {aRecords}{" "}
          条维修记录，B 可见 {bRecords} 条。
        </p>
      </div>
      {/* Hide the shared strip's aria-hidden step buttons from keyboard focus as
          well; accessible previous/next and range controls remain available. */}
      <div className="[&_ol[aria-hidden=true]]:hidden [&_.flex]:flex-wrap">
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="实线表示对象引用，虚线表示本次方法绑定；单步或拖动可重看历史状态。"
          reset={{ label: "重置实验", onClick: reset }}
        />
      </div>
    </section>
  );
}
