"use client";

import { useMemo, useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const danger = "var(--color-error, var(--accent))";
const control =
  "min-h-11 rounded border border-border bg-transparent px-3 text-sm text-primary";
const panel = "not-prose my-6 rounded-xl border border-border p-3 sm:p-5";

function usePhases(captions: string[]) {
  // Stable steps are required by the shared hook's effect dependencies.
  const key = captions.join("|");
  const steps = useMemo(
    () => key.split("|").map((label) => ({ label })),
    [key],
  );
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach(({ label }, i) => {
        tl.label(label, i * 850);
        tl.add(clock, { value: i + 1, duration: 850 }, i * 850);
      });
    },
  });
}

// Scope the shared timeline's small buttons/range targets to this chapter only.
function TouchTargets() {
  return (
    <style>{`.distributed-lab button,.distributed-lab select,.distributed-lab input[type=range]{min-height:44px;min-width:44px}.distributed-lab button{padding:8px 12px}.distributed-lab svg{display:block;width:100%;max-width:680px;margin:12px auto}.distributed-lab select{max-width:100%}.distributed-lab output{display:block;overflow-wrap:anywhere}.distributed-lab input[type=checkbox]{width:44px;height:44px;flex-shrink:0}.distributed-lab label{min-height:44px}.distributed-lab svg text{font-family:ui-monospace,monospace}`}</style>
  );
}

function Cell({
  x,
  y,
  w,
  h = 34,
  children,
  active = false,
  bad = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  children?: React.ReactNode;
  active?: boolean;
  bad?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={active ? accent : "none"}
        fillOpacity={active ? 0.14 : 1}
        stroke={bad ? danger : active ? accent : border}
        strokeWidth={bad ? 3 : 1}
        strokeDasharray={bad ? "5 3" : undefined}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        textAnchor="middle"
        fontSize={18}
        fill={ink}
      >
        {children}
      </text>
    </g>
  );
}

