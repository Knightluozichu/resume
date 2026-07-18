const storageRows = [
  {
    declaration: "int globalValue",
    scope: "namespace scope",
    duration: "static storage duration",
    identity: "one program object (subject to linkage)",
  },
  {
    declaration: "static int fileValue",
    scope: "translation-unit name visibility",
    duration: "static storage duration",
    identity: "internal-linkage object",
  },
  {
    declaration: "static int localValue",
    scope: "block scope",
    duration: "static storage duration",
    identity: "one object, initialized on first control pass",
  },
  {
    declaration: "int localValue",
    scope: "block scope",
    duration: "automatic storage duration",
    identity: "one object per active invocation",
  },
] as const;

export function CpuEyeStorageDurationLinkageMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="global static和local声明在作用域存储期链接属性与运行时对象数量上的对照图"
          className="space-y-3"
        >
          {storageRows.map((item, index) => (
            <section
              key={`${item.declaration}-${item.scope}`}
              className="grid min-h-36 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.9fr_1fr_1fr_1.3fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.declaration}
              </code>
              <strong className="text-xs text-primary">{item.scope}</strong>
              <span className="text-xs text-secondary">{item.duration}</span>
              <span className="text-xs text-primary">{item.identity}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        scope、linkage 与 storage duration 是三个正交问题；`static`
        在不同上下文改变的维度并不相同。
      </figcaption>
    </figure>
  );
}

const pointerShapes = [
  {
    type: "int matrix[2][3]",
    shape: "one contiguous 2 x 3 object",
    step: "row pointer advances 3 ints",
    risk: "decay retains row extent in pointer type",
  },
  {
    type: "int* rows[2]",
    shape: "array of two independent pointers",
    step: "each row may target different storage",
    risk: "row lengths/lifetimes external",
  },
  {
    type: "int** cursor",
    shape: "pointer to an int pointer object",
    step: "two dereferences follow two objects",
    risk: "does not imply contiguous 2D matrix",
  },
] as const;

export function CpuEyePointerShapeDeductionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="二维数组指针数组和双重指针在内存连续性步长与生命周期上的形状比较图"
          className="grid gap-4 lg:grid-cols-3"
        >
          {pointerShapes.map((item, index) => (
            <section
              key={item.type}
              className="min-h-60 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">shape 0{index + 1}</span>
              <code className="mt-2 block break-words text-sm text-accent">
                {item.type}
              </code>
              <strong className="mt-4 block text-xs text-primary">
                {item.shape}
              </strong>
              <p className="mb-0 mt-3 text-xs text-primary">{item.step}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{item.risk}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        星号数量不能替代
        shape；回答双重指针问题必须同时给出每一层指向的对象、extent、owner 和
        lifetime。
      </figcaption>
    </figure>
  );
}

const deductionRows = [
  {
    source: "auto value = expression",
    result: "top-level cv/ref usually dropped",
    runtime: "concrete type fixed at compile time",
  },
  {
    source: "auto& ref = expression",
    result: "reference preserved, cv follows binding",
    runtime: "alias to existing object",
  },
  {
    source: "auto&& forwarding = expression",
    result: "reference collapsing depends on value category",
    runtime: "still one statically known type",
  },
  {
    source: "thread_local State state",
    result: "one instance per thread",
    runtime: "TLS base + module/variable offset",
  },
] as const;

export function CpuEyeAutoThreadLocalInterviewMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="auto引用推导与thread local每线程实例从源码规则到编译期类型和运行时访问的证据图"
          className="space-y-3"
        >
          {deductionRows.map((item, index) => (
            <section
              key={item.source}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 md:grid-cols-[1.1fr_1.2fr_1.1fr] md:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {item.source}
              </code>
              <strong className="text-xs text-primary">{item.result}</strong>
              <span className="text-xs text-secondary">{item.runtime}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        面试时先写 deduction 或 storage rule，再推导 concrete type/object
        count，最后用 compiler/debugger evidence 验证实现路径。
      </figcaption>
    </figure>
  );
}
