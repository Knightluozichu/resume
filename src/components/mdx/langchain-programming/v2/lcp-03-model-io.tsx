"use client";

import { useState } from "react";

// 本章三种结构分别是概率分布、角色消息装配、解析分流；不调用真实模型/API。
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const surface = "var(--bg-elevated)";
const border = "var(--border)";
const control =
  "min-h-11 min-w-11 rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-primary)]";
const root =
  "not-prose my-8 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-3 sm:p-5 text-[var(--text-primary)]";
const n = (value: number) => Number(value.toFixed(3));
const draws = [0.18, 0.72, 0.94, 0.41, 0.58];
const logits = {
  neutral: [2, 1, 0],
  focused: [3, 0.5, -1],
  misleading: [0, 3, 1],
} as const;
type Context = keyof typeof logits;

export function Lcp03ModelIoVersionContractLab() {
  const [temperature, setTemperature] = useState(1);
  const [context, setContext] = useState<Context>("neutral");
  const [draw, setDraw] = useState(0);
  const [fault, setFault] = useState(false);
  const scores = logits[context];
  const exps = scores.map((score) =>
    Math.exp((score - Math.max(...scores)) / temperature),
  );
  const total = exps.reduce((a, b) => a + b, 0);
  const probabilities = exps.map((value) => value / total);
  const cumulative = probabilities.map((_, i) =>
    probabilities.slice(0, i + 1).reduce((a, b) => a + b, 0),
  );
  const selected = cumulative.findIndex((value) => draws[draw] < value);
  function reset() {
    setTemperature(1);
    setContext("neutral");
    setDraw(0);
    setFault(false);
  }
  return (
    <section className={root} data-visual-kind="model-token-distribution">
      <h3 className="text-lg font-semibold">实验一 · 下一步不是唯一答案</h3>
      <p className="text-sm leading-6">
        本地确定性模拟：A/B/C 是虚构候选
        token，分数为人工设定，不是任何模型的测量值。
        先预测：降温后概率更集中，是否就能让错误输入变正确？
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm">
          输入条件
          <select
            className={control}
            value={context}
            onChange={(e) => setContext(e.target.value as Context)}
          >
            <option value="neutral">未加示例：2 / 1 / 0</option>
            <option value="focused">示例偏向 A：3 / 0.5 / −1</option>
            <option value="misleading">误导偏向 B：0 / 3 / 1</option>
          </select>
        </label>
        <label className="grid min-w-44 gap-1 text-sm">
          温度 T = {temperature.toFixed(1)}
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="0.2"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
        </label>
        <button
          className={control}
          onClick={() => setDraw((draw + 1) % draws.length)}
          disabled={fault}
        >
          换抽样位置
        </button>
        <button
          className={control}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          分数缺失故障
        </button>
        <button className={control} onClick={reset}>
          重置分布实验
        </button>
      </div>
      <svg
        viewBox="0 0 320 390"
        className="mx-auto block w-full max-w-md"
        role="img"
        aria-label="候选概率条形图与累计概率抽样带"
        fontSize="16"
        fill={ink}
      >
        <text x="16" y="26">
          下一 token 的条件概率
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} data-candidate={String.fromCharCode(65 + i)}>
            <text x="16" y={68 + i * 74}>
              {String.fromCharCode(65 + i)}
            </text>
            <rect
              x="44"
              y={48 + i * 74}
              width="250"
              height="30"
              rx="4"
              fill={surface}
              stroke={border}
            />
            <rect
              data-probability-bar={i}
              x="44"
              y={48 + i * 74}
              width={fault ? 0 : n(250 * probabilities[i])}
              height="30"
              rx="4"
              fill={accent}
              opacity={n(0.85 - i * 0.2)}
            />
            <text x="44" y={101 + i * 74} fill={muted}>
              {fault
                ? "不可计算：缺失分数"
                : `p=${(probabilities[i] * 100).toFixed(1)}% · z=${scores[i]}`}
            </text>
          </g>
        ))}
        <text x="16" y="280">
          累计区间 · 固定抽样序列
        </text>
        {probabilities.map((p, i) => (
          <g key={i}>
            <rect
              data-probability-interval={i}
              x={n(30 + (i === 0 ? 0 : cumulative[i - 1]) * 260)}
              y="300"
              width={fault ? 0 : n(p * 260)}
              height="32"
              fill={accent}
              opacity={n(0.85 - i * 0.2)}
              stroke={surface}
            />
          </g>
        ))}
        {!fault && (
          <path
            data-sample-needle="true"
            d={`M ${n(30 + draws[draw] * 260)} 290 v 54 m -6 -6 l 6 6 l 6 -6`}
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
        )}
        <text x="16" y="374">
          {fault
            ? "停止抽样：不能伪造概率"
            : `u=${draws[draw].toFixed(2)} → 候选 ${String.fromCharCode(65 + selected)}`}
        </text>
      </svg>
      <p className="text-sm leading-6" aria-live="polite">
        {fault
          ? "当前缺失 logits，图中移除概率条和抽样针；真实应用应记录上游错误，而不是补一个答案。"
          : `当前抽中 ${String.fromCharCode(65 + selected)}；只展示一个位置的抽样，不代表整句正确率。降温不改变分数的排序；误导输入仍可能集中地产生错误。`}
      </p>
    </section>
  );
}

