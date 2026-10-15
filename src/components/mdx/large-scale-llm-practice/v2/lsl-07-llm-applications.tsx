"use client";

import { useState, type ReactNode } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  border: "var(--border)",
  paper: "var(--bg-elevated)",
  danger: "var(--danger)",
};
const promptSteps = ["读题", "子问题一", "携带子答案", "组合答案"].map(
  (label) => ({ label }),
);
const ragSteps = ["文档向量", "检索片段", "计划与权限", "工具观察"].map(
  (label) => ({ label }),
);
const servingSteps = Array.from({ length: 10 }, (_, i) => ({
  label: `已执行 ${i} 个迭代`,
}));
function useClock(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => {
        tl.label(s.label, i * 900);
        tl.add(clock, { value: i + 1, duration: 900 }, i * 900);
      });
    },
  });
}
// Styling only: the three domain simulations below do not share a state engine.
function Surface({
  title,
  kind,
  children,
}: {
  title: string;
  kind: string;
  children: ReactNode;
}) {
  return (
    <section
      className="lsl07-lab not-prose my-8 rounded-xl border border-border bg-elevated p-3 sm:p-5"
      data-visual-kind={kind}
      aria-label={title}
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      {children}
      <style>{`
      .lsl07-lab { min-width:0; color:var(--text-primary); }
      .lsl07-lab svg { display:block; width:100%; max-width:460px; height:auto; margin:16px auto; overflow:visible; }
      .lsl07-lab svg text { font:18px sans-serif; fill:var(--text-primary); }
      .lsl07-lab label { display:block; margin:12px 0; }
      .lsl07-lab select { display:block; width:100%; max-width:100%; }
      .lsl07-lab select,.lsl07-lab button { min-width:44px; min-height:44px; padding:8px; border:1px solid var(--border); border-radius:6px; background:var(--bg-elevated); color:var(--text-primary); }
      .lsl07-lab input[type=range] { width:100%; min-height:44px; accent-color:var(--accent); }
      .lsl07-lab button[aria-pressed=true] { border-color:var(--danger); }
      .lsl07-lab :is(button,select,input):focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
      .lsl07-lab p { margin:12px 0; line-height:1.7; overflow-wrap:anywhere; }
      .lsl07-lab .mt-4.flex { flex-wrap:wrap; }
      .lsl07-lab output { display:block; padding:10px; border-left:3px solid var(--accent); }
    `}</style>
    </section>
  );
}

