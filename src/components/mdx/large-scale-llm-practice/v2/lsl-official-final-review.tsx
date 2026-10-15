"use client";

import { useEffect, useState, type ReactNode } from "react";

// Semantic tokens also supply the on-fill text and neutral states. The site
// currently has one dark palette; no SVG color depends on a browser theme class.
const targetColor = "var(--accent)",
  policyColor = "var(--warning)",
  completeColor = "var(--success)",
  faultColor = "var(--danger)",
  neutralColor = "var(--text-secondary)",
  onFillColor = "var(--bg)",
  inactiveColor = "var(--bg)",
  labelColor = "var(--text-primary)";

function useReview() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [fault, setFault] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => {
      setStep(Math.min(3, step + 1));
      if (step >= 2) setPlaying(false);
    }, 850);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, step]);
  return {
    step,
    setStep,
    playing,
    setPlaying,
    fault,
    setFault,
    reduced,
    reset: () => {
      setStep(0);
      setPlaying(false);
      setFault(false);
    },
  };
}
type Review = ReturnType<typeof useReview>;
const control =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";
function Frame({
  id,
  kind,
  title,
  lab,
  reset,
  controls,
  stages,
  children,
  result,
}: {
  id: string;
  kind: string;
  title: string;
  lab: Review;
  reset: () => void;
  controls: ReactNode;
  stages: string[];
  children: ReactNode;
  result: ReactNode;
}) {
  return (
    <section
      data-review-lab={id}
      data-visual-kind={kind}
      data-step={lab.step}
      data-fault={String(lab.fault)}
      data-playing={String(lab.playing)}
      className="not-prose my-8 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary"
      aria-label={title}
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap items-end gap-2">{controls}</div>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          className={control}
          aria-pressed={lab.fault}
          onClick={() => lab.setFault(!lab.fault)}
        >
          故障：{lab.fault ? "开启" : "关闭"}
        </button>
        <button className={control} aria-label="重置实验" onClick={reset}>
          重置全部
        </button>
      </div>
      {children}
      <p className="my-2 text-sm" data-stage>
        阶段 {lab.step + 1}/4：{stages[lab.step]}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          className={control}
          aria-label="上一步"
          disabled={lab.step === 0}
          onClick={() => {
            lab.setPlaying(false);
            lab.setStep(Math.max(0, lab.step - 1));
          }}
        >
          上一步
        </button>
        <button
          className={control}
          aria-label="下一步"
          disabled={lab.step === 3}
          onClick={() => {
            lab.setPlaying(false);
            lab.setStep(Math.min(3, lab.step + 1));
          }}
        >
          下一步
        </button>
        {!lab.reduced && (
          <button
            className={control}
            aria-label={lab.playing ? "暂停" : "播放"}
            onClick={() => {
              if (lab.step === 3) lab.setStep(0);
              lab.setPlaying(!lab.playing);
            }}
          >
            {lab.playing ? "暂停" : "播放"}
          </button>
        )}
      </div>
      <label className="mt-2 block text-sm">
        时间线
        <input
          className="block h-11 w-full"
          aria-label={`${title}时间线`}
          type="range"
          min="0"
          max="3"
          step="1"
          value={lab.step}
          onChange={(e) => {
            lab.setPlaying(false);
            lab.setStep(Number(e.target.value));
          }}
        />
      </label>
      {lab.reduced && (
        <p className="text-sm">减少动态效果：只用单步与时间线，不自动播放。</p>
      )}
      <div
        data-result
        aria-live="polite"
        className="mt-3 rounded border border-border p-3 text-sm leading-relaxed"
      >
        {result}
      </div>
    </section>
  );
}
function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="grid max-w-full gap-1 text-sm">
      {label}
      <select
        aria-label={label}
        className={`${control} max-w-full bg-bg text-primary`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}

