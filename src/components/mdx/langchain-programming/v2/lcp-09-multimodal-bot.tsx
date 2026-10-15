"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";

// 三个独立领域结构；只是教学模拟，不发请求、不计算真实Slack签名。
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const danger = "var(--danger)";
const bg = "var(--bg)";
const ingressSteps = [
  { label: "bytes", caption: "接收原始字节，不解析" },
  { label: "verify", caption: "时间窗与HMAC先过关" },
  { label: "enqueue", caption: "原子去重并接纳任务" },
  { label: "ack", caption: "确认接收，不是业务成功" },
  { label: "worker", caption: "后台执行并记录结果" },
] as const;
const routingSteps = [
  { label: "event", caption: "已验签的事件仍含不可信内容" },
  { label: "resolve", caption: "以文件ID解析授权元数据" },
  { label: "fetch", caption: "校验来源、地址和下载预算" },
  { label: "blocks", caption: "构造能力允许的内容块" },
] as const;
const recoverySteps = [
  { label: "primary", caption: "主模型调用" },
  { label: "classify", caption: "分类失败，不把拒答当超时" },
  { label: "fallback", caption: "仅可恢复错误使用备选模型" },
  { label: "approve", caption: "所有工具路径共用审批边界" },
  { label: "result", caption: "记录工具结果或安全终止" },
] as const;
function useBotTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((s, i) => {
        const start = i * TEACHING_BEAT_MS;
        tl.label(s.label, start);
        tl.add(
          clock,
          { beat: [i, i + 1], duration: TEACHING_BEAT_MS, ease: "linear" },
          start,
        );
      });
    },
  });
}
function Frame({
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
      data-bot-lab={id}
      data-visual-kind={`lcp09-${id}`}
      aria-label={title}
      className="lcp-bot-lab not-prose my-6 min-w-0 rounded-card border border-border bg-bg p-3 sm:p-5"
    >
      <h4 className="mb-2 text-lg font-semibold text-primary">{title}</h4>
      <p className="mb-3 text-sm text-secondary">
        确定性教学模拟 · 不连接 Slack 或模型服务
      </p>
      {children}
      <style>{`
        .lcp-bot-lab svg { display:block; width:100%; max-width:480px; height:auto; margin:12px auto; }
        .lcp-bot-lab svg text { font-size:17px; fill:var(--text-primary); }
        .lcp-bot-lab button,.lcp-bot-lab select,.lcp-bot-lab input { min-height:44px; min-width:44px; }
        .lcp-bot-lab select { width:100%; max-width:100%; color:var(--text-primary); background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:8px; font-size:14px; }
        .lcp-bot-lab button:focus-visible,.lcp-bot-lab select:focus-visible,.lcp-bot-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
        .lcp-bot-lab .mt-4.flex { flex-wrap:wrap; }
        .lcp-bot-lab ol[aria-hidden=true] { display:none; }
        .lcp-bot-lab p { overflow-wrap:anywhere; }
      `}</style>
    </section>
  );
}
function Controls({
  timeline,
  steps,
  reset,
}: {
  timeline: ReturnType<typeof useBotTimeline>;
  steps: readonly TeachingStep[];
  reset: () => void;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      labelText={Object.fromEntries(
        steps.map((s) => [s.label, s.caption ?? s.label]),
      )}
      reset={{ label: "重置全部", onClick: reset }}
    />
  );
}
function Arrow({
  x1,
  x2,
  y,
  color = accent,
}: {
  x1: number;
  x2: number;
  y: number;
  color?: string;
}) {
  const sign = x2 > x1 ? 1 : -1;
  return (
    <g>
      <line x1={x1} x2={x2} y1={y} y2={y} stroke={color} strokeWidth={3} />
      <path
        d={`M${x2 - sign * 8},${y - 5} L${x2},${y} L${x2 - sign * 8},${y + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
      />
    </g>
  );
}
function Stop({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={danger} strokeWidth={4}>
      <path d={`M${x - 9},${y - 9} l18,18 M${x + 9},${y - 9} l-18,18`} />
    </g>
  );
}

type IngressCase =
  | "normal"
  | "rewrite"
  | "stale"
  | "duplicate"
  | "expired"
  | "challenge";
export function Lcp09MultimodalBotVersionContractLab() {
  const [scenario, setScenario] = useState<IngressCase>("normal");
  const timeline = useBotTimeline(ingressSteps);
  const step = timeline.currentStep;
  const blocked = scenario === "rewrite" || scenario === "stale";
  const challenge = scenario === "challenge";
  const repeated = scenario === "duplicate" || scenario === "expired";
  const jobs =
    step >= 2 && !blocked && !challenge ? (scenario === "expired" ? 2 : 1) : 0;
  const notes: Record<IngressCase, string> = {
    normal:
      "原始 body → 验签 → 一次入队 → 200 ACK → 一次业务处理。队列接纳先于ACK；此图不按真实毫秒比例。",
    rewrite:
      "故障：解析后重编码让字节改变；HMAC不匹配，401，不能继续JSON解析或入队。",
    stale: "故障：即使签名正确，时间差301秒超过本实验±300秒窗；401，不入队。",
    duplicate:
      "两份相同事件在同一锁/事务中竞争；只有一份入队，另一份200确认重复。",
    expired:
      "边界：事件去重TTL届满后再次接纳；两次处理并非exactly-once。副作用仍需业务唯一键。",
    challenge:
      "url_verification也先验证时间窗与原始字节；通过才返回challenge，不入业务队列。",
  };
  return (
    <Frame id="ingress" title="实验A · 原始字节、确认与事件重送">
      <label className="block text-sm">
        投递条件
        <select
          aria-label="投递条件"
          value={scenario}
          onChange={(e) => {
            setScenario(e.target.value as IngressCase);
            timeline.goToStep(0);
          }}
        >
          <option value="normal">正常原始body</option>
          <option value="rewrite">故障：重编码body</option>
          <option value="stale">故障：时间差301秒</option>
          <option value="duplicate">并发：相同事件两份</option>
          <option value="expired">边界：去重TTL届满</option>
          <option value="challenge">URL验证challenge</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 490"
        role="img"
        aria-label={`Slack、入口、队列、worker四泳道；${ingressSteps[step].caption}；队列任务${jobs}个`}
      >
        {[38, 130, 226, 324].map((x, i) => (
          <g key={x}>
            <text x={x} y={24} textAnchor="middle">
              {["Slack", "入口", "队列", "执行"][i]}
            </text>
            <line
              x1={x}
              x2={x}
              y1={38}
              y2={445}
              stroke={border}
              strokeDasharray="5 5"
            />
          </g>
        ))}
        <text x={4} y={66}>
          v0:时间戳:原始body
        </text>
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x={18 + i * 39}
            y={78}
            width={33}
            height={19}
            fill={scenario === "rewrite" && i === 6 ? danger : accent}
            opacity={0.65}
          />
        ))}
        <Arrow x1={38} x2={130} y={122} />
        <text x={45} y={149}>
          raw bytes
        </text>
        {step >= 1 && (
          <g>
            <circle
              cx={130}
              cy={184}
              r={20}
              fill={bg}
              stroke={blocked ? danger : accent}
              strokeWidth={3}
            />
            {blocked ? (
              <Stop x={130} y={184} />
            ) : (
              <path
                d="M119,183 l8,9 l15,-18"
                fill="none"
                stroke={accent}
                strokeWidth={3}
              />
            )}
            <text x={164} y={190}>
              {blocked ? "401 截止" : "先验签"}
            </text>
          </g>
        )}
        {step >= 2 && !blocked && !challenge && (
          <g>
            <Arrow x1={130} x2={226} y={232} />
            <text x={133} y={258}>
              原子接纳
            </text>
            {repeated && (
              <g>
                <path
                  d="M38,163 Q82,170 110,224"
                  stroke={muted}
                  strokeWidth={2}
                  fill="none"
                  strokeDasharray="4 4"
                />
                <text x={4} y={210}>
                  重送
                </text>
              </g>
            )}
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={208 + i * 19}
                y={273}
                width={15}
                height={24}
                fill={i < jobs ? accent : bg}
                stroke={border}
              />
            ))}
          </g>
        )}
        {step >= 3 && !blocked && (
          <g>
            <Arrow x1={130} x2={38} y={324} />
            <text x={50} y={352}>
              {challenge ? "200 challenge" : "200 ACK ≠ 成功"}
            </text>
          </g>
        )}
        {step >= 4 && jobs > 0 && (
          <g>
            <Arrow x1={226} x2={324} y={387} />
            {Array.from({ length: jobs }, (_, i) => (
              <circle key={i} cx={310 + i * 25} cy={419} r={9} fill={accent} />
            ))}
            <text x={149} y={453}>
              业务处理 × {jobs}
            </text>
          </g>
        )}
        <text x={8} y={482}>
          {blocked
            ? "拒绝路径没有解析/队列/执行"
            : challenge
              ? "协议验证 ≠ 业务事件"
              : "时间向下；ACK在业务结束之前"}
        </text>
      </svg>
      <p role="status" className="text-sm text-secondary">
        {notes[scenario]} 当前接纳 {jobs} 个任务；阶段 {step + 1}/5。
      </p>
      <Controls
        timeline={timeline}
        steps={ingressSteps}
        reset={() => {
          timeline.goToStep(0);
          setScenario("normal");
        }}
      />
    </Frame>
  );
}

type RouteCase = "image" | "private" | "redirect" | "audio" | "injection";
export function Lcp09MultimodalBotRunnableTraceLab() {
  const [source, setSource] = useState<RouteCase>("image");
  const timeline = useBotTimeline(routingSteps);
  const step = timeline.currentStep;
  const blocked = source === "private" || source === "redirect";
  const audio = source === "audio";
  const image = !blocked && !audio;
  const notes: Record<RouteCase, string> = {
    image:
      "文件ID → 授权元数据 → 限定HTTPS主机、公开IP、禁重定向、限大小与MIME → 本地字节 → 图片块。不是把任意事件URL直接交给模型。",
    private:
      "私网目标在下载前被挡；文本块仍可保留，附件错误明确显示，不伪称已看过图片。",
    redirect:
      "允许主机返回重定向也不能盲跟；图中在下载边界终止，凭据不得跟向新主机。",
    audio:
      "本实验模型仅支持文本/图片；音频转人工，或另接经授权的转写流程，不能把音频URL冒充图片块。",
    injection:
      "图片中的“忽略审批”只是外来数据；可进入图像分析上下文，却不能进入系统指令或授予工具权限。",
  };
  return (
    <Frame id="routing" title="实验B · 附件路由与信任边界">
      <label className="block text-sm">
        附件输入
        <select
          aria-label="附件输入"
          value={source}
          onChange={(e) => {
            setSource(e.target.value as RouteCase);
            timeline.goToStep(0);
          }}
        >
          <option value="image">授权图片文件ID</option>
          <option value="private">故障：私网地址</option>
          <option value="redirect">故障：跨主机跳转</option>
          <option value="audio">能力边界：音频</option>
          <option value="injection">攻击：图片含越权指令</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 510"
        role="img"
        aria-label={`消息文本与附件分叉路由；${routingSteps[step].caption}；附件${blocked ? "拒绝" : audio ? "转人工" : "图片块"}`}
      >
        <text x={18} y={26}>
          消息文本
        </text>
        <text x={218} y={26}>
          {audio ? "音频ID" : "附件ID"}
        </text>
        <path
          data-route="text-bypass"
          d="M50,40 L50,341 Q50,363 90,365"
          fill="none"
          stroke={accent}
          strokeWidth={3}
        />
        <path d="M260,40 L260,85" fill="none" stroke={accent} strokeWidth={3} />
        {step >= 1 && (
          <g>
            <circle
              cx={260}
              cy={103}
              r={18}
              stroke={accent}
              fill={bg}
              strokeWidth={3}
            />
            <text x={105} y={109}>
              授权元数据
            </text>
            <path d="M260,122 L260,177" stroke={accent} strokeWidth={3} />
          </g>
        )}
        <path
          data-zone="download"
          d="M82,177 H346 V306 H82 Z"
          stroke={border}
          strokeWidth={2}
          strokeDasharray="7 5"
          fill="none"
        />
        <text x={92} y={202}>
          受控下载区
        </text>
        <text x={92} y={232}>
          主机 / IP / 重定向
        </text>
        <text x={92} y={260}>
          类型 / 大小 / 超时
        </text>
        {step >= 2 && (
          <g>
            {blocked ? (
              <>
                <Stop x={280} y={280} />
                <path
                  d="M260,177 L280,266"
                  fill="none"
                  stroke={danger}
                  strokeWidth={3}
                />
              </>
            ) : (
              <path
                d={
                  audio
                    ? "M260,177 L330,320 L330,430"
                    : "M260,177 L260,323 Q260,340 240,340 L200,340 L200,400"
                }
                fill="none"
                stroke={accent}
                strokeWidth={3}
              />
            )}
          </g>
        )}
        {step >= 3 && (
          <g>
            <rect
              x={86}
              y={350}
              width={204}
              height={42}
              rx={4}
              fill={bg}
              stroke={accent}
              strokeWidth={2}
            />
            <text x={99} y={377}>
              type: text
            </text>
            {image && (
              <g>
                <rect
                  x={86}
                  y={401}
                  width={204}
                  height={59}
                  rx={4}
                  fill={bg}
                  stroke={accent}
                  strokeWidth={2}
                />
                <path
                  d="M95,447 l16,-20 l12,10 l13,-17 l14,27Z"
                  fill={accent}
                />
                <text x={157} y={437}>
                  image 字节
                </text>
              </g>
            )}
            {audio && (
              <g>
                <circle
                  cx={330}
                  cy={451}
                  r={15}
                  fill={bg}
                  stroke={accent}
                  strokeWidth={3}
                />
                <text x={22} y={428}>
                  音频不进入图片块
                </text>
                <text x={278} y={489}>
                  人工
                </text>
              </g>
            )}
            {blocked && (
              <text x={50} y={428}>
                仅文本；附件错误已标记
              </text>
            )}
          </g>
        )}
        {!audio && (
          <text x={12} y={491}>
            {source === "injection"
              ? "外来指令不升级为系统权限"
              : "模型接收块；密钥留在下载端"}
          </text>
        )}
      </svg>
      <p role="status" className="text-sm text-secondary">
        {notes[source]} 当前内容块 {step < 3 ? 0 : image ? 2 : 1} 个。
      </p>
      <Controls
        timeline={timeline}
        steps={routingSteps}
        reset={() => {
          timeline.goToStep(0);
          setSource("image");
        }}
      />
    </Frame>
  );
}

type RecoveryCase = "timeout" | "tool" | "refusal" | "schema";
export function Lcp09MultimodalBotReleaseGateLab() {
  const [failure, setFailure] = useState<RecoveryCase>("timeout");
  const [approved, setApproved] = useState(false);
  const timeline = useBotTimeline(recoverySteps);
  const step = timeline.currentStep;
  const fallback = failure === "timeout" || failure === "schema";
  const refusal = failure === "refusal";
  const primary = failure === "timeout" ? 900 : 400;
  const backup = fallback ? 600 : 0;
  const canTool = step >= 4 && !refusal && approved;
  const elapsed = primary + (step >= 2 ? backup : 0) + (canTool ? 300 : 0);
  const status = refusal
    ? "安全拒答；不换模型逃避"
    : !approved
      ? "等待审批；工具调用0次"
      : failure === "tool"
        ? "工具失败；查询状态，不盲重试"
        : "审批通过；工具执行1次";
  return (
    <Frame id="recovery" title="实验C · 故障耗时与不可绕过的审批">
      <label className="block text-sm">
        故障类型
        <select
          aria-label="故障类型"
          value={failure}
          onChange={(e) => {
            setFailure(e.target.value as RecoveryCase);
            timeline.goToStep(0);
          }}
        >
          <option value="timeout">主模型超时 → 备选</option>
          <option value="schema">输出结构错误 → 备选</option>
          <option value="tool">工具失败 → 状态核对</option>
          <option value="refusal">安全拒答 → 终止</option>
        </select>
      </label>
      <button
        type="button"
        aria-pressed={approved}
        className="mt-2 rounded-control border border-border px-3 py-2 text-sm"
        onClick={() => {
          setApproved(!approved);
          timeline.goToStep(0);
        }}
      >
        人工审批：{approved ? "已批准" : "未批准"}
      </button>
      <svg
        viewBox="0 0 360 460"
        role="img"
        aria-label={`模型与工具耗时条；${recoverySteps[step].caption}；${status}；已展示耗时${elapsed}毫秒`}
      >
        <text x={8} y={25}>
          耗时为预置值，不是线上测量
        </text>
        {[0, 1, 2, 3].map((n) => (
          <g key={n}>
            <line
              x1={84 + n * 80}
              x2={84 + n * 80}
              y1={48}
              y2={212}
              stroke={border}
            />
            <text x={84 + n * 80} y={235} textAnchor="middle">
              {n}s
            </text>
          </g>
        ))}
        <text x={4} y={83}>
          主模型
        </text>
        <rect
          x={84}
          y={62}
          width={primary * 0.08}
          height={28}
          fill={step >= 1 && (fallback || refusal) ? danger : accent}
        />
        {step >= 1 && (
          <text x={168} y={83}>
            {failure === "timeout"
              ? "超时"
              : failure === "schema"
                ? "格式错"
                : refusal
                  ? "拒答"
                  : "已返回"}
          </text>
        )}
        <text x={4} y={138}>
          备模型
        </text>
        {step >= 2 && fallback ? (
          <rect
            x={84 + primary * 0.08}
            y={117}
            width={backup * 0.08}
            height={28}
            fill={accent}
          />
        ) : (
          <line
            x1={84}
            x2={94}
            y1={132}
            y2={132}
            stroke={border}
            strokeWidth={3}
          />
        )}
        <text x={4} y={193}>
          工具
        </text>
        {canTool && (
          <rect
            x={84 + (primary + backup) * 0.08}
            y={172}
            width={24}
            height={28}
            fill={failure === "tool" ? danger : accent}
          />
        )}
        {step >= 3 && !refusal && (
          <g>
            <path
              d="M180,252 L222,284 L180,316 L138,284 Z"
              fill={bg}
              stroke={approved ? accent : danger}
              strokeWidth={3}
            />
            <text x={180} y={290} textAnchor="middle">
              审批
            </text>
            <path
              d={
                approved
                  ? "M222,284 L310,284 L310,354"
                  : "M138,284 L50,284 L50,354"
              }
              fill="none"
              stroke={approved ? accent : danger}
              strokeWidth={3}
            />
            <text x={approved ? 272 : 14} y={379}>
              {approved ? "可执行" : "待人工"}
            </text>
          </g>
        )}
        {step >= 3 && refusal && (
          <g>
            <Stop x={180} y={284} />
            <text x={90} y={334}>
              拒答不进入工具分支
            </text>
          </g>
        )}
        {canTool && (
          <g>
            <circle
              cx={310}
              cy={406}
              r={12}
              fill={failure === "tool" ? danger : accent}
            />
            <text x={7} y={413}>
              {failure === "tool"
                ? "失败 ≠ 副作用未发生"
                : "完成；保留业务唯一键"}
            </text>
          </g>
        )}
        <text x={8} y={449}>
          累计展示 {elapsed} ms · 不含排队
        </text>
      </svg>
      <p role="status" className="text-sm text-secondary">
        {status}。主模型 {primary}ms；备选 {step >= 2 ? backup : 0}ms；工具{" "}
        {canTool ? 300 : 0}ms。审批独立于模型，切换供应商不增加权限。
      </p>
      <Controls
        timeline={timeline}
        steps={recoverySteps}
        reset={() => {
          timeline.goToStep(0);
          setFailure("timeout");
          setApproved(false);
        }}
      />
    </Frame>
  );
}