export function Lsl07LlmApplicationsContextContractLab() {
  const timeline = useClock(promptSteps);
  const [method, setMethod] = useState("ltm");
  const [bottles, setBottles] = useState(6);
  const [missing, setMissing] = useState(false);
  const step = timeline.currentStep;
  const subtotal = 3 * bottles;
  const blocked = missing && method === "ltm";
  const reset = () => {
    setMethod("ltm");
    setBottles(6);
    setMissing(false);
    timeline.pause();
    timeline.goToStep(0);
  };
  const points =
    method === "ltm"
      ? [
          [92, 120],
          [268, 120],
          [180, 258],
        ]
      : [
          [180, 90],
          [180, 184],
          [180, 278],
        ];
  return (
    <Surface
      title="提示实验：子答案怎样进入下一次输入"
      kind="lsl07-prompt-dependency-context"
    >
      <p>
        教学算题：3 箱，每箱 {bottles} 瓶，另有 4
        瓶。这里的数值由算术程序生成，不是模型输出。先预测：丢掉子答案还能组合吗？
      </p>
      <label>
        提示策略
        <select
          aria-label="提示策略"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            timeline.pause();
            timeline.goToStep(0);
          }}
        >
          <option value="ltm">Least-to-Most 分次求解</option>
          <option value="cot">CoT 单次链式示例</option>
        </select>
      </label>
      <label>
        每箱瓶数：{bottles}
        <input
          aria-label="每箱瓶数"
          type="range"
          min="3"
          max="8"
          value={bottles}
          onChange={(e) => {
            setBottles(Number(e.target.value));
            timeline.pause();
            timeline.goToStep(0);
          }}
        />
      </label>
      <svg
        viewBox="0 0 360 420"
        role="img"
        aria-label={`${method} 子问题依赖图与输入历史，第${step + 1}步`}
      >
        <text x="180" y="28" textAnchor="middle">
          {method === "ltm" ? "两次求解 → 组合" : "一次调用内的中间步骤"}
        </text>
        {method === "ltm" ? (
          <>
            <path
              d="M92 153 L92 205 L150 231 M268 153 L268 205 L210 231"
              fill="none"
              stroke={blocked ? C.danger : C.accent}
              strokeWidth="3"
              strokeDasharray={blocked ? "6 5" : undefined}
            />
            <text x="180" y="180" textAnchor="middle">
              {blocked ? "a₁ 缺失" : "答案依赖"}
            </text>
          </>
        ) : (
          <path
            d="M180 120 V154 M180 214 V248"
            stroke={C.accent}
            strokeWidth="3"
          />
        )}
        {points.map(([x, y], i) => (
          <g key={i} opacity={step >= i + 1 ? 1 : 0.35}>
            <circle
              cx={x}
              cy={y}
              r="32"
              fill={C.paper}
              stroke={i === 2 && blocked ? C.danger : C.accent}
              strokeWidth="2"
            />
            <text x={x} y={y + 6} textAnchor="middle">
              {i === 0
                ? subtotal
                : i === 1
                  ? "+4"
                  : blocked
                    ? "?"
                    : subtotal + 4}
            </text>
            <text
              x={method === "ltm" ? x : x + 90}
              y={method === "ltm" ? y - 45 : y + 6}
              textAnchor="middle"
            >
              {["a₁", "补充", "合计"][i]}
            </text>
          </g>
        ))}
        <text x="18" y="340">
          {method === "ltm" ? "当前调用的输入片段" : "同一输出序列的累积片段"}
        </text>
        {[
          "题目",
          step >= 1 ? "a₁" : "—",
          step >= 2 ? "+4" : "—",
          step >= 3 ? "合计" : "—",
        ].map((s, i) => (
          <g key={i}>
            <rect
              x={18 + i * 82}
              y="355"
              width="76"
              height="42"
              fill={C.paper}
              stroke={i === 1 && blocked ? C.danger : C.border}
              strokeDasharray={i === 1 && blocked ? "4 3" : undefined}
            />
            <text x={56 + i * 82} y="382" textAnchor="middle">
              {i === 1 && blocked ? "缺失" : s}
            </text>
          </g>
        ))}
      </svg>
      <output aria-live="polite" data-result="prompt">
        {step < 3
          ? `尚未组合；已知子答案 ${step >= 1 ? subtotal : "未求解"}。`
          : blocked
            ? "拒绝组合：下一次输入缺少 a₁，不能把空值当 0。"
            : `校验：3 × ${bottles} + 4 = ${subtotal + 4}。`}
      </output>
      <button
        type="button"
        aria-label="故障：丢弃子答案"
        aria-pressed={missing}
        onClick={() => setMissing(!missing)}
      >
        故障：丢弃子答案 {missing ? "开" : "关"}
      </button>
      <p>
        {method === "cot"
          ? "CoT 在一次生成中续写；本故障只针对分次调用的历史装配，因此此模式不生效。可读的中间步骤仍可能算错，不能当真实性证明。"
          : "Least-to-Most 先分解再按依赖求解；每次调用必须显式携带前面的子问题与答案。虚线表示依赖已断开。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Surface>
  );
}

