"use client";

import { useState } from "react";

const anatomyRows = [
  { token: "#include <iostream>", role: "preprocessor input", evidence: "cout/cin declarations become visible" },
  { token: "int main()", role: "program entry", evidence: "execution begins in function body" },
  { token: "int value{0};", role: "declaration", evidence: "named int starts initialized" },
  { token: "std::cin >> value;", role: "input statement", evidence: "stream attempts conversion into value" },
  { token: "return 0;", role: "termination", evidence: "successful status returned to environment" },
] as const;

export function EppSettingOutProgramAnatomyMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ 最小输入输出程序中 include main 声明输入和返回语句的职责与证据" className="space-y-3">
          {anatomyRows.map((row, index) => (
            <section key={row.token} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.8fr_0.7fr_1.2fr] lg:items-center">
              <div><span className="text-xs text-secondary">line 0{index + 1}</span><code className="mt-2 block break-words text-xs text-accent">{row.token}</code></div>
              <strong className="text-sm text-primary">{row.role}</strong>
              <span className="text-xs text-secondary">evidence · {row.evidence}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一行都有阶段和状态责任；“样板代码”也必须能解释输入、执行与退出证据。
      </figcaption>
    </figure>
  );
}

const streamRows = [
  { direction: "keyboard → cin", operation: ">> extraction", state: "characters parsed as target type", failure: "format mismatch leaves input failed" },
  { direction: "variable → expression", operation: "read / compute", state: "typed value produces a new result", failure: "uninitialized or invalid domain" },
  { direction: "result → cout", operation: "<< insertion", state: "value formatted as characters", failure: "representation differs from expectation" },
  { direction: "cout → terminal", operation: "buffer / flush", state: "characters become observable", failure: "flush timing is not business correctness" },
] as const;

export function EppSettingOutStreamFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="键盘字符经 cin 类型解析变量计算 cout 格式化到终端的输入输出流" className="grid gap-3 lg:grid-cols-4">
          {streamRows.map((row, index) => (
            <section key={row.direction} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">flow 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.direction}</strong>
              <code className="mt-4 block break-words text-xs text-accent">{row.operation}</code>
              <p className="mt-4 text-xs text-primary">{row.state}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">failure · {row.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        cin/cout 传递的是字符表示与类型转换结果；箭头方向由运算符相对流对象的位置决定。
      </figcaption>
    </figure>
  );
}

const traceCases = [
  { label: "声明", line: "int cups{3};", before: "name absent", after: "cups exists, int value = 3", question: "初始化是否完成？" },
  { label: "输入", line: "std::cin >> cups;", before: "cups = 3, input = 5", after: "cups = 5 if extraction succeeds", question: "失败时谁检查 stream state？" },
  { label: "调用", line: "int total = double_it(cups);", before: "cups = 5", after: "new call frame returns 10; total = 10", question: "prototype and return contract match?" },
  { label: "输出", line: "std::cout << total << '\\n';", before: "total = 10", after: "characters '10\\n' inserted", question: "value or representation being observed?" },
] as const;

export function EppSettingOutStatementTraceLab() {
  const [active, setActive] = useState(0);
  const current = traceCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 C++ 语句类型" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {traceCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-11 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-72 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.line}</code>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-4"><span className="text-xs text-secondary">before</span><p className="mb-0 mt-3 text-xs text-primary">{current.before}</p></div>
            <div className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">after</span><p className="mb-0 mt-3 text-xs text-primary">{current.after}</p></div>
          </div>
          <p className="mb-0 mt-4 text-xs text-secondary">review · {current.question}</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换语句并追踪前后状态；理解语句的标准是能预测状态变化，而不是只认得关键字。
      </figcaption>
    </figure>
  );
}
