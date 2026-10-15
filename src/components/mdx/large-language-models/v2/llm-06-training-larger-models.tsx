"use client";

import { useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent [&_.mt-4.flex]:flex-wrap";
const control =
  "min-h-11 min-w-11 max-w-full rounded border border-border bg-bg px-3 py-2 text-sm text-primary";
const phases = ["分配", "计算", "交换", "核对"].map((label) => ({ label }));
const scalePhases = ["预算", "参数项", "数据项", "度量"].map((label) => ({
  label,
}));
const memoryPhases = ["权重", "梯度", "主副本", "Adam m/v"].map((label) => ({
  label,
}));
function useTrace(steps = phases) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { slot: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(clock, { slot: 4, duration: 4800, ease: "linear" }, 0);
    },
  });
}
function Field({ title, children }: { title: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{title}</span>
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
      onClick={onClick}
      className={control}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
const loss = (n: number, q: number, fault = false) =>
  1 + 4 / Math.sqrt(n) + (fault ? 0 : 2 / Math.sqrt(q / n));

export function Llm06TrainingLargerModelsContextContractLab() {
  const [budget, setBudget] = useState(64);
  const [parameters, setParameters] = useState(16);
  const [metric, setMetric] = useState("continuous");
  const [fault, setFault] = useState(false);
  const t = useTrace(scalePhases);
  const data = budget / parameters;
  const actual = loss(parameters, budget);
  const predicted = loss(parameters, budget, fault);
  const ability = 1 / (actual - 1);
  const x = (n: number) => 40 + ((n - 2) / 30) * 230;
  const y = (l: number) => 246 - ((l - 1) / 5) * 180;
  const path = (bad: boolean) =>
    Array.from({ length: 61 }, (_, i) => {
      const n = 2 + i / 2;
      return `${i ? "L" : "M"}${x(n)},${y(loss(n, budget, bad))}`;
    }).join(" ");
  const reset = () => {
    t.pause();
    t.seek(0);
    setBudget(64);
    setParameters(16);
    setMetric("continuous");
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="scale"
      data-visual-kind="compute-budget-loss-curve"
      data-step={t.currentStep}
      data-playing={t.isPlaying}
      aria-label="算力预算与尺度实验"
    >
      <h3 className="text-lg font-semibold">
        实验一 · 同一算力，参数与词元怎么分？
      </h3>
      <p className="my-2 text-sm">
        先预测：只增大
        N，会不会一直降低损失？曲线使用教学假设系数，不是论文拟合，也没有运行真实模型。
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field title="归一化预算 Q=C/6">
          <select
            aria-label="算力预算"
            className={control}
            value={budget}
            onChange={(e) => setBudget(+e.target.value)}
          >
            {[64, 128, 256].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field title="参数规模 N">
          <select
            aria-label="参数规模"
            className={control}
            value={parameters}
            onChange={(e) => setParameters(+e.target.value)}
          >
            {[4, 8, 16, 32].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <Field title="显示度量">
          <select
            aria-label="显示度量"
            className={control}
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            <option value="continuous">连续代理量</option>
            <option value="threshold">阈值通过率</option>
          </select>
        </Field>
      </div>
      <svg
        viewBox="0 0 300 360"
        className="mx-auto my-3 w-full max-w-md"
        role="img"
        aria-label={`预算${budget}下的损失曲线，选择N${parameters}，D${data}，${fault ? "错误曲线漏掉数据项" : "完整损失"}`}
      >
        <text x="12" y="24" fill={C.text} fontSize="15">
          L = 1 + 4/√N + 2/√D
        </text>
        <text x="12" y="49" fill={C.muted} fontSize="14">
          N·D = {budget}；实线始终为完整损失
        </text>
        {[2, 3, 4, 5, 6].map((l) => (
          <g key={l}>
            <path d={`M40 ${y(l)}H275`} stroke={C.border} />
            <text x="15" y={y(l) + 5} fill={C.muted} fontSize="14">
              {l}
            </text>
          </g>
        ))}
        <path d="M40 62V246H275" fill="none" stroke={C.muted} />
        <path d={path(false)} fill="none" stroke={C.accent} strokeWidth="3" />
        {fault && (
          <path
            d={path(true)}
            fill="none"
            stroke={C.danger}
            strokeWidth="3"
            strokeDasharray="5 4"
          />
        )}
        <path
          d={`M${x(parameters)} 246V${y(actual)}`}
          stroke={C.muted}
          strokeDasharray="3 3"
          fill="none"
        />
        {t.currentStep >= 1 && (
          <path
            d={`M${x(parameters)} ${y(1)}V${y(1 + 4 / Math.sqrt(parameters))}`}
            stroke={C.muted}
            strokeWidth="6"
            fill="none"
          />
        )}
        {t.currentStep >= 2 && (
          <path
            d={`M${x(parameters)} ${y(1 + 4 / Math.sqrt(parameters))}V${y(actual)}`}
            stroke={C.accent}
            strokeWidth="6"
            fill="none"
          />
        )}
        {t.currentStep === 3 && metric === "threshold" && (
          <path
            d={`M40 ${y(3)}H275`}
            stroke={C.danger}
            strokeDasharray="4 4"
            fill="none"
          />
        )}
        {[4, 8, 16, 32].map((n) => (
          <g key={n}>
            <circle
              cx={x(n)}
              cy={y(loss(n, budget))}
              r={n === parameters ? 7 : 3}
              fill={n === parameters ? C.text : C.accent}
            />
            <text
              x={x(n)}
              y="270"
              textAnchor="middle"
              fill={C.text}
              fontSize="14"
            >
              {n}
            </text>
          </g>
        ))}
        <text x="150" y="296" textAnchor="middle" fill={C.muted} fontSize="14">
          横轴 N；纵轴损失 L（越低越好）
        </text>
        <text x="12" y="324" fill={fault ? C.danger : C.text} fontSize="14">
          {fault
            ? "虚线误判：选最大的 N=32"
            : `理论最优 N=${(2 * Math.sqrt(budget)).toFixed(1)}`}
        </text>
        <text x="12" y="348" fill={C.muted} fontSize="14">
          当前阶段：{scalePhases[t.currentStep].label}
        </text>
      </svg>
      <div aria-live="polite" className="space-y-2 text-sm" data-output>
        <p>
          N={parameters}，D={data}，C={6 * budget}；完整 L={actual.toFixed(3)}。
        </p>
        <p>
          {fault
            ? `错误预测 L=${predicted.toFixed(3)}，低估 ${(actual - predicted).toFixed(3)}；预算没超，质量预测却已失真。`
            : "N 增大使参数误差下降，却因 D 减少使数据误差上升。"}
        </p>
        <p>
          q=1/(L−1)={ability.toFixed(3)}；
          {metric === "continuous"
            ? "连续量仍随损失平滑变化。"
            : `阈值 q≥0.5：${ability >= 0.5 ? "通过（1）" : "不通过（0）"}。这个跳变来自度量定义。`}
        </p>
      </div>
      <div className="mt-3">
        <Fault active={fault} onClick={() => setFault(!fault)}>
          漏掉数据项
        </Fault>
      </div>
      <TimelineControls
        timeline={t}
        caption="逐步查看选中N的误差分解：灰粗段为参数项，强调色段为数据项；阈值度量在最后一步显示L=3参考线。播放不是训练。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

function Cells({
  values,
  x,
  y,
  missing = false,
}: {
  values: number[][];
  x: number;
  y: number;
  missing?: boolean;
}) {
  return (
    <g>
      {values.flatMap((row, i) =>
        row.map((v, j) => (
          <g key={`${i}-${j}`}>
            <rect
              x={x + j * 34}
              y={y + i * 30}
              width="32"
              height="28"
              fill={missing ? C.bg : C.panel}
              stroke={missing ? C.danger : C.accent}
              strokeDasharray={missing ? "3 2" : undefined}
            />
            <text
              x={x + j * 34 + 16}
              y={y + i * 30 + 20}
              textAnchor="middle"
              fill={missing ? C.danger : C.text}
              fontSize="15"
            >
              {missing ? "×" : v}
            </text>
          </g>
        )),
      )}
    </g>
  );
}
function PipelineGrid({
  micro,
  fault,
  progress,
}: {
  micro: number;
  fault: boolean;
  progress: number;
}) {
  const slots = 2 * (micro + 1);
  const cell = 230 / slots;
  return (
    <svg
      viewBox="0 0 300 330"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label={`两stage流水线，${micro}个microbatch，${slots}个逻辑slot，${fault ? "MB1传输丢失，下游无效" : "同步fill-drain"}`}
    >
      <text x="12" y="24" fill={C.text} fontSize="15">
        GPipe：F前向 / B反向 / ·气泡
      </text>
      {[0, 1].map((stage) => (
        <g key={stage}>
          <text x="10" y={94 + stage * 58} fill={C.text} fontSize="14">
            S{stage}
          </text>
          {Array.from({ length: slots }, (_, slot) => {
            const f = slot - stage;
            const b = slot - (micro + 1) - (1 - stage);
            const isF = f >= 0 && f < micro;
            const isB = b >= 0 && b < micro;
            const mb = isF ? f : micro - 1 - b;
            const bad =
              fault && (isF ? stage === 1 && mb === 0 : isB && mb === 0);
            const active = slot <= Math.floor(progress * (slots - 1));
            return (
              <g key={slot}>
                <rect
                  x={40 + slot * cell}
                  y={70 + stage * 58}
                  width={cell - 1}
                  height="36"
                  fill={
                    bad ? C.bg : (isF || isB) && active ? C.accent : C.panel
                  }
                  fillOpacity={(isF || isB) && active && !bad ? 0.18 : 1}
                  stroke={bad ? C.danger : C.border}
                />
                <text
                  x={40 + (slot + 0.5) * cell}
                  y={94 + stage * 58}
                  fill={bad ? C.danger : C.text}
                  textAnchor="middle"
                  fontSize="14"
                >
                  {bad ? "×" : isF ? `F${mb + 1}` : isB ? `B${mb + 1}` : "·"}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="12" y="201" fill={C.muted} fontSize="14">
        时间从左向右；F/B各占一格
      </text>
      <text x="12" y="230" fill={C.text} fontSize="14">
        有用格 {4 * micro} / 总格 {2 * slots}
      </text>
      <text x="12" y="259" fill={fault ? C.danger : C.text} fontSize="14">
        {fault
          ? "MB1反向依赖断裂：禁止更新"
          : `理想利用率 ${((micro / (micro + 1)) * 100).toFixed(1)}%`}
      </text>
      <text x="12" y="288" fill={C.muted} fontSize="14">
        batch = d·m·b；此处 d=1, b=1
      </text>
      <text x="12" y="317" fill={C.muted} fontSize="14">
        一次更新累积 {micro} 个microbatch
      </text>
    </svg>
  );
}
export function Llm06TrainingLargerModelsComputeTraceLab() {
  const [mode, setMode] = useState("DP");
  const [factor, setFactor] = useState(1);
  const [micro, setMicro] = useState(2);
  const [fault, setFault] = useState(false);
  const t = useTrace();
  const reset = () => {
    t.pause();
    t.seek(0);
    setMode("DP");
    setFactor(1);
    setMicro(2);
    setFault(false);
  };
  const rows =
    mode === "DP"
      ? [[[factor, 2 * factor]], [[3 * factor, 4 * factor]]]
      : mode === "TP"
        ? [
            [[1], [0]],
            [[0], [2]],
          ]
        : [
            [
              [1, 0],
              [0, 2],
            ],
            [[1], [1]],
          ];
  const communication =
    mode === "DP"
      ? "训练：梯度all-reduce并取平均"
      : mode === "TP"
        ? "部分输出all-reduce求和"
        : "激活发送 → 下游；梯度反向返回";
  return (
    <section
      className={shell}
      data-lab="parallel"
      data-visual-kind="tensor-partition-and-pipeline-grid"
      data-step={t.currentStep}
      data-playing={t.isPlaying}
      aria-label="并行切分与流水实验"
    >
      <h3 className="text-lg font-semibold">
        实验二 · 切数据、切张量，还是切层？
      </h3>
      <p className="my-2 text-sm">
        先预测：复制整层和切开矩阵需要交换相同东西吗？固定
        X=[[1,2],[3,4]]，W=diag(1,2)，V=[[1],[1]]；每个数字都是实际计算值。
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field title="切分方式">
          <select
            className={control}
            aria-label="切分方式"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="DP">DP 数据</option>
            <option value="TP">TP 张量</option>
            <option value="PP">PP 流水</option>
          </select>
        </Field>
        <Field title="X的倍率">
          <select
            className={control}
            aria-label="输入倍率"
            value={factor}
            onChange={(e) => setFactor(+e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </Field>
        <Field title="PP微批数 m">
          <select
            className={control}
            aria-label="微批数"
            value={micro}
            onChange={(e) => setMicro(+e.target.value)}
          >
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
        </Field>
      </div>
      <svg
        viewBox="0 0 300 410"
        className="mx-auto my-3 w-full max-w-md"
        role="img"
        aria-label={`${mode}切片矩阵，${communication}，${fault ? "rank1通信缺失" : "完整通信"}`}
      >
        <text x="12" y="26" fill={C.text} fontSize="15">
          Y = (X·W)·V = [{5 * factor}, {11 * factor}]ᵀ
        </text>
        {[0, 1].map((rank) => (
          <g key={rank}>
            <text x="12" y={61 + rank * 128} fill={C.text} fontSize="14">
              设备 {rank}：
              {mode === "DP"
                ? `X的第${rank + 1}行`
                : mode === "TP"
                  ? `W的第${rank + 1}列`
                  : rank === 0
                    ? "第1层 W"
                    : "第2层 V"}
            </text>
            <Cells
              values={rows[rank]}
              x={16}
              y={73 + rank * 128}
              missing={fault && rank === 1}
            />
            <text x="105" y={96 + rank * 128} fill={C.muted} fontSize="14">
              {mode === "DP"
                ? "W、V各有全副本"
                : mode === "TP"
                  ? `V的第${rank + 1}行 = [1]`
                  : rank === 0
                    ? "H = X·W"
                    : "Y = H·V"}
            </text>
            <text
              x="105"
              y={124 + rank * 128}
              fill={fault && rank === 1 ? C.danger : C.text}
              fontSize="14"
            >
              {fault && rank === 1
                ? "通信缺失 ×"
                : mode === "DP"
                  ? `局部输出 ${[5, 11][rank] * factor}`
                  : mode === "TP"
                    ? `部分输出 [${(rank === 0 ? 1 : 4) * factor}, ${(rank === 0 ? 3 : 8) * factor}]`
                    : rank === 0
                      ? `H行1=[${factor}, ${4 * factor}]`
                      : `输出 [${5 * factor}, ${11 * factor}]`}
            </text>
          </g>
        ))}
        <path
          d="M45 284V310H260"
          stroke={fault ? C.danger : C.accent}
          fill="none"
          strokeWidth="2"
          strokeDasharray={fault ? "4 3" : undefined}
        />
        <text x="12" y="336" fill={C.text} fontSize="14">
          {communication}
        </text>
        <text x="12" y="365" fill={fault ? C.danger : C.text} fontSize="14">
          {fault
            ? mode === "TP"
              ? `错误部分和 [${factor}, ${3 * factor}]`
              : "缺失输出或依赖：本步不可接受"
            : `完整输出 [${5 * factor}, ${11 * factor}]`}
        </text>
        <text x="12" y="394" fill={C.muted} fontSize="14">
          当前阶段：{phases[t.currentStep].label}
        </text>
      </svg>
      {mode === "PP" && (
        <PipelineGrid micro={micro} fault={fault} progress={t.progress} />
      )}
      <div className="space-y-2 text-sm" data-output aria-live="polite">
        <p>
          {mode === "DP"
            ? "DP图展示前向行分发；训练每个rank产生完整梯度，必须同步。丢rank不能把剩余局部结果当成全batch更新。"
            : mode === "TP"
              ? "[1,3] + [4,8] = [5,11]（再乘X倍率）。一次all-reduce的数学语义是求和，不是拼接。"
              : `m=${micro}，理想总slot=${2 * (micro + 1)}，气泡率=${(100 / (micro + 1)).toFixed(1)}%。×格不是气泡，是失败依赖。`}
        </p>
        <p>
          只模拟shape、数值与依赖；忽略真实通信延迟、kernel和负载差异，不是GPU速度测试。
        </p>
      </div>
      <div className="mt-3">
        <Fault active={fault} onClick={() => setFault(!fault)}>
          丢失rank1通信
        </Fault>
      </div>
      <TimelineControls
        timeline={t}
        caption="选择PP显示同步fill-drain；高亮按逻辑时间推进，不代表实测耗时。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

export function Llm06TrainingLargerModelsEvidenceGateLab() {
  const [stage, setStage] = useState(0);
  const [devices, setDevices] = useState(2);
  const [recompute, setRecompute] = useState(false);
  const [fault, setFault] = useState(false);
  const t = useTrace(memoryPhases);
  const states = [
    { name: "权重", bytes: 2, shard: stage >= 3 },
    { name: "梯度", bytes: 2, shard: stage >= 2 },
    { name: "主副本", bytes: 4, shard: stage >= 1 },
    { name: "Adam m", bytes: 4, shard: stage >= 1 },
    { name: "Adam v", bytes: 4, shard: stage >= 1 },
  ];
  const modelBytes = states.reduce(
    (s, r) => s + (8 * r.bytes) / (r.shard ? devices : 1),
    0,
  );
  const activation = recompute ? 8 : 32;
  const reset = () => {
    t.pause();
    t.seek(0);
    setStage(0);
    setDevices(2);
    setRecompute(false);
    setFault(false);
  };
  return (
    <section
      className={shell}
      data-lab="memory"
      data-visual-kind="sharded-state-ownership-grid"
      data-step={t.currentStep}
      data-playing={t.isPlaying}
      aria-label="ZeRO状态归属实验"
    >
      <h3 className="text-lg font-semibold">实验三 · 哪份状态真的只存一份？</h3>
      <p className="my-2 text-sm">
        先预测：ZeRO-1能否消除每卡的完整权重？8个参数的账页按列显示真实归属；r数字为rank，不是字节数。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field title="ZeRO阶段">
          <select
            className={control}
            aria-label="ZeRO阶段"
            value={stage}
            onChange={(e) => setStage(+e.target.value)}
          >
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>
                ZeRO-{n}
              </option>
            ))}
          </select>
        </Field>
        <Field title="数据并行设备 d">
          <select
            className={control}
            aria-label="设备数量"
            value={devices}
            onChange={(e) => setDevices(+e.target.value)}
          >
            {[2, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="my-3 flex min-h-11 items-center gap-2 text-sm">
        <input
          type="checkbox"
          aria-label="激活重计算"
          checked={recompute}
          onChange={(e) => setRecompute(e.target.checked)}
        />
        激活重计算：32B → 8B（教学假设）
      </label>
      <svg
        viewBox="0 0 300 390"
        className="mx-auto my-3 w-full max-w-md"
        role="img"
        aria-label={`ZeRO${stage}，${devices}设备，各状态8参数归属，${fault ? "rank1丢失" : "归属完整"}`}
      >
        <text x="12" y="24" fill={C.text} fontSize="14">
          每格一个参数；全=每个rank都有
        </text>
        {Array.from({ length: 8 }, (_, j) => (
          <text
            key={j}
            x={86 + j * 27}
            y="52"
            fill={C.muted}
            textAnchor="middle"
            fontSize="14"
          >
            {j}
          </text>
        ))}
        {states.map((s, i) => (
          <g key={s.name}>
            <text
              x="4"
              y={87 + i * 43}
              fill={Math.min(i, 3) === t.currentStep ? C.accent : C.text}
              fontSize="14"
            >
              {s.name}
            </text>
            {Array.from({ length: 8 }, (_, j) => {
              const owner = Math.floor(j / (8 / devices));
              const missing = fault && s.shard && owner === 1;
              return (
                <g key={j}>
                  <rect
                    x={73 + j * 27}
                    y={66 + i * 43}
                    width="26"
                    height="31"
                    fill={C.panel}
                    stroke={missing ? C.danger : s.shard ? C.accent : C.border}
                  />
                  <text
                    x={86 + j * 27}
                    y={87 + i * 43}
                    textAnchor="middle"
                    fill={missing ? C.danger : C.text}
                    fontSize="14"
                  >
                    {missing ? "×" : s.shard ? `r${owner}` : "全"}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="12" y="306" fill={C.text} fontSize="14">
          每卡状态 {modelBytes}B + 激活 {activation}B
        </text>
        <text
          x="12"
          y="334"
          fill={modelBytes + activation > 80 ? C.danger : C.text}
          fontSize="14"
        >
          {modelBytes + activation}B / 教学预算80B：
          {modelBytes + activation > 80 ? "超限" : "可容纳"}
        </text>
        <text x="12" y="362" fill={fault ? C.danger : C.muted} fontSize="14">
          {fault
            ? stage === 0
              ? "状态有副本，但作业仍需恢复"
              : "×是唯一分片丢失：停止更新"
            : "ZeRO-3算子前仍须收集所需权重"}
        </text>
        <text x="12" y="386" fill={C.muted} fontSize="14">
          激活、临时buffer不是Adam状态
        </text>
      </svg>
      <div className="space-y-2 text-sm" data-output aria-live="polite">
        <p>
          每参数：低精度权重2B、梯度2B、FP32主副本4B、m/v各4B，总16B。ZeRO-
          {stage}每卡状态={modelBytes}B；
          {fault
            ? stage === 0
              ? "rank1已失联；仍有状态副本不等于自动容错。"
              : "缺失分片无法继续更新，须从完整检查点恢复。"
            : "上图按权重、梯度、优化器依次检查。"}
        </p>
        <p>
          重计算用更多运算换少存激活；此处不计通信buffer、内存碎片和算子工作区，80B只是教学容量，不是GPU规格。
        </p>
      </div>
      <div className="mt-3">
        <Fault active={fault} onClick={() => setFault(!fault)}>
          丢失rank1状态
        </Fault>
      </div>
      <TimelineControls
        timeline={t}
        caption="逐项核对状态；不把状态分片误当作全部显存按设备数缩减。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
