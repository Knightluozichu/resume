"use client";

import { useState } from "react";

const routePhases = [
  {
    phase: "01 · 程序与表达式",
    outcome: "能从源代码得到可解释的运行结果",
    className: "border-cyan-500/35 bg-cyan-500/10",
    lessons: ["L1 开发循环", "L2 输入输出", "L3 变量", "L4 表达式"],
  },
  {
    phase: "02 · 控制与分解",
    outcome: "能证明分支、循环与函数契约",
    className: "border-amber-500/35 bg-amber-500/10",
    lessons: ["L5 条件", "L6 循环", "L7 函数"],
  },
  {
    phase: "03 · 内存与组织",
    outcome: "能说明地址、边界、类型与构建链",
    className: "border-emerald-500/35 bg-emerald-500/10",
    lessons: ["L8 指针", "L9 数组", "L10 多文件", "L11 各种类型"],
  },
  {
    phase: "04 · 对象与持久化",
    outcome: "能维护对象不变量并完成文件往返",
    className: "border-violet-500/35 bg-violet-500/10",
    lessons: ["L12 类基础", "L13 类功能", "L14 继承", "L15 高级类", "L16 文件 I/O"],
  },
] as const;

export function EcpOfficialLessonRouteMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Easy C++ 第五版十六课从程序表达式到控制分解内存组织对象和文件输入输出的四阶段路线"
          className="grid gap-3 lg:grid-cols-4"
        >
          {routePhases.map((phase) => (
            <section key={phase.phase} className={`min-h-72 border p-4 ${phase.className}`}>
              <strong className="text-sm text-primary">{phase.phase}</strong>
              <p className="mt-3 min-h-12 text-xs text-secondary">{phase.outcome}</p>
              <ol className="mt-4 space-y-2">
                {phase.lessons.map((lesson) => (
                  <li key={lesson} className="border-l-2 border-current pl-3 text-xs text-primary">
                    {lesson}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        16 课不是八个主题的平铺：后一步不断复用前一步的值、控制、边界、接口与生命周期证据。
      </figcaption>
    </figure>
  );
}

const dependencyRows = [
  {
    foundation: "L1–L4 · 值从哪里来",
    bridge: "源代码 → 编译 → 输入 → 表达式结果",
    reusedBy: "所有后续程序都依赖可重复的构建和类型规则",
  },
  {
    foundation: "L5–L7 · 路径如何收敛",
    bridge: "条件集合 → 循环不变量 → 函数前后置条件",
    reusedBy: "数组遍历、类操作和文件解析都复用控制契约",
  },
  {
    foundation: "L8–L11 · 数据如何存在",
    bridge: "地址/生命周期 → 连续边界 → 翻译单元 → 数据形状",
    reusedBy: "对象布局、继承引用和 I/O 记录都依赖这些边界",
  },
  {
    foundation: "L12–L16 · 状态如何守住",
    bridge: "封装 → 构造析构 → 替换契约 → 多态 → 持久化",
    reusedBy: "从内存中的有效对象延伸到磁盘中的有效记录",
  },
] as const;

export function EcpConceptDependencyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Easy C++ 十六课中值控制数据和对象四层概念依赖及后续复用关系"
          className="space-y-3"
        >
          {dependencyRows.map((row, index) => (
            <section
              key={row.foundation}
              className="grid min-h-36 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.9fr_1.2fr_1.2fr] lg:items-center"
            >
              <div>
                <span className="text-xs text-secondary">dependency 0{index + 1}</span>
                <strong className="mt-2 block text-sm text-primary">{row.foundation}</strong>
              </div>
              <code className="break-words text-xs text-accent">{row.bridge}</code>
              <span className="text-xs text-secondary">{row.reusedBy}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        读每课时都记录“它提供了什么证据、下一课怎样消费”，就不会把语法记忆误当成掌握。
      </figcaption>
    </figure>
  );
}

const phaseGates = [
  {
    label: "程序",
    range: "Lesson 1–4",
    task: "修改输入和表达式，预测编译结果与运行输出。",
    evidence: "能保存源码、重建、运行，并解释类型转换和优先级。",
    failure: "只会复制示例，换输入后无法预测结果。",
  },
  {
    label: "控制",
    range: "Lesson 5–7",
    task: "为成绩分类函数列边界表，再用循环批量处理。",
    evidence: "0/59/60/89/90/100/101 都有预期，函数契约清楚。",
    failure: "靠多跑几次猜正确，边界和非法输入无人负责。",
  },
  {
    label: "数据",
    range: "Lesson 8–11",
    task: "追踪数组参数的地址、长度、作用域与链接来源。",
    evidence: "能画生命周期和半开区间，并定位编译或链接失败。",
    failure: "把裸指针当数组、把 include 成功当定义已链接。",
  },
  {
    label: "对象",
    range: "Lesson 12–16",
    task: "构造合法对象，经基类接口处理，再写入并重新读取。",
    evidence: "不变量、虚析构、流状态与往返比较全部通过。",
    failure: "setter 可制造非法状态，或只检查文件是否打开。",
  },
] as const;

export function EcpPhaseGateLab() {
  const [active, setActive] = useState(0);
  const gate = phaseGates[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 Easy C++ 学习阶段" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {phaseGates.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`min-h-11 border px-3 py-2 text-sm transition-colors ${
                active === index
                  ? "border-accent bg-accent/15 text-primary"
                  : "border-border bg-background text-secondary hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <span className="text-xs text-secondary">{gate.range}</span>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">任务</strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{gate.task}</p>
            </div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <strong className="text-sm text-primary">通过证据</strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{gate.evidence}</p>
            </div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4">
              <strong className="text-sm text-primary">未通过信号</strong>
              <p className="mb-0 mt-3 text-xs text-secondary">{gate.failure}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换阶段比较任务、证据与失败信号；只有证据可复现，才进入下一段。
      </figcaption>
    </figure>
  );
}
