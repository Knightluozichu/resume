"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  bg: "var(--bg-elevated)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded border border-border bg-transparent px-3 py-2 text-sm text-primary";

function Lab({
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
      className="lsl-map-lab not-prose my-8 min-w-0 rounded-xl border border-border p-3 sm:p-5"
    >
      <h3 className="mb-4 text-lg font-semibold text-primary">{title}</h3>
      {children}
      <style>{`
        .lsl-map-lab button, .lsl-map-lab select, .lsl-map-lab input { min-height:44px; min-width:44px; }
        .lsl-map-lab button:focus-visible, .lsl-map-lab select:focus-visible, .lsl-map-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
        .lsl-map-lab svg { display:block; width:100%; max-width:440px; height:auto; margin:16px auto; }
        .lsl-map-lab svg text { font-family:inherit; }
        .lsl-map-lab .mt-4.flex { flex-wrap:wrap; }
        .lsl-map-lab p { overflow-wrap:anywhere; }
      `}</style>
    </section>
  );
}

const dependencyNames = ["数据", "基础", "并行", "SFT", "RL", "应用/评估"];
const dependencySteps = dependencyNames.map((label) => ({ label }));
const objectSteps = ["预训练", "SFT", "奖励建模"].map((label) => ({ label }));
const buildDependency: BuildTimeline = (tl) => {
  const clock = { tick: 0 };
  dependencySteps.forEach((s, i) => tl.label(s.label, i * 900));
  tl.add(clock, { tick: 6, duration: 5400, ease: "linear" }, 0);
};
const buildObjects: BuildTimeline = (tl) => {
  const clock = { tick: 0 };
  objectSteps.forEach((s, i) => tl.label(s.label, i * 1300));
  tl.add(clock, { tick: 3, duration: 3900, ease: "linear" }, 0);
};
const positions = [
  [80, 48],
  [80, 143],
  [80, 238],
  [80, 333],
  [80, 428],
  [240, 523],
];
const prerequisites = [
  "清洗/切分规则未定，输入长度不可算",
  "基础缺失：无法构造移位标签与loss",
  "显存状态未知，不能选择并行方式",
  "SFT缺失：没有可供偏好采样的初始策略",
  "奖励及策略更新未定义",
  "",
];

