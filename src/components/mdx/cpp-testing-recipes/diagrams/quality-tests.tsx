"use client";

import { useState } from "react";

const firstRows = [
  { key: "F", name: "Fast", check: "局部秒级、全套可频繁运行", failure: "真实 I/O 或无界等待" },
  { key: "I", name: "Independent", check: "任意顺序与并行均成立", failure: "共享全局或前例残留" },
  { key: "R", name: "Repeatable", check: "同输入同环境得同结论", failure: "墙上时钟、随机种子、网络" },
  { key: "S", name: "Self-validating", check: "进程自动判定通过失败", failure: "人工读日志或截图" },
  { key: "T", name: "Timely", check: "行为形成前或同时出现", failure: "结构冻结后才补测试" },
] as const;

export function CtrFirstPropertiesMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="FIRST 测试质量属性及检查和失效模式" className="space-y-3">
          {firstRows.map((item, index) => (
            <section key={item.key} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.35fr_0.65fr_1.3fr_1.1fr] lg:items-center">
              <span className="text-lg font-semibold text-accent">{item.key}</span>
              <strong className="text-sm text-primary">{item.name}</strong>
              <span className="text-xs text-primary">check · {item.check}</span>
              <span className="text-xs text-secondary">risk · {item.failure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FIRST 不是命名口号；每项都要用时长、顺序、重复执行、退出状态和提交时机留下证据。
      </figcaption>
    </figure>
  );
}

const scopeGates = [
  { gate: "behavior", question: "所有断言是否共同证明一个领域结果？", split: "否则按结果拆测试" },
  { gate: "setup", question: "失败是否共享同一输入和触发动作？", split: "否则不要塞进一个场景" },
  { gate: "diagnostic", question: "第一项失败后其余差值仍有价值吗？", split: "前置用 ASSERT，结果用 EXPECT" },
  { gate: "name", question: "测试名能否不使用 and 说明行为？", split: "不能则常有多个责任" },
] as const;

export function CtrAssertionScopeFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="判断一个测试中多个断言是否属于同一行为焦点的四道闸门" className="space-y-3">
          {scopeGates.map((item, index) => (
            <section key={item.gate} className="grid min-h-28 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.45fr_1.5fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">gate 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{item.gate}</strong></div>
              <span className="text-xs text-primary">{item.question}</span>
              <span className="text-xs text-accent">decision · {item.split}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        “一个断言”真正约束的是一个行为焦点；同一结果的多个字段可以共同断言，不同动作和原因应拆开。
      </figcaption>
    </figure>
  );
}

const abstractionCases = [
  { label: "对象母亲", code: "anExpiredOrder()", value: "隐藏无关字段，突出边界", danger: "默认值过多导致测试不知道输入" },
  { label: "自定义断言", code: "expectPaid(order)", value: "集中领域差值与错误消息", danger: "只返回 bool 丢失实际细节" },
  { label: "测试 DSL", code: "given().when().then()", value: "复杂协议可读", danger: "简单行为被多层流式 API 掩盖" },
  { label: "共享 fixture", code: "SetUp()", value: "去除稳定机械准备", danger: "隐藏关键输入并制造共享状态" },
] as const;

export function CtrTestAbstractionLab() {
  const [active, setActive] = useState(0);
  const current = abstractionCases[active];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择测试抽象情形" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {abstractionCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.code}</code>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">价值</span><p className="mb-0 mt-3 text-xs text-primary">{current.value}</p></div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4"><span className="text-xs text-secondary">风险</span><p className="mb-0 mt-3 text-xs text-primary">{current.danger}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试抽象应隐藏机械噪声并放大领域输入、动作和结果；若失败必须穿透多层 helper，抽象已经过头。
      </figcaption>
    </figure>
  );
}
