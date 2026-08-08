"use client";

import { useState } from "react";

const OFFICIAL_NODES = [
  "第11章 变量名的力量",
  "11.1 选择好变量名的注意事项",
  "最重要的命名注意事项",
  "以问题为导向",
  "最适当的名字长度",
  "变量名字的效果范围",
  "变量名字中的计算值限定词",
  "变量名字中的常用反义词",
  "11.2 为特定类型的数据命名",
  "为循环索引命名",
  "为状态变量命名",
  "为临时变量命名",
  "为布尔变量命名",
  "为枚举类型命名",
  "为常量命名",
  "11.3 命名规则的力量",
  "为什么要有规则？",
  "何时采用命名规则",
  "正式程度",
  "11.4 非正式命名规则",
  "语言无关规则的指导原则",
  "语言相关规则的指导原则",
  "混合语言编程的注意事项",
  "命名规则示例",
  "11.5 标准前缀",
  "用户自定义类型缩写",
  "语义前缀",
  "标准前缀的优点",
  "11.6 创建具备可读性的短名称",
  "一般的缩写指导原则",
  "语音缩写",
  "有关缩写的评论",
  "11.7 应该避免的名称",
  "关键点",
] as const;

const FOCUS_STEPS = [
  {
    id: "meaning",
    label: "问题域",
    title: "先让名称说出对象与单位",
    detail: "invoiceTotalCents 把订单总额和分这两个约束带进阅读现场。",
  },
  {
    id: "scope",
    label: "作用域",
    title: "再按可见范围调节长度",
    detail: "循环内的 index 可以短；跨函数存活的值需要更完整的上下文。",
  },
  {
    id: "rules",
    label: "规则",
    title: "最后让团队形成同一种读法",
    detail: "缩写、前缀和布尔问句一旦稳定，审查者才能快速发现偏离。",
  },
] as const;

const SCOPE_OPTIONS = [
  { id: "block", label: "局部块", name: "index", note: "短名可接受" },
  {
    id: "function",
    label: "函数边界",
    name: "lineItemCount",
    note: "角色要清楚",
  },
  {
    id: "module",
    label: "模块边界",
    name: "invoiceTotalCents",
    note: "单位不可省略",
  },
] as const;

type FocusId = (typeof FOCUS_STEPS)[number]["id"];
type ScopeId = (typeof SCOPE_OPTIONS)[number]["id"];

function getFocusStep(id: FocusId) {
  return FOCUS_STEPS.find((step) => step.id === id) ?? FOCUS_STEPS[0];
}

/**
 * 第 11 章专属实验：把名字拆成问题域、作用域和团队规则三个可观察约束。
 * 这不是通用评分器；切换控件只改变命名决策，SVG 同步展示读者能否推出的含义。
 */
