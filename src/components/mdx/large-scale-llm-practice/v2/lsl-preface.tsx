"use client";

import { useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const button =
  "min-h-11 min-w-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const select =
  "block min-h-11 w-full rounded border border-border bg-[var(--bg)] px-2 text-primary";
const panel =
  "not-prose my-8 rounded-xl border border-border bg-elevated p-3 sm:p-5";
const controls = "grid grid-cols-2 gap-3 text-sm text-secondary";
const tasks = ["翻译", "摘要", "问答", "分类"];

export function LslPrefaceContextContractLab() {
  const [count, setCount] = useState(3);
  const [shared, setShared] = useState(true);
  const [fault, setFault] = useState(false);
  const reset = () => {
    setCount(3);
    setShared(true);
    setFault(false);
  };
  return (
    <section
      className={panel}
      data-visual-kind="lsl-preface-task-model-reuse"
      aria-label="实验一：任务与模型复用拓扑"
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">
        实验一 · 参数共享，指令不共享
      </h3>
      <div className={controls}>
        <label>
          任务数
          <select
            className={select}
            aria-label="任务数"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} 个任务
              </option>
            ))}
          </select>
        </label>
        <label>
          参数组织
          <select
            className={select}
            aria-label="参数组织"
            value={shared ? "shared" : "dedicated"}
            onChange={(e) => setShared(e.target.value === "shared")}
          >
            <option value="shared">共享参数+提示</option>
            <option value="dedicated">一任务一模型</option>
          </select>
        </label>
        <button
          className={button}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：漏任务提示
        </button>
        <button className={button} onClick={reset}>
          重置实验一
        </button>
      </div>
      <svg
        className="mx-auto mt-4 block w-full max-w-[480px]"
        viewBox="0 0 360 390"
        role="img"
        aria-label={`${count}个任务连接${shared ? 1 : count}份模型参数；${fault ? "任务提示缺失，红边表示任务歧义" : "任务提示完整"}`}
        style={{ fontSize: 16, color: C.text }}
      >
        <text x="20" y="24" fill={C.muted}>
          请求 / 任务
        </text>
        <text x="198" y="24" fill={C.muted}>
          参数实体
        </text>
        {tasks.slice(0, count).map((task, i) => {
          const y = 67 + i * 78;
          return (
            <g key={task}>
              <path
                data-edge="task-model"
                d={
                  shared
                    ? `M106 ${y} C170 ${y},170 184,226 184`
                    : `M106 ${y} L226 ${y}`
                }
                fill="none"
                stroke={fault && shared ? C.danger : C.accent}
                strokeWidth="3"
                strokeDasharray={fault && shared ? "6 4" : undefined}
              />
              <circle cx="63" cy={y} r="34" fill={C.bg} stroke={C.border} />
              <text x="63" y={y + 6} textAnchor="middle" fill={C.text}>
                {task}
              </text>
              {!shared && (
                <>
                  <rect
                    x="226"
                    y={y - 27}
                    width="110"
                    height="54"
                    rx="8"
                    fill={C.bg}
                    stroke={C.accent}
                  />
                  <text x="281" y={y + 6} textAnchor="middle" fill={C.text}>
                    θ{i + 1}
                  </text>
                </>
              )}
            </g>
          );
        })}
        {shared && (
          <>
            <circle
              cx="277"
              cy="184"
              r="48"
              fill={C.bg}
              stroke={fault ? C.danger : C.accent}
              strokeWidth="3"
            />
            <text x="277" y="180" textAnchor="middle" fill={C.text}>
              共享 θ
            </text>
            <text x="277" y="203" textAnchor="middle" fill={C.muted}>
              一份参数
            </text>
          </>
        )}
        <text x="20" y="373" fill={fault ? C.danger : C.muted}>
          {fault && shared
            ? "× 内容相同，任务意图无法区分"
            : !shared
              ? "任务路由选择各自独立的参数"
              : "连线携带指令与内容，不复制参数"}
        </text>
      </svg>
      <p className="text-sm text-secondary" role="status">
        {count} 个任务，{shared ? 1 : count} 份参数。
        {fault
          ? "缺少任务提示：同一句输入既可能要求翻译，也可能要求摘要；专用模型仍可从路由识别任务，共享接口则丢失关键信息。补回指令，或点重置恢复。"
          : "图只比较参数复用，不声称共享模型在每项任务上都优于专用模型；提示改变输入，不等于现场训练。"}
      </p>
    </section>
  );
}

