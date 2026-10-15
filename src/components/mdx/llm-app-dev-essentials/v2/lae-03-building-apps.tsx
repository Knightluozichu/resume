"use client";

import { useId, useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

// 独立需求分析：本章不是通用证据卡。消息后缀选择→队列/预算条；
// 流式输出→四泳道时序/提交边界；语音动作→授权分支/幂等执行记录。
// 三图均为确定性本地模拟，不调用模型、不存储真实会话或秘密。
const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const root =
  "not-prose my-6 min-w-0 max-w-full rounded-xl border border-border bg-surface p-4 text-primary";
const button =
  "min-h-11 min-w-11 rounded-lg border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
const scroll =
  "mt-4 max-w-full overflow-x-auto rounded-lg border border-border focus-visible:outline-2 focus-visible:outline-accent";

function Arrow({
  x1,
  y1,
  x2,
  y2,
  danger = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  danger?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g stroke={danger ? C.danger : C.accent} strokeWidth={2} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path
        d={`M ${x2 - 9 * Math.cos(angle - 0.45)} ${y2 - 9 * Math.sin(angle - 0.45)} L ${x2} ${y2} L ${x2 - 9 * Math.cos(angle + 0.45)} ${y2 - 9 * Math.sin(angle + 0.45)}`}
      />
    </g>
  );
}

const history = [
  { id: "U1", text: "介绍海拉鲁", role: "user" },
  { id: "A1", text: "给出背景", role: "assistant" },
  { id: "U2", text: "如何做料理", role: "user" },
  { id: "A2", text: "解释配方", role: "assistant" },
  { id: "U3", text: "如何防寒", role: "user" },
  { id: "A3", text: "介绍保暖", role: "assistant" },
];

export function Lae03BuildingAppsRequestContractLab() {
  const id = useId();
  const [budget, setBudget] = useState(280);
  const [failure, setFailure] = useState(false);
  // 教学权重：每条消息40，固定规则40、当前问题40、输出预留80。
  // 按完整user/assistant轮次保留最近后缀；并非真实tokenizer。
  const rounds = failure ? 3 : Math.min(3, Math.floor((budget - 160) / 80));
  const selected = history.slice(6 - rounds * 2);
  const used = 160 + rounds * 80;
  const overflow = used > budget;
  const request = [
    "规则",
    ...selected.map((m) => m.id),
    "本轮",
    "输出",
    "预留",
  ];
  const reset = () => {
    setBudget(280);
    setFailure(false);
  };
  return (
    <section
      className={root}
      data-visual-kind="conversation-context-window"
      aria-labelledby={`${id}-title`}
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">
        会话队列：保存的历史 ≠ 本次上下文
      </h3>
      <p className="mt-2 text-sm text-secondary">
        游戏专家的三轮问答。先预测缩小预算会移走哪些消息。数字是教学权重，不是模型实测
        token。
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label htmlFor={`${id}-budget`} className="text-sm">
          总预算：{budget} token（含输出预留）
        </label>
        <input
          id={`${id}-budget`}
          type="range"
          min={160}
          max={400}
          step={40}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="h-11 min-h-11 min-w-11 w-full accent-accent"
          aria-valuetext={`${budget} token，保留最近${rounds}轮历史`}
        />
        <button
          type="button"
          className={button}
          aria-pressed={failure}
          onClick={() => setFailure(!failure)}
        >
          故障：全量拼接 {failure ? "开" : "关"}
        </button>
        <button type="button" className={button} onClick={reset}>
          重置
        </button>
      </div>
      <p className="mt-2 text-sm text-secondary">
        手机端可左右滑动结构图；图下同步提供文字状态。
      </p>
      <div
        className={scroll}
        tabIndex={0}
        role="region"
        aria-label="可横向滚动的会话队列与上下文预算图"
      >
        <svg
          viewBox="0 0 800 520"
          className="block w-full min-w-[800px]"
          role="img"
          aria-label={`历史始终保留六条消息。本次选择${selected.map((m) => m.id).join("、") || "零条历史"}；占用${used}，预算${budget}，${overflow ? "超限，拒绝发送" : "允许发送"}。`}
        >
          <text x={24} y={30} fontSize={16} fill={C.text}>
            应用会话存储（未删除）
          </text>
          <text x={470} y={30} fontSize={16} fill={C.text}>
            本次请求副本（保持时间顺序）
          </text>
          <line
            x1={420}
            y1={48}
            x2={420}
            y2={340}
            stroke={C.border}
            strokeDasharray="6 5"
          />
          {history.map((message, i) => {
            const target = selected.findIndex((m) => m.id === message.id);
            const included = target >= 0;
            return (
              <g key={message.id}>
                <rect
                  x={24}
                  y={52 + i * 45}
                  width={325}
                  height={36}
                  rx={5}
                  fill={C.elevated}
                  stroke={included ? C.accent : C.border}
                />
                <text x={36} y={75 + i * 45} fontSize={14} fill={C.text}>
                  {message.id} · {message.role} · {message.text}
                </text>
                {included ? (
                  <>
                    <Arrow
                      x1={350}
                      y1={70 + i * 45}
                      x2={470}
                      y2={105 + target * 31}
                    />
                    <rect
                      x={470}
                      y={90 + target * 31}
                      width={290}
                      height={27}
                      rx={3}
                      fill={C.elevated}
                      stroke={C.accent}
                    />
                    <text
                      x={485}
                      y={109 + target * 31}
                      fontSize={14}
                      fill={C.text}
                    >
                      {message.id} · {message.role} · 40 token
                    </text>
                  </>
                ) : (
                  <path
                    d={`M 366 ${61 + i * 45} l 18 18 m -18 0 l 18 -18`}
                    stroke={C.muted}
                    strokeWidth={2}
                  />
                )}
              </g>
            );
          })}
          <rect
            x={470}
            y={52}
            width={290}
            height={28}
            rx={3}
            fill={C.elevated}
            stroke={C.border}
          />
          <text x={485} y={72} fontSize={14} fill={C.text}>
            固定规则 · 40 token
          </text>
          <rect
            x={470}
            y={90 + selected.length * 31}
            width={290}
            height={28}
            rx={3}
            fill={C.elevated}
            stroke={C.border}
          />
          <text
            x={485}
            y={110 + selected.length * 31}
            fontSize={14}
            fill={C.text}
          >
            当前问题 · 40 token
          </text>
          <text x={24} y={360} fontSize={14} fill={C.muted}>
            × 表示不放入本次请求；不是删除数据库历史。连线保留顺序和完整轮次。
          </text>
          {request.map((label, i) => (
            <g key={`${label}-${i}`}>
              <rect
                x={24 + i * 72}
                y={385}
                width={70}
                height={48}
                fill={i >= request.length - 2 ? C.bg : C.elevated}
                stroke={overflow && (i + 1) * 40 > budget ? C.danger : C.accent}
                strokeDasharray={i >= request.length - 2 ? "4 3" : undefined}
              />
              <text
                x={59 + i * 72}
                y={413}
                fontSize={14}
                textAnchor="middle"
                fill={C.text}
              >
                {label}
              </text>
            </g>
          ))}
          <line
            x1={24 + budget * 1.8}
            y1={374}
            x2={24 + budget * 1.8}
            y2={444}
            stroke={overflow ? C.danger : C.text}
            strokeWidth={3}
          />
          <text
            x={24}
            y={468}
            fontSize={14}
            fill={overflow ? C.danger : C.text}
          >
            每格 40 token；实线为输入，虚线为输出预留；粗竖线 = 总预算 {budget}
          </text>
          <text
            x={24}
            y={497}
            fontSize={16}
            fill={overflow ? C.danger : C.accent}
          >
            {overflow
              ? `拒绝发送：超限 ${used - budget} token`
              : `可以发送：${used} / ${budget} token，空余 ${budget - used}`}
          </text>
        </svg>
      </div>
      <p role="status" className="mt-3 text-sm">
        保留最近 {rounds} 轮：{selected.map((m) => m.id).join("、") || "无历史"}
        。
        {overflow
          ? `全量拼接超出预算 ${used - budget} token；请求尚未发送。关闭故障恢复裁剪。`
          : `输入 ${used - 80} + 输出预留 80 ≤ ${budget}，历史存储仍为 6 条。`}
      </p>
    </section>
  );
}

const streamSteps = [
  { label: "queued", caption: "用户问题入队" },
  { label: "request", caption: "服务端发起模型请求" },
  { label: "delta", caption: "接收第一段临时文本" },
  { label: "finish", caption: "完成事件或超时" },
  { label: "validate", caption: "检查完整性与来源" },
  { label: "commit", caption: "提交完整答案或保持旧记录" },
] as const;
const streamLabels = Object.fromEntries(
  streamSteps.map((step) => [step.label, step.caption]),
);

export function Lae03BuildingAppsExecutionTraceLab() {
  const id = useId();
  const [failure, setFailure] = useState(false);
  const timeline = useTeachingTimeline({
    steps: streamSteps,
    build: (tl) => {
      const clock = { value: 0 };
      streamSteps.forEach((step, i) => {
        tl.label(step.label, i * 1000);
        tl.add(
          clock,
          { value: i + 1, duration: 1000, ease: "linear" },
          i * 1000,
        );
      });
    },
  });
  const stage = timeline.currentStep;
  const committed = stage === 5 && !failure;
  const textCount = stage < 2 ? 0 : stage < 3 || failure ? 3 : 6;
  const reset = () => {
    setFailure(false);
    timeline.goToStep(0);
  };
  const events = [
    { from: 0, to: 1, y: 92, label: "R1：用户问题入队" },
    { from: 1, to: 2, y: 143, label: "服务端凭据发起请求" },
    { from: 2, to: 1, y: 194, label: "delta：临时文本片段" },
    {
      from: 2,
      to: 1,
      y: 245,
      label: failure ? "超时：无完成事件" : "剩余片段 + 完成事件",
    },
    {
      from: 1,
      to: 0,
      y: 296,
      label: failure ? "标记未完成，可重试" : "完整性 / 来源校验通过",
    },
    {
      from: 1,
      to: failure ? 0 : 3,
      y: 347,
      label: failure ? "拒绝提交半截答案" : "事务提交 R1 + 完整答案",
    },
  ];
  return (
    <section
      className={root}
      data-visual-kind="streaming-persistence-sequence"
      aria-labelledby={`${id}-title`}
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">
        流式摘要：显示片段不是提交答案
      </h3>
      <p className="mt-2 text-sm text-secondary">
        先预测超时后数据库是否增加一条完整回答。单步或拖动时间线比较同一请求
        R1；重放只是本地教学回放。
      </p>
      <button
        type="button"
        className={`${button} mt-3`}
        aria-pressed={failure}
        onClick={() => {
          setFailure(!failure);
          timeline.goToStep(0);
        }}
      >
        故障：流式超时 {failure ? "开" : "关"}
      </button>
      <p className="mt-2 text-sm text-secondary">
        图可左右滑动；虚线是各参与者的生命线，横向箭头表示实际事件。
      </p>
      <div
        className={scroll}
        tabIndex={0}
        role="region"
        aria-label="可横向滚动的流式响应四泳道时序图"
      >
        <svg
          viewBox="0 0 800 540"
          className="block w-full min-w-[800px]"
          role="img"
          aria-label={`阶段${stage + 1}：${events[stage].label}。临时片段${textCount}格，完整答案存储${committed ? 2 : 1}条。`}
        >
          {["浏览器", "应用服务端", "模型服务", "应用数据库"].map(
            (actor, i) => (
              <g key={actor}>
                <text
                  x={90 + i * 200}
                  y={32}
                  textAnchor="middle"
                  fontSize={16}
                  fill={C.text}
                >
                  {actor}
                </text>
                <line
                  x1={90 + i * 200}
                  y1={48}
                  x2={90 + i * 200}
                  y2={370}
                  stroke={C.border}
                  strokeDasharray="5 5"
                />
              </g>
            ),
          )}
          {events.slice(0, stage + 1).map((event, i) => (
            <g key={event.y}>
              <Arrow
                x1={90 + event.from * 200}
                y1={event.y}
                x2={90 + event.to * 200}
                y2={event.y}
                danger={failure && i >= 3}
              />
              <text
                x={(180 + (event.from + event.to) * 200) / 2}
                y={event.y - 10}
                textAnchor="middle"
                fontSize={14}
                fill={failure && i >= 3 ? C.danger : C.text}
              >
                {event.label}
              </text>
              <circle
                cx={90 + event.to * 200}
                cy={event.y}
                r={5}
                fill={failure && i >= 3 ? C.danger : C.accent}
              />
            </g>
          ))}
          <text x={24} y={405} fontSize={15} fill={C.text}>
            临时缓冲区（每格代表一个教学片段）
          </text>
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <rect
                x={24 + i * 55}
                y={421}
                width={48}
                height={40}
                rx={4}
                fill={i < textCount ? C.elevated : C.bg}
                stroke={
                  failure && stage >= 3 && i < textCount
                    ? C.danger
                    : i < textCount
                      ? C.accent
                      : C.border
                }
                strokeDasharray={i >= textCount ? "4 3" : undefined}
              />
              <text
                x={48 + i * 55}
                y={447}
                textAnchor="middle"
                fontSize={14}
                fill={C.text}
              >
                {i < textCount ? i + 1 : "—"}
              </text>
            </g>
          ))}
          <line
            x1={410}
            y1={390}
            x2={410}
            y2={510}
            stroke={C.border}
            strokeDasharray="6 4"
          />
          <text x={440} y={405} fontSize={15} fill={C.text}>
            完整答案表（提交边界之后）
          </text>
          <path
            d="M 460 431 Q 605 406 750 431 L 750 486 Q 605 511 460 486 Z"
            fill={C.elevated}
            stroke={C.border}
          />
          <path d="M 460 431 Q 605 457 750 431" fill="none" stroke={C.border} />
          <text x={605} y={474} textAnchor="middle" fontSize={15} fill={C.text}>
            {committed ? "R0 + R1：2 条完整答案" : "R0：1 条完整答案"}
          </text>
          {committed && <Arrow x1={355} y1={470} x2={450} y2={470} />}
          <text
            x={24}
            y={524}
            fontSize={14}
            fill={failure && stage >= 3 ? C.danger : C.muted}
          >
            {failure && stage >= 3
              ? "超时片段可显示为未完成，但不能冒充完整答案提交。"
              : "仅完整性与来源校验通过后，才写入完整答案表。"}
          </text>
        </svg>
      </div>
      <div className="[&_button]:min-h-11 [&_button]:min-w-11 [&_input]:h-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_ol]:hidden [&_.mt-4]:flex-wrap">
        <TimelineControls
          timeline={timeline}
          labelText={streamLabels}
          caption={events[stage].label}
          reset={{ label: "重置", onClick: reset }}
        />
      </div>
      <p role="status" className="mt-3 text-sm">
        临时片段 {textCount}/6；完整答案 {committed ? 2 : 1} 条。
        {failure && stage >= 3
          ? "请求失败，记录错误状态而非完整回答。关闭故障后从头重放。"
          : committed
            ? "R1 校验后已提交。"
            : "R1 尚未提交，服务端密钥不进入消息或答案表。"}
      </p>
    </section>
  );
}