export function LslOfficialFinalReviewContextContractLab() {
  const lab = useReview();
  const [split, setSplit] = useState("record");
  const [bridge, setBridge] = useState("linked");
  // A--B--C is a similarity component, not a claim of pairwise transitivity.
  const linked = bridge === "linked";
  const grouped = split === "component" && !lab.fault;
  const train = grouped ? ["A", "B", "C"] : ["A", "B", "D"];
  const test = grouped ? ["D", "E", "F"] : ["C", "E", "F"];
  const positions: Record<string, [number, number]> = {};
  train.forEach((n, i) => {
    positions[n] = [65, 66 + i * 66];
  });
  test.forEach((n, i) => {
    positions[n] = [235, 66 + i * 66];
  });
  const edges = [["A", "B"], ...(linked ? [["B", "C"]] : []), ["D", "E"]];
  const leaked = grouped ? [] : linked ? ["C", "E"] : ["E"];
  const correct = leaked.length + 1;
  return (
    <Frame
      id="split"
      kind="duplicate-component-split"
      title="相似图与切分泄漏"
      lab={lab}
      reset={() => {
        lab.reset();
        setSplit("record");
        setBridge("linked");
      }}
      stages={[
        "先标出文档与候选相似边",
        "合并相似边的连通分量",
        "检查训练与测试是否跨分量",
        "按记忆命中和干净命中分别计数",
      ]}
      controls={
        <>
          <Select label="切分单位" value={split} onChange={setSplit}>
            <option value="record">Record / 逐条切分</option>
            <option value="component">Group / 分量切分</option>
          </Select>
          <Select label="桥接相似边" value={bridge} onChange={setBridge}>
            <option value="linked">Linked / 保留 B-C</option>
            <option value="separate">Separate / 删除 B-C</option>
          </Select>
        </>
      }
      result={
        <>
          <p>
            相似分量：{linked ? "ABC | DE | F" : "AB | C | DE | F"}。实际训练：
            {train.join("、")}；测试：{test.join("、")}。
          </p>
          <p>
            玩具答题规则：见过同分量即记忆答对；独立题只有 F 答对。跨集合泄漏{" "}
            {leaked.length}/3，表面准确率 {correct}/3；干净子集准确率 1/
            {3 - leaked.length}。
          </p>
          <p>
            {lab.fault
              ? "故障把分量策略覆盖为逐条切分。关闭故障恢复所选策略。"
              : "Group 按整个分量隔离；切换桥接边可见传递闭包如何改变泄漏数。"}{" "}
            这些分数不是实际模型能力。
          </p>
        </>
      }
    >
      <svg
        viewBox="0 0 300 270"
        className="w-full"
        role="img"
        aria-label="六篇文档的相似边及训练测试分隔线"
        style={{ maxHeight: 430, fontSize: 14 }}
      >
        <text x="65" y="22" textAnchor="middle" fill="currentColor">
          训练
        </text>
        <text x="235" y="22" textAnchor="middle" fill="currentColor">
          测试
        </text>
        <line
          x1="150"
          x2="150"
          y1="35"
          y2="232"
          stroke={lab.step === 2 ? policyColor : neutralColor}
          strokeDasharray="5 5"
        />
        {edges.map(([a, b]) => {
          const [x1, y1] = positions[a],
            [x2, y2] = positions[b];
          const d = Math.hypot(x2 - x1, y2 - y1);
          if (x1 === x2) {
            const side = x1 > 150 ? 1 : -1;
            return (
              <path
                key={a + b}
                data-edge={a + b}
                d={`M ${x1 + side * 20} ${y1} C ${x1 + side * 50} ${y1}, ${x2 + side * 50} ${y2}, ${x2 + side * 20} ${y2}`}
                fill="none"
                stroke={lab.step === 1 ? policyColor : neutralColor}
                strokeWidth="3"
              />
            );
          }
          return (
            <line
              key={a + b}
              data-edge={a + b}
              x1={x1 + ((x2 - x1) * 20) / d}
              y1={y1 + ((y2 - y1) * 20) / d}
              x2={x2 - ((x2 - x1) * 20) / d}
              y2={y2 - ((y2 - y1) * 20) / d}
              stroke={lab.step === 1 ? policyColor : neutralColor}
              strokeWidth="3"
            />
          );
        })}
        {Object.entries(positions).map(([n, [x, y]]) => (
          <g key={n} data-document={n}>
            <circle
              cx={x}
              cy={y}
              r="19"
              stroke={lab.step === 3 && test.includes(n) ? policyColor : "none"}
              strokeWidth="3"
              fill={
                leaked.includes(n)
                  ? faultColor
                  : n === "F"
                    ? completeColor
                    : targetColor
              }
            />
            <text x={x} y={y + 5} textAnchor="middle" fill={onFillColor}>
              {n}
            </text>
            {test.includes(n) && (
              <text x={x} y={y + 35} textAnchor="middle" fill="currentColor">
                {leaked.includes(n)
                  ? "记忆命中"
                  : n === "F"
                    ? "独立命中"
                    : "独立答错"}
              </text>
            )}
          </g>
        ))}
        <text x="150" y="259" textAnchor="middle" fill="currentColor">
          红点：测试题与训练同分量
        </text>
      </svg>
    </Frame>
  );
}