const examples = [
  { id: "E1", topic: "greeting", label: "寒暄", answer: "你好", length: 8 },
  { id: "E2", topic: "delivery", label: "物流", answer: "查物流", length: 18 },
  { id: "E3", topic: "refund", label: "退款", answer: "查退款", length: 16 },
] as const;
type Topic = "delivery" | "refund";
type AssemblyFault = "none" | "missing" | "flatten";

export function Lcp03ModelIoRunnableTraceLab() {
  const [topic, setTopic] = useState<Topic>("delivery");
  const [count, setCount] = useState(1);
  const [strategy, setStrategy] = useState("match");
  const [fault, setFault] = useState<AssemblyFault>("none");
  // 明示的标签相等规则，不冒充 embedding 相似度或真实 token 计数。
  const ranked = examples
    .map((example, index) => ({
      ...example,
      score: example.topic === topic ? 1 : 0,
      index,
    }))
    .sort((a, b) =>
      strategy === "match"
        ? b.score - a.score || a.index - b.index
        : a.index - b.index,
    );
  const chosen = ranked.slice(0, count);
  const messages = [
    { role: "system", value: "仅回答业务问题", example: "rule" },
    ...chosen.flatMap((example) => [
      { role: "human", value: example.label + "示例", example: example.id },
      { role: "ai", value: example.answer, example: example.id },
    ]),
    {
      role: "human",
      value: topic === "delivery" ? "订单到哪了？" : "退款到哪了？",
      example: "query",
    },
  ];
  const missing = fault === "missing";
  const flatten = fault === "flatten";
  const height = flatten || missing ? 440 : 348 + messages.length * 54;
  function reset() {
    setTopic("delivery");
    setCount(1);
    setStrategy("match");
    setFault("none");
  }
  return (
    <section className={root} data-visual-kind="fewshot-role-assembly">
      <h3 className="text-lg font-semibold">实验二 · 选示例，再装配消息</h3>
      <p className="text-sm leading-6">
        本地模拟：按业务标签相等打 1 分，否则 0
        分；同分保持原序，不调用向量库。先预测：只取一个示例时，“原序”和“匹配”会把哪个例子装入消息？
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm">
          问题槽位
          <select
            className={control}
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
          >
            <option value="delivery">物流问题</option>
            <option value="refund">退款问题</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          示例选择
          <select
            className={control}
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="match">标签匹配优先</option>
            <option value="order">原序截取</option>
          </select>
        </label>
        <label className="grid min-w-44 gap-1 text-sm">
          示例数 k = {count}
          <input
            className="h-11 min-h-11 min-w-11 w-full"
            type="range"
            min="0"
            max="3"
            step="1"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </label>
        <label className="grid gap-1 text-sm">
          装配方式
          <select
            className={control}
            value={fault}
            onChange={(e) => setFault(e.target.value as AssemblyFault)}
          >
            <option value="none">保留角色</option>
            <option value="missing">故障：缺 question</option>
            <option value="flatten">故障：拼成一个 human</option>
          </select>
        </label>
        <button className={control} onClick={reset}>
          重置装配实验
        </button>
      </div>
      <svg
        viewBox={`0 0 320 ${height}`}
        className="mx-auto block w-full max-w-md"
        role="img"
        aria-label="示例排序条与按角色交错排列的消息栈"
        fontSize="16"
        fill={ink}
      >
        <text x="16" y="26">
          候选示例 · 高亮表示入选
        </text>
        {ranked.map((example, i) => (
          <g key={example.id} data-ranked-example={example.id}>
            <text x="16" y={64 + i * 56}>
              {example.id} {example.label}
            </text>
            <rect
              x="108"
              y={46 + i * 56}
              width="112"
              height="24"
              fill={surface}
              stroke={border}
            />
            <rect
              data-score-bar={example.id}
              x="108"
              y={46 + i * 56}
              width={example.score * 112}
              height="24"
              fill={accent}
              opacity="0.5"
            />
            <text x="232" y={64 + i * 56}>
              {example.score}分
            </text>
            {i < count && (
              <circle
                data-chosen={example.id}
                cx="292"
                cy={57 + i * 56}
                r="7"
                fill={accent}
              />
            )}
          </g>
        ))}
        <path
          d="M 160 218 v 32 m -6 -6 l 6 6 l 6 -6"
          stroke={accent}
          strokeWidth="2"
          fill="none"
        />
        <text x="16" y="281">
          {missing
            ? "槽位校验阻断"
            : flatten
              ? "错误拼接：角色边界消失"
              : "消息顺序 · 从上到下"}
        </text>
        {missing ? (
          <g>
            <path
              d="M 160 310 l 30 30 l -30 30 l -30 -30 Z"
              fill={surface}
              stroke={ink}
              strokeWidth="2"
            />
            <path
              d="M 150 330 l 20 20 m 0 -20 l -20 20"
              stroke={ink}
              strokeWidth="2"
            />
            <text x="16" y="405">
              缺 question → 不发给模型
            </text>
          </g>
        ) : flatten ? (
          <g>
            <rect
              data-message-role="human"
              x="16"
              y="310"
              width="288"
              height="76"
              rx="12"
              fill={surface}
              stroke={accent}
              strokeWidth="2"
            />
            <text x="28" y="338">
              human · 所有内容拼成字符串
            </text>
            <text x="28" y="366">
              system / ai 不再是消息角色
            </text>
            <text x="16" y="421">
              消息数：1，角色信息已损失
            </text>
          </g>
        ) : (
          <g>
            <line
              x1="27"
              x2="27"
              y1="320"
              y2={320 + (messages.length - 1) * 54}
              stroke={border}
              strokeWidth="2"
            />
            {messages.map((message, i) => (
              <g
                key={i}
                data-message-role={message.role}
                data-example-id={message.example}
              >
                <circle cx="27" cy={326 + i * 54} r="6" fill={accent} />
                <rect
                  x={message.role === "ai" ? 74 : 44}
                  y={306 + i * 54}
                  width={message.role === "ai" ? 230 : 246}
                  height="40"
                  rx={message.role === "system" ? 2 : 12}
                  fill={surface}
                  stroke={accent}
                  opacity={message.role === "ai" ? 0.8 : 1}
                />
                <text x={message.role === "ai" ? 86 : 54} y={332 + i * 54}>
                  {message.role} · {message.example}
                </text>
              </g>
            ))}
            <text x="16" y={328 + messages.length * 54}>
              消息数：{messages.length} · 角色边界保留
            </text>
          </g>
        )}
      </svg>
      <ol className="space-y-1 text-sm leading-6" aria-live="polite">
        {missing ? (
          <li>缺失必填变量 question：模板渲染失败，没有模型请求。</li>
        ) : flatten ? (
          <li>
            一个 human 字符串即使包含“system:”文字，也不是结构化的 system 消息。
          </li>
        ) : (
          messages.map((message, i) => (
            <li key={i}>
              {i + 1}. {message.role}：{message.value}
            </li>
          ))
        )}
      </ol>
      <p className="text-sm leading-6">
        入选示例：{chosen.map((e) => e.id).join("、") || "无"}；人工长度合计{" "}
        {chosen.reduce((sum, e) => sum + e.length, 0)} 格（不是 tokenizer
        计数）。增加 k 会增加输入长度；相关性并不代表示例可信或有权限。
      </p>
    </section>
  );
}

