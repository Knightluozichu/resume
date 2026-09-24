"use client";

import { useState } from "react";

export type EditKind = "draw" | "title" | "zoom";
type Tone = "success" | "warning" | "neutral";

export type CanvasState = {
  title: string;
  strokes: number;
  color: "ink" | "accent";
  zoom: number;
};

export type Snapshot = {
  readonly id: number;
  readonly label: string;
  readonly state: Readonly<CanvasState>;
};

type Trace = {
  id: number;
  label: string;
  detail: string;
  tone: Tone;
};

const INITIAL_CANVAS: CanvasState = {
  title: "发布草稿",
  strokes: 2,
  color: "ink",
  zoom: 100,
};

const EDITS: Array<{ id: EditKind; label: string; detail: string }> = [
  { id: "title", label: "改标题", detail: "切换为评审版本" },
  { id: "draw", label: "增加笔画", detail: "新增一条标记" },
  { id: "zoom", label: "调整缩放", detail: "放大到 125%" },
];

function toneClass(tone: Tone) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

function cloneCanvas(state: Readonly<CanvasState>): CanvasState {
  return { ...state };
}

export function applyCanvasEdit(
  state: CanvasState,
  edit: EditKind,
  unsafeReference = false,
): CanvasState {
  const next = unsafeReference ? state : cloneCanvas(state);
  if (edit === "draw") next.strokes += 1;
  if (edit === "title") next.title = "评审版本";
  if (edit === "zoom") next.zoom = 125;
  return cloneCanvas(next);
}

export function captureCanvasSnapshot(
  state: CanvasState,
  id: number,
  unsafeReference = false,
): Snapshot {
  return Object.freeze({
    id,
    label: `快照 ${id}`,
    // Unsafe mode deliberately retains a mutable alias; safe mode freezes a copy.
    state: unsafeReference ? state : Object.freeze(cloneCanvas(state)),
  });
}

export function restoreCanvasSnapshot(snapshot: Snapshot): CanvasState {
  return cloneCanvas(snapshot.state);
}

