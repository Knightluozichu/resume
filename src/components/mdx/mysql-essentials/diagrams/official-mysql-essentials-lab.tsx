"use client";

import { useMemo, useState } from "react";

type LabMode = "model" | "experiment" | "evidence";
type Props = {
  mode: LabMode;
  unitTitle: string;
  part: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};

const failures = [
  ["正常样本", "预期操作成功，结果和影响行数与模型一致"],
  ["NULL与边界值", "检查值域、三值逻辑、默认值和约束拒绝"],
  ["重复与孤立引用", "检查唯一性、主外键与补偿路径"],
  ["低权限账户", "预期越权操作被拒绝并留下可定位错误"],
  ["两个并发会话", "检查锁等待、隔离可见性、死锁或重试"],
  ["重启与恢复", "检查持久性、日志坐标和恢复后对账"],
] as const;

const evidenceItems = [
  "版本与会话",
  "定义与元数据",
  "SQL与参数",
  "结果与影响行数",
  "失败与错误码",
  "恢复与迁移",
];

export function OfficialMysqlEssentialsLab({
  mode,
  unitTitle,
  part,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const [selected, setSelected] = useState(0);
  const [failure, setFailure] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    evidenceItems.map(() => false),
  );
  const progress = useMemo(() => checked.filter(Boolean).length, [checked]);

  if (mode === "model") {
    const node = nodes[selected] ?? nodes[0];
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-emerald-50 px-4 py-3 dark:border-zinc-800 dark:bg-emerald-950/30">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            模型视图 · {part}
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-72 gap-0 md:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1.2fr)]">
          <div className="max-h-80 overflow-auto border-b border-zinc-200 p-3 md:border-b-0 md:border-r dark:border-zinc-800">
            {nodes.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelected(index)}
                className={`mb-1 w-full rounded px-2 py-1.5 text-left text-xs ${index === selected ? "bg-emerald-600 text-white" : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"}`}
              >
                {index + 1}. {item}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-4 p-5">
            <div>
              <p className="text-xs text-zinc-500">
                当前节点 {selected + 1}/{nodes.length}
              </p>
              <p className="mt-2 font-semibold">{node}</p>
              <p className="mt-3 text-sm leading-6">主线：{focus}</p>
            </div>
            <div className="grid gap-2 text-xs sm:grid-cols-2">
              <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
                <b>不变量</b>
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
  }

  if (mode === "experiment") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-amber-50 px-4 py-3 dark:border-zinc-800 dark:bg-amber-950/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            故障实验 · 单变量切换
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>
        <div className="grid min-h-64 gap-4 p-4 md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)]">
          <div>
            {failures.map(([label], index) => (
              <button
                key={label}
                type="button"
                onClick={() => setFailure(index)}
                className={`mb-2 w-full rounded border px-3 py-2 text-left text-sm ${index === failure ? "border-amber-600 bg-amber-100 dark:bg-amber-950/50" : "border-zinc-200 dark:border-zinc-800"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="rounded border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs text-zinc-500">
              实验 {failure + 1}/{failures.length}
            </p>
            <p className="mt-2 text-lg font-semibold">{failures[failure][0]}</p>
            <p className="mt-3 text-sm leading-6">{failures[failure][1]}</p>
            <div className="mt-5 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>先预测</b>
                <p className="mt-1">命中行、状态、错误码</p>
              </div>
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>再执行</b>
                <p className="mt-1">一次只改一个条件</p>
              </div>
              <div className="rounded bg-white p-3 dark:bg-zinc-950">
                <b>后恢复</b>
                <p className="mt-1">对账并重放验证</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-sky-50 px-4 py-3 dark:border-zinc-800 dark:bg-sky-950/30">
        <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
          证据门 · {progress}/{evidenceItems.length}
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
      </header>
      <div className="grid min-h-64 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {evidenceItems.map((item, index) => (
          <label
            key={item}
            className={`flex cursor-pointer items-start gap-3 rounded border p-4 ${checked[index] ? "border-sky-600 bg-sky-50 dark:bg-sky-950/30" : "border-zinc-200 dark:border-zinc-800"}`}
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
              <b className="text-sm">{item}</b>
              <span className="mt-1 block text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {checked[index] ? "证据已登记，可继续验收" : "尚缺可重放产物"}
              </span>
            </span>
          </label>
        ))}
      </div>
      <footer className="border-t border-zinc-200 px-4 py-3 text-xs dark:border-zinc-800">
        {progress === evidenceItems.length
          ? `证据齐全：可以交付${artifact}`
          : "未通过：补齐全部证据后再交付"}
      </footer>
    </section>
  );
}
