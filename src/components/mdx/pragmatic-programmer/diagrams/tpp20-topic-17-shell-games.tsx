"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-17-shell-games";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const pipelines = {
  fragile: {
    label: "脆弱：按空白拆文件名",
    command: "for f in $(find receipts -name '*.csv'); do gzip $f; done",
    input: [
      "receipts/July.csv",
      "receipts/August final.csv",
      "receipts/refund\nmanual.csv",
    ],
    tokens: [
      "receipts/July.csv",
      "receipts/August",
      "final.csv",
      "receipts/refund",
      "manual.csv",
    ],
    output: "1 个成功；4 个“文件不存在”",
    reason: "命令替换和未引用变量把文件名当成由空白分隔的单词。",
    color: c.danger,
  },
  safe: {
    label: "稳健：NUL 分隔 + 引号",
    command: "find receipts -name '*.csv' -print0 | xargs -0 -n1 gzip --",
    input: [
      "receipts/July.csv",
      "receipts/August final.csv",
      "receipts/refund\nmanual.csv",
    ],
    tokens: [
      "receipts/July.csv",
      "receipts/August final.csv",
      "receipts/refund\nmanual.csv",
    ],
    output: "3 个输入 → 3 个 .gz；身份逐一保持",
    reason: "生产者和消费者显式约定 NUL 边界，`--` 阻止文件名被解释成选项。",
    color: c.success,
  },
} as const;
type PipelineId = keyof typeof pipelines;

