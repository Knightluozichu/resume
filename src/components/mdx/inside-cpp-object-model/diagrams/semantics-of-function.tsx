const invocationRows = [
  {
    form: "nonstatic member",
    source: "object.move(dx)",
    lowering: "direct function + hidden this + dx",
    resolution: "compile-time target and this adjustment",
  },
  {
    form: "static member",
    source: "Point::origin()",
    lowering: "ordinary call without this",
    resolution: "class scope selects a linkable symbol",
  },
  {
    form: "virtual member",
    source: "shape.area() through ref/pointer",
    lowering: "load dynamic table slot, pass adjusted this",
    resolution: "runtime final overrider unless devirtualized",
  },
  {
    form: "overloaded member",
    source: "point.print(stream)",
    lowering: "selected signature gets encoded symbol identity",
    resolution: "overload at compile time, name mangling at linkage",
  },
] as const;

export function IcoMemberInvocationMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="非静态静态虚函数和重载成员函数从源码调用到内部变换及决议时机的对照图"
          className="space-y-3"
        >
          {invocationRows.map((row, index) => (
            <section
              key={row.form}
              className="grid min-h-40 gap-3 border border-cyan-500/30 bg-cyan-500/10 p-4 md:grid-cols-[0.8fr_1fr_1.3fr_1.3fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  form 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.form}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.source}
              </code>
              <span className="text-xs text-primary">{row.lowering}</span>
              <span className="text-xs text-secondary">{row.resolution}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        member syntax 不代表 function code 存在 object 内；差异来自是否需要
        hidden this、 target 在何时决议，以及 linkage 如何区分签名。
      </figcaption>
    </figure>
  );
}

const dispatchAdjustments = [
  {
    topology: "Single inheritance",
    incoming: "primary Base* view",
    lookup: "vptr + stable slot",
    adjustment: "often zero or fixed this adjustment",
  },
  {
    topology: "Multiple inheritance",
    incoming: "secondary Base* view",
    lookup: "that base view's virtual table",
    adjustment: "thunk restores Derived this before body",
  },
  {
    topology: "Virtual inheritance",
    incoming: "shared virtual-base view",
    lookup: "ABI metadata plus virtual slot",
    adjustment: "runtime offset reaches overriding subobject",
  },
  {
    topology: "Qualified/direct call",
    incoming: "known class/object expression",
    lookup: "statically selected implementation",
    adjustment: "compiler may bypass dynamic dispatch",
  },
] as const;

export function IcoVirtualDispatchAdjustmentMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="单继承多重继承虚继承和限定调用下虚函数查表及this指针调整路径图"
          className="grid gap-3 sm:grid-cols-2"
        >
          {dispatchAdjustments.map((row, index) => (
            <section
              key={row.topology}
              className="min-h-60 border border-violet-500/30 bg-violet-500/10 p-4"
            >
              <span className="text-xs text-secondary">path 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.topology}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.incoming}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.lookup}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">
                {row.adjustment}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        slot selection 与 this adjustment 是两件事：先由当前 base view 找到
        final overrider，再把 incoming pointer 调整成该 function body 期望的
        object view。
      </figcaption>
    </figure>
  );
}

const callableRepresentations = [
  {
    kind: "Direct function target",
    representation: "code address known at compile/link time",
    application: "pass hidden this directly",
    risk: "none beyond ordinary call/ABI",
  },
  {
    kind: "Nonvirtual member pointer",
    representation: "function target plus possible this adjustment",
    application: "adjust object then direct/indirect call",
    risk: "representation is ABI-specific",
  },
  {
    kind: "Virtual member pointer",
    representation: "virtual-slot encoding plus adjustment metadata",
    application: "load slot from applied object's dynamic table",
    risk: "not a plain code pointer",
  },
  {
    kind: "Inline expansion",
    representation: "substituted body, mapped formals and locals",
    application: "evaluate actual args once, preserve scopes",
    risk: "code growth and instruction-cache pressure",
  },
] as const;

export function IcoMemberPointerInlineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="直接函数成员函数指针虚成员函数指针和内联展开的表示应用及风险比较图"
          className="space-y-3"
        >
          {callableRepresentations.map((row, index) => (
            <section
              key={row.kind}
              className="grid min-h-40 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[0.8fr_1.3fr_1.2fr_1.1fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  case 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.kind}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.representation}
              </code>
              <span className="text-xs text-primary">{row.application}</span>
              <span className="text-xs text-secondary">{row.risk}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        member-function pointer 与 inline 是两种相反方向：前者保存可变 target
        representation，后者在 target/body 可见时消除 call boundary。
      </figcaption>
    </figure>
  );
}