export function Cc2e11VariableNamingLab({
  focus = "meaning",
}: {
  focus?: FocusId;
}) {
  const initialFocus = getFocusStep(focus).id;
  const [activeFocus, setActiveFocus] = useState<FocusId>(initialFocus);
  const [scope, setScope] = useState<ScopeId>("block");
  const [misleading, setMisleading] = useState(false);
  const activeStep = getFocusStep(activeFocus);
  const scopeOption =
    SCOPE_OPTIONS.find((option) => option.id === scope) ?? SCOPE_OPTIONS[0];
  const shownName = misleading ? "total" : scopeOption.name;
  const role = misleading ? "读者只能猜测它代表什么" : "订单行项目的数量";
  const unit = misleading ? "未知" : scope === "module" ? "分" : "个";
  const risk = misleading
    ? "高风险：同名值可能被当成金额、数量或旧状态"
    : "低风险：名称给出了角色、范围或单位线索";

  const reset = () => {
    setActiveFocus(initialFocus);
    setScope("block");
    setMisleading(false);
  };

  return (
    <section
      aria-label="变量名的力量专属命名实验"
      data-visual-kind="cc2e-11-variable-naming"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            第 11 章 · 命名约束实验
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary">
            名称不是标签，而是阅读接口
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            切换问题域、作用域或规则，再打开误导模式，观察读者能否从名字推出角色和单位。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置变量命名实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-5">
        <div className="flex flex-wrap gap-2" aria-label="选择命名检查点">
          {FOCUS_STEPS.map((step) => (
            <button
              key={step.id}
              type="button"
              aria-pressed={activeFocus === step.id}
              onClick={() => setActiveFocus(step.id)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                activeFocus === step.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {step.label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={misleading}
            onClick={() => setMisleading((current) => !current)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              misleading
                ? "border-danger bg-danger/10 text-danger"
                : "border-border text-secondary hover:border-danger hover:text-primary"
            }`}
          >
            {misleading ? "关闭误导模式" : "注入误导模式"}
          </button>
        </div>

        <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-3" aria-label="选择作用域">
          {SCOPE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={scope === option.id}
              onClick={() => setScope(option.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                scope === option.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{option.label}</span>
              <span className="mt-1 block text-secondary">{option.note}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-card border border-border bg-surface p-3 sm:p-5">
          <svg
            viewBox="0 0 720 390"
            role="img"
            aria-label={`变量名实验：当前检查点是${activeStep.label}，名称为${shownName}，读者推断为${role}，单位为${unit}，${risk}。`}
            className="mx-auto block h-auto w-full max-w-[720px]"
          >
            <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
              {activeStep.title}
            </text>
            <text x="360" y="51" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              {activeStep.detail}
            </text>

            <rect x="24" y="82" width="196" height="194" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="42" y="109" fontSize="12" fontWeight="700" fill="var(--accent)">
              代码表面
            </text>
            <text x="42" y="145" fontSize="18" fontWeight="700" fill={misleading ? "var(--danger)" : "var(--text-primary)"} fontFamily="monospace">
              {shownName}
            </text>
            <text x="42" y="177" fontSize="12" fill="var(--text-secondary)">
              scope: {scopeOption.label}
            </text>
            <text x="42" y="201" fontSize="12" fill="var(--text-secondary)">
              unit: {unit}
            </text>
            <text x="42" y="242" fontSize="12" fill="var(--text-primary)">
              {misleading ? "线索被截断" : "线索可被读者复述"}
            </text>

            <line x1="232" y1="180" x2="270" y2="180" stroke="var(--border)" strokeWidth="2" />
            <path d="M264 172 L276 180 L264 188" fill="none" stroke="var(--border)" strokeWidth="2" />

            <rect x="274" y="82" width="196" height="194" rx="12" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="292" y="109" fontSize="12" fontWeight="700" fill="var(--text-primary)">
              阅读者推断
            </text>
            <circle cx="304" cy="143" r="7" fill={misleading ? "var(--danger)" : "var(--success)"} />
            <text x="322" y="148" fontSize="12" fill="var(--text-primary)">
              角色：{role}
            </text>
            <circle cx="304" cy="181" r="7" fill={misleading || unit === "未知" ? "var(--danger)" : "var(--success)"} />
            <text x="322" y="186" fontSize="12" fill="var(--text-primary)">
              单位：{unit}
            </text>
            <circle cx="304" cy="219" r="7" fill={activeFocus === "rules" && !misleading ? "var(--success)" : "var(--accent)"} />
            <text x="322" y="224" fontSize="12" fill="var(--text-primary)">
              规则：{activeStep.label}
            </text>

            <line x1="482" y1="180" x2="520" y2="180" stroke="var(--border)" strokeWidth="2" />
            <path d="M514 172 L526 180 L514 188" fill="none" stroke="var(--border)" strokeWidth="2" />

            <rect x="524" y="82" width="172" height="194" rx="12" fill={misleading ? "var(--danger)" : "var(--success)"} fillOpacity="0.08" stroke={misleading ? "var(--danger)" : "var(--success)"} strokeWidth="1.5" />
            <text x="542" y="109" fontSize="12" fontWeight="700" fill={misleading ? "var(--danger)" : "var(--success)"}>
              审查结果
            </text>
            <text x="542" y="151" fontSize="16" fontWeight="700" fill={misleading ? "var(--danger)" : "var(--success)"}>
              {misleading ? "停下来" : "可继续"}
            </text>
            <text x="542" y="183" fontSize="12" fill="var(--text-primary)">
              {misleading ? "先追查类型与来源" : "含义能被复述"}
            </text>
            <text x="542" y="207" fontSize="12" fill="var(--text-primary)">
              {misleading ? "避免同型误用" : "降低维护猜测"}
            </text>
            <text x="542" y="246" fontSize="11" fill="var(--text-secondary)">
              {OFFICIAL_NODES.length} 个目录节点已核对
            </text>

            <line x1="42" y1="319" x2="678" y2="319" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 4" />
            <circle cx="110" cy="319" r="8" fill="var(--accent)" />
            <circle cx="360" cy="319" r="8" fill={misleading ? "var(--danger)" : "var(--success)"} />
            <circle cx="610" cy="319" r="8" fill={misleading ? "var(--danger)" : "var(--success)"} />
            <text x="110" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              名称
            </text>
            <text x="360" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              语义
            </text>
            <text x="610" y="350" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
              决策
            </text>
          </svg>
        </div>

        <p className="mt-3 text-center text-xs text-secondary" role="status" aria-live="polite">
          {risk}
        </p>
      </div>
    </section>
  );
}
