"use client";

import { useState, type ReactNode } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

/* 需求分析：简介需要责任而非版本评分。用文档汇流区分检索/生成，
 * 用有条件回边区分链/代理，用责任泳道比较抽象层。三个旧导出只作兼容名。
 * 所有数据均为本地教学夹具；SVG 用整数坐标，不采样随机数或平台浮点函数。 */
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const surface = "var(--bg-elevated)";
const retrievalSteps = [
  { label: "问题进入链" },
  { label: "检索返回文档" },
  { label: "组装模型上下文" },
  { label: "生成与回调" },
] as const;
const controlSteps = [
  { label: "接收问题" },
  { label: "选择下一动作" },
  { label: "执行并写回结果" },
  { label: "回答或有界停止" },
] as const;
const boundarySteps = [
  { label: "应用给出策略" },
  { label: "编排与工具交接" },
  { label: "模型返回消息" },
  { label: "采集与落盘" },
] as const;

function useChapterTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 1600);
        tl.add(
          clock,
          { beat: i + 1, duration: 1600, ease: "linear" },
          i * 1600,
        );
      });
    },
  });
}

// 只共享外壳与原生控件尺寸，不共享实验模型、SVG 或判定逻辑。
function LabShell({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 rounded-card border border-border p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:rounded-control [&_button]:border [&_button]:border-border [&_button]:px-2 [&_button]:text-sm [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input]:min-h-11 [&_input]:min-w-11 [&_input]:shrink-0 [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_input[type=range]]:h-11 [&_input[type=range]]:appearance-auto [&_input[type=range]]:bg-transparent [&_input[type=range]]:accent-accent [&_select]:min-h-11 [&_select]:min-w-11 [&_select]:max-w-full [&_select]:rounded-control [&_select]:border [&_select]:border-border [&_select]:bg-elevated [&_select]:px-2 [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent"
    >
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-secondary">
        本地确定性教学模拟；不是 LangChain SDK 执行，也不是模型测量。
      </p>
      {children}
    </section>
  );
}

function Diagram({
  title,
  height,
  children,
}: {
  title: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 280 ${height}`}
      className="mx-auto my-4 block w-full max-w-sm"
      style={{ fontSize: 14, fill: ink }}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/** 旧 VersionContract 导出：现在是文档汇流与模型边界，而非版本合同模板。 */
export function Lcp01IntroductionVersionContractLab() {
  const [count, setCount] = useState(2);
  const [history, setHistory] = useState(false);
  const [fault, setFault] = useState(false);
  const timeline = useChapterTimeline(retrievalSteps);
  const step = timeline.currentStep;
  const selected = fault ? [2] : [0, 1, 2].slice(0, count);
  const docs = ["7日退货", "30日保修", "广告集合"];
  const packetY = [58, 130, 295, 440][step];

  return (
    <LabShell
      kind="retrieval-model-confluence"
      title="实验一：文档不等于模型知识"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          返回文档上限 k：{count}
          <input
            aria-label="返回文档上限"
            type="range"
            min="1"
            max="3"
            step="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="h-11 w-full accent-accent"
          />
        </label>
        <label className="grid gap-1 text-sm">
          记忆进入哪次调用
          <select
            aria-label="记忆注入"
            value={history ? "with" : "without"}
            onChange={(e) => setHistory(e.target.value === "with")}
          >
            <option value="without">仅本轮问题</option>
            <option value="with">加入上轮：我问的是退货</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：{fault ? "错库已接入" : "接入广告集合"}
        </button>
      </div>
      <Diagram
        title="链控制文档检索、上下文组装与模型调用；回调旁路观测"
        height={560}
      >
        <text x="140" y="20" textAnchor="middle">
          实线：数据　虚线：事件
        </text>
        <path d="M14 48 V470 H45" fill="none" stroke={ink} strokeWidth="2" />
        <text x="18" y="493">
          链：固定顺序
        </text>
        <circle cx="14" cy={packetY} r="6" fill={accent} />
        <rect
          x="55"
          y="40"
          width="175"
          height="36"
          rx="18"
          fill="none"
          stroke={ink}
        />
        <text x="142" y="63" textAnchor="middle">
          问题：退货期限？
        </text>
        <path d="M140 76 V94 M140 150 V163" stroke={accent} strokeWidth="2" />
        <path
          d="M140 94 L183 122 L140 150 L97 122 Z"
          fill="none"
          stroke={accent}
          strokeWidth="2"
        />
        <text x="140" y="127" textAnchor="middle">
          检索
        </text>
        {docs.map((doc, i) => {
          const x = 28 + i * 78;
          const active = selected.includes(i);
          return (
            <g key={doc} opacity={active ? 1 : 0.35}>
              <path
                d={`M140 150 L${x + 28} 174`}
                stroke={active ? accent : border}
                fill="none"
                strokeWidth={active ? 3 : 1}
              />
              <path
                d={`M${x} 174 h44 l12 12 v50 h-56 Z M${x + 44} 174 v12 h12`}
                fill="none"
                stroke={active ? accent : muted}
                strokeWidth="2"
              />
              <text x={x + 28} y="199" textAnchor="middle">
                D{i + 1}
              </text>
              <text x={x + 28} y="221" textAnchor="middle">
                {doc.slice(0, 2)}
              </text>
              {active && (
                <path
                  d={`M${x + 28} 236 V253 L140 277`}
                  fill="none"
                  stroke={accent}
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
        <rect
          x="42"
          y="277"
          width="196"
          height="42"
          rx="4"
          fill="none"
          stroke={ink}
        />
        {selected.map((doc, i) => (
          <g key={doc}>
            <rect
              x={50 + i * 61}
              y="285"
              width="53"
              height="26"
              fill="none"
              stroke={accent}
              strokeWidth="2"
            />
            <text x={76 + i * 61} y="303" textAnchor="middle">
              D{doc + 1}
            </text>
          </g>
        ))}
        <text x="140" y="341" textAnchor="middle">
          上下文：问题 + 文档{history ? " + 历史" : ""}
        </text>
        <path
          d="M140 319 V325 M140 347 V357"
          fill="none"
          stroke={accent}
          strokeWidth="2"
        />
        <ellipse cx="59" cy="386" rx="39" ry="24" fill="none" stroke={muted} />
        <text x="59" y="391" textAnchor="middle">
          记忆
        </text>
        <path
          d={history ? "M59 362 V350 H132 V357" : "M98 386 H106"}
          fill="none"
          stroke={history ? accent : border}
          strokeDasharray={history ? "none" : "3 4"}
          strokeWidth="2"
        />
        <circle
          cx="147"
          cy="392"
          r="35"
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        <text x="147" y="388" textAnchor="middle">
          模型
        </text>
        <text x="147" y="406" textAnchor="middle">
          I/O
        </text>
        <path
          d="M147 427 V450 l-5 -7 m5 7 l5 -7"
          fill="none"
          stroke={accent}
          strokeWidth="2"
        />
        <text x="147" y="475" textAnchor="middle">
          {fault ? "无依据：应拒答" : "回答需核对 D1"}
        </text>
        <path
          d="M245 72 V440"
          stroke={muted}
          strokeDasharray="4 4"
          fill="none"
        />
        {[122, 298, 392, 440].map((y, i) => (
          <g key={y}>
            <path
              d={`M${i === 2 ? 182 : 238} ${y} H245`}
              stroke={muted}
              strokeDasharray="3 4"
            />
            <circle
              cx="245"
              cy={y}
              r={step >= i ? 5 : 2}
              fill={step >= i ? accent : muted}
            />
          </g>
        ))}
        <text x="140" y="518" textAnchor="middle">
          回调：事件旁路，不替模型答题
        </text>
        <text x="140" y="545" textAnchor="middle">
          返回文档 ≠ 更新权重
        </text>
      </Diagram>
      <div className="text-sm" aria-live="polite">
        <p>
          夹具文档：D1＝7日退货；D2＝30日保修；D3＝广告。返回：
          {selected.map((i) => `D${i + 1}`).join("、")}。
        </p>
        <p>
          {fault
            ? "最早故障在检索集合选择：模型收到的是广告。多写提示词不能凭空恢复退货证据。"
            : "k 增大只增加上下文候选，不保证答案更好；D2 的保修期不能冒充退货期。"}
        </p>
      </div>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置文档实验",
          onClick: () => {
            setCount(2);
            setHistory(false);
            setFault(false);
            timeline.goToStep(0);
          },
        }}
      />
    </LabShell>
  );
}

/** 旧 RunnableTrace 导出：固定链与基于状态选择动作的代理。 */
export function Lcp01IntroductionRunnableTraceLab() {
  const [mode, setMode] = useState("chain");
  const [observation, setObservation] = useState("missing");
  const [fault, setFault] = useState(false);
  const timeline = useChapterTimeline(controlSteps);
  const step = timeline.currentStep;
  const agent = mode === "agent";
  const needsTool = !agent || observation === "missing";
  const failed = needsTool && fault;
  const terminal = failed ? "停止：工具失败" : "输出有据答案";
  const positions = [
    [174, 62],
    [190, 157],
    needsTool ? [104, 268] : [254, 268],
    [220, 413],
  ];
  const [cx, cy] = positions[step];
  const rows = step < 2 ? 1 : needsTool ? 3 : 2;

  return (
    <LabShell kind="chain-agent-state-selection" title="实验二：谁决定下一步？">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          执行方式
          <select
            aria-label="执行方式"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="chain">固定链：总是先检索</option>
            <option value="agent">代理：读取状态后选择</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          输入状态
          <select
            aria-label="输入证据状态"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          >
            <option value="missing">没有证据</option>
            <option value="ready">已有本次可用证据</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：{fault ? "工具抛错" : "让工具抛错"}
        </button>
      </div>
      <Diagram
        title="固定链无决策回边，代理按消息状态选择工具或回答；失败有界停止"
        height={550}
      >
        <text x="140" y="20" textAnchor="middle">
          {agent ? "代理：状态决定分支" : "链：代码预定分支"}
        </text>
        <path
          d="M140 86 V125 M140 187 L65 236"
          fill="none"
          stroke={needsTool ? accent : border}
          strokeWidth="2"
        />
        {(!agent || failed) && (
          <path
            d="M65 300 V353 H140 V386"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        )}
        {agent && (
          <path
            d="M215 300 V353 H140 V386"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        )}
        <path
          d={agent ? "M171 157 C247 157 245 210 215 236" : "M215 300 V353 H140"}
          fill="none"
          stroke={agent && !needsTool ? accent : border}
          strokeWidth="2"
        />
        {agent && needsTool && !failed && (
          <path
            d="M32 268 C4 268 4 157 108 157 l-8 -6 m8 6 l-8 6"
            fill="none"
            stroke={accent}
            strokeWidth="3"
          />
        )}
        {observation === "ready" && (
          <g>
            <path
              d="M206 78 h26 l8 8 v28 h-34 Z M232 78 v8 h8"
              fill="none"
              stroke={accent}
              strokeWidth="2"
            />
            <path
              d="M206 96 H174"
              fill="none"
              stroke={accent}
              strokeWidth="2"
            />
            <text x="222" y="105" textAnchor="middle">
              D1
            </text>
          </g>
        )}
        <circle
          cx="140"
          cy="62"
          r="24"
          fill={surface}
          stroke={ink}
          strokeWidth="2"
        />
        <text x="140" y="67" textAnchor="middle">
          输入
        </text>
        {agent ? (
          <path
            d="M140 125 L180 157 L140 189 L100 157 Z"
            fill={surface}
            stroke={accent}
            strokeWidth="2"
          />
        ) : (
          <rect
            x="101"
            y="135"
            width="78"
            height="44"
            fill={surface}
            stroke={ink}
          />
        )}
        <text x="140" y="162" textAnchor="middle">
          {agent ? "模型选择" : "固定路由"}
        </text>
        <text x="58" y="220" textAnchor="middle">
          {agent ? "tool_calls" : "调用检索"}
        </text>
        <text x="222" y="220" textAnchor="middle">
          {agent ? "直接回答" : "无选择权"}
        </text>
        <circle
          cx="65"
          cy="268"
          r="32"
          fill={surface}
          stroke={failed ? ink : accent}
          strokeWidth="2"
        />
        <text x="65" y="265" textAnchor="middle">
          工具
        </text>
        <text x="65" y="284" textAnchor="middle">
          {failed ? "error" : "result"}
        </text>
        <circle
          cx="215"
          cy="268"
          r="32"
          fill={surface}
          stroke={agent && !needsTool ? accent : border}
          strokeWidth="2"
        />
        <text x="215" y="273" textAnchor="middle">
          答案
        </text>
        {failed && (
          <path
            d="M35 238 L95 298 M95 238 L35 298"
            stroke={ink}
            strokeWidth="3"
          />
        )}
        <path
          d="M85 386 H195 L211 402 V424 L195 440 H85 L69 424 V402 Z"
          fill={surface}
          stroke={ink}
          strokeWidth="2"
        />
        <text x="140" y="418" textAnchor="middle">
          {terminal}
        </text>
        <circle
          cx={cx}
          cy={cy}
          r="8"
          fill={accent}
          stroke={surface}
          strokeWidth="2"
        />
        <text x="140" y="469" textAnchor="middle">
          消息状态（并非模型权重）
        </text>
        {Array.from({ length: rows }, (_, i) => (
          <g key={i}>
            <rect
              x="24"
              y={481 + i * 21}
              width={i === 0 ? 220 : i === 1 ? 170 : failed ? 95 : 195}
              height="17"
              rx="3"
              fill="none"
              stroke={accent}
            />
            <text x="31" y={495 + i * 21}>
              {i === 0
                ? "user: 退货期限？"
                : i === 1
                  ? needsTool
                    ? "AI: tool_calls"
                    : "AI: 答案"
                  : failed
                    ? "tool: error"
                    : "tool: D1＝7日"}
            </text>
          </g>
        ))}
      </Diagram>
      <p className="text-sm" aria-live="polite">
        {agent
          ? needsTool
            ? "缺少证据 → 请求工具 → 结果回到消息状态 → 再生成。图只演示一轮工具调用，失败立即停止，不无限重试。"
            : "已有可用证据 → 跳过工具，直接回答；打开工具故障也不影响未执行的分支。"
          : "固定链无论已有证据与否都走检索；条件分支也能由程序编写，但不等于模型在运行时选动作。"}
        模型只提出工具调用，运行时负责参数校验、权限与实际执行。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置控制流实验",
          onClick: () => {
            setMode("chain");
            setObservation("missing");
            setFault(false);
            timeline.goToStep(0);
          },
        }}
      />
    </LabShell>
  );
}

/** 旧 ReleaseGate 导出：责任泳道图，不评价框架高低。 */
export function Lcp01IntroductionReleaseGateLab() {
  const [stack, setStack] = useState("langchain");
  const [task, setTask] = useState("retrieval");
  const [fault, setFault] = useState(false);
  const timeline = useChapterTimeline(boundarySteps);
  const step = timeline.currentStep;
  const owners =
    stack === "sdk"
      ? [0, 0, 0, 2, 0]
      : stack === "langchain"
        ? [0, 1, 1, 2, 0]
        : [0, 1, 0, 2, 0];
  const xs = [39, 140, 241];
  const ys = [108, 185, 262, 339, 416];
  const labels = ["权限策略", "编排调度", "工具执行", "模型推理", "观测落盘"];
  const points = owners.map((owner, i) => `${xs[owner]},${ys[i] + 3}`);
  const activeRow = [0, 2, 3, 4][step];

  return (
    <LabShell
      kind="framework-responsibility-lanes"
      title="实验三：比较接缝，不排名"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          实现方案
          <select
            aria-label="实现方案"
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          >
            <option value="sdk">模型 SDK + 自写应用</option>
            <option value="langchain">LangChain v1 create_agent</option>
            <option value="graph">LangGraph 自定义节点</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          同输入任务
          <select
            aria-label="同输入任务"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          >
            <option value="retrieval">预定一次检索再回答</option>
            <option value="adaptive">按结果选择是否再查</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：{fault ? "执行方缺失" : "移除工具执行方"}
        </button>
      </div>
      <Diagram
        title="应用、框架、模型服务三条责任泳道；工具执行缺失会断开调用"
        height={550}
      >
        <text x="140" y="20" textAnchor="middle">
          点＝责任落点，线＝交接顺序
        </text>
        {["应用代码", "框架运行时", "模型服务"].map((name, i) => (
          <g key={name}>
            <text x={xs[i]} y="57" textAnchor="middle">
              {name}
            </text>
            <path
              d={`M${xs[i]} 76 V450`}
              fill="none"
              stroke={border}
              strokeWidth="20"
            />
          </g>
        ))}
        <polyline
          points={
            fault
              ? [...points.slice(0, 2), `${xs[owners[2]]},${ys[2] - 20}`].join(
                  " ",
                )
              : points.join(" ")
          }
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        {fault && (
          <polyline
            points={[`${xs[owners[2]]},${ys[2] + 23}`, ...points.slice(3)].join(
              " ",
            )}
            fill="none"
            stroke={accent}
            strokeWidth="3"
          />
        )}
        {task === "adaptive" && (
          <path
            d={`M${xs[owners[2]] + 12} 262 C275 260 275 185 ${xs[owners[1]] + 15} 185 l8 -6 m-8 6 l8 6`}
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
        )}
        {labels.map((label, i) => (
          <g key={label}>
            <path d={`M15 ${ys[i] - 29} H265`} stroke={border} />
            <rect x="94" y={ys[i] - 30} width="92" height="22" fill={surface} />
            <text x="140" y={ys[i] - 12} textAnchor="middle">
              {label}
            </text>
            {fault && i === 2 ? (
              <path
                d={`M${xs[owners[i]] - 12} ${ys[i] - 5} l24 14 m0 -14 l-24 14`}
                fill="none"
                stroke={ink}
                strokeWidth="3"
              />
            ) : (
              <circle
                cx={xs[owners[i]]}
                cy={ys[i] + 3}
                r={i === activeRow ? 12 : 7}
                fill={i === activeRow ? accent : surface}
                stroke={accent}
                strokeWidth="2"
              />
            )}
          </g>
        ))}
        {fault && (
          <rect
            x={xs[owners[2]] - 14}
            y="251"
            width="28"
            height="25"
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
        )}
        <text x="140" y="483" textAnchor="middle">
          {fault
            ? "有 tool_calls ≠ 已执行工具"
            : task === "adaptive"
              ? "回边由哪一方实现？"
              : "已知顺序不必引入代理循环"}
        </text>
        <text x="140" y="509" textAnchor="middle">
          数据授权、答案核对始终归应用
        </text>
        <text x="140" y="535" textAnchor="middle">
          观测 SDK ≠ 自动持久化所有事件
        </text>
      </Diagram>
      <div className="text-sm" aria-live="polite">
        <p>
          {stack === "sdk"
            ? "SDK 负责模型请求协议；应用要自写流程、工具分派、状态与事件落盘。"
            : stack === "langchain"
              ? "v1 create_agent 提供模型—工具循环和工具分派；业务工具函数、数据权限及追踪配置仍由应用提供。"
              : "此处选择自定义 LangGraph 节点：框架调度图与状态，应用实现工具节点；这不代表 LangGraph 不能使用预制工具节点。"}
        </p>
        <p>
          {fault
            ? "复核信号：有模型工具请求，却没有相应工具开始/结束与结果消息；问题在执行接缝，不在模型文笔。"
            : "复核顺序：输入消息 → 动作选择 → 工具开始/结束 → 模型响应 → trace 接收确认。点的位置是本例设计选择，不是框架能力排行榜。"}
        </p>
      </div>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置责任边界实验",
          onClick: () => {
            setStack("langchain");
            setTask("retrieval");
            setFault(false);
            timeline.goToStep(0);
          },
        }}
      />
    </LabShell>
  );
}
