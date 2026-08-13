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

type EventKind = "get" | "reject" | "replace";

type Event = {
  id: number;
  kind: EventKind;
  label: string;
  detail: string;
};

function eventTone(kind: EventKind) {
  if (kind === "reject") return "border-warning text-warning";
  if (kind === "replace") return "border-accent text-accent";
  return "border-success text-success";
}

export function SingletonOwnershipBoundaryLab() {
  const [instanceId, setInstanceId] = useState<string | null>(null);
  const [version, setVersion] = useState("prod");
  const [replacement, setReplacement] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const unique = instanceId !== null;
  const currentId = instanceId ?? "尚未创建";
  const currentVersion = replacement ? "test-double" : version;

  function addEvent(kind: EventKind, label: string, detail: string) {
    setEvents((current) => [
      ...current,
      { id: current.length + 1, kind, label, detail },
    ]);
  }

  function requestInstance() {
    if (!instanceId) {
      setInstanceId("config-process-01");
      addEvent("get", "首次创建", "ConfigSnapshot → config-process-01");
      return;
    }
    addEvent("get", "复用实例", `ConfigSnapshot → ${instanceId}`);
  }

  function rejectDirectCreation() {
    addEvent(
      "reject",
      "拒绝直接创建",
      "实例守卫阻止第二份生产配置进入进程",
    );
  }

  function replaceForTest() {
    if (!instanceId) setInstanceId("config-process-01");
    setReplacement(true);
    addEvent("replace", "测试替换", "访问器 → test-double（作用域内）");
  }

  function reset() {
    setInstanceId(null);
    setVersion("prod");
    setReplacement(false);
    setEvents([]);
  }

  return (
    <section
      aria-label="单例模式所有权边界实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="singleton-ownership-boundary-lab"
      data-unit-id="designpatterns-07"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              SINGLETON · OWNERSHIP BOUNDARY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              配置快照唯一所有权台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              在进程作用域内请求、复用、拒绝重复创建，并通过受控入口注入测试替身。
            </p>
          </div>
          <button
            aria-label="重置单例所有权边界实验"
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
                <p className="text-xs font-semibold text-secondary">实例守卫操作</p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2">
                <button
                  className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
                  onClick={requestInstance}
                  type="button"
                >
                  请求实例
                </button>
                <button
                  className="min-h-11 w-full rounded-control border border-warning px-3 py-2 text-left text-xs text-warning transition-colors hover:bg-warning/10"
                  onClick={rejectDirectCreation}
                  type="button"
                >
                  尝试直接创建
                </button>
                <button
                  className="min-h-11 w-full rounded-control border border-border px-3 py-2 text-left text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
                  onClick={replaceForTest}
                  type="button"
                >
                  注入测试替身
                </button>
              </div>
            </div>

            <p className="text-xs leading-5 text-secondary">
              当前模拟作用域：一个进程。唯一性只在这个边界成立；测试替换必须经过实例守卫，不能由业务模块随意写入。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                INSTANCE GUARD · PROCESS SCOPE
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  replacement
                    ? "border-accent text-accent"
                    : unique
                      ? "border-success text-success"
                      : "border-border text-secondary"
                }`}
              >
                {replacement ? "测试替身" : unique ? "唯一实例" : "等待创建"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-control border border-accent p-4">
                <p className="text-xs font-semibold text-accent">当前实例</p>
                <p className="mt-2 break-words font-mono text-sm text-primary">
                  {currentId}
                </p>
                <p className="mt-2 text-xs text-secondary">
                  版本：{currentVersion}
                </p>
                <p className="mt-3 rounded-control border border-accent px-3 py-2 text-xs text-accent">
                  {unique ? "所有客户端共享同一入口" : "还没有实例所有权"}
                </p>
              </div>

              <div className="rounded-control border border-border p-4">
                <p className="text-xs font-semibold text-secondary">访问合同</p>
                <div className="mt-3 space-y-2 text-xs text-primary">
                  <p className="rounded-control border border-border px-3 py-2">
                    创建：实例守卫
                  </p>
                  <p className="rounded-control border border-border px-3 py-2">
                    读取：ConfigClient
                  </p>
                  <p className="rounded-control border border-border px-3 py-2">
                    替换：测试边界
                  </p>
                </div>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                replacement
                  ? "border-accent"
                  : unique
                    ? "border-success"
                    : "border-border"
              }`}
              role="status"
            >
              <p
                className={`text-sm font-semibold ${
                  replacement
                    ? "text-accent"
                    : unique
                      ? "text-success"
                      : "text-primary"
                }`}
              >
                {!unique
                  ? "尚未创建：等待第一个受控请求"
                  : replacement
                    ? "替换通过：测试版本仍受同一作用域守卫"
                    : "唯一性通过：重复请求复用同一实例"}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {!unique
                  ? "单例合同从实例守卫开始；客户端不能自行决定第二个生产实例。"
                  : replacement
                    ? "替身只在测试边界生效，完成测试后必须 reset，避免全局状态污染下一项测试。"
                    : "当前只证明进程内唯一；并发初始化、释放时机和跨进程边界仍需额外设计。"}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">实例事件轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    操作后这里会记录创建、复用、拒绝与替换证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={`min-w-0 rounded-control border px-3 py-2 text-xs ${eventTone(event.kind)}`}
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
