"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-26-balance-resources";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const ownerships = {
  scattered: {
    label: "分散清理",
    code: "openInput(); openTemp(); pool.acquire(); try { transform() } catch { return }",
    resources: [
      [
        "input fd=41",
        "openInput()",
        "成功路径末尾 close",
        "异常 return 时泄漏",
        c.danger,
      ],
      [
        "thumb.tmp",
        "openTemp()",
        "调用者“稍后”删除",
        "异常留下半文件",
        c.danger,
      ],
      [
        "db conn=7",
        "pool.acquire()",
        "另一个 helper release",
        "helper 未调用时占住",
        c.danger,
      ],
    ],
    verdict:
      "所有权跨多个函数和分支，错误处理者无法知道当前究竟取得了哪些资源。",
    color: c.danger,
  },
  scoped: {
    label: "作用域所有权",
    code: "using input; using temp; transform(); using conn { commit(temp) }",
    resources: [
      [
        "input fd=41",
        "using input",
        "离开 decode scope close",
        "异常自动 close",
        c.success,
      ],
      [
        "thumb.tmp",
        "TempFile owner",
        "rename 后 relinquish",
        "异常 unlink",
        c.success,
      ],
      [
        "db conn=7",
        "using conn",
        "commit scope 结束 release",
        "异常 rollback+release",
        c.success,
      ],
    ],
    verdict: "取得与释放写在同一词法/对象作用域；移交必须显式改变 owner。",
    color: c.success,
  },
} as const;
type OwnershipId = keyof typeof ownerships;

