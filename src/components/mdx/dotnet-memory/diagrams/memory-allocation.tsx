"use client";

import { useState } from "react";

const fastPathStages = [
  { name: "size", detail: "method table + fields + header + alignment", className: "border-cyan-500/35 bg-cyan-500/10" },
  { name: "route", detail: "SOH context / LOH / POH / slow helper", className: "border-violet-500/35 bg-violet-500/10" },
  { name: "reserve", detail: "compare alloc_ptr + size with alloc_limit", className: "border-amber-500/35 bg-amber-500/10" },
  { name: "initialize", detail: "advance pointer · zero memory · write type identity", className: "border-emerald-500/35 bg-emerald-500/10" },
  { name: "construct", detail: "return reference, then run constructor body", className: "border-rose-500/35 bg-rose-500/10" },
] as const;

export function DnmAllocationFastPathMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="CLR 小对象从计算大小、选择区域、检查分配上下文、推进指针并初始化，到执行构造函数的分配快路径" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {fastPathStages.map((stage, index) => (
            <section key={stage.name} className={`min-h-44 border p-4 ${stage.className}`}>
              <span className="text-xs text-secondary">step 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{stage.name}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{stage.detail}</p>
            </section>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background/60 p-4 text-xs text-secondary">
          context exhausted / budget exceeded / special size → refill or slow path → may coordinate with GC → retry allocation
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指针碰撞让常见小对象分配很快，但清零、构造、缓存流量和未来回收仍有成本；构造函数不是替对象申请存储的那一步。
      </figcaption>
    </figure>
  );
}

type SourceId = "object" | "array" | "boxing" | "closure" | "delegate" | "async" | "string";

const sources: Array<{
  id: SourceId;
  label: string;
  code: string;
  objects: string;
  proof: string;
  mitigation: string;
}> = [
  { id: "object", label: "类对象", code: "new Order(id)", objects: "Order 对象；构造函数内部可能继续分配", proof: "newobj + allocation stack", mitigation: "先减少调用频率或对象职责，不做盲目池化" },
  { id: "array", label: "数组", code: "new byte[length]", objects: "数组头、长度与连续元素负载；大尺寸可路由 LOH", proof: "newarr + size/heap kind", mitigation: "复用有明确所有权的缓冲区，或用 ArrayPool 并清理状态" },
  { id: "boxing", label: "装箱", code: "object value = 42", objects: "带对象头的 Int32 值副本", proof: "box 指令 + 分配事件", mitigation: "泛型/受约束调用，避免把热路径值传给 object/interface" },
  { id: "closure", label: "闭包", code: "items.Where(x => x > limit)", objects: "捕获环境(display class) + 委托，频率依作用域", proof: "编译器生成类型 + allocation stack", mitigation: "static lambda、显式状态参数或把委托移出循环" },
  { id: "delegate", label: "委托", code: "Run(Handle)", objects: "方法组到委托的转换可能创建实例；缓存取决于编译器/上下文", proof: "CIL 缓存字段 + 实测", mitigation: "稳定回调显式缓存，避免假定所有非捕获 lambda 都零分配" },
  { id: "async", label: "async/迭代器", code: "await ReadAsync()", objects: "状态机承载、Task/continuation 或枚举器，取决于路径", proof: "生成状态机 + 同步/挂起分别测", mitigation: "缩小跨 await 状态；热点且高同步完成才评估 ValueTask" },
  { id: "string", label: "字符串", code: "$\"order-{id}\"", objects: "结果 String；临时对象依插值处理器/API/日志级别", proof: "分配栈 + CIL/API lowering", mitigation: "结构化日志、StringBuilder/string.Create/Span 按场景选择" },
];

export function DnmAllocationSourceLab() {
  const [active, setActive] = useState<SourceId>("closure");
  const item = sources.find((source) => source.id === active) ?? sources[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 .NET 分配来源" className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {sources.map((source) => (
            <button key={source.id} type="button" role="tab" aria-selected={active === source.id} onClick={() => setActive(source.id)} className={`min-h-11 border px-2 py-2 text-sm transition-colors ${active === source.id ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {source.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-96 border border-border bg-background/60 p-4">
          <code className="block break-words text-xs text-accent">{item.code}</code>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="min-h-32 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">可能对象</span><p className="mb-0 mt-2 text-xs text-primary">{item.objects}</p></div>
            <div className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">验证证据</span><p className="mb-0 mt-2 text-xs text-primary">{item.proof}</p></div>
            <div className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">候选改法</span><p className="mb-0 mt-2 text-xs text-primary">{item.mitigation}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        高层语法只提出候选分配；先预测生成对象，再用 CIL 与分配调用栈证明，最后按所有权和频率选择改法。
      </figcaption>
    </figure>
  );
}

export function DnmAllocationBudgetLab() {
  const [requestsPerSecond, setRequestsPerSecond] = useState(800);
  const [bytesPerRequest, setBytesPerRequest] = useState(24000);
  const [survivalPercent, setSurvivalPercent] = useState(4);
  const mbPerSecond = (requestsPerSecond * bytesPerRequest) / 1024 / 1024;
  const mbPerMinute = mbPerSecond * 60;
  const survivorMbPerMinute = (mbPerMinute * survivalPercent) / 100;
  const diagnosis = survivalPercent >= 20
    ? "高存活：减少跨请求保留和晋升，比只压低对象数量更优先。"
    : mbPerSecond >= 100
      ? "高 churn：按累计字节排序分配栈，优先处理高频热点。"
      : "当前预算温和；先核对尾延迟和真实峰值，不为微小分配增加复杂池化。";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">请求：{requestsPerSecond}/s<input type="range" min="50" max="5000" step="50" value={requestsPerSecond} onChange={(event) => setRequestsPerSecond(Number(event.target.value))} className="mt-2 w-full accent-cyan-500" /></label>
            <label className="block text-sm text-primary">每请求分配：{bytesPerRequest.toLocaleString()} B<input type="range" min="1000" max="200000" step="1000" value={bytesPerRequest} onChange={(event) => setBytesPerRequest(Number(event.target.value))} className="mt-2 w-full accent-amber-500" /></label>
            <label className="block text-sm text-primary">跨回收存活：{survivalPercent}%<input type="range" min="1" max="50" value={survivalPercent} onChange={(event) => setSurvivalPercent(Number(event.target.value))} className="mt-2 w-full accent-rose-500" /></label>
          </div>
          <section aria-live="polite" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">allocation budget</span>
            <strong className="mt-2 block text-xl text-primary">{mbPerSecond.toFixed(1)} MB/s</strong>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-secondary">每分钟分配</span><strong className="mt-2 block text-primary">{mbPerMinute.toFixed(0)} MB</strong></div>
              <div className="border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-secondary">潜在存活</span><strong className="mt-2 block text-primary">{survivorMbPerMinute.toFixed(0)} MB</strong></div>
            </div>
            <p className="mb-0 mt-5 border-t border-border pt-4 text-xs text-secondary">{diagnosis}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调整请求频率、单请求字节和存活率；优化优先级来自“频率 × 字节 × 生命周期”，不是某次 new 看起来是否昂贵。
      </figcaption>
    </figure>
  );
}
