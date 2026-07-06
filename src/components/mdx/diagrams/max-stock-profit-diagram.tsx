"use client";

import { useMemo, useState } from "react";

interface StepData {
  index: number;
  price: number;
  minPrice: number;
  minIndex: number;
  profit: number;
  best: number;
  sellIndex: number | null;
  decision: string;
  proof: string;
  action: string;
  codeLine: number;
}

const PRICES = [7, 1, 5, 3, 6, 4];

const STEPS: StepData[] = [
  {
    index: 0,
    price: 7,
    minPrice: 7,
    minIndex: 0,
    profit: 0,
    best: 0,
    sellIndex: null,
    decision: "初始化最低买入价",
    proof: "第一天只能作为候选买入点，不能同一天强制产生利润。",
    action: "minPrice = 7, best = 0",
    codeLine: 1,
  },
  {
    index: 1,
    price: 1,
    minPrice: 1,
    minIndex: 1,
    profit: 0,
    best: 0,
    sellIndex: null,
    decision: "发现更低买点",
    proof: "价格 1 比历史最低 7 更低，未来若卖出应从 1 开始算。",
    action: "minPrice = 1",
    codeLine: 4,
  },
  {
    index: 2,
    price: 5,
    minPrice: 1,
    minIndex: 1,
    profit: 4,
    best: 4,
    sellIndex: 2,
    decision: "刷新最大利润",
    proof: "若今天卖出，利润为 5-1=4，超过历史 best=0。",
    action: "best = 4",
    codeLine: 3,
  },
  {
    index: 3,
    price: 3,
    minPrice: 1,
    minIndex: 1,
    profit: 2,
    best: 4,
    sellIndex: 2,
    decision: "利润不刷新",
    proof: "3-1=2 小于当前 best=4，保留原答案。",
    action: "best unchanged",
    codeLine: 3,
  },
  {
    index: 4,
    price: 6,
    minPrice: 1,
    minIndex: 1,
    profit: 5,
    best: 5,
    sellIndex: 4,
    decision: "再次刷新最大利润",
    proof: "6-1=5，最佳交易变成第 2 天买、第 5 天卖。",
    action: "best = 5",
    codeLine: 3,
  },
  {
    index: 5,
    price: 4,
    minPrice: 1,
    minIndex: 1,
    profit: 3,
    best: 5,
    sellIndex: 4,
    decision: "扫描结束",
    proof: "4-1=3 不刷新，最终最大利润为 5。",
    action: "return 5",
    codeLine: 5,
  },
];

const CODE_LINES = [
  "minPrice = prices[0], best = 0",
  "for price in prices:",
  "  best = max(best, price - minPrice)",
  "  minPrice = min(minPrice, price)",
  "return best",
];

export function MaxStockProfitDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  const scannedSet = useMemo(() => {
    const set = new Set<number>();
    for (let index = 0; index <= step.index; index += 1) set.add(index);
    return set;
  }, [step.index]);

  const prevStep = () => setCurrentStep((value) => Math.max(0, value - 1));
  const nextStep = () =>
    setCurrentStep((value) => Math.min(STEPS.length - 1, value + 1));

  return (
    <figure className="mdx-figure mx-auto my-6 max-w-5xl">
      <div className="overflow-hidden rounded-card border border-border bg-bg">
        <div className="border-b border-border bg-elevated px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                interview whiteboard
              </p>
              <h3 className="mt-1 text-base font-semibold text-primary">
                股票最大利润：维护历史最低买点
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <span>best</span>
              <span className="rounded-control border border-accent px-2 py-1 font-mono text-accent">
                {step.best}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <div className="border-b border-border p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {STEPS.map((item, index) => (
                <button
                  key={`${item.index}-${index}`}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`h-8 min-w-8 rounded-control border px-2 font-mono text-xs font-semibold transition-colors ${
                    index === currentStep
                      ? "border-accent bg-accent text-bg"
                      : index < currentStep
                        ? "border-success text-success hover:border-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                  aria-label={`跳到第 ${index + 1} 步`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="rounded-card border border-border bg-elevated p-3 sm:p-4">
              <div className="mb-3 grid grid-cols-[repeat(6,minmax(36px,1fr))] gap-2 text-center font-mono text-xs font-semibold text-secondary">
                {PRICES.map((_, index) => (
                  <div key={index}>day {index + 1}</div>
                ))}
              </div>

              <div className="grid grid-cols-[repeat(6,minmax(36px,1fr))] gap-2">
                {PRICES.map((price, index) => {
                  const isScan = index === step.index;
                  const isBuy = index === step.minIndex;
                  const isSell = index === step.sellIndex;
                  const isScanned = scannedSet.has(index);
                  return (
                    <div
                      key={`${index}-${price}`}
                      className={`relative flex min-h-20 flex-col items-center justify-center rounded-control border font-mono transition-all ${
                        isScan
                          ? "border-accent bg-accent/10 text-accent"
                          : isBuy
                            ? "border-warning/70 bg-warning/10 text-warning"
                            : isSell
                              ? "border-success/70 bg-success/10 text-success"
                              : isScanned
                                ? "border-border bg-bg text-primary"
                                : "border-border bg-bg text-secondary opacity-45"
                      }`}
                    >
                      {isScan ? (
                        <span className="absolute -top-5 text-[10px] font-bold uppercase text-accent">
                          scan
                        </span>
                      ) : null}
                      <span className="text-lg font-bold">{price}</span>
                      <span className="text-[10px] font-semibold text-secondary">
                        {isBuy ? "buy" : isSell ? "sell" : "price"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <StateCard label="minPrice" value={String(step.minPrice)} />
                <StateCard label="today profit" value={String(step.profit)} />
                <StateCard label="best" value={String(step.best)} />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                profit judgment
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-mono text-lg font-bold text-accent">
                  {step.price} - {step.minPrice} = {step.profit}
                </p>
                <p className="rounded-control border border-success px-2 py-1 text-xs font-semibold text-success">
                  {step.decision}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-primary">
                {step.proof}
              </p>
              <p className="mt-2 text-sm font-semibold text-accent">
                {step.action}
              </p>
            </section>

            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                pseudo code cursor
              </p>
              <ol className="mt-3 space-y-1 font-mono text-xs leading-6">
                {CODE_LINES.map((line, index) => (
                  <li
                    key={line}
                    className={`grid grid-cols-[24px_minmax(0,1fr)] rounded-control px-2 ${
                      index === step.codeLine
                        ? "bg-accent/10 text-accent"
                        : "text-secondary"
                    }`}
                  >
                    <span>{index + 1}</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                interview trap
              </p>
              <div className="mt-3 grid gap-2 text-sm leading-6">
                <p className="text-primary">
                  best 初始化为 0，不能在全递减价格中返回负利润。
                </p>
                <p className="text-secondary">
                  只能先买后卖，所以 minPrice 必须来自当前日之前或当前扫描历史。
                </p>
              </div>
            </section>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="rounded-control border border-border bg-bg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-35"
              >
                上一步
              </button>
              <span className="font-mono text-xs text-secondary">
                {currentStep + 1} / {STEPS.length}
              </span>
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === STEPS.length - 1}
                className="rounded-control border border-border bg-bg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-35"
              >
                下一步
              </button>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面试白板法：扫描到每一天时，只需要历史最低买入价和当前卖出价差。
      </figcaption>
    </figure>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-bg p-3 text-center">
      <p className="text-xs font-semibold text-secondary">{label}</p>
      <p className="mt-1 font-mono text-lg font-bold text-primary">{value}</p>
    </div>
  );
}
