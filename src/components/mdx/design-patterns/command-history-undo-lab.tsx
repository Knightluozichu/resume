"use client";

import { useMemo, useState } from "react";

type CommandKind = "rename" | "tag" | "archive";

type CommandSpec = {
  label: string;
  request: string;
  receiver: string;
  before: string;
  after: string;
};

const COMMANDS: Record<CommandKind, CommandSpec> = {
  rename: {
    label: "重命名文档",
    request: "RenameDocumentCommand",
    receiver: "DocumentReceiver",
    before: "设计评审.md",
    after: "设计评审-已确认.md",
  },
  tag: {
    label: "添加已确认标签",
    request: "AddTagCommand",
    receiver: "DocumentReceiver",
    before: "标签：待确认",
    after: "标签：已确认",
  },
  archive: {
    label: "归档文档",
    request: "ArchiveDocumentCommand",
    receiver: "DocumentReceiver",
    before: "状态：草稿",
    after: "状态：已归档",
  },
};

type HistoryItem = {
  id: number;
  command: CommandKind;
  state: "executed" | "undone";
};

function stateClass(state: HistoryItem["state"]) {
  return state === "executed"
    ? "border-success text-success"
    : "border-warning text-warning";
}

export function CommandHistoryUndoLab() {
  const [command, setCommand] = useState<CommandKind>("rename");
  const [recordHistory, setRecordHistory] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [redoCount, setRedoCount] = useState(0);
  const [message, setMessage] = useState(
    "先选择一个请求，再观察 Invoker 如何只调用 Command.execute。",
  );

  const current = COMMANDS[command];
  const activeCount = history.filter((item) => item.state === "executed").length;
  const documentState = useMemo(() => {
    const last = [...history].reverse().find((item) => item.state === "executed");
    return last ? COMMANDS[last.command].after : "设计评审.md · 标签：待确认 · 状态：草稿";
  }, [history]);

  function chooseCommand(next: CommandKind) {
    setCommand(next);
    setMessage(
      `${COMMANDS[next].request} 已准备：参数由命令对象保存，Receiver 等待执行。`,
    );
  }

  function executeCommand() {
    const item = { id: nextId, command, state: "executed" as const };
    setNextId((id) => id + 1);
    setRedoCount(0);
    setHistory((items) => (recordHistory ? [...items, item] : items));
    setMessage(
      recordHistory
        ? `${current.request}.execute() → ${current.receiver}：已执行并写入历史。`
        : `${current.request}.execute() → ${current.receiver}：已执行，但没有历史记录，无法可靠撤销。`,
    );
  }

  function undoCommand() {
    const index = [...history]
      .map((item, position) => ({ item, position }))
      .reverse()
      .find(({ item }) => item.state === "executed")?.position;
    if (index === undefined) {
      setMessage("没有可撤销的已执行命令；先执行命令或打开历史记录。 ");
      return;
    }
    setHistory((items) =>
      items.map((item, position) =>
        position === index ? { ...item, state: "undone" } : item,
      ),
    );
    setRedoCount((count) => count + 1);
    setMessage(
      `${COMMANDS[history[index].command].request}.undo() → 恢复执行前状态。`,
    );
  }

  function redoCommand() {
    const index = [...history]
      .map((item, position) => ({ item, position }))
      .reverse()
      .find(({ item }) => item.state === "undone")?.position;
    if (index === undefined) {
      setMessage("没有可重做的已撤销命令。 ");
      return;
    }
    setHistory((items) =>
      items.map((item, position) =>
        position === index ? { ...item, state: "executed" } : item,
      ),
    );
    setRedoCount((count) => Math.max(0, count - 1));
    setMessage(
      `${COMMANDS[history[index].command].request}.execute() → 重做成功。`,
    );
  }

  function reset() {
    setCommand("rename");
    setRecordHistory(true);
    setHistory([]);
    setNextId(1);
    setRedoCount(0);
    setMessage("先选择一个请求，再观察 Invoker 如何只调用 Command.execute。");
  }

  return (
    <section
      aria-label="命令模式可撤销任务实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-05"
      data-visual-kind="command-history-undo-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              COMMAND · REQUEST AS OBJECT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              请求对象化与撤销历史实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个编辑动作，观察 Invoker、Command、Receiver 和历史如何协作；再关闭记录，验证为什么执行不等于可撤销。
            </p>
          </div>
          <button
            aria-label="重置命令模式可撤销任务实验"
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
              <p className="text-xs font-semibold text-secondary">选择命令</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(COMMANDS) as CommandKind[]).map((key) => (
                  <button
                    aria-pressed={command === key}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (command === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={key}
                    onClick={() => chooseCommand(key)}
                    type="button"
                  >
                    {COMMANDS[key].label}
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={recordHistory}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (recordHistory
                  ? "border-success text-success"
                  : "border-warning text-warning")
              }
              onClick={() => {
                setRecordHistory((enabled) => !enabled);
                setMessage(
                  recordHistory
                    ? "反例已注入：命令仍会执行，但执行前信息不再进入历史。"
                    : "历史记录已恢复：下一次执行可以被撤销。",
                );
              }}
              type="button"
            >
              {recordHistory ? "记录到历史：开启" : "注入反例：不记录历史"}
            </button>

            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <button
                className="min-h-11 rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
                onClick={executeCommand}
                type="button"
              >
                Invoker.execute()
              </button>
              <button
                className="min-h-11 rounded-control border border-warning px-3 py-2 text-left text-xs text-warning transition-colors hover:bg-warning/10"
                onClick={undoCommand}
                type="button"
              >
                Command.undo()
              </button>
              <button
                className="min-h-11 rounded-control border border-border px-3 py-2 text-left text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
                onClick={redoCommand}
                type="button"
              >
                Command.redo()
              </button>
            </div>
            <p className="text-xs leading-5 text-secondary">
              先预测 execute 后的文档状态，再执行 undo；最后切换反例，解释为什么没有历史就没有可靠补偿信息。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                INVOKER → COMMAND → RECEIVER
              </p>
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " +
                  (recordHistory
                    ? "border-success text-success"
                    : "border-warning text-warning")
                }
              >
                {recordHistory ? "可追踪执行" : "执行但不可可靠撤销"}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                ["Invoker", "只触发 execute/undo"],
                ["Command", current.request],
                ["Receiver", current.receiver],
              ].map(([name, detail]) => (
                <div className="rounded-control border border-border p-3" key={name}>
                  <p className="text-xs font-semibold text-primary">{name}</p>
                  <p className="mt-2 text-xs leading-5 text-secondary">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">Receiver 当前状态</p>
                <span className="font-mono text-xs text-primary">{activeCount} 次执行</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-primary">{documentState}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                当前请求：{current.request} · 参数快照：{current.before} → {current.after}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">历史长度</p>
                <p className="mt-2 font-mono text-lg text-primary">{history.length}</p>
              </div>
              <div className="rounded-control border border-warning p-3">
                <p className="text-xs font-semibold text-warning">可重做</p>
                <p className="mt-2 font-mono text-lg text-primary">{redoCount}</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">命令状态</p>
                <p className="mt-2 text-xs leading-5 text-primary">
                  {history.length === 0 ? "未执行" : history.at(-1)?.state === "undone" ? "已撤销" : "已执行"}
                </p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={
                "mt-4 rounded-control border p-4 " +
                (recordHistory ? "border-success text-success" : "border-warning text-warning")
              }
              role="status"
            >
              <p className="text-sm font-semibold">{message}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                命令对象保存参数与补偿信息，Invoker 不需要知道 Receiver 的业务细节；历史记录则让 undo 拥有可验证的前置状态。
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">执行历史</p>
                <span className="text-xs text-secondary">{history.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {history.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    执行一次命令后，这里会显示可撤销的命令对象与状态。
                  </p>
                ) : (
                  history.map((item) => (
                    <div
                      className={"rounded-control border px-3 py-2 text-xs " + stateClass(item.state)}
                      key={item.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">#{item.id} · {COMMANDS[item.command].request}</p>
                        <span>{item.state === "executed" ? "已执行" : "已撤销"}</span>
                      </div>
                      <p className="mt-1 text-secondary">
                        {COMMANDS[item.command].before} → {COMMANDS[item.command].after}
                      </p>
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