function CanvasPaper({
  state,
  label,
}: {
  state: Readonly<CanvasState>;
  label: string;
}) {
  return (
    <svg
      aria-label={`${label}：${state.title}，${state.strokes} 笔，颜色 ${state.color}，缩放 ${state.zoom}%`}
      className="mt-3 block w-full text-primary"
      data-canvas-paper={label}
      data-title={state.title}
      data-strokes={state.strokes}
      data-color={state.color}
      data-zoom={state.zoom}
      height="156"
      role="img"
    >
      <title>{`${label}的真实纸面；放大时超出纸面的笔迹会被裁剪`}</title>
      <rect
        x="1%"
        y="1"
        width="98%"
        height="154"
        rx="4"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="6%" y="24" fontSize="13" fill="currentColor">
        {state.title}
      </text>
      <svg
        aria-hidden="true"
        x="6%"
        y="34"
        width="88%"
        height="94"
        viewBox="0 0 200 94"
      >
        <g transform={`scale(${state.zoom / 100})`}>
          {Array.from({ length: state.strokes }, (_, index) => (
            <path
              key={index}
              d={`M ${10 + (index % 4) * 44} ${12 + Math.floor(index / 4) * 16} l 12 -5 l 15 8`}
              fill="none"
              stroke={
                state.color === "accent"
                  ? "var(--accent)"
                  : "var(--text-primary)"
              }
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
      <text x="6%" y="144" fontSize="13" fill="var(--text-secondary)">
        {`${state.strokes} 笔 · ${state.zoom}%`}
      </text>
    </svg>
  );
}

function SnapshotReferences({
  shared,
  hasSnapshot,
}: {
  shared: boolean;
  hasSnapshot: boolean;
}) {
  return (
    <svg
      aria-label={
        !hasSnapshot
          ? "当前状态，尚无所选快照"
          : shared
            ? "当前状态和所选快照指向同一张纸"
            : "当前状态和所选快照各自指向独立纸面"
      }
      className="mt-3 block w-full text-secondary"
      data-snapshot-reference={
        !hasSnapshot ? "empty" : shared ? "shared" : "separate"
      }
      height="96"
      role="img"
    >
      <text
        x="20%"
        y="16"
        textAnchor="middle"
        fontSize="13"
        fill="currentColor"
      >
        当前
      </text>
      <text
        x="80%"
        y="16"
        textAnchor="middle"
        fontSize="13"
        fill="currentColor"
      >
        所选历史
      </text>
      <line
        x1="20%"
        y1="23"
        x2={shared ? "50%" : "20%"}
        y2="44"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      {hasSnapshot && (
        <line
          x1="80%"
          y1="23"
          x2={shared ? "50%" : "80%"}
          y2="44"
          stroke={shared ? "var(--warning)" : "var(--accent)"}
          strokeWidth="2"
        />
      )}
      <rect
        x={shared ? "44%" : "14%"}
        y="44"
        width="12%"
        height="25"
        fill="var(--bg)"
        stroke={shared ? "var(--warning)" : "var(--accent)"}
      />
      {hasSnapshot && !shared && (
        <rect
          x="74%"
          y="44"
          width="12%"
          height="25"
          fill="var(--bg)"
          stroke="var(--accent)"
        />
      )}
      <text
        x="50%"
        y="90"
        textAnchor="middle"
        fontSize="13"
        fill="currentColor"
      >
        {!hasSnapshot
          ? "尚无快照"
          : shared
            ? "同一引用：编辑会污染历史"
            : "不同引用：当前与历史已分离"}
      </text>
    </svg>
  );
}

export function MementoSnapshotCanvasLab() {
  const [canvas, setCanvas] = useState<CanvasState>(() =>
    cloneCanvas(INITIAL_CANVAS),
  );
  const [selectedEdit, setSelectedEdit] = useState<EditKind>("draw");
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<number | null>(
    null,
  );
  const [unsafeReference, setUnsafeReference] = useState(false);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [status, setStatus] = useState("基线：画布有 2 条笔画，尚未创建快照。");

  function addTrace(label: string, detail: string, tone: Tone) {
    setTraces((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseEdit(next: EditKind) {
    setSelectedEdit(next);
    const edit = EDITS.find((item) => item.id === next);
    setStatus(`已选择 ${edit?.label}：先预测快照应保存哪些字段。`);
    addTrace(
      "选择编辑",
      `${edit?.label} · ${edit?.detail}；当前尚未改变画布。`,
      "neutral",
    );
  }

  function applyEdit() {
    const edit = EDITS.find((item) => item.id === selectedEdit);
    // Keep the intentional alias mutation in the event, not a replayable updater.
    setCanvas(applyCanvasEdit(canvas, selectedEdit, unsafeReference));
    setStatus(`${edit?.label} 已应用；现在可以创建快照或检查旧快照。`);
    addTrace(
      "修改画布",
      unsafeReference
        ? `${edit?.label} 通过共享引用改变状态，已有快照可能被污染。`
        : `${edit?.label} 创建了新的画布状态，已有快照保持独立。`,
      unsafeReference ? "warning" : "success",
    );
  }

  function capture() {
    const id = snapshots.length + 1;
    const snapshot = captureCanvasSnapshot(canvas, id, unsafeReference);
    setSnapshots((items) => [...items, snapshot]);
    setSelectedSnapshotId(id);
    setStatus(
      unsafeReference
        ? `${snapshot.label} 已保存为共享引用；后续编辑可能改写它。`
        : `${snapshot.label} 已保存为独立快照；后续编辑不会改写它。`,
    );
    addTrace(
      "创建备忘录",
      unsafeReference
        ? "CanvasMemento 与当前状态共享引用，反例已打开。"
        : "CanvasOriginator 复制完整状态，HistoryCaretaker 只保存快照。",
      unsafeReference ? "warning" : "success",
    );
  }

  function restore() {
    if (selectedSnapshotId === null) {
      setStatus("尚未选择快照；先创建并选择一条历史记录。 ");
      addTrace(
        "恢复被拒绝",
        "HistoryCaretaker 没有可交回给原发器的快照。",
        "warning",
      );
      return;
    }
    const snapshot = snapshots.find((item) => item.id === selectedSnapshotId);
    if (!snapshot) return;
    setCanvas(restoreCanvasSnapshot(snapshot));
    setStatus(
      `${snapshot.label} 已交回 CanvasOriginator，画布恢复到捕获时状态。`,
    );
    addTrace(
      "恢复快照",
      unsafeReference
        ? `${snapshot.label} 的内容可能已被后续编辑污染，请比较捕获值与当前值。`
        : `${snapshot.label} 恢复成功，快照仍保持只读历史。`,
      unsafeReference ? "warning" : "success",
    );
  }

  function toggleUnsafeReference() {
    const next = !unsafeReference;
    setUnsafeReference(next);
    setStatus(
      next
        ? "已注入共享引用反例；下一次编辑会尝试污染已有快照。"
        : "共享引用反例已关闭；新的快照将使用独立复制。",
    );
    addTrace(
      next ? "注入引用反例" : "关闭引用反例",
      next
        ? "用可变对象作为历史状态，观察封装快照为何必须不可变。"
        : "恢复复制策略，重新验证捕获、编辑、恢复三态。",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setCanvas(cloneCanvas(INITIAL_CANVAS));
    setSelectedEdit("draw");
    setSnapshots([]);
    setSelectedSnapshotId(null);
    setUnsafeReference(false);
    setTraces([]);
    setStatus("基线：画布有 2 条笔画，尚未创建快照。");
  }

  return (
    <section
      aria-label="备忘录模式画布快照恢复实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-21"
      data-visual-kind="memento-snapshot-canvas-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-accent">
              MEMENTO · CAPTURE · RESTORE
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              画布快照与恢复实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              让 CanvasOriginator 创建快照、HistoryCaretaker
              保存快照，再观察共享引用反例如何污染过去。
            </p>
          </div>
          <button
            aria-label="重置备忘录模式画布快照恢复实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-[13px] text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-[13px] font-semibold text-secondary">
                选择编辑动作
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(["title", "draw", "zoom"] as EditKind[]).map((id) => {
                  const edit = EDITS.find((item) => item.id === id);
                  if (!edit) return null;
                  return (
                    <button
                      aria-pressed={selectedEdit === id}
                      className={
                        "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-[13px] transition-colors " +
                        (selectedEdit === id
                          ? "border-accent text-accent"
                          : "border-border text-secondary hover:border-accent hover:text-primary")
                      }
                      key={id}
                      onClick={() => chooseEdit(id)}
                      type="button"
                    >
                      {edit.label} · {edit.detail}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                className="min-h-11 rounded-control border border-accent px-3 py-2 text-left text-[13px] text-accent transition-colors hover:bg-accent/10"
                onClick={applyEdit}
                type="button"
              >
                应用编辑动作
              </button>
              <button
                className="min-h-11 rounded-control border border-border px-3 py-2 text-left text-[13px] text-secondary transition-colors hover:border-accent hover:text-primary"
                onClick={capture}
                type="button"
              >
                创建备忘录快照
              </button>
              <button
                className="min-h-11 rounded-control border border-border px-3 py-2 text-left text-[13px] text-secondary transition-colors hover:border-accent hover:text-primary"
                onClick={restore}
                type="button"
              >
                恢复所选快照
              </button>
            </div>

            <button
              aria-pressed={unsafeReference}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-[13px] transition-colors " +
                (unsafeReference
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleUnsafeReference}
              type="button"
            >
              {unsafeReference ? "关闭共享引用反例" : "注入共享引用反例"}
            </button>
            <p className="text-[13px] leading-5 text-secondary">
              先创建快照，再应用编辑并恢复；最后开启反例，比较历史卡片是否仍等于捕获时状态。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">
                ORIGINATOR → MEMENTO → CARETAKER
              </p>
              <span className="rounded-control border border-border px-2 py-1 text-[13px] text-secondary">
                历史 {snapshots.length} 条
              </span>
            </div>

            <SnapshotReferences
              hasSnapshot={selectedSnapshotId !== null}
              shared={snapshots.some(
                (snapshot) =>
                  snapshot.id === selectedSnapshotId &&
                  snapshot.state === canvas,
              )}
            />
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="min-w-0 rounded-card border border-accent/60 bg-accent/10 p-4">
                <p className="text-[13px] font-semibold text-accent">
                  CanvasOriginator
                </p>
                <CanvasPaper state={canvas} label="当前画布" />
                <div className="mt-3 grid gap-2 text-[13px] text-secondary">
                  <p>
                    <span className="text-primary">标题：</span>
                    {canvas.title}
                  </p>
                  <p>
                    <span className="text-primary">笔画：</span>
                    {canvas.strokes}
                  </p>
                  <p>
                    <span className="text-primary">颜色：</span>
                    {canvas.color}
                  </p>
                  <p>
                    <span className="text-primary">缩放：</span>
                    {canvas.zoom}%
                  </p>
                </div>
              </div>

              <div
                className="hidden text-center text-[13px] text-accent sm:block"
                aria-hidden="true"
              >
                ↓
                <span className="mt-1 block text-[13px] text-secondary">
                  capture
                </span>
              </div>

              <div className="min-w-0 rounded-card border border-border p-4">
                <p className="text-[13px] font-semibold text-secondary">
                  HistoryCaretaker
                </p>
                <div className="mt-3 grid gap-2">
                  {snapshots.length === 0 ? (
                    <p className="rounded-control border border-dashed border-border px-3 py-3 text-[13px] text-secondary">
                      尚无快照
                    </p>
                  ) : (
                    snapshots.map((snapshot) => (
                      <button
                        aria-pressed={selectedSnapshotId === snapshot.id}
                        className={
                          "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-[13px] transition-colors " +
                          (selectedSnapshotId === snapshot.id
                            ? "border-accent text-accent"
                            : "border-border text-secondary hover:border-accent hover:text-primary")
                        }
                        key={snapshot.id}
                        onClick={() => setSelectedSnapshotId(snapshot.id)}
                        type="button"
                      >
                        <span className="block font-semibold">
                          {snapshot.label}
                        </span>
                        <CanvasPaper
                          state={snapshot.state}
                          label={snapshot.label}
                        />
                        <span className="mt-1 block leading-5 text-secondary">
                          {snapshot.state.title} · {snapshot.state.strokes} 笔 ·{" "}
                          {snapshot.state.zoom}%
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            <p
              aria-live="polite"
              className="mt-4 rounded-control border border-border px-3 py-2 text-[13px] leading-5 text-primary"
              role="status"
            >
              {status}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-[13px] font-semibold text-secondary">
                状态证据轨迹
              </p>
              {traces.length === 0 ? (
                <p className="rounded-control border border-dashed border-border px-3 py-3 text-[13px] text-secondary">
                  还没有事件；先点击一个不是当前状态的编辑动作。
                </p>
              ) : (
                traces.slice(-4).map((trace) => (
                  <div
                    className={
                      "rounded-control border px-3 py-2 text-[13px] " +
                      toneClass(trace.tone)
                    }
                    key={trace.id}
                  >
                    <p className="font-semibold">
                      {trace.id}. {trace.label}
                    </p>
                    <p className="mt-1 leading-5 text-secondary">
                      {trace.detail}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