export function Tpp20Topic26BalanceResourcesSystemLab() {
  const [id, setId] = useState<OwnershipId>("scattered");
  const ownership = ownerships[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 26 专属解剖图 · 缩略图 worker 的资源账本"
      title="输入句柄、临时文件和连接分别由谁取得、释放与移交？"
      description="切换分散清理与作用域所有权。固定 photo P-42，在同一 transform 异常下检查每个真实资源的 owner 与退出动作。"
      kind="resource-thumbnail-ownership"
      reset={() => setId("scattered")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(ownerships) as OwnershipId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {ownerships[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block overflow-x-auto rounded-control border border-border bg-bg p-3 text-xs">
          {ownership.code}
        </code>
        <div className="mt-3 overflow-hidden rounded-control border border-border bg-bg">
          {ownership.resources.map(
            ([resource, acquire, normal, exception, color]) => (
              <div
                key={resource}
                className="grid gap-2 border-b border-border px-3 py-3 last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr_1.2fr]"
              >
                <code className="text-xs" style={{ color }}>
                  {resource}
                </code>
                <span className="text-sm">取：{acquire}</span>
                <span className="text-sm">正常：{normal}</span>
                <strong className="text-sm" style={{ color }}>
                  异常：{exception}
                </strong>
              </div>
            ),
          )}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: ownership.color }}
        >
          {ownership.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const scopes = {
  broad: {
    label: "外层取得 DB 连接",
    timeline: [
      ["0–20 ms", "acquire conn=7", c.warning],
      ["20–820 ms", "读取/解码 24 MB 图片", c.warning],
      ["820–940 ms", "生成缩略图", c.warning],
      ["940–960 ms", "写 metadata；release", c.success],
    ],
    held: "连接占用 960 ms；其中 940 ms 没有数据库操作",
    pool: "10 workers 可同时占满 10 个连接，其他请求等待",
    color: c.danger,
  },
  narrow: {
    label: "最短必要作用域",
    timeline: [
      ["0–800 ms", "读取/解码；无 DB conn", c.success],
      ["800–920 ms", "生成缩略图；无 DB conn", c.success],
      ["920 ms", "acquire conn=7", c.accent],
      ["920–940 ms", "写 metadata；release", c.success],
    ],
    held: "连接占用 20 ms；资源在第一次使用前才取得",
    pool: "同一连接池可服务更多短事务，失败前也没有无谓占用",
    color: c.success,
  },
  handoff: {
    label: "移交：临时文件变为最终文件",
    timeline: [
      ["create", "TempFile owns thumb.tmp", c.accent],
      ["write", "flush + fsync", c.success],
      ["rename", "thumb.tmp → P-42.webp", c.success],
      ["relinquish", "TempFile 不再 unlink", c.success],
    ],
    held: "所有权只在原子 rename 成功后移交给文件仓库",
    pool: "rename 失败则旧 owner 仍删除 temp；不会同时两边都以为对方负责",
    color: c.accent,
  },
} as const;
type ScopeId = keyof typeof scopes;

export function Tpp20Topic26BalanceResourcesFeedbackLab() {
  const [id, setId] = useState<ScopeId>("broad");
  const scope = scopes[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 26 专属实验 · 作用域决定持有时长"
      title="数据库连接为何要在第一次使用前才取得？"
      description="固定同一次 940 ms 缩略图任务，只改变连接作用域；第三个样本展示临时文件的显式所有权移交。"
      kind="resource-scope-duration"
      reset={() => setId("broad")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(scopes) as ScopeId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {scopes[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {scope.timeline.map(([time, action, color]) => (
            <div
              key={time}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {time}
              </code>
              <strong className="mt-2 block text-sm leading-5">{action}</strong>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border border-border bg-bg p-3 text-xs"
            style={{ color: scope.color }}
          >
            {scope.held}
          </code>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: scope.color }}
          >
            {scope.pool}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const failures = {
  decode: {
    label: "解码抛错",
    acquired: ["input fd=41", "temp=thumb.tmp"],
    notAcquired: ["db connection"],
    cleanup: ["close fd=41", "unlink thumb.tmp"],
    balance: "2 acquired = 2 released；pool unchanged",
    state: "没有 metadata；没有最终图片",
    color: c.warning,
  },
  write: {
    label: "写临时文件失败",
    acquired: ["input fd=41", "temp=thumb.tmp"],
    notAcquired: ["db connection"],
    cleanup: ["close fd=41", "close + unlink thumb.tmp"],
    balance: "2 acquired = 2 released；partial bytes removed",
    state: "磁盘 ENOSPC 上下文被保留",
    color: c.danger,
  },
  commit: {
    label: "DB commit 失败",
    acquired: ["input fd=41", "temp=thumb.tmp", "db conn=7"],
    notAcquired: [],
    cleanup: ["close fd=41", "unlink thumb.tmp", "rollback + release conn=7"],
    balance: "3 acquired = 3 released；transaction rolled back",
    state: "旧 P-42.webp 仍有效；可重放同一 job id",
    color: c.danger,
  },
  success: {
    label: "成功并移交",
    acquired: ["input fd=41", "temp=thumb.tmp", "db conn=7"],
    notAcquired: [],
    cleanup: [
      "close fd=41",
      "rename temp → P-42.webp",
      "commit + release conn=7",
    ],
    balance: "2 released + 1 ownership transfer；无悬空资源",
    state: "metadata 指向已 fsync 的 P-42.webp",
    color: c.success,
  },
} as const;
type FailureId = keyof typeof failures;

export function Tpp20Topic26BalanceResourcesEvidenceLab() {
  const [id, setId] = useState<FailureId>("decode");
  const failure = failures[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 26 专属复核 · 每个抛错点都做资源守恒"
      title="在解码、写文件或 commit 失败时，取得与释放是否仍然平衡？"
      description="选择故障注入点或成功路径。账本区分未取得、已释放和已移交，不能把所有资源笼统写成“finally 清理”。"
      kind="resource-exception-balance"
      reset={() => setId("decode")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(failures) as FailureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {failures[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-control border border-border bg-bg p-3">
            <strong className="text-xs text-secondary">已取得</strong>
            <ul className="mt-2 space-y-1 text-sm">
              {failure.acquired.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-control border border-border bg-bg p-3">
            <strong className="text-xs text-secondary">未取得</strong>
            <ul className="mt-2 space-y-1 text-sm">
              {failure.notAcquired.length ? (
                failure.notAcquired.map((item) => <li key={item}>— {item}</li>)
              ) : (
                <li>无</li>
              )}
            </ul>
          </div>
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: failure.color }}
          >
            <strong className="text-xs" style={{ color: failure.color }}>
              退出动作
            </strong>
            <ul className="mt-2 space-y-1 text-sm">
              {failure.cleanup.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code
            className="rounded-control border border-border bg-bg p-3 text-xs"
            style={{ color: failure.color }}
          >
            {failure.balance}
          </code>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            {failure.state}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}