export function LslOfficialLearningMapContextContractLab() {
  const [target, setTarget] = useState("rl");
  const [skip, setSkip] = useState("none");
  const timeline = useTeachingTimeline({
    steps: dependencySteps,
    build: buildDependency,
  });
  const route =
    target === "app"
      ? [0, 1, 5]
      : target === "sft"
        ? [0, 1, 2, 3, 5]
        : [0, 1, 2, 3, 4, 5];
  const missing = skip === "base" ? 1 : skip === "sft" ? 3 : -1;
  const missingIndex = route.indexOf(missing);
  const reached = route.filter(
    (node) =>
      node <= timeline.currentStep &&
      (missingIndex < 0 || route.indexOf(node) < missingIndex),
  );
  const blocked = missingIndex >= 0 && timeline.currentStep >= missing;
  const reset = () => {
    setTarget("rl");
    setSkip("none");
    timeline.goToStep(0);
  };
  return (
    <Lab
      kind="lsl-knowledge-prerequisite-dag"
      title="实验一 · 先修知识与目标选路"
    >
      <div className="flex flex-wrap gap-3">
        <label className="grid gap-1 text-sm">
          学习目标
          <select
            className={control}
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
              timeline.goToStep(0);
            }}
          >
            <option value="rl">训练并对齐</option>
            <option value="sft">只做SFT</option>
            <option value="app">调用已有模型</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          错误跳过前置
          <select
            className={control}
            value={skip}
            onChange={(e) => {
              setSkip(e.target.value);
              timeline.goToStep(0);
            }}
          >
            <option value="none">不跳过</option>
            <option value="base">跳过基础</option>
            <option value="sft">跳过SFT</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 330 575"
        role="img"
        aria-label={`依赖有向图，目标${target}，当前${dependencyNames[timeline.currentStep]}，${blocked ? "前置缺失阻断" : "沿选定路线推进"}`}
      >
        {route.slice(1).map((node, i) => {
          const parent = route[i];
          const [x1, y1] = positions[parent];
          const [x2, y2] = positions[node];
          const failed = blocked && (parent === missing || node === missing);
          return (
            <g key={`${parent}-${node}`} data-edge={`${parent}-${node}`}>
              <path
                d={`M ${x1} ${y1 + 25} C ${x1 + (node === 5 ? 125 : 0)} ${y1 + 65}, ${x2} ${y2 - 65}, ${x2} ${y2 - 25}`}
                fill="none"
                stroke={
                  failed ? C.danger : reached.includes(node) ? C.accent : C.line
                }
                strokeWidth={failed ? 4 : 3}
                strokeDasharray={failed ? "6 5" : undefined}
              />
              <path
                d={`M ${x2 - 5} ${y2 - 34} l 5 9 l 5 -9`}
                fill="none"
                stroke={failed ? C.danger : C.muted}
                strokeWidth="2"
              />
            </g>
          );
        })}
        {dependencyNames.map((name, i) => {
          const [x, y] = positions[i];
          const chosen = route.includes(i);
          const absent = missing === i && chosen;
          return (
            <g key={name} opacity={chosen ? 1 : 0.38} data-node={name}>
              <circle
                cx={x}
                cy={y}
                r="26"
                fill={C.bg}
                stroke={
                  absent ? C.danger : reached.includes(i) ? C.accent : C.line
                }
                strokeWidth="3"
              />
              {absent ? (
                <path
                  d={`M${x - 13} ${y - 13} l26 26 m0 -26 l-26 26`}
                  stroke={C.danger}
                  strokeWidth="3"
                />
              ) : (
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fill={C.ink}
                  fontSize="15"
                >
                  {i === 5 ? "用/评" : name}
                </text>
              )}
              <text
                x={i === 5 ? 170 : 122}
                y={y - 4}
                textAnchor={i === 5 ? "end" : "start"}
                fill={C.ink}
                fontSize="15"
              >
                {
                  [
                    "第3章 · 输入",
                    "第2章 · 目标",
                    "第4章 · 资源",
                    "第5章 · 回答",
                    "第6章 · 偏好",
                    "第7/8章",
                  ][i]
                }
              </text>
              <text
                x={i === 5 ? 170 : 122}
                y={y + 18}
                textAnchor={i === 5 ? "end" : "start"}
                fill={absent ? C.danger : C.muted}
                fontSize="14"
              >
                {absent
                  ? "前置被跳过"
                  : chosen
                    ? reached.includes(i)
                      ? "已走到"
                      : "待学习"
                    : "本路线可选"}
              </text>
            </g>
          );
        })}
      </svg>
      <p
        role="status"
        className="text-sm leading-relaxed text-secondary"
        data-readout="dependency"
      >
        {blocked
          ? `阻断：${missing === 1 && target === "app" ? "基础缺失：无法解释词元输入与生成长度边界" : missing === 3 && target === "sft" ? "SFT缺失：尚未训练指令回答，不能交付微调模型" : prerequisites[missing]}。下游不再点亮；补回前置后重走。`
          : `路线：${route.map((n) => dependencyNames[n]).join(" → ")}。${target === "app" ? "调用已有模型不要求自己预训练或RL；仍须检查输入与独立评估。" : "这是学习依赖，不宣称每个工程都必须从零训练。"}`}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置依赖图", onClick: reset }}
      />
    </Lab>
  );
}

