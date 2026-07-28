"use client";

const VIEW_W = 720;
const VIEW_H = 440;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
export function MglMachineLearningDiagram() {
  const stages = [
    { title: "问题", detail: "对象 · 目标 · 代价", color: accent },
    { title: "数据", detail: "采样 · 清洗 · 切分", color: success },
    { title: "模型", detail: "表示 · 损失 · 优化", color: warning },
    { title: "评估", detail: "泛化 · 切片 · 漂移", color: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="机器学习证据链：定义预测问题与错误代价，采样并分离训练验证测试数据，选择模型损失与优化方法，最后在未见数据和上线分布中评估泛化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-ml-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={secondary} />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            机器学习不是只把损失降下来
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill={secondary}>
            完整证据链从问题与数据开始，在未见数据和真实分布上结束
          </text>

          {stages.map((stage, index) => {
            const x = 28 + index * 174;
            return (
              <g key={stage.title}>
                <rect x={x} y="86" width="146" height="76" rx="7" fill={stage.color} fillOpacity="0.08" stroke={stage.color} strokeWidth="1.2" />
                <text x={x + 73} y="115" textAnchor="middle" fontSize="14" fontWeight="700" fill={stage.color}>{stage.title}</text>
                <text x={x + 73} y="140" textAnchor="middle" fontSize="11" fill={primary}>{stage.detail}</text>
                {index < stages.length - 1 ? (
                  <line x1={x + 149} y1="124" x2={x + 169} y2="124" stroke={secondary} strokeWidth="1.4" markerEnd="url(#mgl-ml-arrow)" />
                ) : null}
              </g>
            );
          })}

          <text x="360" y="197" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={primary}>数据切分决定评估是否可信</text>

          <rect x="38" y="218" width="196" height="94" rx="7" fill={success} fillOpacity="0.06" stroke={success} />
          <text x="136" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>训练集</text>
          <text x="136" y="267" textAnchor="middle" fontSize="11" fill={primary}>拟合参数与预处理统计量</text>
          <text x="136" y="289" textAnchor="middle" fontSize="11" fill={secondary}>模型可以反复看到</text>

          <line x1="238" y1="265" x2="257" y2="265" stroke={secondary} markerEnd="url(#mgl-ml-arrow)" />

          <rect x="262" y="218" width="196" height="94" rx="7" fill={warning} fillOpacity="0.06" stroke={warning} />
          <text x="360" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>验证集</text>
          <text x="360" y="267" textAnchor="middle" fontSize="11" fill={primary}>选择超参数与停止时机</text>
          <text x="360" y="289" textAnchor="middle" fontSize="11" fill={secondary}>反复查看也会过拟合</text>

          <line x1="462" y1="265" x2="481" y2="265" stroke={secondary} markerEnd="url(#mgl-ml-arrow)" />

          <rect x="486" y="218" width="196" height="94" rx="7" fill={danger} fillOpacity="0.06" stroke={danger} />
          <text x="584" y="244" textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>测试集</text>
          <text x="584" y="267" textAnchor="middle" fontSize="11" fill={primary}>方案冻结后最终评估</text>
          <text x="584" y="289" textAnchor="middle" fontSize="11" fill={secondary}>看完再调参就被污染</text>

          <rect x="38" y="342" width="644" height="64" rx="8" fill={accent} fillOpacity="0.05" stroke={border} />
          <text x="360" y="367" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent}>
            训练误差低只证明记住训练样本；泛化要求未见样本仍保持可接受误差
          </text>
          <text x="360" y="390" textAnchor="middle" fontSize="11" fill={secondary}>
            数据泄漏、分布偏移、错误指标和不恰当切分都会制造虚假的高分
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        机器学习交付包括问题定义、数据边界、模型与优化，以及独立评估和上线分布监控。
      </figcaption>
    </figure>
  );
}
