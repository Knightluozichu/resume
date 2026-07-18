"use client";

import { useMemo, useState } from "react";

type Mode = "query" | "dialect" | "evidence";
type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};
const dialects = [
  ["PostgreSQL", "LIMIT / FETCH", "双竖线或CONCAT", "函数与过程语法独立核对"],
  ["MySQL/MariaDB", "LIMIT", "CONCAT", "日期、过程与引号行为独立核对"],
  [
    "SQL Server",
    "TOP / OFFSET FETCH",
    "加号或CONCAT",
    "T-SQL过程、游标与事务独立核对",
  ],
  [
    "Oracle",
    "FETCH FIRST",
    "双竖线或CONCAT",
    "PL/SQL过程与空字符串语义独立核对",
  ],
  ["SQLite", "LIMIT", "双竖线", "过程不支持，类型与DDL能力独立核对"],
] as const;
const gates = [
  "版本与样例",
  "结果合同",
  "SQL与参数",
  "NULL和重复",
  "方言差异",
  "失败与回退",
];

export function OfficialSqlTenMinutesLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [dialectIndex, setDialectIndex] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  const progress = useMemo(() => checked.filter(Boolean).length, [checked]);

  if (mode === "query")
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/30">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            查询模型 · {nodeIndex + 1}/{nodes.length}
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-72 md:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1.2fr)]">
          <div className="max-h-80 overflow-auto border-b border-zinc-200 p-3 md:border-b-0 md:border-r dark:border-zinc-800">
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 w-full rounded px-2 py-1.5 text-left text-xs " +
                  (index === nodeIndex
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                }
              >
                {index + 1}. {node}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div>
              <p className="text-xs text-zinc-500">当前目录节点</p>
              <p className="mt-2 font-semibold">{nodes[nodeIndex]}</p>
              <p className="mt-3 text-sm leading-6">{focus}</p>
            </div>
            <div className="grid gap-2 text-xs sm:grid-cols-2">
              <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
                <b>结果不变量</b>
                <p className="mt-1 leading-5">{invariant}</p>
              </div>
              <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
                <b>交付物</b>
                <p className="mt-1 leading-5">{artifact}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  if (mode === "dialect")
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-amber-50 px-4 py-3 dark:border-zinc-800 dark:bg-amber-950/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            DBMS方言对照
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-64 gap-4 p-4 md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)]">
          <div>
            {dialects.map((dialect, index) => (
              <button
                key={dialect[0]}
                type="button"
                onClick={() => setDialectIndex(index)}
                className={
                  "mb-2 w-full rounded border px-3 py-2 text-left text-sm " +
                  (index === dialectIndex
                    ? "border-amber-600 bg-amber-100 dark:bg-amber-950/50"
                    : "border-zinc-200 dark:border-zinc-800")
                }
              >
                {dialect[0]}
              </button>
            ))}
          </div>
          <div className="rounded border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-lg font-semibold">{dialects[dialectIndex][0]}</p>
            <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>限制结果</b>
                <p className="mt-1">{dialects[dialectIndex][1]}</p>
              </div>
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>字符串拼接</b>
                <p className="mt-1">{dialects[dialectIndex][2]}</p>
              </div>
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>专属核对</b>
                <p className="mt-1">{dialects[dialectIndex][3]}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6">
              保持样例数据和预期结果不变，只替换当前方言实现。
            </p>
          </div>
        </div>
      </section>
    );

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-sky-50 px-4 py-3 dark:border-zinc-800 dark:bg-sky-950/30">
        <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
          证据门 · {progress}/{gates.length}
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
      </header>
      <div className="grid min-h-64 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {gates.map((gate, index) => (
          <label
            key={gate}
            className={
              "flex cursor-pointer items-start gap-3 rounded border p-4 " +
              (checked[index]
                ? "border-sky-600 bg-sky-50 dark:bg-sky-950/30"
                : "border-zinc-200 dark:border-zinc-800")
            }
          >
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() =>
                setChecked((old) =>
                  old.map((value, i) => (i === index ? !value : value)),
                )
              }
              className="mt-1 size-4"
            />
            <span>
              <b className="text-sm">{gate}</b>
              <span className="mt-1 block text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {checked[index] ? "证据已登记" : "尚缺可重放产物"}
              </span>
            </span>
          </label>
        ))}
      </div>
      <footer className="border-t border-zinc-200 px-4 py-3 text-xs dark:border-zinc-800">
        {progress === gates.length
          ? "证据齐全：可交付" + artifact
          : "未通过：补齐全部证据后再交付"}
      </footer>
    </section>
  );
}
