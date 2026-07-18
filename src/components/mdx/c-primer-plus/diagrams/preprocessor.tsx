const contracts = [
  ["Tokens", "expand -> rescan", "预处理处理预处理记号而非任意字符替换；参数替换后还会重扫，字符串化与记号粘贴另有展开顺序"],
  ["Evaluate", "macro argument may repeat", "函数式宏没有值传递；参数在替换列表出现几次，带副作用实参就可能求值几次"],
  ["Select", "#if or _Generic", "#if 选择预处理分支，_Generic 按表达式类型选择编译期关联项；两者都不是运行时if"],
  ["Contract", "inline / assert / library", "inline 不保证内联，assert 只检查程序员不变量，标准库调用仍需匹配头文件、域和错误协议"],
] as const;

export function CPrimerPreprocessorContractDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C Primer Plus第十六章宏记号参数求值泛型选择inline断言和标准库契约"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contracts.map(([title, code, meaning], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{meaning}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 16 的编译前契约：宏按记号展开并可能重复求值，选择机制发生在编译前，inline、assert 与库函数仍各有独立语义边界。
      </figcaption>
    </figure>
  );
}
