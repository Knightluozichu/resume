"use client";

import { useState } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = secondary,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2 - 10}
        y2={y2}
        stroke={color}
        strokeWidth="1.6"
      />
      <polygon
        points={`${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`}
        fill={color}
      />
    </g>
  );
}

/** 总览图：从数学更新到可复核的泛化证据。 */
export function MglMachineLearningDiagram() {
  const stages = [
    { title: "学习问题", detail: "时点 · 输入 · 代价", color: accent },
    { title: "数据边界", detail: "采样 · 切分 · 泄漏", color: success },
    { title: "模型优化", detail: "矩阵 · 损失 · 梯度", color: warning },
    { title: "泛化评估", detail: "未见数据 · 漂移", color: danger },
  ];

  return (
    <Frame
      ariaLabel="机器学习证据链：先定义学习问题和错误代价，再建立数据边界，使用矩阵和梯度优化模型，最后在未见数据和生产分布上评估泛化。"
      caption="机器学习交付不是训练分数，而是从问题定义到泛化证据的完整链路。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        从数学工具到机器学习证据
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        微分给方向，差分查实现，数据边界决定评估是否可信
      </text>
      {stages.map((stage, index) => {
        const x = 24 + index * 174;
        return (
          <g key={stage.title}>
            <rect
              x={x}
              y="88"
              width="150"
              height="82"
              rx="9"
              fill={stage.color}
              fillOpacity="0.09"
              stroke={stage.color}
              strokeWidth="1.2"
            />
            <text
              x={x + 75}
              y="119"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={stage.color}
            >
              {stage.title}
            </text>
            <text
              x={x + 75}
              y="145"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {stage.detail}
            </text>
            {index < stages.length - 1 ? (
              <Arrow x1={x + 153} y1={129} x2={x + 171} y2={129} />
            ) : null}
          </g>
        );
      })}
      <rect
        x="38"
        y="218"
        width="196"
        height="92"
        rx="8"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="136"
        y="245"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={accent}
      >
        数学表示
      </text>
      <text x="136" y="269" textAnchor="middle" fontSize="11" fill={primary}>
        Xθ · 残差 · ∇L
      </text>
      <text x="136" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        函数、差分与矩阵
      </text>
      <rect
        x="262"
        y="218"
        width="196"
        height="92"
        rx="8"
        fill={warning}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="245"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        实现检查
      </text>
      <text x="360" y="269" textAnchor="middle" fontSize="11" fill={primary}>
        有限差分 · 形状 · 数值
      </text>
      <text x="360" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        训练曲线不是唯一证据
      </text>
      <rect
        x="486"
        y="218"
        width="196"
        height="92"
        rx="8"
        fill={success}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="584"
        y="245"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={success}
      >
        独立评估
      </text>
      <text x="584" y="269" textAnchor="middle" fontSize="11" fill={primary}>
        验证 · 测试 · 时间切片
      </text>
      <text x="584" y="291" textAnchor="middle" fontSize="11" fill={secondary}>
        分布漂移与错误代价
      </text>
      <rect
        x="42"
        y="348"
        width="636"
        height="50"
        rx="8"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
        strokeOpacity="0.55"
      />
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={danger}
      >
        高训练分数只说明模型看过训练数据
      </text>
      <text x="360" y="389" textAnchor="middle" fontSize="11" fill={secondary}>
        可靠结论还要通过未见数据、真实时间边界和上线监控
      </text>
    </Frame>
  );
}

