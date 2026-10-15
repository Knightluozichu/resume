"use client";

import { useCallback, useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const paper = "var(--bg)";
const agentSteps = [
  { label: "提议", caption: "模型输出候选" },
  { label: "登记", caption: "登记待处理调用" },
  { label: "调度", caption: "执行前检查" },
  { label: "回包", caption: "收集工具结果" },
  { label: "核对", caption: "按标识核对或止损" },
  { label: "结束", caption: "记录停止原因" },
] as const;

const permissionSteps = [
  { label: "候选", caption: "只接受动作提议，尚未执行" },
  { label: "校验", caption: "验证金额类型与范围" },
  { label: "授权", caption: "从可信身份检查写入权限" },
  { label: "审批", caption: "未批准则挂起，拒绝则终止" },
  { label: "执行", caption: "全部放行后才写入本地账本" },
  { label: "收尾", caption: "检查写入次数及阻断原因" },
] as const;
const multimodalSteps = [
  { label: "拆分", caption: "同一消息拆成三种内容块" },
  { label: "附件", caption: "检查 MIME 与大小" },
  { label: "路由", caption: "按能力选择原生模型或工具" },
  { label: "计算", caption: "本地工具统计像素和峰值" },
  { label: "回填", caption: "结果与调用标识配对" },
  { label: "下一轮", caption: "准备好输入，不伪造模型推理" },
] as const;

function useAgentClock(steps: readonly TeachingStep[]) {
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 900);
        tl.add(clock, { beat: i + 1, duration: 900, ease: "linear" }, i * 900);
      });
    },
    [steps],
  );
  return useTeachingTimeline({ steps, build });
}

function Lab({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="agent-lab not-prose my-8 rounded-xl border border-border p-3 sm:p-5"
      data-agent-lab={id}
      data-visual-kind={`lcp06-${id}`}
      aria-label={title}
    >
      <h4 className="mb-2 text-lg font-semibold text-primary">{title}</h4>
      <p className="mb-4 text-sm text-secondary">
        确定性本地模拟 · 无真实 LLM、无外部工具请求
      </p>
      {children}
      <style>{`
        .agent-lab { min-width:0; color:var(--text-primary); }
        .agent-lab svg { display:block; width:100%; max-width:440px; height:auto; margin:12px auto; }
        .agent-lab svg text { font-family:ui-monospace,system-ui,sans-serif; font-size:16px; fill:var(--text-primary); }
        .agent-lab button,.agent-lab select,.agent-lab input { min-width:44px; min-height:44px; }
        .agent-lab select { width:100%; border:1px solid var(--border); border-radius:6px; padding:8px; background:var(--bg); color:var(--text-primary); }
        .agent-lab label { display:block; margin:12px 0; font-size:14px; }
        .agent-lab button { white-space:normal; }
        .agent-lab button:focus-visible,.agent-lab select:focus-visible,.agent-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
        .agent-lab input[type=range] { height:44px; }
        .agent-lab .mt-4.flex { flex-wrap:wrap; }
        .agent-lab output { display:block; overflow-wrap:anywhere; font-size:14px; line-height:1.7; }
      `}</style>
    </section>
  );
}

function Line({
  d,
  active = false,
  dashed = false,
}: {
  d: string;
  active?: boolean;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={active ? accent : border}
      strokeWidth={active ? 4 : 2}
      strokeDasharray={dashed ? "6 5" : undefined}
    />
  );
}

