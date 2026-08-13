"use client";

import { useState } from "react";

type TreeKind = "oak" | "pine" | "maple";

const KINDS: Record<
  TreeKind,
  { label: string; texture: string; tone: string }
> = {
  oak: { label: "橡树·春", texture: "oak-texture", tone: "border-success" },
  pine: { label: "松树·冬", texture: "pine-texture", tone: "border-accent" },
  maple: { label: "枫树·秋", texture: "maple-texture", tone: "border-warning" },
};

type TreeInstance = {
  id: number;
  kind: TreeKind;
  x: number;
  y: number;
  vitality: number;
};

type TraceEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

const INITIAL_INSTANCES: TreeInstance[] = [
  { id: 1, kind: "oak", x: 18, y: 30, vitality: 86 },
  { id: 2, kind: "oak", x: 68, y: 66, vitality: 74 },
  { id: 3, kind: "pine", x: 42, y: 22, vitality: 91 },
  { id: 4, kind: "pine", x: 82, y: 48, vitality: 63 },
];

const INITIAL_ANCHORS: Record<TreeKind, { x: number; y: number }> = {
  oak: { x: 18, y: 30 },
  pine: { x: 42, y: 22 },
  maple: { x: 50, y: 50 },
};

function eventTone(tone: TraceEvent["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function FlyweightForestMemoryLab() {
  const [instances, setInstances] = useState<TreeInstance[]>(INITIAL_INSTANCES);
  const [selectedKind, setSelectedKind] = useState<TreeKind>("oak");
  const [unsafeIntrinsicPosition, setUnsafeIntrinsicPosition] = useState(false);
  const [nextId, setNextId] = useState(5);
  const [anchors, setAnchors] =
    useState<Record<TreeKind, { x: number; y: number }>>(INITIAL_ANCHORS);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const sharedKinds = Array.from(
    new Set(instances.map((instance) => instance.kind)),
  );
  const instanceBytes = instances.length * 96;
  const sharedBytes = sharedKinds.length * 48 + instances.length * 24;
  const savedPercent = Math.max(
    0,
    Math.round((1 - sharedBytes / instanceBytes) * 100),
  );

  function addEvent(
    label: string,
    detail: string,
    tone: TraceEvent["tone"],
  ) {
    setEvents((current) => [
      ...current,
      { id: current.length + 1, label, detail, tone },
    ]);
  }

  function chooseKind(kind: TreeKind) {
    setSelectedKind(kind);
    addEvent(
      "选择共享键",
      KINDS[kind].label +
        " 使用一个共享 TreeFlyweight；坐标与活力仍属于每个外在实例。",
      "success",
    );
  }

  function addTree() {
    const id = nextId;
    const x = 12 + ((id * 19) % 76);
    const y = 18 + ((id * 31) % 66);
    setInstances((current) => [
      ...current,
      { id, kind: selectedKind, x, y, vitality: 58 + ((id * 7) % 38) },
    ]);
    setNextId((current) => current + 1);
    if (unsafeIntrinsicPosition) {
      setAnchors((current) => ({
        ...current,
        [selectedKind]: { x, y },
      }));
      addEvent(
        "添加实例并写入享元",
        KINDS[selectedKind].label +
          " 的坐标被错误写进共享对象；同键的其他实例会一起读到它。",
        "warning",
      );
      return;
    }
    addEvent(
      "添加外在实例",
      KINDS[selectedKind].label +
        " 复用缓存对象，新增坐标与活力只保存在 TreeInstance。",
      "success",
    );
  }

  function toggleUnsafe() {
    const next = !unsafeIntrinsicPosition;
    setUnsafeIntrinsicPosition(next);
    addEvent(
      next ? "注入状态串改反例" : "恢复状态分离",
      next
        ? "让共享 TreeFlyweight 持有坐标；同树种实例将失去彼此独立的位置。"
        : "把坐标交还给每个实例，享元只保留不可变纹理和模型。",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setInstances(INITIAL_INSTANCES);
    setSelectedKind("oak");
    setUnsafeIntrinsicPosition(false);
    setNextId(5);
    setAnchors(INITIAL_ANCHORS);
    setEvents([]);
  }

  function instancePosition(instance: TreeInstance) {
    return unsafeIntrinsicPosition ? anchors[instance.kind] : instance;
  }

  return (
    <section
      aria-label="享元模式森林内存实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-16"
      data-visual-kind="flyweight-forest-memory-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              FLYWEIGHT · INTRINSIC / EXTRINSIC STATE
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              森林实例与享元缓存实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              添加相同树种的实例，观察缓存复用如何降低内存；再把坐标错误地放进享元，检查状态串改。
            </p>
          </div>
          <button
            aria-label="重置享元模式森林内存实验"
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
              <p className="text-xs font-semibold text-secondary">选择共享键</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(KINDS) as TreeKind[]).map((kind) => (
                  <button
                    aria-pressed={selectedKind === kind}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (selectedKind === kind
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={kind}
                    onClick={() => chooseKind(kind)}
                    type="button"
                  >
                    {KINDS[kind].label} · {KINDS[kind].texture}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={addTree}
              type="button"
            >
              添加一棵 {KINDS[selectedKind].label}
            </button>

            <button
              aria-pressed={unsafeIntrinsicPosition}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (unsafeIntrinsicPosition
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleUnsafe}
              type="button"
            >
              {unsafeIntrinsicPosition
                ? "关闭反例：恢复外在坐标"
                : "注入反例：把坐标写进共享享元"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              共享对象只应保存不可变的内在状态；坐标、活力和选中位置必须随每个实例传入。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                FACTORY CACHE → TREE INSTANCES
              </p>
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " +
                  (unsafeIntrinsicPosition
                    ? "border-warning text-warning"
                    : "border-success text-success")
                }
              >
                {unsafeIntrinsicPosition ? "共享状态被污染" : "状态边界有效"}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-control border border-accent p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-accent">
                    TreeFactory · 内在状态缓存
                  </p>
                  <span className="font-mono text-xs text-primary">
                    {sharedKinds.length} 个 key
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {sharedKinds.map((kind) => (
                    <div
                      className={"rounded-control border p-3 " + KINDS[kind].tone}
                      key={kind}
                    >
                      <p className="text-xs font-semibold text-primary">
                        {KINDS[kind].label}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-secondary">
                        {KINDS[kind].texture}
                      </p>
                      <p className="mt-2 text-[11px] text-secondary">
                        共享模型 + 纹理
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-control border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-secondary">
                    MapContext · 外在状态实例
                  </p>
                  <span className="font-mono text-xs text-primary">
                    {instances.length} 棵树
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {instances.map((instance) => {
                    const position = instancePosition(instance);
                    return (
                      <div
                        className="rounded-control border border-border p-3"
                        key={instance.id}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-primary">
                            #{instance.id} {KINDS[instance.kind].label}
                          </p>
                          <span className="font-mono text-[11px] text-secondary">
                            vitality {instance.vitality}
                          </span>
                        </div>
                        <p className="mt-2 font-mono text-xs text-secondary">
                          position ({position.x}, {position.y})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">实例数量</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {instances.length}
                </p>
              </div>
              <div className="rounded-control border border-success p-3">
                <p className="text-xs font-semibold text-success">共享节省</p>
                <p className="mt-2 font-mono text-lg text-primary">
                  {savedPercent}%
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">估算内存</p>
                <p className="mt-2 font-mono text-sm text-primary">
                  {sharedBytes}B / {instanceBytes}B
                </p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={
                "mt-4 rounded-control border p-4 " +
                (unsafeIntrinsicPosition
                  ? "border-warning text-warning"
                  : "border-success text-success")
              }
              role="status"
            >
              <p className="text-sm font-semibold">
                {unsafeIntrinsicPosition
                  ? "反例：同一个享元正在让同树种实例共享坐标"
                  : "合同通过：内在状态共享，外在状态逐实例传入"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {unsafeIntrinsicPosition
                  ? "最后写入的坐标会覆盖同键实例的展示；这说明可变上下文不能藏在共享对象里。"
                  : "TreeFactory 只缓存纹理和模型，MapContext 保存位置与活力，因此移动一棵树不会移动其他树。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">操作轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择树种、添加实例或注入反例后，这里会记录共享键与状态边界证据。
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