type OutputCase =
  | "valid"
  | "syntax"
  | "type"
  | "refusal"
  | "truncated"
  | "business";
const outputs: Record<
  OutputCase,
  { label: string; raw: string; complete: boolean; refused: boolean }
> = {
  valid: {
    label: "正常",
    raw: '{"sku":"A1","qty":2}',
    complete: true,
    refused: false,
  },
  syntax: {
    label: "格式错误",
    raw: '{"sku":"A1","qty":2',
    complete: true,
    refused: false,
  },
  type: {
    label: "类型错误",
    raw: '{"sku":"A1","qty":"two"}',
    complete: true,
    refused: false,
  },
  refusal: {
    label: "拒答",
    raw: "无法协助此请求。",
    complete: true,
    refused: true,
  },
  truncated: {
    label: "截断",
    raw: '{"sku":"A1","qty":',
    complete: false,
    refused: false,
  },
  business: {
    label: "业务越界",
    raw: '{"sku":"A1","qty":99}',
    complete: true,
    refused: false,
  },
};

function inspectOutput(output: (typeof outputs)[OutputCase]) {
  if (output.refused)
    return {
      stop: 1,
      reason: "拒答：不进入 JSON 解析，不伪造成订单",
      value: null,
    };
  if (!output.complete)
    return {
      stop: 1,
      reason: "响应不完整：先处理截断，不归为业务错误",
      value: null,
    };
  let value: Record<string, unknown>;
  try {
    value = JSON.parse(output.raw);
  } catch {
    return { stop: 2, reason: "JSON 语法失败：缺右花括号", value: null };
  }
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).sort().join(",") !== "qty,sku" ||
    typeof value.sku !== "string" ||
    typeof value.qty !== "number" ||
    !Number.isInteger(value.qty)
  ) {
    return { stop: 3, reason: "字段校验失败：qty 必须为整数", value };
  }
  if (value.sku !== "A1" || value.qty < 1 || value.qty > 5)
    return { stop: 4, reason: "业务拒绝：库存为 5，qty=99 超出库存", value };
  return { stop: 4, reason: "接受：格式、字段类型、业务条件均满足", value };
}

