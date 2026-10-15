"use client";

import { useState, type ReactNode } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  line: "var(--border)",
  paper: "var(--bg-elevated)",
};
const chainSteps = [
  { label: "空前缀" },
  { label: "第一个 token" },
  { label: "条件分支" },
  { label: "终止与乘积" },
];
const matrixSteps = [
  { label: "预测位置 1" },
  { label: "预测位置 2" },
  { label: "预测位置 3" },
  { label: "预测位置 4" },
];
const trainSteps = [
  { label: "PT" },
  { label: "SFT" },
  { label: "RM" },
  { label: "RL" },
];

function useSequence(steps: typeof chainSteps) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 1100);
        tl.add(clock, { value: i + 1, duration: 1100 }, i * 1100);
      });
    },
  });
}

function Lab({
  title,
  kind,
  children,
}: {
  title: string;
  kind: string;
  children: ReactNode;
}) {
  return (
    <section
      className="lsl01-lab not-prose my-8 rounded-xl border border-border bg-elevated p-3 sm:p-5"
      data-visual-kind={kind}
      aria-label={title}
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">{title}</h3>
      {children}
      <style>{`
        .lsl01-lab { color: var(--text-primary); min-width: 0; }
        .lsl01-lab svg { width: 100%; max-width: 440px; height: auto; margin: 12px auto; display: block; }
        .lsl01-lab svg text { font-family: inherit; fill: var(--text-primary); font-size: 16px; }
        .lsl01-lab button, .lsl01-lab select { min-height: 44px; min-width: 44px; border: 1px solid var(--border); border-radius: 6px; padding: 8px; background: var(--bg-elevated); color: var(--text-primary); }
        .lsl01-lab button[aria-pressed="true"] { border-color: var(--accent); color: var(--accent); }
        .lsl01-lab input[type="range"] { min-height: 44px; width: 100%; accent-color: var(--accent); }
        .lsl01-lab select { width: 100%; max-width: 100%; }
        .lsl01-lab button:focus-visible, .lsl01-lab select:focus-visible, .lsl01-lab input:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .lsl01-lab .mt-4.flex { flex-wrap: wrap; }
        .lsl01-lab p { margin: 12px 0; overflow-wrap: anywhere; line-height: 1.7; }
      `}</style>
    </section>
  );
}

