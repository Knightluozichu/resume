"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Focus = "results" | "activity" | "heroics";
type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  focuses: readonly string[];
  mode: Mode;
};

const modeLabels: Record<Mode, string> = {
  map: "习惯地图",
  experiment: "管理实验",
  evidence: "成果复核",
};
const focusLabels: Record<Focus, string> = {
  results: "成果导向",
  activity: "活动导向",
  heroics: "救火导向",
};

export function OfficialEex19Lab({
  unitId,
  title,
  nodes,
  focuses,
  mode,
}: Props) {
  const [stage, setStage] = useState(2);
  const [timeIntegrity, setTimeIntegrity] = useState(72);
  const [contribution, setContribution] = useState(76);
  const [strengthFit, setStrengthFit] = useState(68);
  const [dissent, setDissent] = useState(62);
  const [focus, setFocus] = useState<Focus>("results");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const orientation =
      focus === "results" ? 16 : focus === "activity" ? -8 : -22;
    const fragmentation = Math.max(0, 58 - timeIntegrity);
    const usableTime = Math.max(
      0,
      Math.min(100, Math.round(timeIntegrity - fragmentation * 0.5)),
    );
    const output = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          contribution * 0.4 +
            strengthFit * 0.32 +
            usableTime * 0.2 +
            orientation,
        ),
      ),
    );
    const decision = Math.max(
      0,
      Math.min(
        100,
        Math.round(dissent * 0.34 + contribution * 0.28 + orientation + 22),
      ),
    );
    const followThrough = Math.max(
      0,
      Math.min(
        100,
        Math.round(output * 0.38 + decision * 0.34 + usableTime * 0.2),
      ),
    );
    const accepted =
      usableTime >= 54 && output >= 58 && decision >= 56 && followThrough >= 56;
    return {
      accepted,
      decision,
      followThrough,
      output,
      trace: runs + 1,
      usableTime,
    };
  }, [contribution, dissent, focus, runs, strengthFit, timeIntegrity]);

  const reset = () => {
    setStage(2);
    setTimeIntegrity(72);
    setContribution(76);
    setStrengthFit(68);
    setDissent(62);
    setFocus("results");
    setRuns(0);
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={title + "有效性实验"}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {unitId + " · " + modeLabels[mode]}
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          title="重置实验"
          aria-label="重置实验"
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <div className="grid grid-cols-5 gap-1" style={{ minHeight: 136 }}>
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setStage(index)}
                className={
                  "min-w-0 border px-1 py-3 text-xs leading-5 " +
                  (index === stage
                    ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                    : index < stage
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950"
                      : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900")
                }
                title={"检查" + node}
              >
                <span className="block font-semibold">{index + 1}</span>
                <span className="block break-words">{node}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["连续时间", timeIntegrity, setTimeIntegrity],
              ["贡献清晰度", contribution, setContribution],
              ["长处匹配度", strengthFit, setStrengthFit],
              ["异议充分度", dissent, setDissent],
            ].map(([label, value, setter]) => (
              <label className="text-sm" key={String(label)}>
                {String(label) + " " + String(value) + "%"}
                <input
                  className="mt-1 w-full accent-blue-600"
                  type="range"
                  min="0"
                  max="100"
                  value={Number(value)}
                  onChange={(event) =>
                    (setter as (next: number) => void)(
                      Number(event.target.value),
                    )
                  }
                />
              </label>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-1"
            role="group"
            aria-label="工作导向"
          >
            {(Object.keys(focusLabels) as Focus[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFocus(key)}
                className={
                  "border px-2 py-2 text-xs font-semibold " +
                  (focus === key
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900")
                }
              >
                {focusLabels[key]}
              </button>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[
              ["可用整块时间", result.usableTime],
              ["贡献产出", result.output],
              ["决策质量", result.decision],
              ["执行兑现", result.followThrough],
            ].map(([label, value]) => (
              <div
                className="border border-zinc-200 p-2 dark:border-zinc-800"
                key={String(label)}
              >
                <dt className="text-zinc-500">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value + "%"}</dd>
              </div>
            ))}
          </dl>
          <div
            className={
              "mt-3 border p-3 text-sm " +
              (result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50")
            }
          >
            <strong>
              {result.accepted ? "有效性门禁通过" : "有效性门禁拒绝"}
            </strong>
            <p className="mt-1 break-words">
              {"首查：" +
                focuses[Math.min(stage, focuses.length - 1)] +
                "；轨迹 #" +
                result.trace}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <span aria-hidden="true">▶</span>
            运行并保存证据
          </button>
        </div>
      </div>
    </section>
  );
}
