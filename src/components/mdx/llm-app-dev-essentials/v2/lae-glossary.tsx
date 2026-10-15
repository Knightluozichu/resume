"use client";

import { useState, type ReactNode } from "react";
import { useTeachingTimeline } from "../../anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "../../anim/timeline-controls";

// 本章需求：序列/向量/容量、产品/API/模型、提议/授权/执行三种异构图；
// 保留三个 registry 导出；示意数据非真实 tokenizer/模型；故障、44px 控件、完整重置。
// 窄画布分栏而非缩小 800px 图，确保移动端实际 SVG 字体 >= 11px。
const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";
const tokenSteps = [
  { label: "sequence", caption: "1. 输入序列" },
  { label: "embedding", caption: "2. 另一路编码向量" },
  { label: "capacity", caption: "3. 检查生成容量" },
];
const relationSteps = [
  { label: "entry", caption: "1. 选择入口" },
  { label: "contract", caption: "2. 穿过接口" },
  { label: "weights", caption: "3. 查看模型权重" },
];
const toolSteps = [
  { label: "proposal", caption: "1. 模型提议退款" },
  { label: "policy", caption: "2. 应用检查权限和归属" },
  { label: "execution", caption: "3. 执行或拒绝" },
];

function useGlossaryClock(steps: typeof tokenSteps) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, index) => {
        const start = index * TEACHING_BEAT_MS;
        tl.label(step.label, start);
        tl.add(
          clock,
          {
            beat: [index, index + 1],
            duration: TEACHING_BEAT_MS,
            ease: "linear",
          },
          start,
        );
      });
    },
  });
}

function Frame({
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
      className="lae-glossary-lab not-prose my-6 min-w-0 rounded-card border border-border bg-bg p-3 sm:p-5"
    >
      <h3 className="mb-3 text-base font-semibold text-primary">{title}</h3>
      {children}
      <style>{`
        .lae-glossary-lab button, .lae-glossary-lab input[type=range] { min-height:44px; min-width:44px; }
        .lae-glossary-lab button[aria-pressed=true] { border-color:var(--accent); color:var(--accent); }
        .lae-glossary-lab ol[aria-hidden=true] { display:none; }
        .lae-glossary-lab .mt-4.flex { flex-wrap:wrap; }
        .lae-glossary-lab svg { display:block; width:100%; height:auto; min-width:0; }
        .lae-glossary-lab button:focus-visible, .lae-glossary-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
      `}</style>
    </section>
  );
}

