"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-36-blackboards";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const rounds = {
  seed: {
    label: "0 · 原始事实",
    facts: [
      "Latency(api)=820ms@14:02",
      "CPU(api-3)=96%@14:02",
      "DB.p95=18ms@14:02",
      "Deploy(api)=v43@13:58",
    ],
    agents: [
      ["指标代理", "等待 CPU + request profile"],
      ["部署代理", "等待 deploy + regression window"],
      ["拓扑代理", "等待 service edges"],
    ],
    derived: "尚无诊断；事实只陈述观测，不直接命名原因",
    tone: color.accent,
  },
  correlate: {
    label: "1 · 代理触发",
    facts: [
      "CPU(api-3)=96%",
      "FlameTop=jsonEncode 61%",
      "Deploy(api)=v43",
      "Diff(v42,v43)=new payload serializer",
    ],
    agents: [
      ["指标代理", "推导 HotFunction(jsonEncode)"],
      ["部署代理", "推导 ChangeCandidate(v43)"],
      ["数据库代理", "推导 DBNotBottleneck"],
    ],
    derived: "三个代理独立追加带来源的新事实",
    tone: color.warning,
  },
  converge: {
    label: "2 · 收敛裁决",
    facts: [
      "HotFunction(jsonEncode)",
      "ChangeCandidate(v43)",
      "DBNotBottleneck",
      "CanaryRollback(v42): latency=95ms",
    ],
    agents: [
      ["因果代理", "匹配 change + hot function + rollback"],
      ["反例代理", "检查 DB/traffic/config"],
      ["处置代理", "生成 rollback proposal"],
    ],
    derived: "RootCause(serializer-v43, confidence=.94)；Action=rollback",
    tone: color.success,
  },
} as const;
type RoundId = keyof typeof rounds;