/** 数据图：把预测时点和三份数据职责放在一条时间线上。 */
export function MglMachineLearningDataDiagram() {
  const sets = [
    {
      title: "训练",
      detail: "拟合参数\n拟合预处理",
      color: success,
      x: 70,
      width: 250,
    },
    {
      title: "验证",
      detail: "选超参数\n定阈值与停止",
      color: warning,
      x: 320,
      width: 170,
    },
    {
      title: "测试",
      detail: "方案冻结后\n估计泛化",
      color: danger,
      x: 490,
      width: 160,
    },
  ];
  return (
    <Frame
      ariaLabel="机器学习数据边界图：预测时点前可用的信息进入训练、验证和测试流程，测试集在方案冻结后只用于最终估计，未来信息不能越过预测边界。"
      caption="数据集的职责不同；预测时点之后的信息不能穿越边界进入特征。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        先画时间边界，再切数据
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每一列特征都要回答：预测发生时真的可获得吗？
      </text>
      <line
        x1="70"
        y1="106"
        x2="650"
        y2="106"
        stroke={border}
        strokeWidth="2"
      />
      <circle cx="150" cy="106" r="7" fill={accent} />
      <circle cx="415" cy="106" r="7" fill={accent} />
      <circle cx="610" cy="106" r="7" fill={accent} />
      <text x="150" y="88" textAnchor="middle" fontSize="11" fill={primary}>
        历史样本
      </text>
      <text x="415" y="88" textAnchor="middle" fontSize="11" fill={primary}>
        预测时点
      </text>
      <text x="610" y="88" textAnchor="middle" fontSize="11" fill={danger}>
        未来标签
      </text>
      <line
        x1="415"
        y1="118"
        x2="415"
        y2="184"
        stroke={danger}
        strokeDasharray="5 4"
        strokeWidth="1.5"
      />
      <text x="427" y="157" fontSize="11" fill={danger}>
        不可回看
      </text>
      {sets.map((item) => (
        <g key={item.title}>
          <rect
            x={item.x}
            y="204"
            width={item.width}
            height="86"
            rx="9"
            fill={item.color}
            fillOpacity="0.08"
            stroke={item.color}
          />
          <text
            x={item.x + item.width / 2}
            y="232"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={item.color}
          >
            {item.title}集
          </text>
          {item.detail.split("\n").map((line, index) => (
            <text
              key={line}
              x={item.x + item.width / 2}
              y={258 + index * 20}
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              {line}
            </text>
          ))}
        </g>
      ))}
      <rect
        x="54"
        y="334"
        width="612"
        height="56"
        rx="8"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="357"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={accent}
      >
        同一主体分组、时间切分和预处理统计量都属于数据边界
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="11" fill={secondary}>
        把测试行或未来信息提前带入，会制造看似可信的高分
      </text>
    </Frame>
  );
}

/** 梯度图：显示二次损失的等高线、负梯度方向和有限差分检查。 */
export function MglMachineLearningGradientDiagram() {
  const contourRadii = [126, 98, 70, 42];
  return (
    <Frame
      ariaLabel="梯度下降图：二次损失的椭圆等高线中，参数沿负梯度方向从当前位置移动；有限差分在参数两侧取样检查解析梯度。"
      caption="梯度给出局部方向，有限差分检查实现；学习率决定更新是否稳定。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        一次更新：方向、步长与检查
      </text>
      <text x="360" y="55" textAnchor="middle" fontSize="12" fill={secondary}>
        等高线越靠中心损失越小，但一次下降不等于全局保证
      </text>
      {contourRadii.map((radius, index) => (
        <ellipse
          key={radius}
          cx="245"
          cy="220"
          rx={radius}
          ry={radius * 0.55}
          fill="none"
          stroke={index === contourRadii.length - 1 ? success : accent}
          strokeOpacity={0.28 + index * 0.12}
          strokeWidth="1.4"
        />
      ))}
      <circle cx="245" cy="220" r="7" fill={success} />
      <text x="245" y="273" textAnchor="middle" fontSize="11" fill={success}>
        较小损失
      </text>
      <circle cx="414" cy="128" r="7" fill={danger} />
      <text x="414" y="113" textAnchor="middle" fontSize="11" fill={danger}>
        θₜ
      </text>
      <Arrow x1={407} y1={137} x2={272} y2={205} color={warning} />
      <text x="348" y="164" textAnchor="middle" fontSize="11" fill={warning}>
        −∇L
      </text>
      <rect
        x="486"
        y="92"
        width="194"
        height="104"
        rx="8"
        fill={warning}
        fillOpacity="0.07"
        stroke={warning}
      />
      <text
        x="583"
        y="119"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={warning}
      >
        步长 η
      </text>
      <text x="583" y="145" textAnchor="middle" fontSize="11" fill={primary}>
        过大：震荡或发散
      </text>
      <text x="583" y="168" textAnchor="middle" fontSize="11" fill={primary}>
        过小：进展缓慢
      </text>
      <rect
        x="54"
        y="322"
        width="612"
        height="66"
        rx="8"
        fill={accent}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="347"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={accent}
      >
        有限差分：L(θ+εeⱼ) 与 L(θ−εeⱼ)
      </text>
      <text x="360" y="370" textAnchor="middle" fontSize="11" fill={secondary}>
        ε 过大有截断误差，过小放大舍入误差；比较相对误差而非逐位相等
      </text>
    </Frame>
  );
}