// Old export names are registry ABI only: these are not version/release-gate diagrams.
export function Lcp06AgentsVersionContractLab() {
  const tl = useAgentClock(agentSteps);
  const [mode, setMode] = useState("matched");
  const stage = tl.currentStep;
  const failure = ["wrong", "reuse", "missing", "budget"].includes(mode);
  const ended = stage === 5;
  const stopped = stage >= 4 && failure;
  const reason =
    mode === "wrong"
      ? "未知 call_id：协议错误"
      : mode === "reuse"
        ? "同 ID 重提：拒绝执行"
        : mode === "missing"
          ? "无结果：超时止损"
          : mode === "budget"
            ? "调用预算不足：不调度"
            : "最终答案：不再调用工具";
  const ids =
    mode === "duplicate"
      ? ["c1", "c3"]
      : mode === "reuse"
        ? ["c1", "c1"]
        : ["c1", "c2"];
  const results =
    mode === "wrong"
      ? ["c2", "c9"]
      : mode === "duplicate"
        ? ["c3", "c1"]
        : ["c2", "c1"];
  const dispatched = stage >= 2 && !["reuse", "budget"].includes(mode);
  const executed = dispatched ? (mode === "duplicate" ? 1 : 2) : 0;
  const received = stage >= 3 && dispatched && mode !== "missing";
  const node = ended || stopped ? 3 : stage === 0 ? 0 : stage <= 2 ? 1 : 2;
  const points = [
    [78, 56],
    [258, 56],
    [258, 162],
    [78, 162],
  ];
  const reset = () => {
    tl.goToStep(0);
    setMode("matched");
  };
  return (
    <Lab id="state" title="实验 1 · 调用标识与代理状态机">
      <label>
        轨迹样本
        <select
          aria-label="轨迹样本"
          value={mode}
          onChange={(e) => {
            tl.goToStep(0);
            setMode(e.target.value);
          }}
        >
          <option value="matched">两工具乱序返回，按 ID 匹配</option>
          <option value="wrong">故障：返回未知 c9</option>
          <option value="reuse">故障：重复使用调用 ID</option>
          <option value="duplicate">重复参数、新 ID：复用缓存</option>
          <option value="missing">故障：工具无结果（模拟超时）</option>
          <option value="budget">故障：只剩 1 次调用预算</option>
        </select>
      </label>
      <svg
        viewBox="0 0 340 420"
        role="img"
        aria-label="模型到工具到核对的有向状态机；下方两组调用与结果按标识连线，错标识断线"
        data-stage={stage}
        data-executed={executed}
      >
        <Line d="M110 56H224 M258 88V130 M226 162H110 M78 130V88" active />
        <path
          d="M216 50l8 6 -8 6 M252 122l6 8 6 -8 M118 156l-8 6 8 6 M72 96l6 -8 6 8"
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        <Line
          d="M235 136Q163 83 105 77"
          active={stage === 4 && !failure}
          dashed
        />
        <text x="155" y="107" textAnchor="middle">
          回到模型
        </text>
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={32}
              fill={paper}
              stroke={i === node ? accent : border}
              strokeWidth={i === node ? 5 : 2}
            />
            <text x={x} y={y + 6} textAnchor="middle">
              {["模型", "工具", "核对", "停止"][i]}
            </text>
          </g>
        ))}
        <circle
          cx={points[node][0] + 29}
          cy={points[node][1] - 25}
          r="7"
          fill={accent}
        />
        <text x="12" y="222">
          待处理调用
        </text>
        {ids.map((id, i) => (
          <g key={i}>
            <rect
              x={38 + i * 176}
              y="235"
              width="88"
              height="40"
              rx="12"
              fill={paper}
              stroke={stage >= 1 ? accent : border}
            />
            <text x={82 + i * 176} y="261" textAnchor="middle">
              {stage >= 1 ? id : "待生成"}
            </text>
          </g>
        ))}
        {received &&
          ids.map((id, i) => {
            const target = results.indexOf(id);
            return target < 0 ? (
              <g key={i}>
                <Line
                  d={`M${82 + i * 176} 276v27h${i === 0 ? -22 : 22}`}
                  active
                  dashed
                />
                <text
                  data-unmatched-label={id}
                  x={i === 0 ? 12 : 328}
                  y="328"
                  textAnchor={i === 0 ? "start" : "end"}
                >
                  未匹配
                </text>
              </g>
            ) : (
              <g key={i} data-result-link={id}>
                <Line
                  d={`M${82 + i * 176} 276C${82 + i * 176} 308 ${82 + target * 176} 322 ${82 + target * 176} 353`}
                  active
                />
              </g>
            );
          })}
        <text x="12" y="344">
          {received ? "" : "尚无可匹配结果"}
        </text>
        {results.map((id, i) => (
          <g key={i}>
            <rect
              x={38 + i * 176}
              y="354"
              width="88"
              height="40"
              rx="4"
              fill={paper}
              stroke={received ? accent : border}
            />
            <text x={82 + i * 176} y="380" textAnchor="middle">
              {received ? id : "—"}
            </text>
          </g>
        ))}
        <text x="170" y="417" textAnchor="middle">
          结果返回顺序 ≠ 调用顺序
        </text>
      </svg>
      <output aria-live="polite">
        阶段 {stage + 1}/6 · 实际本地执行 {executed} 次 · 缓存命中{" "}
        {mode === "duplicate" && dispatched ? 1 : 0} 次。
        {stage >= 4 ? reason : "尚未结束；模型只提议，宿主负责执行与校验。"}
        {mode === "missing" && stopped
          ? " 不把空缺伪装为成功 ToolMessage。"
          : ""}
      </output>
      <TimelineControls
        timeline={tl}
        caption={agentSteps[stage].caption}
        reset={{ label: "完全重置", onClick: reset }}
      />
    </Lab>
  );
}