export function LslPrefaceComputeTraceLab() {
  const [billions, setBillions] = useState(7);
  const [devices, setDevices] = useState(4);
  const [capacity, setCapacity] = useState(24);
  const [shard, setShard] = useState(true);
  const [fault, setFault] = useState(false);
  const divisor = shard ? devices : 1;
  const base = (billions * 1e9) / 2 ** 30 / divisor;
  const parts = [
    { name: "参数 BF16", bytes: 2 },
    { name: "梯度 BF16", bytes: 2 },
    { name: "主参数 FP32", bytes: 4 },
    { name: "Adam m", bytes: 4 },
    { name: "Adam v", bytes: 4 },
    { name: "激活（假定）", bytes: 0 },
  ].map((p, i) => ({ ...p, value: i === 5 ? 2 : p.bytes * base }));
  const actual = parts.reduce((sum, p) => sum + p.value, 0);
  const reported = fault ? parts[0].value + parts[1].value + 2 : actual;
  const scale = 270 / Math.max(actual, capacity);
  const reset = () => {
    setBillions(7);
    setDevices(4);
    setCapacity(24);
    setShard(true);
    setFault(false);
  };
  let bottom = 338;
  return (
    <section
      className={panel}
      data-visual-kind="lsl-preface-training-byte-stack"
      aria-label="实验二：训练状态字节与设备容量"
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">
        实验二 · 参数能装下，训练未必
      </h3>
      <div className={controls}>
        <label>
          参数量
          <select
            className={select}
            aria-label="参数量"
            value={billions}
            onChange={(e) => setBillions(Number(e.target.value))}
          >
            {[1, 7, 13].map((n) => (
              <option key={n} value={n}>
                {n}B 参数
              </option>
            ))}
          </select>
        </label>
        <label>
          设备数
          <select
            className={select}
            aria-label="设备数"
            value={devices}
            onChange={(e) => setDevices(Number(e.target.value))}
          >
            {[1, 2, 4, 8].map((n) => (
              <option key={n} value={n}>
                {n} 卡
              </option>
            ))}
          </select>
        </label>
        <label>
          每卡容量
          <select
            className={select}
            aria-label="每卡容量"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          >
            {[16, 24, 48].map((n) => (
              <option key={n} value={n}>
                {n} GiB
              </option>
            ))}
          </select>
        </label>
        <label>
          状态放置
          <select
            className={select}
            aria-label="状态放置"
            value={shard ? "shard" : "replica"}
            onChange={(e) => setShard(e.target.value === "shard")}
          >
            <option value="shard">理想全分片</option>
            <option value="replica">每卡完整复制</option>
          </select>
        </label>
        <button
          className={button}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：漏算优化器
        </button>
        <button className={button} onClick={reset}>
          重置实验二
        </button>
      </div>
      <svg
        className="mx-auto mt-4 block w-full max-w-[480px]"
        viewBox="0 0 360 405"
        role="img"
        aria-label={`每卡训练状态堆栈实际${actual.toFixed(2)}GiB，容量${capacity}GiB；${fault ? "虚线为漏算的主参数和优化器状态" : "全部状态计入"}`}
        style={{ fontSize: 16 }}
      >
        <text x="20" y="25" fill={C.text}>
          每卡 GiB（非 GB）
        </text>
        {parts.map((p, i) => {
          const h = p.value * scale;
          bottom -= h;
          const omitted = fault && i >= 2 && i <= 4;
          return (
            <g key={p.name}>
              <rect
                data-stack={p.name}
                x="38"
                y={bottom}
                width="96"
                height={h}
                fill={omitted ? C.bg : C.accent}
                fillOpacity={omitted ? 1 : 0.22 + i * 0.12}
                stroke={omitted ? C.danger : C.text}
                strokeWidth="1"
                strokeDasharray={omitted ? "5 3" : undefined}
              />
              <rect
                x="160"
                y={75 + i * 36}
                width="12"
                height="18"
                fill={omitted ? C.bg : C.accent}
                fillOpacity={omitted ? 1 : 0.22 + i * 0.12}
                stroke={omitted ? C.danger : C.border}
              />
              <text x="180" y={90 + i * 36} fill={C.text}>
                {p.name}
              </text>
            </g>
          );
        })}
        <line
          data-capacity="true"
          x1="22"
          x2="146"
          y1={338 - capacity * scale}
          y2={338 - capacity * scale}
          stroke={actual > capacity ? C.danger : C.text}
          strokeWidth="2"
        />
        <text x="20" y="365" fill={actual > capacity ? C.danger : C.text}>
          容量 {capacity} / 实需 {actual.toFixed(2)} GiB
        </text>
        <text x="20" y="391" fill={C.muted}>
          {fault
            ? "虚线也占内存，不是释放的空间"
            : "堆叠高度 = 训练状态 + 激活"}
        </text>
      </svg>
      <p className="text-sm text-secondary" role="status">
        账面 {reported.toFixed(2)} GiB；实际 {actual.toFixed(2)} GiB / 卡，
        {actual > capacity ? "超过容量" : "仅在 toy 假设下可容纳"}。
        {fault
          ? "账面删掉了 FP32 主参数及 Adam 的 m/v；实际堆栈不消失。"
          : "全状态分片才按卡数平分；完整复制增加卡数不会减少每卡状态。"}
      </p>
      <p className="mt-2 text-sm text-secondary">
        Toy：B = 10⁹ 参数；1 GiB = 2³⁰ 字节。每参数 2+2+4+4+4=16
        字节，激活固定每卡 2
        GiB。不计通信缓冲、碎片、临时张量；不模拟通信或真实设备。
      </p>
    </section>
  );
}

