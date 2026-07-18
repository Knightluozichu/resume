const bindingStages = [
  {
    stage: "Class declaration",
    input: "member names, types, access regions",
    decision: "class scope and declaration meaning",
    output: "a complete member set",
  },
  {
    stage: "Member expression",
    input: "object expression + member name",
    decision: "static type lookup and access control",
    output: "selected static or nonstatic member",
  },
  {
    stage: "Layout",
    input: "bases, members, alignment, ABI rules",
    decision: "fixed or runtime-adjusted location",
    output: "offset/metadata for this target",
  },
  {
    stage: "Machine access",
    input: "this/base address + representation",
    decision: "direct add or virtual-base lookup",
    output: "load/store the selected data",
  },
] as const;

export function IcoDataBindingAccessMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="数据成员从类声明名称绑定静态类型查找到布局定位和机器访问的四阶段图"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {bindingStages.map((row, index) => (
            <section
              key={row.stage}
              className="min-h-64 border border-cyan-500/30 bg-cyan-500/10 p-4"
            >
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">
                {row.stage}
              </strong>
              <code className="mt-4 block break-words text-xs text-accent">
                {row.input}
              </code>
              <p className="mb-0 mt-4 text-xs text-primary">{row.decision}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">{row.output}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        name binding 先确定“访问哪个 member”，object layout 再确定“从哪个
        address 取得它”；把这两层混在一起会误判同名隐藏与 pointer adjustment。
      </figcaption>
    </figure>
  );
}

const inheritedLayouts = [
  {
    form: "Inheritance without polymorphism",
    shape: "Base data | padding | Derived data | tail padding",
    access: "fixed compile-time offsets",
    cost: "near ordinary aggregate access",
  },
  {
    form: "Adding polymorphism",
    shape: "implementation vptr | Base data | Derived data",
    access: "data still fixed; virtual call uses table",
    cost: "metadata plus alignment, not virtual data lookup",
  },
  {
    form: "Multiple inheritance",
    shape: "BaseA subobject | BaseB subobject | Derived data",
    access: "selected base view may adjust this",
    cost: "non-primary base conversion/call adjustment",
  },
  {
    form: "Virtual inheritance",
    shape: "nonvirtual parts | Derived data | shared virtual base",
    access: "virtual-base location through ABI metadata",
    cost: "extra lookup and less stable fixed offset",
  },
] as const;

export function IcoInheritedDataLayoutMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="无多态继承加入多态多重继承和虚继承的数据布局访问方式与成本对照图"
          className="space-y-3"
        >
          {inheritedLayouts.map((row, index) => (
            <section
              key={row.form}
              className="grid min-h-40 gap-3 border border-violet-500/30 bg-violet-500/10 p-4 md:grid-cols-[0.9fr_1.4fr_1.2fr_1fr] md:items-center"
            >
              <div>
                <span className="text-xs text-secondary">
                  layout 0{index + 1}
                </span>
                <strong className="mt-2 block text-sm text-primary">
                  {row.form}
                </strong>
              </div>
              <code className="break-words text-xs text-accent">
                {row.shape}
              </code>
              <span className="text-xs text-primary">{row.access}</span>
              <span className="text-xs text-secondary">{row.cost}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        inheritance cost 要分开看：普通 data 常仍是 fixed
        offset；多重继承主要调整 base view，virtual inheritance 才常让
        shared-base location 依赖 runtime metadata。
      </figcaption>
    </figure>
  );
}

const memberPointerStages = [
  {
    expression: "int Record::* pm = &Record::count",
    representation: "class-relative member locator",
    adjustment: "may encode offset with ABI null convention",
    result: "not an int* and not bound to an object",
  },
  {
    expression: "record.*pm",
    representation: "object value plus member locator",
    adjustment: "apply locator to Record subobject",
    result: "lvalue designating count",
  },
  {
    expression: "pointer->*pm",
    representation: "object pointer plus member locator",
    adjustment: "convert/select class subobject then add offset",
    result: "lvalue through pointer",
  },
  {
    expression: "converted derived member pointer",
    representation: "ABI-adjusted locator",
    adjustment: "multiple/virtual inheritance may add constraints",
    result: "valid only under language conversion rules",
  },
] as const;

export function IcoDataMemberPointerMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="数据成员指针从形成类相对定位符到点星箭头星应用和继承转换的机制图"
          className="space-y-3"
        >
          {memberPointerStages.map((row, index) => (
            <section
              key={row.expression}
              className="grid min-h-36 gap-3 border border-amber-500/35 bg-amber-500/10 p-4 lg:grid-cols-[1fr_1.1fr_1.2fr_1.2fr] lg:items-center"
            >
              <code className="break-words text-xs text-accent">
                <span className="mr-2 text-secondary">0{index + 1}</span>
                {row.expression}
              </code>
              <strong className="text-xs text-primary">
                {row.representation}
              </strong>
              <span className="text-xs text-primary">{row.adjustment}</span>
              <span className="text-xs text-secondary">{row.result}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        pointer to data member 是“相对某 class object 如何找到
        member”的值；只有与 object 通过 .* 或 -&gt;* 结合后才得到实际地址所指的
        lvalue。
      </figcaption>
    </figure>
  );
}