type WriteRequest = { amount: unknown; scope: string };
function inspectWrite(request: WriteRequest, decision: string, stage: number) {
  const schema =
    typeof request.amount === "number" &&
    Number.isInteger(request.amount) &&
    request.amount > 0 &&
    request.amount <= 100;
  const authorized = schema && request.scope === "invoice:write";
  const approved = authorized && decision === "approve";
  // Replaying a teaching frame runs this local executor from an empty ledger.
  // No effect is emitted before every guard. Approval binds this exact snapshot.
  const effects: { invoice: string; amount: unknown }[] = [];
  const snapshot = JSON.stringify({
    invoice: "INV-42",
    amount: request.amount,
  });
  const approval = JSON.stringify({ invoice: "INV-42", amount: 42 });
  if (stage >= 4 && schema && authorized && approved && snapshot === approval) {
    effects.push({ invoice: "INV-42", amount: request.amount });
  }
  return { schema, authorized, approved, effects };
}

export function Lcp06AgentsRunnableTraceLab() {
  const tl = useAgentClock(permissionSteps);
  const [sample, setSample] = useState("valid");
  const [decision, setDecision] = useState("pending");
  const stage = tl.currentStep;
  const request = {
    amount: sample === "invalid" ? "42" : 42,
    scope: sample === "denied" ? "invoice:read" : "invoice:write",
  };
  const state = inspectWrite(request, decision, stage);
  const passed = [
    stage >= 1 && state.schema,
    stage >= 2 && state.authorized,
    stage >= 3 && state.approved,
  ];
  const gates = [96, 182, 268];
  const frontier = !passed[0]
    ? 96
    : !passed[1]
      ? 182
      : !passed[2]
        ? 268
        : stage >= 4
          ? 362
          : 305;
  const reset = () => {
    tl.goToStep(0);
    setSample("valid");
    setDecision("pending");
  };
  return (
    <Lab id="permission" title="实验 2 · 副作用之前的三道阻断">
      <label>
        请求样本
        <select
          aria-label="请求样本"
          value={sample}
          onChange={(e) => {
            tl.goToStep(0);
            setSample(e.target.value);
            setDecision("pending");
          }}
        >
          <option value="valid">金额 42，拥有 invoice:write</option>
          <option value="invalid">
            schema 错误：金额字符串 &quot;42&quot;
          </option>
          <option value="denied">权限错误：只有 invoice:read</option>
        </select>
      </label>
      <label>
        人工决定（仅绑定 INV-42 / 金额42）
        <select
          aria-label="人工决定"
          value={decision}
          onChange={(e) => {
            tl.goToStep(0);
            setDecision(e.target.value);
          }}
        >
          <option value="pending">等待：不产生副作用</option>
          <option value="reject">拒绝：终止这次请求</option>
          <option value="approve">批准当前精确参数</option>
        </select>
      </label>
      <svg
        viewBox="0 0 340 420"
        role="img"
        aria-label="参数校验、最小权限、人工批准三道串联阀门；未通过则下游无流量，本地账本为零"
        data-stage={stage}
        data-effects={state.effects.length}
      >
        <text x="170" y="24" textAnchor="middle">
          候选写入：INV-42 / 42
        </text>
        <path
          d="M110 44V350H230V44"
          fill="none"
          stroke={border}
          strokeWidth="3"
        />
        <path
          d={`M170 44V${frontier}`}
          stroke={accent}
          strokeWidth="8"
          fill="none"
        />
        {gates.map((y, i) => (
          <g key={i}>
            <circle cx="110" cy={y} r="6" fill={muted} />
            <path
              d={passed[i] ? `M110 ${y}l22 -25` : `M110 ${y}H230`}
              stroke={passed[i] ? accent : ink}
              strokeWidth="7"
            />
            <rect x="79" y={y - 53} width="182" height="26" fill={paper} />
            <text x="170" y={y - 35} textAnchor="middle">
              {["1 参数 schema", "2 权限 allowlist", "3 人工批准"][i]}
            </text>
            <rect x="119" y={y + 9} width="102" height="26" fill={paper} />
            <text x="170" y={y + 28} textAnchor="middle">
              {passed[i]
                ? "已放行"
                : stage <= i
                  ? "待检查"
                  : i === 2 && decision === "pending" && state.authorized
                    ? "挂起等待"
                    : "阻断"}
            </text>
          </g>
        ))}
        <path
          d="M85 351H255V407H85Z"
          fill={paper}
          stroke={ink}
          strokeWidth="2"
        />
        {state.effects.length > 0 && (
          <path d="M88 386H252V404H88Z" fill={accent} opacity="0.35" />
        )}
        <text x="170" y="377" textAnchor="middle">
          本地副作用账本
        </text>
        <text x="170" y="400" textAnchor="middle">
          写入 {state.effects.length} 次
        </text>
      </svg>
      <output aria-live="polite">
        阶段 {stage + 1}/6 · schema {state.schema ? "合法" : "拒绝"} · 权限{" "}
        {state.authorized ? "满足" : "不满足"} · 人工 {decision} · 副作用{" "}
        {state.effects.length}。
        {stage >= 3 && state.authorized && decision === "pending"
          ? "此处暂停业务，不是自动批准；播放教学帧也不会绕过闸门。"
          : "编辑参数后应重新校验和批准；这不是现实支付系统。"}
      </output>
      <TimelineControls
        timeline={tl}
        caption={permissionSteps[stage].caption}
        reset={{ label: "完全重置", onClick: reset }}
      />
    </Lab>
  );
}

