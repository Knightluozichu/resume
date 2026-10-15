"use client";

import { useState } from "react";
import type { Timeline } from "animejs";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const surface = "var(--bg-elevated)";
const danger = "var(--danger, var(--accent))";
const control =
  "min-h-11 min-w-11 rounded-control border border-border bg-[var(--bg-elevated)] px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const lab =
  "not-prose my-6 rounded-card border border-border p-3 sm:p-5 text-primary [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[420px] [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_select]:max-w-full [&_input]:max-w-full [&_.items-center]:flex-wrap";
const seamSteps = [
  { label: "输入" },
  { label: "形状适配" },
  { label: "执行路径" },
  { label: "结果校验" },
];
const evidenceSteps = [
  { label: "候选材料" },
  { label: "边界筛选" },
  { label: "预算装箱" },
  { label: "结论支持" },
];
const effectSteps = [
  { label: "接纳事件" },
  { label: "动作提案" },
  { label: "权限审批" },
  { label: "本地写入" },
  { label: "业务回执" },
  { label: "重复与观测" },
];
function beats(timeline: Timeline, steps: readonly { label: string }[]) {
  steps.forEach(({ label }, i) => {
    timeline.label(label, i * 700);
    timeline.add({ beat: 0 }, { beat: 1, duration: 700 }, i * 700);
  });
}