export function LslOfficialFinalReviewComputeTraceLab() {
  const lab = useReview();
  const [target, setTarget] = useState("answer");
  const [pair, setPair] = useState("correct");
  const mask = [
    target === "all" || lab.fault ? 1 : 0,
    target === "all" || lab.fault ? 1 : 0,
    1,
    1,
  ];
  const probs = [0.2, 0.8, 0.4, 0.6];
  const active = mask.reduce((a, b) => a + b, 0);
  const gradients = probs.map((p, i) => (mask[i] * (p - 1)) / active);
  const delta = pair === "correct" ? 1 : -1;
  const loss = Math.log1p(Math.exp(-delta));
  const derivative = -1 / (1 + Math.exp(delta));
  const curve = Array.from({ length: 41 }, (_, i) => {
    const d = -2 + i / 10;
    return `${30 + i * 6},${264 - Math.log1p(Math.exp(-d)) * 24}`;
  }).join(" ");
  return (
    <Frame
      id="objective"
      kind="target-gradient-preference-curve"
      title="目标掩码与偏好梯度"
      lab={lab}
      reset={() => {
        lab.reset();
        setTarget("answer");
        setPair("correct");
      }}
      stages={[
        "固定四个目标词元的预测概率",
        "将掩码乘进逐词元损失",
        "比较 SFT 的四个梯度",
        "另算奖励差的成对偏好损失",
      ]}
      controls={
        <>
          <Select label="SFT 目标范围" value={target} onChange={setTarget}>
            <option value="answer">Answer / 只计回答</option>
            <option value="all">Whole / 整段计算</option>
          </Select>
          <Select label="偏好标注方向" value={pair} onChange={setPair}>
            <option value="correct">Correct / 奖励差 +1</option>
            <option value="reversed">Reversed / 奖励差 -1</option>
          </Select>
        </>
      }
      result={
        <>
          <p>
            有效目标 {active} 个；平均 SFT 损失{" "}
            {(
              -probs.reduce((s, p, i) => s + mask[i] * Math.log(p), 0) / active
            ).toFixed(3)}
            ；目标 logit 梯度 [{gradients.map((g) => g.toFixed(2)).join(", ")}
            ]。
          </p>
          <p>
            奖励差 Δ={delta}；成对损失 {loss.toFixed(3)}；对 Δ 的导数{" "}
            {derivative.toFixed(3)}
            （期望提高被偏好回答的相对奖励）。翻转标注改变学习方向对应的回答，而不是把提示词设成预测目标。
          </p>
          <p>
            {lab.fault
              ? "故障：忽略掩码，提示词也获得非零梯度。"
              : "被屏蔽目标的直接损失梯度为零；提示的上下文表示仍可能间接收到梯度。"}{" "}
            下图只对独立标量 logit 求导；成对奖励损失不是 DPO 或 PPO
            更新，也不是真实神经网络。
          </p>
        </>
      }
    >
      <svg
        viewBox="0 0 300 294"
        className="w-full"
        role="img"
        aria-label="四个目标词元的掩码和负梯度柱，以及偏好损失曲线"
        style={{ maxHeight: 450, fontSize: 14 }}
      >
        {["提示1", "提示2", "回答1", "回答2"].map((t, i) => (
          <g key={t} data-token={i}>
            <rect
              x={24 + 65 * i}
              y="14"
              width="57"
              height="35"
              rx="4"
              stroke={lab.step === 0 ? policyColor : "none"}
              strokeWidth="3"
              fill={mask[i] ? targetColor : neutralColor}
            />
            <text x={52 + 65 * i} y="37" textAnchor="middle" fill={onFillColor}>
              {t}
            </text>
            <text
              x={52 + 65 * i}
              y="70"
              textAnchor="middle"
              fill="currentColor"
            >
              m={mask[i]}
            </text>
            <text
              x={52 + 65 * i}
              y="92"
              textAnchor="middle"
              fill="currentColor"
            >
              p={probs[i]}
            </text>
            <rect
              data-gradient={gradients[i]}
              stroke={lab.step === 2 ? policyColor : "none"}
              strokeWidth="3"
              x={35 + i * 65}
              y={135 - Math.abs(gradients[i]) * 120}
              width="34"
              height={Math.max(1, Math.abs(gradients[i]) * 120)}
              fill={lab.fault && i < 2 ? faultColor : targetColor}
            />
            <text
              x={52 + 65 * i}
              y="156"
              textAnchor="middle"
              fill="currentColor"
            >
              {gradients[i].toFixed(2)}
            </text>
          </g>
        ))}
        <line x1="22" x2="278" y1="135" y2="135" stroke={neutralColor} />
        <text x="150" y="181" textAnchor="middle" fill="currentColor">
          目标 logit 梯度（向上为负值大小）
        </text>
        <polyline
          points={curve}
          fill="none"
          stroke={completeColor}
          strokeWidth={lab.step === 3 ? 5 : 3}
        />
        <circle
          data-preference={delta}
          cx={30 + (delta + 2) * 60}
          cy={264 - loss * 24}
          r="6"
          fill={pair === "correct" ? targetColor : faultColor}
        />
        <text x="35" y="286" fill="currentColor">
          Δ=-2
        </text>
        <text x="240" y="286" fill="currentColor">
          Δ=2
        </text>
        <text x="158" y="211" fill="currentColor">
          成对损失
        </text>
      </svg>
    </Frame>
  );
}