export function Lsl04DistributedTrainingContextContractLab() {
  const [mode, setMode] = useState("DP");
  const [degree, setDegree] = useState(2);
  const [fault, setFault] = useState(false);
  const timeline = usePhases([
    "分配",
    "局部计算 / 时隙1",
    "归并 / 时隙2",
    "同步 / 时隙3",
    "校验 / 时隙4",
    "时隙5",
    "时隙6",
    "时隙7",
  ]);
  const step = timeline.currentStep;
  const gradients = Array.from({ length: degree }, (_, r) => 2 * (r + 1));
  const mean =
    gradients.reduce((a, g, r) => a + (fault && r === degree - 1 ? 0 : g), 0) /
    degree;
  const expected = degree + 1;
  const rows = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ];
  const partial = Array.from({ length: degree }, (_, r) =>
    rows
      .slice((r * 4) / degree, ((r + 1) * 4) / degree)
      .reduce(
        (v, row, i) => v.map((a, j) => a + row[j] * ((r * 4) / degree + i + 1)),
        [0, 0],
      ),
  );
  const result = partial.reduce(
    (v, part, r) =>
      v.map((a, j) => a + (fault && r === degree - 1 ? 0 : part[j])),
    [0, 0],
  );
  function reset() {
    setMode("DP");
    setDegree(2);
    setFault(false);
    timeline.goToStep(0);
  }
  const rowY = (r: number) => 90 + r * 64;
  return (
    <section
      className={`${panel} distributed-lab`}
      data-lab="parallel"
      data-visual-kind="dp-replica-tp-row-product-pp-spacetime"
      aria-label="并行切分实验"
    >
      <TouchTargets />
      <h3 className="mb-3 font-semibold">一、切样本、切矩阵，还是切层？</h3>
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2">
          切分策略
          <select
            aria-label="切分策略"
            className={control}
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              timeline.goToStep(0);
            }}
          >
            <option value="DP">DP 数据并行</option>
            <option value="TP">TP 张量并行</option>
            <option value="PP">PP 流水线并行</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          设备数
          <select
            aria-label="并行设备数"
            className={control}
            value={degree}
            onChange={(e) => {
              setDegree(Number(e.target.value));
              timeline.goToStep(0);
            }}
          >
            <option value={2}>2 个设备</option>
            <option value={4}>4 个设备</option>
          </select>
        </label>
      </div>
      {mode === "DP" && (
        <svg
          viewBox="0 0 340 420"
          role="img"
          aria-label="DP：每个rank完整模型，不同样本产生梯度，归并后同步平均梯度"
        >
          <text x={12} y={28} fontSize={18} fill={ink}>
            同一 w=1；每组等量样本
          </text>
          <text x={12} y={58} fontSize={18} fill={muted}>
            rank　样本组　 本地梯度
          </text>
          {gradients.map((g, r) => (
            <g key={r}>
              <text x={12} y={rowY(r) + 23} fontSize={18} fill={ink}>
                r{r}
              </text>
              <Cell x={58} y={rowY(r)} w={100} active>
                S{r + 1} → w
              </Cell>
              <path
                d={`M166 ${rowY(r) + 17} h18`}
                stroke={accent}
                strokeWidth={2}
              />
              <Cell
                x={194}
                y={rowY(r)}
                w={130}
                active={step >= 1}
                bad={fault && r === degree - 1}
              >
                {step < 1 ? "待计算" : `g=${g}`}
              </Cell>
            </g>
          ))}
          <text x={12} y={370} fontSize={18} fill={ink}>
            {step >= 2 ? `Σg / ${degree} = ${mean}` : "下一步：计算本地梯度"}
          </text>
          <text
            x={12}
            y={401}
            fontSize={18}
            fill={step >= 2 && fault ? danger : muted}
          >
            {step >= 3
              ? `所有副本 w'=${(1 - 0.1 * mean).toFixed(2)}`
              : "lr=0.1；同步后才更新"}
          </text>
        </svg>
      )}
      {mode === "TP" && (
        <svg
          viewBox="0 0 340 420"
          role="img"
          aria-label="TP：输入向量乘按行切分的矩阵，各rank部分积求和得到12和9"
        >
          <text x={12} y={28} fontSize={18} fill={ink}>
            x=[1,2,3,4]；y=xW
          </text>
          <text x={12} y={58} fontSize={18} fill={muted}>
            rank　W 的行　 部分积
          </text>
          {partial.map((part, r) => (
            <g key={r}>
              <text x={12} y={rowY(r) + 23} fontSize={18} fill={ink}>
                r{r}
              </text>
              <Cell x={58} y={rowY(r)} w={100} h={50} active>
                {rows
                  .slice((r * 4) / degree, ((r + 1) * 4) / degree)
                  .map((row) => row.join(","))
                  .join(";")}
              </Cell>
              <path
                d={`M166 ${rowY(r) + 25} h18`}
                stroke={accent}
                strokeWidth={2}
              />
              <Cell
                x={194}
                y={rowY(r)}
                w={130}
                h={50}
                active={step >= 1}
                bad={fault && r === degree - 1}
              >
                {step >= 1 ? part.join(",") : "待乘"}
              </Cell>
            </g>
          ))}
          <text x={12} y={370} fontSize={18} fill={ink}>
            {step >= 2
              ? `SUM y=[${result.join(",")}]`
              : "下一步：各自计算部分积"}
          </text>
          <text x={12} y={401} fontSize={18} fill={muted}>
            正确结果 [12,9]，不是取平均
          </text>
        </svg>
      )}
      {mode === "PP" && (
        <svg
          viewBox="0 0 340 420"
          role="img"
          aria-label="PP：四个微批次的前向填充排空时空图，空格为气泡，列为时隙"
        >
          <text x={12} y={28} fontSize={18} fill={ink}>
            4 微批次；仅前向填充排空
          </text>
          <text x={12} y={58} fontSize={18} fill={muted}>
            格内数字=微批次编号
          </text>
          {Array.from({ length: degree + 3 }, (_, c) => (
            <text
              key={c}
              x={65 + c * 38}
              y={88}
              textAnchor="middle"
              fontSize={18}
              fill={muted}
            >
              {c + 1}
            </text>
          ))}
          {Array.from({ length: degree }, (_, r) => (
            <g key={r}>
              <text x={8} y={123 + r * 52} fontSize={18} fill={ink}>
                S{r}
              </text>
              {Array.from({ length: degree + 3 }, (_, c) => {
                const mb = c - r + 1;
                const busy = mb > 0 && mb <= 4;
                const lost = fault && r === degree - 1 && mb === 2;
                return (
                  <Cell
                    key={c}
                    x={48 + c * 38}
                    y={100 + r * 52}
                    w={34}
                    active={busy && step > c && !lost}
                    bad={busy && lost}
                  >
                    {busy && step > c ? (lost ? "×" : mb) : "·"}
                  </Cell>
                );
              })}
            </g>
          ))}
          <text x={12} y={350} fontSize={18} fill={ink}>
            占用率 4/{degree + 3} = {(400 / (degree + 3)).toFixed(1)}%
          </text>
          <text x={12} y={382} fontSize={18} fill={muted}>
            不含反向、通信、调度重叠
          </text>
          <text x={12} y={410} fontSize={18} fill={ink}>
            完成输出{" "}
            {Math.max(
              0,
              Math.min(4, step - degree + 1) -
                (fault && step >= degree + 1 ? 1 : 0),
            )}
            /4
          </text>
        </svg>
      )}
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          aria-label="漏掉最后参与者"
          checked={fault}
          onChange={(e) => setFault(e.target.checked)}
        />
        故障：漏最后 rank 的贡献 / 末段微批次2
      </label>
      <output
        data-result="parallel"
        className="mt-3 text-sm"
        aria-live="polite"
      >
        {mode === "DP"
          ? `等量样本：正确 g=${expected}；当前 g=${mean}；${fault ? "漏贡献，更新错误" : "与全批平均等价"}`
          : mode === "TP"
            ? `部分积 ${partial.map((p) => `[${p}]`).join(" + ")}；当前 [${result}]；${fault ? "缺分片" : "与完整矩阵乘等价"}`
            : `S=${degree}，M=4；${degree + 3} 个时隙；${fault ? "末段丢输出，拒绝更新" : "空格是管线气泡"}`}
      </output>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置并行实验", onClick: reset }}
      />
    </section>
  );
}