/** Compatibility export name only: this lab models typed input seams, not a release contract. */
export function LcpOfficialFinalReviewVersionContractLab() {
  const [route, setRoute] = useState("v1");
  const [bypass, setBypass] = useState(false);
  const [question, setQuestion] = useState("退货期限？");
  const timeline = useTeachingTimeline({
    steps: seamSteps,
    build: (t) => beats(t, seamSteps),
  });
  const step = timeline.currentStep;
  const modern = route === "v1";
  const broken = modern && bypass;
  const x = modern ? 232 : 98;
  const packetY = broken && step > 0 ? 155 : [66, 184, 327, 448][step];
  const reset = () => {
    timeline.pause();
    timeline.goToStep(0);
    setRoute("v1");
    setBypass(false);
    setQuestion("退货期限？");
  };
  return (
    <section
      className={lab}
      data-unit-id="finalReview"
      data-visual-kind="langchain-review-interface-seams"
      data-step={step}
      data-fault={broken}
      aria-label="实验一：接口与状态接缝"
    >
      <h4 className="text-lg font-semibold">
        实验一 · 数据形状在哪里第一次不相容？
      </h4>
      <p className="text-sm text-secondary">
        离线结构示意，不调用 SDK。classic 是迁移包路径，非 2024
        环境复现；消息仅为教学简图，不是完整消息或工具调用 schema。
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3">
        <label className="grid gap-1 text-sm">
          目标路径
          <select
            aria-label="目标路径"
            className={control}
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          >
            <option value="v1">现代 v1</option>
            <option value="classic">classic 旧式链</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          输入问题
          <input
            className={control}
            aria-label="输入问题"
            maxLength={14}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <button
          className={control}
          aria-pressed={bypass}
          disabled={!modern}
          onClick={() => setBypass(!bypass)}
        >
          {bypass ? "恢复适配器" : "旁路适配器"}
        </button>
      </div>
      <svg
        viewBox="0 0 330 505"
        role="img"
        fontSize="16"
        fill={ink}
        aria-label={`输入${question || "空问题"}；目标${route}，${broken ? "旧键接入messages端口失败" : "保留来源ID后适配"}；第${step + 1}步`}
      >
        <text x="12" y="22">
          同一业务意图 + 来源 A2
        </text>
        <path
          d={`M165 92 V112 H${x} V145`}
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        <text x="12" y="57">
          input / history / source_ids
        </text>
        <text x="12" y="82">
          {question || "（空问题）"}
        </text>
        <path d="M16 94 H314" stroke={border} />
        <text x="18" y="137">
          classic
        </text>
        <text x="214" y="137">
          v1
        </text>
        {modern ? (
          <g>
            <path
              d={
                broken
                  ? "M232 145 V159 M222 166 L242 186 M242 166 L222 186"
                  : "M232 145 V165 H178 V251 H232 V275"
              }
              fill="none"
              stroke={broken ? danger : accent}
              strokeWidth="3"
            />
            {broken ? (
              <text x="12" y="220" fill={danger}>
                断口：没有 messages 列表
              </text>
            ) : (
              <g>
                {[
                  "user：上轮问题",
                  "assistant：上轮答复",
                  "user：本轮问题",
                ].map((s, i) => (
                  <g key={s}>
                    <rect
                      x="20"
                      y={163 + i * 28}
                      width="240"
                      height="26"
                      rx="4"
                      fill={surface}
                      stroke={border}
                    />
                    <text x="27" y={182 + i * 28}>
                      {s}
                    </text>
                  </g>
                ))}
              </g>
            )}
            <path
              d="M205 289 A34 34 0 1 1 205 353"
              fill="none"
              stroke={broken ? border : accent}
              strokeWidth="3"
            />
            <text x="26" y="308">
              模型 ↔ 工具
            </text>
            <text x="26" y="336">
              消息 / tool_call_id
            </text>
            <path
              d="M232 359 V385 H289 V277 H267"
              fill="none"
              stroke={border}
              strokeDasharray="5 4"
            />
            <text x="20" y="390">
              thread → 检查点
            </text>
          </g>
        ) : (
          <g>
            <path
              d="M98 145 V159 H17 V270 H278 V370 H98"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <text x="32" y="188">
              input → 提示变量
            </text>
            <text x="32" y="218">
              history → 历史槽
            </text>
            <text x="32" y="249">
              source_ids → 保留
            </text>
            <path
              d="M98 290 H265 V354 H98"
              fill="none"
              stroke={border}
              strokeDasharray="5 4"
            />
            <text x="26" y="316">
              旧链执行
            </text>
            <text x="26" y="343">
              load / save 钩子
            </text>
            <text x="20" y="390">
              迁移需重测状态语义
            </text>
          </g>
        )}
        <path
          d={`M${x} 400 V413 H306 V471 H165`}
          fill="none"
          stroke={broken ? border : accent}
          strokeWidth="3"
          strokeDasharray={broken ? "4 5" : undefined}
        />
        <text x="12" y="448">
          结果：语法 → 类型 → 业务
        </text>
        <text x="12" y="495">
          {broken ? "执行尚未发生，先修输入" : "引用 A2 不等于结论已获支持"}
        </text>
        <circle
          cx={step === 0 || step === 3 ? 311 : x}
          cy={packetY}
          r="7"
          fill={broken ? danger : accent}
          data-packet="input"
        />
      </svg>
      <p className="text-sm" aria-live="polite">
        {broken
          ? "首次分岔：输入适配。即使换模型、调温度或扩大检索，也不能把旧键自动变成角色消息。"
          : modern
            ? "消息进入执行回路；检查点按 thread 保存状态，不等于跨线程用户记忆。"
            : "保留旧键只解决接口形状；classic 不是原书依赖锁，也不保证旧记忆行为不变。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "全部重置", onClick: reset }}
      />
    </section>
  );
}

type Material = {
  id: string;
  owner: string;
  version: number;
  units: number;
  days: number | null;
};
const materials: Material[] = [
  { id: "B2", owner: "B", version: 2, units: 8, days: 30 },
  { id: "A1", owner: "A", version: 1, units: 8, days: 30 },
  { id: "A2", owner: "A", version: 2, units: 8, days: 7 },
  { id: "R2", owner: "A", version: 2, units: 4, days: null },
  { id: "X2", owner: "A", version: 2, units: 4, days: null },
];

/** Source intervals become context geometry; filters are explicit fixture policies. */
export function LcpOfficialFinalReviewRunnableTraceLab() {
  const [budget, setBudget] = useState(12);
  const [fault, setFault] = useState("none");
  const [claim, setClaim] = useState(7);
  const timeline = useTeachingTimeline({
    steps: evidenceSteps,
    build: (t) => beats(t, evidenceSteps),
  });
  const step = timeline.currentStep;
  const eligible = materials.filter(
    (m) =>
      (m.owner === "A" || fault === "owner") &&
      (m.version === 2 || fault === "version") &&
      m.id !== "X2",
  );
  const packed = eligible.reduce<Material[]>((kept, m) => {
    const occupied = kept.reduce((sum, item) => sum + item.units, 0);
    return occupied + m.units <= budget ? [...kept, m] : kept;
  }, []);
  const used = packed.reduce((sum, item) => sum + item.units, 0);
  const supported = packed.some((m) => m.days === claim);
  const safe = fault === "none";
  const reset = () => {
    timeline.pause();
    timeline.goToStep(0);
    setBudget(12);
    setFault("none");
    setClaim(7);
  };
  return (
    <section
      className={lab}
      data-unit-id="finalReview"
      data-visual-kind="langchain-review-evidence-packing"
      data-step={step}
      data-fault={fault}
      data-packed={packed.map((m) => m.id).join(",")}
      aria-label="实验二：证据筛选与装箱"
    >
      <h4 className="text-lg font-semibold">实验二 · 哪些材料真正进入回答？</h4>
      <p className="text-sm text-secondary">
        固定排序 B2、A1、A2、R2、X2；长度为教学单位，不是供应商 token。X2
        是已标注的注入样本，不是通用检测器。
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3">
        <label className="grid gap-1 text-sm">
          材料预算：{budget}
          <input
            aria-label="材料预算"
            className="w-40"
            type="range"
            min="8"
            max="16"
            step="4"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          筛选故障
          <select
            aria-label="筛选故障"
            className={control}
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          >
            <option value="none">正常筛选</option>
            <option value="version">忽略版本</option>
            <option value="owner">忽略租户</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={claim === 30}
          onClick={() => setClaim(claim === 7 ? 30 : 7)}
        >
          结论：{claim} 天（切换）
        </button>
      </div>
      <svg
        viewBox="0 0 330 555"
        role="img"
        fontSize="16"
        fill={ink}
        aria-label={`预算${budget}；装入${packed.map((m) => m.id).join("、")}；结论${claim}天${supported ? "有样本支持" : "无支持"}；${safe ? "边界正常" : "边界被绕过"}`}
      >
        <text x="12" y="22">
          候选：来源 / 租户 / 版本 / 长度
        </text>
        {materials.map((m, i) => {
          const y = 40 + i * 49;
          const accepted = eligible.includes(m);
          return (
            <g key={m.id} opacity={step > 0 && !accepted ? 0.55 : 1}>
              <rect
                x="14"
                y={y}
                width={m.units * 27}
                height="29"
                rx="3"
                fill={surface}
                stroke={step > 0 && accepted ? accent : border}
                strokeWidth="2"
              />
              <text x="21" y={y + 21}>
                {m.id} / {m.owner} / v{m.version} / {m.units}
              </text>
              {step > 0 && !accepted && (
                <path
                  d={`M248 ${y + 3} L269 ${y + 25} M269 ${y + 3} L248 ${y + 25}`}
                  stroke={danger}
                  strokeWidth="2"
                />
              )}
              {step > 0 && accepted && (
                <path
                  d={`M248 ${y + 14} h37 l-8 -6 m8 6 l-8 6`}
                  stroke={accent}
                  fill="none"
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
        <text x="12" y="308">
          {safe
            ? "只留 A / v2；隔离 X2"
            : fault === "owner"
              ? "租户断口：B2 越界"
              : "版本断口：A1 已过时"}
        </text>
        <path
          d="M293 54 V324 H16 V339"
          fill="none"
          stroke={border}
          strokeDasharray="4 5"
        />
        <text x="12" y="361">
          上下文容量：{budget} 单位
        </text>
        <rect
          x="14"
          y="377"
          width={budget * 18}
          height="42"
          fill="none"
          stroke={ink}
          strokeWidth="2"
        />
        {step >= 2 &&
          packed.map((m, i) => {
            const start = packed
              .slice(0, i)
              .reduce((sum, item) => sum + item.units, 0);
            return (
              <g key={m.id}>
                <rect
                  x={14 + start * 18}
                  y="377"
                  width={m.units * 18}
                  height="42"
                  fill={surface}
                  stroke={accent}
                  strokeWidth="2"
                />
                <text x={22 + start * 18} y="404">
                  {m.id}
                </text>
              </g>
            );
          })}
        <path d="M14 432 H302" stroke={border} />
        <text x="12" y="457">
          余量：{step >= 2 ? budget - used : budget}；结论：{claim} 天
        </text>
        {step === 3 && (
          <g>
            <path
              d={
                supported
                  ? "M158 422 H310 V475 H165 V487"
                  : "M158 422 H310 V470 M300 477 L320 497 M320 477 L300 497"
              }
              stroke={supported && safe ? accent : danger}
              strokeWidth="3"
              fill="none"
            />
            <text x="12" y="527" fill={supported && safe ? ink : danger}>
              {!supported
                ? "没有材料支持该天数"
                : safe
                  ? "A2 支持 7 天"
                  : "文字有支持，来源边界失败"}
            </text>
          </g>
        )}
        <circle cx="311" cy={[45, 306, 396, 516][step]} r="6" fill={accent} />
      </svg>
      <p className="text-sm" aria-live="polite">
        装入 {packed.map((m) => m.id).join(" + ")}，共 {used} 单位。
        {!safe
          ? "必须先修边界，不能把旧版或他人材料当成合法支持。"
          : supported
            ? "支持仅限样本中的期限事实，R2 的收据不新增期限。"
            : "引用来源 ID 并不能支持材料没说过的 30 天。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "全部重置", onClick: reset }}
      />
    </section>
  );
}

/** A pure local replay: no network, ledger persistence or real agent execution. */
export function LcpOfficialFinalReviewReleaseGateLab() {
  const [permission, setPermission] = useState(false);
  const [approval, setApproval] = useState(false);
  const [fault, setFault] = useState("none");
  const [event, setEvent] = useState("E1");
  const timeline = useTeachingTimeline({
    steps: effectSteps,
    build: (t) => beats(t, effectSteps),
  });
  const step = timeline.currentStep;
  const allowed = permission && approval && Boolean(event.trim());
  const written = step >= 3 && allowed;
  const received = step >= 4 && written && fault !== "receipt";
  const reset = () => {
    timeline.pause();
    timeline.goToStep(0);
    setPermission(false);
    setApproval(false);
    setFault("none");
    setEvent("E1");
  };
  return (
    <section
      className={lab}
      data-unit-id="finalReview"
      data-visual-kind="langchain-review-effect-receipts"
      data-step={step}
      data-fault={fault}
      data-effects={written ? 1 : 0}
      data-receipt={received}
      aria-label="实验三：权限审批与副作用回执"
    >
      <h4 className="text-lg font-semibold">
        实验三 · 批准了什么，实际做了什么？
      </h4>
      <p className="text-sm text-secondary">
        纯本地状态重放：提案固定为向 A 的账本写入
        42。审批只绑定这个动作；不代表审批其他金额。不是真实
        Slack、模型或远程工具。
      </p>
      <div className="my-3 flex flex-wrap items-center gap-3">
        <label className="grid gap-1 text-sm">
          事件键
          <input
            aria-label="事件键"
            className={control}
            maxLength={10}
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
        </label>
        <button
          className={control}
          aria-pressed={permission}
          onClick={() => setPermission(!permission)}
        >
          写权限：{permission ? "有" : "无"}
        </button>
        <button
          className={control}
          aria-pressed={approval}
          onClick={() => setApproval(!approval)}
        >
          A / 42 审批：{approval ? "同意" : "未批"}
        </button>
        <label className="grid gap-1 text-sm">
          运行故障
          <select
            aria-label="运行故障"
            className={control}
            value={fault}
            onChange={(e) => setFault(e.target.value)}
          >
            <option value="none">正常</option>
            <option value="duplicate">重复同一事件</option>
            <option value="receipt">丢失业务回执</option>
            <option value="logs">观测导出失败</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 330 580"
        role="img"
        fontSize="16"
        fill={ink}
        aria-label={`事件${event || "空键"}；${allowed ? "通道打开" : "阻断写入"}；本地效果${written ? 1 : 0}次；${received ? "收到业务回执" : written ? "效果已发生但调用方未知" : "未执行"}`}
      >
        <text x="12" y="23">
          接纳：{event || "（空键）"} / 用户 A
        </text>
        <path d="M75 40 V88" stroke={accent} strokeWidth="3" />
        <text x="12" y="113">
          提案：write(A, 42)
        </text>
        <path d="M75 126 V172" stroke={accent} strokeWidth="3" />
        <text x="142" y="155">
          执行前检查
        </text>
        <path d="M25 184 H125 M75 172 V259" stroke={border} strokeWidth="3" />
        <path
          d={
            allowed
              ? "M27 183 L38 150 M123 183 L112 150"
              : "M27 184 L75 224 L123 184"
          }
          fill="none"
          stroke={allowed ? accent : danger}
          strokeWidth="5"
        />
        <text x="142" y="200">
          权限 {permission ? "✓" : "×"}
        </text>
        <text x="142" y="228">
          审批 {approval ? "✓" : "×"}
        </text>
        <text x="12" y="280">
          {allowed ? "闸口打开：仅 A / 42" : "闸口关闭：不执行"}
        </text>
        <path
          d="M75 294 V326"
          stroke={allowed ? accent : border}
          strokeWidth="3"
          strokeDasharray={allowed ? undefined : "4 5"}
        />
        <path
          d="M16 337 H160 V431 H16 Z M16 364 H160 M16 397 H160 M58 337 V431"
          fill={surface}
          stroke={border}
          strokeWidth="2"
        />
        <text x="23" y="357">
          序
        </text>
        <text x="67" y="357">
          本地账本
        </text>
        <text x="23" y="389">
          1
        </text>
        <text x="67" y="389">
          {written ? "A / 42" : "空"}
        </text>
        <text x="23" y="422">
          2
        </text>
        <text x="67" y="422">
          空
        </text>
        <path
          d="M177 398 H294 V310"
          fill="none"
          stroke={received ? accent : border}
          strokeWidth="3"
          strokeDasharray={received ? undefined : "5 5"}
        />
        <text x="186" y="293">
          业务回执
        </text>
        {fault === "receipt" && written && (
          <path
            d="M279 341 L308 367 M308 341 L279 367"
            stroke={danger}
            strokeWidth="3"
          />
        )}
        <path
          d="M126 94 H308 V463 H180"
          fill="none"
          stroke={step === 5 && fault === "logs" ? danger : muted}
          strokeDasharray="3 6"
        />
        <text x="12" y="488">
          旁路观测：
          {step === 5 && fault === "logs" ? "导出失败" : "不决定业务成功"}
        </text>
        {step === 5 && fault === "duplicate" && (
          <path
            d="M24 37 H8 V445 H162 V413"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        )}
        <text x="12" y="524">
          {step === 5 && fault === "duplicate"
            ? "同键返回既有结果；不再写一次"
            : `账本效果：${written ? "1 次" : "0 次"}`}
        </text>
        <text x="12" y="562" fill={written && !received ? danger : ink}>
          {received
            ? "回执与效果一致"
            : written
              ? "调用方未知：查账，不盲重试"
              : !event.trim()
                ? "空事件键：保持零效果"
                : "无权限或未批时保持零效果"}
        </text>
        <circle
          cx={step < 3 ? 75 : 170}
          cy={[43, 132, 252, 385, 331, 461][step]}
          r="7"
          fill={allowed || step < 2 ? accent : danger}
        />
      </svg>
      <p className="text-sm" aria-live="polite">
        {written && !received
          ? "图中可见账本已写，但调用方没有回执；这是测试观察者视角，不能让调用方凭空知道成功。"
          : received
            ? "业务回执存在。日志导出可独立失败；重复接纳不应新增业务效果。"
            : "模型即便提出合法形状的工具参数，也不能自行创造写权限或人工审批。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "全部重置", onClick: reset }}
      />
    </section>
  );
}
