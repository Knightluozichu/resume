"use client";

import { useState } from "react";

const OFFICIAL_CONCEPTS = [
  "模式名称与分类",
  "意图",
  "别名",
  "动机",
  "适用性",
  "结构",
  "参与者",
  "协作",
  "后果",
  "实现",
  "示例代码",
  "已知应用",
  "相关模式",
] as const;

const LEAVES = {
  read: { label: "读取报表", group: "运营组" },
  publish: { label: "发布版本", group: "运营组" },
  audit: { label: "查看日志", group: "审计组" },
  export: { label: "导出审计", group: "审计组" },
} as const;

type LeafKey = keyof typeof LEAVES;
type LeafState = Record<LeafKey, boolean>;

const INITIAL_LEAVES: LeafState = {
  read: true,
  publish: false,
  audit: true,
  export: false,
};

type TraceEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

function eventTone(tone: TraceEvent["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function CompositePermissionTreeLab() {
  const [leaves, setLeaves] = useState<LeafState>(INITIAL_LEAVES);
  const [extraLeaf, setExtraLeaf] = useState(false);
  const [cycle, setCycle] = useState(false);
  const [evaluationCount, setEvaluationCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const activeKeys: LeafKey[] = extraLeaf
    ? ["read", "publish", "audit", "export"]
    : ["read", "publish", "audit"];
  const allowedCount = activeKeys.filter((key) => leaves[key]).length;
  const leafCount = activeKeys.length;
  const operatorKeys = activeKeys.filter((key) => LEAVES[key].group === "运营组");
  const auditKeys = activeKeys.filter((key) => LEAVES[key].group === "审计组");
  const operatorAllowed = operatorKeys.filter((key) => leaves[key]).length;
  const auditAllowed = auditKeys.filter((key) => leaves[key]).length;

  function addEvent(label: string, detail: string, tone: TraceEvent["tone"]) {
    setEvents((current) => [
      ...current,
      { id: current.length + 1, label, detail, tone },
    ]);
  }

  function toggleLeaf(key: LeafKey) {
    if (key === "export" && !extraLeaf) return;
    setLeaves((current) => ({ ...current, [key]: !current[key] }));
    addEvent(
      "切换叶子权限",
      LEAVES[key].label +
        " 只改变一个 Leaf；父组合节点仍通过统一 evaluate() 聚合",
      "success",
    );
  }

  function toggleExtraLeaf() {
    const next = !extraLeaf;
    setExtraLeaf(next);
    addEvent(
      next ? "挂载新叶子" : "移除新叶子",
      next
        ? "审计组新增导出审计，客户端无需分支判断叶子还是组合"
        : "审计组回到基线结构，组合节点仍使用同一聚合协议",
      "success",
    );
  }

  function evaluateTree() {
    setEvaluationCount((current) => current + 1);
    addEvent(
      "调用根节点操作",
      cycle
        ? "root.evaluate() 被循环引用保护拒绝，避免递归不终止"
        : "root.evaluate() → 运营组 " +
            operatorAllowed +
            " + 审计组 " +
            auditAllowed +
            " = " +
            allowedCount +
            "/" +
            leafCount,
      cycle ? "warning" : "success",
    );
  }

  function toggleCycle() {
    const next = !cycle;
    setCycle(next);
    addEvent(
      next ? "注入循环挂载" : "解除循环挂载",
      next
        ? "把根组合伪装成自己的后代；实现必须拒绝，否则遍历无法终止"
        : "恢复树的无环不变量，递归聚合重新可预测",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setLeaves(INITIAL_LEAVES);
    setExtraLeaf(false);
    setCycle(false);
    setEvaluationCount(0);
    setEvents([]);
  }

  function leafButton(key: LeafKey) {
    const enabled = leaves[key];
    const visible = key !== "export" || extraLeaf;
    if (!visible) return null;
    const leafClass = enabled
      ? "border-success text-success"
      : "border-border text-secondary hover:border-accent hover:text-primary";
    return (
      <button
        aria-pressed={enabled}
        className={
          "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
          leafClass
        }
        key={key}
        onClick={() => toggleLeaf(key)}
        type="button"
      >
        <span className="block break-words">{LEAVES[key].label}</span>
        <span className="mt-1 block text-[11px] text-secondary">
          {enabled ? "授权 = true" : "授权 = false"}
        </span>
      </button>
    );
  }

  const rootStatusClass = cycle
    ? "border-warning text-warning"
    : "border-success text-success";
  const messageClass = cycle ? "text-warning" : "text-success";

  return (
    <section
      aria-label="组合模式树形聚合实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-14"
      data-visual-kind="composite-permission-tree-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              COMPOSITE · RECURSIVE AGGREGATION
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              权限树统一操作实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              叶子和权限组共享 evaluate() 合同；切换叶子、挂载新节点或注入循环，都能观察聚合结果与结构边界。
            </p>
          </div>
          <button
            aria-label="重置组合模式树形聚合实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">叶子状态</p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {(["read", "publish", "audit", "export"] as LeafKey[]).map(leafButton)}
              </div>
            </div>

            <button
              aria-pressed={extraLeaf}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (extraLeaf
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary")
              }
              onClick={toggleExtraLeaf}
              type="button"
            >
              {extraLeaf ? "移除叶子：导出审计" : "挂载叶子：导出审计"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={evaluateTree}
              type="button"
            >
              调用 root.evaluate()
            </button>
            <button
              aria-pressed={cycle}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (cycle
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleCycle}
              type="button"
            >
              {cycle ? "解除循环挂载" : "注入循环挂载反例"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              先改变一个 Leaf，再增加一个子节点，最后运行根操作；循环反例用于检查实现是否保护无环树合同。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                COMPONENT → COMPOSITE → LEAF
              </p>
              <span className={"rounded-control border px-2 py-1 text-xs " + rootStatusClass}>
                {cycle ? "循环被拒绝" : "树结构有效"}
              </span>
            </div>

            <div className="mt-4 rounded-card border border-accent p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-accent">PermissionGroup · 根组合</p>
                  <p className="mt-1 font-mono text-xs text-primary">root.evaluate()</p>
                </div>
                <p className="font-mono text-lg text-primary">
                  {allowedCount}/{leafCount}
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-control border border-border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-secondary">运营组 · Composite</p>
                    <span className="font-mono text-xs text-primary">
                      {operatorAllowed}/{operatorKeys.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 border-l border-border pl-3">
                    {leafButton("read")}
                    {leafButton("publish")}
                  </div>
                </div>

                <div className="rounded-control border border-border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-secondary">审计组 · Composite</p>
                    <span className="font-mono text-xs text-primary">
                      {auditAllowed}/{auditKeys.length}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 border-l border-border pl-3">
                    {leafButton("audit")}
                    {leafButton("export")}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">可达叶子</p>
                <p className="mt-2 font-mono text-lg text-primary">{leafCount}</p>
              </div>
              <div className="rounded-control border border-success p-3">
                <p className="text-xs font-semibold text-success">已授权叶子</p>
                <p className="mt-2 font-mono text-lg text-primary">{allowedCount}</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">求值次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{evaluationCount}</p>
              </div>
            </div>

            <div className="mt-4 rounded-control border border-border p-4">
              <p className="text-xs font-semibold text-secondary">聚合不变量</p>
              <p className="mt-2 font-mono text-sm text-primary">
                root = 运营组 {operatorAllowed} + 审计组 {auditAllowed} = {allowedCount}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {cycle
                  ? "循环挂载已进入错误态；实现应在 add 或遍历边界拒绝它，而不是继续递归。"
                  : "客户端只调用 root.evaluate()，不需要判断当前节点是叶子还是组合；每次结果都来自可达叶子的确定性聚合。"}
              </p>
            </div>

            <div
              aria-live="polite"
              className={"mt-4 rounded-control border p-4 " + (cycle ? "border-warning" : "border-success")}
              role="status"
            >
              <p className={"text-sm font-semibold " + messageClass}>
                {cycle
                  ? "反例：组合树出现环，统一遍历必须停止"
                  : "合同通过：根节点聚合出 " + allowedCount + "/" + leafCount + " 个授权叶子"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {cycle
                  ? "安全接口策略应拒绝把祖先挂到后代；透明接口策略也必须保留循环检测和父子所有权约束。"
                  : "PermissionGroup 递归调用子节点，PermissionLeaf 直接返回自己的授权状态；两者共享同一个 evaluate() 入口。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">树操作轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    切换叶子、挂载节点、运行根操作或注入循环后，这里会记录聚合证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={"rounded-control border px-3 py-2 text-xs " + eventTone(event.tone)}
                      key={event.id}
                    >
                      <p className="font-semibold">{event.label}</p>
                      <p className="mt-1 leading-5 text-secondary">{event.detail}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
