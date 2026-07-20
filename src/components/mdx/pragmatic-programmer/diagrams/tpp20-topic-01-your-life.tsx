"use client";

import { useState, type ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const surface = "var(--bg)";
const elevated = "var(--bg-elevated)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

type SituationId = "growth" | "ambiguity" | "skillDebt";
type ActionId = "clarify" | "smallChange" | "practice";
type ReplayState = "baseline" | "fault" | "recovered";

const situations = {
  growth: {
    tab: "成长停滞",
    current: "连续 8 周都在修补同类缺陷",
    boundary: "本季度不能换组；每周可支配 2 小时",
    options: [
      "约一次 20 分钟职责澄清",
      "认领一个有边界的小改进",
      "为重复故障写一页复盘",
    ],
    feedback: "一周内是否获得一个可负责的新任务",
  },
  ambiguity: {
    tab: "职责模糊",
    current: "三个需求方都能临时改变优先级",
    boundary: "无权调整组织；可以要求书面排序",
    options: [
      "请负责人确认唯一优先级",
      "把冲突需求写成取舍清单",
      "为临时请求设置响应窗口",
    ],
    feedback: "下一次冲突能否在开始编码前裁决",
  },
  skillDebt: {
    tab: "技能债务",
    current: "关键模块只能照旧例复制修改",
    boundary: "不能暂停交付；可选择一个窄切面练习",
    options: [
      "画出一次真实调用路径",
      "补一个最小失败样本",
      "和维护者做 30 分钟结对",
    ],
    feedback: "能否独立解释并修改同一条路径",
  },
} as const;

const actions = {
  clarify: {
    label: "20 分钟职责澄清",
    input: "带着一个冲突实例与三个可选边界赴会",
    cost: "日历占用：20 分钟",
    reversible: "会后仍可修改职责边界",
    feedback: "24 小时内：得到明确负责人或拒绝理由",
    output: "把口头不满变成一项可验证的职责约定",
  },
  smallChange: {
    label: "提交一个小型改进",
    input: "选择可单独回滚、不会改变外部接口的改动",
    cost: "实现与验证：约 90 分钟",
    reversible: "一个独立提交可完整撤回",
    feedback: "当天：CI、评审意见与维护者反应",
    output: "验证团队是否愿意给你更大的改进空间",
  },
  practice: {
    label: "安排一次技能练习",
    input: "从当前工作提取一个不接触生产的窄问题",
    cost: "专注时间：45 分钟",
    reversible: "练习不改变生产状态",
    feedback: "练习结束：测试结果与一页解释",
    output: "确认技能缺口究竟在概念、工具还是调试",
  },
} as const;

function LabFrame({
  eyebrow,
  title,
  description,
  visualKind,
  resetLabel,
  onReset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  visualKind: string;
  resetLabel: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-01-your-life"
      data-visual-kind={visualKind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold text-primary hover:border-accent"
          aria-label={resetLabel}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

function SituationControls({
  value,
  onChange,
}: {
  value: SituationId;
  onChange: (value: SituationId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="选择不满意的工作情境">
      {(Object.keys(situations) as SituationId[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs font-semibold transition-colors ${
            value === id
              ? "border-accent bg-accent/10 text-primary"
              : "border-border bg-bg text-secondary hover:text-primary"
          }`}
        >
          {situations[id].tab}
        </button>
      ))}
    </div>
  );
}

function AutonomyLoopDesktop({
  situationId,
  optionIndex,
  onOptionChange,
}: {
  situationId: SituationId;
  optionIndex: number;
  onOptionChange: (index: number) => void;
}) {
  const model = situations[situationId];
  return (
    <svg
      viewBox="0 0 980 540"
      role="img"
      aria-label={`${model.tab}情境中，从不满意现状经过不可控边界和三个可控选项，到最小可逆行动与可观察反馈的职业自主权回路`}
      className="hidden h-auto w-full md:block"
    >
      <defs>
        <marker
          id="career-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
        </marker>
        <marker
          id="career-loop-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={success} />
        </marker>
      </defs>

      <text x="34" y="37" fontSize="13" fontWeight="700" fill={primary}>
        不是“辞职 / 忍耐”的二选一，而是把可控空间逐段剖开
      </text>

      <path
        d="M208 157 H270"
        stroke={accent}
        strokeWidth="3"
        fill="none"
        markerEnd="url(#career-arrow)"
      />
      <path
        d="M459 157 H520"
        stroke={accent}
        strokeWidth="3"
        fill="none"
        markerEnd="url(#career-arrow)"
      />
      <path
        d="M716 157 H760"
        stroke={accent}
        strokeWidth="3"
        fill="none"
        markerEnd="url(#career-arrow)"
      />

      <g>
        <path
          d="M34 96 Q34 74 56 74 H186 Q208 74 208 96 V218 Q208 240 186 240 H56 Q34 240 34 218 Z"
          fill={danger}
          fillOpacity="0.08"
          stroke={danger}
          strokeWidth="2"
        />
        <text x="52" y="105" fontSize="12" fontWeight="700" fill={danger}>
          真实现状
        </text>
        <text x="52" y="133" fontSize="15" fontWeight="700" fill={primary}>
          {model.tab}
        </text>
        <foreignObject x="52" y="150" width="138" height="72">
          <p className="m-0 text-xs leading-5 text-secondary">
            {model.current}
          </p>
        </foreignObject>
      </g>

      <g>
        <path
          d="M270 74 H459 L429 240 H300 Z"
          fill={warning}
          fillOpacity="0.08"
          stroke={warning}
          strokeWidth="2"
        />
        <text
          x="365"
          y="105"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning}
        >
          约束漏斗
        </text>
        <foreignObject x="302" y="126" width="126" height="80">
          <p className="m-0 text-center text-xs leading-5 text-secondary">
            {model.boundary}
          </p>
        </foreignObject>
        <text
          x="365"
          y="225"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={primary}
        >
          留下仍由你控制的动作
        </text>
      </g>

      <g>
        <rect
          x="520"
          y="60"
          width="196"
          height="194"
          rx="16"
          fill={accent}
          fillOpacity="0.05"
          stroke={accent}
          strokeWidth="2"
        />
        <text x="538" y="88" fontSize="12" fontWeight="700" fill={accent}>
          三个可控选项
        </text>
        {model.options.map((option, index) => {
          const active = optionIndex === index;
          return (
            <g
              key={option}
              role="button"
              tabIndex={0}
              aria-label={`选择${option}`}
              aria-pressed={active}
              onClick={() => onOptionChange(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOptionChange(index);
                }
              }}
              className="cursor-pointer outline-none"
            >
              <rect
                x="536"
                y={104 + index * 48}
                width="164"
                height="38"
                rx="19"
                fill={active ? accent : surface}
                fillOpacity={active ? 0.18 : 1}
                stroke={active ? accent : border}
                strokeWidth={active ? 2.5 : 1.25}
              />
              <circle
                cx="552"
                cy={123 + index * 48}
                r="8"
                fill={active ? accent : elevated}
                stroke={active ? accent : border}
              />
              <text
                x="566"
                y={127 + index * 48}
                fontSize="12"
                fontWeight={active ? "700" : "500"}
                fill={primary}
              >
                {option.length > 14 ? `${option.slice(0, 13)}…` : option}
              </text>
            </g>
          );
        })}
      </g>

      <g>
        <path
          d="M780 75 H928 Q948 75 948 95 V219 Q948 239 928 239 H780 Q760 239 760 219 V95 Q760 75 780 75 Z"
          fill={success}
          fillOpacity="0.08"
          stroke={success}
          strokeWidth="2"
        />
        <text x="780" y="105" fontSize="12" fontWeight="700" fill={success}>
          最小可逆行动
        </text>
        <foreignObject x="780" y="122" width="148" height="65">
          <p className="m-0 text-xs font-semibold leading-5 text-primary">
            {model.options[optionIndex]}
          </p>
        </foreignObject>
        <text x="780" y="212" fontSize="12" fill={secondary}>
          先做一次，再依据结果决定
        </text>
      </g>

      <path
        d="M854 239 V330 Q854 350 834 350 H500"
        stroke={success}
        strokeWidth="3"
        fill="none"
        markerEnd="url(#career-loop-arrow)"
      />
      <g>
        <rect
          x="304"
          y="310"
          width="196"
          height="82"
          rx="41"
          fill={success}
          fillOpacity="0.1"
          stroke={success}
          strokeWidth="2"
        />
        <text
          x="402"
          y="338"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={success}
        >
          可观察反馈
        </text>
        <foreignObject x="326" y="348" width="152" height="36">
          <p className="m-0 text-center text-xs leading-4 text-primary">
            {model.feedback}
          </p>
        </foreignObject>
      </g>
      <path
        d="M304 351 H122 Q92 351 92 321 V257"
        stroke={success}
        strokeWidth="3"
        strokeDasharray="8 6"
        fill="none"
        markerEnd="url(#career-loop-arrow)"
      />
      <text
        x="164"
        y="338"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={success}
      >
        用结果重写下一轮现状与选项
      </text>

      <g>
        <rect
          x="34"
          y="430"
          width="914"
          height="76"
          rx="10"
          fill={elevated}
          stroke={border}
        />
        <path d="M58 454 H58 V482" stroke={danger} strokeWidth="5" />
        <text x="76" y="458" fontSize="12" fontWeight="700" fill={danger}>
          职业边界不是越界许可
        </text>
        <text x="76" y="484" fontSize="12" fill={secondary}>
          自主权意味着选择自己能承担后果的动作；不能替他人承诺、跳过安全规则，或把未经验证的改动推入生产。
        </text>
      </g>
    </svg>
  );
}

function AutonomyLoopMobile({
  situationId,
  optionIndex,
  onOptionChange,
}: {
  situationId: SituationId;
  optionIndex: number;
  onOptionChange: (index: number) => void;
}) {
  const model = situations[situationId];
  return (
    <div className="grid gap-3 md:hidden">
      <div className="rounded-control border-l-4 border-danger bg-bg p-3">
        <p className="text-xs font-semibold text-danger">
          真实现状 · {model.tab}
        </p>
        <p className="mt-1 text-sm text-primary">{model.current}</p>
      </div>
      <div className="text-center text-xl text-accent" aria-hidden="true">
        ↓
      </div>
      <div className="rounded-control border border-warning bg-warning/5 p-3">
        <p className="text-xs font-semibold text-warning">约束漏斗</p>
        <p className="mt-1 text-sm text-primary">{model.boundary}</p>
      </div>
      <div className="text-center text-xl text-accent" aria-hidden="true">
        ↓
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-accent">
          留下三个可控选项
        </p>
        <div className="grid gap-2">
          {model.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => onOptionChange(index)}
              aria-pressed={optionIndex === index}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs ${
                optionIndex === index
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border bg-bg text-secondary"
              }`}
            >
              {index + 1}. {option}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center text-xl text-accent" aria-hidden="true">
        ↓
      </div>
      <div className="rounded-control border-2 border-success bg-success/5 p-3">
        <p className="text-xs font-semibold text-success">
          现在只执行一个最小行动
        </p>
        <p className="mt-1 text-sm font-semibold text-primary">
          {model.options[optionIndex]}
        </p>
        <p className="mt-2 text-xs text-secondary">反馈：{model.feedback}</p>
      </div>
      <div className="rounded-control border border-dashed border-success p-3 text-xs leading-5 text-primary">
        ↺ 把观察结果写回下一轮现状，再决定保留、调整还是放弃这个选项。
      </div>
    </div>
  );
}

export function Tpp20Topic01YourLifeSystemLab() {
  const [situationId, setSituationId] = useState<SituationId>("growth");
  const [optionIndex, setOptionIndex] = useState(0);
  const reset = () => {
    setSituationId("growth");
    setOptionIndex(0);
  };
  const changeSituation = (id: SituationId) => {
    setSituationId(id);
    setOptionIndex(0);
  };

  return (
    <LabFrame
      eyebrow="第 1 章专属解剖图 · 职业自主权"
      title="把“不满意”拆成一轮可执行的选择"
      description="切换真实情境，再从三个仍由你控制的选项中选择一个。图中反馈会回写下一轮现状，而不是输出一个虚构评分。"
      visualKind="career-autonomy-loop"
      resetLabel="重置职业自主权回路实验"
      onReset={reset}
    >
      <div className="p-4">
        <SituationControls value={situationId} onChange={changeSituation} />
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <AutonomyLoopDesktop
            situationId={situationId}
            optionIndex={optionIndex}
            onOptionChange={setOptionIndex}
          />
          <AutonomyLoopMobile
            situationId={situationId}
            optionIndex={optionIndex}
            onOptionChange={setOptionIndex}
          />
        </div>
      </div>
    </LabFrame>
  );
}

function ActionFilterDesktop({ actionId }: { actionId: ActionId }) {
  const action = actions[actionId];
  const gates = [
    { x: 258, label: "成本可承受", detail: action.cost, color: warning },
    { x: 482, label: "动作可逆", detail: action.reversible, color: accent },
    { x: 706, label: "反馈可观察", detail: action.feedback, color: success },
  ];
  return (
    <svg
      viewBox="0 0 980 455"
      role="img"
      aria-label={`${action.label}依次通过时间成本、可逆性和反馈窗口三个闸门，产出可验证的下一步`}
      className="hidden h-auto w-full md:block"
    >
      <defs>
        <marker
          id="filter-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
        </marker>
      </defs>
      <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
        候选动作进入筛选器；任何一道闸门说不清，就缩小动作而不是硬闯
      </text>
      <g>
        <path
          d="M34 152 L194 96 L194 286 L34 230 Z"
          fill={elevated}
          stroke={border}
          strokeWidth="2"
        />
        <text x="52" y="145" fontSize="12" fontWeight="700" fill={accent}>
          候选动作
        </text>
        <foreignObject x="52" y="160" width="120" height="82">
          <p className="m-0 text-sm font-semibold leading-5 text-primary">
            {action.label}
          </p>
        </foreignObject>
      </g>
      <path
        d="M194 191 H240"
        stroke={accent}
        strokeWidth="3"
        markerEnd="url(#filter-arrow)"
      />
      {gates.map((gate, index) => (
        <g key={gate.label}>
          <rect
            x={gate.x}
            y="92"
            width="184"
            height="194"
            rx="16"
            fill={gate.color}
            fillOpacity="0.07"
            stroke={gate.color}
            strokeWidth="2"
          />
          <circle cx={gate.x + 28} cy="124" r="14" fill={gate.color} />
          <text
            x={gate.x + 28}
            y="129"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={surface}
          >
            {index + 1}
          </text>
          <text
            x={gate.x + 51}
            y="129"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            {gate.label}
          </text>
          <path
            d={`M${gate.x + 28} 151 H${gate.x + 156}`}
            stroke={gate.color}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d={`M${gate.x + 92} 151 V186`}
            stroke={gate.color}
            strokeWidth="2"
          />
          <foreignObject x={gate.x + 18} y="201" width="148" height="70">
            <p className="m-0 text-center text-xs leading-5 text-secondary">
              {gate.detail}
            </p>
          </foreignObject>
          {index < gates.length - 1 && (
            <path
              d={`M${gate.x + 184} 191 H${gate.x + 207}`}
              stroke={accent}
              strokeWidth="3"
              markerEnd="url(#filter-arrow)"
            />
          )}
        </g>
      ))}
      <path
        d="M890 286 V323 Q890 341 872 341 H170 Q148 341 148 363 V383"
        fill="none"
        stroke={success}
        strokeWidth="3"
        markerEnd="url(#filter-arrow)"
      />
      <rect
        x="148"
        y="383"
        width="742"
        height="48"
        rx="24"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
        strokeWidth="2"
      />
      <text x="177" y="412" fontSize="12" fontWeight="700" fill={success}>
        可验证输出
      </text>
      <text x="277" y="412" fontSize="12" fill={primary}>
        {action.output}
      </text>
    </svg>
  );
}

export function Tpp20Topic01YourLifeFeedbackLab() {
  const [actionId, setActionId] = useState<ActionId>("clarify");
  const reset = () => setActionId("clarify");
  const action = actions[actionId];

  return (
    <LabFrame
      eyebrow="第 1 章专属交互图 · 低风险行动"
      title="让一个候选动作依次穿过三道闸门"
      description="这里不计算“推荐指数”。选择成本由真实时间、撤回方式和反馈等待期构成；三者无法说明时，动作还不够小。"
      visualKind="career-action-filter"
      resetLabel="重置低风险行动筛选实验"
      onReset={reset}
    >
      <div className="p-4">
        <div
          className="grid gap-2 sm:grid-cols-3"
          aria-label="选择要检查的职业行动"
        >
          {(Object.keys(actions) as ActionId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActionId(id)}
              aria-pressed={actionId === id}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs font-semibold ${
                actionId === id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-bg text-secondary"
              }`}
            >
              {actions[id].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <ActionFilterDesktop actionId={actionId} />
          <div className="grid gap-3 md:hidden">
            <div className="rounded-control border-l-4 border-accent bg-elevated p-3">
              <p className="text-xs font-semibold text-accent">候选动作</p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {action.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-secondary">
                {action.input}
              </p>
            </div>
            {[
              ["1", "成本可承受", action.cost, "border-warning"],
              ["2", "动作可逆", action.reversible, "border-accent"],
              ["3", "反馈可观察", action.feedback, "border-success"],
            ].map(([number, label, detail, color]) => (
              <div
                key={label}
                className={`rounded-control border-l-4 ${color} bg-elevated p-3`}
              >
                <p className="text-xs font-semibold text-primary">
                  {number}. {label}
                </p>
                <p className="mt-1 text-xs leading-5 text-secondary">
                  {detail}
                </p>
              </div>
            ))}
            <div className="rounded-control border-2 border-success bg-success/5 p-3">
              <p className="text-xs font-semibold text-success">可验证输出</p>
              <p className="mt-1 text-sm text-primary">{action.output}</p>
            </div>
          </div>
        </div>
      </div>
    </LabFrame>
  );
}

const replayCopy = {
  baseline: {
    title: "基线：承诺已经落到一次实验",
    message: "责任人、日历时间与观察结果都存在，反馈可以回到下一轮选择。",
  },
  fault: {
    title: "故障：只有“我要改变”的决心",
    message: "最小行动没有责任人、日历时间和观察窗口，回路断在执行之前。",
  },
  recovered: {
    title: "恢复：从原始现状重新安排",
    message:
      "补入“我 / 周三 16:30 / 是否得到一个新任务”，再从现状重放，而不是手改最终结论。",
  },
} as const;

function ReplayDiagramDesktop({ state }: { state: ReplayState }) {
  const broken = state === "fault";
  const recovered = state === "recovered";
  const activeColor = broken ? danger : success;
  return (
    <svg
      viewBox="0 0 980 480"
      role="img"
      aria-label={`${replayCopy[state].title}：从成长停滞现状到职责澄清行动，再到一周反馈的回路${broken ? "在行动排期处断开" : "闭合"}`}
      className="hidden h-auto w-full md:block"
    >
      <defs>
        <marker
          id="replay-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={activeColor} />
        </marker>
      </defs>
      <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
        {replayCopy[state].title}
      </text>

      <g>
        <circle
          cx="122"
          cy="182"
          r="76"
          fill={danger}
          fillOpacity="0.07"
          stroke={danger}
          strokeWidth="2"
        />
        <text
          x="122"
          y="151"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={danger}
        >
          原始现状
        </text>
        <text
          x="122"
          y="181"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={primary}
        >
          成长停滞
        </text>
        <text
          x="122"
          y="207"
          textAnchor="middle"
          fontSize="12"
          fill={secondary}
        >
          8 周同类修补
        </text>
      </g>

      <path
        d="M198 182 H264"
        stroke={activeColor}
        strokeWidth="3"
        markerEnd="url(#replay-arrow)"
      />
      <g>
        <path
          d="M284 106 H496 V258 H284 Z"
          fill={elevated}
          stroke={activeColor}
          strokeWidth="2"
        />
        <text x="304" y="135" fontSize="12" fontWeight="700" fill={activeColor}>
          最小行动承诺
        </text>
        <text x="304" y="164" fontSize="14" fontWeight="700" fill={primary}>
          约一次职责澄清
        </text>
        <g opacity={broken ? 0.25 : 1}>
          <circle cx="315" cy="197" r="7" fill={success} />
          <text x="332" y="202" fontSize="12" fill={primary}>
            {recovered ? "责任人：我" : "责任人：我"}
          </text>
          <circle cx="315" cy="226" r="7" fill={success} />
          <text x="332" y="231" fontSize="12" fill={primary}>
            {recovered ? "日历：周三 16:30" : "日历：本周三"}
          </text>
        </g>
        {broken && (
          <g>
            <path
              d="M302 191 L472 236 M472 191 L302 236"
              stroke={danger}
              strokeWidth="5"
            />
            <text
              x="390"
              y="281"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
            >
              没有谁、何时、做完看什么
            </text>
          </g>
        )}
      </g>

      {broken ? (
        <g>
          <path
            d="M496 182 H548"
            stroke={danger}
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <path
            d="M526 164 L544 200 M544 164 L526 200"
            stroke={danger}
            strokeWidth="5"
          />
          <text
            x="540"
            y="228"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            回路在执行前断开
          </text>
        </g>
      ) : (
        <path
          d="M496 182 H566"
          stroke={success}
          strokeWidth="3"
          markerEnd="url(#replay-arrow)"
        />
      )}

      <g opacity={broken ? 0.28 : 1}>
        <path
          d="M586 106 H792 Q814 106 814 128 V236 Q814 258 792 258 H586 Q566 258 566 236 V128 Q566 106 586 106 Z"
          fill={success}
          fillOpacity="0.08"
          stroke={success}
          strokeWidth="2"
        />
        <text x="588" y="136" fontSize="12" fontWeight="700" fill={success}>
          一周反馈窗口
        </text>
        <text x="588" y="169" fontSize="12" fill={primary}>
          观察：
        </text>
        <text x="638" y="169" fontSize="12" fontWeight="700" fill={primary}>
          是否得到一个新任务
        </text>
        <text x="588" y="201" fontSize="12" fill={primary}>
          结果：
        </text>
        <text x="638" y="201" fontSize="12" fontWeight="700" fill={primary}>
          {recovered ? "获得日志清理任务" : "待观察"}
        </text>
        <text x="588" y="232" fontSize="12" fill={secondary}>
          不以“感觉更有动力”代替结果
        </text>
      </g>

      {!broken && (
        <path
          d="M690 258 V326 Q690 345 671 345 H122 Q102 345 102 325 V270"
          fill="none"
          stroke={success}
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#replay-arrow)"
        />
      )}
      <rect
        x="34"
        y="378"
        width="912"
        height="66"
        rx="10"
        fill={activeColor}
        fillOpacity="0.07"
        stroke={activeColor}
      />
      <text x="56" y="405" fontSize="12" fontWeight="700" fill={activeColor}>
        {broken ? "首差" : recovered ? "恢复证据" : "闭环条件"}
      </text>
      <text x="128" y="405" fontSize="12" fill={primary}>
        {broken
          ? "承诺没有进入日历，所以没有动作，也不可能产生反馈。"
          : recovered
            ? "同一现状重放后，责任人、时间和观察结果均可由他人复核。"
            : "动作发生、结果可观察，并能实际改变下一轮选项。"}
      </text>
      <text x="56" y="430" fontSize="12" fill={secondary}>
        {replayCopy[state].message}
      </text>
    </svg>
  );
}

export function Tpp20Topic01YourLifeEvidenceLab() {
  const [state, setState] = useState<ReplayState>("baseline");
  const reset = () => setState("baseline");
  const copy = replayCopy[state];

  return (
    <LabFrame
      eyebrow="第 1 章专属故障图 · 反馈断点"
      title="把“只有决心”注入回路，再从基线恢复"
      description="故障不会神秘地出现在最终结果：缺少责任人、日历时间和观察结果时，回路明确断在最小行动之前。"
      visualKind="career-feedback-recovery"
      resetLabel="重置职业反馈故障恢复实验"
      onReset={reset}
    >
      <div className="p-4">
        <div
          className="grid grid-cols-3 gap-2"
          aria-label="选择职业反馈回路状态"
        >
          {(
            [
              ["baseline", "基线"],
              ["fault", "注入故障"],
              ["recovered", "恢复重放"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setState(id)}
              aria-pressed={state === id}
              className={`min-h-11 rounded-control border px-2 py-2 text-xs font-semibold ${
                state === id
                  ? id === "fault"
                    ? "border-danger bg-danger/10 text-primary"
                    : "border-success bg-success/10 text-primary"
                  : "border-border bg-bg text-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <ReplayDiagramDesktop state={state} />
          <div className="grid gap-3 md:hidden">
            <div className="rounded-control border-l-4 border-danger bg-elevated p-3">
              <p className="text-xs font-semibold text-danger">原始现状</p>
              <p className="mt-1 text-sm text-primary">
                成长停滞：8 周都在修补同类缺陷
              </p>
            </div>
            <div
              className="text-center text-xl text-secondary"
              aria-hidden="true"
            >
              ↓
            </div>
            <div
              className={`rounded-control border-2 p-3 ${state === "fault" ? "border-danger bg-danger/5" : "border-success bg-success/5"}`}
            >
              <p className="text-xs font-semibold text-primary">
                最小行动：约一次职责澄清
              </p>
              {state === "fault" ? (
                <p className="mt-2 text-sm font-semibold text-danger">
                  断点：没有责任人、日历时间和观察窗口
                </p>
              ) : (
                <ul className="mt-2 space-y-1 text-xs text-secondary">
                  <li>责任人：我</li>
                  <li>
                    日历：{state === "recovered" ? "周三 16:30" : "本周三"}
                  </li>
                  <li>观察：是否得到一个新任务</li>
                </ul>
              )}
            </div>
            <div
              className="text-center text-xl text-secondary"
              aria-hidden="true"
            >
              ↓
            </div>
            <div
              className={`rounded-control border p-3 ${state === "fault" ? "border-dashed border-danger opacity-50" : "border-success"}`}
            >
              <p className="text-xs font-semibold text-success">一周反馈</p>
              <p className="mt-1 text-sm text-primary">
                {state === "recovered"
                  ? "获得一个日志清理任务"
                  : state === "fault"
                    ? "无动作，因此无反馈"
                    : "等待可观察结果"}
              </p>
            </div>
            <div
              className={`rounded-control border-l-4 p-3 ${state === "fault" ? "border-danger" : "border-success"}`}
            >
              <p className="text-xs font-semibold text-primary">{copy.title}</p>
              <p className="mt-1 text-xs leading-5 text-secondary">
                {copy.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LabFrame>
  );
}