const docs = [
  { id: "P", x: 0.95, y: 0.05, text: "退款期限 30 天", days: 30 },
  { id: "H", x: 0.8, y: 0.2, text: "超期转人工", days: null },
  { id: "C", x: 0.1, y: 0.9, text: "客服联系方式", days: null },
];
// A deterministic local executor: replaying one call ID returns the same observation.
// Rebuilt per timeline state; no payment service or persistent business effect.
function localToolObservation(allowed: boolean) {
  const ledger = new Map<string, string>();
  const memory: string[] = [];
  const execute = (id: string) => {
    const previous = ledger.get(id);
    if (previous) return previous;
    const observation = allowed ? "账本新增 1 次退款" : "人工队列新增 1 条";
    ledger.set(id, observation);
    memory.push(observation);
    return observation;
  };
  const first = execute("order-1");
  const replay = execute("order-1");
  return {
    text: first,
    count: ledger.size,
    memory: memory.length,
    deduplicated: first === replay && ledger.size === 1,
  };
}
export function Lsl07LlmApplicationsComputeTraceLab() {
  const timeline = useClock(ragSteps);
  const [topK, setTopK] = useState(2);
  const [age, setAge] = useState(45);
  const [stale, setStale] = useState(false);
  const step = timeline.currentStep;
  // q=(1,0); cosine rank is calculated, not a curated score label.
  const ranked = docs
    .map((d) => ({ ...d, score: d.x / Math.hypot(d.x, d.y) }))
    .sort((a, b) => b.score - a.score);
  const selected = ranked.slice(0, topK);
  const maxDays = stale ? 90 : 30;
  const allowed = age <= maxDays;
  const observation = localToolObservation(allowed);
  const reset = () => {
    setTopK(2);
    setAge(45);
    setStale(false);
    timeline.pause();
    timeline.goToStep(0);
  };
  return (
    <Surface
      title="检索与工具实验：证据版本决定动作边界"
      kind="lsl07-vector-retrieval-tool-observation"
    >
      <p>
        固定查询向量 q=(1,0)。P 是期限条款，H 是转人工条款，C
        是联系方式。教学向量不是嵌入模型；工具只写入临时本地账本，不会真实退款。
      </p>
      <label>
        检索片段数
        <select
          aria-label="检索片段数"
          value={topK}
          onChange={(e) => {
            setTopK(Number(e.target.value));
            timeline.pause();
            timeline.goToStep(0);
          }}
        >
          <option value="2">双片段 top-k=2</option>
          <option value="1">单片段 top-k=1</option>
        </select>
      </label>
      <label>
        订单年龄
        <select
          aria-label="订单年龄"
          value={age}
          onChange={(e) => {
            setAge(Number(e.target.value));
            timeline.pause();
            timeline.goToStep(0);
          }}
        >
          <option value="45">超期订单 45 天</option>
          <option value="20">期内订单 20 天</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 470"
        role="img"
        aria-label={`余弦检索选取${topK}个片段，订单${age}天，证据版本${stale ? "旧" : "新"}`}
      >
        <path
          d="M42 220 H325 M42 220 V35"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
        />
        <text x="110" y="27">
          客服维
        </text>
        <text x="260" y="245">
          退款维
        </text>
        <path d="M42 220 L312 220" stroke={C.accent} strokeWidth="4" />
        <text x="166" y="210">
          q →
        </text>
        {ranked.map((d) => {
          const x = 42 + d.x * 270;
          const y = 220 - d.y * 180;
          const hit = step >= 1 && selected.some((s) => s.id === d.id);
          return (
            <g key={d.id}>
              <path
                d={`M42 220 L${x} ${y}`}
                stroke={hit ? C.accent : C.border}
                strokeWidth={hit ? 3 : 1}
              />
              <circle
                cx={x}
                cy={y}
                r={hit ? 9 : 5}
                fill={hit ? C.accent : C.muted}
              />
              <text x={d.id === "C" ? x + 15 : x - 12} y={y - 16}>
                {d.id}
              </text>
            </g>
          );
        })}
        <text x="18" y="278">
          传给生成器的检索上下文
        </text>
        {selected.map((d, i) => (
          <g key={d.id} opacity={step >= 1 ? 1 : 0.3}>
            <rect
              x="18"
              y={292 + i * 42}
              width="324"
              height="36"
              fill={C.paper}
              stroke={stale && d.id === "P" ? C.danger : C.accent}
            />
            <text x="26" y={317 + i * 42}>
              {d.id}: {d.id === "P" ? `期限 ${maxDays} 天` : d.text} ·{" "}
              {d.score.toFixed(2)}
            </text>
          </g>
        ))}
        <path
          d={`M180 ${topK === 2 ? 376 : 336} V391`}
          stroke={C.border}
          strokeWidth="2"
        />
        <text x="18" y="415">
          计划：
          {step >= 2
            ? allowed
              ? "refund(order-1)"
              : "handoff(order-1)"
            : "等待证据"}
        </text>
        <text x="18" y="451">
          观察：
          {step >= 3 ? observation.text : "尚无工具执行"}
        </text>
      </svg>
      <output aria-live="polite" data-result="rag">
        {step < 2
          ? "先排序再拼接；检索相似度不是条款的有效性。"
          : `使用政策 ${stale ? "v0（错误旧版）" : "v1"}：${age} ${allowed ? "≤" : ">"} ${maxDays}，${allowed ? "允许本地模拟退款" : "转人工"}。${step >= 3 ? `本地账本 ${observation.count} 条、记忆 ${observation.memory} 条；同一调用 ID 重放${observation.deduplicated ? "已去重" : "失败"}。` : "还没有执行工具。"}`}
      </output>
      <button
        type="button"
        aria-label="故障：旧版期限"
        aria-pressed={stale}
        onClick={() => setStale(!stale)}
      >
        故障：旧版期限 {stale ? "开" : "关"}
      </button>
      <p>
        撤销故障后再走到最后一步，45 天订单回到转人工。top-k 从 2 降到 1 只删去
        H；P
        仍在，不能为凑“效果变化”擅改期限。真实系统还须检验租户、条款生效日期与工具授权。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Surface>
  );
}