export function Lsl04DistributedTrainingComputeTraceLab() {
  const [stage, setStage] = useState(3);
  const [degree, setDegree] = useState(4);
  const [parameters, setParameters] = useState(1);
  const [leak, setLeak] = useState(false);
  const timeline = usePhases([
    "常驻分片",
    "All-Gather 权重",
    "计算单层",
    "Reduce-Scatter 梯度",
    "更新 owner 状态",
    "释放临时权重",
  ]);
  const step = timeline.currentStep;
  const p = (2 * parameters) / (stage === 3 ? degree : 1);
  const g = (2 * parameters) / (stage >= 2 ? degree : 1);
  const o = (12 * parameters) / (stage >= 1 ? degree : 1);
  const transient =
    stage === 3 && step >= 1 && (step < 5 || leak) ? 2 * parameters - p : 0;
  const total = p + g + o + transient;
  const scale = 272 / (16 * parameters);
  function reset() {
    setStage(3);
    setDegree(4);
    setParameters(1);
    setLeak(false);
    timeline.goToStep(0);
  }
  return (
    <section
      className={`${panel} distributed-lab`}
      data-lab="zero"
      data-visual-kind="zero-pgo-resident-transient-byte-bars"
      aria-label="ZeRO显存实验"
    >
      <TouchTargets />
      <h3 className="mb-3 font-semibold">二、ZeRO：哪些字节真的只存一份？</h3>
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2">
          阶段
          <select
            className={control}
            aria-label="ZeRO阶段"
            value={stage}
            onChange={(e) => {
              setStage(Number(e.target.value));
              timeline.goToStep(0);
            }}
          >
            <option value={0}>阶段0 无分片</option>
            <option value={1}>阶段1 分 O</option>
            <option value={2}>阶段2 分 O+G</option>
            <option value={3}>阶段3 分 O+G+P</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          DP度
          <select
            className={control}
            aria-label="ZeRO数据并行度"
            value={degree}
            onChange={(e) => {
              setDegree(Number(e.target.value));
              timeline.goToStep(0);
            }}
          >
            <option value={2}>2 路副本</option>
            <option value={4}>4 路副本</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          参数量
          <select
            className={control}
            aria-label="ZeRO参数量"
            value={parameters}
            onChange={(e) => {
              setParameters(Number(e.target.value));
              timeline.goToStep(0);
            }}
          >
            <option value={1}>1B 参数</option>
            <option value={7}>7B 参数</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 340 440"
        role="img"
        aria-label="按rank堆叠P权重G梯度O优化器字节，虚线段是单层临时全参"
      >
        <text x={12} y={28} fontSize={18} fill={ink}>
          P 权重 / G 梯度 / O 优化器
        </text>
        <text x={12} y={60} fontSize={18} fill={muted}>
          满宽 = {16 * parameters} GB；十进制
        </text>
        {Array.from({ length: degree }, (_, r) => (
          <g key={r}>
            <text x={12} y={103 + r * 66} fontSize={18} fill={ink}>
              r{r}
            </text>
            <rect
              x={52}
              y={80 + r * 66}
              width={272}
              height={34}
              fill="none"
              stroke={border}
            />
            {[p, g, o].map((v, j, a) => (
              <rect
                key={j}
                x={52 + a.slice(0, j).reduce((x, y) => x + y, 0) * scale}
                y={80 + r * 66}
                width={v * scale}
                height={34}
                fill={accent}
                fillOpacity={[0.8, 0.45, 0.18][j]}
                stroke={ink}
                strokeWidth={0.5}
              />
            ))}
            {transient > 0 && (
              <rect
                x={52 + (p + g + o) * scale}
                y={80 + r * 66}
                width={transient * scale}
                height={34}
                fill="none"
                stroke={leak && step === 5 ? danger : accent}
                strokeWidth={2}
                strokeDasharray="4 2"
              />
            )}
            <text x={52} y={136 + r * 66} fontSize={18} fill={muted}>
              {total.toFixed(2)} GB / rank
            </text>
          </g>
        ))}
        <text x={12} y={380} fontSize={18} fill={ink}>
          常驻 {(p + g + o).toFixed(2)} GB
        </text>
        <text
          x={12}
          y={412}
          fontSize={18}
          fill={transient && leak && step === 5 ? danger : muted}
        >
          临时全参 +{transient.toFixed(2)} GB
        </text>
      </svg>
      <p className="text-sm">
        P={p.toFixed(2)}、G={g.toFixed(2)}、O={o.toFixed(2)} GB。O 含 FP32
        主权重及 Adam 两个矩。单层教学模型；不含激活、缓冲、分配器碎片。
      </p>
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          aria-label="不释放临时全参"
          checked={leak}
          onChange={(e) => setLeak(e.target.checked)}
          disabled={stage !== 3}
        />
        故障：阶段3层后不释放临时全参
      </label>
      <output data-result="zero" className="mt-3 text-sm" aria-live="polite">
        stage={stage}；D={degree}；常驻={(p + g + o).toFixed(2)} GB；当前=
        {total.toFixed(2)} GB；
        {stage !== 3
          ? "权重始终复制；故障不适用"
          : step === 5 && leak
            ? "未释放：显存无法回到常驻线"
            : "常驻分片不等于峰值显存"}
      </output>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置显存实验", onClick: reset }}
      />
    </section>
  );
}