export function LslOfficialLearningMapComputeTraceLab() {
  const [length, setLength] = useState(4);
  const [fault, setFault] = useState(false);
  const timeline = useTeachingTimeline({
    steps: objectSteps,
    build: buildObjects,
  });
  const stage = timeline.currentStep;
  const ids = [11, 12, ...[21, 22, 23, 2].slice(0, length)];
  const labels = ids.slice(1);
  const supervised = stage === 1 && !fault ? length : labels.length;
  const cell = (
    id: number | string,
    x: number,
    y: number,
    active: boolean,
    key: string,
  ) => (
    <g key={key}>
      <rect
        x={x}
        y={y}
        width="43"
        height="38"
        rx="4"
        fill={C.bg}
        stroke={active ? C.accent : C.line}
        strokeWidth="2"
      />
      <text
        x={x + 21.5}
        y={y + 25}
        textAnchor="middle"
        fill={active ? C.accent : C.muted}
        fontSize="16"
      >
        {id}
      </text>
    </g>
  );
  return (
    <Lab
      kind="lsl-stage-token-mask-preference"
      title="实验二 · 训练对象不是同一张表"
    >
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm">
          回答词元数
          <select
            className={control}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          >
            <option value={4}>4个</option>
            <option value={2}>2个</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          注入当前阶段错误：{fault ? "开" : "关"}
        </button>
      </div>
      <svg
        viewBox="0 0 330 395"
        role="img"
        aria-label={`${objectSteps[stage].label}数据结构：${stage === 2 ? "同提示的两条回答及排序" : "输入序列与移位标签"}${fault ? "，已注入错误" : ""}`}
      >
        {stage < 2 ? (
          <>
            <text x="15" y="25" fill={C.ink} fontSize="15">
              输入：提示11、12；回答21起
            </text>
            {ids.map((id, i) => cell(id, 15 + i * 49, 70, false, `input-${i}`))}
            <text x="15" y="53" fill={C.ink} fontSize="15">
              预测下一词元（左移对齐）
            </text>
            {labels.map((id, i) => (
              <g key={i}>
                <path
                  d={`M${36 + i * 49} 110 V157`}
                  stroke={C.muted}
                  strokeWidth="2"
                />
                {cell(
                  id,
                  15 + i * 49,
                  160,
                  stage === 0 || i > 0 || fault,
                  `label-${i}`,
                )}
                <text
                  x={36 + i * 49}
                  y="228"
                  textAnchor="middle"
                  fill={C.ink}
                  fontSize="15"
                >
                  {stage === 1 && i === 0 && !fault ? "0" : "1"}
                </text>
              </g>
            ))}
            <text x="15" y="258" fill={C.muted} fontSize="14">
              上行0/1：该预测位置是否计入loss
            </text>
            <path
              d={`M15 280 H${15 + supervised * 48}`}
              stroke={fault ? C.danger : C.accent}
              strokeWidth="12"
            />
            <text x="15" y="312" fill={C.ink} fontSize="15">
              有效监督位置：{supervised}
            </text>
            {fault && stage === 0 && (
              <path
                d={`M${36 + (ids.length - 1) * 49} 70 V62 H6 V180 H13`}
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            )}
            <text
              x="15"
              y="353"
              fill={fault ? C.danger : C.muted}
              fontSize="14"
            >
              {fault
                ? stage === 0
                  ? "错误：看未来标签，发生信息泄漏"
                  : "错误：提示12也被当成回答训练"
                : stage === 0
                  ? "因果预测：只能用当前位置及其左侧"
                  : "回答mask屏蔽提示，不屏蔽其上下文"}
            </text>
          </>
        ) : (
          <>
            <text x="15" y="27" fill={C.ink} fontSize="15">
              同一提示 → 两个候选回答
            </text>
            <circle
              cx="165"
              cy="79"
              r="31"
              fill={C.bg}
              stroke={C.accent}
              strokeWidth="2"
            />
            <text x="165" y="84" textAnchor="middle" fill={C.ink} fontSize="15">
              11,12
            </text>
            <path
              d="M150 108 L79 154 M180 108 L251 154"
              stroke={C.muted}
              fill="none"
              strokeWidth="2"
            />
            <text
              x="79"
              y="180"
              textAnchor="middle"
              fill={C.accent}
              fontSize="15"
            >
              chosen
            </text>
            <text
              x="251"
              y="180"
              textAnchor="middle"
              fill={fault ? C.danger : C.muted}
              fontSize="15"
            >
              {fault ? "提示99,98" : "rejected"}
            </text>
            {Array.from({ length }, (_, i) => (
              <g key={i}>
                {cell(
                  [21, 22, 23, 2][i],
                  57,
                  194 + i * 41,
                  true,
                  `chosen-${i}`,
                )}
                {cell(31 + i, 229, 194 + i * 41, false, `rejected-${i}`)}
              </g>
            ))}
            <path
              d="M110 259 H215 m-10 -6 l10 6 l-10 6"
              stroke={fault ? C.danger : C.accent}
              strokeWidth="2"
            />
            <text
              x="165"
              y="245"
              textAnchor="middle"
              fill={C.ink}
              fontSize="15"
            >
              r+ &gt; r−
            </text>
            <text
              x="15"
              y="383"
              fill={fault ? C.danger : C.muted}
              fontSize="14"
            >
              {fault
                ? "错误：跨提示比较，失去条件可比性"
                : "一对回答 → 一个排序约束，不是词元标签"}
            </text>
          </>
        )}
      </svg>
      <p
        role="status"
        data-readout="objects"
        className="text-sm leading-relaxed text-secondary"
      >
        {stage === 0
          ? `预训练：${ids.length}个输入词元，${labels.length}个移位预测位置；演示不含padding。`
          : stage === 1
            ? `SFT：${supervised}个位置参与平均loss；${fault ? "误把提示的预测位置算进loss，训练目标改变。" : "提示仍参与注意力，只把它对应的监督权重置零。"}`
            : fault
              ? "奖励建模阻断：两条回答的提示词不一致；重新按相同提示分组，不能把它当作合法偏好对。"
              : "奖励建模：r+=2、r−=0时，−log σ(2)=0.126928；这不是PPO，RL还要采样并更新策略。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置训练对象",
          onClick: () => {
            setLength(4);
            setFault(false);
            timeline.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}

export function LslOfficialLearningMapEvidenceGateLab() {
  const [goal, setGoal] = useState("sft");
  const [devices, setDevices] = useState(4);
  const [tokens, setTokens] = useState(1);
  const [replicate, setReplicate] = useState(false);
  const training = goal !== "infer";
  const totalMemory = training ? 112 : 14;
  const perDevice = totalMemory / (replicate ? 1 : devices);
  const flops = (training ? 6 : 2) * 7e9 * tokens * 1e6;
  const seconds = flops / (devices * 60e12);
  const oom = perDevice > 24;
  const xy = Array.from({ length: devices }, (_, i) => {
    const a = (i * 2 * Math.PI) / devices - Math.PI / 2;
    return [165 + 100 * Math.cos(a), 145 + 85 * Math.sin(a)];
  });
  return (
    <Lab
      kind="lsl-route-memory-compute-topology"
      title="实验三 · 路线改变资源，不是改变分数"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          目标路线
          <select
            className={control}
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              setTokens(e.target.value === "pretrain" ? 100 : 1);
            }}
          >
            <option value="infer">本地推理</option>
            <option value="sft">全参数SFT</option>
            <option value="pretrain">从零预训练</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          设备数（每卡24 GB）
          <select
            className={control}
            value={devices}
            onChange={(e) => setDevices(Number(e.target.value))}
          >
            {[1, 2, 4, 8].map((n) => (
              <option key={n} value={n}>
                {n}卡
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          处理词元量
          <select
            className={control}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
          >
            <option value={1}>100万</option>
            <option value={100}>1亿</option>
          </select>
        </label>
        <button
          className={control}
          aria-pressed={replicate}
          onClick={() => setReplicate(!replicate)}
        >
          错误复制全部状态：{replicate ? "开" : "关"}
        </button>
      </div>
      <svg
        viewBox="0 0 330 475"
        role="img"
        aria-label={`${devices}卡${replicate ? "复制" : "分片"}拓扑，每卡${perDevice.toFixed(1)}GB模型状态，${oom ? "超出24GB，OOM" : "仅状态可容纳，尚未计入激活"}`}
      >
        <text x="15" y="26" fill={C.ink} fontSize="15">
          7B模型 · {training ? "训练状态环" : "前向推理链"}
        </text>
        {devices > 1 &&
          xy.map(([x, y], i) => {
            if (!training && i === devices - 1) return null;
            const [nx, ny] = xy[(i + 1) % devices];
            return (
              <path
                key={i}
                data-connection={i}
                d={
                  devices === 2
                    ? `M${x} ${y} Q${i === 0 ? 335 : -5} 145 ${nx} ${ny}`
                    : `M${x} ${y} L${nx} ${ny}`
                }
                stroke={C.line}
                strokeWidth="2"
                strokeDasharray={training ? "5 4" : undefined}
              />
            );
          })}
        {xy.map(([x, y], i) => (
          <g key={i} data-device={i}>
            <circle
              cx={x}
              cy={y}
              r="27"
              fill={C.bg}
              stroke={oom ? C.danger : C.accent}
              strokeWidth="2"
            />
            <path
              d={`M${x} ${y} L${x} ${y - 23} A23 23 0 ${replicate || devices === 1 ? 1 : 0} 1 ${x + 23 * Math.sin(2 * Math.PI * (replicate || devices === 1 ? 0.999 : 1 / devices))} ${y - 23 * Math.cos(2 * Math.PI * (replicate || devices === 1 ? 0.999 : 1 / devices))} Z`}
              fill={C.accent}
              opacity="0.28"
            />
            <text
              x={x}
              y={y + 5}
              textAnchor="middle"
              fill={C.ink}
              fontSize="14"
            >
              卡{i}
            </text>
          </g>
        ))}
        <text
          data-topology-caption="true"
          x="165"
          y="145"
          textAnchor="middle"
          fill={C.ink}
          fontSize="15"
        >
          {replicate ? "每卡全量" : `各持1/${devices}`}
        </text>
        <text x="15" y="284" fill={C.muted} fontSize="14">
          扇区=状态份额；连线不代表实测带宽
        </text>
        <text x="15" y="315" fill={C.ink} fontSize="15">
          每卡状态 {perDevice.toFixed(1)} GB
        </text>
        <rect
          x="15"
          y="333"
          width="280"
          height="24"
          fill={C.bg}
          stroke={C.line}
        />
        <rect
          x="15"
          y="333"
          width={Math.min(280, (perDevice / 120) * 280)}
          height="24"
          fill={oom ? C.danger : C.accent}
          opacity="0.7"
        />
        <path d="M71 325 V364" stroke={C.ink} strokeWidth="2" />
        <text x="71" y="388" textAnchor="middle" fill={C.ink} fontSize="14">
          24 GB线
        </text>
        <text x="15" y="422" fill={oom ? C.danger : C.ink} fontSize="15">
          {oom
            ? "OOM：仅模型状态就已超限"
            : training
              ? "状态可放下 ≠ 整次训练能放下"
              : "权重可放下 ≠ 服务一定可运行"}
        </text>
        <text x="15" y="453" fill={C.muted} fontSize="14">
          计算需求 {(flops / 1e15).toFixed(3)} PFLOP
        </text>
      </svg>
      <p
        role="status"
        data-readout="budget"
        className="text-sm leading-relaxed text-secondary"
      >
        {training
          ? goal === "pretrain"
            ? "读第3→2→4章；预训练止于基础模型，指令与对齐再接第5、6章。"
            : "读第3→2→4→5章；对齐再接第6章。"
          : "读第3/2章输入与模型基础→第7章推理→第8章评估，可不走自训练。"}
        {` 状态总量${totalMemory} GB；${training ? "16" : "2"}字节/参数。假设每卡有效60 TFLOP/s、理想线性加速，纯计算时间下界约${seconds.toFixed(2)}秒。`}
        {oom
          ? "当前显存方案不可运行，时间只是未执行的算术估计。"
          : "仍须另算激活、KV缓存、通信缓冲及通信时间；不是实测吞吐或完训承诺。"}
      </p>
      <button
        aria-label="重置资源路线"
        className={`${control} mt-4`}
        onClick={() => {
          setGoal("sft");
          setDevices(4);
          setTokens(1);
          setReplicate(false);
        }}
      >
        重置资源路线
      </button>
    </Lab>
  );
}
