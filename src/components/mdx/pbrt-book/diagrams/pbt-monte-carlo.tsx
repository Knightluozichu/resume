const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

const stages = [
  {
    title: "估计量",
    subtitle: "样本值除以采样密度",
    formula: "f(X) / p(X)",
    result: "期望等于积分",
    color: accent,
  },
  {
    title: "降方差",
    subtitle: "让样本覆盖高贡献区域",
    formula: "分层 + 重要性 + MIS",
    result: "同预算更干净",
    color: success,
  },
  {
    title: "控成本",
    subtitle: "低吞吐路径概率终止",
    formula: "存活则除以 q",
    result: "保持无偏",
    color: warning,
  },
] as const;

export function PbtMonteCarloDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label="蒙特卡洛积分从构造无偏估计量、降低方差到用俄罗斯轮盘赌控制成本的三阶段流程"
          className="mx-auto hidden h-auto w-full max-w-[760px] md:block"
        >
          <text
            x="380"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            一条样本如何变成一个可信的像素贡献
          </text>
          <text
            x="380"
            y="49"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            高亮阶段会随 Stepper 推进；其余阶段保留为上下文
          </text>

          {stages.map((stage, index) => {
            const stageNumber = (index + 1) as 1 | 2 | 3;
            const focused = step === 0 || step === stageNumber;
            const x = 30 + index * 245;

            return (
              <g key={stage.title} opacity={focused ? 1 : 0.28}>
                <rect
                  x={x}
                  y="78"
                  width="210"
                  height="170"
                  rx="8"
                  fill={stage.color}
                  fillOpacity={focused ? 0.1 : 0.03}
                  stroke={stage.color}
                  strokeWidth={focused && step !== 0 ? 2.5 : 1.2}
                />
                <circle cx={x + 28} cy="106" r="14" fill={stage.color} />
                <text
                  x={x + 28}
                  y="111"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {stageNumber}
                </text>
                <text
                  x={x + 52}
                  y="111"
                  fontSize="14"
                  fontWeight="700"
                  fill={primary}
                >
                  {stage.title}
                </text>
                <text x={x + 18} y="139" fontSize="11" fill={secondary}>
                  {stage.subtitle}
                </text>
                <rect
                  x={x + 18}
                  y="157"
                  width="174"
                  height="38"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 105}
                  y="181"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={primary}
                >
                  {stage.formula}
                </text>
                <text
                  x={x + 105}
                  y="224"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={stage.color}
                >
                  {stage.result}
                </text>
              </g>
            );
          })}

          <path d="M240 163 H265" stroke={border} strokeWidth="2" />
          <path d="M485 163 H510" stroke={border} strokeWidth="2" />
          <text
            x="380"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            正确性来自期望，画面质量来自方差，速度来自每份样本预算的使用方式
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            一条样本如何变成可信的像素贡献
          </p>
          {stages.map((stage, index) => {
            const stageNumber = (index + 1) as 1 | 2 | 3;
            const focused = step === 0 || step === stageNumber;

            return (
              <div
                key={stage.title}
                className="rounded-control border bg-bg/40 p-3 transition-opacity"
                style={{
                  borderColor: stage.color,
                  opacity: focused ? 1 : 0.35,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-bg"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stageNumber}
                  </span>
                  <strong className="text-sm text-primary">
                    {stage.title}
                  </strong>
                </div>
                <p className="mt-2 text-xs text-secondary">{stage.subtitle}</p>
                <p className="mt-2 rounded-control border border-border px-2 py-1.5 text-center font-mono text-xs text-primary">
                  {stage.formula}
                </p>
                <p
                  className="mt-2 text-center text-xs font-semibold"
                  style={{ color: stage.color }}
                >
                  {stage.result}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        蒙特卡洛渲染的三项工作：先保证估计量正确，再降低方差，最后控制昂贵路径的成本。
      </figcaption>
    </figure>
  );
}

export function PbtSamplingDistributionDiagram() {
  const uniformSamples = [58, 93, 142, 188, 237, 285, 332];
  const importanceSamples = [184, 205, 219, 232, 243, 254, 276];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label="均匀采样与重要性采样对窄峰函数的覆盖对比"
          className="mx-auto hidden h-auto w-full max-w-[760px] md:block"
        >
          <text
            x="380"
            y="27"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            同样 7 条光线，放在哪里决定噪声
          </text>
          {[0, 1].map((panel) => {
            const x0 = panel === 0 ? 42 : 405;
            const samples = panel === 0 ? uniformSamples : importanceSamples;
            const color = panel === 0 ? warning : success;
            return (
              <g key={panel} transform={`translate(${x0} 0)`}>
                <text
                  x="145"
                  y="58"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={color}
                >
                  {panel === 0 ? "均匀采样" : "重要性采样"}
                </text>
                <line x1="0" y1="260" x2="310" y2="260" stroke={border} />
                <line x1="0" y1="80" x2="0" y2="260" stroke={border} />
                <path
                  d="M0 250 C95 248 130 238 168 205 C190 184 197 104 220 92 C245 105 248 190 270 216 C282 232 296 243 310 248"
                  fill="none"
                  stroke={accent}
                  strokeWidth="3"
                />
                <text
                  x="220"
                  y="82"
                  textAnchor="middle"
                  fontSize="11"
                  fill={accent}
                >
                  高贡献窄峰 f(x)
                </text>
                {samples.map((sample, index) => (
                  <g key={`${panel}-${sample}`}>
                    <line
                      x1={sample}
                      y1="260"
                      x2={sample}
                      y2={
                        panel === 0
                          ? 235 - (index % 2) * 8
                          : 205 - (index % 3) * 12
                      }
                      stroke={color}
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <circle cx={sample} cy="260" r="4" fill={color} />
                  </g>
                ))}
                <text
                  x="155"
                  y="292"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {panel === 0
                    ? "多数样本落在贡献接近 0 的区域"
                    : "PDF 跟随函数形状，样本集中到有效区域"}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="grid gap-4 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            同样 7 条光线，放在哪里决定噪声
          </p>
          {[
            {
              title: "均匀采样",
              color: warning,
              samples: [35, 72, 112, 151, 202, 251, 292],
              note: "多数样本远离高贡献窄峰",
            },
            {
              title: "重要性采样",
              color: success,
              samples: [150, 174, 192, 208, 221, 235, 258],
              note: "PDF 跟随函数，样本集中到有效区域",
            },
          ].map((panel) => (
            <div
              key={panel.title}
              className="rounded-control border border-border bg-bg/30 p-2"
            >
              <p
                className="text-center text-xs font-semibold"
                style={{ color: panel.color }}
              >
                {panel.title}
              </p>
              <svg
                viewBox="0 0 320 160"
                role="img"
                aria-label={`${panel.title}对高贡献窄峰的样本覆盖`}
                className="mt-1 block h-auto w-full"
              >
                <line x1="10" y1="135" x2="310" y2="135" stroke={border} />
                <path
                  d="M10 130 C90 128 125 122 155 103 C175 90 181 36 205 26 C228 39 232 93 252 109 C270 121 292 127 310 130"
                  fill="none"
                  stroke={accent}
                  strokeWidth="3"
                />
                <text
                  x="205"
                  y="18"
                  textAnchor="middle"
                  fontSize="10"
                  fill={accent}
                >
                  高贡献 f(x)
                </text>
                {panel.samples.map((sample, index) => (
                  <g key={sample}>
                    <line
                      x1={sample}
                      y1="135"
                      x2={sample}
                      y2={112 - (index % 3) * 8}
                      stroke={panel.color}
                      strokeDasharray="3 3"
                    />
                    <circle cx={sample} cy="135" r="4" fill={panel.color} />
                  </g>
                ))}
                <text
                  x="160"
                  y="154"
                  textAnchor="middle"
                  fontSize="10"
                  fill={secondary}
                >
                  {panel.note}
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重要性采样不改变期望，只改变样本落点；PDF 选错时反而会制造极亮离群样本。
      </figcaption>
    </figure>
  );
}

export function PbtConvergenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label="蒙特卡洛标准误差按样本数平方根下降，以及降方差方法改变误差曲线常数项"
          className="mx-auto hidden h-auto w-full max-w-[760px] md:block"
        >
          <text
            x="380"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            采样数增加很贵，降低方差更值钱
          </text>
          <line x1="80" y1="235" x2="690" y2="235" stroke={border} />
          <line x1="80" y1="64" x2="80" y2="235" stroke={border} />
          <text
            x="386"
            y="270"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            样本数 N：1 → 4 → 16 → 64
          </text>
          <text
            x="25"
            y="150"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
            transform="rotate(-90 25 150)"
          >
            标准误差
          </text>
          <path
            d="M100 78 C210 116 315 150 430 177 C530 199 610 211 675 218"
            fill="none"
            stroke={warning}
            strokeWidth="3"
          />
          <path
            d="M100 125 C220 157 330 184 440 204 C530 218 612 225 675 229"
            fill="none"
            stroke={success}
            strokeWidth="3"
          />
          <text x="510" y="155" fontSize="12" fontWeight="700" fill={warning}>
            独立均匀采样
          </text>
          <text x="505" y="198" fontSize="12" fontWeight="700" fill={success}>
            分层 / 重要性 / MIS
          </text>
          {[100, 285, 470, 655].map((x, index) => (
            <g key={x}>
              <line x1={x} y1="235" x2={x} y2="241" stroke={border} />
              <text
                x={x}
                y="256"
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
              >
                {[1, 4, 16, 64][index]}
              </text>
            </g>
          ))}
          <rect
            x="105"
            y="86"
            width="222"
            height="42"
            rx="6"
            fill={elevated}
            stroke={border}
          />
          <text
            x="216"
            y="104"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            4 倍样本 → 标准误差约减半
          </text>
          <text
            x="216"
            y="119"
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            降方差是在同一 N 下整体压低曲线
          </text>
        </svg>
        <svg
          viewBox="0 0 340 270"
          role="img"
          aria-label="移动端蒙特卡洛误差收敛曲线"
          className="mx-auto block h-auto w-full md:hidden"
        >
          <text
            x="170"
            y="20"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={primary}
          >
            4 倍样本，标准误差约减半
          </text>
          <line x1="46" y1="220" x2="322" y2="220" stroke={border} />
          <line x1="46" y1="44" x2="46" y2="220" stroke={border} />
          <text
            x="14"
            y="135"
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
            transform="rotate(-90 14 135)"
          >
            标准误差
          </text>
          <path
            d="M58 58 C112 93 170 135 222 166 C262 190 294 203 316 210"
            fill="none"
            stroke={warning}
            strokeWidth="3"
          />
          <path
            d="M58 104 C120 134 178 169 230 192 C268 207 296 214 316 217"
            fill="none"
            stroke={success}
            strokeWidth="3"
          />
          <text x="176" y="78" fontSize="10" fontWeight="700" fill={warning}>
            独立均匀采样
          </text>
          <text x="170" y="152" fontSize="10" fontWeight="700" fill={success}>
            分层 / 重要性 / MIS
          </text>
          {[58, 142, 226, 310].map((x, index) => (
            <g key={x}>
              <line x1={x} y1="220" x2={x} y2="225" stroke={border} />
              <text
                x={x}
                y="241"
                textAnchor="middle"
                fontSize="9"
                fill={secondary}
              >
                {[1, 4, 16, 64][index]}
              </text>
            </g>
          ))}
          <text
            x="170"
            y="262"
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            降方差是在同一 N 下整体压低误差曲线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        蒙特卡洛的收敛阶不会因维度恶化，但误差只按 1/√N
        下降；优先降低方差常数项。
      </figcaption>
    </figure>
  );
}
