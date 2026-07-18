"use client";

import { useState } from "react";

const evidenceGroups = [
  {
    range: "L1–L4",
    question: "结果是否来自当前源码？",
    evidence: "编译命令 · 输入 · 类型 · 表达式预测",
    failure: "语法错误 · 旧产物 · 窄化 · 优先级",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    range: "L5–L7",
    question: "每条执行路径是否有契约？",
    evidence: "边界表 · 循环不变量 · 函数前后置条件",
    failure: "漏分支 · 不终止 · 参数/返回错误",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    range: "L8–L11",
    question: "数据与定义是否仍有效？",
    evidence: "地址/长度图 · 生命周期 · 目标文件符号",
    failure: "越界 · 悬空 · 未定义/重复定义",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
  {
    range: "L12–L16",
    question: "对象和持久记录是否保持合法？",
    evidence: "构造闸门 · virtual 契约 · 流状态 · 往返比较",
    failure: "非法状态 · 切片 · 错误析构 · 半记录",
    className: "border-violet-500/35 bg-violet-500/10",
  },
] as const;

export function EcpFinalEvidenceMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label="Easy C++ 第五版十六课按四组列出验收问题证据和典型失败的总复习矩阵"
          className="grid gap-3 lg:grid-cols-2"
        >
          {evidenceGroups.map((group) => (
            <section key={group.range} className={`min-h-56 border p-4 ${group.className}`}>
              <span className="text-xs text-secondary">{group.range}</span>
              <strong className="mt-2 block text-sm text-primary">{group.question}</strong>
              <code className="mt-4 block break-words text-xs text-accent">evidence · {group.evidence}</code>
              <p className="mb-0 mt-4 text-xs text-secondary">failure · {group.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习不是再背 16 份摘要，而是能从现象选择正确证据，并回到对应 Lesson 修复。
      </figcaption>
    </figure>
  );
}

const diagnosisRows = [
  { symptom: "编译前失败", inspect: "token · declaration · type", lessons: "L1–L4", proof: "编译器位置与最小源码" },
  { symptom: "目标无法链接", inspect: "definition · object file · ODR", lessons: "L10", proof: "链接命令与符号来源" },
  { symptom: "输出或路径错误", inspect: "condition · loop · function", lessons: "L5–L7", proof: "边界表与路径日志" },
  { symptom: "崩溃或随机值", inspect: "index · pointer · lifetime", lessons: "L8–L9", proof: "地址长度图与故障输入" },
  { symptom: "对象行为错误", inspect: "invariant · override · owner", lessons: "L11–L15", proof: "构造/分派/析构测试" },
  { symptom: "文件内容不完整", inspect: "path · mode · format · state", lessons: "L16", proof: "流状态与往返比较" },
] as const;

export function EcpFailureDiagnosisFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从编译链接运行内存对象和文件症状回到对应课程与证据的诊断流程" className="space-y-3">
          {diagnosisRows.map((row, index) => (
            <section
              key={row.symptom}
              className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.7fr_1.1fr_0.45fr_1fr] lg:items-center"
            >
              <div><span className="text-xs text-secondary">case 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.symptom}</strong></div>
              <code className="break-words text-xs text-accent">inspect · {row.inspect}</code>
              <span className="text-xs text-primary">{row.lessons}</span>
              <span className="text-xs text-secondary">proof · {row.proof}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先按失败阶段缩小范围，再取证；“程序不对”不是可以直接行动的诊断。
      </figcaption>
    </figure>
  );
}

const faultCases = [
  {
    label: "非法分数",
    injection: "输入 Mina 120",
    expected: "构造或解析边界拒绝，不创建半合法对象",
    inspect: "关系条件 · 函数结果 · 类不变量",
    lessons: "L5 · L7 · L12–13",
  },
  {
    label: "半条记录",
    injection: "文件末尾只有 Kai",
    expected: "完整记录提取失败，报告行号且不复用旧 score",
    inspect: "循环条件 · 字段格式 · fail/eof",
    lessons: "L6–7 · L16",
  },
  {
    label: "追加污染",
    injection: "把覆盖模式改为 ios::app 后运行两次",
    expected: "往返记录数不符，定位到打开模式而非解析器",
    inspect: "模式 · 文件确切文本 · 记录数",
    lessons: "L3 · L16",
  },
  {
    label: "对象切片",
    injection: "把派生记录按值放进基类数组",
    expected: "派生状态/行为消失，改用基类引用或拥有型指针",
    inspect: "数组元素类型 · virtual 分派 · owner",
    lessons: "L9 · L14–15",
  },
] as const;

export function EcpScoreLedgerFaultLab() {
  const [active, setActive] = useState(0);
  const current = faultCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择成绩记录项目故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {faultCases.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`min-h-12 border px-3 py-2 text-sm transition-colors ${
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
          <span className="text-xs text-secondary">fault injection · {current.lessons}</span>
          <strong className="mt-3 block text-base text-primary">{current.injection}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4">
              <span className="text-xs text-secondary">预期保护</span>
              <p className="mb-0 mt-3 text-xs text-primary">{current.expected}</p>
            </div>
            <div className="min-h-36 border border-rose-500/35 bg-rose-500/10 p-4">
              <span className="text-xs text-secondary">检查证据</span>
              <code className="mt-3 block break-words text-xs text-accent">{current.inspect}</code>
            </div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换四种故障，先预测保护点与证据，再实际修改项目；每种故障都跨越至少两个 Lesson。
      </figcaption>
    </figure>
  );
}
