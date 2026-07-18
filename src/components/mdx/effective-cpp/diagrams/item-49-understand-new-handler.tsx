type HandlerCell = readonly [stage: string, call: string, effect: string];

function HandlerGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly HandlerCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([stage, call, effect], index) => (
            <section
              key={stage}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {stage}
              </strong>
              <code className="mt-3 block text-xs text-accent">{call}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {effect}
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

const failureCells = [
  ["Allocate", "operator new(bytes)", "尝试取得 raw storage。"],
  ["Failure", "out of memory", "实现读取当前 global new-handler。"],
  ["No handler", "handler == nullptr", "立即抛出 std::bad_alloc。"],
  ["Invoke handler", "handler()", "handler 尝试改变失败条件或控制流。"],
  ["Retry", "operator new(bytes)", "handler 返回后再次尝试，可能重复调用。"],
  ["Finish", "pointer / throw / terminate", "成功返回，或异常/终止结束循环。"],
] as const;

const optionsCells = [
  [
    "Free reserve",
    "release emergency block",
    "让下一次 allocation 有机会成功。",
  ],
  ["Install next", "set_new_handler(next)", "把后续重试交给另一策略。"],
  ["Disable", "set_new_handler(nullptr)", "下一次失败直接 bad_alloc。"],
  ["Throw", "throw bad_alloc", "明确把失败交给调用者。"],
  ["Terminate", "abort / terminate", "不可恢复场景立即结束进程。"],
  ["Never spin", "do not return unchanged", "不改变条件就返回会形成忙循环。"],
] as const;

const classCells = [
  ["Class policy", "Widget::handler", "每个 class 保存所需失败策略。"],
  [
    "Enter operator new",
    "Widget::operator new",
    "分配前临时安装 class handler。",
  ],
  ["RAII save", "NewHandlerHolder", "保存旧 global handler。"],
  ["Delegate", "::operator new(size)", "复用标准失败循环和 bad_alloc 行为。"],
  ["Restore", "holder destructor", "成功或异常时都恢复旧 handler。"],
  ["Concurrency", "global mutable state", "并发安装需要外部同步或不同架构。"],
] as const;

export function EcppNewHandlerFailureLoopMap() {
  return (
    <HandlerGrid
      ariaLabel="分配失败无处理器调用处理器重试完成六阶段 new-handler 失败循环图"
      caption="operator new 失败时反复调用当前 handler；handler 返回代表条件已改变，随后 allocation 会重试。"
      cells={failureCells}
    />
  );
}

export function EcppNewHandlerOptionsMap() {
  return (
    <HandlerGrid
      ariaLabel="释放保留内存安装后继卸载处理器抛出异常终止进程禁止空转六类 new-handler 动作图"
      caption="有效 handler 必须让下次尝试可能成功，切换失败策略，或通过异常/终止离开循环。"
      cells={optionsCells}
    />
  );
}

export function EcppClassSpecificNewHandlerMap() {
  return (
    <HandlerGrid
      ariaLabel="类策略进入分配 RAII 保存委托全局分配恢复旧处理器并发风险六阶段类专属处理器图"
      caption="class-specific operator new 临时替换 global handler，并靠 RAII 在成功和异常路径恢复原状态。"
      cells={classCells}
    />
  );
}
