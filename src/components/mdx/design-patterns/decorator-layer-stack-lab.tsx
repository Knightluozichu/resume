"use client";

import { useMemo, useState } from "react";

type LayerKind = "compression" | "encryption" | "audit";

type LayerSpec = {
  label: string;
  className: string;
  detail: string;
  output: string;
};

const LAYERS: Record<LayerKind, LayerSpec> = {
  compression: {
    label: "压缩层",
    className: "CompressionDecorator",
    detail: "缩短载荷，不改变组件接口",
    output: "release-notes.gz",
  },
  encryption: {
    label: "加密层",
    className: "EncryptionDecorator",
    detail: "保护内容，继续转发同一契约",
    output: "encrypted(release-notes.gz)",
  },
  audit: {
    label: "审计层",
    className: "AuditDecorator",
    detail: "记录调用，返回下层结果",
    output: "audit + encrypted payload",
  },
};

const DEFAULT_ENABLED: Record<LayerKind, boolean> = {
  compression: true,
  encryption: true,
  audit: false,
};

const DEFAULT_ORDER: LayerKind[] = ["compression", "encryption", "audit"];

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

export function DecoratorLayerStackLab() {
  const [enabled, setEnabled] = useState(DEFAULT_ENABLED);
  const [invalidOrder, setInvalidOrder] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [message, setMessage] = useState(
    "先选择职责层，再预测包装顺序如何改变输出。",
  );

  const activeLayers = useMemo(
    () =>
      (invalidOrder ? [...DEFAULT_ORDER].reverse() : DEFAULT_ORDER).filter(
        (kind) => enabled[kind],
      ),
    [enabled, invalidOrder],
  );

  const output = activeLayers.reduce(
    (value, kind) => `${LAYERS[kind].label}(${value})`,
    "release notes",
  );

  function addTrace(label: string, detail: string, tone: Trace["tone"]) {
    setTraces((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function toggleLayer(kind: LayerKind) {
    const next = !enabled[kind];
    setEnabled((items) => ({ ...items, [kind]: next }));
    setMessage(
      next
        ? `${LAYERS[kind].className} 已包裹在组件链中，接口仍保持为 MessageComponent。`
        : `${LAYERS[kind].className} 已移除；核心组件仍可独立返回消息。`,
    );
    addTrace(
      next ? `加入${LAYERS[kind].label}` : `移除${LAYERS[kind].label}`,
      next ? LAYERS[kind].detail : "可选职责被移除，其他层不需要修改核心组件。",
      next ? "success" : "neutral",
    );
  }

  function toggleInvalidOrder() {
    const next = !invalidOrder;
    setInvalidOrder(next);
    setMessage(
      next
        ? "反例已注入：审计先于加密，输出顺序改变，必须重新确认每层的语义。"
        : "已恢复推荐顺序：压缩 → 加密 → 审计。",
    );
    addTrace(
      next ? "注入顺序反例" : "恢复推荐顺序",
      next
        ? "包装仍遵守接口，但可观察副作用和输出格式已不再符合原先约定。"
        : "外层审计最后观察结果，压缩与加密按预期先后发生。",
      next ? "warning" : "success",
    );
  }

  function runPipeline() {
    setRunCount((count) => count + 1);
    if (invalidOrder) {
      setMessage(
        `运行完成，但需要评审顺序：${activeLayers
          .map((kind) => LAYERS[kind].label)
          .join(" → ")}。`,
      );
      addTrace(
        "运行顺序反例",
        "装饰器可以继续嵌套，但接口兼容不等于顺序语义正确；先记录再加密可能暴露不同的审计字段。",
        "warning",
      );
      return;
    }
    setMessage(
      activeLayers.length === 0
        ? "核心组件直接返回消息；没有可选职责时，装饰器可以全部移除。"
        : `运行完成：${activeLayers.map((kind) => LAYERS[kind].label).join(" → ")} 依次转发。`,
    );
    addTrace(
      "运行装饰器链",
      activeLayers.length === 0
        ? "没有包装层，核心组件仍满足 MessageComponent 合同。"
        : "每层先处理自己的职责，再把同一接口交给被包裹对象。",
      "success",
    );
  }

  function reset() {
    setEnabled(DEFAULT_ENABLED);
    setInvalidOrder(false);
    setRunCount(0);
    setTraces([]);
    setMessage("先选择职责层，再预测包装顺序如何改变输出。");
  }

  return (
    <section
      aria-label="装饰器模式职责叠加实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-04"
      data-visual-kind="decorator-layer-stack-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DECORATOR · LAYERED RESPONSIBILITY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              组件包装与职责叠加实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              开关可选职责，观察每层如何持有同一组件接口；再注入顺序反例，区分“能组合”和“组合语义正确”。
            </p>
          </div>
          <button
            aria-label="重置装饰器模式职责叠加实验"
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
              <p className="text-xs font-semibold text-secondary">可选职责层</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(LAYERS) as LayerKind[]).map((kind) => (
                  <button
                    aria-pressed={enabled[kind]}
                    className={
                      "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (enabled[kind]
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={kind}
                    onClick={() => toggleLayer(kind)}
                    type="button"
                  >
                    <span className="font-semibold">{LAYERS[kind].label}</span>
                    <span className="ml-2 text-secondary">
                      {enabled[kind] ? "已包裹" : "未启用"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-pressed={invalidOrder}
              className={
                "min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                (invalidOrder
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary")
              }
              onClick={toggleInvalidOrder}
              type="button"
            >
              {invalidOrder ? "关闭反例：恢复推荐顺序" : "注入反例：让审计先于加密"}
            </button>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={runPipeline}
              type="button"
            >
              运行包装链
            </button>
            <p className="text-xs leading-5 text-secondary">
              先预测输出和调用顺序，再运行一次；每层都应该转发同一组件契约，而不是偷偷改变输入语义。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                COMPONENT → DECORATORS → OUTPUT
              </p>
              <span
                className={
                  "rounded-control border px-2 py-1 text-xs " +
                  (invalidOrder
                    ? "border-warning text-warning"
                    : "border-success text-success")
                }
              >
                {invalidOrder ? "顺序待评审" : "契约可组合"}
              </span>
            </div>

            <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
              <div className="min-w-[9rem] flex-1 rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-primary">CoreComponent</p>
                <p className="mt-2 text-xs leading-5 text-secondary">返回原始消息</p>
              </div>
              {activeLayers.map((kind) => (
                <div
                  className={
                    "min-w-[9rem] flex-1 rounded-control border p-3 " +
                    (invalidOrder ? "border-warning" : "border-accent")
                  }
                  key={kind}
                >
                  <p className="text-xs font-semibold text-primary">
                    {LAYERS[kind].className}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-secondary">
                    {LAYERS[kind].detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-control border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">当前输出</p>
                <span className="font-mono text-xs text-primary">
                  {activeLayers.length} 层包装
                </span>
              </div>
              <p className="mt-2 break-words text-sm leading-6 text-primary">{output}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                调用顺序：CoreComponent → {activeLayers.length === 0 ? "直接返回" : activeLayers.map((kind) => LAYERS[kind].label).join(" → ")}
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">启用职责</p>
                <p className="mt-2 font-mono text-lg text-primary">{activeLayers.length}</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">接口变化</p>
                <p className="mt-2 text-xs leading-5 text-primary">保持 MessageComponent</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">运行次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{runCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={
                "mt-4 rounded-control border p-4 " +
                (invalidOrder ? "border-warning text-warning" : "border-success text-success")
              }
              role="status"
            >
              <p className="text-sm font-semibold">{message}</p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                装饰器通过持有同一接口来叠加职责；顺序和副作用仍属于设计合同，不能只看类型是否兼容。
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">调用轨迹</p>
                <span className="text-xs text-secondary">{traces.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {traces.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    切换职责层、注入反例或运行一次后，这里会记录包装证据。
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