export function Tpp20Topic36BlackboardsSystemLab() {
  const [id, setId] = useState<RoundId>("seed");
  const round = rounds[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 36 专属解剖图 · 线上故障诊断黑板"
      title="没有中央脚本，多个知识源怎样从指标走到根因？"
      description="按轮次观察原始事实、代理触发与收敛裁决。每个新事实携带产生它的规则和父事实，代理之间不直接调用。"
      kind="blackboard-incident-inference-rounds"
      reset={() => setId("seed")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(rounds) as RoundId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {rounds[key].label}
            </button>
          ))}
        </div>
        <div
          className="mt-4 rounded-control border-2 bg-bg p-4"
          style={{ borderColor: round.tone }}
        >
          <p className="text-xs font-semibold" style={{ color: round.tone }}>
            BLACKBOARD · incident INC-204 / round{" "}
            {id === "seed" ? 0 : id === "correlate" ? 1 : 2}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {round.facts.map((fact) => (
              <code
                key={fact}
                className="rounded-control bg-surface p-3 text-xs"
              >
                {fact}
              </code>
            ))}
          </div>
        </div>
        <div
          className="mx-auto h-5 w-px"
          style={{ background: round.tone }}
          aria-hidden="true"
        />
        <div className="grid gap-2 sm:grid-cols-3">
          {round.agents.map(([agent, action]) => (
            <div
              key={agent}
              className="rounded-control border border-border bg-bg p-3"
            >
              <p
                className="text-xs font-semibold"
                style={{ color: round.tone }}
              >
                {agent}
              </p>
              <p className="mt-2 text-sm">{action}</p>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: round.tone }}
        >
          {round.derived}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const conflicts = {
  current: {
    label: "同一时间窗",
    entries: [
      ["CPU(api-3)=96%", "metrics/v88", "active"],
      ["CPU(api-3)=22%", "metrics/v87", "superseded"],
      ["Deploy(api)=v43", "deploy-log/991", "active"],
    ],
    rule: "同一主机与窗口采用最高单调版本；旧读数保留但不参与推导",
    conclusion: "HotCPU(api-3, window=14:02, source=v88)",
    audit: "v87 superseded-by v88",
    tone: color.success,
  },
  incomparable: {
    label: "来源不可比较",
    entries: [
      ["Region=cn-east", "config/v17", "active"],
      ["Region=cn-north", "inventory/manual", "conflict"],
      ["Host=api-3", "topology/v52", "active"],
    ],
    rule: "不同实体模型、无共同版本向量，不能用到达顺序覆盖",
    conclusion: "Conflict(region, sources=[config,inventory])",
    audit: "暂停依赖 region 的规则；请求权威源仲裁",
    tone: color.warning,
  },
  retracted: {
    label: "上游事实撤回",
    entries: [
      ["Deploy(api)=v43", "deploy-log/991", "retracted"],
      ["ChangeCandidate(v43)", "rule/deploy-7", "retracted"],
      ["RootCause(v43)", "rule/root-2", "retracted"],
    ],
    rule: "派生事实保存父边；撤回上游后递归使后代失效",
    conclusion: "Diagnosis reopened；保留曾经的推导路径",
    audit: "retract cause=deploy-log correction at 14:08",
    tone: color.danger,
  },
} as const;
type ConflictId = keyof typeof conflicts;

export function Tpp20Topic36BlackboardsFeedbackLab() {
  const [id, setId] = useState<ConflictId>("current");
  const conflict = conflicts[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 36 专属实验 · 冲突事实、版本与撤回"
      title="黑板上同时有两条相反事实，谁覆盖谁？"
      description="比较可排序版本、不可比较来源与上游撤回。黑板不把最后写入当真相，而是按实体、时间窗、来源和父边裁决。"
      kind="blackboard-conflict-retraction-provenance"
      reset={() => setId("current")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(conflicts) as ConflictId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {conflicts[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-control border border-border bg-bg">
          <div className="min-w-[34rem] p-4">
            <div className="grid grid-cols-[1.4fr_1fr_0.7fr] gap-2 text-xs font-semibold text-muted">
              <span>事实</span>
              <span>来源</span>
              <span>状态</span>
            </div>
            {conflict.entries.map(([fact, source, status]) => (
              <div
                key={`${fact}-${source}`}
                className="mt-2 grid grid-cols-[1.4fr_1fr_0.7fr] gap-2 rounded-control bg-surface p-3 text-xs"
              >
                <code>{fact}</code>
                <code>{source}</code>
                <strong
                  style={{
                    color: status === "active" ? color.success : conflict.tone,
                  }}
                >
                  {status}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>裁决规则：</strong> {conflict.rule}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: conflict.tone }}
          >
            {conflict.conclusion}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            audit: {conflict.audit}
          </code>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const terminations = {
  fixed: {
    label: "到达不动点",
    rounds: [
      [0, 4, 0],
      [1, 7, 3],
      [2, 9, 2],
      [3, 9, 0],
    ],
    condition: "本轮没有新增、更新或撤回事实",
    result: "FIXED_POINT at round 3；RootCause 与 Action 有效",
    evidence: "fact-set hash r2 == r3: 7a4…",
    tone: color.success,
  },
  cycle: {
    label: "规则振荡",
    rounds: [
      [0, 4, 0],
      [1, 6, 2],
      [2, 5, -1],
      [3, 6, 1],
      [4, 5, -1],
    ],
    condition: "fact-set hash 在 r1/r3、r2/r4 重复，形成周期 2",
    result: "STOP CYCLE；隔离规则 config-3 与 topology-8",
    evidence: "hash sequence: a1,b7,a1,b7",
    tone: color.danger,
  },
  budget: {
    label: "推导预算耗尽",
    rounds: [
      [0, 40, 0],
      [1, 88, 48],
      [2, 171, 83],
      [3, 320, 149],
    ],
    condition: "达到 maxFacts=300，仍有 149 个候选未求值",
    result: "STOP BUDGET；不得宣布收敛或根因确认",
    evidence: "top producer rule=regex-expander (214 facts)",
    tone: color.warning,
  },
} as const;
type TerminationId = keyof typeof terminations;

export function Tpp20Topic36BlackboardsEvidenceLab() {
  const [id, setId] = useState<TerminationId>("fixed");
  const termination = terminations[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 36 专属复核 · 收敛不是‘暂时没动静’"
      title="代理什么时候应该停止，什么时候只是卡住或振荡？"
      description="比较不动点、规则周期和事实预算耗尽。每轮记录事实总数与净变化，并用集合哈希证明终止原因。"
      kind="blackboard-convergence-termination-proof"
      reset={() => setId("fixed")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(terminations) as TerminationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {terminations[key].label}
            </button>
          ))}
        </div>
        <div
          className="mt-4 flex items-end gap-2 overflow-x-auto rounded-control border border-border bg-bg p-4"
          style={{ minHeight: 190 }}
        >
          {termination.rounds.map(([round, total, delta]) => (
            <div
              key={round}
              className="flex min-w-20 flex-1 flex-col items-center"
            >
              <code className="mb-2 text-xs">
                Δ {delta > 0 ? "+" : ""}
                {delta}
              </code>
              <div
                className="w-full rounded-t-control"
                style={{
                  height: `${Math.max(24, Math.min(120, total / 2))}px`,
                  background: termination.tone,
                }}
              />
              <code className="mt-2 text-xs">
                r{round}: {total}
              </code>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>停止条件：</strong> {termination.condition}
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border bg-bg p-3 text-xs"
            style={{ borderColor: termination.tone }}
          >
            {termination.result}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            evidence: {termination.evidence}
          </code>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
