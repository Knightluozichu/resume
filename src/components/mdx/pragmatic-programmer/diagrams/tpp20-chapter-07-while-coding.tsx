"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-chapter-07-while-coding";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const stages = {
  signal: {
    label: "阻力信号",
    artifact: "“改 currency parser 时总想绕开 locale 测试”",
    question: "我在回避哪个未知？",
    next: "写下：代码可能依赖机器默认 locale",
    tone: color.warning,
  },
  hypothesis: {
    label: "显化假设",
    artifact: "H1: parse('1,20') 在 de-DE=1.2，在 en-US=120",
    question: "怎样只改变 locale 使假设可失败？",
    next: "冻结输入和 runtime，运行 locale 矩阵",
    tone: color.accent,
  },
  measure: {
    label: "测量增长",
    artifact: "10k rows=42ms；100k=4.8s；重复扫描 currencies",
    question: "增长来自输入规模还是环境常数？",
    next: "记录 n、比较次数与 p95；确认 O(n×m)",
    tone: color.danger,
  },
  refactor: {
    label: "测试下重构",
    artifact: "先建 currencyIndex，再逐行 O(1) 查询",
    question: "行为等价由什么保护？",
    next: "小步提交；示例测试 + 旧输出哈希",
    tone: color.success,
  },
  property: {
    label: "特性与安全",
    artifact: "parse(format(x, locale), locale) ≈ x；拒绝公式注入",
    question: "哪些输入空间与攻击边界没覆盖？",
    next: "生成 locale/金额/分隔符；缩减最小反例",
    tone: color.accent,
  },
  naming: {
    label: "表达意图",
    artifact: "parseValue → parseLocalizedMoney(raw, locale)",
    question: "名称是否暴露依赖与拒绝边界？",
    next: "调用点审查；移除默认 locale",
    tone: color.success,
  },
} as const;
type StageId = keyof typeof stages;

