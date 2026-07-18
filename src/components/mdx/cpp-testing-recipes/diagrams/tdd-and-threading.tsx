"use client";

import { useState } from "react";

const architectureRows = [
  { layer: "Geo query", responsibility: "解析位置并计算结果", threading: "纯函数/同步对象", proof: "确定输入输出单元测试", className: "border-cyan-500/35 bg-cyan-500/10" },
  { layer: "Job queue", responsibility: "接收任务并提供背压边界", threading: "mutex + condition variable", proof: "容量与关闭状态测试", className: "border-amber-500/35 bg-amber-500/10" },
  { layer: "ThreadPool", responsibility: "启动 worker、取任务并收敛生命周期", threading: "N workers + stop/join", proof: "并行进度与关闭契约", className: "border-emerald-500/35 bg-emerald-500/10" },
  { layer: "GeoServer", responsibility: "接受客户请求并交给异步执行", threading: "client threads / async", proof: "功能、吞吐与隔离测试", className: "border-violet-500/35 bg-violet-500/10" },
] as const;

export function CtrThreadedTddArchitectureMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="GeoServer 从纯查询任务队列线程池到客户端请求的分层并发架构" className="grid gap-3 md:grid-cols-2">
          {architectureRows.map((item, index) => (
            <section key={item.layer} className={`min-h-56 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.layer}</strong>
              <p className="mb-0 mt-4 text-xs text-primary">{item.responsibility}</p>
              <code className="mt-4 block break-words text-xs text-accent">{item.threading}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">proof · {item.proof}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先把领域计算保持同步确定，再在队列和线程池边界逐层加入并发；每层拥有不同测试证据。
      </figcaption>
    </figure>
  );
}

const synchronizationSteps = [
  { step: "arrange", action: "创建受控 latch/barrier 与记录型任务", proof: "无 wall-clock 假设" },
  { step: "start", action: "让 worker 到达明确同步点", proof: "测试收到 started 事件" },
  { step: "interleave", action: "释放指定线程或同时释放", proof: "调度由测试协议控制" },
  { step: "await", action: "等待状态谓词，超时只作失败上限", proof: "condition predicate 成立" },
  { step: "assert", action: "检查结果、进度和 join 后状态", proof: "无后台线程逃逸" },
] as const;

export function CtrDeterministicThreadTestFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="并发测试以闩锁同步点控制交错并等待状态谓词的流程" className="space-y-3">
          {synchronizationSteps.map((item, index) => (
            <section key={item.step} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.4fr_0.7fr_1.6fr_1.2fr] lg:items-center">
              <span className="text-xs text-secondary">0{index + 1}</span>
              <strong className="text-sm text-primary">{item.step}</strong>
              <span className="text-xs text-primary">{item.action}</span>
              <span className="text-xs text-accent">proof · {item.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `sleep` 猜时间，latch 与条件谓词表达事件；超时只防止测试永远挂起，不承担正确性判断。
      </figcaption>
    </figure>
  );
}

const failureCases = [
  { label: "丢任务", mutation: "submit 与 stop 并发，队列在消费前被清空", symptom: "accepted != completed", probe: "计数 barrier 固定交错并检查关闭契约" },
  { label: "数据竞争", mutation: "多个 worker 无同步写同一计数", symptom: "结果偶发偏小或 sanitizer 报 race", probe: "高并发重复 + ThreadSanitizer" },
  { label: "死锁", mutation: "两个路径以相反顺序获取锁", symptom: "等待谓词超时且线程无法 join", probe: "受控双 barrier 迫使锁顺序交错" },
  { label: "串行伪装", mutation: "线程池只有一个 worker 或锁包住整个任务", symptom: "结果正确但无并行进度", probe: "阻塞首任务并证明第二任务已开始" },
] as const;

export function CtrConcurrencyFailureLab() {
  const [active, setActive] = useState(0);
  const current = failureCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择并发失效模式" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {failureCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">mutation · {current.mutation}</span>
          <strong className="mt-3 block text-base text-primary">{current.symptom}</strong>
          <div className="mt-5 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">暴露探针</span><p className="mb-0 mt-3 text-xs text-primary">{current.probe}</p></div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发测试要主动制造有风险的交错并观察不变量；多跑普通成功路径不能替代同步协议和 sanitizer。
      </figcaption>
    </figure>
  );
}
