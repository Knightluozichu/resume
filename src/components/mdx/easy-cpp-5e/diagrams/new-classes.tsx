const relations = [
  { model: "Dog -> Animal", question: "Dog is an Animal?", answer: "yes", design: "public inheritance" },
  { model: "Car -> Engine", question: "Car is an Engine?", answer: "no", design: "composition" },
  { model: "Square -> Rectangle", question: "same setter contract?", answer: "often no", design: "recheck substitution" },
] as const;

export function EcpNewClassesRelationMap() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="Dog Animal、Car Engine 与 Square Rectangle 三组继承替换判断" className="grid gap-3 lg:grid-cols-3">{relations.map((row,index)=><section key={row.model} className="min-h-52 border border-sky-500/30 bg-sky-500/10 p-4"><span className="text-xs text-secondary">case 0{index+1}</span><code className="mt-2 block text-sm text-accent">{row.model}</code><strong className="mt-4 block text-xs text-primary">{row.question} {row.answer}</strong><span className="mt-3 block text-xs text-secondary">{row.design}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">public 继承要证明行为替换，不是只看名词像不像或实现能否复用。</figcaption></figure>;
}

const construction = [
  { order: "1", action: "construct base", object: "Animal subobject" },
  { order: "2", action: "construct members", object: "Dog fields" },
  { order: "3", action: "run derived body", object: "Dog invariant" },
  { order: "4", action: "destroy reverse", object: "Dog -> members -> Animal" },
] as const;

export function EcpNewClassesConstructionFlow() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="派生对象基类、派生成员、派生函数体构造及反向析构顺序" className="grid gap-2 sm:grid-cols-4">{construction.map((row)=><section key={row.order} className="min-h-44 border border-violet-500/30 bg-violet-500/10 p-3"><span className="text-xs text-secondary">0{row.order}</span><strong className="mt-2 block text-sm text-primary">{row.action}</strong><code className="mt-3 block break-words text-xs text-accent">{row.object}</code></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">基类先建立自身不变量，派生部分随后扩展；析构严格反向回收。</figcaption></figure>;
}

const dispatchTrials = [
  { expression: "dog.speak()", staticType: "Dog", dynamicType: "Dog", result: "Dog::speak" },
  { expression: "animalRef.speak()", staticType: "Animal&", dynamicType: "Dog", result: "Dog::speak" },
  { expression: "animalPtr->speak()", staticType: "Animal*", dynamicType: "Dog", result: "Dog::speak" },
  { expression: "Animal copy = dog", staticType: "Animal", dynamicType: "Animal", result: "Animal::speak" },
] as const;

export function EcpNewClassesDispatchLab() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"><div role="img" aria-label="直接对象、基类引用、基类指针和切片副本的虚函数分派实验" className="grid gap-3 sm:grid-cols-2">{dispatchTrials.map((trial,index)=><section key={trial.expression} className="min-h-48 border border-amber-500/30 bg-amber-500/10 p-4"><span className="text-xs text-secondary">trial 0{index+1}</span><code className="mt-2 block break-words text-xs text-accent">{trial.expression}</code><strong className="mt-3 block text-xs text-primary">{trial.staticType} / {trial.dynamicType}</strong><span className="mt-3 block text-xs text-secondary">{trial.result}</span></section>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">只有保留动态身份的引用或指针，并调用 virtual 接口，才按 Dog 动态分派；按值转换会切片。</figcaption></figure>;
}
