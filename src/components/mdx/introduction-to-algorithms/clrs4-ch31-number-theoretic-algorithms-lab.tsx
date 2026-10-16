"use client";

import { useMemo, useState } from "react";

type Division = {
  a: bigint;
  b: bigint;
  q: bigint;
  r: bigint;
  x: bigint;
  y: bigint;
  gcdX: bigint;
  gcdY: bigint;
};

function euclidTrace(inputA: bigint, inputB: bigint): Division[] {
  let a = inputA;
  let b = inputB;
  let ax = BigInt(1);
  let ay = BigInt(0);
  let bx = BigInt(0);
  let by = BigInt(1);
  const rows: Division[] = [];

  while (b !== BigInt(0)) {
    const q = a / b;
    const r = a % b;
    rows.push({
      a,
      b,
      q,
      r,
      x: ax - q * bx,
      y: ay - q * by,
      gcdX: bx,
      gcdY: by,
    });
    [a, b] = [b, r];
    [ax, bx] = [bx, ax - q * bx];
    [ay, by] = [by, ay - q * by];
  }
  return rows;
}

function fmt(value: bigint): string {
  return value.toString();
}

export function Clrs4Chapter31NumberTheoreticAlgorithmsLab() {
  const [aText, setAText] = useState("252");
  const [bText, setBText] = useState("105");
  const [visibleRows, setVisibleRows] = useState(1);
  const [error, setError] = useState("");

  const parsed = useMemo(() => {
    if (!/^\d{1,9}$/.test(aText) || !/^\d{1,9}$/.test(bText)) return null;
    const a = BigInt(aText);
    const b = BigInt(bText);
    return a > BigInt(0) && b > BigInt(0) ? { a, b } : null;
  }, [aText, bText]);
  const rows = parsed ? euclidTrace(parsed.a, parsed.b) : [];
  const shown = rows.slice(0, visibleRows);
  const complete = parsed !== null && visibleRows >= rows.length;
  const last = rows.at(-1);
  const gcd = last?.b ?? BigInt(0);
  const certificateX = last?.gcdX ?? BigInt(0);
  const certificateY = last?.gcdY ?? BigInt(0);

  function updateInput(which: "a" | "b", value: string) {
    if (!/^\d{0,9}$/.test(value)) return;
    if (which === "a") setAText(value);
    else setBText(value);
    setVisibleRows(1);
    setError("");
  }

  function revealPrevious() {
    setVisibleRows((current) => Math.max(1, current - 1));
  }

  function reset() {
    setAText("252");
    setBText("105");
    setVisibleRows(1);
    setError("");
  }

  function revealNext() {
    if (!parsed) {
      setError("请输入两个 1 到 999,999,999 之间的正整数。");
      return;
    }
    setVisibleRows((current) => Math.min(current + 1, rows.length));
  }

  const svgRows = shown.slice(0, 4);

  return (
    <figure
      className="not-prose my-8 rounded-card border border-border bg-bg-elevated p-4 sm:p-6"
      data-headful-lab="chapter-31-number-theory"
      data-visual-kind="euclid-remainder-ladder-bezout-certificate"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Euclid invariant · Bézout certificate
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            余数为什么越变越小，gcd 却不变？
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            每行执行 a = q·b + r，再把 (a,b) 换成 (b,r)。同时追踪 r = x·输入 a +
            y·输入 b；末行余数为 0 时，前一行的系数就是可代回验证的 Bézout
            证书。
          </p>
        </div>
        <span
          className="rounded-full border border-border px-3 py-1 text-xs text-secondary"
          aria-live="polite"
          role="status"
        >
          {parsed ? `${shown.length} / ${rows.length} 次除法` : "等待有效输入"}
        </span>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <section
          aria-label="欧几里得算法输入和状态"
          className="min-w-0 space-y-4"
        >
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="min-w-0 text-sm font-medium text-primary">
              输入 a
              <input
                aria-label="输入 a，正整数"
                className="mt-1 min-h-11 min-w-0 w-full rounded-control border border-border bg-bg px-3 text-base text-primary"
                inputMode="numeric"
                maxLength={9}
                onChange={(event) => updateInput("a", event.target.value)}
                type="text"
                value={aText}
              />
            </label>
            <label className="min-w-0 text-sm font-medium text-primary">
              输入 b
              <input
                aria-label="输入 b，正整数"
                className="mt-1 min-h-11 min-w-0 w-full rounded-control border border-border bg-bg px-3 text-base text-primary"
                inputMode="numeric"
                maxLength={9}
                onChange={(event) => updateInput("b", event.target.value)}
                type="text"
                value={bText}
              />
            </label>
          </div>
          {error && (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          {!parsed && (
            <p className="text-sm text-danger" role="status">
              请输入两个不同时为零的正整数，最多 9 位。
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              className="min-h-11 rounded-control border border-border px-4 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!parsed || visibleRows <= 1}
              onClick={revealPrevious}
              type="button"
            >
              收起上一行
            </button>
            <button
              className="min-h-11 rounded-control bg-accent px-4 text-sm font-semibold text-on-accent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!parsed || complete}
              onClick={revealNext}
              type="button"
            >
              展开下一次除法
            </button>
            <button
              className="min-h-11 rounded-control border border-border px-4 text-sm font-medium text-primary"
              onClick={reset}
              type="button"
            >
              重置为 252, 105
            </button>
          </div>

          <div className="overflow-x-auto rounded-card border border-border">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <caption className="sr-only">
                逐步执行 Euclid 算法和扩展 Euclid 系数更新
              </caption>
              <thead className="bg-bg text-xs text-secondary">
                <tr>
                  <th className="p-2">步</th>
                  <th className="p-2">除法</th>
                  <th className="p-2">商 q</th>
                  <th className="p-2">余数 r</th>
                  <th className="p-2">r = x·a + y·b</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row, index) => (
                  <tr
                    className="border-t border-border"
                    key={`${row.a}-${row.b}`}
                  >
                    <th className="p-2 font-medium text-secondary" scope="row">
                      {index + 1}
                    </th>
                    <td className="p-2 font-mono text-primary">
                      {fmt(row.a)} = {fmt(row.q)}·{fmt(row.b)} + {fmt(row.r)}
                    </td>
                    <td className="p-2 font-mono text-primary">{fmt(row.q)}</td>
                    <td className="p-2 font-mono font-semibold text-accent">
                      {fmt(row.r)}
                    </td>
                    <td className="p-2 font-mono text-primary">
                      {fmt(row.x)}·a {row.y < BigInt(0) ? "−" : "+"}{" "}
                      {fmt(row.y < BigInt(0) ? -row.y : row.y)}·b
                    </td>
                  </tr>
                ))}
                {shown.length === 0 && (
                  <tr>
                    <td className="p-3 text-secondary" colSpan={5}>
                      输入有效正整数后显示余数链。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-label="余数链结构图和 Bézout 验证" className="min-w-0">
          <div className="overflow-x-auto rounded-card border border-border bg-bg p-2">
            <svg
              aria-labelledby="euclid-title euclid-desc"
              className="block h-auto min-w-[380px] w-full"
              role="img"
              viewBox="0 0 380 340"
            >
              <title id="euclid-title">Euclid 余数阶梯与系数递推</title>
              <desc id="euclid-desc">
                每一步的除数成为下一步被除数，余数成为下一步除数；余数严格下降至零。
              </desc>
              <defs>
                <marker
                  id="euclid-arrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
                </marker>
              </defs>
              {svgRows.map((row, index) => {
                const y = 12 + index * 80;
                return (
                  <g key={`${row.a}-${row.b}-diagram`}>
                    <rect
                      x="8"
                      y={y}
                      width="364"
                      height="64"
                      rx="10"
                      fill="var(--bg-elevated)"
                      stroke="var(--border)"
                    />
                    <text
                      x="22"
                      y={y + 22}
                      fontSize="14"
                      fill="var(--text-secondary)"
                    >{`第 ${index + 1} 步`}</text>
                    <text
                      x="22"
                      y={y + 49}
                      fontSize="13"
                      fontWeight="600"
                      fill="var(--text-primary)"
                    >{`${fmt(row.a)} = ${fmt(row.q)} × ${fmt(row.b)} + ${fmt(row.r)}`}</text>
                    <text
                      x="355"
                      y={y + 22}
                      textAnchor="end"
                      fontSize="13"
                      fill="var(--accent)"
                    >{`r=${fmt(row.r)} < ${fmt(row.b)}`}</text>
                    {index < svgRows.length - 1 && (
                      <path
                        d={`M190 ${y + 65} V ${y + 75}`}
                        fill="none"
                        markerEnd="url(#euclid-arrow)"
                        stroke="var(--accent)"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                );
              })}
              {shown.length > 4 && (
                <text
                  x="190"
                  y="334"
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-secondary)"
                >{`表格中另有 ${shown.length - 4} 步；图仅聚焦前四步`}</text>
              )}
            </svg>
          </div>
          <div
            className="mt-3 rounded-card border border-border p-4"
            aria-live="polite"
          >
            {complete && parsed ? (
              <>
                <p className="text-sm font-semibold text-success">
                  终止：gcd({fmt(parsed.a)}, {fmt(parsed.b)}) = {fmt(gcd)}
                </p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  {fmt(parsed.a)} × ({fmt(certificateX)}) + {fmt(parsed.b)} × (
                  {fmt(certificateY)}) = {fmt(gcd)}
                </p>
                <p className="mt-2 text-sm text-secondary">
                  检查证书：
                  {fmt(parsed.a * certificateX + parsed.b * certificateY)} =
                  gcd；最后一次非零余数就是 gcd。
                </p>
              </>
            ) : (
              <p className="text-sm text-secondary">
                每次除法都保持 gcd 不变：整除 (a,b) 等价于整除
                (b,a−qb)=(b,r)。展开到余数 0 后，才能读出 gcd 与证书。
              </p>
            )}
          </div>
        </section>
      </div>
      <figcaption className="mt-3 text-center text-sm leading-6 text-secondary">
        预测下一行的商与余数，再逐行展开。余数递减保证终止；系数递推把每个余数表示为原始输入的线性组合，因而最终结果可独立验算。
      </figcaption>
    </figure>
  );
}
