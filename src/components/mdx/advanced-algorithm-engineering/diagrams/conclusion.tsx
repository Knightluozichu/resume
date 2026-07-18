"use client";

import { useMemo, useState } from "react";

const bookArcs = [
  {
    label: "建模",
    chapters: "Ch. 1–4",
    title: "从 RAM 走向真实机器",
    detail: "先界定输入、资源与代价，再用采样、并行模拟和分治把问题变成可执行算法。",
    accent: "border-accent bg-accent/10 text-accent",
  },
  {
    label: "组织",
    chapters: "Ch. 5–10",
    title: "排序、集合与检索",
    detail: "把数据重排、分桶、散列或建立索引，让后续查询沿连续且可预测的路径运行。",
    accent: "border-success bg-success/10 text-success",
  },
  {
    label: "编码",
    chapters: "Ch. 11–14",
    title: "利用分布与重复",
    detail: "从整数码到统计码、字典码和 BWT，把概率、局部性与重复变成更少的数据移动。",
    accent: "border-warning bg-warning/10 text-warning",
  },
  {
    label: "融合",
    chapters: "Ch. 15–16",
    title: "压缩表示直接计算",
    detail: "让结构本身接近信息下界，同时保留导航；最后把模型、实现和实验收束为工程闭环。",
    accent: "border-primary bg-primary/10 text-primary",
  },
] as const;

