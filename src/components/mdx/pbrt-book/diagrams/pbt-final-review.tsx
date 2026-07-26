import type { ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const auditStages = [
  {
    number: 1,
    title: "像素与相机",
    code: "CameraSample → Ray",
    invariant: "样本权重和波长有来源",
    evidence: "pixel, lens, time, λ, weight",
    color: accent,
  },
  {
    number: 2,
    title: "形状与求交",
    code: "Shape → Primitive → BVH",
    invariant: "最近交点稳健且坐标一致",
    evidence: "tHit, pError, normal, medium",
    color: warning,
  },
  {
    number: 3,
    title: "散射与传输",
    code: "BSDF / Medium / Light",
    invariant: "β、PDF 与测度配套更新",
    evidence: "f, cosθ, Tr, pdf, MIS",
    color: success,
  },
  {
    number: 4,
    title: "积分与成像",
    code: "Integrator → Film",
    invariant: "贡献可追溯、估计可复现",
    evidence: "L, spp, variance, RGB",
    color: danger,
  },
] as const;

export function PbtFinalReviewDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="总复习的主线不是背术语，而是沿一条样本路径核对状态、概率和能量是否始终配套。">
      <svg
        viewBox="0 0 840 320"
        role="img"
        aria-label="从像素与相机、形状与求交、散射与传输到积分与成像的 PBRT 审计主链"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="27"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          一条路径，四组不变量，三类证据
        </text>
        <text x="420" y="49" textAnchor="middle" fontSize="11" fill={secondary}>
          状态来自哪里 · 物理量如何变化 · 随机权重为何正确
        </text>
        {auditStages.map((stage, index) => {
          const focused = activeStages.includes(stage.number);
          const x = 16 + index * 207;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="72"
                width="188"
                height="188"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 25} cy="100" r="14" fill={stage.color} />
              <text
                x={x + 25}
                y="105"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 47}
                y="105"
                fontSize="13"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 13}
                y="124"
                width="162"
                height="36"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 94}
                y="147"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {stage.code}
              </text>
              <text x={x + 15} y="184" fontSize="11" fill={secondary}>
                不变量
              </text>
              <text
                x={x + 15}
                y="203"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {stage.invariant}
              </text>
              <text x={x + 15} y="228" fontSize="11" fill={secondary}>
                证据 · {stage.evidence}
              </text>
            </g>
          );
        })}
        {[204, 411, 618].map((x) => (
          <path
            key={x}
            d={`M${x} 166 H${x + 18} M${x + 11} 159 L${x + 19} 166 L${x + 11} 173`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="420"
          y="293"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          任一阶段若无法回答“数值、单位、坐标系、PDF 从哪里来”，路径账本就不闭合
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          一条路径的四段审计
        </p>
        {auditStages.map((stage) => {
          const focused = activeStages.includes(stage.number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{
                borderColor: stage.color,
                opacity: focused ? 1 : 0.32,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {stage.number}. {stage.title}
                </strong>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{stage.invariant}</p>
              <p className="mt-1 text-xs text-secondary">{stage.evidence}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const spineRows = [
  {
    range: "1–4",
    title: "语言与数学",
    chapters: "导论 · 蒙特卡洛 · 几何变换 · 辐射度量/光谱/颜色",
    check: "量、坐标与估计量定义完整",
    color: accent,
  },
  {
    range: "5–8",
    title: "生成与相交",
    chapters: "相机/Film · Shapes · Primitive/BVH · 采样/重建",
    check: "ray 与 sample 能稳健进入场景",
    color: warning,
  },
  {
    range: "9–12",
    title: "局部散射",
    chapters: "反射模型 · 纹理/材质 · 体积散射 · 光源",
    check: "局部模型守恒且可采样",
    color: success,
  },
  {
    range: "13–16",
    title: "全局求解与反思",
    chapters: "光传输 I/II · GPU 波前 · 回顾与未来",
    check: "路径估计、实现与设计取舍一致",
    color: danger,
  },
] as const;

export function PbtBookSpineDiagram() {
  return (
    <DiagramFrame caption="PBRT 第 4 版的 16 章形成四层依赖：后层消费前层定义的量、接口和概率约定。">
      <svg
        viewBox="0 0 840 345"
        role="img"
        aria-label="PBRT 第四版 16 个正式章节组成的四层知识脊柱"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          16 章不是目录清单，而是逐层收紧的契约
        </text>
        {spineRows.map((row, index) => {
          const y = 58 + index * 65;
          return (
            <g key={row.range}>
              <rect
                x="22"
                y={y}
                width="796"
                height="52"
                rx="8"
                fill={row.color}
                fillOpacity="0.07"
                stroke={row.color}
                strokeOpacity="0.65"
              />
              <rect
                x="35"
                y={y + 9}
                width="58"
                height="34"
                rx="6"
                fill={row.color}
              />
              <text
                x="64"
                y={y + 31}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {row.range}
              </text>
              <text
                x="112"
                y={y + 22}
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {row.title}
              </text>
              <text x="112" y={y + 40} fontSize="11" fill={secondary}>
                {row.chapters}
              </text>
              <text
                x="798"
                y={y + 31}
                textAnchor="end"
                fontSize="11"
                fontWeight="600"
                fill={row.color}
              >
                {row.check}
              </text>
            </g>
          );
        })}
        <path
          d="M420 310 V330 M414 323 L420 331 L426 323"
          fill="none"
          stroke={border}
          strokeWidth="2"
        />
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          PBRT 第 4 版 16 章脊柱
        </p>
        {spineRows.map((row) => (
          <div
            key={row.range}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: row.color }}
          >
            <div className="flex items-center gap-3">
              <strong style={{ color: row.color }}>{row.range}</strong>
              <strong className="text-sm text-primary">{row.title}</strong>
            </div>
            <p className="mt-2 text-xs text-secondary">{row.chapters}</p>
            <p className="mt-1 text-xs font-medium text-primary">{row.check}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const ledgerRows = [
  ["相机样本", "w_c, ray, λ", "相机响应与样本 PDF"],
  ["路径吞吐", "β ← β · f |cosθ| / p", "BSDF 与方向 PDF 同测度"],
  ["介质段", "β ← β · T_r / p_t", "透射率、自由飞行与零碰撞"],
  ["光源连接", "L += β · L_e · G · V · w", "光源/BSDF PDF 与 MIS"],
  ["成像累积", "Film::AddSample(p, L, w_c)", "滤波、光谱到输出 RGB"],
] as const;

export function PbtPathLedgerDiagram() {
  return (
    <DiagramFrame caption="路径贡献必须像账本一样可追溯：每次乘法都同时记录物理因子、抽样概率与测度。">
      <svg
        viewBox="0 0 840 350"
        role="img"
        aria-label="从相机样本、路径吞吐、介质段、光源连接到 Film 累积的路径贡献账本"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          单条路径贡献账本
        </text>
        <text x="30" y="63" fontSize="11" fill={secondary}>
          阶段
        </text>
        <text x="190" y="63" fontSize="11" fill={secondary}>
          状态更新
        </text>
        <text x="525" y="63" fontSize="11" fill={secondary}>
          必须同时保留的证据
        </text>
        {ledgerRows.map((row, index) => {
          const y = 76 + index * 49;
          const color = [accent, warning, success, danger, accent][index];
          return (
            <g key={row[0]}>
              <rect
                x="22"
                y={y}
                width="796"
                height="38"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="43" cy={y + 19} r="7" fill={color} />
              <text
                x="61"
                y={y + 24}
                fontSize="11.5"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="190"
                y={y + 24}
                fontSize="11"
                fontFamily="monospace"
                fill={primary}
              >
                {row[1]}
              </text>
              <text x="525" y={y + 24} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="337"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={danger}
        >
          只有亮度，没有 PDF、测度和状态来源，就不能证明估计量正确
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          单条路径贡献账本
        </p>
        {ledgerRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">
              {index + 1}. {row[0]}
            </strong>
            <p className="mt-2 break-words font-mono text-[11px] text-primary">
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

export function PbtShapeRobustnessDiagram() {
  const mobileRows = [
    [
      "共享三角网格",
      "位置数组 + 每三角形索引；Triangle 只保存 meshIndex 与 triIndex",
    ],
    ["稳健求交", "边函数与高精度回退避免共享边漏光，并返回 tHit 与重心坐标"],
    ["误差边界", "由计算过程传播 pError，而不是猜一个全局 epsilon"],
    ["射线偏移", "OffsetRayOrigin 把新原点移到误差盒之外，再沿法线定向"],
  ] as const;

  return (
    <DiagramFrame caption="Shapes 不只是几何接口：紧凑网格、watertight 求交、误差传播与射线偏移共同阻止裂缝和自相交。">
      <svg
        viewBox="0 0 840 365"
        role="img"
        aria-label="三角网格共享顶点、稳健求交、交点误差盒和 OffsetRayOrigin 的形状稳健性链路"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          从共享网格到不自相交的新射线
        </text>
        <g transform="translate(30 74)">
          <rect
            width="180"
            height="210"
            rx="8"
            fill={accent}
            fillOpacity="0.07"
            stroke={accent}
          />
          <text
            x="90"
            y="26"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            共享三角网格
          </text>
          <path
            d="M34 157 L89 55 L146 157 Z M34 157 L119 116 L146 157 M89 55 L119 116"
            fill="none"
            stroke={primary}
            strokeWidth="2"
          />
          {[
            [34, 157],
            [89, 55],
            [146, 157],
            [119, 116],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={warning} />
          ))}
          <text
            x="90"
            y="188"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            positions[] + indices[]
          </text>
          <text
            x="90"
            y="204"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Triangle: meshIndex, triIndex
          </text>
        </g>
        <g transform="translate(230 74)">
          <rect
            width="180"
            height="210"
            rx="8"
            fill={warning}
            fillOpacity="0.07"
            stroke={warning}
          />
          <text
            x="90"
            y="26"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={warning}
          >
            Watertight 求交
          </text>
          <path
            d="M33 155 L90 55 L147 155 Z"
            fill="none"
            stroke={primary}
            strokeWidth="2"
          />
          <path d="M90 42 V120" stroke={danger} strokeWidth="2" />
          <path
            d="M84 112 L90 121 L96 112"
            fill="none"
            stroke={danger}
            strokeWidth="2"
          />
          <circle cx="90" cy="96" r="6" fill={success} />
          <text
            x="90"
            y="181"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            edge functions + fallback
          </text>
          <text
            x="90"
            y="199"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            tHit · barycentrics · normal
          </text>
        </g>
        <g transform="translate(430 74)">
          <rect
            width="180"
            height="210"
            rx="8"
            fill={success}
            fillOpacity="0.07"
            stroke={success}
          />
          <text
            x="90"
            y="26"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={success}
          >
            交点误差盒
          </text>
          <rect
            x="57"
            y="73"
            width="66"
            height="66"
            fill={success}
            fillOpacity="0.08"
            stroke={success}
            strokeDasharray="5 4"
          />
          <circle cx="90" cy="106" r="6" fill={primary} />
          <line
            x1="36"
            y1="139"
            x2="145"
            y2="139"
            stroke={primary}
            strokeWidth="2"
          />
          <text
            x="90"
            y="169"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={primary}
          >
            pError = γ(7) · pAbsSum
          </text>
          <text
            x="90"
            y="195"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            不是固定 ray epsilon
          </text>
        </g>
        <g transform="translate(630 74)">
          <rect
            width="180"
            height="210"
            rx="8"
            fill={danger}
            fillOpacity="0.07"
            stroke={danger}
          />
          <text
            x="90"
            y="26"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            OffsetRayOrigin
          </text>
          <rect
            x="42"
            y="91"
            width="58"
            height="54"
            fill={danger}
            fillOpacity="0.05"
            stroke={danger}
            strokeDasharray="5 4"
          />
          <line
            x1="25"
            y1="145"
            x2="150"
            y2="145"
            stroke={primary}
            strokeWidth="2"
          />
          <circle cx="100" cy="91" r="6" fill={success} />
          <path
            d="M100 91 L145 52 M136 53 L146 51 L142 61"
            fill="none"
            stroke={success}
            strokeWidth="2"
          />
          <text
            x="90"
            y="175"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            原点移出误差盒
          </text>
          <text
            x="90"
            y="195"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            方向决定法线侧
          </text>
        </g>
        {[210, 410, 610].map((x) => (
          <path
            key={x}
            d={`M${x} 179 H${x + 20} M${x + 13} 172 L${x + 21} 179 L${x + 13} 186`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="420"
          y="330"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          变换到渲染空间后统一求交；误差由运算传播，偏移由误差边界决定
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          形状稳健性四步链
        </p>
        {mobileRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">
              {index + 1}. {row[0]}
            </strong>
            <p className="mt-2 text-xs text-secondary">{row[1]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const retrospectiveRows = [
  {
    era: "1e → 2e",
    pressure: "教学覆盖与 CPU",
    choice: "路径追踪早已存在，但并非默认主角",
    evidence: "算法选择随目标而变",
    color: accent,
  },
  {
    era: "3e",
    pressure: "多核、光谱与现代 PBR",
    choice: "路径追踪成为默认积分器",
    evidence: "默认值也有历史条件",
    color: warning,
  },
  {
    era: "4e",
    pressure: "GPU throughput 与异构硬件",
    choice: "wavefront 队列重塑执行架构",
    evidence: "物理模型与调度结构分离",
    color: success,
  },
  {
    era: "未来",
    pressure: "逆向渲染与可微优化",
    choice: "由图像联合反推形状、材质和照明",
    evidence: "单图解释不唯一，需要多观测约束",
    color: danger,
  },
] as const;

export function PbtRetrospectiveDiagram() {
  return (
    <DiagramFrame caption="回顾不是庆功时间线：硬件、研究问题和教学目标变化，会让同一物理模型需要不同的软件架构。">
      <svg
        viewBox="0 0 840 340"
        role="img"
        aria-label="PBRT 各版设计取舍、硬件压力与逆向渲染未来方向的回顾时间线"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          回顾版本，是为了识别设计的适用条件
        </text>
        <line
          x1="75"
          y1="95"
          x2="765"
          y2="95"
          stroke={border}
          strokeWidth="3"
        />
        {retrospectiveRows.map((row, index) => {
          const x = 75 + index * 230;
          return (
            <g key={row.era}>
              <circle cx={x} cy="95" r="11" fill={row.color} />
              <text
                x={x}
                y="67"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={row.color}
              >
                {row.era}
              </text>
              <rect
                x={x - 83}
                y="122"
                width="166"
                height="145"
                rx="8"
                fill={row.color}
                fillOpacity="0.07"
                stroke={row.color}
              />
              <text
                x={x}
                y="148"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                外部压力
              </text>
              <text
                x={x}
                y="167"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {row.pressure}
              </text>
              <text
                x={x}
                y="196"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                设计取舍
              </text>
              <text
                x={x}
                y="216"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {row.choice}
              </text>
              <text
                x={x}
                y="247"
                textAnchor="middle"
                fontSize="11"
                fill={row.color}
              >
                {row.evidence}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="311"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          比较方案时同时写明：目标函数、硬件、数据规模、误差预算与维护成本
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          版本、硬件与研究问题
        </p>
        {retrospectiveRows.map((row) => (
          <div
            key={row.era}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: row.color }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong style={{ color: row.color }}>{row.era}</strong>
              <span className="text-xs text-secondary">{row.pressure}</span>
            </div>
            <p className="mt-2 text-xs font-medium text-primary">
              {row.choice}
            </p>
            <p className="mt-1 text-xs text-secondary">{row.evidence}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
