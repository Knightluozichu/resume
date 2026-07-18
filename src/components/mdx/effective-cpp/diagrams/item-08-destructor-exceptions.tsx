type Item = readonly [title: string, code: string, detail: string];

function ExceptionMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const unwindItems = [
  ["Primary throw", "operation fails", "业务异常开始传播并寻找匹配 handler。"],
  ["Unwind", "destroy locals", "已构造自动对象按逆序执行析构。"],
  ["Cleanup failure", "destructor throws", "清理阶段出现第二个活动异常。"],
  ["Conflict", "two active exceptions", "运行时无法同时传播两个异常。"],
  ["Terminate", "std::terminate", "程序立即终止，外层 catch 没机会恢复。"],
  ["Prevention", "noexcept cleanup", "析构内部捕获并按策略处理所有清理失败。"],
] as const;

const closeItems = [
  ["Open", "resource active", "对象拥有连接、文件或会话并记录活动状态。"],
  [
    "Explicit close",
    "may throw/report",
    "调用方在正常控制流处理失败并决定重试或回滚。",
  ],
  [
    "Closed",
    "idempotent state",
    "成功后先更新状态，后续 close/destructor 不重复操作。",
  ],
  ["Fallback", "~T() noexcept", "未显式关闭时析构尝试一次 no-throw cleanup。"],
  ["Observe", "log/metric", "fallback 失败写入不会再抛异常的诊断通道。"],
  ["Escalate", "policy", "数据完整性无法保证时明确 terminate，而非偶然逸出。"],
] as const;

const policyItems = [
  [
    "Release only",
    "close fd",
    "释放失败通常记录并继续，资源生命周期仍要结束。",
  ],
  [
    "Commit",
    "explicit commit",
    "可能失败且影响业务正确性的动作必须由调用方显式处理。",
  ],
  [
    "Rollback",
    "destructor rollback",
    "析构执行 best-effort no-throw 回滚，不承诺提交。",
  ],
  [
    "Invariant broken",
    "terminate",
    "无法恢复且继续会破坏进程正确性时立即终止。",
  ],
  [
    "Bulk objects",
    "per-element catch",
    "容器销毁不能因单个元素清理异常中断剩余析构。",
  ],
  [
    "Test",
    "failure injection",
    "分别在正常销毁和 unwinding 中注入 close/rollback 失败。",
  ],
] as const;

export function EcppDoubleExceptionMap() {
  return (
    <ExceptionMap
      ariaLabel="主异常栈展开局部析构清理异常双异常终止预防六阶段图"
      caption="stack unwinding 中 destructor 再抛异常会触发 terminate；noexcept cleanup 必须在边界内处理失败。"
      items={unwindItems}
    />
  );
}

export function EcppExplicitCloseProtocolMap() {
  return (
    <ExceptionMap
      ariaLabel="打开显式关闭已关闭析构兜底诊断升级六阶段资源关闭图"
      caption="可能失败且调用方可处理的 close 应显式暴露；destructor 只执行幂等 no-throw fallback。"
      items={closeItems}
    />
  );
}

export function EcppDestructorFailurePolicyMap() {
  return (
    <ExceptionMap
      ariaLabel="资源释放提交回滚不变量容器失败测试六类析构故障策略图"
      caption="清理失败策略取决于业务语义：显式提交、no-throw 回滚、记录吞掉或明确 terminate。"
      items={policyItems}
    />
  );
}
