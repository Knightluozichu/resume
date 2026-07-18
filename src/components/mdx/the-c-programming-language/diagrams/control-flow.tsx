type Row = readonly [
  name: string,
  entry: string,
  transfer: string,
  exit: string,
];

const choices: readonly Row[] = [
  ["if / else", "scalar condition", "choose one branch", "branches rejoin"],
  ["else-if", "ordered predicates", "first true branch", "optional final else"],
  ["switch", "integer expression", "jump to case label", "break or end"],
  ["while", "test before body", "body -> condition", "false condition"],
  ["for", "init, then test", "body -> iteration", "false condition"],
  ["do-while", "body before test", "condition -> body", "false condition"],
] as const;

const transfers = [
  ["break in loop", "nearest loop", "leave body and continue after the loop"],
  ["break in switch", "nearest switch", "leave selected case sequence"],
  ["continue in while", "condition", "skip remaining body, test again"],
  ["continue in for", "iteration expression", "run update first, then test"],
  ["continue in do", "condition at tail", "test before deciding another body"],
  [
    "goto label",
    "named statement",
    "use for explicit cleanup or rare multi-level exit",
  ],
] as const;

export function KrControlChoiceMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="K&R 第三章 if else switch while for do while 的入口转移和出口对照图"
          className="min-w-[680px]"
        >
          <div className="grid grid-cols-[1fr_1.2fr_1.3fr_1.2fr] border-b border-border pb-2 text-xs font-medium text-secondary">
            <span>Construct</span>
            <span>Entry</span>
            <span>Transfer</span>
            <span>Exit</span>
          </div>
          {choices.map(([name, entry, transfer, exit]) => (
            <div
              key={name}
              className="grid min-h-16 grid-cols-[1fr_1.2fr_1.3fr_1.2fr] items-center border-b border-border/70 text-xs last:border-b-0"
            >
              <code className="text-accent">{name}</code>
              <span className="text-secondary">{entry}</span>
              <span className="text-primary">{transfer}</span>
              <span className="text-secondary">{exit}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个控制结构都按入口、内部转移与出口审查；语法相似不代表 `continue`
        等转移目标相同。
      </figcaption>
    </figure>
  );
}

export function KrLoopTransferMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="K&R 第三章 break continue 和 goto 在循环与 switch 中的精确转移目标图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {transfers.map(([title, target, detail], index) => (
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
              <code className="mt-3 block text-xs text-accent">{target}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `break`、`continue` 与 `goto`
        都是显式边；先标出目标，再判断它是否保持循环进展与资源清理协议。
      </figcaption>
    </figure>
  );
}