export function Lsl04DistributedTrainingEvidenceGateLab() {
  const [degree, setDegree] = useState(4);
  const [missing, setMissing] = useState(false);
  const timeline = usePhases([
    "各rank本地向量",
    "Reduce-Scatter 求和",
    "All-Gather 再除D",
    "owner 更新参数",
    "提交分片检查点",
    "校验并恢复",
  ]);
  const step = timeline.currentStep;
  const mean = (degree + 1) / 2;
  const restored = Array.from({ length: degree }, (_, j) =>
    Number((1 - 0.1 * mean * (j + 1)).toFixed(3)),
  );
  function reset() {
    setDegree(4);
    setMissing(false);
    timeline.goToStep(0);
  }
  return (
    <section
      className={`${panel} distributed-lab`}
      data-lab="collective"
      data-visual-kind="collective-rank-chunk-owner-checkpoint-matrix"
      aria-label="集合通信与检查点实验"
    >
      <TouchTargets />
      <h3 className="mb-3 font-semibold">三、从集合通信到完整恢复</h3>
      <label className="flex flex-wrap items-center gap-2">
        通信组
        <select
          aria-label="集合通信组大小"
          className={control}
          value={degree}
          onChange={(e) => {
            setDegree(Number(e.target.value));
            timeline.goToStep(0);
          }}
        >
          <option value={2}>2 个rank</option>
          <option value={4}>4 个rank</option>
        </select>
      </label>
      <svg
        viewBox="0 0 340 430"
        role="img"
        aria-label="rank乘chunk矩阵：求和分散成对角、收集回完整向量，checkpoint缺片则整组拒绝恢复"
      >
        <text x={12} y={28} fontSize={18} fill={ink}>
          {
            [
              "本地梯度 g[r,j]",
              "每rank仅收一个 SUM 块",
              "各rank获得平均梯度",
              "各owner仅更新自己的块",
              "文件 rN 保存 owner 块",
              "重建完整参数；先验完整性",
            ][step]
          }
        </text>
        {Array.from({ length: degree }, (_, j) => (
          <text
            key={j}
            x={84 + j * 62}
            y={68}
            fontSize={18}
            fill={muted}
            textAnchor="middle"
          >
            c{j}
          </text>
        ))}
        {Array.from({ length: degree }, (_, r) => (
          <g key={r}>
            <text x={10} y={113 + r * 62} fontSize={18} fill={ink}>
              r{r}
            </text>
            {Array.from({ length: degree }, (_, j) => {
              const absent = missing && j === degree - 1 && step >= 4;
              const ownerOnly = step === 1 || step === 3 || step === 4;
              const show = !ownerOnly || r === j;
              const value =
                step === 0
                  ? (r + 1) * (j + 1)
                  : step === 1
                    ? degree * mean * (j + 1)
                    : step === 2
                      ? mean * (j + 1)
                      : restored[j];
              return (
                <Cell
                  key={j}
                  x={54 + j * 62}
                  y={88 + r * 62}
                  w={58}
                  h={42}
                  active={show && !absent}
                  bad={show && absent}
                >
                  {!show ? "·" : absent ? "×" : value}
                </Cell>
              );
            })}
          </g>
        ))}
        <text x={12} y={370} fontSize={18} fill={ink}>
          {step < 3 ? "SUM 后除 D；不重复除" : "w=1 − 0.1 × 平均梯度"}
        </text>
        <text
          x={12}
          y={404}
          fontSize={18}
          fill={missing && step >= 4 ? danger : muted}
        >
          {step >= 4
            ? missing
              ? `缺 r${degree - 1}；恢复必须拒绝`
              : `${degree}/${degree} 分片；可完整恢复`
            : "所有rank须同序调用collective"}
        </text>
      </svg>
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          aria-label="丢失最后检查点分片"
          checked={missing}
          onChange={(e) => setMissing(e.target.checked)}
        />
        故障：保存时丢失最后 owner 分片
      </label>
      <output
        data-result="collective"
        className="mt-3 text-sm"
        aria-live="polite"
      >
        {step < 4
          ? `目标参数 [${restored}]；故障仅在保存阶段生效`
          : missing
            ? `完整性失败：缺 rank ${degree - 1}，禁止部分加载`
            : `全部分片已齐；恢复参数 [${restored}]`}
      </output>
      <p className="mt-3 text-sm">
        这是语义矩阵，不是环形网络包动画或延迟测量。持久化文件还必须含优化器、调度器、随机数和数据游标；下方
        Python 实际校验 JSON 与摘要。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置通信实验", onClick: reset }}
      />
    </section>
  );
}
