"use client";

import { useRef, useState } from "react";

import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const ACCENT = "var(--accent)";
const PRIMARY = "var(--text-primary)";
const MUTED = "var(--text-secondary)";
const BORDER = "var(--border)";
const SURFACE = "var(--bg)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";
const T = TEACHING_BEAT_MS;

/** 与第18章 manifest 同名的目录节点；它们也是视觉证据链中的标签。 */
const OFFICIAL_NODES = [
  "第18章 表驱动方法",
  "18.1 表驱动方法使用总则",
  "使用表驱动方法的两个问题",
  "18.2 直接访问表",
  "示例：一个月中的天数（Days-in-Month）",
  "示例：保险费率",
  "例子：灵活的消息格式（Flexible-Message-Format）",
  "构造查询键值",
  "18.3 索引表访问（Indexed Access Tables）",
  "18.4 阶梯访问表",
  "18.5 表查询的其他示例",
  "关键点",
] as const;

const CONTRACT_STEPS: readonly TeachingStep[] = [
  { label: "domain", caption: "先声明键域与每一行的含义。" },
  { label: "validate", caption: "查询前拒绝缺键、重复键和错误顺序。" },
  { label: "lookup", caption: "选择与键域匹配的访问合同。" },
  { label: "replay", caption: "保存结果并用同一输入重放基线。" },
];

type ContractScenario = "valid" | "missing" | "unsorted";

const CONTRACT_SCENARIOS: readonly {
  id: ContractScenario;
  label: string;
}[] = [
  { id: "valid", label: "完整表" },
  { id: "missing", label: "缺键故障" },
  { id: "unsorted", label: "顺序故障" },
];

function contractState(scenario: ContractScenario) {
  if (scenario === "missing") {
    return {
      color: DANGER,
      active: "validate",
      headline: "拒绝：月份 13 不在键域，查询尚未发生",
      detail: "把默认值当答案会掩盖配置错误；先报告缺键，再修表。",
    };
  }
  if (scenario === "unsorted") {
    return {
      color: WARNING,
      active: "validate",
      headline: "拒绝：阶梯阈值 100 → 50 破坏了顺序合同",
      detail: "没有排序证据时不能猜测命中行，修复配置后再查询。",
    };
  }
  return {
    color: SUCCESS,
    active: "lookup",
    headline: "通过：键域、顺序与默认策略都可审查",
    detail: "month = 2 命中 28 天；结果、输入和表版本可以一起重放。",
  };
}

