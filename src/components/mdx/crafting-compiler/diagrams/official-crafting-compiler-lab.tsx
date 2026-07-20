"use client";

import { useState } from "react";

type View = "structure" | "execution" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";
type VisualKind =
  | "compiler-roadmap"
  | "toolchain-pipeline"
  | "language-contract"
  | "parser-decision"
  | "scanner"
  | "javacc-choice"
  | "syntax-tree"
  | "action-node"
  | "ast"
  | "scope-bindings"
  | "type-derivation"
  | "ir-control-flow"
  | "ia32-machine"
  | "instruction-effect"
  | "call-frame"
  | "instruction-selection"
  | "frame-layout"
  | "optimization-diff"
  | "elf-object"
  | "symbol-resolution"
  | "loader-mapping"
  | "got-plt"
  | "reading-route"
  | "source-registry"
  | "fault-trace";

type CompilerModel = {
  studio: string;
  boundary: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  fault: string;
  invariant: string;
  task: string;
  artifact: string;
  signal: string;
  practiceMode: string;
};

type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  chain: readonly string[];
  model: CompilerModel;
  view: View;
};

type VisualSpec = {
  kind: VisualKind;
  heading: string;
  caption: string;
  items: readonly string[];
};

const visualByUnit: Record<string, VisualSpec> = {
  "crc-official-learning-map": {
    kind: "compiler-roadmap",
    heading: "C♭ 从源文件到进程的证据路线",
    caption:
      "每个箭头都是一种表示转换；验收时应停在第一份与预测不同的中间产物。",
    items: [
      "C♭ 源文件",
      "Token 流",
      "AST / 绑定 / 类型",
      "IR",
      "IA-32 汇编",
      "ELF 对象与进程",
    ],
  },
  "crc-01-start-compiler": {
    kind: "toolchain-pipeline",
    heading: "最小 cbc 工具链",
    caption:
      "汇编、目标文件和可执行文件必须来自同一次源码构建，旧工件不能穿过失败阶段。",
    items: [
      "sample.cb",
      "cbc -S",
      "sample.s",
      "as --32",
      "sample.o",
      "ld → sample",
    ],
  },
  "crc-02-cflat-cbc": {
    kind: "language-contract",
    heading: "C♭ 构造与 cbc 阶段合同",
    caption: "语言语法、静态语义、表示布局和编译阶段是四种不同约束。",
    items: [
      "声明 → parser / AST",
      "表达式 → type / IR",
      "控制流 → label / jump",
      "函数 → ABI / frame",
      "全局量 → section / symbol",
      "诊断 → source span / stop",
    ],
  },
  "crc-03-parsing-overview": {
    kind: "parser-decision",
    heading: "解析方法与歧义处理决策树",
    caption:
      "先找共同前缀与结合性，再决定改写文法、局部 LOOKAHEAD 或明确拒绝。",
    items: [
      "Token 前缀",
      "LL 选择点",
      "共同前缀？",
      "改写产生式",
      "局部 LOOKAHEAD",
      "唯一解析 / 最早报错",
    ],
  },
  "crc-04-lexical-analysis": {
    kind: "scanner",
    heading: "JavaCC 扫描器消费字符的过程",
    caption:
      "TOKEN、SKIP 与 MORE 都消费字符，但只有 TOKEN 产生可供解析器读取的 token。",
    items: [
      "字符：int total = 12;",
      "TOKEN<int>",
      "SKIP<space>",
      "TOKEN<IDENT:total>",
      "TOKEN<ASSIGN>",
      "TOKEN<INT:12> + SEMI",
    ],
  },
  "crc-05-javacc-parser": {
    kind: "javacc-choice",
    heading: "EBNF 选择点与 LOOKAHEAD",
    caption: "前看只解决当前选择；不能用全局前看掩盖二义文法和错误恢复问题。",
    items: [
      "statement()",
      "前缀 IDENT",
      "IDENT '(' → call",
      "IDENT '=' → assign",
      "其他 → ParseException",
      "DEBUG_LOOKAHEAD 轨迹",
    ],
  },
  "crc-06-syntax-analysis": {
    kind: "syntax-tree",
    heading: "定义、语句与表达式的语法树",
    caption: "树形直接编码优先级、结合性、悬挂 else 的归属与源跨度。",
    items: [
      "FunctionDefinition",
      "Block",
      "IfStatement",
      "BinaryExpr: +",
      "BinaryExpr: *",
      "Variable / IntegerLiteral",
    ],
  },
  "crc-07-javacc-actions-ast": {
    kind: "action-node",
    heading: "JavaCC action 到不可变 AST 节点",
    caption: "action 只提取匹配值并构造节点；引用消解和类型检查留给后续遍历。",
    items: [
      "匹配 token",
      "捕获 SourceSpan",
      "执行 action",
      "new BinaryOpNode",
      "挂接左右子树",
      "失败路径无符号表残留",
    ],
  },
  "crc-08-build-ast": {
    kind: "ast",
    heading: "C♭ AST 节点层次",
    caption:
      "结构快照比较节点类型、子女次序和源跨度，而不是不稳定的对象 toString。",
    items: [
      "AST",
      "Declarations",
      "Statements",
      "Expressions",
      "LHS / RHS",
      "Location + type slot",
    ],
  },
  "crc-09-reference-resolution": {
    kind: "scope-bindings",
    heading: "嵌套作用域与声明绑定",
    caption: "引用必须连接唯一声明 ID；同名、遮蔽和未定义由作用域边界决定。",
    items: [
      "global: value#1",
      "function parameter: value#2",
      "block local: count#3",
      "use value → #2",
      "inner use count → #3",
      "missing → diagnostic",
    ],
  },
  "crc-10-static-type-checking": {
    kind: "type-derivation",
    heading: "表达式类型推导与显式转换",
    caption:
      "每个节点同时记录类型和值类别；相容、可转换和机器宽度不能混成一个判断。",
    items: [
      "Variable p : int* (lvalue)",
      "Integer 1 : int",
      "p + 1 : int*",
      "Dereference : int (lvalue)",
      "assignment requires modifiable lvalue",
      "invalid conversion → stop before IR",
    ],
  },
  "crc-11-ir-conversion": {
    kind: "ir-control-flow",
    heading: "有副作用表达式的 IR 控制流",
    caption:
      "地址只求一次，短路与循环标签闭合，源语言规定的副作用次数保持不变。",
    items: [
      "evaluate address of a[i++]",
      "save address temp",
      "load old value",
      "compute + 1",
      "store once",
      "continue / break labels",
    ],
  },
  "crc-12-x86-overview": {
    kind: "ia32-machine",
    heading: "IA-32 寄存器、栈与静态数据",
    caption:
      "本书主线冻结 32 位目标；寄存器宽度、符号扩展、对齐和保存规则必须来自同一 ABI。",
    items: [
      "EAX：返回值 / 暂存",
      "ECX / EDX：caller-saved",
      "EBX / ESI / EDI：callee-saved",
      "ESP：栈顶",
      "EBP：帧基址",
      ".data / .bss / .rodata",
    ],
  },
  "crc-13-x86-assembly": {
    kind: "instruction-effect",
    heading: "GNU as 指令对机器状态的影响",
    caption:
      "AT&T 源、目的次序和宽度后缀要与反汇编、寄存器及 EFLAGS 变化逐项核对。",
    items: [
      "movl $4, %eax",
      "addl %ebx, %eax",
      "cmpl %ecx, %eax",
      "setl %al",
      "jmp / jcc target",
      "bytes + registers + EFLAGS",
    ],
  },
  "crc-14-functions-variables": {
    kind: "call-frame",
    heading: "Linux/IA-32 函数调用帧",
    caption: "参数、返回地址、旧 EBP、局部变量和保存寄存器形成可手算的栈布局。",
    items: [
      "caller pushes arguments",
      "call pushes return address",
      "push %ebp / mov %esp,%ebp",
      "locals + saved registers",
      "EAX return value",
      "leave / ret restores ESP",
    ],
  },
  "crc-15-compile-expressions-statements": {
    kind: "instruction-selection",
    heading: "IR 节点到 x86 指令模式",
    caption:
      "代码生成既要满足语义，也要满足合法操作数形式、寄存器约束和标签闭合。",
    items: [
      "IR Bin(op,left,right)",
      "evaluate left → temp",
      "evaluate right → register",
      "select addl / subl / imull",
      "emit branch labels",
      "assemble + disassemble + run",
    ],
  },
  "crc-16-stack-frame": {
    kind: "frame-layout",
    heading: "参数、局部量、临时槽与 alloca 布局",
    caption:
      "每次改变对象大小或对齐都要重算全部偏移，并验证每条返回路径恢复相同 ESP。",
    items: [
      "EBP+12 arg2",
      "EBP+8 arg1",
      "EBP+4 return address",
      "EBP+0 old EBP",
      "EBP-4 local",
      "EBP-8 temp / dynamic area",
    ],
  },
  "crc-17-optimization": {
    kind: "optimization-diff",
    heading: "优化前后语义差分",
    caption:
      "一次只启用一个变换；先用差分样本证明语义保持，再讨论尺寸或成本收益。",
    items: [
      "before: load 1; add 2",
      "transform: constant fold",
      "after: load 3",
      "side-effect guard",
      "same observable result",
      "size / instruction count delta",
    ],
  },
  "crc-18-object-files": {
    kind: "elf-object",
    heading: "ELF 可重定位目标文件剖面",
    caption:
      "节、符号和重定位相互引用；节文件偏移不是运行地址，节也不等于加载段。",
    items: [
      "ELF header: ET_REL / EM_386",
      ".text + .rel.text",
      ".data / .bss",
      ".symtab / .strtab",
      "undefined symbol",
      "relocation: offset + type + symbol",
    ],
  },
  "crc-19-linking-libraries": {
    kind: "symbol-resolution",
    heading: "目标文件、归档库与共享库的符号解析",
    caption:
      "链接顺序会改变归档成员选择；每个未定义符号都应追到确切定义和重定位。",
    items: [
      "main.o: U calculate",
      "libcalc.a(calc.o): T calculate",
      "libc.so: shared definitions",
      "archive scan order",
      "relocation application",
      "link map + final dependency",
    ],
  },
  "crc-20-program-loading": {
    kind: "loader-mapping",
    heading: "ELF 程序头到进程虚拟地址映射",
    caption:
      "加载器主要消费 program headers；PT_LOAD 的文件区间、内存区间和权限决定运行映射。",
    items: [
      "ELF header + entry",
      "PT_LOAD R-X: text",
      "PT_LOAD RW-: data / bss",
      "PT_INTERP",
      "dynamic relocations",
      "jump to entry with mapped pages",
    ],
  },
  "crc-21-position-independent-code": {
    kind: "got-plt",
    heading: "PIC 数据引用与函数调用路径",
    caption:
      "代码段不固化某次装载地址；外部数据经 GOT，外部函数经 PLT 和动态绑定解析。",
    items: [
      "PIC instruction",
      "PC-relative base",
      "GOT entry → global data",
      "PLT stub",
      "dynamic resolver",
      "resolved function address",
    ],
  },
  "crc-22-further-reading": {
    kind: "reading-route",
    heading: "从 cbc 机制缺口到实现扩展",
    caption: "每条阅读路线由一个可观察缺口驱动，并以补丁、样本和回归结果结束。",
    items: [
      "识别 cbc 限制",
      "定位规范 / 上游实现",
      "写最小反例",
      "实现一个扩展",
      "比较中间产物",
      "提交补丁 + 回归",
    ],
  },
  "crc-appendix-resources": {
    kind: "source-registry",
    heading: "参考资料的身份、版本与实验关联",
    caption:
      "链接列表不能替代来源登记；失效链接要保留原身份、归档与替代一手资料。",
    items: [
      "作者 / 标题",
      "原始 URL",
      "版本 / 访问日期",
      "归档 / SHA-256",
      "支持的章节机制",
      "最小复现实验",
    ],
  },
  "crc-official-final-review": {
    kind: "fault-trace",
    heading: "C♭ 编译故障的跨层答辩路径",
    caption:
      "同一源码与工具链指纹贯穿所有工件，任何中间层失败都不能被最终结果平均。",
    items: [
      "source + toolchain identity",
      "token / AST first divergence",
      "binding / type / IR",
      "assembly / ABI",
      "ELF / loader",
      "clean rebuild → release or rollback",
    ],
  },
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "基线对象",
  fault: "故障传播",
  recovery: "清理重建",
};
const short = (value: string, limit = 36) =>
  value.length > limit ? `${value.slice(0, limit)}…` : value;

