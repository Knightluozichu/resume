const typeNodes = [
  { index: "0", head: "Button", tail: "Typelist<Window, ...>" },
  { index: "1", head: "Window", tail: "Typelist<Dialog, ...>" },
  { index: "2", head: "Dialog", tail: "NullType" },
] as const;

export function McdTypelistAnatomyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Button、Window、Dialog 组成的递归 Typelist Head Tail 结构图" className="grid gap-3 lg:grid-cols-3">
          {typeNodes.map((row, index) => (
            <section key={row.head} className="relative min-h-52 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">index {row.index}</span>
              <strong className="mt-3 block text-sm text-primary">Head = {row.head}</strong>
              <code className="mt-4 block break-words text-xs text-accent">Tail = {row.tail}</code>
              {index < typeNodes.length - 1 ? <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden text-accent lg:block">→</span> : null}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Typelist 是编译期的 Head/Tail 递归结构；NullType 是终点，链中不保存运行时对象。
      </figcaption>
    </figure>
  );
}

const algorithmRows = [
  { operation: "Length", recurrence: "1 + Length<Tail>", base: "Length<NullType> = 0", output: "3" },
  { operation: "TypeAt<1>", recurrence: "TypeAt<Tail, i - 1>", base: "TypeAt<List, 0> = Head", output: "Window" },
  { operation: "Erase<Window>", recurrence: "keep Head + recurse Tail", base: "matching Head returns Tail", output: "Button, Dialog" },
  { operation: "NoDuplicates", recurrence: "dedupe Tail, erase Head there", base: "NullType", output: "unique sequence" },
] as const;

export function McdTypelistAlgorithmMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Typelist 长度、索引、删除与去重算法的递归式终止式和输出比较" className="space-y-3">
          {algorithmRows.map((row, index) => (
            <section key={row.operation} className="grid min-h-36 gap-3 border border-violet-500/35 bg-violet-500/10 p-4 md:grid-cols-[0.8fr_1.25fr_1.25fr_0.8fr] md:items-center">
              <strong className="text-sm text-primary">0{index + 1} · {row.operation}</strong>
              <code className="break-words text-xs text-accent">{row.recurrence}</code>
              <span className="text-xs text-secondary">{row.base}</span>
              <span className="text-xs text-primary">{row.output}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个元算法都必须同时给出递归推进与精确终止特化；否则不是不会收敛，就是访问越界时诊断失控。
      </figcaption>
    </figure>
  );
}

const hierarchyRows = [
  { form: "Scatter hierarchy", expansion: "Unit<Button> + Unit<Window> + Unit<Dialog>", access: "Field<T>(object)", use: "heterogeneous tuple / one unit per type" },
  { form: "Linear hierarchy", expansion: "Unit<Button, Unit<Window, Unit<Dialog, Root>>>", access: "next/base chain", use: "ordered handlers / policy pipeline" },
  { form: "Partially ordered list", expansion: "Derived before Base", access: "most-specific first", use: "safe dispatch / factory ordering" },
] as const;

export function McdTypelistHierarchyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="Typelist 生成散射层次线性层次和派生类优先偏序的结构比较" className="grid gap-3 lg:grid-cols-3">
          {hierarchyRows.map((row, index) => (
            <section key={row.form} className="min-h-64 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">generator 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.form}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.expansion}</code>
              <span className="mt-4 block text-xs text-primary">access · {row.access}</span>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.use}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Typelist 不只是查询表；它是 class generation 的输入数据，顺序、重复和继承关系会直接改变生成结构。
      </figcaption>
    </figure>
  );
}
