"use client";

import { useState } from "react";

const paradigmRows = [
  {
    layer: "C foundation",
    focus: "types · expressions · functions · direct memory",
    question: "按步骤怎样完成计算？",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    layer: "C++ object model",
    focus: "class · encapsulation · inheritance · polymorphism",
    question: "谁拥有状态和允许的操作？",
    className: "border-violet-500/35 bg-violet-500/10",
  },
  {
    layer: "generic programming",
    focus: "templates · reusable algorithms · type contracts",
    question: "同一结构怎样服务多种类型？",
    className: "border-amber-500/35 bg-amber-500/10",
  },
] as const;

export function EppGettingStartedParadigmMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 由 C 过程式基础扩展到对象模型和泛型编程的三层范式图" className="grid gap-3 lg:grid-cols-3">
          {paradigmRows.map((row, index) => (
            <section key={row.layer} className={`min-h-56 border p-4 ${row.className}`}>
              <span className="text-xs text-secondary">layer 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.layer}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.focus}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">{row.question}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 没有抛弃过程式基础，而是在其上加入对象和泛型工具；应按问题选择范式，而不是把所有代码都写成类。
      </figcaption>
    </figure>
  );
}

const buildStages = [
  { stage: "source", artifact: "hello.cpp", check: "保存路径与当前内容", failure: "语法/声明错误" },
  { stage: "preprocess", artifact: "expanded tokens", check: "include 与条件编译", failure: "头文件缺失" },
  { stage: "compile", artifact: "hello.o", check: "类型与机器代码", failure: "编译诊断" },
  { stage: "link", artifact: "hello", check: "定义与库符号", failure: "undefined/duplicate" },
  { stage: "run", artifact: "process + output", check: "输入、退出码、结果", failure: "运行/逻辑错误" },
] as const;

export function EppGettingStartedBuildFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 源文件经过预处理编译链接再运行的五阶段产物检查和失败流程" className="space-y-3">
          {buildStages.map((row, index) => (
            <section key={row.stage} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.5fr_0.8fr_1.1fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">stage 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.stage}</strong></div>
              <code className="break-words text-xs text-accent">{row.artifact}</code>
              <span className="text-xs text-primary">check · {row.check}</span>
              <span className="text-xs text-secondary">failure · {row.failure}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个阶段都产生新证据；编译成功只到目标文件，链接和运行仍有独立失败边界。
      </figcaption>
    </figure>
  );
}

const failureCases = [
  {
    label: "旧产物",
    change: "修改输出文字但不重新编译",
    observed: "程序仍打印旧文本",
    proof: "比较源码与可执行文件时间，删除产物后重建",
    owner: "source/build boundary",
  },
  {
    label: "编译",
    change: "删除字符串末尾引号",
    observed: "编译器在源位置报告 token 错误",
    proof: "保留完整命令与首个诊断，缩小到最小源码",
    owner: "compiler",
  },
  {
    label: "链接",
    change: "只声明 greet() 而不链接定义",
    observed: "目标文件生成，但最终 undefined reference",
    proof: "检查实现目标文件和最终链接命令",
    owner: "linker",
  },
  {
    label: "运行",
    change: "读取零作为除数",
    observed: "已生成程序，但结果无效或运行失败",
    proof: "记录输入、退出码和触发路径",
    owner: "runtime/program contract",
  },
] as const;

export function EppGettingStartedFailureLab() {
  const [active, setActive] = useState(0);
  const current = failureCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 C++ 构建故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {failureCases.map((item, index) => (
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
          <span className="text-xs text-secondary">owner · {current.owner}</span>
          <strong className="mt-3 block text-base text-primary">{current.change}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">预期现象</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.observed}</p>
            </div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">确认方法</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.proof}</p>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测故障属于哪个阶段，再制造并取证；不要用“代码有问题”合并四类不同现象。
      </figcaption>
    </figure>
  );
}
