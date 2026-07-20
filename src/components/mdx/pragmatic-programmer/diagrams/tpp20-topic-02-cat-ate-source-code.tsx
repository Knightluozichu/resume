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

type IncidentId = "migration" | "api" | "release";
type ImpactId = "internal" | "partial" | "checkout";
type RecoveryState = "baseline" | "missingOptions" | "recovered";

const incidents = {
  migration: {
    label: "迁移异常",
    fact: "10:14 的迁移脚本把 18 笔订单状态写成 null",
    proof: "部署记录 #842；受影响订单 ID 列表；数据库审计日志",
    impact: "客服无法查询这 18 笔订单，结算任务会在 11:00 前跳过它们",
    owner: "我负责恢复数据；值班同事负责暂停下一批结算",
    options: ["从审计日志回填", "回滚迁移后重放", "人工确认后补单"],
    commitment: "10:35 前暂停结算，10:50 前给出恢复结果与回归检查。",
  },
  api: {
    label: "接口超时",
    fact: "支付网关 P95 从 280ms 升至 8.4s，超时集中在新路由",
    proof: "追踪 trace；网关指标；新路由的发布 diff",
    impact: "部分付款请求会重试，用户可能看到重复的等待页",
    owner: "我负责切换路由；产品同事负责更新状态页文案",
    options: ["切回旧路由", "对新路由限流", "开启降级支付提示"],
    commitment: "15 分钟内切回稳定路径，并在下一小时复盘慢调用。",
  },
  release: {
    label: "发布遗漏",
    fact: "发布包缺少一条配置迁移，生产环境读取到旧阈值",
    proof: "构建清单；制品哈希；生产配置快照",
    impact: "新用户注册被错误拒绝，已有用户不受影响",
    owner: "我负责补齐制品并验证；支持同事接收受影响用户清单",
    options: ["补发配置制品", "临时放宽阈值", "撤回本次注册规则"],
    commitment: "20 分钟内给出可验证的恢复路径，完成后附上制品差异。",
  },
} as const;

const impacts = {
  internal: {
    label: "内部可见",
    detail: "只有后台任务失败，用户尚未看到错误。",
    firstAction: "先冻结扩散，再在隔离环境重放。",
    options: ["暂停下一批任务", "从日志重放", "补一个边界测试"],
  },
  partial: {
    label: "部分用户受影响",
    detail: "少量用户已看到错误，需要同时恢复和告知。",
    firstAction: "先界定受影响名单，再给出恢复窗口。",
    options: ["暂停扩散", "恢复受影响记录", "更新状态页"],
  },
  checkout: {
    label: "核心路径受阻",
    detail: "付款或注册等核心路径无法完成，时间窗口最短。",
    firstAction: "先恢复可用路径，根因分析随后进行。",
    options: ["切换稳定路径", "临时降级", "按分钟通报"],
  },
} as const;

const recoveryCopy = {
  baseline: {
    label: "基线：事实与选项齐全",
    result: "对方能据此判断影响、比较代价，并复核承诺是否兑现。",
  },
  missingOptions: {
    label: "故障：只报告坏消息",
    result: "“猫吃了源码”不是沟通；没有方案和时限，责任在承诺前断开。",
  },
  recovered: {
    label: "恢复：从事实重新组织承诺",
    result: "保留失败记录，补入至少两个可行路径、代价和下一次更新时间。",
  },
} as const;

