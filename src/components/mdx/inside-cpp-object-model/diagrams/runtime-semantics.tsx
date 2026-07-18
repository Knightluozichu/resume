const storageRows = [
  {
    storage: "Global object",
    start: "constant or dynamic initialization before use/main rules",
    end: "program termination, reverse completion order where defined",
    hazard: "cross-translation-unit initialization dependency",
  },
  {
    storage: "Local static object",
    start: "first control pass through declaration",
    end: "program termination if construction completed",
    hazard: "reentrancy and teardown dependencies",
  },
  {
    storage: "Automatic object",
    start: "declaration execution",
    end: "scope exit or stack unwinding",
    hazard: "returning references to ended lifetime",
  },
  {
    storage: "Dynamic object",
    start: "successful construction in allocated storage",
    end: "explicit owner-driven destruction",
    hazard: "leak, double delete, mismatched array form",
  },
] as const;

export function IcoStorageDurationLifecycleMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="全局局部静态自动和动态对象的生命周期起点终点及风险对照图"
          className="space-y-3"
        >
          {storageRows.map((row, index) => (
            <section
              key={row.storage}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 lg:grid-cols-[0.8fr_1.35fr_1.25fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  class 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.storage}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.start}
              </code>
              <span className="text-xs text-primary">{row.end}</span>
              <span className="text-xs text-secondary">{row.hazard}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        storage 获得与 object lifetime 开始不是同义词；只有 initialization
        成功后对象才存在，结束时也必须先 destruction 再回收可复用 storage。
      </figcaption>
    </figure>
  );
}

const allocationProtocols = [
  {
    expression: "new T(args)",
    allocate: "operator new(sizeof(T))",
    construct: "construct one T; on throw call matching deallocation",
    release: "delete: destructor then operator delete",
  },
  {
    expression: "new T[count]",
    allocate: "operator new[] plus possible array metadata",
    construct: "elements forward; partial failure destroys reverse",
    release: "delete[]: elements reverse then operator delete[]",
  },
  {
    expression: "new (buffer) T(args)",
    allocate: "no allocation by standard placement form",
    construct: "start T lifetime in aligned supplied storage",
    release: "explicit destruction; storage owner releases separately",
  },
  {
    expression: "allocator/construct_at",
    allocate: "container/arena obtains raw storage",
    construct: "library starts selected element lifetimes",
    release: "destroy_at then allocator deallocation",
  },
] as const;

export function IcoNewDeleteProtocolMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="单对象new数组new定位new和allocator构造从分配构造到销毁释放的协议图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {allocationProtocols.map((row, index) => (
            <section
              key={row.expression}
              className="min-h-64 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <code className="mt-2 block break-words text-xs text-accent">
                {row.expression}
              </code>
              <strong className="mt-4 block text-xs text-primary">
                {row.allocate}
              </strong>
              <p className="mb-0 mt-4 text-xs text-primary">{row.construct}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.release}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        new-expression 把 storage acquisition 与 construction
        组成异常安全协议；array form、placement form 和 allocator form 的
        release responsibility 不可互换。
      </figcaption>
    </figure>
  );
}

const temporaryRows = [
  {
    source: "T value = makeT()",
    semantic: "initialize final result object",
    materialization: "modern prvalue may construct directly",
    lifetime: "value's enclosing scope",
  },
  {
    source: "const T& ref = T{}",
    semantic: "bind reference to materialized temporary",
    materialization: "temporary object is required",
    lifetime: "extended to local reference lifetime",
  },
  {
    source: "consume(convert(source))",
    semantic: "conversion result feeds full-expression",
    materialization: "may create class temporary",
    lifetime: "normally end of full-expression",
  },
  {
    source: "return reference-to-temporary",
    semantic: "reference escapes without safe ownership",
    materialization: "temporary still dies by its rule",
    lifetime: "dangling result; no return extension",
  },
] as const;

export function IcoTemporaryLifetimeMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="返回值直接构造常量引用绑定转换临时量和返回临时引用的物化与生命周期对照图"
          className="space-y-3"
        >
          {temporaryRows.map((row, index) => (
            <section
              key={row.source}
              className="grid min-h-40 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[0.9fr_1.1fr_1.25fr_1.1fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {row.source}
              </code>
              <strong className="text-xs text-primary">{row.semantic}</strong>
              <span className="text-xs text-primary">
                {row.materialization}
              </span>
              <span className="text-xs text-secondary">{row.lifetime}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不要用“源码看见临时变量”判断成本；先按 language version 确定 value
        category、 materialization 和 lifetime，再看 elision 与 optimized
        output。
      </figcaption>
    </figure>
  );
}