/** 网络图：把前向表示和反向链式法则放在同一张图上。 */
export function MglMachineLearningNetworkDiagram() {
  const layers = [
    { title: "输入 x", detail: "特征向量", x: 70, color: accent },
    { title: "线性层", detail: "Wh+b", x: 218, color: warning },
    { title: "激活 φ", detail: "非线性表示", x: 366, color: success },
    { title: "输出", detail: "预测与损失", x: 514, color: danger },
  ];
  return (
    <Frame
      ariaLabel="神经网络计算图：输入经过线性层和非线性激活得到输出与损失，反向传播沿相反方向应用链式法则复用中间量计算参数梯度。"
      caption="表达能力来自非线性复合；反向传播是链式法则的高效组织。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        前向表达，反向求导
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        每条边都携带张量形状；每个中间量都服务于链式法则
      </text>
      {layers.map((layer, index) => (
        <g key={layer.title}>
          <rect
            x={layer.x}
            y="106"
            width="126"
            height="82"
            rx="9"
            fill={layer.color}
            fillOpacity="0.09"
            stroke={layer.color}
          />
          <text
            x={layer.x + 63}
            y="137"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={layer.color}
          >
            {layer.title}
          </text>
          <text
            x={layer.x + 63}
            y="163"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            {layer.detail}
          </text>
          {index < layers.length - 1 ? (
            <Arrow x1={layer.x + 129} y1={147} x2={layer.x + 145} y2={147} />
          ) : null}
        </g>
      ))}
      <line
        x1="577"
        y1="205"
        x2="132"
        y2="272"
        stroke={danger}
        strokeDasharray="6 4"
        strokeWidth="1.8"
      />
      <polygon points="132,272 144,264 142,278" fill={danger} />
      <text
        x="360"
        y="249"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={danger}
      >
        反向传播：链式法则
      </text>
      <rect
        x="84"
        y="294"
        width="552"
        height="78"
        rx="9"
        fill={danger}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="321"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={danger}
      >
        表示能力 ≠ 优化成功 ≠ 泛化保证
      </text>
      <text x="360" y="345" textAnchor="middle" fontSize="11" fill={secondary}>
        自动微分仍需检查损失、形状、数值稳定和不可导点约定
      </text>
    </Frame>
  );
}

/** 泛化图：展示安全评估与泄漏后的虚假高分对比。 */
export function MglMachineLearningGeneralizationDiagram() {
  return (
    <Frame
      ariaLabel="泛化评估图：安全流程中训练、验证和测试职责分离；数据泄漏流程把测试或未来信息带进训练，造成虚假的高分。"
      caption="高分只有在数据边界独立、时间顺序正确且指标对应代价时才有解释力。"
    >
      <text
        x="360"
        y="32"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={primary}
      >
        同一个分数，可能对应两条证据链
      </text>
      <text x="360" y="56" textAnchor="middle" fontSize="12" fill={secondary}>
        评估可信度取决于信息是否越过预测边界
      </text>
      <rect
        x="38"
        y="88"
        width="300"
        height="214"
        rx="10"
        fill={success}
        fillOpacity="0.06"
        stroke={success}
      />
      <text
        x="188"
        y="117"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        安全切分
      </text>
      <rect
        x="72"
        y="143"
        width="232"
        height="30"
        rx="6"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
      />
      <text x="188" y="163" textAnchor="middle" fontSize="11" fill={primary}>
        训练：拟合参数
      </text>
      <rect
        x="72"
        y="185"
        width="232"
        height="30"
        rx="6"
        fill={warning}
        fillOpacity="0.16"
        stroke={warning}
      />
      <text x="188" y="205" textAnchor="middle" fontSize="11" fill={primary}>
        验证：选择方案
      </text>
      <rect
        x="72"
        y="227"
        width="232"
        height="30"
        rx="6"
        fill={danger}
        fillOpacity="0.16"
        stroke={danger}
      />
      <text x="188" y="247" textAnchor="middle" fontSize="11" fill={primary}>
        测试：冻结后估计
      </text>
      <text x="188" y="280" textAnchor="middle" fontSize="11" fill={success}>
        0.78：可解释的未见数据表现
      </text>
      <rect
        x="382"
        y="88"
        width="300"
        height="214"
        rx="10"
        fill={danger}
        fillOpacity="0.06"
        stroke={danger}
      />
      <text
        x="532"
        y="117"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={danger}
      >
        泄漏路径
      </text>
      <rect
        x="416"
        y="143"
        width="232"
        height="30"
        rx="6"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
      />
      <text x="532" y="163" textAnchor="middle" fontSize="11" fill={primary}>
        全量预处理或未来特征
      </text>
      <Arrow x1={532} y1={179} x2={532} y2={218} color={danger} />
      <rect
        x="416"
        y="227"
        width="232"
        height="30"
        rx="6"
        fill={danger}
        fillOpacity="0.16"
        stroke={danger}
      />
      <text x="532" y="247" textAnchor="middle" fontSize="11" fill={primary}>
        测试被提前看见
      </text>
      <text x="532" y="280" textAnchor="middle" fontSize="11" fill={danger}>
        0.99：虚假高分，无法上线解释
      </text>
      <rect
        x="55"
        y="334"
        width="610"
        height="56"
        rx="8"
        fill={warning}
        fillOpacity="0.06"
        stroke={border}
      />
      <text
        x="360"
        y="357"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={warning}
      >
        去掉泄漏后重新冻结测试集
      </text>
      <text x="360" y="378" textAnchor="middle" fontSize="11" fill={secondary}>
        再报告基线、时间切片、错误代价和不确定性
      </text>
    </Frame>
  );
}