type Tick = {
  blocks: string[];
  active: string[];
  done: string[];
  waiting: string[];
};
function schedule(capacity: number, bypass: boolean, drop: boolean): Tick[] {
  const requests = [
    { id: "A", blocks: 3, ticks: 3 },
    { id: "B", blocks: 2, ticks: 1 },
    { id: "C", blocks: 1, ticks: 1 },
  ];
  const waiting = requests.filter((r) => !drop || r.id !== "A");
  let running: ((typeof requests)[number] & { left: number })[] = [];
  const owners = Array<string>(capacity).fill("");
  const done: string[] = [],
    history: Tick[] = [];
  for (let t = 0; t < 7; t++) {
    let free = owners.filter((id) => !id).length;
    for (let i = 0; i < waiting.length; ) {
      const r = waiting[i];
      if (r.blocks <= free) {
        waiting.splice(i, 1);
        running.push({ ...r, left: r.ticks });
        free -= r.blocks;
        let need = r.blocks;
        for (let block = 0; block < capacity && need; block++) {
          if (!owners[block]) {
            owners[block] = r.id;
            need--;
          }
        }
      } else if (bypass) i++;
      else break;
    }
    history.push({
      blocks: [...owners],
      active: running.map((r) => r.id),
      done: [...done],
      waiting: waiting.map((r) => r.id),
    });
    running = running.filter((r) => {
      r.left--;
      if (r.left === 0) {
        done.push(r.id);
        for (let block = 0; block < capacity; block++)
          if (owners[block] === r.id) owners[block] = "";
        return false;
      }
      return true;
    });
  }
  return history;
}
export function LslOfficialFinalReviewEvidenceGateLab() {
  const lab = useReview();
  const [budget, setBudget] = useState("4");
  const [policy, setPolicy] = useState("fifo");
  const history = schedule(Number(budget), policy === "bypass", lab.fault);
  const current = history[lab.step];
  const finish = history.findIndex(
    (h) => h.done.length === (lab.fault ? 2 : 3),
  );
  const colors: Record<string, string> = {
    A: targetColor,
    B: policyColor,
    C: completeColor,
  };
  return (
    <Frame
      id="cache"
      kind="kv-blocks-scheduler-lanes"
      title="KV 块预算与负载公平性"
      lab={lab}
      reset={() => {
        lab.reset();
        setBudget("4");
        setPolicy("fifo");
      }}
      stages={[
        "t=0：按块预算接纳",
        "t=1：短请求完成后释放",
        "t=2：长请求仍占有物理块",
        "t=3：释放后重新接纳；下表列完整结局",
      ]}
      controls={
        <>
          <Select label="KV 物理块预算" value={budget} onChange={setBudget}>
            <option value="4">Four / 4 块</option>
            <option value="5">Five / 5 块</option>
          </Select>
          <Select label="接纳调度策略" value={policy} onChange={setPolicy}>
            <option value="fifo">FIFO / 队首等待</option>
            <option value="bypass">Bypass / 允许绕过</option>
          </Select>
        </>
      }
      result={
        <>
          <p>
            t={lab.step}：运行 {current.active.join("、") || "无"}；等待{" "}
            {current.waiting.join("、") || "无"}；完成{" "}
            {current.done.join("、") || "无"}。占用{" "}
            {current.blocks.filter(Boolean).length}/{budget} 块。
          </p>
          <p>
            完整负载 A(3块×3拍)、B(2块×1拍)、C(1块×1拍)。实际完成{" "}
            {lab.fault ? 2 : 3}/3；实际接纳集全部完成用 {finish} 拍，表面吞吐{" "}
            {((lab.fault ? 2 : 3) / finish).toFixed(2)} 请求/拍。
          </p>
          <p>
            {lab.fault
              ? "故障丢弃 A：虽然数字变好，却不满足同一请求集合，拒绝直接比较。"
              : "比较必须固定三个请求及各自长度；预算变化需另报资源，不冒充相同硬件提速。"}{" "}
            时间与容量均为教学单位，非实测服务性能。
          </p>
        </>
      }
    >
      <svg
        viewBox="0 0 300 300"
        className="w-full"
        role="img"
        aria-label="KV 物理块占用格与请求离散时间调度泳道"
        style={{ maxHeight: 450, fontSize: 14 }}
      >
        <text x="15" y="21" fill="currentColor">
          当前物理块（静态需求教学假设）
        </text>
        {Array.from({ length: Number(budget) }, (_, i) => (
          <g key={i}>
            <rect
              data-block={current.blocks[i] || "free"}
              x={18 + i * 54}
              y="35"
              width="46"
              height="39"
              rx="4"
              fill={colors[current.blocks[i]] || neutralColor}
            />
            <text x={41 + i * 54} y="60" textAnchor="middle" fill={onFillColor}>
              {current.blocks[i] || "空"}
            </text>
          </g>
        ))}
        <text x="15" y="100" fill="currentColor">
          完整接纳轨迹：列为 t，实色为运行
        </text>
        {["A", "B", "C"].map((id, row) => (
          <g key={id}>
            <text x="13" y={142 + row * 46} fill="currentColor">
              {id}
            </text>
            {history.slice(0, 5).map((h, t) => (
              <g key={t}>
                <rect
                  data-lane={`${id}${t}`}
                  x={40 + t * 48}
                  y={119 + row * 46}
                  width="41"
                  height="34"
                  fill={h.active.includes(id) ? colors[id] : inactiveColor}
                  stroke={t === lab.step ? faultColor : neutralColor}
                  strokeWidth={t === lab.step ? 3 : 1}
                />
                <text
                  x={60 + t * 48}
                  y={141 + row * 46}
                  textAnchor="middle"
                  fill={h.active.includes(id) ? onFillColor : labelColor}
                >
                  {h.active.includes(id)
                    ? "跑"
                    : h.done.includes(id)
                      ? "完"
                      : lab.fault && id === "A"
                        ? "丢"
                        : "等"}
                </text>
              </g>
            ))}
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((t) => (
          <text
            key={t}
            x={60 + t * 48}
            y="273"
            textAnchor="middle"
            fill="currentColor"
          >
            {t}
          </text>
        ))}
        <text x="150" y="295" textAnchor="middle" fill="currentColor">
          结束时刻以完成集合判定，不裁掉等待
        </text>
      </svg>
    </Frame>
  );
}
