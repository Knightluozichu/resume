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

type AdapterMode = "correct" | "wrong";

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

export function AdapterSemanticContractLab() {
  const [mode, setMode] = useState<AdapterMode>("correct");
  const [requestCount, setRequestCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const correct = mode === "correct";
  const outputCelsius = correct ? 20 : 68;
  const outputLabel = correct ? "20°C" : "68°C";

  function addEvent(label: string, detail: string, tone: TraceEvent["tone"]) {
    setEvents((current) => [
      ...current,
      { id: current.length + 1, label, detail, tone },
    ]);
  }

  function selectMode(nextMode: AdapterMode) {
    setMode(nextMode);
    addEvent(
      nextMode === "correct" ? "采用转换规则" : "注入单位错误",
      nextMode === "correct"
        ? "华氏 → 摄氏： (68 - 32) × 5 / 9 = 20"
        : "错误适配器直接把 68 当成摄氏值，接口形状兼容但语义失真",
      nextMode === "correct" ? "success" : "warning",
    );
  }

  function requestTarget() {
    setRequestCount((current) => current + 1);
    addEvent(
      "客户端调用 Target",
      `Target.readTemperature() → Adapter → LegacyWeatherApi，返回 ${outputLabel}`,
      correct ? "success" : "warning",
    );
  }

  function reset() {
    setMode("correct");
    setRequestCount(0);
    setEvents([]);
  }

  return (
    <section
      aria-label="适配器语义契约实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-12"
      data-visual-kind="adapter-semantic-contract-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              ADAPTER · SEMANTIC CONTRACT
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              公制天气接口适配台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              让客户端只看 Target 合同；转换、兼容风险和旧接口责任都停在 Adapter 边界。
            </p>
          </div>
          <button
            aria-label="重置适配器语义契约实验"
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
                <p className="text-xs font-semibold text-secondary">转换规则</p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2">
                <button
                  aria-pressed={correct}
                  className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                    correct
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                  onClick={() => selectMode("correct")}
                  type="button"
                >
                  <span className="block">正确适配：华氏转摄氏</span>
                  <span className="mt-1 block text-[11px] text-secondary">
                    保留旧服务，翻译单位语义
                  </span>
                </button>
                <button
                  aria-pressed={!correct}
                  className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                    !correct
                      ? "border-warning text-warning"
                      : "border-border text-secondary hover:border-warning hover:text-primary"
                  }`}
                  onClick={() => selectMode("wrong")}
                  type="button"
                >
                  <span className="block">错误适配：只改方法名</span>
                  <span className="mt-1 block text-[11px] text-secondary">
                    形状兼容，但不翻译单位
                  </span>
                </button>
              </div>
            </div>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={requestTarget}
              type="button"
            >
              调用 Target.readTemperature()
            </button>

            <p className="text-xs leading-5 text-secondary">
              当前模拟旧服务返回 68°F；客户端合同只接受摄氏温度。每次请求都沿 Client → Target → Adapter → LegacyWeatherApi 流动。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                TARGET CONTRACT · ADAPTER BOUNDARY
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  correct
                    ? "border-success text-success"
                    : "border-warning text-warning"
                }`}
              >
                {correct ? "语义通过" : "语义不匹配"}
              </span>
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">Client</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  readTemperature()
                </p>
                <p className="mt-1 text-[11px] text-secondary">只依赖 Target</p>
              </div>
              <span aria-hidden="true" className="hidden text-center text-accent md:block">
                →
              </span>
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">Adapter</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  convert(legacy)
                </p>
                <p className="mt-1 text-[11px] text-secondary">翻译协议与单位</p>
              </div>
              <span aria-hidden="true" className="hidden text-center text-accent md:block">
                →
              </span>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">Legacy API</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  getFahrenheit()
                </p>
                <p className="mt-1 text-[11px] text-secondary">返回 68°F</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">旧值</p>
                <p className="mt-2 font-mono text-lg text-primary">68°F</p>
              </div>
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">目标值</p>
                <p className="mt-2 font-mono text-lg text-primary">{outputCelsius}°C</p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">调用次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{requestCount}</p>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                correct ? "border-success" : "border-warning"
              }`}
              role="status"
            >
              <p
                className={`text-sm font-semibold ${
                  correct ? "text-success" : "text-warning"
                }`}
              >
                {correct
                  ? "契约通过：68°F 被翻译为 20°C"
                  : "契约失败：68 被原样伪装成 68°C"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {correct
                  ? "Client 不需要知道 Legacy API 的命名和单位，适配器集中承担语义转换。"
                  : "方法名相同不等于含义相同；转换边界漏掉单位后，错误会穿过接口并污染业务结果。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">边界事件轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    选择规则或调用 Target 后，这里会记录翻译、错误与返回值证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={`min-w-0 rounded-control border px-3 py-2 text-xs ${eventTone(event.tone)}`}
                      key={event.id}
                    >
                      <div className="flex flex-wrap justify-between gap-2">
                        <span>{event.label}</span>
                        <span className="font-mono text-[11px]">#{event.id}</span>
                      </div>
                      <p className="mt-1 break-words text-secondary">{event.detail}</p>
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
