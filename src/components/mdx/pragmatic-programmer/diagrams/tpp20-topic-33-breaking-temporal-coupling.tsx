"use client";

import { useMemo, useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-33-breaking-temporal-coupling";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const activities = {
  compile: {
    label: "编译",
    duration: 180,
    needs: "commit",
    emits: "binary#7f2",
    starts: 0,
    tone: color.accent,
  },
  unit: {
    label: "单元测试",
    duration: 240,
    needs: "binary#7f2",
    emits: "unit-pass",
    starts: 180,
    tone: color.success,
  },
  security: {
    label: "安全扫描",
    duration: 300,
    needs: "binary#7f2",
    emits: "scan-pass",
    starts: 180,
    tone: color.warning,
  },
  package: {
    label: "制品签名",
    duration: 80,
    needs: "unit-pass + scan-pass",
    emits: "release.tgz",
    starts: 480,
    tone: color.accent,
  },
  deploy: {
    label: "候选部署",
    duration: 60,
    needs: "release.tgz",
    emits: "candidate#91",
    starts: 560,
    tone: color.success,
  },
} as const;
type ActivityId = keyof typeof activities;

export function Tpp20Topic33BreakingTemporalCouplingSystemLab() {
  const [id, setId] = useState<ActivityId>("security");
  const activity = activities[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 33 专属解剖图 · 发布流水线依赖 DAG"
      title="测试和扫描为什么可以同时开始？"
      description="点击活动查看其真实输入、输出、开始时刻与耗时。边表示数据依赖；画在下一行或写在后面的活动不自动获得先后关系。"
      kind="temporal-coupling-release-dag"
      reset={() => setId("security")}
    >
      <div className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-control border border-border bg-bg p-4">
            <button
              type="button"
              onClick={() => setId("compile")}
              aria-pressed={id === "compile"}
              className={`mx-auto block min-h-11 w-40 rounded-control border-2 p-3 text-sm font-semibold ${id === "compile" ? "bg-accent/10" : "bg-surface"}`}
              style={{ borderColor: activities.compile.tone }}
            >
              编译 · 180 ms
            </button>
            <div className="mx-auto h-5 w-px bg-border" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-4">
              {(["unit", "security"] as ActivityId[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setId(key)}
                  aria-pressed={id === key}
                  className={`min-h-11 rounded-control border-2 p-3 text-sm font-semibold ${id === key ? "bg-accent/10" : "bg-surface"}`}
                  style={{ borderColor: activities[key].tone }}
                >
                  {activities[key].label} · {activities[key].duration} ms
                </button>
              ))}
            </div>
            <div className="mx-auto h-5 w-px bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setId("package")}
              aria-pressed={id === "package"}
              className={`mx-auto block min-h-11 w-40 rounded-control border-2 p-3 text-sm font-semibold ${id === "package" ? "bg-accent/10" : "bg-surface"}`}
              style={{ borderColor: activities.package.tone }}
            >
              制品签名 · 80 ms
            </button>
            <div className="mx-auto h-5 w-px bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setId("deploy")}
              aria-pressed={id === "deploy"}
              className={`mx-auto block min-h-11 w-40 rounded-control border-2 p-3 text-sm font-semibold ${id === "deploy" ? "bg-accent/10" : "bg-surface"}`}
              style={{ borderColor: activities.deploy.tone }}
            >
              候选部署 · 60 ms
            </button>
          </div>
          <div
            className="rounded-control border-2 bg-bg p-4"
            style={{ borderColor: activity.tone }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: activity.tone }}
            >
              {activity.label}
            </p>
            <dl className="mt-3 grid gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted">需要</dt>
                <dd>
                  <code>{activity.needs}</code>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">产出</dt>
                <dd>
                  <code>{activity.emits}</code>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">调度</dt>
                <dd>
                  <code>
                    {activity.starts}–{activity.starts + activity.duration} ms
                  </code>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            串行总长：860 ms
          </code>
          <code className="rounded-control border border-success bg-bg p-3 text-xs">
            DAG 关键路径：620 ms
          </code>
          <code className="rounded-control border border-accent bg-bg p-3 text-xs">
            并行候选：unit ∥ security
          </code>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const proposals = {
  falseEdge: {
    label: "删 unit → security",
    edge: "unit-pass → security.scan",
    evidence: "security 只读取 binary#7f2；不读取 unit report",
    before: [
      "compile 0–180",
      "unit 180–420",
      "security 420–720",
      "package 720–800",
      "deploy 800–860",
    ],
    after: [
      "compile 0–180",
      "unit 180–420",
      "security 180–480",
      "package 480–560",
      "deploy 560–620",
    ],
    result: "输出哈希相同；关键路径 860 → 620 ms",
    tone: color.success,
  },
  trueEdge: {
    label: "删 compile → security",
    edge: "binary#7f2 → security.scan",
    evidence: "扫描器必须读取本次构建的二进制与 SBOM",
    before: [
      "compile emits binary#7f2",
      "security reads binary#7f2",
      "scan-pass binds build hash",
      "package verifies hash",
      "deploy candidate",
    ],
    after: [
      "security starts with previous binary#6c1",
      "compile emits binary#7f2",
      "scan-pass binds wrong hash",
      "package hash mismatch",
      "deploy not called",
    ],
    result: "语义改变；在 package 首次暴露制品身份不一致",
    tone: color.danger,
  },
  joinEdge: {
    label: "删 scan → package",
    edge: "scan-pass → package.sign",
    evidence: "签名策略要求 unit-pass 与 scan-pass 都属于同一 build hash",
    before: [
      "unit-pass ready",
      "scan-pass ready",
      "join(build#7f2)",
      "sign release",
      "deploy candidate",
    ],
    after: [
      "unit-pass ready",
      "scan still running",
      "package signs early",
      "scan later fails CVE",
      "candidate already exists",
    ],
    result: "语义改变；同步点被误删，不是解耦",
    tone: color.warning,
  },
} as const;
type ProposalId = keyof typeof proposals;

