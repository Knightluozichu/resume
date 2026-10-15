"use client";

import { useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

// All values are explicitly fictional teaching inputs, not browser/GPU measurements.
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--color-accent)";
const edge = "var(--color-border)";
const surface = "var(--bg-elevated)";
const paper = "var(--bg)";
const control =
  "min-h-11 min-w-11 rounded border border-border bg-bg px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const energySteps = ["第一段面积", "第二段面积", "第三段面积", "电量合计"].map(
  (label) => ({ label }),
);
const carbonSteps = ["选时空格", "设施电量", "按格加权", "核对边界"].map(
  (label) => ({ label }),
);
const ledgerSteps = ["共享训练", "运行累计", "制造切片", "分给请求"].map(
  (label) => ({ label }),
);

function useTrace(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const cursor = { value: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 1200));
      tl.add(
        cursor,
        { value: steps.length, duration: steps.length * 1200, ease: "linear" },
        0,
      );
    },
  });
}

function Lab({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_.mt-4.flex]:flex-wrap"
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-secondary">
        虚构教学算例 · 非 GPU 实测 · 初始暂停，逐步观察
      </p>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Fault({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={active}
      className={`${control} mt-3 w-full text-left`}
      onClick={onClick}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}

export function Llm12EnvironmentalImpactContextContractLab() {
  const [trace, setTrace] = useState("burst");
  const [devices, setDevices] = useState(2);
  const [host, setHost] = useState(100);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(energySteps);
  const dt = [0.25, 0.5, 0.25];
  const watts = (trace === "burst" ? [200, 400, 100] : [250, 250, 250]).map(
    (p) => devices * p + host,
  );
  const observed = fault ? watts.map(() => watts[0]) : watts;
  const parts = observed.map((p, i) => (p * dt[i]) / 1000);
  const total = parts.reduce((a, b) => a + b, 0);
  const trueTotal = watts.reduce((s, p, i) => s + (p * dt[i]) / 1000, 0);
  const xs = [42, 106, 234];
  const widths = [64, 128, 64];
  const y = (p: number) => 220 - (p / 2000) * 160;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setTrace("burst");
    setDevices(2);
    setHost(100);
    setFault(false);
  };
  return (
    <Lab kind="power-time-area-integral" title="实验一：功率曲线下的面积">
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field label="单设备功率轨迹">
          <select
            aria-label="单设备功率轨迹"
            className={control}
            value={trace}
            onChange={(e) => setTrace(e.target.value)}
          >
            <option value="burst">突发轨迹</option>
            <option value="steady">平稳轨迹</option>
          </select>
        </Field>
        <Field label="设备数">
          <select
            aria-label="设备数"
            className={control}
            value={devices}
            onChange={(e) => setDevices(Number(e.target.value))}
          >
            <option value={2}>两台设备</option>
            <option value={4}>四台设备</option>
          </select>
        </Field>
        <Field label="主机功率">
          <select
            aria-label="主机功率"
            className={control}
            value={host}
            onChange={(e) => setHost(Number(e.target.value))}
          >
            <option value={100}>低档 100 W</option>
            <option value={200}>高档 200 W</option>
          </select>
        </Field>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        采样器一直重复第一段
      </Fault>
      <svg
        role="img"
        aria-label="时变功率积分图：矩形宽度为时长，高度为IT功率；虚线为正确功率"
        viewBox="0 0 320 365"
        className="mx-auto mt-3 block w-full max-w-md"
        style={{ fontSize: 16, color: ink }}
      >
        <text x={12} y={22} fill={ink}>
          IT 功率 / W
        </text>
        {[0, 1000, 2000].map((p) => (
          <g key={p}>
            <line x1={42} x2={298} y1={y(p)} y2={y(p)} stroke={edge} />
            <text
              x={38}
              y={y(p) - 5}
              textAnchor="end"
              fill={muted}
              fontSize={15}
            >
              {p}
            </text>
          </g>
        ))}
        {observed.map((p, i) => (
          <g key={i}>
            <rect
              x={xs[i]}
              y={y(p)}
              width={widths[i]}
              height={220 - y(p)}
              fill={accent}
              fillOpacity={
                timeline.currentStep === i || timeline.currentStep === 3
                  ? 0.45
                  : 0.12
              }
              stroke={accent}
            />
            {fault && (
              <rect
                x={xs[i] + 2}
                y={y(watts[i])}
                width={widths[i] - 4}
                height={220 - y(watts[i])}
                fill="none"
                stroke={ink}
                strokeWidth={2}
                strokeDasharray="5 4"
              />
            )}
            <text
              x={xs[i] + widths[i] / 2}
              y={y(p) - 9}
              fill={ink}
              textAnchor="middle"
            >
              {p}
            </text>
            <text
              x={xs[i] + widths[i] / 2}
              y={247}
              fill={ink}
              textAnchor="middle"
            >
              {dt[i]}h
            </text>
            <text
              x={xs[i] + widths[i] / 2}
              y={275}
              fill={ink}
              textAnchor="middle"
            >
              {parts[i].toFixed(3)}
            </text>
          </g>
        ))}
        <text x={42} y={305} fill={muted}>
          各段面积：kWh（宽 × 高 / 1000）
        </text>
        <text x={42} y={335} fill={ink}>
          总面积 = {total.toFixed(3)} kWh
        </text>
      </svg>
      <p
        className="text-sm"
        role="status"
        data-result={total.toFixed(3)}
        data-reference={trueTotal.toFixed(3)}
        data-fault-active={fault}
      >
        报告 {total.toFixed(3)} kWh；正确 {trueTotal.toFixed(3)} kWh。
        {fault
          ? "采样丢失使账目偏离，不代表真实节能。"
          : "宽度是时间，不可对三个功率直接等权平均。"}
      </p>
      <p className="mt-2 text-sm text-secondary">
        边界仅含设备与主机 IT 电量；尚未计入机房开销。功率轨迹的高度不是参数量。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function Llm12EnvironmentalImpactComputeTraceLab() {
  const [region, setRegion] = useState("A");
  const [start, setStart] = useState(0);
  const [pue, setPue] = useState(1.2);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(carbonSteps);
  const grids = { A: [600, 500, 200, 100], B: [300, 250, 250, 300] };
  const ci = grids[region as "A" | "B"].slice(start, start + 2);
  const it = [0.2, 0.4];
  const factor = fault ? 1 : pue;
  const carbon = it.map((e, i) => (e * factor * ci[i]) / 1000);
  const total = carbon[0] + carbon[1];
  const correct = it.reduce((sum, e, i) => sum + (e * pue * ci[i]) / 1000, 0);
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setRegion("A");
    setStart(0);
    setPue(1.2);
    setFault(false);
  };
  return (
    <Lab
      kind="spacetime-carbon-dispatch"
      title="实验二：同一电量放在哪个时空格"
    >
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field label="虚构区域">
          <select
            aria-label="虚构区域"
            className={control}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="A">甲区 A</option>
            <option value="B">乙区 B</option>
          </select>
        </Field>
        <Field label="起始时段">
          <select
            aria-label="起始时段"
            className={control}
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          >
            <option value={0}>早段 0–1</option>
            <option value={2}>晚段 2–3</option>
          </select>
        </Field>
        <Field label="PUE">
          <select
            aria-label="PUE"
            className={control}
            value={pue}
            onChange={(e) => setPue(Number(e.target.value))}
          >
            <option value={1.2}>低档 1.2</option>
            <option value={1.5}>高档 1.5</option>
          </select>
        </Field>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        漏乘 PUE，仅算 IT 电量
      </Fault>
      <svg
        role="img"
        aria-label="区域时段碳强度格，任务覆盖两个时段，按设施电量逐格加权"
        viewBox="0 0 320 440"
        className="mx-auto mt-3 block w-full max-w-md"
        style={{ fontSize: 16 }}
      >
        <text x={12} y={22} fill={ink}>
          强度：gCO₂e/kWh · 虚构
        </text>
        {[0, 1, 2, 3].map((slot) => (
          <text
            key={slot}
            x={78 + slot * 62}
            y={53}
            textAnchor="middle"
            fill={muted}
          >
            时{slot}
          </text>
        ))}
        {Object.entries(grids).map(([r, values], row) => (
          <g key={r}>
            <text x={15} y={93 + row * 66} fill={ink}>
              {r}
            </text>
            {values.map((v, slot) => {
              const selected =
                region === r && slot >= start && slot < start + 2;
              return (
                <g key={slot}>
                  <rect
                    x={48 + slot * 62}
                    y={66 + row * 66}
                    width={58}
                    height={58}
                    fill={accent}
                    fillOpacity={v / 900}
                    stroke={selected ? ink : edge}
                    strokeWidth={selected ? 3 : 1}
                  />
                  <text
                    x={77 + slot * 62}
                    y={99 + row * 66}
                    textAnchor="middle"
                    fill={ink}
                  >
                    {v}
                  </text>
                  {selected && (
                    <path
                      d={`M${55 + slot * 62} ${117 + row * 66}h44`}
                      stroke={ink}
                      strokeWidth={3}
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
        <text x={12} y={219} fill={ink}>
          任务 IT：0.2 + 0.4 = 0.6 kWh
        </text>
        <rect
          x={12}
          y={235}
          width={296 / pue}
          height={27}
          fill={accent}
          fillOpacity={0.45}
          stroke={accent}
        />
        <rect
          x={12 + 296 / pue}
          y={235}
          width={296 - 296 / pue}
          height={27}
          fill={surface}
          stroke={ink}
          strokeDasharray={fault ? "4 3" : undefined}
        />
        {fault && (
          <path
            d={`M${12 + 296 / pue} 235L308 262M308 235L${12 + 296 / pue} 262`}
            stroke={ink}
            strokeWidth={2}
          />
        )}
        <text x={12} y={288} fill={ink}>
          IT 0.60 + 开销 {(0.6 * (pue - 1)).toFixed(2)} kWh
        </text>
        <text x={12} y={317} fill={muted}>
          设施 = 0.6 × {factor} = {(0.6 * factor).toFixed(2)} kWh
        </text>
        {carbon.map((c, i) => (
          <text
            key={i}
            x={12}
            y={349 + i * 28}
            fill={timeline.currentStep >= 2 ? ink : muted}
          >
            {(it[i] * factor).toFixed(2)} × {ci[i]} / 1000 = {c.toFixed(3)} kg
          </text>
        ))}
        <text x={12} y={416} fill={ink}>
          合计 {total.toFixed(3)} kgCO₂e
        </text>
        <rect
          x={8}
          y={
            timeline.currentStep === 0
              ? 59
              : timeline.currentStep === 1
                ? 228
                : timeline.currentStep === 2
                  ? 328
                  : 392
          }
          width={304}
          height={
            timeline.currentStep === 0
              ? 137
              : timeline.currentStep === 1
                ? 69
                : timeline.currentStep === 2
                  ? 58
                  : 38
          }
          fill="none"
          stroke={accent}
          strokeDasharray="3 4"
        />
      </svg>
      <p
        className="text-sm"
        role="status"
        data-result={total.toFixed(3)}
        data-reference={correct.toFixed(3)}
        data-fault-active={fault}
      >
        报告 {total.toFixed(3)} kgCO₂e；正确 {correct.toFixed(3)} kgCO₂e。
        {fault
          ? "IT 电量正确，设施开销却被漏记。"
          : "电量不变，时空权重改变排放归属。"}
      </p>
      <p className="mt-2 text-sm text-secondary">
        使用平均电网强度做归因；不是迁移任务的边际减排预测。设施总表电量不得再次乘
        PUE。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function Llm12EnvironmentalImpactEvidenceGateLab() {
  const [requests, setRequests] = useState(1000);
  const [life, setLife] = useState(10000);
  const [embodied, setEmbodied] = useState(true);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(ledgerSteps);
  const manufacturing = embodied ? (1000 * 100) / life : 0;
  const running = requests * 0.002;
  const total = 20 + running + manufacturing;
  const correct = total / requests;
  const report = fault ? 20 + 0.002 + manufacturing : correct;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setRequests(1000);
    setLife(10000);
    setEmbodied(true);
    setFault(false);
  };
  return (
    <Lab
      kind="lifecycle-allocation-ledger"
      title="实验三：总账怎样分到一次请求"
    >
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="同质请求总量">
          <select
            aria-label="同质请求总量"
            className={control}
            value={requests}
            onChange={(e) => setRequests(Number(e.target.value))}
          >
            <option value={1000}>千次 1000</option>
            <option value={10000}>万次 10000</option>
          </select>
        </Field>
        <Field label="硬件寿命">
          <select
            aria-label="硬件寿命"
            className={control}
            value={life}
            onChange={(e) => setLife(Number(e.target.value))}
          >
            <option value={10000}>短寿命 10000 h</option>
            <option value={20000}>长寿命 20000 h</option>
          </select>
        </Field>
      </div>
      <label className="mt-3 flex min-h-11 items-center gap-2 text-sm">
        <input
          aria-label="计入制造排放"
          type="checkbox"
          checked={embodied}
          onChange={(e) => setEmbodied(e.target.checked)}
        />
        计入制造排放（边界切换）
      </label>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        每次请求都收取全额共享账
      </Fault>
      <svg
        role="img"
        aria-label="硬件寿命切片与共享排放分摊账页，底部用总账除以请求量核对守恒"
        viewBox="0 0 320 510"
        className="mx-auto mt-3 block w-full max-w-md"
        style={{ fontSize: 16 }}
      >
        <text x={12} y={22} fill={ink}>
          制造总额 1000 kgCO₂e
        </text>
        <rect
          x={12}
          y={36}
          width={296}
          height={26}
          fill={surface}
          stroke={edge}
        />
        <rect
          x={12}
          y={36}
          width={(296 * 100) / life}
          height={26}
          fill={accent}
        />
        <text x={12} y={86} fill={muted}>
          完整寿命 {life} h · 切片 100 h
        </text>
        <path
          d={`M12 65L38 104M${12 + (296 * 100) / life} 65L278 104`}
          stroke={edge}
          strokeDasharray="3 4"
        />
        <rect
          x={38}
          y={108}
          width={240}
          height={28}
          fill={accent}
          fillOpacity={embodied ? 0.4 : 0.05}
          stroke={accent}
        />
        <text x={158} y={128} fill={ink} textAnchor="middle">
          切片放大 ×{(((life / 100) * 240) / 296).toFixed(1)}
        </text>
        <text x={12} y={164} fill={ink}>
          1000 × 100 / {life} = {((1000 * 100) / life).toFixed(1)} kg
        </text>
        <text x={12} y={190} fill={muted}>
          {embodied ? "制造切片纳入本服务" : "制造排除：不是零制造排放"}
        </text>
        <line x1={27} x2={27} y1={209} y2={316} stroke={edge} strokeWidth={2} />
        {[
          `共享训练：20.0 kg`,
          `服务运行：${requests} × 0.002`,
          `制造切片：${manufacturing.toFixed(1)} kg`,
        ].map((s, i) => (
          <g key={i}>
            <circle
              cx={27}
              cy={220 + i * 40}
              r={6}
              fill={timeline.currentStep === i ? accent : surface}
              stroke={ink}
            />
            <text x={45} y={226 + i * 40} fill={ink}>
              {s}
            </text>
          </g>
        ))}
        <path
          d="M27 316V341H160V360"
          fill="none"
          stroke={accent}
          strokeWidth={2}
        />
        <text x={174} y={343} fill={muted}>
          ÷ {requests}
        </text>
        {fault && (
          <g>
            <path
              d="M287 220H310V479H290M287 300H310"
              fill="none"
              stroke={ink}
              strokeWidth={2}
              strokeDasharray="5 3"
            />
            <path
              d="M295 474L288 479L295 484"
              fill="none"
              stroke={ink}
              strokeWidth={2}
            />
            <path
              d="M145 329L172 354M172 329L145 354"
              stroke={ink}
              strokeWidth={2}
            />
          </g>
        )}
        <rect
          x={12}
          y={360}
          width={296}
          height={63}
          fill={paper}
          stroke={timeline.currentStep === 3 ? accent : edge}
          strokeWidth={2}
        />
        <text x={160} y={384} textAnchor="middle" fill={ink}>
          总账 {total.toFixed(1)} kg / {requests} 次
        </text>
        <text x={160} y={410} textAnchor="middle" fill={ink}>
          正确每次 {(correct * 1000).toFixed(1)} gCO₂e
        </text>
        <text x={12} y={453} fill={ink}>
          {fault ? "× 重复记入共享项，守恒失败" : "✓ 每次份额 × 次数 = 总账"}
        </text>
        <text x={12} y={486} fill={muted}>
          {fault
            ? `错误报告 ${report.toFixed(3)} kg/次`
            : `报告 ${report.toFixed(3)} kg/次`}
        </text>
      </svg>
      <p
        className="text-sm"
        role="status"
        data-result={report.toFixed(4)}
        data-reference={correct.toFixed(4)}
        data-fault-active={fault}
      >
        报告 {(report * 1000).toFixed(1)} g/次；正确{" "}
        {(correct * 1000).toFixed(1)} g/次。
        {fault
          ? "共享训练和制造被重复归属。"
          : `总账 ${total.toFixed(1)} kg，并非每次请求新增的边际排放。`}
      </p>
      <p className="mt-2 text-sm text-secondary">
        同质请求须固定输出长度、质量门槛与服务范围。增加请求会降低分摊值，但运行总量仍会上升。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}
