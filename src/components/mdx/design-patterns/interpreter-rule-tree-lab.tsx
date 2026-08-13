"use client";

import { useMemo, useState } from "react";

type RuleKind = "and" | "or" | "service";
type Severity = "high" | "low";
type Region = "cn" | "us";

type RuleSpec = {
  label: string;
  expression: string;
  detail: string;
};

const RULES: Record<RuleKind, RuleSpec> = {
  and: {
    label: "高危支付告警",
    expression: "severity == high AND service == payments",
    detail: "两个子表达式都为真，组合表达式才为真。",
  },
  or: {
    label: "国内或高危告警",
    expression: "region == cn OR severity == high",
    detail: "任一子表达式为真，组合表达式就为真。",
  },
  service: {
    label: "搜索服务告警",
    expression: "service == search",
    detail: "终结表达式直接读取上下文中的字段。",
  },
};

type Trace = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

function traceClass(tone: Trace["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function InterpreterRuleTreeLab() {
  const [rule, setRule] = useState<RuleKind>("and");
  const [severity, setSeverity] = useState<Severity>("high");
  const [region, setRegion] = useState<Region>("cn");
  const [service, setService] = useState("payments");
  const [invalidSyntax, setInvalidSyntax] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [message, setMessage] = useState(
    "先选择规则和上下文，再预测表达式树的求值结果。",
  );

  const result = useMemo(() => {
    if (invalidSyntax) return "语法错误：执行前拒绝";
    if (rule === "and") return severity === "high" && service === "payments";
    if (rule === "or") return region === "cn" || severity === "high";
    return service === "search";
  }, [invalidSyntax, region, rule, service, severity]);

  const nodes = useMemo(() => {
    if (rule === "and") return ["AND", "severity == high", "service == payments"];
    if (rule === "or") return ["OR", "region == cn", "severity == high"];
    return ["service == search"];
  }, [rule]);

  function addTrace(label: string, detail: string, tone: Trace["tone"]) {
    setTraces((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseRule(next: RuleKind) {
    setRule(next);
    setMessage(
      `${RULES[next].label} 已装配成表达式树：${RULES[next].expression}。`,
    );
    addTrace("选择规则", RULES[next].detail, "neutral");
  }

  function toggleSyntax() {
    const next = !invalidSyntax;
    setInvalidSyntax(next);
    setMessage(
      next
        ? "反例已注入：规则缺少操作数，解释前必须先拒绝非法语法。"
        : "语法已恢复：表达式树可以继续解释。",
    );
    addTrace(
      next ? "注入非法语法" : "恢复合法语法",
      next
        ? "解析阶段没有生成可执行的表达式树，Context 不应被读取。"
        : "语法检查通过，终结表达式和组合表达式可以按树递归求值。",
      next ? "warning" : "success",
    );
  }

  function evaluate() {
    setRunCount((count) => count + 1);
    if (invalidSyntax) {
      setMessage("解释前拒绝：非法语法没有进入 Context，也没有产生真假结果。");
      addTrace(
        "拒绝非法规则",
        "先解析、后解释；把解析错误当作 false 会掩盖配置问题。",
        "warning",
      );
      return;
    }
    setMessage(
      `解释完成：${RULES[rule].expression} 在当前 Context 中为 ${result ? "true" : "false"}。`,
    );
    addTrace(
      "递归解释表达式树",
      `Context = severity:${severity} · region:${region} · service:${service}；结果为 ${result ? "true" : "false"}。`,
      result ? "success" : "neutral",
    );
  }

  function reset() {
    setRule("and");
    setSeverity("high");
    setRegion("cn");
    setService("payments");
    setInvalidSyntax(false);
    setRunCount(0);
    setTraces([]);
    setMessage("先选择规则和上下文，再预测表达式树的求值结果。");
  }

  return (
    <section
      aria-label="解释器模式规则树实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-24"
      data-visual-kind="interpreter-rule-tree-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              INTERPRETER · TREE → CONTEXT → RESULT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              小型规则语言解释实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择规则树和上下文，观察终结表达式如何递归求值；再注入非法语法，验证为什么解析错误不能被当成普通 false。
            </p>
          </div>
          <button
            aria-label="重置解释器模式规则树实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">选择表达式</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(RULES) as RuleKind[]).map((kind) => (
                  <button
                    aria-pressed={rule === kind}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (rule === kind
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={kind}
                    onClick={() => chooseRule(kind)}
                    type="button"
                  >
                    <span className="font-semibold">{RULES[kind].label}</span>
                    <span className="ml-2 text-secondary">{RULES[kind].expression}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-card border border-border p-3">
              <p className="text-xs font-semibold text-secondary">Context 输入</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <button
                  aria-pressed={severity === "high"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (severity === "high"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setSeverity("high")}
                  type="button"
                >
                  severity: high
                </button>
                <button
                  aria-pressed={severity === "low"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (severity === "low"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setSeverity("low")}
                  type="button"
                >
                  severity: low
                </button>
                <button
                  aria-pressed={region === "cn"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (region === "cn"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setRegion("cn")}
                  type="button"
                >
                  region: cn
                </button>
                <button
                  aria-pressed={region === "us"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (region === "us"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setRegion("us")}
                  type="button"
                >
                  region: us
                </button>
                <button
                  aria-pressed={service === "payments"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (service === "payments"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setService("payments")}
                  type="button"
                >
                  service: payments
                </button>
                <button
                  aria-pressed={service === "search"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (service === "search"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => setService("search")}
                  type="button"
                >
                  service: search
                </button>
              </div>
            </div>

            <button
              aria-pressed={invalidSyntax}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (invalidSyntax
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleSyntax}
              type="button"
            >
              {invalidSyntax ? "关闭反例：恢复合法语法" : "注入反例：缺少右侧操作数"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={evaluate}
              type="button"
            >
              解释当前规则
            </button>
            <p className="text-xs leading-5 text-secondary">
              先预测表达式树的真假，再解释一次；非法语法必须在读取 Context 前被拒绝。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                EXPRESSION TREE · CONTEXT · RESULT
              </p>
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " +
                  (invalidSyntax
                    ? "border-warning text-warning"
                    : "border-success text-success")
                }
              >
                {invalidSyntax ? "语法未通过" : "可解释"}
              </span>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">规则树</p>
                <span className="font-mono text-xs text-primary">{nodes.length} 个节点</span>
              </div>
              <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                {nodes.map((node, index) => (
                  <div
                    className={
                      "min-w-[8rem] flex-1 rounded-control border p-3 " +
                      (index === 0 ? "border-accent" : "border-border")
                    }
                    key={`${node}-${index}`}
                  >
                    <p className="text-xs font-semibold text-primary">{node}</p>
                    <p className="mt-2 text-xs leading-5 text-secondary">
                      {index === 0 && nodes.length > 1 ? "组合表达式" : "终结表达式"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">当前 Context</p>
                <span className="font-mono text-xs text-primary">只读输入</span>
              </div>
              <p className="mt-2 break-words text-sm leading-6 text-primary">
                severity: {severity} · region: {region} · service: {service}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                规则：{RULES[rule].expression}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">求值结果</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {invalidSyntax ? "reject" : result ? "true" : "false"}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">表达式类型</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {rule === "service" ? "终结" : "非终结"}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">解释次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={
                "mt-4 rounded-control border p-4 " +
                (invalidSyntax ? "border-warning text-warning" : "border-success text-success")
              }
              role="status"
            >
              <p className="text-sm font-semibold">{message}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                组合表达式负责递归调用子表达式，终结表达式读取 Context；解析错误与合法的 false 必须分开。
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">解释轨迹</p>
                <span className="text-xs text-secondary">{traces.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {traces.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择规则、注入反例或解释一次后，这里会记录语法与求值证据。
                  </p>
                ) : (
                  traces.map((trace) => (
                    <div
                      className={"rounded-control border px-3 py-2 text-xs " + traceClass(trace.tone)}
                      key={trace.id}
                    >
                      <p className="font-semibold">{trace.label}</p>
                      <p className="mt-1 text-secondary">{trace.detail}</p>
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