type Job = { id: string; arrival: number; length: number; done: number };
function schedule(policy: string, ticks: number) {
  const jobs: Job[] = [
    { id: "A", arrival: 0, length: 6, done: 0 },
    { id: "B", arrival: 1, length: 2, done: 0 },
    { id: "C", arrival: 2, length: 1, done: 0 },
  ];
  const trace: string[] = [];
  const finished: Record<string, number> = {};
  for (let t = 0; t < ticks; t++) {
    const ready = jobs.filter((j) => j.arrival <= t && j.done < j.length);
    ready.sort((a, b) =>
      policy === "las"
        ? a.done - b.done || a.arrival - b.arrival
        : a.arrival - b.arrival,
    );
    const j = ready[0];
    if (!j) continue;
    trace.push(j.id);
    j.done++;
    if (j.done === j.length) finished[j.id] = t + 1;
  }
  return { jobs, trace, finished };
}
function allocate(
  policy: string,
  ticks: number,
  blockSize: number,
  leak: boolean,
) {
  const blocks: (string | null)[] = Array(12).fill(null);
  for (let tick = 1; tick <= ticks; tick++) {
    const { jobs } = schedule(policy, tick);
    for (const j of jobs) {
      const n =
        j.done === 0
          ? 0
          : j.done === j.length && !leak
            ? 0
            : Math.ceil((2 + j.done) / blockSize);
      const owned = blocks.flatMap((owner, i) => (owner === j.id ? [i] : []));
      if (!n)
        owned.forEach((i) => {
          blocks[i] = null;
        });
      else
        for (let k = owned.length; k < n; k++) {
          const free = blocks.indexOf(null);
          if (free >= 0) blocks[free] = j.id;
        }
    }
  }
  return blocks;
}
export function Lsl07LlmApplicationsEvidenceGateLab() {
  const timeline = useClock(servingSteps);
  const [policy, setPolicy] = useState("las");
  const [blockSize, setBlockSize] = useState(2);
  const [leak, setLeak] = useState(false);
  const ticks = timeline.currentStep;
  const { jobs, trace, finished } = schedule(policy, ticks);
  const blocks = allocate(policy, ticks, blockSize, leak);
  const used = blocks.filter(Boolean).length;
  const liveTokens = jobs.reduce(
    (sum, j) =>
      sum + (j.done > 0 && (leak || j.done < j.length) ? 2 + j.done : 0),
    0,
  );
  const reset = () => {
    setPolicy("las");
    setBlockSize(2);
    setLeak(false);
    timeline.pause();
    timeline.goToStep(0);
  };
  return (
    <Surface
      title="服务实验：抢占时间片与物理 KV 块"
      kind="lsl07-serving-gantt-kv-block-map"
    >
      <p>
        A/B/C 分别在迭代 0/1/2 到达，需生成 6/2/1
        个词元。每次只服务一个请求，每个请求输入长 2。等长迭代是教学单位，不是
        GPU 毫秒。
      </p>
      <label>
        调度策略
        <select
          aria-label="调度策略"
          value={policy}
          onChange={(e) => {
            setPolicy(e.target.value);
            timeline.pause();
            timeline.goToStep(0);
          }}
        >
          <option value="las">最少已获服务 LAS</option>
          <option value="fifo">先进先出 FIFO</option>
        </select>
      </label>
      <label>
        每块词元数
        <select
          aria-label="每块词元数"
          value={blockSize}
          onChange={(e) => {
            setBlockSize(Number(e.target.value));
            timeline.pause();
            timeline.goToStep(0);
          }}
        >
          <option value="2">小块 2 tokens</option>
          <option value="4">大块 4 tokens</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 480"
        role="img"
        aria-label={`执行${ticks}次迭代，${policy}调度，${used}个KV块占用`}
      >
        <text x="18" y="27">
          迭代槽（每格 1 次解码）
        </text>
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <rect
              x={18 + i * 36}
              y="48"
              width="32"
              height="42"
              fill={C.paper}
              stroke={trace[i] ? C.accent : C.border}
              strokeWidth={trace[i] ? 2 : 1}
            />
            <text x={34 + i * 36} y="76" textAnchor="middle">
              {trace[i] || "·"}
            </text>
            <text x={34 + i * 36} y="113" textAnchor="middle">
              {i + 1}
            </text>
          </g>
        ))}
        {jobs.map((j, i) => (
          <g key={j.id}>
            <text x="18" y={149 + i * 42}>
              {j.id}
            </text>
            <rect
              x="46"
              y={130 + i * 42}
              width="174"
              height="25"
              fill={C.paper}
              stroke={C.border}
            />
            <rect
              x="46"
              y={130 + i * 42}
              width={(174 * j.done) / j.length}
              height="25"
              fill={C.accent}
              opacity="0.5"
            />
            <text x="232" y={149 + i * 42}>
              {finished[j.id]
                ? `完成 t=${finished[j.id]}`
                : `${j.done}/${j.length}`}
            </text>
          </g>
        ))}
        <text x="18" y="279">
          物理块编号 ≠ 逻辑顺序
        </text>
        {blocks.map((owner, i) => (
          <g key={i}>
            <rect
              x={18 + (i % 4) * 82}
              y={295 + Math.floor(i / 4) * 47}
              width="76"
              height="41"
              rx="4"
              fill={C.paper}
              stroke={
                owner
                  ? leak && finished[owner]
                    ? C.danger
                    : C.accent
                  : C.border
              }
              strokeWidth={owner ? 2 : 1}
            />
            <text
              x={56 + (i % 4) * 82}
              y={322 + Math.floor(i / 4) * 47}
              textAnchor="middle"
            >
              {i}:{owner || "空"}
            </text>
          </g>
        ))}
        <text x="18" y="466">
          {used} 块 × {blockSize} = {used * blockSize} 位置
        </text>
      </svg>
      <output aria-live="polite" data-result="serving">
        执行 {ticks}/9；有效 KV 词元 {liveTokens}，尾块空隙{" "}
        {used * blockSize - liveTokens}。
        {ticks === 9
          ? `完成时间 A=${finished.A}，B=${finished.B}，C=${finished.C}；${leak ? "故障：结束的请求仍持有物理块。" : "所有结束请求已释放块。"}`
          : "下一步观察哪个请求被抢占，哪个物理块被回收复用。"}
      </output>
      <button
        type="button"
        aria-label="故障：结束不回收"
        aria-pressed={leak}
        onClick={() => setLeak(!leak)}
      >
        故障：结束不回收 {leak ? "开" : "关"}
      </button>
      <p>
        此处 LAS 只演示 FastServe 的最少已获服务思想，不实现其
        profiling、skip-join 多级队列或跨 GPU 换出。块格只演示 vLLM
        的非连续分配与尾块浪费，不实现注意力内核、共享前缀或真实显存。两种优化解决不同瓶颈。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Surface>
  );
}
