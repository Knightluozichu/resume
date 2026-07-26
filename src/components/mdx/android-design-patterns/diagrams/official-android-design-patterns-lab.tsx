"use client";

import { useMemo, useState } from "react";

type Pattern = { label: string; mechanism: string; evidence: string };

type Props = {
  unitTitle: string;
  focus: string;
  nodes: string[];
  invariant: string;
  failure: string;
  patterns: Pattern[];
  gates: string[];
  mode: "architecture" | "counterexample" | "evidence";
};

const shell =
  "border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950";

export function AndroidDesignPatternsLab(props: Props) {
  const { unitTitle, focus, nodes, invariant, failure, patterns, gates, mode } =
    props;
  const [selected, setSelected] = useState(0);
  const [teamSize, setTeamSize] = useState(6);
  const [changeRate, setChangeRate] = useState(4);
  const [lifecycleFault, setLifecycleFault] = useState(true);
  const [checked, setChecked] = useState(() => gates.map(() => false));
  function resetExperiment() {
    setSelected(0);
    setTeamSize(6);
    setChangeRate(4);
    setLifecycleFault(true);
    setChecked(() => gates.map(() => false));
  }

  const result = useMemo(() => {
    const boundaryLoad = Math.round((teamSize * changeRate) / 3);
    const hiddenStateRisk = boundaryLoad + (lifecycleFault ? 18 : 3);
    return { boundaryLoad, hiddenStateRisk };
  }, [teamSize, changeRate, lifecycleFault]);

  if (mode === "architecture") {
    const active = patterns[selected] ?? patterns[0];
    return (
      <section className={shell + " p-4"} aria-label={unitTitle + "架构责任图"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          2018架构责任图
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
          {focus}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {patterns.map((pattern, index) => (
            <button
              key={pattern.label}
              type="button"
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={
                "min-h-11 border px-3 py-2 text-left text-xs font-semibold " +
                (selected === index
                  ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-zinc-300 dark:border-zinc-700")
              }
            >
              {pattern.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1.25fr]">
          <div className="border border-sky-300 bg-sky-50 p-3 dark:border-sky-800 dark:bg-sky-950/20">
            <strong className="text-sm">{active.label}</strong>
            <p className="mt-2 text-xs leading-5">
              <b>机制：</b>
              {active.mechanism}
            </p>
            <p className="mt-1 text-xs leading-5">
              <b>证据：</b>
              {active.evidence}
            </p>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {nodes.slice(0, 8).map((node, index) => (
              <li
                key={node}
                className="min-h-12 border border-zinc-300 p-2 text-xs leading-5 dark:border-zinc-700"
              >
                <span className="mr-2 font-semibold text-emerald-700 dark:text-emerald-300">
                  {index + 1}
                </span>
                {node}
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 border-l-4 border-emerald-600 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/20">
          <b>验收：</b>
          {invariant}
        </p>
      </section>
    );
  }

  if (mode === "counterexample") {
    return (
      <section className={shell + " p-4"} aria-label={unitTitle + "反例实验"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
          单变量反例实验
        </p>
        <h3 className="mt-1 text-base font-semibold">边界压力与隐藏状态</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-semibold">
            团队人数：{teamSize}
            <input
              className="mt-2 w-full accent-rose-600"
              type="range"
              min={2}
              max={24}
              value={teamSize}
              onChange={(event) => setTeamSize(Number(event.target.value))}
            />
          </label>
          <label className="text-xs font-semibold">
            每周变化批次：{changeRate}
            <input
              className="mt-2 w-full accent-amber-600"
              type="range"
              min={1}
              max={12}
              value={changeRate}
              onChange={(event) => setChangeRate(Number(event.target.value))}
            />
          </label>
        </div>
        <label className="mt-4 flex min-h-11 items-center gap-2 text-xs font-semibold">
          <input
            type="checkbox"
            checked={lifecycleFault}
            onChange={(event) => setLifecycleFault(event.target.checked)}
          />
          注入旋转后的迟到回调
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="border border-amber-400 bg-amber-50 p-3 dark:bg-amber-950/20">
            <strong className="block text-lg">{result.boundaryLoad}</strong>
            <span className="text-xs">边界协作负载</span>
          </div>
          <div
            className={
              "border p-3 " +
              (result.hiddenStateRisk >= 30
                ? "border-rose-600 bg-rose-50 dark:bg-rose-950/20"
                : "border-sky-500 bg-sky-50 dark:bg-sky-950/20")
            }
          >
            <strong className="block text-lg">{result.hiddenStateRisk}</strong>
            <span className="text-xs">隐藏状态风险</span>
          </div>
        </div>
        <p className="mt-4 border-l-4 border-rose-600 bg-rose-50 p-3 text-xs leading-5 dark:bg-rose-950/20">
          <b>反例：</b>
          {failure}
          <br />
          <b>实验纪律：</b>
          固定业务输入，只改变一个滑杆或故障开关，再保存状态轨迹。
        </p>
      </section>
    );
  }

  const complete = checked.filter(Boolean).length;
  return (
    <section className={shell + " p-4"} aria-label={unitTitle + "证据门"}>
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
        独立证据门
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold">{unitTitle}</h3>
        <span className="text-xs font-semibold">
          {complete}/{gates.length}
        </span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {gates.map((gate, index) => (
          <label
            key={gate}
            className={
              "flex min-h-12 items-center gap-3 border p-3 text-xs " +
              (checked[index]
                ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                : "border-zinc-300 dark:border-zinc-700")
            }
          >
            <input
              type="checkbox"
              checked={checked[index] ?? false}
              onChange={(event) =>
                setChecked((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? event.target.checked : item,
                  ),
                )
              }
            />
            {gate}
          </label>
        ))}
      </div>
      <p className="mt-4 border-l-4 border-sky-600 bg-sky-50 p-3 text-xs leading-5 dark:bg-sky-950/20">
        {complete === gates.length
          ? "证据齐全，可以交给另一位读者独立复核。"
          : "结论暂不通过：仍缺少可复核证据。"}
        <br />
        {invariant}
      </p>
    </section>
  );
}