export function Tpp20Topic33BreakingTemporalCouplingFeedbackLab() {
  const [id, setId] = useState<ProposalId>("falseEdge");
  const proposal = proposals[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 33 专属实验 · 每删一条边都要证明顺序无关"
      title="去掉等待之后，发布语义仍然相同吗？"
      description="选择一条候选依赖边。对照前后事件，只有输入集合不变、输出身份相同且拒绝条件未绕过，才算打破不必要的时域耦合。"
      kind="temporal-coupling-edge-removal"
      reset={() => setId("falseEdge")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(proposals) as ProposalId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {proposals[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs font-semibold text-muted">删除前</p>
            <ol className="mt-2 space-y-2">
              {proposal.before.map((event, index) => (
                <li key={event} className="text-xs">
                  <strong>{index + 1}.</strong> {event}
                </li>
              ))}
            </ol>
          </div>
          <div
            className="rounded-control border-2 bg-bg p-3"
            style={{ borderColor: proposal.tone }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: proposal.tone }}
            >
              删除后
            </p>
            <ol className="mt-2 space-y-2">
              {proposal.after.map((event, index) => (
                <li key={event} className="text-xs">
                  <strong>{index + 1}.</strong> {event}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <code className="mt-3 block rounded-control border border-border bg-bg p-3 text-xs">
          候选边：{proposal.edge}
        </code>
        <p className="mt-2 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>依赖证据：</strong> {proposal.evidence}
        </p>
        <p
          className="mt-2 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: proposal.tone }}
        >
          {proposal.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

export function Tpp20Topic33BreakingTemporalCouplingEvidenceLab() {
  const [unitMs, setUnitMs] = useState(240);
  const [scanMs, setScanMs] = useState(300);
  const result = useMemo(() => {
    const serial = 180 + unitMs + scanMs + 80 + 60;
    const parallel = 180 + Math.max(unitMs, scanMs) + 80 + 60;
    const critical =
      unitMs >= scanMs
        ? "编译 → 单元测试 → 签名 → 部署"
        : "编译 → 安全扫描 → 签名 → 部署";
    return { serial, parallel, saved: serial - parallel, critical };
  }, [unitMs, scanMs]);
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 33 专属复核 · 关键路径随耗时变化"
      title="并行之后，下一步该优化测试还是扫描？"
      description="调整测试与扫描耗时，手算串行长度、DAG 长度和关键路径。并行度本身不是目标；只有缩短关键路径才缩短交付时间。"
      kind="temporal-coupling-critical-path-calculator"
      reset={() => {
        setUnitMs(240);
        setScanMs(300);
      }}
    >
      <div className="p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rounded-control border border-border bg-bg p-3 text-sm">
            <span className="flex justify-between">
              <strong>单元测试</strong>
              <code>{unitMs} ms</code>
            </span>
            <input
              className="mt-3 min-h-11 w-full accent-[var(--accent)]"
              type="range"
              min="100"
              max="500"
              step="20"
              value={unitMs}
              onChange={(event) => setUnitMs(Number(event.target.value))}
            />
          </label>
          <label className="rounded-control border border-border bg-bg p-3 text-sm">
            <span className="flex justify-between">
              <strong>安全扫描</strong>
              <code>{scanMs} ms</code>
            </span>
            <input
              className="mt-3 min-h-11 w-full accent-[var(--accent)]"
              type="range"
              min="100"
              max="500"
              step="20"
              value={scanMs}
              onChange={(event) => setScanMs(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs text-muted">串行</p>
            <code className="mt-1 block text-lg">{result.serial} ms</code>
          </div>
          <div className="rounded-control border border-success bg-bg p-3">
            <p className="text-xs text-muted">依赖图</p>
            <code className="mt-1 block text-lg">{result.parallel} ms</code>
          </div>
          <div className="rounded-control border border-accent bg-bg p-3">
            <p className="text-xs text-muted">节省</p>
            <code className="mt-1 block text-lg">{result.saved} ms</code>
          </div>
        </div>
        <div className="mt-3 rounded-control border border-border bg-bg p-4">
          <p className="text-xs font-semibold text-muted">当前关键路径</p>
          <p className="mt-2 text-sm">{result.critical}</p>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${Math.min(100, (result.parallel / 1000) * 100)}%`,
              }}
            />
          </div>
        </div>
        <p className="mt-3 rounded-control border-l-4 border-accent bg-bg p-3 text-sm">
          复核：保存活动耗时、依赖边、调度结果与输出哈希；若只看墙钟时间，无法区分真实并行与跳过必要工作。
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