export function Lsl01IntroductionContextContractLab() {
  const timeline = useSequence(chainSteps);
  const [first, setFirst] = useState(60);
  const [path, setPath] = useState(0);
  const [independent, setIndependent] = useState(false);
  const p = first / 100;
  const conditional = [0.7, 0.3, 0.4, 0.6];
  const endings = [0.8, 0.5, 0.75, 0.9];
  const firstP = path < 2 ? p : 1 - p;
  const secondP = independent ? 0.5 : conditional[path];
  const factors = [firstP, secondP, endings[path]];
  const step = timeline.currentStep;
  const product = factors.slice(0, step).reduce((a, b) => a * b, 1);
  const reset = () => {
    timeline.goToStep(0);
    setFirst(60);
    setPath(0);
    setIndependent(false);
  };
  return (
    <Lab title="实验 A · 条件概率分支树" kind="lsl01-chain-probability-tree">
      <label>
        P(我) = {p.toFixed(2)}；P(你) = {(1 - p).toFixed(2)}
        <input
          aria-label="我作为首 token 的概率"
          type="range"
          min="10"
          max="90"
          value={first}
          onChange={(e) => setFirst(Number(e.target.value))}
        />
      </label>
      <label>
        选择完整路径
        <select value={path} onChange={(e) => setPath(Number(e.target.value))}>
          {[
            "我 / 喜欢 / EOS",
            "我 / 讨厌 / EOS",
            "你 / 喜欢 / EOS",
            "你 / 讨厌 / EOS",
          ].map((label, i) => (
            <option key={label} value={i}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <svg
        viewBox="0 0 340 420"
        role="img"
        aria-label="两级词分支与终止概率；粗线为高概率，实线高亮选中前缀"
      >
        <text x="170" y="25" textAnchor="middle">
          BOS：开始
        </text>
        {[90, 250].map((x, i) => (
          <g key={x}>
            <path
              d={`M170 42 L${x} 120`}
              stroke={
                step >= 1 && Math.floor(path / 2) === i ? C.accent : C.line
              }
              strokeWidth={2 + 9 * (i === 0 ? p : 1 - p)}
            />
            <text x={i === 0 ? 65 : 250} y="85">
              {(i === 0 ? p : 1 - p).toFixed(2)}
            </text>
            <circle cx={x} cy="137" r="19" fill={C.paper} stroke={C.ink} />
            <text x={x} y="143" textAnchor="middle">
              {i === 0 ? "我" : "你"}
            </text>
          </g>
        ))}
        {[40, 125, 215, 300].map((x, i) => {
          const q = independent ? 0.5 : conditional[i];
          const selected = i === path;
          return (
            <g key={x}>
              <g>
                <path
                  d={`M${i < 2 ? 90 : 250} 156 L${x} 238`}
                  stroke={step >= 2 && selected ? C.accent : C.line}
                  strokeWidth={2 + 9 * q}
                />
                <text x={x} y="207" textAnchor="middle">
                  {q.toFixed(2)}
                </text>
                <text x={x} y="260" textAnchor="middle">
                  {i % 2 === 0 ? "喜欢" : "讨厌"}
                </text>
              </g>
              <g>
                <path
                  d={`M${x} 275 V337`}
                  stroke={step >= 3 && selected ? C.accent : C.line}
                  strokeWidth={2 + 9 * endings[i]}
                />
                <text x={x + 4} y="309">
                  {endings[i]}
                </text>
                <text x={x} y="360" textAnchor="middle">
                  EOS
                </text>
              </g>
            </g>
          );
        })}
        <text x="170" y="398" textAnchor="middle">
          粗细 = 概率；紫边 = 选中前缀
        </text>
      </svg>
      <p role="status">
        第 {step} 个因子后：
        {step
          ? factors
              .slice(0, step)
              .map((v) => v.toFixed(2))
              .join(" × ")
          : "空乘积"}{" "}
        = {product.toFixed(4)}
      </p>
      <p>
        EOS
        是终止符。最后一层只画“立即终止”支路；余下概率属于继续生成，未画出。数值全为教学自造，不是真实中文模型。
      </p>
      <button
        type="button"
        aria-pressed={independent}
        onClick={() => setIndependent(!independent)}
      >
        故障：忽略前缀 {independent ? "开" : "关"}
      </button>
      <p>
        {independent
          ? "错误模型把第二步都换成 0.50；路径概率已改变，并非链式法则允许删除条件。"
          : "同是“喜欢”，接在“我”和“你”后分别为 0.70 和 0.40。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function Lsl01IntroductionComputeTraceLab() {
  const timeline = useSequence(matrixSteps);
  const [model, setModel] = useState("gpt");
  const [leak, setLeak] = useState(false);
  const row = timeline.currentStep;
  const columns = model === "t5" ? 6 : 4;
  const size = model === "t5" ? 39 : 52;
  const start = model === "t5" ? 83 : 96;
  const visible = (r: number, c: number) =>
    model === "bert" ? c !== r : model === "t5" ? c < 3 || c - 3 < r : c < r;
  return (
    <Lab
      title="实验 B · 训练目标的可见上下文"
      kind="lsl01-context-visibility-matrix"
    >
      <label>
        结构与目标
        <select
          aria-label="模型结构"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt">GPT · 2018 · 因果续写</option>
          <option value="bert">BERT · 2018 · 遮蔽恢复</option>
          <option value="t5">T5 · 2019预印本 · 编码器-解码器</option>
        </select>
      </label>
      <svg
        viewBox="0 0 360 420"
        role="img"
        aria-label="行是要预测的目标位置，列是原始输入；实心可读，空格不可读，斜线为故障泄漏"
      >
        <text x="180" y="27" textAnchor="middle">
          {model === "bert"
            ? "每行单独遮蔽该行目标"
            : model === "t5"
              ? "源 s 全可读；目标 t 只能读历史"
              : "预测 tᵢ，只可读 tᵢ 之前"}
        </text>
        <text x="180" y="57" textAnchor="middle">
          列：可读的原始 token
        </text>
        {Array.from({ length: columns }, (_, c) => (
          <text
            key={c}
            x={start + c * size + size / 2}
            y="92"
            textAnchor="middle"
          >
            {model === "t5" && c < 3
              ? `s${c + 1}`
              : `t${model === "t5" ? c - 2 : c + 1}`}
          </text>
        ))}
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <text x="55" y={129 + r * 52} textAnchor="middle">
              t{r + 1}
            </text>
            {Array.from({ length: columns }, (_, c) => {
              const allowed = visible(r, c);
              const leaked = leak && !allowed;
              const x = start + c * size;
              const y = 106 + r * 52;
              return (
                <g key={c}>
                  <rect
                    x={x}
                    y={y}
                    width={size - 5}
                    height="44"
                    rx="3"
                    fill={allowed || leaked ? C.accent : C.paper}
                    opacity={
                      allowed ? (row === r ? 1 : 0.35) : leaked ? 0.6 : 1
                    }
                    stroke={row === r ? C.ink : C.line}
                    strokeWidth={row === r ? 2 : 1}
                  />
                  {leaked && (
                    <path
                      d={`M${x + 3} ${y + 39} L${x + size - 8} ${y + 5}`}
                      stroke={C.ink}
                      strokeWidth="3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
        <text x="180" y="345" textAnchor="middle">
          高亮行：正在检查的预测位置
        </text>
        <text x="180" y="375" textAnchor="middle">
          实心可读 / 空心不可读 / 斜线泄漏
        </text>
        <text x="180" y="403" textAnchor="middle">
          这是信息可见性，不是注意力权重
        </text>
      </svg>
      <p role="status">
        检查 t{row + 1}：
        {model === "bert"
          ? "左右上下文可用，目标原值不可读；每一行是一个独立遮蔽实验。"
          : model === "t5"
            ? "s1—s3 是编码器的源文本；t 列是解码器历史，源文本可双向编码。BOS/哨兵符为简明省略。"
            : "第一行没有历史词，仍可读 BOS（图中省略）；下一词预测绝不能偷读目标本身或未来。"}
      </p>
      <button type="button" aria-pressed={leak} onClick={() => setLeak(!leak)}>
        故障：泄漏目标 {leak ? "开" : "关"}
      </button>
      <p>
        {leak
          ? "斜线格把答案或未来放入输入，训练损失可能虚低；关闭故障才是可部署的原目标。"
          : "比较 BERT 的上下文恢复与 GPT 的从左向右预测；T5 还区分源与目标两个序列。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "完整重置",
          onClick: () => {
            timeline.goToStep(0);
            setModel("gpt");
            setLeak(false);
          },
        }}
      />
    </Lab>
  );
}

export function Lsl01IntroductionEvidenceGateLab() {
  const timeline = useSequence(trainSteps);
  const [fault, setFault] = useState(false);
  const [gap, setGap] = useState(2);
  const phase = timeline.currentStep;
  const tokens =
    phase === 0 ? ["天", "气", "晴", "EOS"] : ["问", "题", "答", "案", "EOS"];
  const masks = tokens.map((_, i) => (phase === 0 || i >= 2 || fault ? 1 : 0));
  const signedGap = fault ? -gap : gap;
  const pairLoss = Math.log1p(Math.exp(-signedGap));
  return (
    <Lab
      title="实验 C · 样本、loss-mask 与可训练参数"
      kind="lsl01-training-loss-mask"
    >
      <p>
        步骤对应 PT → SFT → RM → RL；后两步合起来展示一种典型 RLHF
        路径，不是所有模型都必经此链。
      </p>
      <label>
        奖励差绝对值 Δ = {gap.toFixed(1)}（仅 RM/RL 使用）
        <input
          aria-label="偏好奖励差"
          type="range"
          min="0"
          max="4"
          step="0.5"
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
        />
      </label>
      <svg
        viewBox="0 0 340 420"
        role="img"
        aria-label="PT和SFT的目标token及损失mask；RM的成对排序；RL更新策略但冻结奖励和参考模型"
      >
        <text x="170" y="27" textAnchor="middle">
          {trainSteps[phase].label}：
          {
            ["连续文本", "指令与示范", "同一问题的偏好对", "生成答案并评分"][
              phase
            ]
          }
        </text>
        {phase < 2 ? (
          <g>
            <text x="18" y="68">
              目标 token（由前缀预测）
            </text>
            {tokens.map((token, i) => {
              const x = 18 + i * 61;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y="86"
                    width="55"
                    height="48"
                    fill={C.paper}
                    stroke={C.ink}
                  />
                  <text x={x + 27} y="116" textAnchor="middle">
                    {token}
                  </text>
                  <path
                    d={`M${x + 27} 139 V169`}
                    stroke={C.line}
                    strokeWidth="2"
                  />
                  <rect
                    x={x}
                    y="175"
                    width="55"
                    height="45"
                    fill={masks[i] ? C.accent : C.paper}
                    fillOpacity={masks[i] ? 0.6 : 1}
                    stroke={C.ink}
                  />
                  <text x={x + 27} y="203" textAnchor="middle">
                    {masks[i]}
                  </text>
                </g>
              );
            })}
            <text x="18" y="251">
              mask：1 计损失 / 0 只作上下文
            </text>
            <path d="M170 267 V309" stroke={C.accent} strokeWidth="5" />
            <text x="170" y="341" textAnchor="middle">
              平均负对数概率 → 更新 θ
            </text>
            <text x="170" y="374" textAnchor="middle">
              {phase === 0
                ? "PT：所有真实目标参与损失"
                : `SFT：${masks.reduce<number>((a, b) => a + b, 0)} 个目标参与损失`}
            </text>
          </g>
        ) : (
          <g>
            <text x="20" y="69">
              同一 prompt：明天出门？
            </text>
            <path
              d="M170 80 L60 116 M170 80 L245 116"
              fill="none"
              stroke={C.line}
              strokeWidth="2"
            />
            <text x="18" y="140">
              A：查天气
            </text>
            <text x="198" y="140">
              B：乱断言
            </text>
            <text x="18" y="175">
              人标：偏好
            </text>
            <text x="198" y="175">
              人标：拒绝
            </text>
            <rect
              x="20"
              y="195"
              width={35 + gap * (fault ? 5 : 22)}
              height="24"
              fill={C.accent}
            />
            <rect
              x="200"
              y="195"
              width={35 + gap * (fault ? 22 : 5)}
              height="24"
              fill={C.accent}
              opacity="0.5"
            />
            <text x="170" y="251" textAnchor="middle">
              r(A) − r(B) = {signedGap.toFixed(1)}
            </text>
            <path d="M170 266 V298" stroke={C.accent} strokeWidth="4" />
            <text x="170" y="324" textAnchor="middle">
              {phase === 2
                ? "训练 φ：让偏好答案分数更高"
                : "更新 θ：奖励 − β·KL 约束"}
            </text>
            <text x="170" y="358" textAnchor="middle">
              {phase === 2 ? "策略 θ 不随 RM 步更新" : "冻结 φ；冻结参考 θref"}
            </text>
            <text x="170" y="391" textAnchor="middle">
              条长为分数示意，不是事实置信度
            </text>
          </g>
        )}
      </svg>
      <p role="status">
        {phase < 2
          ? `有效 mask = ${masks.join(" ")}。这里使用等长有效序列，无 padding。`
          : `固定 A 为正确标注的偏好项，排序损失 log(1+exp(−Δ)) = ${pairLoss.toFixed(4)}。${fault ? "故障反转模型排序，与原标注矛盾。" : "奖励差越大，原偏好对损失越低。"}`}
      </p>
      <button
        type="button"
        aria-pressed={fault}
        onClick={() => setFault(!fault)}
      >
        故障：{phase < 2 ? "把提示词也计损失" : "反转偏好排序"}{" "}
        {fault ? "开" : "关"}
      </button>
      <p>
        {phase === 0
          ? "PT 没有单独的提示词区，所以此故障在 PT 不改变 mask；到 SFT 对比即可看见差别。"
          : phase === 1
            ? "此例的回答-only方案令前两格为0；不是说任何SFT都必须用相同mask。"
            : phase === 2
              ? "RM 学习人标的 A 胜过 B，不是训练策略模仿两份答案。"
              : "RL 使用新生成答案；上方成对样本只是说明奖励模型来源，RL 不逐对拟合此标注。KL 用于限制偏离冻结参考策略。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "完整重置",
          onClick: () => {
            timeline.goToStep(0);
            setFault(false);
            setGap(2);
          },
        }}
      />
    </Lab>
  );
}