export function Tpp20Chapter07WhileCodingSystemLab() {
  const [id, setId] = useState<StageId>("signal");
  const stage = stages[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 7 章专属解剖图 · CSV 金额解析的编码反馈环"
      title="从‘这里不太对劲’到可发布改动，中间要留下什么？"
      description="点击六个阶段查看同一金额解析改动的具体工件、裁决问题与下一动作。章节主题在一条真实变更上连接，而非并排罗列。"
      kind="while-coding-money-parser-feedback-loop"
      reset={() => setId("signal")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {(Object.keys(stages) as StageId[]).map((key, index) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`relative min-h-11 rounded-control border p-3 text-left text-xs font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              <span className="mr-1" style={{ color: stages[key].tone }}>
                {index + 1}.
              </span>
              {stages[key].label}
              {index < 5 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg lg:block text-muted"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </button>
          ))}
        </div>
        <div
          className="mt-4 rounded-control border-2 bg-bg p-4"
          style={{ borderColor: stage.tone }}
        >
          <p className="text-xs font-semibold" style={{ color: stage.tone }}>
            当前工件 · {stage.label}
          </p>
          <code className="mt-3 block whitespace-pre-wrap text-sm">
            {stage.artifact}
          </code>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>裁决问题：</strong> {stage.question}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: stage.tone }}
          >
            <strong>下一动作：</strong> {stage.next}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const smells = {
  locale: {
    label: "只在我机器通过",
    baseline: "CI locale=en-US：'1,20' → 120",
    guess: "可能是测试偶发",
    experiment: "同 runtime 只切 locale: en-US / de-DE / zh-CN",
    first: "parseLocalizedMoney 读取全局 locale",
    repair: "locale 成为必填参数；删除环境默认值",
    proof: "3 locales × 40 generated amounts；round-trip property PASS",
    tone: color.warning,
  },
  quadratic: {
    label: "数据一大就卡",
    baseline: "10k=42ms；100k=4.8s",
    guess: "可能是 CSV 库慢",
    experiment: "固定 parser，只把 rows 从 10k 翻至 20k/40k/80k",
    first: "currency lookup comparisons ≈ rows × 180",
    repair: "构建 Map<code,Currency> 一次，再 O(1) 查询",
    proof: "增长斜率 1.03；100k=118ms；结果 hash 相同",
    tone: color.danger,
  },
  refactor: {
    label: "不敢改重复分支",
    baseline: "USD/EUR/CNY 三条分支各做 trim/parse/range",
    guess: "合并会改变异常信息",
    experiment: "先刻画 12 个成功/拒绝样本，再只抽取 normalize",
    first: "EUR 分支漏掉 negative-zero 拒绝",
    repair: "共享 normalize；领域差异保留在 CurrencyRule",
    proof: "旧样本 + property tests PASS；提交可单独回退",
    tone: color.accent,
  },
  injection: {
    label: "导出表格可被执行",
    baseline: "name='=HYPERLINK(...)' 原样写入 CSV",
    guess: "CSV 只是文本所以安全",
    experiment: "用 Excel/LibreOffice 打开固定恶意单元格",
    first: "首字符 =,+,-,@ 被解释为公式",
    repair: "SpreadsheetCell 类型 + escapeFormulaPrefix",
    proof: "攻击矩阵拒绝/转义；普通中文名称保持原字节",
    tone: color.success,
  },
} as const;
type SmellId = keyof typeof smells;

export function Tpp20Chapter07WhileCodingFeedbackLab() {
  const [id, setId] = useState<SmellId>("locale");
  const smell = smells[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 7 章专属实验 · 把编码直觉变成首差"
      title="一种不舒服的感觉，怎样变成可证伪的工程结论？"
      description="选择环境巧合、算法增长、重构恐惧或表格注入。每个案例固定基线，只改变一个变量，再保存首差、修复与回归证据。"
      kind="while-coding-signal-to-first-difference"
      reset={() => setId("locale")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(smells) as SmellId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {smells[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["基线", smell.baseline],
            ["未验证猜测", smell.guess],
            ["单变量实验", smell.experiment],
            ["首差", smell.first],
            ["修复", smell.repair],
            ["证据", smell.proof],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: index >= 3 ? smell.tone : "var(--border)" }}
            >
              <p className="text-xs font-semibold text-muted">
                {index + 1}. {label}
              </p>
              <p className="mt-2 text-sm leading-6">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const gates = {
  intent: {
    label: "意图与假设",
    rows: [
      ["阻力日志", "回避 locale 用例", true],
      ["环境假设", "locale 必须显式", true],
      ["巧合依赖", "默认 locale 已移除", true],
    ],
    release: "可以继续测量；还不能发布",
    tone: color.accent,
  },
  behavior: {
    label: "行为与复杂度",
    rows: [
      ["示例行为", "12/12", true],
      ["性质样本", "120/120；seed=731", true],
      ["100k p95", "118ms ≤ 150ms", true],
    ],
    release: "功能与增长门通过；进入安全边界",
    tone: color.success,
  },
  security: {
    label: "安全与命名",
    rows: [
      ["公式注入矩阵", "16/16", true],
      ["依赖扫描", "0 critical", true],
      ["名称暴露 locale", "1 个旧调用点", false],
    ],
    release: "BLOCK：陈旧 parseValue 调用仍隐藏语义",
    tone: color.danger,
  },
  complete: {
    label: "修复后证据包",
    rows: [
      ["行为/性质", "132/132", true],
      ["性能/安全", "PASS / PASS", true],
      ["命名与调用点", "parseLocalizedMoney 8/8", true],
    ],
    release: "READY：commit 7f2… 可回退，未覆盖 xlsx importer",
    tone: color.success,
  },
} as const;
type GateId = keyof typeof gates;

export function Tpp20Chapter07WhileCodingEvidenceLab() {
  const [id, setId] = useState<GateId>("intent");
  const gate = gates[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 7 章专属复核 · 一次改动的跨主题证据包"
      title="测试都绿了，为什么仍可能不能发布？"
      description="逐步检查意图、性质、复杂度、安全和名称。任一失败项阻断本次金额解析改动，不能用其他项目的高分平均掉。"
      kind="while-coding-release-evidence-gates"
      reset={() => setId("intent")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(gates) as GateId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {gates[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {gate.rows.map(([check, value, pass]) => (
            <div
              key={check as string}
              className="grid gap-2 rounded-control border bg-bg p-3 text-sm sm:grid-cols-[1fr_1.5fr_0.5fr]"
              style={{ borderColor: pass ? color.success : color.danger }}
            >
              <strong>{check as string}</strong>
              <code>{value as string}</code>
              <span
                className="font-semibold"
                style={{ color: pass ? color.success : color.danger }}
              >
                {pass ? "PASS" : "FAIL"}
              </span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: gate.tone }}
        >
          {gate.release}
        </p>
        <code className="mt-3 block rounded-control border border-border bg-bg p-3 text-xs">
          evidence: input-fixture#91 · runtime node22 · locale-matrix#8 ·
          benchmark raw.json · property seed 731 · security cases#16 · diff 7f2…
        </code>
      </div>
    </Tpp20DedicatedFrame>
  );
}