function Frame({
  eyebrow,
  title,
  description,
  visualKind,
  onReset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  visualKind: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-02-cat-ate-source-code"
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

function IncidentSystemDiagram({
  incidentId,
  selectedOption,
  onOption,
}: {
  incidentId: IncidentId;
  selectedOption: number;
  onOption: (index: number) => void;
}) {
  const incident = incidents[incidentId];
  return (
    <>
      <svg
        viewBox="0 0 980 528"
        role="img"
        aria-label={`${incident.label}中，事故事实经过用户影响和责任归属，形成可比较的恢复选项与带时限的承诺`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="incident-arrow"
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
          一份可承担的事故说明：先陈述可复核事实，再说明影响、选择和下一次更新
        </text>
        <path
          d="M232 170 H274"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#incident-arrow)"
        />
        <path
          d="M472 170 H514"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#incident-arrow)"
        />
        <path
          d="M714 170 H756"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#incident-arrow)"
        />
        <g>
          <path
            d="M34 78 H212 Q232 78 232 98 V244 Q232 264 212 264 H34 Z"
            fill={danger}
            fillOpacity="0.07"
            stroke={danger}
            strokeWidth="2"
          />
          <text x="54" y="110" fontSize="12" fontWeight="700" fill={danger}>
            1. 可核对的事实
          </text>
          <foreignObject x="54" y="128" width="152" height="58">
            <p className="m-0 text-sm font-semibold leading-5 text-primary">
              {incident.fact}
            </p>
          </foreignObject>
          <foreignObject x="54" y="197" width="152" height="48">
            <p className="m-0 text-xs leading-4 text-secondary">
              证据：{incident.proof}
            </p>
          </foreignObject>
        </g>
        <g>
          <path
            d="M294 78 H452 Q472 78 472 98 V244 Q472 264 452 264 H294 Z"
            fill={warning}
            fillOpacity="0.07"
            stroke={warning}
            strokeWidth="2"
          />
          <text x="314" y="110" fontSize="12" fontWeight="700" fill={warning}>
            2. 用户影响
          </text>
          <foreignObject x="314" y="132" width="136" height="78">
            <p className="m-0 text-sm leading-5 text-primary">
              {incident.impact}
            </p>
          </foreignObject>
          <text x="314" y="240" fontSize="12" fill={secondary}>
            不把“系统有问题”冒充影响说明
          </text>
        </g>
        <g>
          <path
            d="M534 78 H694 Q714 78 714 98 V244 Q714 264 694 264 H534 Z"
            fill={accent}
            fillOpacity="0.07"
            stroke={accent}
            strokeWidth="2"
          />
          <text x="554" y="110" fontSize="12" fontWeight="700" fill={accent}>
            3. 责任动作
          </text>
          <foreignObject x="554" y="135" width="138" height="76">
            <p className="m-0 text-sm leading-5 text-primary">
              {incident.owner}
            </p>
          </foreignObject>
          <text x="554" y="240" fontSize="12" fill={secondary}>
            负责恢复，不负责找借口
          </text>
        </g>
        <g>
          <path
            d="M776 78 H926 Q946 78 946 98 V244 Q946 264 926 264 H776 Z"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
            strokeWidth="2"
          />
          <text x="796" y="110" fontSize="12" fontWeight="700" fill={success}>
            4. 承诺
          </text>
          <foreignObject x="796" y="134" width="126" height="78">
            <p className="m-0 text-sm leading-5 text-primary">
              {incident.commitment}
            </p>
          </foreignObject>
        </g>
        <path
          d="M614 264 V318 Q614 338 594 338 H228"
          fill="none"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#incident-arrow)"
        />
        <text
          x="400"
          y="329"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={accent}
        >
          责任不是终点：必须给出可比较的恢复路径
        </text>
        <g>
          <rect
            x="70"
            y="367"
            width="818"
            height="112"
            rx="14"
            fill={surface}
            stroke={border}
            strokeWidth="1.5"
          />
          <text x="94" y="396" fontSize="12" fontWeight="700" fill={primary}>
            三个选项，以及它们的代价
          </text>
          {incident.options.map((option, index) => {
            const active = selectedOption === index;
            const x = 94 + index * 252;
            return (
              <g
                key={option}
                role="button"
                tabIndex={0}
                aria-label={`选择恢复方案：${option}`}
                aria-pressed={active}
                className="cursor-pointer"
                onClick={() => onOption(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOption(index);
                  }
                }}
              >
                <rect
                  x={x}
                  y="414"
                  width="222"
                  height="42"
                  rx="21"
                  fill={active ? accent : elevated}
                  fillOpacity={active ? 0.17 : 1}
                  stroke={active ? accent : border}
                  strokeWidth={active ? 2.5 : 1.2}
                />
                <circle
                  cx={x + 21}
                  cy="435"
                  r="8"
                  fill={active ? accent : surface}
                  stroke={active ? accent : border}
                />
                <text
                  x={x + 38}
                  y="439"
                  fontSize="12"
                  fontWeight={active ? "700" : "500"}
                  fill={primary}
                >
                  {option}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border-l-4 border-danger bg-bg p-3">
          <p className="text-xs font-semibold text-danger">1. 可核对的事实</p>
          <p className="mt-1 text-sm font-semibold text-primary">
            {incident.fact}
          </p>
          <p className="mt-2 text-xs text-secondary">证据：{incident.proof}</p>
        </div>
        <div className="text-center text-xl text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="rounded-control border-l-4 border-warning bg-bg p-3">
          <p className="text-xs font-semibold text-warning">2. 用户影响</p>
          <p className="mt-1 text-sm text-primary">{incident.impact}</p>
        </div>
        <div className="text-center text-xl text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="rounded-control border-l-4 border-accent bg-bg p-3">
          <p className="text-xs font-semibold text-accent">3. 责任动作</p>
          <p className="mt-1 text-sm text-primary">{incident.owner}</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-success">
            4. 选择一个恢复路径
          </p>
          <div className="grid gap-2">
            {incident.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => onOption(index)}
                aria-pressed={selectedOption === index}
                className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs ${selectedOption === index ? "border-success bg-success/10 font-semibold text-primary" : "border-border bg-bg text-secondary"}`}
              >
                {index + 1}. {option}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-control border-2 border-success bg-success/5 p-3">
          <p className="text-xs font-semibold text-success">
            承诺与下一次更新时间
          </p>
          <p className="mt-1 text-sm text-primary">{incident.commitment}</p>
        </div>
      </div>
    </>
  );
}

export function Tpp20Topic02CatAteSourceCodeSystemLab() {
  const [incidentId, setIncidentId] = useState<IncidentId>("migration");
  const [selectedOption, setSelectedOption] = useState(0);
  const reset = () => {
    setIncidentId("migration");
    setSelectedOption(0);
  };
  return (
    <Frame
      eyebrow="第 1 章专属解剖图 · 事故责任"
      title="从事实写到可兑现的事故承诺"
      description="切换事故时，证据、用户影响、责任边界与恢复选项一起改变。只有一句“出了问题”不能形成可复核的承诺。"
      visualKind="incident-accountability-board"
      onReset={reset}
    >
      <div className="p-4">
        <div className="flex flex-wrap gap-2" aria-label="选择事故情境">
          {(Object.keys(incidents) as IncidentId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setIncidentId(id);
                setSelectedOption(0);
              }}
              aria-pressed={incidentId === id}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs font-semibold ${incidentId === id ? "border-accent bg-accent/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {incidents[id].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <IncidentSystemDiagram
            incidentId={incidentId}
            selectedOption={selectedOption}
            onOption={setSelectedOption}
          />
        </div>
      </div>
    </Frame>
  );
}

function ImpactDecisionDiagram({ impactId }: { impactId: ImpactId }) {
  const impact = impacts[impactId];
  return (
    <>
      <svg
        viewBox="0 0 980 450"
        role="img"
        aria-label={`${impact.label}时，用户影响先改变恢复次序，再决定要公开的选项与更新时间`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="impact-arrow"
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
          只改“影响范围”：首先变化的是恢复次序，而不是事实、责任或事后归因
        </text>
        <g>
          <circle
            cx="146"
            cy="197"
            r="92"
            fill={warning}
            fillOpacity="0.08"
            stroke={warning}
            strokeWidth="2"
          />
          <text
            x="146"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={warning}
          >
            用户影响
          </text>
          <text
            x="146"
            y="196"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={primary}
          >
            {impact.label}
          </text>
          <foreignObject x="82" y="214" width="128" height="54">
            <p className="m-0 text-center text-xs leading-4 text-secondary">
              {impact.detail}
            </p>
          </foreignObject>
        </g>
        <path
          d="M238 197 H316"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#impact-arrow)"
        />
        <g>
          <path
            d="M336 101 H578 Q598 101 598 121 V273 Q598 293 578 293 H336 Z"
            fill={accent}
            fillOpacity="0.07"
            stroke={accent}
            strokeWidth="2"
          />
          <text x="358" y="135" fontSize="12" fontWeight="700" fill={accent}>
            首个必须做的动作
          </text>
          <foreignObject x="358" y="157" width="214" height="74">
            <p className="m-0 text-lg font-semibold leading-6 text-primary">
              {impact.firstAction}
            </p>
          </foreignObject>
          <text x="358" y="267" fontSize="12" fill={secondary}>
            “先解释原因”不能抢在可用路径之前
          </text>
        </g>
        <path
          d="M598 197 H676"
          stroke={accent}
          strokeWidth="3"
          markerEnd="url(#impact-arrow)"
        />
        <g>
          <path
            d="M696 101 H930 Q950 101 950 121 V273 Q950 293 930 293 H696 Z"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
            strokeWidth="2"
          />
          <text x="718" y="135" fontSize="12" fontWeight="700" fill={success}>
            向对方公开的选项
          </text>
          {impact.options.map((option, index) => (
            <g key={option}>
              <circle cx="724" cy={170 + index * 31} r="8" fill={success} />
              <text x="741" y={175 + index * 31} fontSize="13" fill={primary}>
                {option}
              </text>
            </g>
          ))}
        </g>
        <path
          d="M812 293 V344 Q812 362 794 362 H146 Q126 362 126 342 V299"
          fill="none"
          stroke={success}
          strokeWidth="3"
          strokeDasharray="8 6"
          markerEnd="url(#impact-arrow)"
        />
        <rect
          x="302"
          y="343"
          width="460"
          height="52"
          rx="26"
          fill={success}
          fillOpacity="0.09"
          stroke={success}
        />
        <text
          x="532"
          y="375"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={primary}
        >
          下次更新时间 = 受影响用户需要知道何时再来，而不是“尽快”
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border-l-4 border-warning bg-elevated p-3">
          <p className="text-xs font-semibold text-warning">
            用户影响 · {impact.label}
          </p>
          <p className="mt-1 text-sm text-primary">{impact.detail}</p>
        </div>
        <div className="text-center text-xl text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="rounded-control border-2 border-accent bg-accent/5 p-3">
          <p className="text-xs font-semibold text-accent">首个动作</p>
          <p className="mt-1 text-base font-semibold text-primary">
            {impact.firstAction}
          </p>
        </div>
        <div className="text-center text-xl text-accent" aria-hidden="true">
          ↓
        </div>
        <div className="rounded-control border-l-4 border-success bg-elevated p-3">
          <p className="text-xs font-semibold text-success">公开的恢复选项</p>
          <ul className="mt-2 space-y-1 text-sm text-primary">
            {impact.options.map((option) => (
              <li key={option}>• {option}</li>
            ))}
          </ul>
        </div>
        <p className="rounded-control border border-success p-3 text-xs leading-5 text-secondary">
          下一次更新时间必须能回答：受影响者何时得到新的事实，而不是只听到“我们正在处理”。
        </p>
      </div>
    </>
  );
}

export function Tpp20Topic02CatAteSourceCodeFeedbackLab() {
  const [impactId, setImpactId] = useState<ImpactId>("partial");
  const reset = () => setImpactId("partial");
  return (
    <Frame
      eyebrow="第 1 章专属交互图 · 影响优先级"
      title="用户影响改变恢复次序，不改变事实"
      description="只改变影响范围，观察决策从“先冻结”到“先恢复核心路径”的第一处变化；不以紧张程度或自信分数替代判断。"
      visualKind="incident-impact-decision"
      onReset={reset}
    >
      <div className="p-4">
        <div
          className="grid gap-2 sm:grid-cols-3"
          aria-label="选择用户影响范围"
        >
          {(Object.keys(impacts) as ImpactId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setImpactId(id)}
              aria-pressed={impactId === id}
              className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs font-semibold ${impactId === id ? "border-warning bg-warning/10 text-primary" : "border-border bg-bg text-secondary"}`}
            >
              {impacts[id].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <ImpactDecisionDiagram impactId={impactId} />
        </div>
      </div>
    </Frame>
  );
}

function RecoveryDiagram({ state }: { state: RecoveryState }) {
  const broken = state === "missingOptions";
  const recovered = state === "recovered";
  const color = broken ? danger : success;
  return (
    <>
      <svg
        viewBox="0 0 980 466"
        role="img"
        aria-label={`${recoveryCopy[state].label}的事故沟通回路${broken ? "在提供选项前断开" : "可以被独立复核"}`}
        className="hidden h-auto w-full md:block"
      >
        <defs>
          <marker
            id="recovery-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={color} />
          </marker>
        </defs>
        <text x="34" y="36" fontSize="13" fontWeight="700" fill={primary}>
          {recoveryCopy[state].label}
        </text>
        <g>
          <path
            d="M54 92 H244 Q264 92 264 112 V247 Q264 267 244 267 H54 Z"
            fill={danger}
            fillOpacity="0.07"
            stroke={danger}
            strokeWidth="2"
          />
          <text x="76" y="126" fontSize="12" fontWeight="700" fill={danger}>
            事实
          </text>
          <text x="76" y="157" fontSize="14" fontWeight="700" fill={primary}>
            18 笔订单状态异常
          </text>
          <text x="76" y="188" fontSize="12" fill={secondary}>
            记录时间、范围和审计证据
          </text>
        </g>
        <path
          d="M264 179 H336"
          stroke={color}
          strokeWidth="3"
          markerEnd="url(#recovery-arrow)"
        />
        <g>
          <path
            d="M356 92 H594 Q614 92 614 112 V247 Q614 267 594 267 H356 Z"
            fill={elevated}
            stroke={color}
            strokeWidth="2"
          />
          <text x="378" y="126" fontSize="12" fontWeight="700" fill={color}>
            给对方的消息
          </text>
          <text x="378" y="158" fontSize="14" fontWeight="700" fill={primary}>
            {broken ? "“抱歉，迁移出错了”" : "“18 笔订单受影响；结算已暂停”"}
          </text>
          {broken ? (
            <>
              <path
                d="M378 185 H592"
                stroke={danger}
                strokeWidth="4"
                strokeDasharray="8 6"
              />
              <text x="378" y="216" fontSize="12" fill={danger}>
                缺少选项、代价与下次更新时间
              </text>
            </>
          ) : (
            <>
              <circle cx="390" cy="191" r="7" fill={success} />
              <text x="406" y="196" fontSize="12" fill={primary}>
                选项：回填 / 回滚重放 / 人工补单
              </text>
              <circle cx="390" cy="221" r="7" fill={success} />
              <text x="406" y="226" fontSize="12" fill={primary}>
                承诺：{recovered ? "10:50 更新恢复结果" : "10:35 暂停结算"}
              </text>
            </>
          )}
        </g>
        {broken ? (
          <g>
            <path
              d="M614 179 H675"
              stroke={danger}
              strokeWidth="3"
              strokeDasharray="8 6"
            />
            <path
              d="M643 160 L667 198 M667 160 L643 198"
              stroke={danger}
              strokeWidth="5"
            />
            <text
              x="658"
              y="225"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
            >
              无法比较路径
            </text>
          </g>
        ) : (
          <path
            d="M614 179 H686"
            stroke={success}
            strokeWidth="3"
            markerEnd="url(#recovery-arrow)"
          />
        )}
        <g opacity={broken ? 0.28 : 1}>
          <path
            d="M706 92 H904 Q924 92 924 112 V247 Q924 267 904 267 H706 Z"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
            strokeWidth="2"
          />
          <text x="728" y="126" fontSize="12" fontWeight="700" fill={success}>
            可复核承诺
          </text>
          <text x="728" y="158" fontSize="14" fontWeight="700" fill={primary}>
            恢复后附回归证据
          </text>
          <text x="728" y="188" fontSize="12" fill={secondary}>
            数据校验、任务重跑和下一批结算记录
          </text>
        </g>
        {!broken && (
          <path
            d="M814 267 V326 Q814 345 795 345 H138 Q118 345 118 325 V285"
            fill="none"
            stroke={success}
            strokeWidth="3"
            strokeDasharray="8 6"
            markerEnd="url(#recovery-arrow)"
          />
        )}
        <rect
          x="54"
          y="366"
          width="870"
          height="58"
          rx="10"
          fill={color}
          fillOpacity="0.07"
          stroke={color}
        />
        <text x="76" y="392" fontSize="12" fontWeight="700" fill={color}>
          {broken ? "首差" : recovered ? "恢复动作" : "验收条件"}
        </text>
        <text x="146" y="392" fontSize="12" fill={primary}>
          {recoveryCopy[state].result}
        </text>
        <text x="76" y="413" fontSize="12" fill={secondary}>
          {broken
            ? "恢复时不要删除坏消息；从原始事实重新给出可行方案。"
            : "让收到消息的人能在不相信作者的前提下核验结果。"}
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border-l-4 border-danger bg-elevated p-3">
          <p className="text-xs font-semibold text-danger">事实</p>
          <p className="mt-1 text-sm text-primary">
            18 笔订单状态异常，证据来自审计日志。
          </p>
        </div>
        <div className="text-center text-xl text-secondary" aria-hidden="true">
          ↓
        </div>
        <div
          className={`rounded-control border-2 p-3 ${broken ? "border-danger bg-danger/5" : "border-success bg-success/5"}`}
        >
          <p className="text-xs font-semibold text-primary">给对方的消息</p>
          <p className="mt-1 text-sm font-semibold text-primary">
            {broken ? "抱歉，迁移出错了" : "18 笔订单受影响；结算已暂停"}
          </p>
          <p
            className={`mt-2 text-xs leading-5 ${broken ? "text-danger" : "text-secondary"}`}
          >
            {broken
              ? "缺少选项、代价与下次更新时间。"
              : recovered
                ? "选项：回填 / 回滚重放；10:50 更新恢复结果。"
                : "选项：回填 / 回滚重放；10:35 暂停结算。"}
          </p>
        </div>
        <div className="text-center text-xl text-secondary" aria-hidden="true">
          ↓
        </div>
        <div
          className={`rounded-control border p-3 ${broken ? "border-dashed border-danger opacity-50" : "border-success"}`}
        >
          <p className="text-xs font-semibold text-success">可复核承诺</p>
          <p className="mt-1 text-sm text-primary">
            {broken
              ? "没有选项，承诺无法成立"
              : "恢复后附上数据校验与任务重跑记录"}
          </p>
        </div>
        <p
          className={`rounded-control border-l-4 p-3 text-xs leading-5 ${broken ? "border-danger text-danger" : "border-success text-secondary"}`}
        >
          {recoveryCopy[state].result}
        </p>
      </div>
    </>
  );
}

export function Tpp20Topic02CatAteSourceCodeEvidenceLab() {
  const [state, setState] = useState<RecoveryState>("baseline");
  const reset = () => setState("baseline");
  return (
    <Frame
      eyebrow="第 1 章专属故障图 · 无借口恢复"
      title="撤掉选项，观察承诺在哪里断开"
      description="注入故障后，页面不应把“歉意”显示成已完成的恢复。恢复必须回到原始事实，并补入路径、代价、时限和回归证据。"
      visualKind="incident-option-recovery"
      onReset={reset}
    >
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2" aria-label="选择事故承诺状态">
          {(
            [
              ["baseline", "基线"],
              ["missingOptions", "撤掉选项"],
              ["recovered", "恢复重放"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setState(id)}
              aria-pressed={state === id}
              className={`min-h-11 rounded-control border px-2 py-2 text-xs font-semibold ${state === id ? (id === "missingOptions" ? "border-danger bg-danger/10 text-primary" : "border-success bg-success/10 text-primary") : "border-border bg-bg text-secondary"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-card border border-border bg-bg p-3 sm:p-4">
          <RecoveryDiagram state={state} />
        </div>
      </div>
    </Frame>
  );
}