function Controls({
  timeline,
  steps,
  reset,
}: {
  timeline: ReturnType<typeof useGlossaryClock>;
  steps: typeof tokenSteps;
  reset: () => void;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      labelText={Object.fromEntries(
        steps.map((step) => [step.label, step.caption]),
      )}
      reset={{ label: "重置全部", onClick: reset }}
    />
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = C.accent,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  // 向下或水平箭头，均为整数坐标，无 SSR 随机数或浮点三角运算。
  const tip =
    x1 === x2
      ? `${x2 - 5},${y2 - 8} ${x2},${y2} ${x2 + 5},${y2 - 8}`
      : x2 > x1
        ? `${x2 - 8},${y2 - 5} ${x2},${y2} ${x2 - 8},${y2 + 5}`
        : `${x2 + 8},${y2 - 5} ${x2},${y2} ${x2 + 8},${y2 + 5}`;
  return (
    <g fill="none" stroke={color} strokeWidth={2}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <polyline points={tip} />
    </g>
  );
}

export function LaeGlossaryRequestContractLab() {
  const [longInput, setLongInput] = useState(false);
  const [memory, setMemory] = useState(false);
  const [fault, setFault] = useState(false);
  const timeline = useGlossaryClock(tokenSteps);
  const input = longInput ? 10 : 6;
  const recalled = memory ? 4 : 0;
  const required = input + recalled + 4;
  const vector = longInput ? [64, -32, 48] : [32, -48, 80];
  const reset = () => {
    timeline.goToStep(0);
    setLongInput(false);
    setMemory(false);
    setFault(false);
  };
  return (
    <Frame
      kind="lae-glossary-sequence-vector-capacity"
      title="实验一：序列不是向量，向量不是容量"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          aria-pressed={longInput}
          onClick={() => setLongInput(!longInput)}
        >
          输入：{input} 格（切换 6 / 10）
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={memory}
          onClick={() => setMemory(!memory)}
        >
          召回记忆：{recalled} 格
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：漏算输出预留
        </button>
      </div>
      <div className="grid min-w-0 gap-3 lg:grid-cols-2">
        <svg
          viewBox="0 0 320 350"
          role="img"
          aria-label={`输入 ${input} 个示意 token；${timeline.currentStep >= 1 ? "显示三维教学向量" : "待编码向量"}`}
          fontSize={16}
          fill={C.text}
        >
          <text x={12} y={24}>
            有顺序的输入 token（示意）
          </text>
          {Array.from({ length: input }, (_, i) => (
            <g key={i} data-token={i + 1}>
              <rect
                x={12 + (i % 5) * 60}
                y={42 + Math.floor(i / 5) * 42}
                width={48}
                height={32}
                rx={4}
                fill="none"
                stroke={C.accent}
              />
              <text
                x={36 + (i % 5) * 60}
                y={64 + Math.floor(i / 5) * 42}
                textAnchor="middle"
              >
                t{i + 1}
              </text>
            </g>
          ))}
          <Arrow x1={160} y1={130} x2={160} y2={166} />
          <text x={12} y={192}>
            整段文本 → embedding 编码
          </text>
          <line x1={160} y1={208} x2={160} y2={320} stroke={C.muted} />
          {vector.map((value, i) => (
            <g key={i}>
              <text x={12} y={230 + i * 36}>
                维{i + 1}
              </text>
              {timeline.currentStep >= 1 && (
                <rect
                  data-vector-bar={i}
                  x={value < 0 ? 160 + value : 160}
                  y={213 + i * 36}
                  width={Math.abs(value)}
                  height={22}
                  fill={C.accent}
                />
              )}
            </g>
          ))}
          <text x={160} y={340} textAnchor="middle">
            负 ← 0 → 正；非实测数值
          </text>
        </svg>
        <svg
          viewBox="0 0 320 350"
          role="img"
          aria-label={`示意窗口 16 格，输入 ${input}，记忆 ${recalled}，输出预留 4，实际需求 ${required}；${fault ? "错误预算漏算输出" : "预算包含输出"}`}
          fontSize={16}
          fill={C.text}
        >
          <text x={12} y={24}>
            生成请求：16 格教学窗口
          </text>
          <text x={12} y={53}>
            实填：输入；斜线：召回记忆
          </text>
          <text x={12} y={80}>
            空框：输出预留；灰框：空闲
          </text>
          {Array.from({ length: 20 }, (_, i) => {
            const isInput = i < input;
            const isMemory = i >= input && i < input + recalled;
            const isOutput = i >= input + recalled && i < required;
            const x = 18 + (i % 4) * 74;
            const y = 100 + Math.floor(i / 4) * 38;
            const active =
              isInput || isMemory || (isOutput && timeline.currentStep >= 2);
            return (
              <g key={i} data-capacity-cell={i}>
                <rect
                  x={x}
                  y={y}
                  width={62}
                  height={28}
                  fill={isInput ? C.accent : "none"}
                  fillOpacity={isInput ? 0.3 : 1}
                  stroke={
                    i >= 16 && active ? C.danger : active ? C.accent : C.border
                  }
                  strokeWidth={active ? 2 : 1}
                  strokeDasharray={
                    (fault && isOutput) || i >= 16 ? "4 3" : undefined
                  }
                />
                {isMemory && (
                  <path
                    d={`M${x + 4} ${y + 24} l20 -20 m0 20 l20 -20 m0 20 l14 -14`}
                    stroke={C.success}
                    strokeWidth={2}
                  />
                )}
                {isOutput && timeline.currentStep >= 2 && (
                  <text
                    x={x + 31}
                    y={y + 20}
                    textAnchor="middle"
                    fill={fault ? C.danger : C.text}
                  >
                    {fault ? "漏算" : "留"}
                  </text>
                )}
              </g>
            );
          })}
          <line
            x1={10}
            y1={248}
            x2={310}
            y2={248}
            stroke={C.danger}
            strokeWidth={2}
          />
          <text x={12} y={315}>
            红线以下不属于 16 格窗口
          </text>
          <text
            x={12}
            y={340}
            fill={fault || required > 16 ? C.danger : C.success}
          >
            实际 {required}/16；账面 {fault ? required - 4 : required}/16
          </text>
        </svg>
      </div>
      <p role="status" className="mt-3 text-sm text-secondary">
        {fault
          ? "故障：账面少了 4 格，但生成仍需要空间；撤销漏算并缩短输入或召回内容。"
          : required > 16
            ? "超出 2 格：不能把 embedding 向量当成压缩 prompt 塞回生成接口。减少输入或召回内容。"
            : "容量可容纳本例预算。单步到第三步查看输出预留；编码向量不会自动减少生成输入。"}
        教学格数不是实际分词；未模拟隐藏开销或推理 token，真实上限按模型核对。
      </p>
      <Controls timeline={timeline} steps={tokenSteps} reset={reset} />
    </Frame>
  );
}

export function LaeGlossaryExecutionTraceLab() {
  const [product, setProduct] = useState(false);
  const [modelB, setModelB] = useState(false);
  const [training, setTraining] = useState(false);
  const [fault, setFault] = useState(false);
  const timeline = useGlossaryClock(relationSteps);
  const reset = () => {
    timeline.goToStep(0);
    setProduct(false);
    setModelB(false);
    setTraining(false);
    setFault(false);
  };
  const activeX = modelB ? 242 : 78;
  const reached = timeline.currentStep >= 2;
  return (
    <Frame
      kind="lae-glossary-product-api-model-topology"
      title="实验二：产品、接口与模型不是同一层"
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          aria-pressed={product}
          onClick={() => {
            setProduct(!product);
            setFault(false);
          }}
        >
          入口：{product ? "ChatGPT 产品" : "自建应用"}
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={modelB}
          disabled={product}
          onClick={() => setModelB(!modelB)}
        >
          API 模型：{modelB ? "B" : "A"}
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={training}
          disabled={product}
          onClick={() => setTraining(!training)}
        >
          API 操作：{training ? "微调示意" : "推理"}
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={fault}
          disabled={product}
          onClick={() => setFault(!fault)}
        >
          故障：把接口名当模型
        </button>
      </div>
      <div className="mx-auto mt-3 max-w-md">
        <svg
          viewBox="0 0 320 490"
          role="img"
          aria-label={`${product ? "产品内部路由" : "自建应用经过 API"}；${fault ? "错误地把接口当模型，路径断开" : "下游连接模型权重"}`}
          fontSize={16}
          fill={C.text}
        >
          <text x={12} y={24}>
            入口层
          </text>
          <path
            d="M24 94 V52 H130 V94 Z M32 60 H122 M32 68 H122"
            stroke={product ? C.accent : C.border}
            fill="none"
            strokeWidth={2}
          />
          <text x={77} y={87} textAnchor="middle">
            ChatGPT
          </text>
          <path
            d="M188 94 V52 H296 V94 Z M199 65 l-6 7 6 7 m86 -14 l6 7 -6 7"
            stroke={!product ? C.accent : C.border}
            fill="none"
            strokeWidth={2}
          />
          <text x={242} y={87} textAnchor="middle">
            自建应用
          </text>
          <Arrow
            x1={product ? 78 : 242}
            y1={100}
            x2={product ? 78 : 242}
            y2={151}
          />
          <text x={12} y={134}>
            协议层
          </text>
          <ellipse
            cx={78}
            cy={188}
            rx={65}
            ry={34}
            fill="none"
            stroke={product ? C.accent : C.border}
            strokeWidth={2}
          />
          <text x={78} y={184} textAnchor="middle">
            产品内部
          </text>
          <text x={78} y={205} textAnchor="middle">
            非公开路由
          </text>
          <rect
            x={179}
            y={154}
            width={127}
            height={68}
            rx={20}
            fill="none"
            stroke={!product ? C.accent : C.border}
            strokeWidth={2}
          />
          <text x={242} y={184} textAnchor="middle">
            API 合同
          </text>
          <text x={242} y={205} textAnchor="middle">
            {training && !product ? "训练任务" : "生成请求"}
          </text>
          {timeline.currentStep >= 1 && !fault && (
            <g data-model-route={product ? "managed" : modelB ? "B" : "A"}>
              <path
                d={
                  product
                    ? "M78 222 V252 H160 V285 M160 285 H78 V310 M160 285 H242 V310"
                    : `M242 222 V262 H${activeX} V310`
                }
                stroke={C.accent}
                strokeWidth={3}
                fill="none"
                strokeDasharray={product ? "5 4" : undefined}
              />
            </g>
          )}
          {fault && (
            <g stroke={C.danger} strokeWidth={4}>
              <path d="M222 242 l40 40 m0 -40 l-40 40" />
              <circle
                cx={242}
                cy={188}
                r={44}
                fill="none"
                strokeDasharray="6 4"
              />
            </g>
          )}
          <text x={12} y={298}>
            模型层（A / B 为抽象模型）
          </text>
          {[78, 242].map((cx, index) => {
            const selected =
              !fault && reached && (product || index === Number(modelB));
            const changed = selected && training && !product;
            return (
              <g key={cx} data-model={index === 0 ? "A" : "B"}>
                <circle
                  cx={cx}
                  cy={361}
                  r={49}
                  fill="none"
                  stroke={selected ? C.accent : C.border}
                  strokeWidth={selected ? 3 : 1}
                />
                {[-20, 0, 20].map((dy, n) => (
                  <line
                    key={dy}
                    x1={cx - 25}
                    y1={342 + dy}
                    x2={cx + 25}
                    y2={361}
                    stroke={selected ? C.accent : C.border}
                    strokeWidth={changed ? [6, 2, 8][n] : [2, 5, 3][n]}
                  />
                ))}
                {[-20, 0, 20].map((dy) => (
                  <circle
                    key={dy}
                    cx={cx - 25}
                    cy={342 + dy}
                    r={5}
                    fill={selected ? C.accent : C.muted}
                  />
                ))}
                <circle
                  cx={cx + 25}
                  cy={361}
                  r={7}
                  fill={selected ? C.accent : C.muted}
                />
                <text x={cx} y={435} textAnchor="middle">
                  {index === 0 ? "模型 A" : "模型 B"}
                </text>
              </g>
            );
          })}
          <text x={160} y={468} textAnchor="middle">
            {fault
              ? "接口没有权重，不能充当模型"
              : product
                ? "虚线：不推断产品的具体后端"
                : training
                  ? "训练更新权重 → 线宽改变"
                  : "推理使用权重 → 线宽不变"}
          </text>
        </svg>
      </div>
      <p role="status" className="text-sm text-secondary">
        {fault
          ? "错误路径停在接口层；Responses 是接口名称，不是一个模型。关闭故障，给请求选择可用的模型标识。"
          : product
            ? "产品包含界面、会话和内部编排。此图不声明 ChatGPT 实际使用 A 或 B；API 模型/操作选择在产品入口下不适用。"
            : training
              ? "微调是训练任务，不是多聊几轮。第三步线宽改变表示权重更新，不表示真实网络或性能提升。托管平台的可用性需另查。"
              : "生成接口规定如何发请求，模型标识规定请求交给谁。切换 A/B 会重连下游，但不改变接口层。推理不会自动写回模型权重。"}
      </p>
      <Controls timeline={timeline} steps={relationSteps} reset={reset} />
    </Frame>
  );
}

export function LaeGlossaryAuthorizationGateLab() {
  const [permission, setPermission] = useState(true);
  const [fault, setFault] = useState(false);
  const timeline = useGlossaryClock(toolSteps);
  const allowed = permission && !fault;
  const checked = timeline.currentStep >= 1;
  const executed = timeline.currentStep >= 2 && allowed;
  const reset = () => {
    timeline.goToStep(0);
    setPermission(true);
    setFault(false);
  };
  return (
    <Frame
      kind="lae-glossary-tool-authority-sequence"
      title="实验三：工具提议不是执行权限"
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          aria-pressed={permission}
          onClick={() => setPermission(!permission)}
        >
          账号退款权限：{permission ? "有" : "无"}
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：请求他人的订单
        </button>
      </div>
      <div className="mx-auto mt-3 max-w-md">
        <svg
          viewBox="0 0 320 470"
          role="img"
          aria-label={`退款时序：模型已提出调用，应用${checked ? (allowed ? "批准" : "拒绝") : "尚未检查"}，执行次数 ${executed ? 1 : 0}`}
          fontSize={16}
          fill={C.text}
        >
          {[
            { x: 48, label: "模型" },
            { x: 160, label: "应用" },
            { x: 272, label: "工具" },
          ].map(({ x, label }) => (
            <g key={x}>
              <text x={x} y={28} textAnchor="middle">
                {label}
              </text>
              <line
                x1={x}
                y1={42}
                x2={x}
                y2={420}
                stroke={C.border}
                strokeDasharray="4 4"
              />
            </g>
          ))}
          <text x={12} y={65}>
            时间 ↓
          </text>
          <Arrow x1={48} y1={112} x2={160} y2={112} />
          <text x={12} y={91}>
            提议 refund(order_id)
          </text>
          <circle cx={48} cy={112} r={5} fill={C.accent} />
          <text x={12} y={148}>
            {fault ? "目标：他人订单" : "目标：本人订单"}
          </text>
          <path
            d="M160 174 L199 211 L160 248 L121 211 Z"
            fill="none"
            stroke={checked ? (allowed ? C.success : C.danger) : C.border}
            strokeWidth={3}
          />
          <text x={160} y={217} textAnchor="middle">
            授权
          </text>
          {checked && (
            <g data-policy={allowed ? "allow" : "deny"}>
              <text x={12} y={274} fill={allowed ? C.success : C.danger}>
                {allowed
                  ? "权限 + 归属：均通过"
                  : fault
                    ? "归属不符：拒绝"
                    : "权限不足：拒绝"}
              </text>
              {!allowed && (
                <path
                  d="M147 290 l26 26 m0 -26 l-26 26"
                  stroke={C.danger}
                  strokeWidth={4}
                />
              )}
            </g>
          )}
          {executed && (
            <g data-tool-execution="1">
              <Arrow x1={160} y1={319} x2={272} y2={319} color={C.success} />
              <text x={169} y={302}>
                实际调用
              </text>
              <rect x={266} y={319} width={12} height={62} fill={C.success} />
              <Arrow
                x1={272}
                y1={381}
                x2={160}
                y2={381}
                color={C.success}
                dashed
              />
              <text x={170} y={365}>
                执行结果
              </text>
              <Arrow x1={160} y1={414} x2={48} y2={414} dashed />
            </g>
          )}
          <text x={12} y={454}>
            副作用计数：{executed ? 1 : 0}（仅本地模拟）
          </text>
        </svg>
      </div>
      <p role="status" className="text-sm text-secondary">
        {checked && !allowed
          ? "已拒绝：图中没有应用到工具的调用，也没有退款副作用。模型参数即使符合结构也不能代替账号权限与订单归属检查。"
          : executed
            ? "应用检查后才调用工具，结果返回给模型。历史插件清单与现行函数描述都不是业务授权本身。"
            : "模型只提出函数名和参数。单步到授权，再到执行；改变权限或订单归属，比较实际调用线是否出现。"}
        本例不联网、不退款；历史插件安装流程不可据此复现。
      </p>
      <Controls timeline={timeline} steps={toolSteps} reset={reset} />
    </Frame>
  );
}