const pixels = [0, 0, 255, 255, 0, 255, 0, 255, 255, 0, 255, 0, 255, 255, 0, 0];
const samples = [0, 0.25, -0.5, 0.75, -1, 0.5, -0.25, 0];
const darkPixels = pixels.filter((pixel) => pixel < 128).length;
const audioPeak = Math.max(...samples.map(Math.abs));

export function Lcp06AgentsReleaseGateLab() {
  const tl = useAgentClock(multimodalSteps);
  const [attachment, setAttachment] = useState("valid");
  const [imageRoute, setImageRoute] = useState("tool");
  const stage = tl.currentStep;
  const imageOK = attachment !== "mime";
  const audioOK = attachment !== "large";
  const reset = () => {
    tl.goToStep(0);
    setAttachment("valid");
    setImageRoute("tool");
  };
  return (
    <Lab id="multimodal" title="实验 3 · 内容块、附件与工具结果的去向">
      <label>
        附件校验
        <select
          aria-label="附件校验"
          value={attachment}
          onChange={(e) => {
            tl.goToStep(0);
            setAttachment(e.target.value);
          }}
        >
          <option value="valid">有效：灰度图 16 B，音频 32 B</option>
          <option value="mime">故障：图像 MIME 为 application/zip</option>
          <option value="large">故障：音频超出本地 64 B 限额</option>
        </select>
      </label>
      <label>
        图片处理能力
        <select
          aria-label="图片处理能力"
          value={imageRoute}
          onChange={(e) => {
            tl.goToStep(0);
            setImageRoute(e.target.value);
          }}
        >
          <option value="tool">无视觉能力：像素统计工具</option>
          <option value="native">有视觉能力：直接送模型（不推理）</option>
        </select>
      </label>
      <svg
        viewBox="0 0 340 440"
        role="img"
        aria-label="同一消息拆成文本、图片和音频内容块；校验通过的附件进入原生模型或统计工具，结果按各自标识回填"
        data-stage={stage}
        data-image-route={imageRoute}
      >
        <text x="170" y="23" textAnchor="middle">
          一条 user 消息的 content 列表
        </text>
        {["text", "image", "audio"].map((type, i) => (
          <g key={type}>
            <rect
              x={10 + i * 112}
              y="38"
              width="96"
              height="40"
              rx="3"
              fill={paper}
              stroke={accent}
            />
            <text x={58 + i * 112} y="64" textAnchor="middle">
              {type}
            </text>
          </g>
        ))}
        <Line d="M58 78V94H18V320" active={stage >= 1} />
        <text x="58" y="139" textAnchor="middle">
          统计附件
        </text>
        <text x="58" y="166" textAnchor="middle">
          原文保留
        </text>
        <Line d="M170 78V101 M282 78V101" active={stage >= 1} />
        {pixels.map((p, i) => (
          <rect
            key={i}
            x={138 + (i % 4) * 16}
            y={105 + Math.floor(i / 4) * 16}
            width="16"
            height="16"
            fill={p < 128 ? ink : paper}
            stroke={border}
          />
        ))}
        <path
          d={samples
            .map(
              (v, i) => `${i === 0 ? "M" : "L"}${248 + i * 9} ${138 - v * 29}`,
            )
            .join(" ")}
          stroke={accent}
          fill="none"
          strokeWidth="3"
        />
        {[imageOK, audioOK].map((ok, i) => (
          <g key={i}>
            <path
              d={`M${170 + i * 112} 174l20 20 -20 20 -20 -20Z`}
              fill={paper}
              stroke={stage >= 1 && !ok ? ink : accent}
              strokeWidth="2"
            />
            <text x={170 + i * 112} y="200" textAnchor="middle">
              {stage >= 1 ? (ok ? "✓" : "×") : "?"}
            </text>
            {stage >= 1 && !ok && (
              <text x={170 + i * 112} y="243" textAnchor="middle">
                拒收
              </text>
            )}
          </g>
        ))}
        {imageOK &&
          (imageRoute === "tool" ? (
            <Line d="M170 215V276" active={stage >= 2} />
          ) : (
            <Line d="M170 215Q100 230 95 344" active={stage >= 2} dashed />
          ))}
        {audioOK && <Line d="M282 215V276" active={stage >= 2} />}
        {imageRoute === "tool" && imageOK && (
          <g>
            <circle
              cx="170"
              cy="292"
              r="32"
              fill={paper}
              stroke={stage >= 3 ? accent : border}
              strokeWidth="3"
            />
            <text x="170" y="289" textAnchor="middle">
              像素
            </text>
            <text x="170" y="310" textAnchor="middle">
              i1
            </text>
          </g>
        )}
        {audioOK && (
          <g>
            <circle
              cx="282"
              cy="292"
              r="32"
              fill={paper}
              stroke={stage >= 3 ? accent : border}
              strokeWidth="3"
            />
            <text x="282" y="289" textAnchor="middle">
              峰值
            </text>
            <text x="282" y="310" textAnchor="middle">
              a1
            </text>
          </g>
        )}
        <Line d="M18 320Q18 344 110 354" active={stage >= 4} />
        {imageOK && imageRoute === "tool" && (
          <Line d="M170 324V344" active={stage >= 4} />
        )}
        {audioOK && <Line d="M282 324Q282 344 230 354" active={stage >= 4} />}
        <rect
          x="18"
          y="346"
          width="304"
          height="80"
          rx="8"
          stroke={accent}
          fill={paper}
          strokeWidth="2"
        />
        <text x="170" y="369" textAnchor="middle">
          {stage >= 4 ? "模型下一轮输入" : "等待校验与路由"}
        </text>
        <text x="170" y="394" textAnchor="middle">
          {stage >= 4
            ? imageOK
              ? imageRoute === "tool"
                ? `i1: 暗像素 ${darkPixels}/16`
                : "image 块：待模型读取"
              : "image: 拒收，无工具调用"
            : "文本 + 合法附件 / 工具结果"}
        </text>
        <text x="170" y="417" textAnchor="middle">
          {stage >= 4
            ? audioOK
              ? `a1: 峰值 ${audioPeak}（非转写）`
              : "audio: 拒收，无工具调用"
            : "不把文件名当作文件内容"}
        </text>
      </svg>
      <output aria-live="polite">
        阶段 {stage + 1}/6 · 图片{" "}
        {imageOK
          ? imageRoute === "tool"
            ? "统计工具 i1"
            : "原生 image 内容块"
          : "校验拒收"}{" "}
        · 音频 {audioOK ? "峰值工具 a1" : "超额拒收"}
        。工具真实计算本地数组；原生分支只展示消息封装，未调用视觉模型。像素与波形不是图片识别或语音转写。
      </output>
      <TimelineControls
        timeline={tl}
        caption={multimodalSteps[stage].caption}
        reset={{ label: "完全重置", onClick: reset }}
      />
    </Lab>
  );
}