function Pipeline({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <ol className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
      {items.slice(0, 6).map((item, index) => (
        <li
          key={item}
          className={`relative min-h-24 rounded border p-3 text-xs leading-5 ${active === index ? "border-orange-600 bg-orange-50 font-semibold text-orange-950 dark:bg-orange-950 dark:text-orange-50" : "border-zinc-300 dark:border-zinc-700"}`}
        >
          <span className="mb-2 block font-mono font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          {item}
          {index < 5 && (
            <span
              className="absolute -right-2 top-9 z-10 hidden bg-white px-1 text-zinc-500 xl:block dark:bg-zinc-950"
              aria-hidden
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function ContractGrid({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item, index) => {
        const [subject, owner] = item.split(" → ");
        return (
          <div
            key={item}
            className={`grid min-h-20 grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)] items-center gap-2 rounded border p-3 text-xs ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            <strong className="[overflow-wrap:anywhere]">{subject}</strong>
            <span aria-hidden>→</span>
            <span className="[overflow-wrap:anywhere]">{owner}</span>
          </div>
        );
      })}
    </div>
  );
}

function DecisionTree({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-3">
      <div
        className={`mx-auto w-full max-w-sm rounded border-2 p-3 text-center text-xs ${active === 0 ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-400"}`}
      >
        {items[0]}
      </div>
      <span className="text-center text-zinc-500" aria-hidden>
        ↓
      </span>
      <div
        className={`mx-auto w-full max-w-sm rotate-1 rounded border-2 p-3 text-center text-xs ${active === 1 || active === 2 ? "border-amber-600 bg-amber-50 dark:bg-amber-950" : "border-zinc-400"}`}
      >
        {items[1]} · {items[2]}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.slice(3).map((item, index) => (
          <div
            key={item}
            className={`rounded border p-3 text-center text-xs ${active === index + 3 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenStream({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div>
      <div className="rounded border border-zinc-400 bg-zinc-950 p-3 font-mono text-xs text-zinc-100 [overflow-wrap:anywhere]">
        {items[0]}
      </div>
      <div className="my-3 text-center text-zinc-500" aria-hidden>
        字符按最长匹配被逐段消费 ↓
      </div>
      <div className="flex flex-wrap gap-2">
        {items.slice(1).map((item, index) => (
          <span
            key={item}
            className={`min-h-11 rounded border px-3 py-2 font-mono text-xs ${active === index + 1 ? "border-rose-600 bg-rose-50 font-semibold text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Tree({
  items,
  active,
  action = false,
}: {
  items: readonly string[];
  active: number;
  action?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`mx-auto w-fit rounded border-2 px-5 py-3 text-center text-xs ${active === 0 ? "border-orange-600 bg-orange-50 dark:bg-orange-950" : "border-zinc-400"}`}
      >
        {items[0]}
      </div>
      <div className="mx-auto h-5 w-px bg-zinc-400" />
      <div className="grid gap-2 sm:grid-cols-2">
        {items.slice(1, 3).map((item, index) => (
          <div
            key={item}
            className={`rounded border p-3 text-center text-xs ${active === index + 1 ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="my-2 text-center text-zinc-500" aria-hidden>
        {action ? "action 构造并挂接 ↓" : "子节点展开 ↓"}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.slice(3).map((item, index) => (
          <div
            key={item}
            className={`rounded border p-3 text-center text-xs ${active === index + 3 ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScopeGraph({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div className="grid gap-2">
        {items.slice(0, 3).map((item, index) => (
          <div
            key={item}
            className={`rounded border p-3 text-xs ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-center text-2xl text-zinc-500"
        aria-hidden
      >
        ⇢
      </div>
      <div className="grid gap-2">
        {items.slice(3).map((item, index) => (
          <div
            key={item}
            className={`rounded border p-3 text-xs ${active === index + 3 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeProof({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <ol className="mx-auto grid max-w-2xl gap-1">
      {items.map((item, index) => (
        <li
          key={item}
          className={`relative min-h-12 rounded border px-4 py-3 text-xs ${active === index ? "border-blue-600 bg-blue-50 font-semibold text-blue-950 dark:bg-blue-950 dark:text-blue-50" : "border-zinc-300 dark:border-zinc-700"}`}
          style={{ marginInline: `${Math.min(index, 3) * 10}px` }}
        >
          <span className="mr-3 font-mono text-zinc-500">Γ ⊢</span>
          {item}
        </li>
      ))}
    </ol>
  );
}

function Machine({
  items,
  active,
  instructions = false,
}: {
  items: readonly string[];
  active: number;
  instructions?: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item}
          className={`min-h-24 rounded border p-3 text-xs ${active === index ? "border-rose-600 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}
        >
          <span className="mb-2 block font-mono font-bold">
            {instructions
              ? `step ${index + 1}`
              : index < 5
                ? "register / stack"
                : "memory"}
          </span>
          {item}
        </div>
      ))}
    </div>
  );
}

function StackFrame({
  items,
  active,
  dynamic = false,
}: {
  items: readonly string[];
  active: number;
  dynamic?: boolean;
}) {
  return (
    <div className="mx-auto max-w-lg rounded border-2 border-zinc-500 p-2">
      {items.map((item, index) => {
        const offset = item.match(/^EBP[+-]\d+/)?.[0] ?? "dynamic";
        const label = dynamic ? offset : `slot ${index}`;
        const detail = dynamic ? item.replace(/^EBP[+-]\d+\s*/, "") : item;
        return (
          <div
            key={item}
            className={`flex min-h-12 items-center justify-between gap-4 border-b border-zinc-300 px-3 py-2 text-xs last:border-b-0 dark:border-zinc-700 ${active === index ? "bg-amber-100 font-semibold text-amber-950 dark:bg-amber-950 dark:text-amber-50" : ""}`}
          >
            <span className="shrink-0 font-mono">{label}</span>
            <span className="text-right [overflow-wrap:anywhere]">
              {detail}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BeforeAfter({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div className="rounded border border-zinc-400 p-3">
        <strong className="text-xs">变换前</strong>
        {items.slice(0, 2).map((item, index) => (
          <div
            key={item}
            className={`mt-2 rounded border p-2 font-mono text-xs ${active === index ? "border-orange-600 bg-orange-50 dark:bg-orange-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-center text-zinc-500"
        aria-hidden
      >
        →
      </div>
      <div className="rounded border border-zinc-400 p-3">
        <strong className="text-xs">变换后与守卫</strong>
        {items.slice(2).map((item, index) => (
          <div
            key={item}
            className={`mt-2 rounded border p-2 text-xs ${active === index + 2 ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ElfLayout({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="mx-auto max-w-xl rounded border-2 border-zinc-500 p-2">
      <p className="border-b border-zinc-400 p-2 text-center font-mono text-xs">
        ELF32 relocatable object
      </p>
      {items.map((item, index) => (
        <div
          key={item}
          className={`border-b border-zinc-300 p-3 text-xs last:border-b-0 dark:border-zinc-700 ${active === index ? "bg-cyan-100 font-semibold text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50" : ""}`}
        >
          <span className="mr-3 font-mono text-zinc-500">
            section/ref {index + 1}
          </span>
          {item}
        </div>
      ))}
    </div>
  );
}

function LinkGraph({
  items,
  active,
  got = false,
}: {
  items: readonly string[];
  active: number;
  got?: boolean;
}) {
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.slice(0, 3).map((item, index) => (
          <div
            key={item}
            className={`min-h-20 rounded border p-3 text-xs ${active === index ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="my-2 text-center text-zinc-500" aria-hidden>
        {got ? "地址解析 / 懒绑定 ↓" : "符号选择与重定位 ↓"}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {items.slice(3).map((item, index) => (
          <div
            key={item}
            className={`min-h-20 rounded border p-3 text-xs ${active === index + 3 ? "border-rose-600 bg-rose-50 dark:bg-rose-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SegmentMap({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[0.8fr_1.2fr]">
      {items.map((item, index) => (
        <div
          key={item}
          className={`min-h-16 rounded border p-3 text-xs ${index === 0 ? "sm:col-span-2" : ""} ${active === index ? "border-emerald-600 bg-emerald-50 font-semibold dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
        >
          <span className="mr-2 font-mono text-zinc-500">
            {index === 0 ? "file" : `vaddr ${index}`}
          </span>
          {item}
        </div>
      ))}
    </div>
  );
}

function SourceRegistry({
  items,
  active,
}: {
  items: readonly string[];
  active: number;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)] sm:items-center">
      <div className="grid gap-2">
        {items.slice(0, 3).map((item, index) => (
          <div
            key={item}
            className={`min-h-16 rounded border p-3 text-xs ${active === index ? "border-blue-600 bg-blue-50 font-semibold dark:bg-blue-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            <span className="mb-1 block font-mono text-zinc-500">
              identity.{index + 1}
            </span>
            {item}
          </div>
        ))}
      </div>
      <div className="text-center text-zinc-500" aria-hidden>
        →
      </div>
      <div className="grid gap-2">
        {items.slice(3).map((item, index) => (
          <div
            key={item}
            className={`min-h-16 rounded border p-3 text-xs ${active === index + 3 ? "border-emerald-600 bg-emerald-50 font-semibold dark:bg-emerald-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            <span className="mb-1 block font-mono text-zinc-500">
              evidence.{index + 1}
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainVisual({ spec, active }: { spec: VisualSpec; active: number }) {
  const normalized = active % spec.items.length;
  if (
    [
      "compiler-roadmap",
      "toolchain-pipeline",
      "reading-route",
      "fault-trace",
    ].includes(spec.kind)
  )
    return <Pipeline items={spec.items} active={normalized} />;
  if (spec.kind === "language-contract")
    return <ContractGrid items={spec.items} active={normalized} />;
  if (["parser-decision", "javacc-choice"].includes(spec.kind))
    return <DecisionTree items={spec.items} active={normalized} />;
  if (spec.kind === "scanner")
    return <TokenStream items={spec.items} active={normalized} />;
  if (["syntax-tree", "ast"].includes(spec.kind))
    return <Tree items={spec.items} active={normalized} />;
  if (spec.kind === "action-node")
    return <Tree items={spec.items} active={normalized} action />;
  if (spec.kind === "scope-bindings")
    return <ScopeGraph items={spec.items} active={normalized} />;
  if (spec.kind === "type-derivation")
    return <TypeProof items={spec.items} active={normalized} />;
  if (spec.kind === "ir-control-flow" || spec.kind === "instruction-selection")
    return <Pipeline items={spec.items} active={normalized} />;
  if (spec.kind === "ia32-machine")
    return <Machine items={spec.items} active={normalized} />;
  if (spec.kind === "instruction-effect")
    return <Machine items={spec.items} active={normalized} instructions />;
  if (spec.kind === "call-frame")
    return <StackFrame items={spec.items} active={normalized} />;
  if (spec.kind === "frame-layout")
    return <StackFrame items={spec.items} active={normalized} dynamic />;
  if (spec.kind === "optimization-diff")
    return <BeforeAfter items={spec.items} active={normalized} />;
  if (spec.kind === "elf-object")
    return <ElfLayout items={spec.items} active={normalized} />;
  if (spec.kind === "symbol-resolution")
    return <LinkGraph items={spec.items} active={normalized} />;
  if (spec.kind === "got-plt")
    return <LinkGraph items={spec.items} active={normalized} got />;
  if (spec.kind === "loader-mapping")
    return <SegmentMap items={spec.items} active={normalized} />;
  if (spec.kind === "source-registry")
    return <SourceRegistry items={spec.items} active={normalized} />;
  return <Pipeline items={spec.items} active={normalized} />;
}

function AxisControl({
  axis,
  value,
  onChange,
}: {
  axis: CompilerModel["axisA"];
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{axis.label}</legend>
      <div className="grid grid-cols-3 gap-2">
        {axis.levels.map((level, index) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(index)}
            aria-pressed={value === index}
            className={`min-h-11 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-violet-700 bg-violet-50 font-semibold dark:bg-violet-950" : "border-zinc-300 dark:border-zinc-700"}`}
          >
            {level}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function OfficialCraftingCompilerLab({
  unitId,
  title,
  concepts,
  chain,
  model,
  view,
}: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const spec = visualByUnit[unitId] ?? {
    kind: "compiler-roadmap",
    heading: title,
    caption: model.boundary,
    items: chain,
  };
  const active =
    view === "structure"
      ? conceptIndex
      : view === "execution"
        ? axisA * 3 + axisB
        : scenario === "baseline"
          ? 0
          : scenario === "fault"
            ? Math.max(1, spec.items.length - 2)
            : spec.items.length - 1;
  const current = spec.items[active % spec.items.length];
  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
  };

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${spec.heading}专属图`}
      data-crafting-compiler-unit={unitId}
      data-visual-kind={spec.kind}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">
            自制编译器 ·{" "}
            {view === "structure"
              ? "结构图"
              : view === "execution"
                ? "单变量转换"
                : "故障路径"}
          </p>
          <h3 className="break-words text-base font-semibold">
            {spec.heading}
          </h3>
          <p className="mt-1 max-w-3xl text-xs font-normal leading-5 text-zinc-600 dark:text-zinc-300">
            {spec.caption}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950"
          aria-label={`重置${model.studio}`}
        >
          <span aria-hidden>↺</span>
        </button>
      </header>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {view === "structure" && (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                选择正式目录节点，观察它在本章编译对象中的位置；图形不是目录卡片。
              </p>
              <div className="mb-4 flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                {concepts.map((concept, index) => (
                  <button
                    key={`${concept}-${index}`}
                    type="button"
                    onClick={() => setConceptIndex(index)}
                    aria-pressed={conceptIndex === index}
                    className={`min-h-11 rounded border px-3 py-2 text-left text-xs ${conceptIndex === index ? "border-orange-700 bg-orange-50 font-semibold dark:bg-orange-950" : "border-zinc-300 dark:border-zinc-700"}`}
                  >
                    {short(concept)}
                  </button>
                ))}
              </div>
            </>
          )}
          {view === "execution" && (
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              <AxisControl
                axis={model.axisA}
                value={axisA}
                onChange={setAxisA}
              />
              <AxisControl
                axis={model.axisB}
                value={axisB}
                onChange={setAxisB}
              />
            </div>
          )}
          {view === "evidence" && (
            <div className="mb-5 grid grid-cols-3 gap-2">
              {(Object.keys(scenarioLabels) as Scenario[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setScenario(item)}
                  aria-pressed={scenario === item}
                  className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}
                >
                  {scenarioLabels[item]}
                </button>
              ))}
            </div>
          )}
          <DomainVisual spec={spec} active={active} />
        </div>
        <aside className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">
            图中当前编译对象
          </p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">
            {current}
          </p>
          <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-300">
            {model.boundary}
          </p>
          {view === "structure" && (
            <div className="mt-4 rounded border p-3 text-xs">
              <strong>目录节点</strong>
              <p className="mt-1 [overflow-wrap:anywhere]">
                {concepts[conceptIndex] ?? title}
              </p>
            </div>
          )}
          {view === "execution" && (
            <dl className="mt-4 grid gap-3 text-xs">
              <div className="rounded border p-3">
                <dt className="text-zinc-500">当前输入条件</dt>
                <dd className="mt-1 font-semibold">
                  {model.axisA.levels[axisA]} × {model.axisB.levels[axisB]}
                </dd>
              </div>
              <div className="rounded border p-3">
                <dt className="text-zinc-500">要执行的真实探针</dt>
                <dd className="mt-1 [overflow-wrap:anywhere]">{model.task}</dd>
              </div>
              <div className="rounded border p-3">
                <dt className="text-zinc-500">必须观察</dt>
                <dd className="mt-1 font-semibold [overflow-wrap:anywhere]">
                  {model.signal}
                </dd>
              </div>
            </dl>
          )}
          {view === "evidence" && (
            <div className="mt-4 grid gap-3 text-xs">
              <div
                className={`rounded border p-3 ${scenario === "fault" ? "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50" : "border-zinc-300 dark:border-zinc-700"}`}
              >
                <strong>注入故障：{model.fault}</strong>
              </div>
              <div
                className={`rounded border p-3 ${scenario === "recovery" ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}
              >
                <strong>重建断言：{model.invariant}</strong>
              </div>
            </div>
          )}
          <div className="mt-4 rounded border border-orange-500 bg-orange-50 p-3 text-xs text-orange-950 dark:bg-orange-950 dark:text-orange-50">
            <strong>应保存的真实编译工件</strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