export function Tpp20Topic17ShellGamesSystemLab() {
  const [id, setId] = useState<PipelineId>("fragile");
  const pipeline = pipelines[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 17 专属解剖图 · 文件名不是单词列表"
      title="含空格和换行的收据文件，在哪一步被错误拆开？"
      description="固定三个合法 POSIX 文件名，只改变管道的记录边界。上层展示真实输入，下层展示压缩程序实际收到的 argv。"
      kind="shell-filename-record-boundary"
      reset={() => setId("fragile")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(pipelines) as PipelineId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {pipelines[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block overflow-x-auto rounded-control border border-border bg-bg p-3 text-xs leading-6">
          {pipeline.command}
        </code>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-3">
            <strong className="text-xs text-secondary">
              目录中的 3 个文件
            </strong>
            <div className="mt-2 space-y-2">
              {pipeline.input.map((file) => (
                <code
                  key={file}
                  className="block whitespace-pre-wrap rounded bg-elevated px-2 py-1 text-xs"
                >
                  {file.replace("\n", "↵\n")}
                </code>
              ))}
            </div>
          </div>
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: pipeline.color }}
          >
            <strong className="text-xs" style={{ color: pipeline.color }}>
              gzip 实际收到的 argv
            </strong>
            <div className="mt-2 space-y-2">
              {pipeline.tokens.map((token, index) => (
                <code
                  key={`${token}-${index}`}
                  className="block whitespace-pre-wrap rounded bg-elevated px-2 py-1 text-xs"
                >
                  argv[{index + 1}] = {token.replace("\n", "↵\n")}
                </code>
              ))}
            </div>
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: pipeline.color }}
        >
          <strong>{pipeline.output}。</strong> {pipeline.reason}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const pipeRuns = {
  hidden: {
    label: "默认管道：只返回最后命令",
    settings: "set +o pipefail",
    stages: [
      ["download", "curl: HTTP 503", "exit 22", c.danger],
      ["decompress", "空输入", "exit 0", c.warning],
      ["import", "导入 0 行", "exit 0", c.warning],
    ],
    shellExit: "0",
    decision: "流水线显示绿色，但没有订单进入数据库。",
    color: c.danger,
  },
  pipefail: {
    label: "pipefail：首个失败传出",
    settings: "set -euo pipefail",
    stages: [
      ["download", "curl: HTTP 503", "exit 22", c.danger],
      ["decompress", "不再执行", "—", c.warning],
      ["import", "不再执行", "—", c.warning],
    ],
    shellExit: "22",
    decision: "任务停在下载边界，保留 URL、时间和 stderr，可安全重试。",
    color: c.warning,
  },
  recovered: {
    label: "恢复：成功输入完整传递",
    settings: "set -euo pipefail",
    stages: [
      ["download", "orders.csv.gz sha256 31a…", "exit 0", c.success],
      ["decompress", "orders.csv 2,418 行", "exit 0", c.success],
      ["import", "upsert 2,418 行", "exit 0", c.success],
    ],
    shellExit: "0",
    decision:
      "每段输出身份与退出码进入运行记录，成功不再只是最后一段没有报错。",
    color: c.success,
  },
} as const;
type PipeRunId = keyof typeof pipeRuns;

export function Tpp20Topic17ShellGamesFeedbackLab() {
  const [id, setId] = useState<PipeRunId>("hidden");
  const run = pipeRuns[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 17 专属实验 · 管道的失败语义"
      title="下载返回 503 时，为什么最后的 import 仍可能显示成功？"
      description="固定同一次订单导入，只改变 Shell 的管道失败合同。每段记录真实 stderr、退出码和是否继续执行。"
      kind="shell-pipefail-exit-propagation"
      reset={() => setId("hidden")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(pipeRuns) as PipeRunId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {pipeRuns[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          {run.settings}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {run.stages.map(([command, evidence, status], index) => (
            <div
              key={command}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: run.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: run.color }}
              >
                {index + 1}. {command}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {evidence}
              </strong>
              <code className="mt-2 block text-xs text-secondary">
                {status}
              </code>
              {index < 2 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: run.color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: run.color }}
        >
          Shell exit = <code style={{ color: run.color }}>{run.shellExit}</code>
          ；{run.decision}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const replays = {
  append: {
    label: "非幂等：每次 INSERT",
    first: "运行 1：新增 2,418 行",
    second: "运行 2：再新增 2,418 行",
    count: "orders = 4,836",
    check: "同一 order_id 出现两次",
    verdict: "脚本重试改变了业务结果；失败恢复必须先人工清理。",
    color: c.danger,
  },
  upsert: {
    label: "幂等：按 order_id upsert",
    first: "运行 1：insert 2,418",
    second: "运行 2：unchanged 2,418",
    count: "orders = 2,418",
    check: "输出哈希与第一次一致",
    verdict: "相同输入重复运行得到相同数据库状态，恢复可以直接重放。",
    color: c.success,
  },
  changedInput: {
    label: "新输入：身份不同才更新",
    first: "输入 sha256 31a…：2,418 行",
    second: "输入 sha256 88c…：新增 12、更新 4",
    count: "orders = 2,430",
    check: "记录两个输入哈希和 16 个差异",
    verdict: "幂等不等于忽略变化；输入身份改变时，差异必须显式。",
    color: c.accent,
  },
} as const;
type ReplayId = keyof typeof replays;

export function Tpp20Topic17ShellGamesEvidenceLab() {
  const [id, setId] = useState<ReplayId>("append");
  const replay = replays[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 17 专属复核 · 用同一输入重放脚本"
      title="脚本第二次运行后，数据库状态是否仍与第一次相同？"
      description="比较追加、upsert 与真实新输入。复核固定输入哈希、order_id 主键、两次运行摘要和最终行数。"
      kind="shell-idempotent-replay"
      reset={() => setId("append")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(replays) as ReplayId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {replays[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: replay.color }}
          >
            <span className="text-xs font-semibold text-secondary">第一次</span>
            <strong
              className="mt-2 block text-sm"
              style={{ color: replay.color }}
            >
              {replay.first}
            </strong>
          </div>
          <div
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: replay.color }}
          >
            <span className="text-xs font-semibold text-secondary">第二次</span>
            <strong
              className="mt-2 block text-sm"
              style={{ color: replay.color }}
            >
              {replay.second}
            </strong>
          </div>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-sm">
            {replay.count}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-sm">
            {replay.check}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: replay.color }}
        >
          {replay.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
