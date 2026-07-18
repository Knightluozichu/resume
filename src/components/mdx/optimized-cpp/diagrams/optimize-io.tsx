const readRecipeStages = [
  {
    stage: "Define consumption",
    action: "whole bytes, lines, tokens or streaming callback?",
    artifact: "ownership, encoding, errors, size and latency contract",
  },
  {
    stage: "Open + size hint",
    action: "acquire file once; use size only when trustworthy/seekable",
    artifact: "single boundary, explicit failure and changed-file policy",
  },
  {
    stage: "Allocate / buffer",
    action: "reserve/reuse bounded storage outside inner loop",
    artifact: "allocation count, peak memory and buffer-size sweep",
  },
  {
    stage: "Read + validate",
    action: "take bigger bites or line chunks; handle partial/error/EOF",
    artifact: "bytes, calls, throughput, p99 and exact output",
  },
] as const;

export function OpcFileReadRecipeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="定义消费方式打开获取大小分配缓冲和读取验证四阶段文件读取方案图"
          className="grid gap-3 lg:grid-cols-4"
        >
          {readRecipeStages.map((row, index) => (
            <section
              key={row.stage}
              className="relative min-h-80 border border-cyan-500/35 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.action}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">
                prove: {row.artifact}
              </p>
              {index < readRecipeStages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block"
                >
                  →
                </span>
              ) : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高效 file read 从 consumer contract 开始；一次 open、显式
        ownership、可控 storage 和 partial/error/EOF 处理，比隐藏在多层 helper
        的“快路径”更容易测量。
      </figcaption>
    </figure>
  );
}

const inputShapes = [
  {
    shape: "Byte-at-a-time",
    gain: "simple parser state",
    cost: "call/check per byte; buffering may be hidden",
    choose: "rarely as the external I/O boundary",
  },
  {
    shape: "Bigger input buffer",
    gain: "amortized calls and contiguous parser input",
    cost: "memory, refill edges and diminishing returns",
    choose: "throughput path after size sweep",
  },
  {
    shape: "Read a line at a time",
    gain: "bounded semantic chunk and incremental processing",
    cost: "long-line growth, delimiter/encoding contract",
    choose: "line-oriented formats without whole-file ownership",
  },
  {
    shape: "Whole file",
    gain: "few boundaries and simple random parsing",
    cost: "peak memory, huge/changed/nonseekable input",
    choose: "bounded regular files when consumer needs all bytes",
  },
] as const;

export function OpcInputBiteBufferMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="逐字节大输入缓冲逐行和整文件四种读取粒度的收益成本选择图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {inputShapes.map((row, index) => (
            <section
              key={row.shape}
              className="min-h-64 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">shape 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.shape}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.gain}</p>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.cost}
              </code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.choose}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        take bigger bites 能摊薄 per-call work，但 buffer
        越大收益越快进入平台期；用真实 file-size/ line-length 分布扫参数，并把
        peak memory 与 first-result latency 一起比较。
      </figcaption>
    </figure>
  );
}

const streamChecks = [
  {
    path: "File writing",
    improve: "batch formatting/writes; avoid needless flush",
    preserve: "partial write, close/flush durability and errors",
  },
  {
    path: "Reading from std::cin",
    improve: "untie/disable sync only under a consistent I/O policy",
    preserve: "no unsafe mixing with C stdio; parse failures handled",
  },
  {
    path: "Writing to std::cout",
    improve: "use newline without forced flush; buffer output",
    preserve: "interactive prompts still flush when required",
  },
  {
    path: "Things that did not help",
    improve: "record rejected hypotheses and bottleneck shifts",
    preserve: "do not keep complexity without repeatable gain",
  },
] as const;

export function OpcStreamingIoDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="文件写入标准输入标准输出和无效优化尝试四类流式IO审计图"
          className="space-y-3"
        >
          {streamChecks.map((row, index) => (
            <section
              key={row.path}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[0.75fr_1.3fr_1.4fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  path 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.path}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.improve}
              </code>
              <span className="text-xs text-secondary">{row.preserve}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        streaming I/O 优化通常来自减少 boundary/format/flush
        次数；interactive、durability 与 error semantics
        必须显式保留，无稳定收益的尝试要从代码中删除、留在实验记录里。
      </figcaption>
    </figure>
  );
}