export function LslPrefaceEvidenceGateLab() {
  const [x, setX] = useState(1);
  const [rate, setRate] = useState(1);
  const [after, setAfter] = useState(false);
  const [fault, setFault] = useState(false);
  const gradient = (fault ? 0.5 : -0.5) * x;
  const w = after ? -rate * gradient : 0;
  const logit = w * x;
  const p = 1 / (1 + Math.exp(-logit));
  const loss = Math.log1p(Math.exp(-logit));
  const px = (v: number) => 36 + ((v + 2) / 4) * 288;
  const py = (v: number) => 374 - (v / 4.4) * 130;
  const curve = Array.from({ length: 81 }, (_, i) => {
    const v = -2 + i / 20;
    return `${i === 0 ? "M" : "L"}${px(v)} ${py(Math.log1p(Math.exp(-v * x)))}`;
  }).join(" ");
  const reset = () => {
    setX(1);
    setRate(1);
    setAfter(false);
    setFault(false);
  };
  return (
    <section
      className={panel}
      data-visual-kind="lsl-preface-formula-tensor-step"
      aria-label="实验三：公式与中间张量对应"
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">
        实验三 · 从损失到一个参数的更新
      </h3>
      <div className={controls}>
        <label>
          输入特征 x
          <select
            className={select}
            aria-label="输入特征"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>
        <label>
          学习率 η
          <select
            className={select}
            aria-label="学习率"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            <option value={0.5}>0.5</option>
            <option value={1}>1</option>
          </select>
        </label>
        <button
          className={button}
          aria-pressed={after}
          onClick={() => setAfter(!after)}
        >
          {after ? "查看更新前" : "执行一步更新"}
        </button>
        <button
          className={button}
          aria-pressed={fault}
          onClick={() => setFault(!fault)}
        >
          故障：标签反置
        </button>
        <button className={`${button} col-span-2`} onClick={reset}>
          重置实验三
        </button>
      </div>
      <svg
        className="mx-auto mt-4 block w-full max-w-[480px]"
        viewBox="0 0 360 420"
        role="img"
        aria-label={`两词词表猫和狗，logits为${logit.toFixed(2)}和0；猫概率${p.toFixed(3)}，目标猫损失${loss.toFixed(4)}；下图为参数与损失曲线`}
        style={{ fontSize: 16 }}
      >
        <text x="20" y="25" fill={C.text}>
          h=[{x}] → z=[{logit.toFixed(2)}, 0]
        </text>
        <text x="20" y="53" fill={C.muted}>
          p = softmax(z) · 目标：猫
        </text>
        {[
          { name: "猫", p },
          { name: "狗", p: 1 - p },
        ].map((item, i) => (
          <g key={item.name}>
            <text
              x="20"
              y={89 + i * 47}
              fill={fault && item.name === "狗" ? C.danger : C.text}
            >
              {item.name}
            </text>
            <rect
              x="55"
              y={69 + i * 47}
              width="210"
              height="28"
              fill={C.bg}
              stroke={C.border}
            />
            <rect
              data-probability={item.name}
              x="55"
              y={69 + i * 47}
              width={210 * item.p}
              height="28"
              fill={fault ? C.danger : C.accent}
            />
            <text x="277" y={89 + i * 47} fill={C.text}>
              {item.p.toFixed(3)}
            </text>
          </g>
        ))}
        <text x="20" y="182" fill={C.text}>
          ∂L/∂w（起点）= {gradient.toFixed(2)}
        </text>
        <text x="20" y="210" fill={fault ? C.danger : C.muted}>
          {fault
            ? "训练标签=狗；下图仍检验目标猫"
            : "训练标签=猫；下图检验同一目标"}
        </text>
        <line x1="36" y1="239" x2="36" y2="374" stroke={C.muted} />
        <line x1="36" y1="374" x2="330" y2="374" stroke={C.muted} />
        <text x="20" y="238" fill={C.muted}>
          L
        </text>
        <text x="337" y="380" fill={C.muted}>
          w
        </text>
        <path
          data-loss-curve="true"
          d={curve}
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx={px(0)} cy={py(Math.log(2))} r="5" fill={C.muted} />
        {after && (
          <line
            data-update="true"
            x1={px(0)}
            y1={py(Math.log(2))}
            x2={px(w)}
            y2={py(loss)}
            stroke={fault ? C.danger : C.text}
            strokeWidth="3"
          />
        )}
        <circle
          data-current="true"
          cx={px(w)}
          cy={py(loss)}
          r="7"
          fill={fault ? C.danger : C.text}
        />
        {[-2, 0, 2].map((n) => (
          <text key={n} x={px(n)} y="396" textAnchor="middle" fill={C.muted}>
            {n}
          </text>
        ))}
      </svg>
      <p className="text-sm text-secondary" role="status">
        w = {w.toFixed(2)}，p(猫) = {p.toFixed(6)}，目标猫的 L ={" "}
        {loss.toFixed(6)}。
        {fault
          ? "标签反置使更新向左，训练的狗标签 loss 可以下降，但目标猫的 loss 上升。改正标签并回到更新前比较。"
          : "初始 w=0，每次只从此起点计算一步 SGD；不是连续累积训练。"}
      </p>
      <p className="mt-2 text-sm text-secondary">
        独立标量模型，词表仅「猫/狗」，不是语言模型训练复现。曲线固定检验目标猫，因此能显出标签错误。
      </p>
    </section>
  );
}