export function Lae03BuildingAppsAuthorizationGateLab() {
  const id = useId();
  const [failure, setFailure] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const authorized = !failure && confirmed;
  const executed = attempts > 0 && authorized;
  const reset = () => {
    setFailure(false);
    setConfirmed(false);
    setAttempts(0);
  };
  const route = failure
    ? "拒绝：export_secret 不在工具白名单"
    : !confirmed
      ? "等待：尚未确认 set_volume(30)"
      : attempts === 0
        ? "允许：等待提交 R1"
        : attempts === 1
          ? "已执行：音量更新为 30"
          : "重复 R1：返回已有结果，不重复执行";
  return (
    <section
      className={root}
      data-visual-kind="voice-action-authorization-graph"
      aria-labelledby={`${id}-title`}
    >
      <h3 id={`${id}-title`} className="text-lg font-semibold">
        语音动作：模型建议不能直接操作设备
      </h3>
      <p className="mt-2 text-sm text-secondary">
        模拟建议 set_volume(30)。注入模式改成
        export_secret；即使用户确认，也不能越过服务端白名单。没有真实设备或密钥。
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          aria-pressed={failure}
          onClick={() => {
            setFailure(!failure);
            setConfirmed(false);
            setAttempts(0);
          }}
        >
          故障：外部指令注入 {failure ? "开" : "关"}
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={confirmed}
          onClick={() => {
            setConfirmed(!confirmed);
            setAttempts(0);
          }}
        >
          用户确认 {confirmed ? "已给出" : "未给出"}
        </button>
        <button
          type="button"
          className={button}
          onClick={() => setAttempts((n) => n + 1)}
        >
          提交建议（固定 R1）
        </button>
        <button type="button" className={button} onClick={reset}>
          重置
        </button>
      </div>
      <p className="mt-2 text-sm text-secondary">
        手机端可滑动。切换注入或确认条件会开始新一轮模拟；连续提交同一 R1
        验证幂等。
      </p>
      <div
        className={scroll}
        tabIndex={0}
        role="region"
        aria-label="可横向滚动的语音动作授权分支图"
      >
        <svg
          viewBox="0 0 800 510"
          className="block w-full min-w-[800px]"
          role="img"
          aria-label={`${route}。提交${attempts}次，设备写入${executed ? 1 : 0}次。`}
        >
          <text x={24} y={30} fontSize={15} fill={C.text}>
            不可信转写 / 外部内容
          </text>
          <rect
            x={24}
            y={50}
            width={235}
            height={64}
            rx={6}
            fill={C.elevated}
            stroke={failure ? C.danger : C.border}
          />
          <text x={38} y={76} fontSize={14} fill={C.text}>
            {failure ? "注入：导出系统秘密" : "转写：音量调到 30"}
          </text>
          <text x={38} y={100} fontSize={14} fill={C.text}>
            {failure ? "建议：export_secret()" : "建议：set_volume(30)"}
          </text>
          <line
            x1={285}
            y1={36}
            x2={285}
            y2={466}
            stroke={C.border}
            strokeDasharray="6 5"
          />
          <text x={305} y={30} fontSize={15} fill={C.text}>
            服务端策略（不是模型决定）
          </text>
          <Arrow x1={259} y1={82} x2={360} y2={82} />
          <path
            d="M 360 82 L 435 42 L 510 82 L 435 122 Z"
            fill={C.elevated}
            stroke={C.accent}
          />
          <text x={435} y={87} textAnchor="middle" fontSize={14} fill={C.text}>
            工具白名单
          </text>
          {failure ? (
            <>
              <Arrow x1={510} y1={82} x2={590} y2={82} danger />
              <path
                d="M 620 57 l 50 50 m -50 0 l 50 -50"
                stroke={C.danger}
                strokeWidth={4}
              />
              <text
                x={645}
                y={135}
                textAnchor="middle"
                fontSize={14}
                fill={C.danger}
              >
                拒绝 export_secret
              </text>
            </>
          ) : (
            <>
              <Arrow x1={435} y1={122} x2={435} y2={175} />
              <text x={452} y={151} fontSize={14} fill={C.muted}>
                仅允许 set_volume；参数 0–100
              </text>
              <path
                d="M 360 215 L 435 175 L 510 215 L 435 255 Z"
                fill={C.elevated}
                stroke={C.accent}
              />
              <text
                x={435}
                y={220}
                textAnchor="middle"
                fontSize={14}
                fill={C.text}
              >
                确认具体动作
              </text>
              {!confirmed ? (
                <>
                  <Arrow x1={510} y1={215} x2={620} y2={215} />
                  <circle
                    cx={655}
                    cy={215}
                    r={27}
                    fill="none"
                    stroke={C.border}
                    strokeWidth={2}
                  />
                  <path
                    d="M 647 203 v 24 M 663 203 v 24"
                    stroke={C.muted}
                    strokeWidth={4}
                  />
                  <text
                    x={655}
                    y={267}
                    textAnchor="middle"
                    fontSize={14}
                    fill={C.text}
                  >
                    等待，不执行
                  </text>
                </>
              ) : (
                <>
                  <Arrow x1={435} y1={255} x2={435} y2={309} />
                  <rect
                    x={325}
                    y={309}
                    width={220}
                    height={48}
                    rx={6}
                    fill={C.elevated}
                    stroke={C.accent}
                  />
                  <text
                    x={435}
                    y={339}
                    textAnchor="middle"
                    fontSize={14}
                    fill={C.text}
                  >
                    按 R1 查询 / 记录执行结果
                  </text>
                  {executed && attempts === 1 && (
                    <Arrow x1={545} y1={333} x2={610} y2={333} />
                  )}
                </>
              )}
            </>
          )}
          <text x={625} y={309} fontSize={14} fill={C.text}>
            设备音量
          </text>
          <path
            d="M 626 331 h 10 l 16 -13 v 50 l -16 -13 h -10 Z"
            fill={C.elevated}
            stroke={C.text}
          />
          <rect
            x={675}
            y={320}
            width={90}
            height={44}
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x={675}
            y={320}
            width={executed ? 27 : 63}
            height={44}
            fill={C.accent}
          />
          <text x={720} y={390} fontSize={16} textAnchor="middle" fill={C.text}>
            {executed ? 30 : 70} / 100
          </text>
          {executed && attempts > 1 && (
            <>
              <path
                d="M 545 352 C 600 420 300 420 325 354"
                fill="none"
                stroke={C.accent}
                strokeWidth={2}
                strokeDasharray="5 4"
              />
              <text
                x={435}
                y={431}
                fontSize={14}
                textAnchor="middle"
                fill={C.accent}
              >
                重复 R1 命中记录，不走设备写入边
              </text>
            </>
          )}
          <text x={24} y={474} fontSize={15} fill={failure ? C.danger : C.text}>
            {route}
          </text>
          <text x={24} y={499} fontSize={14} fill={C.muted}>
            提交 {attempts} 次 · 设备写入 {executed ? 1 : 0} 次 · 幂等记录{" "}
            {executed ? "R1 → 30" : "空"}
          </text>
        </svg>
      </div>
      <p role="status" className="mt-3 text-sm">
        {route}。设备写入 {executed ? 1 : 0} 次，当前音量 {executed ? 30 : 70}。
        {failure
          ? "修法：拒绝未授权工具，恢复正常建议后重新确认；不是加强一句提示就放行。"
          : "参数可解析只是第一关；业务权限与用户确认仍由应用验证。"}
      </p>
    </section>
  );
}
