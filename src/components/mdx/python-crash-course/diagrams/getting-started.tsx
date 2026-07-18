"use client";

import { useState } from "react";

const environments = [
  { os: "Windows", command: "py --version", run: "py hello_world.py", note: "优先确认 Python Launcher 指向的版本。" },
  { os: "macOS", command: "python3 --version", run: "python3 hello_world.py", note: "不要把系统工具依赖的解释器和项目解释器混用。" },
  { os: "Linux", command: "python3 --version", run: "python3 hello_world.py", note: "发行版可能预装 Python，但仍需确认路径与版本。" },
];

export function PccEnvironmentResolverLab() {
  const [selected, setSelected] = useState(1);
  const item = environments[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="选择操作系统">
          {environments.map((environment, index) => (
            <button key={environment.os} type="button" onClick={() => setSelected(index)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{environment.os}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">verify</span><code className="mt-2 block break-all text-sm text-primary">{item.command}</code></div>
          <div className="border border-violet-500/40 bg-violet-500/10 p-3"><span className="text-xs text-secondary">run</span><code className="mt-2 block break-all text-sm text-primary">{item.run}</code></div>
          <div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">decision</span><p className="mt-2 text-sm leading-6 text-primary">{item.note}</p></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一个 `.py` 文件在不同系统上可能使用不同启动命令，但都要先证明实际解释器版本。</figcaption>
    </figure>
  );
}

const executionSteps = [
  { label: "保存文件", artifact: "hello_world.py", result: "磁盘上出现 UTF-8 Python 源文件", owner: "editor" },
  { label: "选择解释器", artifact: "Python 3.11+ path", result: "VS Code 与终端指向同一 executable", owner: "environment" },
  { label: "解析源代码", artifact: "print(...) call", result: "语法有效，生成可执行 bytecode", owner: "interpreter" },
  { label: "执行并输出", artifact: "stdout", result: "终端显示 Hello Python world!", owner: "runtime" },
];

export function PccExecutionTraceLab() {
  const [step, setStep] = useState(0);
  const current = executionSteps[step];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {executionSteps.map((item, index) => <button key={item.label} type="button" onClick={() => setStep(index)} className={`min-h-16 border px-2 text-xs sm:text-sm ${step === index ? "border-cyan-500 bg-cyan-500/10 text-primary" : "border-border bg-bg text-secondary"}`}>0{index + 1}<span className="mt-1 block">{item.label}</span></button>)}
        </div>
        <section className="mt-4 border border-border bg-bg p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div><span className="text-xs text-secondary">owner</span><strong className="mt-2 block text-sm text-primary">{current.owner}</strong></div>
            <div><span className="text-xs text-secondary">artifact</span><code className="mt-2 block break-all text-sm text-primary">{current.artifact}</code></div>
            <div><span className="text-xs text-secondary">observable result</span><strong className="mt-2 block text-sm leading-6 text-primary">{current.result}</strong></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Hello World 的完整链路是“文件 → 解释器 → 解析 → stdout”，每一步都有可观察证据。</figcaption>
    </figure>
  );
}

const incidents = [
  { symptom: "command not found", layer: "启动命令 / PATH", inspect: "检查 python3 或 py 是否存在，并打印 executable 路径", fix: "安装 Python 或改用系统对应的正确命令" },
  { symptom: "can't open file", layer: "当前目录 / 文件名", inspect: "pwd 或 cd，确认 hello_world.py 的绝对路径", fix: "进入文件所在目录，或把完整路径传给解释器" },
  { symptom: "SyntaxError", layer: "源代码语法", inspect: "读取 traceback 的文件、行号和 caret", fix: "修正引号、括号、冒号或缩进后重新运行" },
  { symptom: "VS Code 能跑，终端不能", layer: "解释器选择不一致", inspect: "比较 VS Code interpreter 与终端 sys.executable", fix: "让编辑器和终端使用同一 Python executable" },
];

export function PccTroubleshootingLab() {
  const [selected, setSelected] = useState(0);
  const incident = incidents[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <label className="border border-border bg-bg p-4 text-sm text-primary">observed symptom<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary">{incidents.map((item, index) => <option key={item.symptom} value={index}>{item.symptom}</option>)}</select></label>
          <section className="grid gap-3 sm:grid-cols-3">
            <div className="border border-rose-500/40 bg-rose-500/10 p-3"><span className="text-xs text-secondary">layer</span><strong className="mt-2 block text-sm text-primary">{incident.layer}</strong></div>
            <div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">inspect</span><p className="mt-2 text-sm leading-6 text-primary">{incident.inspect}</p></div>
            <div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">minimal fix</span><p className="mt-2 text-sm leading-6 text-primary">{incident.fix}</p></div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先按错误来自命令、路径、语法还是解释器身份分层，再做最小修复。</figcaption>
    </figure>
  );
}
