"use client";

import { useState } from "react";

const phases = [
  { phase: "01 · 工具链与数据", range: "Ch 1–6", outcome: "能从源码、输入和值域证明程序路径", chapters: ["getting-started-with-cpp", "setting-out-to-cpp", "dealing-with-data", "compound-types", "loops-and-relational-expressions", "branching-statements-and-logical-operators"] },
  { phase: "02 · 函数与模块", range: "Ch 7–9", outcome: "能写函数契约并定位翻译单元边界", chapters: ["functions-programming-modules", "adventures-in-functions", "memory-models-and-namespaces"] },
  { phase: "03 · 对象与复用", range: "Ch 10–15", outcome: "能维护对象所有权、替换与异常边界", chapters: ["objects-and-classes", "working-with-classes", "classes-and-dynamic-memory-allocation", "class-inheritance", "reusing-code-in-cpp", "friends-exceptions-and-more"] },
  { phase: "04 · 库、I/O 与 C++11", range: "Ch 16–18", outcome: "能组合范围、持久化和移动/callable", chapters: ["string-class-and-stl", "input-output-and-files", "visiting-new-cpp-standard"] },
] as const;

export function EppOfficialChapterRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ Primer Plus第六版十八章四阶段官方路线" className="grid gap-3 lg:grid-cols-4">
          {phases.map((phase) => (
            <section key={phase.phase} className="min-h-96 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">{phase.phase}</strong>
              <span className="mt-2 block text-xs text-secondary">{phase.range}</span>
              <p className="mt-3 min-h-14 text-xs text-primary">{phase.outcome}</p>
              <ol className="mt-4 space-y-2">
                {phase.chapters.map((chapter) => <li key={chapter} className="border-l-2 border-accent/60 pl-3 text-xs text-secondary break-words">{chapter}</li>)}
              </ol>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        18 个精确 chapter slug 是内容、题库和导航的共同主键；每阶段产出会成为下一阶段的前置证据。
      </figcaption>
    </figure>
  );
}

const dependencies = [
  { source: "Ch 1–3 · build/value", bridge: "current executable + typed input + conversion proof", consumer: "所有后续代码必须先证明运行的是当前源码和值有效" },
  { source: "Ch 4–6 · shape/path", bridge: "address + length + input partition + loop invariant", consumer: "函数、类和算法都消费范围与控制流契约" },
  { source: "Ch 7–9 · function/module", bridge: "prototype + parameter mode + TU/linkage/lifetime", consumer: "class methods/templates/I/O 模块依赖稳定接口与定义边界" },
  { source: "Ch 10–15 · object/reuse", bridge: "invariant + copy control + substitution + unwind", consumer: "STL ownership、持久对象和移动语义依赖有效生命周期" },
  { source: "Ch 16–18 · library/system", bridge: "range + owner + stream state + callable", consumer: "最终项目把内存对象、文件和现代接口闭成证据链" },
] as const;

export function EppChapterDependencyFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ Primer Plus章节从工具链值路径函数模块对象到库系统的依赖流程" className="space-y-3">
          {dependencies.map((row, index) => (
            <section key={row.source} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.85fr_1.2fr_1.4fr] lg:items-center">
              <div><span className="text-xs text-secondary">dependency 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.source}</strong></div>
              <code className="break-words text-xs text-accent">{row.bridge}</code>
              <span className="text-xs text-secondary">{row.consumer}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        学习顺序不是为了背目录：每一段都提供下一段无法替代的值、范围、接口或生命周期证据。
      </figcaption>
    </figure>
  );
}

const gates = [
  { label: "程序", range: "Ch 1–6", task: "干净构建一个读取输入并分类统计的程序", evidence: "合法/边界/非法输入均有预测与路径表", failure: "运行旧产物或 eof/边界失败仍复用旧值" },
  { label: "模块", range: "Ch 7–9", task: "拆分头文件、实现文件和调用文件", evidence: "能复现并区分 compile/link/name lookup 失败", failure: "用 include .cpp 或全局 using 掩盖符号问题" },
  { label: "对象", range: "Ch 10–15", task: "实现拥有资源的多态对象队列", evidence: "复制、赋值、虚析构、异常展开和 RTTI 边界通过", failure: "浅复制、切片或 delete Base* 破坏生命周期" },
  { label: "系统", range: "Ch 16–18", task: "用 STL 处理对象并完成文件往返", evidence: "范围/owner/stream state/move/callable 都可追踪", failure: "仅检查文件存在或 move 后读取未规定状态" },
] as const;

export function EppStudyGateLab() {
  const [active, setActive] = useState(0);
  const gate = gates[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择C++ Primer Plus学习阶段闸门" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {gates.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">{gate.range}</span>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">task</strong><p className="mb-0 mt-3 text-xs text-secondary">{gate.task}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">pass evidence</strong><p className="mb-0 mt-3 text-xs text-secondary">{gate.evidence}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">failure signal</strong><p className="mb-0 mt-3 text-xs text-secondary">{gate.failure}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        阶段通过以可运行作品、边界测试和故障解释为准，不以读完页数或一次成功输出为准。
      </figcaption>
    </figure>
  );
}
