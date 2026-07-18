type SafetyCell = readonly [level: string, failureState: string, proof: string];

function SafetyGrid({
  ariaLabel,
  caption,
  cells,
}: {
  ariaLabel: string;
  caption: string;
  cells: readonly SafetyCell[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cells.map(([level, failureState, proof], index) => (
            <section
              key={level}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {level}
              </strong>
              <code className="mt-3 block text-xs text-accent">
                {failureState}
              </code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {proof}
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

const guaranteeCells = [
  ["No guarantee", "unknown/corrupt", "资源、invariant 与可用性均无法承诺。"],
  [
    "No-leak floor",
    "resources released",
    "没有永久资源泄漏，但对象状态仍可能损坏。",
  ],
  [
    "Basic guarantee",
    "valid unspecified",
    "不变量成立、无泄漏，对象可继续使用或销毁。",
  ],
  ["Strong guarantee", "unchanged", "失败时所有可观察状态与调用前一致。"],
  [
    "Nothrow guarantee",
    "operation succeeds",
    "函数承诺不让异常逃出，是最强层级。",
  ],
  [
    "Documented boundary",
    "defined side effects",
    "明确哪些外部效果可回滚、哪些只能补偿。",
  ],
] as const;

const commitCells = [
  ["Snapshot", "current state", "目标对象保持原值，不提前删除或递增计数。"],
  ["Prepare", "candidate = build()", "分配、解析和验证在独立临时状态完成。"],
  ["Prepare fails", "throw", "RAII 清理 candidate，目标与锁均未改变。"],
  ["Lock", "scoped_lock", "只在短 commit 区间取得 mutex，异常自动释放。"],
  ["Commit", "swap(candidate)", "使用 noexcept swap 一次发布完整新状态。"],
  [
    "Retire",
    "candidate owns old",
    "旧资源随临时对象析构，不存在裸 delete 窗口。",
  ],
] as const;

const failureCells = [
  [
    "Lock acquire",
    "mutex / RAII",
    "构造未完成时无 guard；成功后所有退出自动 unlock。",
  ],
  [
    "Input read",
    "stream may throw",
    "目标尚未修改，但 stream position 可能不可回滚。",
  ],
  [
    "Image allocate",
    "bad_alloc",
    "candidate owner 清理部分资源，旧 image 保留。",
  ],
  ["Decode/validate", "format error", "临时对象失败，不发布半解码 state。"],
  ["Swap commit", "noexcept", "发布阶段不可失败，强保证的关键前提。"],
  [
    "Notify external",
    "network/db",
    "放在 commit 后并用 outbox/compensation 定义一致性。",
  ],
] as const;

export function EcppExceptionGuaranteeLadderMap() {
  return (
    <SafetyGrid
      ariaLabel="无保证不泄漏基本强不抛边界六层异常安全保证阶梯图"
      caption="异常安全不是布尔值；必须明确失败后资源、对象状态和外部副作用分别处于哪个保证层级。"
      cells={guaranteeCells}
    />
  );
}

export function EcppPrepareCommitSwapMap() {
  return (
    <SafetyGrid
      ariaLabel="快照准备准备失败加锁交换提交退役六阶段强保证事务图"
      caption="可能抛的工作先在 candidate 完成，commit 只做 noexcept swap，失败时目标保持原值。"
      cells={commitCells}
    />
  );
}

export function EcppFailurePointAuditMap() {
  return (
    <SafetyGrid
      ariaLabel="锁输入分配解码交换通知六个失败点异常安全审计图"
      caption="逐个失败点标注 owner、目标状态和外部效果，才能证明函数保证而不是凭感觉宣称 strong。"
      cells={failureCells}
    />
  );
}
