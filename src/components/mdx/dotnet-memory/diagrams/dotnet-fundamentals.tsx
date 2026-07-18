"use client";

import { useState } from "react";

const pipelineStages = [
  {
    stage: "C# source",
    artifact: "types · methods · async syntax",
    owner: "C# compiler front end",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    stage: ".NET assembly",
    artifact: "CIL · metadata · manifest",
    owner: "loader resolves types and dependencies",
    className: "border-violet-500/35 bg-violet-500/10",
  },
  {
    stage: "CLR + JIT",
    artifact: "type layout · machine code · GC info",
    owner: "runtime specializes for process and CPU",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    stage: "execution",
    artifact: "registers · stacks · managed heap",
    owner: "CPU, OS, runtime and GC cooperate",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function DnmExecutionPipelineMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="C# 源码经过 .NET 程序集中的 CIL 和元数据、CLR 加载与 JIT，最终形成机器码、线程栈和托管堆的执行管线"
          className="grid gap-3 lg:grid-cols-4"
        >
          {pipelineStages.map((item, index) => (
            <section key={item.stage} className={`min-h-56 border p-4 ${item.className}`}>
              <span className="text-xs text-secondary">stage 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{item.stage}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{item.artifact}</code>
              <p className="mb-0 mt-4 border-t border-border pt-3 text-xs text-secondary">{item.owner}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        程序集保存 CIL 与元数据，不是最终机器汇编；对象布局、内联和去虚拟化等决策要到加载/JIT/执行阶段才完整确定。
      </figcaption>
    </figure>
  );
}

type RepresentationId = "local-value" | "embedded-value" | "class-reference" | "boxed" | "managed-ref";

const representations: Array<{
  id: RepresentationId;
  label: string;
  storage: string;
  assignment: string;
  mutation: string;
  allocation: string;
}> = [
  {
    id: "local-value",
    label: "局部值",
    storage: "局部槽、寄存器或被 JIT 消除",
    assignment: "复制整个值",
    mutation: "副本独立变化",
    allocation: "不因 new struct 自动产生托管堆对象",
  },
  {
    id: "embedded-value",
    label: "内联字段",
    storage: "值内联在类对象或数组元素中",
    assignment: "读取字段会复制该值",
    mutation: "宿主决定位置和生命周期",
    allocation: "随宿主对象一起分配",
  },
  {
    id: "class-reference",
    label: "类引用",
    storage: "引用在局部槽；对象在托管堆",
    assignment: "复制引用，不复制对象",
    mutation: "两个引用可观察同一对象",
    allocation: "newobj 通常创建托管对象",
  },
  {
    id: "boxed",
    label: "装箱值",
    storage: "值副本进入带对象头的堆对象",
    assignment: "先复制值，再由 object 引用指向",
    mutation: "原值与装箱副本分离",
    allocation: "box 通常产生托管堆分配",
  },
  {
    id: "managed-ref",
    label: "托管 ref",
    storage: "受运行时追踪的内部位置引用",
    assignment: "别名同一存储位置，不复制结构体",
    mutation: "通过 ref 修改原位置",
    allocation: "ref 本身不要求装箱，但受逃逸与生命周期规则限制",
  },
];

export function DnmRepresentationLab() {
  const [active, setActive] = useState<RepresentationId>("class-reference");
  const item = representations.find((entry) => entry.id === active) ?? representations[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 .NET 值或引用表示方式" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {representations.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={active === entry.id}
              onClick={() => setActive(entry.id)}
              className={`min-h-11 border px-2 py-2 text-sm transition-colors ${
                active === entry.id
                  ? "border-cyan-500 bg-cyan-500/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4">
          <span className="text-xs text-secondary">representation contract</span>
          <strong className="mt-2 block text-base text-primary">{item.label}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3">
              <span className="text-xs text-secondary">存放位置</span>
              <p className="mb-0 mt-2 text-xs text-primary">{item.storage}</p>
            </div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3">
              <span className="text-xs text-secondary">赋值语义</span>
              <p className="mb-0 mt-2 text-xs text-primary">{item.assignment}</p>
            </div>
            <div className="min-h-28 border border-amber-500/35 bg-amber-500/10 p-3">
              <span className="text-xs text-secondary">修改可见性</span>
              <p className="mb-0 mt-2 text-xs text-primary">{item.mutation}</p>
            </div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3">
              <span className="text-xs text-secondary">分配结论</span>
              <p className="mb-0 mt-2 text-xs text-primary">{item.allocation}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换前先预测赋值是复制值、复制对象引用还是建立位置别名；类型类别本身不能固定物理栈堆位置。
      </figcaption>
    </figure>
  );
}

type HiddenStateId = "literal" | "dynamic-string" | "async-sync" | "async-suspend";

const hiddenStates: Array<{
  id: HiddenStateId;
  label: string;
  source: string;
  lowered: string;
  heap: string;
  lifetime: string;
  evidence: string;
}> = [
  {
    id: "literal",
    label: "字符串字面量",
    source: "const string Name = \"orders\";",
    lowered: "ldstr 引用运行时驻留的字面量",
    heap: "共享 String 对象，通常不会每次执行重新创建",
    lifetime: "驻留表/加载上下文可延长生命周期",
    evidence: "CIL 的 ldstr、String.IsInterned 与堆根路径",
  },
  {
    id: "dynamic-string",
    label: "动态字符串",
    source: "string name = $\"order-{id}\";",
    lowered: "格式化/插值处理器按路径构造结果",
    heap: "通常产生结果 String，临时分配取决于具体 API 与 JIT",
    lifetime: "普通可达性；默认不会因内容相等自动驻留",
    evidence: "分配事件、调用栈和结果是否逃逸",
  },
  {
    id: "async-sync",
    label: "同步完成 await",
    source: "await cache.TryGetAsync(key)",
    lowered: "编译器生成状态机；awaiter 已完成时不挂起",
    heap: "具体运行时可避免状态机堆提升，返回载体仍依 API 而定",
    lifetime: "局部值不必跨挂起保存",
    evidence: "热路径分配基准与生成状态机结构",
  },
  {
    id: "async-suspend",
    label: "真实挂起 await",
    source: "await socket.ReadAsync(buffer)",
    lowered: "状态编号、awaiter 与跨 await 局部成为状态机字段",
    heap: "状态机需要在调用返回后继续存活，通常进入堆承载路径",
    lifetime: "跨 await 引用可让大对象存活到异步操作完成",
    evidence: "状态机类型、分配栈和保留路径",
  },
];

export function DnmHiddenStateLab() {
  const [active, setActive] = useState<HiddenStateId>("async-suspend");
  const item = hiddenStates.find((entry) => entry.id === active) ?? hiddenStates[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择编译器或运行时隐藏状态场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {hiddenStates.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={active === entry.id}
              onClick={() => setActive(entry.id)}
              className={`min-h-11 border px-2 py-2 text-sm transition-colors ${
                active === entry.id
                  ? "border-cyan-500 bg-cyan-500/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-96 border border-border bg-background/60 p-4">
          <code className="block break-words text-xs text-accent">{item.source}</code>
          <div className="mt-5 space-y-3 text-xs">
            <div className="border border-violet-500/35 bg-violet-500/10 p-3">
              <span className="text-secondary">lowered</span>
              <p className="mb-0 mt-2 text-primary">{item.lowered}</p>
            </div>
            <div className="border border-amber-500/35 bg-amber-500/10 p-3">
              <span className="text-secondary">heap effect</span>
              <p className="mb-0 mt-2 text-primary">{item.heap}</p>
            </div>
            <div className="border border-rose-500/35 bg-rose-500/10 p-3">
              <span className="text-secondary">lifetime risk</span>
              <p className="mb-0 mt-2 text-primary">{item.lifetime}</p>
            </div>
            <div className="border border-emerald-500/35 bg-emerald-500/10 p-3">
              <span className="text-secondary">proof</span>
              <p className="mb-0 mt-2 text-primary">{item.evidence}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高层语法不直接等于固定分配；先查看 lowering 与运行路径，再用分配事件和根路径证明同步完成、挂起或驻留的实际成本。
      </figcaption>
    </figure>
  );
}