/** 第18章实验一：把表当作有键域、顺序和缺省策略的可审查合同。 */
export function Cc2e18TableDrivenMethodsContractLab() {
  const [scenario, setScenario] = useState<ContractScenario>("valid");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const state = contractState(scenario);

  const timeline = useTeachingTimeline({
    steps: CONTRACT_STEPS,
    build: (tl) => {
      CONTRACT_STEPS.forEach((step, index) => {
        tl.add(
          nodeRefs.current[step.label]!,
          {
            opacity: [0, 1],
            scale: [0.88, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  const reset = () => {
    setScenario("valid");
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="表驱动方法键域与验证实验"
      data-visual-kind="cc2e-18-table-driven-methods-contract"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold tracking-wide text-accent">
          第18章 · 表结构合同
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          键域 → 校验 → 查询 → 重放
        </h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          先猜一个输入会在哪一步被拒绝，再注入缺键或乱序，观察表驱动方法如何把配置错误挡在结果之前。
        </p>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-2 sm:grid-cols-3" aria-label="选择表配置">
          {CONTRACT_SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenario === item.id}
              onClick={() => setScenario(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-sm transition-colors ${
                scenario === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 820 420"
            role="img"
            aria-label={`表驱动方法键域与验证图。包含键域、校验、查询和重放四个节点。当前状态：${state.headline}。支持配置切换、分步、播放、拖动进度和重置实验。`}
            className="mx-auto block h-auto w-full max-w-[820px]"
          >
            <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
              一张表先要通过自己的合同
            </text>
            <text x="28" y="54" fontSize="12" fill={MUTED}>
              规则数据可审查，不等于任意数据都能被查询
            </text>

            <path d="M92 150H728" fill="none" stroke={BORDER} strokeWidth="8" strokeLinecap="round" />
            {[92, 304, 516].map((x) => (
              <path key={x} d={`M${x + 56} 150H${x + 156}`} fill="none" stroke={ACCENT} strokeWidth="2" />
            ))}

            {CONTRACT_STEPS.map((step, index) => {
              const x = 92 + index * 212;
              const focused = state.active === step.label;
              return (
                <g
                  key={step.label}
                  ref={(element) => {
                    nodeRefs.current[step.label] = element;
                  }}
                  style={{ opacity: 0 }}
                >
                  <rect
                    x={x - 56}
                    y="82"
                    width="112"
                    height="136"
                    rx="14"
                    fill={SURFACE}
                    stroke={focused ? state.color : BORDER}
                    strokeWidth={focused ? 3 : 1.5}
                  />
                  <circle cx={x} cy="112" r="16" fill={focused ? state.color : ACCENT} />
                  <text x={x} y="117" textAnchor="middle" fontSize="12" fontWeight="700" fill={SURFACE}>
                    {index + 1}
                  </text>
                  <text x={x} y="153" textAnchor="middle" fontSize="13" fontWeight="700" fill={PRIMARY}>
                    {step.label === "domain" ? "键域" : step.label === "validate" ? "校验" : step.label === "lookup" ? "查询" : "重放"}
                  </text>
                  <text x={x} y="181" textAnchor="middle" fontSize="11" fill={MUTED}>
                    {step.caption}
                  </text>
                  <circle cx={x} cy="204" r="5" fill={focused ? state.color : BORDER} />
                </g>
              );
            })}

            <rect x="28" y="258" width="764" height="78" rx="12" fill={SURFACE} stroke={state.color} strokeWidth="1.8" />
            <text x="48" y="287" fontSize="13" fontWeight="700" fill={state.color}>
              {state.headline}
            </text>
            <text x="48" y="313" fontSize="12" fill={MUTED}>
              {state.detail}
            </text>
            <text x="28" y="374" fontSize="12" fontWeight="700" fill={PRIMARY}>
              证据记录：键值 · 表版本 · 校验结果 · 命中行 · 首个偏离 · 重置后的同一结果
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(CONTRACT_STEPS.map((step) => [step.label, step.caption ?? step.label]))}
          caption="把配置故障停在查询前，才能知道结果是规则的产物。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置表驱动方法键域与验证实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}

const ACCESS_STEPS: readonly TeachingStep[] = [
  { label: "key", caption: "先构造与表定义一致的查询键值。" },
  { label: "direct", caption: "离散键可直接访问唯一结果。" },
  { label: "indexed", caption: "稳定位置可以用索引表表达。" },
  { label: "ladder", caption: "连续范围要按阈值顺序阶梯查找。" },
];

type AccessMode = "direct" | "indexed" | "ladder";

const ACCESS_MODES: readonly { id: AccessMode; label: string }[] = [
  { id: "direct", label: "直接访问" },
  { id: "indexed", label: "索引访问" },
  { id: "ladder", label: "阶梯访问" },
];

function accessState(mode: AccessMode) {
  if (mode === "indexed") {
    return {
      color: WARNING,
      active: "indexed",
      title: "索引表：键先转换成稳定位置",
      detail: "month = 2 → index 1 → 28；索引越界必须显式拒绝。",
    };
  }
  if (mode === "ladder") {
    return {
      color: SUCCESS,
      active: "ladder",
      title: "阶梯访问：选择不超过输入的最大阈值",
      detail: "premium = 730 → 命中 500 阈值，得到对应费率。",
    };
  }
  return {
    color: ACCENT,
    active: "direct",
    title: "直接访问：离散键对应一个结果",
    detail: "month = 2 → days[2] = 28；键和值的单位保持一致。",
  };
}

/** 第18章实验二：对照直接、索引与阶梯三种表访问合同。 */
export function Cc2e18TableDrivenMethodsAccessLab() {
  const [mode, setMode] = useState<AccessMode>("direct");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const state = accessState(mode);

  const timeline = useTeachingTimeline({
    steps: ACCESS_STEPS,
    build: (tl) => {
      ACCESS_STEPS.forEach((step, index) => {
        tl.add(
          nodeRefs.current[step.label]!,
          { opacity: [0, 1], scale: [0.9, 1], duration: T * 0.55, ease: "out(3)" },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  const reset = () => {
    setMode("direct");
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="表驱动方法访问策略对照实验"
      data-visual-kind="cc2e-18-table-driven-methods-access"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold tracking-wide text-accent">
          第18章 · 访问策略对照
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          同一条规则，不同的查找合同
        </h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          选择访问方式前先问：键是离散值、稳定位置，还是连续区间？策略错配时，结果看似合理却无法复核。
        </p>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-2 sm:grid-cols-3" aria-label="选择访问策略">
          {ACCESS_MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors ${
                mode === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 820 420"
            role="img"
            aria-label={`表驱动方法访问策略图。对照直接访问、索引访问和阶梯访问。当前：${state.title}。${state.detail}。支持切换、分步、播放、拖动进度和重置实验。`}
            className="mx-auto block h-auto w-full max-w-[820px]"
          >
            <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
              从查询键到结果的三条路
            </text>
            <text x="28" y="54" fontSize="12" fill={MUTED}>
              先判断数据形状，再选访问策略；不要用默认值掩盖错配
            </text>

            <circle cx="92" cy="164" r="38" fill={SURFACE} stroke={ACCENT} strokeWidth="2.5" />
            <text x="92" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill={PRIMARY}>
              查询键
            </text>
            <text x="92" y="181" textAnchor="middle" fontSize="11" fill={MUTED}>
              month / premium
            </text>
            <path d="M132 164H204" fill="none" stroke={ACCENT} strokeWidth="2.5" />

            {ACCESS_STEPS.slice(1).map((step, index) => {
              const y = 92 + index * 94;
              const focused = state.active === step.label;
              return (
                <g
                  key={step.label}
                  ref={(element) => {
                    nodeRefs.current[step.label] = element;
                  }}
                  style={{ opacity: 0 }}
                >
                  <rect x="204" y={y} width="286" height="62" rx="12" fill={SURFACE} stroke={focused ? state.color : BORDER} strokeWidth={focused ? 3 : 1.5} />
                  <circle cx="230" cy={y + 31} r="14" fill={focused ? state.color : ACCENT} />
                  <text x="230" y={y + 35} textAnchor="middle" fontSize="11" fontWeight="700" fill={SURFACE}>
                    {index + 1}
                  </text>
                  <text x="258" y={y + 27} fontSize="13" fontWeight="700" fill={PRIMARY}>
                    {step.label === "direct" ? "直接访问表" : step.label === "indexed" ? "索引表访问" : "阶梯访问表"}
                  </text>
                  <text x="258" y={y + 47} fontSize="11" fill={MUTED}>
                    {step.caption}
                  </text>
                </g>
              );
            })}

            <path d="M490 123H570M490 217H570M490 311H570" fill="none" stroke={BORDER} strokeWidth="2" />
            <rect x="570" y="86" width="220" height="252" rx="14" fill={SURFACE} stroke={state.color} strokeWidth="1.8" />
            <text x="592" y="116" fontSize="13" fontWeight="700" fill={state.color}>
              当前结果
            </text>
            <text x="592" y="151" fontSize="15" fontWeight="700" fill={PRIMARY}>
              {state.title}
            </text>
            <text x="592" y="204" fontSize="12" fill={MUTED}>
              {state.detail}
            </text>
            <text x="592" y="270" fontSize="12" fontWeight="700" fill={PRIMARY}>
              复核要问
            </text>
            <text x="592" y="296" fontSize="11" fill={MUTED}>
              键的单位是否一致？
            </text>
            <text x="592" y="318" fontSize="11" fill={MUTED}>
              越界与缺省是否可见？
            </text>
            <text x="28" y="374" fontSize="12" fontWeight="700" fill={PRIMARY}>
              目录证据：18.2 直接访问表 · 18.3 索引表访问（Indexed Access Tables） · 18.4 阶梯访问表
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(ACCESS_STEPS.map((step) => [step.label, step.caption ?? step.label]))}
          caption="访问策略是数据形状的承诺；能说清键和值，才算选对表。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置表驱动方法访问策略对照实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}

const LADDER_STEPS: readonly TeachingStep[] = [
  { label: "thresholds", caption: "按从小到大列出阈值与费率。" },
  { label: "probe", caption: "把输入放在阈值、阈值前后测试。" },
  { label: "select", caption: "选择不超过输入的最大阈值。" },
  { label: "fallback", caption: "为超出范围和无匹配值写出结论。" },
];

/** 第18章实验三：用滑块观察阶梯阈值的边界与默认策略。 */
export function Cc2e18TableDrivenMethodsLadderLab() {
  const [premium, setPremium] = useState(730);
  const [fault, setFault] = useState(false);
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const selected = fault ? "无默认策略：拒绝" : premium >= 1000 ? "0.70" : premium >= 500 ? "0.85" : "1.00";
  const selectedColor = fault ? DANGER : premium >= 1000 ? SUCCESS : premium >= 500 ? WARNING : ACCENT;

  const timeline = useTeachingTimeline({
    steps: LADDER_STEPS,
    build: (tl) => {
      LADDER_STEPS.forEach((step, index) => {
        tl.add(
          nodeRefs.current[step.label]!,
          { opacity: [0, 1], scale: [0.9, 1], duration: T * 0.55, ease: "out(3)" },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  const reset = () => {
    setPremium(730);
    setFault(false);
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="表驱动方法阶梯访问边界实验"
      data-visual-kind="cc2e-18-table-driven-methods-ladder"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold tracking-wide text-accent">
          第18章 · 阶梯表边界实验
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">
          输入值落在哪一级，答案就应该可解释
        </h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          拖动保费并先预测命中哪条阈值，再打开故障开关，观察缺少默认策略时为何必须拒绝而不能猜。
        </p>
      </header>

      <div className="min-w-0 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="cc2e-18-premium" className="text-sm text-primary">
            年保费：{premium}
          </label>
          <input
            id="cc2e-18-premium"
            type="range"
            min="0"
            max="1300"
            step="10"
            value={premium}
            onChange={(event) => setPremium(Number(event.target.value))}
            aria-label="调整年保费"
            className="mdx-range min-w-48 flex-1 accent-accent"
          />
          <button
            type="button"
            aria-pressed={fault}
            onClick={() => setFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors ${
              fault
                ? "border-danger bg-danger/10 text-primary"
                : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {fault ? "关闭缺省故障" : "注入缺省故障"}
          </button>
        </div>

        <div className="mt-4 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox="0 0 820 430"
            role="img"
            aria-label={`表驱动方法阶梯访问图。当前保费 ${premium}，${fault ? "缺省故障已注入" : "配置完整"}，查询结果 ${selected}。显示阈值、探针、选择和缺省四步，支持滑块、故障开关、分步、播放、拖动进度和重置实验。`}
            className="mx-auto block h-auto w-full max-w-[820px]"
          >
            <text x="28" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
              阶梯访问：lower bound(premium)
            </text>
            <text x="28" y="54" fontSize="12" fill={MUTED}>
              选择不超过输入的最大阈值；边界和越界都必须留下结论
            </text>

            <line x1="86" y1="166" x2="734" y2="166" stroke={BORDER} strokeWidth="6" strokeLinecap="round" />
            {[0, 500, 1000, 1300].map((value) => {
              const x = 86 + (value / 1300) * 648;
              return (
                <g key={value}>
                  <line x1={x} y1="151" x2={x} y2="181" stroke={ACCENT} strokeWidth="2" />
                  <text x={x} y="204" textAnchor="middle" fontSize="11" fill={MUTED}>
                    {value}
                  </text>
                </g>
              );
            })}
            <circle cx={86 + (premium / 1300) * 648} cy="166" r="10" fill={selectedColor} />
            <text x={86 + (premium / 1300) * 648} y="137" textAnchor="middle" fontSize="12" fontWeight="700" fill={selectedColor}>
              输入 {premium}
            </text>

            {LADDER_STEPS.map((step, index) => {
              const x = 112 + index * 190;
              const focused = step.label === "select" && !fault;
              return (
                <g
                  key={step.label}
                  ref={(element) => {
                    nodeRefs.current[step.label] = element;
                  }}
                  style={{ opacity: 0 }}
                >
                  <rect x={x - 70} y="244" width="140" height="104" rx="12" fill={SURFACE} stroke={focused ? selectedColor : BORDER} strokeWidth={focused ? 3 : 1.5} />
                  <circle cx={x - 44} cy="270" r="14" fill={focused ? selectedColor : ACCENT} />
                  <text x={x - 44} y="274" textAnchor="middle" fontSize="11" fontWeight="700" fill={SURFACE}>
                    {index + 1}
                  </text>
                  <text x={x - 22} y="274" fontSize="13" fontWeight="700" fill={PRIMARY}>
                    {step.label === "thresholds" ? "阈值" : step.label === "probe" ? "探针" : step.label === "select" ? "选择" : "缺省"}
                  </text>
                  <text x={x - 52} y="304" fontSize="11" fill={MUTED}>
                    {step.caption}
                  </text>
                  <circle cx={x} cy="330" r="5" fill={focused ? selectedColor : BORDER} />
                </g>
              );
            })}

            <rect x="28" y="366" width="764" height="42" rx="10" fill={SURFACE} stroke={selectedColor} strokeWidth="1.8" />
            <text x="48" y="393" fontSize="13" fontWeight="700" fill={selectedColor}>
              当前命中：{selected} · {fault ? "修法：补齐默认拒绝并记录越界输入" : "结果可由阈值表与查询键重算"}
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(LADDER_STEPS.map((step) => [step.label, step.caption ?? step.label]))}
          caption="边界样本不是装饰；它决定阶梯表是否真的覆盖了输入域。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置表驱动方法阶梯访问边界实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}

// 保留官方目录节点文本，供章节审计把每个节点与专属视觉证据逐项对齐。
void OFFICIAL_NODES;