export function PaeBookArcMap() {
  const [selected, setSelected] = useState(0);
  const active = bookArcs[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-4" role="tablist" aria-label="全书四段主线">
          {bookArcs.map((arc, index) => (
            <button
              key={arc.label}
              type="button"
              role="tab"
              aria-selected={selected === index}
              onClick={() => setSelected(index)}
              className={
                "min-h-20 border p-3 text-left transition-colors " +
                (selected === index ? arc.accent : "border-border bg-background text-secondary")
              }
            >
              <span className="block text-xs font-semibold">{arc.chapters}</span>
              <span className="mt-1 block text-sm font-semibold">{arc.label}</span>
            </button>
          ))}
        </div>
        <div className={"mt-3 border p-4 " + active.accent}>
          <div className="text-sm font-semibold">{active.title}</div>
          <p className="mb-0 mt-2 text-sm leading-6 text-secondary">{active.detail}</p>
        </div>
        <div className="mt-3 flex items-center gap-1" aria-hidden="true">
          {bookArcs.map((arc, index) => (
            <div key={arc.label} className="flex flex-1 items-center gap-1">
              <span className={"h-2 flex-1 " + (index <= selected ? "bg-accent" : "bg-border")} />
              {index < bookArcs.length - 1 ? <span className="text-xs text-muted">→</span> : null}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        十五章不是技巧清单，而是一条逐步减少不确定性的路线：建模、组织、编码，最终在压缩表示上直接计算。
      </figcaption>
    </figure>
  );
}

const engineeringStages = [
  {
    key: "theory",
    label: "理论",
    question: "哪个资源决定下界？",
    evidence: "RAM / I/O / comparison / entropy bound",
    failure: "模型遗漏真实瓶颈",
  },
  {
    key: "implementation",
    label: "实现",
    question: "代价落在哪条机器路径？",
    evidence: "layout / branch / allocation / vectorization",
    failure: "渐近优势被常数与局部性抵消",
  },
  {
    key: "experiments",
    label: "实验",
    question: "结论能否跨规模与分布复现？",
    evidence: "datasets / baselines / counters / confidence",
    failure: "只证明了一个样例更快",
  },
  {
    key: "revision",
    label: "修订",
    question: "观测结果推翻了哪个假设？",
    evidence: "profile → hypothesis → redesign",
    failure: "调参却不更新模型",
  },
] as const;

export function PaeEngineeringLoopDiagram() {
  const [stage, setStage] = useState(0);
  const active = engineeringStages[stage];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label="算法工程闭环">
          {engineeringStages.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={stage === index}
              onClick={() => setStage(index)}
              className={
                "min-h-11 border px-3 text-sm font-semibold " +
                (stage === index
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {index + 1}. {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="border border-accent bg-accent/10 p-3">
            <div className="text-xs font-semibold text-secondary">必须回答</div>
            <div className="mt-2 text-sm font-semibold text-accent">{active.question}</div>
          </div>
          <div className="border border-success bg-success/10 p-3">
            <div className="text-xs font-semibold text-secondary">交付证据</div>
            <div className="mt-2 font-mono text-xs text-success">{active.evidence}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3">
            <div className="text-xs font-semibold text-secondary">常见失效</div>
            <div className="mt-2 text-sm font-semibold text-warning">{active.failure}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 items-center text-center text-xs font-semibold text-secondary">
          <span>理论</span><span>→</span><span>实现</span><span>→</span><span>实验</span><span>→</span><span>修订 ↺</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Theory–implementation–experiments 不是线性流水线；实验暴露模型误差后，必须回到理论假设重新设计。
      </figcaption>
    </figure>
  );
}

const workloadProfiles = {
  scan: {
    label: "顺序扫描",
    ram: "每元素一次访问",
    twoLevel: "按块传输，追求带宽",
    heterogeneous: "靠近数据执行并流水化",
    multiplier: 1,
  },
  sort: {
    label: "外部排序",
    ram: "比较次数掩盖搬运",
    twoLevel: "多路归并减少 I/O passes",
    heterogeneous: "CPU/GPU/SSD 分段协作",
    multiplier: 2.5,
  },
  index: {
    label: "随机检索",
    ram: "一次地址访问",
    twoLevel: "每层可能一次随机 I/O",
    heterogeneous: "批处理、缓存与压缩索引",
    multiplier: 4,
  },
} as const;

type WorkloadKey = keyof typeof workloadProfiles;

export function PaeMemoryModelShiftLab() {
  const [workload, setWorkload] = useState<WorkloadKey>("sort");
  const [dataPower, setDataPower] = useState(34);
  const [blockPower, setBlockPower] = useState(20);
  const profile = workloadProfiles[workload];
  const dataBytes = 2 ** dataPower;
  const blockBytes = 2 ** blockPower;
  const transfers = Math.ceil((dataBytes / blockBytes) * profile.multiplier);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="工作负载">
          {(Object.keys(workloadProfiles) as WorkloadKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setWorkload(key)}
              className={
                "min-h-10 border px-3 text-sm font-semibold " +
                (workload === key
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {workloadProfiles[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">
            数据规模：2^{dataPower} bytes
            <input className="mt-2 w-full accent-current" type="range" min="28" max="40" value={dataPower} onChange={(event) => setDataPower(Number(event.target.value))} />
          </label>
          <label className="text-sm font-semibold text-primary">
            传输块：2^{blockPower} bytes
            <input className="mt-2 w-full accent-current" type="range" min="12" max="24" value={blockPower} onChange={(event) => setBlockPower(Number(event.target.value))} />
          </label>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3">
            <div className="text-xs font-semibold text-muted">RAM model</div>
            <p className="mb-0 mt-2 text-sm text-secondary">{profile.ram}</p>
          </div>
          <div className="border border-success bg-success/10 p-3">
            <div className="text-xs font-semibold text-success">two-level memory</div>
            <p className="mb-0 mt-2 text-sm text-secondary">{profile.twoLevel}</p>
          </div>
          <div className="border border-warning bg-warning/10 p-3">
            <div className="text-xs font-semibold text-warning">heterogeneous future</div>
            <p className="mb-0 mt-2 text-sm text-secondary">{profile.heterogeneous}</p>
          </div>
        </div>
        <div className="mt-3 border border-accent bg-accent/10 p-3 text-sm text-secondary">
          粗略数据传输量级：<strong className="font-mono text-accent">{transfers.toLocaleString()} blocks</strong>。同一算法在不同模型下，优化目标并不相同。
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两级内存模型比单位代价 RAM 更接近数据移动，但新型存储、加速器与分布式基础设施会继续改变正确的成本模型。
      </figcaption>
    </figure>
  );
}

const toolboxCases = {
  stream: {
    label: "未知长度数据流",
    constraints: "单遍、内存固定、长度未知",
    tools: ["reservoir sampling", "online invariant", "probability proof"],
    chapters: "Ch. 3",
  },
  search: {
    label: "十亿字符串检索",
    constraints: "前缀/子串查询、缓存敏感",
    tools: ["front coding", "Patricia trie", "suffix array / FM-index"],
    chapters: "Ch. 7, 9, 10, 14",
  },
  logs: {
    label: "压缩日志分析",
    constraints: "分布偏斜、重复多、需随机访问",
    tools: ["integer coding", "BWT/LZ", "Rank/Select"],
    chapters: "Ch. 11–15",
  },
  graph: {
    label: "超大稀疏图",
    constraints: "邻居枚举、边成簇、空间受限",
    tools: ["WebGraph", "k²-tree", "Elias–Fano offsets"],
    chapters: "Ch. 15",
  },
} as const;

type ToolboxCase = keyof typeof toolboxCases;

export function PaeToolboxDecisionLab() {
  const [problem, setProblem] = useState<ToolboxCase>("search");
  const current = toolboxCases[problem];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          场景
          <select className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm text-primary" value={problem} onChange={(event) => setProblem(event.target.value as ToolboxCase)}>
            {(Object.keys(toolboxCases) as ToolboxCase[]).map((key) => <option key={key} value={key}>{toolboxCases[key].label}</option>)}
          </select>
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_2fr_1fr]">
          <div className="border border-warning bg-warning/10 p-3">
            <div className="text-xs font-semibold text-warning">约束</div>
            <p className="mb-0 mt-2 text-sm text-secondary">{current.constraints}</p>
          </div>
          <div className="border border-success bg-success/10 p-3">
            <div className="text-xs font-semibold text-success">候选工具组合</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {current.tools.map((tool) => <span key={tool} className="border border-success bg-background px-2 py-1 font-mono text-xs text-success">{tool}</span>)}
            </div>
          </div>
          <div className="border border-accent bg-accent/10 p-3">
            <div className="text-xs font-semibold text-accent">回查章节</div>
            <div className="mt-2 text-sm font-semibold text-primary">{current.chapters}</div>
          </div>
        </div>
        <p className="mb-0 mt-3 text-sm leading-6 text-secondary">
          工具箱给出候选构件，不替代建模。先确认输入分布、更新方式、延迟目标与内存层级，再组合技术并建立基线。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Algorithm engineering toolbox 的价值在于迁移设计模式，而不是机械地为问题贴上某个算法名称。
      </figcaption>
    </figure>
  );
}

const scaleLayers = [
  { name: "数据源", detail: "stream / files / object store", signal: "arrival rate", color: "border-primary bg-primary/10 text-primary" },
  { name: "持久存储", detail: "SSD / distributed storage", signal: "bytes moved", color: "border-accent bg-accent/10 text-accent" },
  { name: "主存与缓存", detail: "DRAM / LLC / HBM", signal: "misses + bandwidth", color: "border-success bg-success/10 text-success" },
  { name: "计算", detail: "CPU / GPU / accelerators", signal: "cycles + occupancy", color: "border-warning bg-warning/10 text-warning" },
] as const;

export function PaeMassiveDatasetScaleMap() {
  const [focus, setFocus] = useState(1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-7 sm:items-center">
          {scaleLayers.map((layer, index) => (
            <div key={layer.name} className="contents">
              <button
                type="button"
                onClick={() => setFocus(index)}
                className={
                  "min-h-24 border p-3 text-left " +
                  (focus === index ? layer.color : "border-border bg-background text-secondary")
                }
              >
                <span className="block text-sm font-semibold">{layer.name}</span>
                <span className="mt-2 block font-mono text-[11px]">{layer.detail}</span>
              </button>
              {index < scaleLayers.length - 1 ? <div className="text-center text-sm text-muted">→</div> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            当前观测量
            <div className="mt-1 font-mono font-semibold text-primary">{scaleLayers[focus].signal}</div>
          </div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            算法动作
            <div className="mt-1 font-semibold text-success">{focus < 2 ? "减少传输、批处理、压缩" : "改善局部性、并行度与表示"}</div>
          </div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">
            反向压力
            <div className="mt-1 font-semibold text-warning">下游吞吐低于上游到达速率时，端到端延迟会累积</div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Massive datasets 把算法问题扩展为数据路径问题；只优化算术次数，常常绕不开存储、网络和内存带宽。
      </figcaption>
    </figure>
  );
}

const benchmarkRows = [
  { name: "uniform-small", size: "10⁶", skew: "low", cache: "warm" },
  { name: "zipf-large", size: "10⁹", skew: "high", cache: "cold" },
  { name: "sorted-adversarial", size: "10⁸", skew: "ordered", cache: "mixed" },
  { name: "production-trace", size: "trace", skew: "observed", cache: "real" },
] as const;

export function PaeExperimentMatrixLab() {
  const [baseline, setBaseline] = useState(true);
  const [coldCache, setColdCache] = useState(true);
  const [counters, setCounters] = useState(false);
  const evidence = [baseline, coldCache, counters].filter(Boolean).length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-xs">
            <thead><tr className="border-b border-border text-secondary"><th className="p-2">dataset</th><th className="p-2">n</th><th className="p-2">distribution</th><th className="p-2">cache state</th><th className="p-2">report</th></tr></thead>
            <tbody>
              {benchmarkRows.map((row) => (
                <tr key={row.name} className="border-b border-border bg-background">
                  <td className="p-2 font-mono text-primary">{row.name}</td><td className="p-2 text-secondary">{row.size}</td><td className="p-2 text-secondary">{row.skew}</td><td className="p-2 text-secondary">{row.cache}</td><td className="p-2 text-secondary">time, bytes, I/O, p95</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <label className="flex min-h-11 items-center gap-2 border border-border bg-background px-3 text-sm text-primary"><input type="checkbox" checked={baseline} onChange={(event) => setBaseline(event.target.checked)} />同硬件基线</label>
          <label className="flex min-h-11 items-center gap-2 border border-border bg-background px-3 text-sm text-primary"><input type="checkbox" checked={coldCache} onChange={(event) => setColdCache(event.target.checked)} />冷/热缓存分开</label>
          <label className="flex min-h-11 items-center gap-2 border border-border bg-background px-3 text-sm text-primary"><input type="checkbox" checked={counters} onChange={(event) => setCounters(event.target.checked)} />硬件计数器</label>
        </div>
        <div className={"mt-3 border p-3 text-sm " + (evidence === 3 ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>
          证据完整度：{evidence}/3。{evidence === 3 ? "可以解释结果，而不只是排列运行时间。" : "仍有混杂变量，不能把差异直接归因于算法。"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实验矩阵同时覆盖规模、分布、缓存状态和真实 trace；结果必须能回指理论中的资源项。
      </figcaption>
    </figure>
  );
}

const releaseGates = ["问题契约", "成本模型", "正确性", "多尺度实验", "可复现交付"] as const;

export function PaeReleaseGateDiagram() {
  const [checks, setChecks] = useState([true, true, false, false, false]);
  const done = useMemo(() => checks.filter(Boolean).length, [checks]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-5">
          {releaseGates.map((gate, index) => (
            <label key={gate} className={"flex min-h-20 cursor-pointer flex-col justify-between border p-3 " + (checks[index] ? "border-success bg-success/10" : "border-border bg-background")}>
              <span className="text-xs font-semibold text-primary">{index + 1}. {gate}</span>
              <input
                className="mt-3"
                type="checkbox"
                checked={checks[index]}
                onChange={() => setChecks((current) => current.map((value, item) => item === index ? !value : value))}
              />
            </label>
          ))}
        </div>
        <div className="mt-4 h-3 border border-border bg-background">
          <div className="h-full bg-success transition-[width]" style={{ width: `${(done / releaseGates.length) * 100}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs font-semibold text-secondary">
          <span>{done}/{releaseGates.length} gates</span>
          <span className={done === releaseGates.length ? "text-success" : "text-warning"}>{done === releaseGates.length ? "可进入发布候选" : "仍是实验原型"}</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法工程的终点不是代码能运行，而是问题、模型、实现、实验和复现证据形成可审查链条。
      </figcaption>
    </figure>
  );
}
