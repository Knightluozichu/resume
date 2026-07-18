const groups = [
  ["Allocation", "operator new/delete", "separate storage from lifetime"],
  ["RTTI", "dynamic_cast / typeid", "inspect polymorphic dynamic type"],
  ["Typed metadata", "enum / member pointer", "encode choices and class members"],
  ["Local structure", "nested / local / union", "control scope and shared storage"],
  ["ABI boundary", "bit-field / volatile / extern C", "implementation and platform rules"],
] as const;

export function CppSpecializedToolsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ Primer第十九章内存分配RTTI枚举成员指针嵌套类联合和不可移植特性地图" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map(([title, mechanism, boundary], index) => (
            <section key={title} className="min-h-40 border border-border bg-bg/40 p-4">
              <span className="text-xs tabular-nums text-secondary">0{index + 1}</span>
              <strong className="mt-3 block text-sm text-primary">{title}</strong>
              <code className="mt-4 block text-xs text-accent">{mechanism}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">{boundary}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Chapter 19 的五组专用工具：每一组都需要先确认语言规则、对象生命周期或平台边界。
      </figcaption>
    </figure>
  );
}
