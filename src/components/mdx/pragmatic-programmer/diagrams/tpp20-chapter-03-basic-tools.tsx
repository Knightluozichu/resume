"use client";

import { useState, type ReactNode } from "react";

const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function ToolFrame({
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-chapter-03-basic-tools"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const workbenches = {
  silo: {
    label: "工具孤岛",
    artifacts: [
      [
        "日志查看器",
        "payments.log 只能在 UI 里筛选",
        "无法保存查询",
        c.warning,
      ],
      ["表格软件", "手工复制 18 行", "丢失原始行号", c.danger],
      ["在线编辑器", "修改 parser", "没有本地 diff", c.danger],
      ["聊天窗口", "“好像是重复 webhook”", "结论不可重放", c.danger],
    ],
    output:
      "四个界面都显示了结果，却没有一个工件能把输入、变换、补丁和结论连起来。",
    color: c.danger,
  },
  text: {
    label: "文本工作台",
    artifacts: [
      ["payments.log", "纯文本输入 + 事件 id", "sha256: 7b3…", c.accent],
      ["find-duplicates.sh", "rg | sort | uniq -d", "commit a91f", c.success],
      ["parser.patch", "编辑器保存最小 diff", "+ webhook_id", c.success],
      ["daybook.md", "命令、首差、输出哈希", "incident #42", c.success],
    ],
    output:
      "每一步读取和写出开放文本；Git 保存差异，工程日记保存为什么运行这条命令。",
    color: c.success,
  },
} as const;
type WorkbenchId = keyof typeof workbenches;

export function Tpp20Chapter03BasicToolsSystemLab() {
  const [id, setId] = useState<WorkbenchId>("silo");
  const workbench = workbenches[id];
  return (
    <ToolFrame
      eyebrow="第 3 章专属解剖图 · 重复扣款事件工作台"
      title="输入、命令、补丁和结论能否组成一条可重放的工件链？"
      description="切换工具孤岛与文本工作台。固定 incident #42 和同一份 payments.log，比较每一步实际读写的工件、身份与丢失信息。"
      kind="basic-tools-incident-workbench"
      reset={() => setId("silo")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(workbenches) as WorkbenchId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {workbenches[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 lg:grid-cols-4">
          {workbench.artifacts.map(([tool, artifact, evidence], index) => (
            <div
              key={tool}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: workbench.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: workbench.color }}
              >
                {index + 1}. {tool}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {artifact}
              </strong>
              <code className="mt-2 block text-xs text-secondary">
                {evidence}
              </code>
              {index < workbench.artifacts.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg lg:block"
                  style={{ color: workbench.color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: workbench.color }}
        >
          {workbench.output}
        </p>
      </div>
    </ToolFrame>
  );
}

const runs = {
  manual: {
    label: "手工筛选",
    command: "在日志 UI 中输入 duplicate，再复制可见行",
    stages: [
      ["输入", "当前滚动窗口 2,000 行", c.warning],
      ["筛选", "肉眼选择 status=charged", c.warning],
      ["分组", "按订单号手工排序", c.danger],
      ["输出", "18 行剪贴板文本", c.danger],
    ],
    result:
      "复核者不知道窗口外是否还有重复项，也无法证明两次操作使用同一筛选条件。",
    color: c.danger,
  },
  shell: {
    label: "Shell 管道",
    command:
      "rg 'status=charged' payments.log | sort -k3 | uniq -D -f2 > duplicates.log",
    stages: [
      ["输入", "payments.log sha256 7b3…", c.success],
      ["筛选", "rg status=charged", c.success],
      ["分组", "sort + uniq -D by order_id", c.success],
      ["输出", "duplicates.log sha256 c82…", c.success],
    ],
    result:
      "命令、输入哈希和输出哈希一起提交；任何人都能在相同日志上重建 18 行结果。",
    color: c.success,
  },
  fault: {
    label: "故障：漏掉 stderr",
    command: "rg ... missing-part.log | sort ... > duplicates.log",
    stages: [
      ["输入", "3 个分片，1 个文件不存在", c.warning],
      ["筛选", "rg 返回 exit 2", c.danger],
      ["分组", "仍处理另外 2 个分片", c.warning],
      ["输出", "看似正常的 12 行", c.danger],
    ],
    result:
      "管道不是天然可靠；必须保存退出码并启用 pipefail，防止部分输入被误报为完整结果。",
    color: c.warning,
  },
} as const;
type RunId = keyof typeof runs;

export function Tpp20Chapter03BasicToolsFeedbackLab() {
  const [id, setId] = useState<RunId>("manual");
  const run = runs[id];
  return (
    <ToolFrame
      eyebrow="第 3 章专属实验 · 同一日志的可组合变换"
      title="Shell 加入后，重复扣款结果为何变得可重放？"
      description="固定 payments.log，只改变筛选与分组方式；故障样本额外展示没有 pipefail 时怎样产生“部分成功”。"
      kind="basic-tools-shell-pipeline"
      reset={() => setId("manual")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(runs) as RunId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {runs[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block overflow-x-auto rounded-control border border-border bg-bg p-3 text-xs leading-6">
          {run.command}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {run.stages.map(([stage, value, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">{value}</strong>
              {index < run.stages.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: run.color }}
        >
          {run.result}
        </p>
      </div>
    </ToolFrame>
  );
}

const substitutions = {
  editor: {
    label: "基线：编辑器批量改键名",
    tool: "editor macro",
    input: "parser.ts @ a91f",
    change: "eventId → webhookId（7 处）",
    diff: "+7 / -7",
    tests: "parser.test: 14/14",
    hash: "bundle sha256 5dd…",
    note: "编辑器提升交互速度，但可交付证据是 diff、测试和输出哈希。",
    color: c.success,
  },
  noEditor: {
    label: "撤掉编辑器：文本变换替代",
    tool: "perl -pi -e 's/eventId/webhookId/g' parser.ts",
    input: "parser.ts @ a91f",
    change: "eventId → webhookId（7 处）",
    diff: "+7 / -7",
    tests: "parser.test: 14/14",
    hash: "bundle sha256 5dd…",
    note: "工具不同，但开放文本、Git diff 和测试合同让最终工件保持相同。",
    color: c.accent,
  },
  noHistory: {
    label: "撤掉 Git：无法验收",
    tool: "editor macro",
    input: "未知工作区状态",
    change: "声称改了 7 处",
    diff: "没有基线 diff",
    tests: "14/14，但输入未知",
    hash: "bundle sha256 5dd…",
    note: "输出哈希相同不足以证明变更边界；缺少历史后无法知道还混入了什么修改。",
    color: c.danger,
  },
} as const;
type SubstitutionId = keyof typeof substitutions;

export function Tpp20Chapter03BasicToolsEvidenceLab() {
  const [id, setId] = useState<SubstitutionId>("editor");
  const substitution = substitutions[id];
  return (
    <ToolFrame
      eyebrow="第 3 章专属复核 · 工具可替换，工件合同不可丢"
      title="撤掉编辑器或版本历史后，同一补丁还能被独立验收吗？"
      description="比较三条补丁路径。输入 commit、最小 diff、测试结果和 bundle 哈希共同构成验收坐标；只看最终文件不够。"
      kind="basic-tools-substitution-proof"
      reset={() => setId("editor")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(substitutions) as SubstitutionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {substitutions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {[
            ["执行工具", substitution.tool],
            ["冻结输入", substitution.input],
            ["目标变更", substitution.change],
            ["Git 差异", substitution.diff],
            ["回归测试", substitution.tests],
            ["输出身份", substitution.hash],
          ].map(([label, value]) => (
            <div
              key={label}
              className="grid gap-1 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[7rem_1fr]"
            >
              <strong className="text-xs text-secondary">{label}</strong>
              <code
                className="text-xs leading-5"
                style={{ color: substitution.color }}
              >
                {value}
              </code>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: substitution.color }}
        >
          {substitution.note}
        </p>
      </div>
    </ToolFrame>
  );
}