export function Lcp03ModelIoReleaseGateLab() {
  const [sample, setSample] = useState<OutputCase>("valid");
  const [step, setStep] = useState(0);
  const output = outputs[sample];
  const inspection = inspectOutput(output);
  const terminal = Math.min(step, inspection.stop);
  const rejected = sample !== "valid" && terminal === inspection.stop;
  const parsed = terminal >= 2 && inspection.value !== null;
  const nodes = [
    "接收响应",
    "完整且非拒答",
    "JSON 语法",
    "字段类型",
    "业务库存",
  ];
  function reset() {
    setSample("valid");
    setStep(0);
  }
  return (
    <section className={root} data-visual-kind="output-parser-branches">
      <h3 className="text-lg font-semibold">实验三 · 文本变对象之前的岔路</h3>
      <p className="text-sm leading-6">
        本地预置响应，不调用
        API。应用先把供应商的拒答/结束状态归一化，再解析。先预测：JSON
        格式正确且 qty 为整数，为什么仍可能不能创建订单？
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm">
          响应样本
          <select
            className={control}
            value={sample}
            onChange={(e) => {
              setSample(e.target.value as OutputCase);
              setStep(0);
            }}
          >
            {Object.entries(outputs).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className={control}
          disabled={terminal >= inspection.stop}
          onClick={() => setStep(terminal + 1)}
        >
          下一检查
        </button>
        <button
          className={control}
          disabled={terminal >= inspection.stop}
          onClick={() => setStep(inspection.stop)}
        >
          检查到结束
        </button>
        <button className={control} onClick={reset}>
          重置解析实验
        </button>
      </div>
      <pre
        className="whitespace-pre-wrap break-all rounded-lg border border-[var(--border)] p-3 text-sm"
        aria-label="原始响应"
      >
        {output.raw}
      </pre>
      <svg
        viewBox="0 0 320 576"
        className="mx-auto block w-full max-w-md"
        role="img"
        aria-label="输出校验状态机、错误分支与解析字段树"
        fontSize="16"
        fill={ink}
      >
        {nodes.map((label, i) => {
          const visited = i <= terminal;
          const failed = rejected && i === terminal;
          return (
            <g
              key={label}
              data-parser-node={i}
              data-state={failed ? "rejected" : visited ? "visited" : "pending"}
              opacity={visited ? 1 : 0.7}
            >
              {i > 0 && (
                <path
                  d={`M 114 ${50 + (i - 1) * 64} v 24 m -5 -5 l 5 5 l 5 -5`}
                  fill="none"
                  stroke={visited ? accent : border}
                  strokeWidth="2"
                />
              )}
              <circle
                cx="30"
                cy={30 + i * 64}
                r="12"
                fill={visited ? accent : surface}
                stroke={border}
              />
              <text x="26" y={36 + i * 64} fill={visited ? "var(--bg)" : ink}>
                {i}
              </text>
              <rect
                x="50"
                y={10 + i * 64}
                width="152"
                height="40"
                rx={i === 0 ? 16 : 2}
                fill={surface}
                stroke={failed ? ink : visited ? accent : border}
                strokeWidth="2"
              />
              <text x="60" y={36 + i * 64}>
                {label}
              </text>
              {failed && (
                <g data-error-branch={sample}>
                  <path
                    d={`M 202 ${30 + i * 64} H 248`}
                    stroke={ink}
                    strokeWidth="2"
                  />
                  <path
                    d={`M 270 ${12 + i * 64} l 20 18 l -20 18 l -20 -18 Z`}
                    fill={surface}
                    stroke={ink}
                    strokeWidth="2"
                  />
                  <path
                    d={`M 264 ${24 + i * 64} l 12 12 m 0 -12 l -12 12`}
                    stroke={ink}
                    strokeWidth="2"
                  />
                </g>
              )}
            </g>
          );
        })}
        <text x="16" y="344">
          {rejected
            ? "旁路停止 · 不产生业务动作"
            : terminal === 4
              ? "通过 → 仍需服务端授权"
              : `检查进行中 · ${terminal} / 4`}
        </text>
        {parsed ? (
          <g data-field-tree="visible">
            <circle
              cx="160"
              cy="398"
              r="24"
              fill={surface}
              stroke={accent}
              strokeWidth="2"
            />
            <text x="144" y="404">
              对象
            </text>
            <path
              d="M 145 418 L 82 470 M 175 418 L 238 470"
              stroke={accent}
              strokeWidth="2"
            />
            <circle
              cx="82"
              cy="488"
              r="34"
              fill={surface}
              stroke={accent}
              strokeWidth="2"
            />
            <circle
              cx="238"
              cy="488"
              r="34"
              fill={surface}
              stroke={sample === "type" && terminal >= 3 ? ink : accent}
              strokeWidth={sample === "type" && terminal >= 3 ? 4 : 2}
            />
            <text x="69" y="482">
              sku
            </text>
            <text x="72" y="506">
              A1
            </text>
            <text x="225" y="482">
              qty
            </text>
            <text x={sample === "type" ? 220 : 230} y="506">
              {sample === "type" ? "two" : sample === "business" ? "99" : "2"}
            </text>
            <text x="16" y="562">
              字段树≠事实核验≠业务授权
            </text>
          </g>
        ) : (
          <g data-field-tree="absent">
            <circle
              cx="160"
              cy="444"
              r="40"
              fill="none"
              stroke={border}
              strokeDasharray="6 6"
            />
            <text x="104" y="514">
              尚无可用字段树
            </text>
          </g>
        )}
      </svg>
      <p className="text-sm leading-6" aria-live="polite">
        {terminal === inspection.stop
          ? inspection.reason
          : `当前停在“${nodes[terminal]}”，下一步只推进一项检查。`}{" "}
        每次切换样本从接收响应重新开始。
      </p>
    </section>
  );
}
