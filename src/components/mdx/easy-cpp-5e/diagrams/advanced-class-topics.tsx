const polymorphismRows = [
  { caller: "render loop", interface: "Shape::area/name", implementation: "Circle" },
  { caller: "render loop", interface: "Shape::area/name", implementation: "Rectangle" },
  { caller: "render loop", interface: "Shape::area/name", implementation: "Triangle (new)" },
] as const;

export function EcpAdvancedClassesPolymorphismMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="同一渲染循环通过 Shape 接口调用 Circle、Rectangle 和新增 Triangle 实现" className="grid gap-3 lg:grid-cols-3">{polymorphismRows.map((row,index)=><section key={row.implementation} className="min-h-48 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">object 0{index+1}</span><strong className="mt-2 block text-sm text-primary">{row.caller}</strong><code className="mt-3 block break-words text-xs text-accent">{row.interface}</code><span className="mt-4 block text-xs text-secondary">dispatch → {row.implementation}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">调用循环只依赖稳定接口，新增具体类型时扩展实现集合而不扩展中央 switch。</figcaption></figure>;
}

const abstractStages = [
  { stage: "create", detail: "make_unique<Circle>", owner: "unique_ptr<Shape>" },
  { stage: "store", detail: "vector owns pointer", owner: "collection" },
  { stage: "dispatch", detail: "shape->area()", owner: "borrow during loop" },
  { stage: "destroy", detail: "~Circle -> ~Shape", owner: "automatic" },
] as const;

export function EcpAdvancedClassesAbstractFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="派生对象从创建、存入基类智能指针容器、虚调用到自动析构的所有权流程" className="grid gap-2 sm:grid-cols-4">{abstractStages.map((row,index)=><section key={row.stage} className="min-h-48 border border-violet-500/30 bg-violet-500/10 p-3"><span className="text-xs text-secondary">0{index+1} · {row.stage}</span><code className="mt-3 block break-words text-xs text-accent">{row.detail}</code><strong className="mt-4 block text-xs text-primary">{row.owner}</strong></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">多态分派与所有权是两条契约：接口选择实现，unique_ptr 决定对象何时安全销毁。</figcaption></figure>;
}

const multipleTrials = [
  { topology: "Printable + Serializable", state: "two stateless interfaces", result: "clear composition" },
  { topology: "Scanner(Device) + Printer(Device)", state: "two Device subobjects", result: "diamond ambiguity" },
  { topology: "virtual Device base", state: "one shared Device", result: "most-derived constructs" },
  { topology: "many dynamic_cast branches", state: "caller knows types", result: "interface smell" },
] as const;

export function EcpAdvancedClassesMultipleInheritanceLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="接口多继承、普通菱形、虚继承和频繁向下转换四个高级类设计实验" className="grid gap-3 sm:grid-cols-2">{multipleTrials.map((trial,index)=><section key={trial.topology} className="min-h-48 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.topology}</code><strong className="mt-3 block text-xs text-primary">{trial.state}</strong><span className="mt-3 block text-xs text-secondary">{trial.result}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">多继承的成本来自基类状态、歧义和构造责任；频繁下转则暴露调用者对具体类型的耦合。</figcaption></figure>;
}