type ModelMode = "linear" | "flexible";

/** 交互实验：比较模型容量与数据泄漏对三份分数的影响。 */
export function MglMachineLearningLab() {
  const [model, setModel] = useState<ModelMode>("linear");
  const [leak, setLeak] = useState(false);
  const scores = leak
    ? model === "linear"
      ? { train: 0.97, validation: 0.96, test: 0.99 }
      : { train: 0.99, validation: 0.98, test: 0.99 }
    : model === "linear"
      ? { train: 0.82, validation: 0.79, test: 0.78 }
      : { train: 0.98, validation: 0.84, test: 0.8 };
  const bars = [
    { label: "训练", value: scores.train, color: accent },
    { label: "验证", value: scores.validation, color: warning },
    { label: "测试", value: scores.test, color: leak ? danger : success },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="machine-learning-lab"
        className="overflow-hidden rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {(["linear", "flexible"] as ModelMode[]).map((item) => {
            const selected = model === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setModel(item)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary"}`}
              >
                {item === "linear" ? "低容量模型" : "高容量模型"}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={leak}
            onClick={() => setLeak((current) => !current)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${leak ? "border-danger bg-danger/10 text-danger" : "border-border text-secondary"}`}
          >
            {leak ? "关闭泄漏模式" : "注入泄漏模式"}
          </button>
          <button
            type="button"
            onClick={() => {
              setModel("linear");
              setLeak(false);
            }}
            className="min-h-11 rounded-full border border-border px-4 py-2 text-sm text-secondary"
          >
            重置
          </button>
        </div>
        <svg
          viewBox="0 0 720 340"
          role="img"
          aria-label={`机器学习实验：${model === "linear" ? "低容量" : "高容量"}模型，${leak ? "已注入数据泄漏" : "安全切分"}；训练分数 ${scores.train}，验证分数 ${scores.validation}，测试分数 ${scores.test}。`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            分数必须带着数据边界解释
          </text>
          <text
            x="360"
            y="51"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            当前：{model === "linear" ? "低容量模型" : "高容量模型"} ·{" "}
            {leak ? "泄漏模式" : "安全切分"}
          </text>
          <line
            x1="180"
            y1="82"
            x2="180"
            y2="286"
            stroke={border}
            strokeWidth="1.5"
          />
          <line
            x1="180"
            y1="286"
            x2="670"
            y2="286"
            stroke={border}
            strokeWidth="1.5"
          />
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
            <g key={tick}>
              <line
                x1={180 + tick * 450}
                y1="286"
                x2={180 + tick * 450}
                y2="292"
                stroke={border}
              />
              <text
                x={180 + tick * 450}
                y="311"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {tick.toFixed(2)}
              </text>
            </g>
          ))}
          {bars.map((bar, index) => {
            const y = 94 + index * 60;
            return (
              <g key={bar.label}>
                <text
                  x="165"
                  y={y + 23}
                  textAnchor="end"
                  fontSize="12"
                  fontWeight="700"
                  fill={bar.color}
                >
                  {bar.label}
                </text>
                <rect
                  x="198"
                  y={y}
                  width={bar.value * 450}
                  height="32"
                  rx="6"
                  fill={bar.color}
                  fillOpacity="0.18"
                  stroke={bar.color}
                />
                <text
                  x={Math.min(654, 211 + bar.value * 450)}
                  y={y + 21}
                  fontSize="11"
                  fill={primary}
                >
                  {bar.value.toFixed(2)}
                </text>
              </g>
            );
          })}
          <rect x="42" y="322" width="636" height="1" fill={border} />
        </svg>
        <p
          className={`mt-3 text-center text-sm ${leak ? "text-danger" : "text-secondary"}`}
        >
          {leak
            ? "泄漏模式让测试分数失去独立性：先定位信息越界，再谈模型优劣。"
            : "安全切分下，高容量模型的训练分数可以很高，但验证和测试承担独立验收。"}
        </p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        交互实验把模型容量、数据泄漏和三份评估分数放在同一张可复现的证据图上。
      </figcaption>
    </figure>
  );
}
