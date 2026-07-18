"use client";

import { useMemo, useState } from "react";

type Mode = "packet" | "state" | "evidence";

interface Stage {
  label: string;
  detail: string;
}
interface Props {
  title: string;
  focus: string;
  invariant: string;
  failure: string;
  stages: Stage[];
  gates: string[];
  mode: Mode;
}

const modeNames: Record<Mode, string> = {
  packet: "数据报解码",
  state: "状态机推演",
  evidence: "证据审计",
};

export function Tip2ProtocolWorkbench({
  title,
  focus,
  invariant,
  failure,
  stages,
  gates,
  mode,
}: Props) {
  const [activeStage, setActiveStage] = useState(0);
  const [fault, setFault] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  const completed = checked.filter(Boolean).length;
  const packet = useMemo(
    () =>
      fault
        ? [
            "45",
            "00",
            "00",
            "3c",
            "1a",
            "2b",
            "00",
            "00",
            "01",
            "06",
            "00",
            "00",
          ]
        : [
            "45",
            "00",
            "00",
            "3c",
            "1a",
            "2b",
            "40",
            "00",
            "40",
            "06",
            "9c",
            "51",
          ],
    [fault],
  );

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-zinc-100 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {modeNames[mode]}
            </p>
            <h3 className="text-base font-semibold">{title}</h3>
          </div>
          <button
            type="button"
            onClick={() => setFault((value) => !value)}
            className={`min-h-9 rounded border px-3 py-1.5 text-sm font-medium ${fault ? "border-rose-600 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200" : "border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"}`}
          >
            {fault ? "恢复基线报文" : "注入单变量故障"}
          </button>
        </div>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{focus}</p>
      </header>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <div
            className="grid grid-cols-5 gap-1"
            role="tablist"
            aria-label="协议证据阶段"
          >
            {stages.map((stage, index) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => setActiveStage(index)}
                className={`min-h-10 border px-1 py-2 text-xs font-medium ${activeStage === index ? "border-emerald-600 bg-emerald-600 text-white" : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"}`}
              >
                {stage.label}
              </button>
            ))}
          </div>
          <div className="mt-3 min-h-24 border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-xs font-semibold text-zinc-500">
              阶段 {activeStage + 1} / {stages.length}
            </p>
            <p className="mt-1 text-sm font-semibold">
              {stages[activeStage].label}
            </p>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
              {stages[activeStage].detail}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1 font-mono text-xs">
            {packet.map((byte, index) => (
              <div
                key={index}
                className={`border p-2 text-center ${fault && (index === 6 || index === 8) ? "border-rose-500 bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-100" : "border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"}`}
              >
                <span className="block text-[10px] text-zinc-500">
                  +{index.toString(16).padStart(2, "0")}
                </span>
                {byte}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <div
            className={`border-l-4 p-3 text-sm ${fault ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-emerald-600 bg-emerald-50 dark:bg-emerald-950"}`}
          >
            <p className="font-semibold">
              {fault ? "反例已出现" : "协议不变量"}
            </p>
            <p className="mt-1">{fault ? failure : invariant}</p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>证据门</span>
            <span>
              {completed} / {gates.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${(completed / gates.length) * 100}%` }}
            />
          </div>
          <div className="mt-3 space-y-2">
            {gates.map((gate, index) => (
              <label
                key={gate}
                className="flex cursor-pointer items-start gap-2 border border-zinc-200 p-2 text-xs dark:border-zinc-800"
              >
                <input
                  type="checkbox"
                  checked={checked[index]}
                  onChange={() =>
                    setChecked((current) =>
                      current.map((value, gateIndex) =>
                        gateIndex === index ? !value : value,
                      ),
                    )
                  }
                  className="mt-0.5"
                />
                <span>{gate}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
