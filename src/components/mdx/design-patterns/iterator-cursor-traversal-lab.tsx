"use client";

import { useMemo, useState } from "react";

type Strategy = "depth" | "priority";

type Task = {
  id: string;
  label: string;
  priority: number;
};

const BASE_TASKS: Task[] = [
  { id: "A", label: "读取配置", priority: 2 },
  { id: "B", label: "构建索引", priority: 1 },
  { id: "C", label: "运行测试", priority: 3 },
  { id: "D", label: "发布报告", priority: 4 },
];

const DEPTH_ORDER = ["A", "B", "C", "D"];

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

export function IteratorCursorTraversalLab() {
  const [strategy, setStrategy] = useState<Strategy>("depth");
  const [cursor, setCursor] = useState(0);
  const [mutated, setMutated] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [message, setMessage] = useState(
    "先选择遍历策略，再预测游标的下一项和结束位置。",
  );

  const tasks = useMemo(
    () =>
      mutated
        ? [...BASE_TASKS, { id: "X", label: "临时热修复", priority: 0 }]
        : BASE_TASKS,
    [mutated],
  );

  const order = useMemo(() => {
    if (strategy === "depth") {
      return mutated ? ["A", "X", "B", "C", "D"] : DEPTH_ORDER;
    }
    return [...tasks]
      .sort((left, right) => left.priority - right.priority)
      .map((task) => task.id);
  }, [mutated, strategy, tasks]);

  const currentTask = tasks.find((task) => task.id === order[cursor]);
  const nextTask = tasks.find((task) => task.id === order[cursor + 1]);
  const exhausted = cursor >= order.length;

  function addTrace(label: string, detail: string, tone: Trace["tone"]) {
    setTraces((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseStrategy(next: Strategy) {
    setStrategy(next);
    setCursor(0);
    setMessage(
      next === "depth"
        ? "深度优先游标已重置，从集合的稳定顺序开始。"
        : "优先级游标已重置，按 priority 从小到大访问任务。",
    );
    addTrace(
      next === "depth" ? "选择深度优先" : "选择优先级遍历",
      "新的 Iterator 保存自己的 cursor，调用者不需要知道集合内部的排序细节。",
      "neutral",
    );
  }

  function peekNext() {
    if (exhausted) {
      setMessage("hasNext() = false：游标已经耗尽，不能再读取元素。 ");
      addTrace("检查结束", "没有下一项；重复查询结束状态不会推进游标。", "warning");
      return;
    }
    setMessage(
      nextTask
        ? `hasNext() = true：下一项是 ${nextTask.id} · ${nextTask.label}。`
        : "hasNext() = true：当前项是游标最后一项，读取后将耗尽。",
    );
    addTrace(
      "检查下一项",
      nextTask
        ? `游标位置 ${cursor} 仍可继续；下一项为 ${nextTask.label}。`
        : "游标指向最后一项，next() 后会进入 exhausted 状态。",
      "success",
    );
  }

  function advance() {
    if (exhausted) {
      setMessage("next() 被拒绝：迭代器已耗尽，请创建新游标或重置实验。 ");
      addTrace("拒绝越界读取", "next() 不应返回重复元素或越过集合边界。", "warning");
      return;
    }
    const item = currentTask;
    setCursor((position) => position + 1);
    setRunCount((count) => count + 1);
    setMessage(`next() 返回 ${item?.id} · ${item?.label}，游标向前推进。`);
    addTrace(
      "读取当前元素",
      `独立游标消费 ${item?.label ?? "未知任务"}；集合本身不需要暴露内部索引。`,
      "success",
    );
  }

  function toggleMutation() {
    const next = !mutated;
    setMutated(next);
    setCursor(0);
    setMessage(
      next
        ? "反例已注入：集合内容发生变化，旧游标的遍历一致性需要重新声明。"
        : "集合已恢复：游标回到原始任务集合的起点。",
    );
    addTrace(
      next ? "修改聚合内容" : "恢复聚合内容",
      next
        ? "快照、fail-fast 或弱一致策略必须由 Iterator 合同明确，不能假定所有修改都安全。"
        : "集合恢复到基线，新的遍历可以再次逐项验收。",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setStrategy("depth");
    setCursor(0);
    setMutated(false);
    setRunCount(0);
    setTraces([]);
    setMessage("先选择遍历策略，再预测游标的下一项和结束位置。");
  }

  return (
    <section
      aria-label="迭代器模式独立游标实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-19"
      data-visual-kind="iterator-cursor-traversal-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              ITERATOR · CURSOR · HAS NEXT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              任务集合独立游标实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              在不暴露集合内部表示的情况下切换遍历策略，逐项读取任务；再修改集合，观察一致性合同为何必须明确。
            </p>
          </div>
          <button
            aria-label="重置迭代器模式独立游标实验"
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
              <p className="text-xs font-semibold text-secondary">选择遍历策略</p>
              <div className="mt-2 grid gap-2">
                <button
                  aria-pressed={strategy === "priority"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (strategy === "priority"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => chooseStrategy("priority")}
                  type="button"
                >
                  优先级遍历 · priority 从小到大
                </button>
                <button
                  aria-pressed={strategy === "depth"}
                  className={
                    "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                    (strategy === "depth"
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary")
                  }
                  onClick={() => chooseStrategy("depth")}
                  type="button"
                >
                  深度优先遍历 · 集合顺序
                </button>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                className="min-h-11 rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
                onClick={advance}
                type="button"
              >
                next() · 读取当前项
              </button>
              <button
                className="min-h-11 rounded-control border border-border px-3 py-2 text-left text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
                onClick={peekNext}
                type="button"
              >
                hasNext() · 检查下一项
              </button>
            </div>

            <button
              aria-pressed={mutated}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (mutated
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleMutation}
              type="button"
            >
              {mutated ? "关闭反例：恢复任务集合" : "注入反例：遍历中加入任务"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              先预测下一项和耗尽位置，再调用 next；最后注入集合修改，判断应采用快照、fail-fast 还是弱一致策略。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                AGGREGATE → ITERATOR → ELEMENT
              </p>
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " +
                  (mutated
                    ? "border-warning text-warning"
                    : "border-success text-success")
                }
              >
                {mutated ? "集合已变化" : "基线一致"}
              </span>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">聚合内容</p>
                <span className="font-mono text-xs text-primary">{tasks.length} 项</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {tasks.map((task) => (
                  <div
                    className={
                      "rounded-control border p-3 " +
                      (order[cursor] === task.id ? "border-accent" : "border-border")
                    }
                    key={task.id}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-primary">
                        {task.id} · {task.label}
                      </p>
                      <span className="font-mono text-[11px] text-secondary">
                        p{task.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-secondary">
                      {order[cursor] === task.id ? "游标当前项" : "等待访问"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Iterator 状态</p>
                <span className="font-mono text-xs text-primary">
                  cursor {Math.min(cursor, order.length)} / {order.length}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-primary">
                {exhausted
                  ? "已耗尽：没有下一项"
                  : `当前项：${currentTask?.id} · ${currentTask?.label}`}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                策略：{strategy === "depth" ? "深度优先" : "优先级"} · 顺序：{order.join(" → ")}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">已读取</p>
                <p className="mt-2 font-mono text-lg text-primary">{Math.min(cursor, order.length)}</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">剩余项</p>
                <p className="mt-2 font-mono text-lg text-primary">{Math.max(order.length - cursor, 0)}</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">next 调用</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={
                "mt-4 rounded-control border p-4 " +
                (mutated ? "border-warning text-warning" : "border-success text-success")
              }
              role="status"
            >
              <p className="text-sm font-semibold">{message}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                Iterator 持有自己的位置，调用者只依赖 hasNext/next；集合的树、堆或数组表示不必暴露出来。
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">遍历轨迹</p>
                <span className="text-xs text-secondary">{traces.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {traces.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    切换策略、读取元素或注入集合修改后，这里会记录游标证据。
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
