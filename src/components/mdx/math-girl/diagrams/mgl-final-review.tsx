"use client";

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
export function MglFinalReviewDiagram() {
  const rows = [
    { volume: "第1卷", title: "发现结构", nodes: ["数列模型", "生成函数", "卷积差分", "调和泰勒", "分拆数"], color: accent },
    { volume: "第2卷", title: "锤炼证明", nodes: ["勾股互质", "反证质数", "群与模", "无穷递降", "费马定理"], color: success },
    { volume: "第3卷", title: "追问边界", nodes: ["皮亚诺", "极限语言", "形式系统", "对角论证", "不完备性"], color: warning },
    { volume: "第4卷", title: "分析随机", nodes: ["搜索规模", "概率期望", "渐近阶", "矩阵漫步", "随机算法"], color: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数学女孩前四卷40章总复习图。第1卷从数列模型到分拆数，第2卷从勾股与互质到费马大定理，第3卷从皮亚诺算术和极限语言到哥德尔不完备性，第4卷从搜索规模和概率期望到随机算法。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-review-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={secondary} />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            《数学女孩》前四卷 · 40章复习骨架
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill={secondary}>
            发现结构 · 锤炼证明 · 追问边界 · 分析不确定性
          </text>

          {rows.map((row, rowIndex) => {
            const y = 84 + rowIndex * 92;
            return (
              <g key={row.volume}>
                <rect x="24" y={y} width="672" height="72" rx="7" fill={row.color} fillOpacity="0.045" stroke={border} />
                <rect x="38" y={y + 11} width="88" height="50" rx="6" fill={row.color} fillOpacity="0.12" stroke={row.color} />
                <text x="82" y={y + 32} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={row.color}>{row.volume}</text>
                <text x="82" y={y + 49} textAnchor="middle" fontSize="11" fill={primary}>{row.title}</text>

                {row.nodes.map((node, nodeIndex) => {
                  const x = 146 + nodeIndex * 106;
                  return (
                    <g key={node}>
                      <rect x={x} y={y + 18} width="88" height="36" rx="5" fill="var(--bg)" stroke={row.color} strokeOpacity="0.55" />
                      <text x={x + 44} y={y + 41} textAnchor="middle" fontSize="11" fill={primary}>{node}</text>
                      {nodeIndex < row.nodes.length - 1 ? (
                        <line x1={x + 90} y1={y + 36} x2={x + 103} y2={y + 36} stroke={secondary} markerEnd="url(#mgl-review-arrow)" />
                      ) : null}
                    </g>
                  );
                })}
              </g>
            );
          })}

          <rect x="24" y="460" width="672" height="26" rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.45" />
          <text x="360" y="478" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            跨卷导读用于回查，不增加卷章；权威完成度始终按四卷各10章统计
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四卷各有连续问题链：从表示与结构，到证明方法、形式系统边界，再到概率化算法保证。
      </figcaption>
    </figure>
  );
}

export function MglRepresentationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 160"
          role="img"
          aria-label="表示迁移图：原对象经过编码和运算，再回译为原问题的结论"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-representation-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={secondary} />
            </marker>
          </defs>
          <text x="360" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            表示迁移：对象 → 编码 → 运算 → 回译
          </text>
          {[
            ["原对象", "数列 / 状态", accent],
            ["编码", "生成函数 / 向量", success],
            ["运算", "乘法 / 矩阵幂", warning],
            ["回译", "系数 / 原结论", danger],
          ].map(([title, detail, color], index) => {
            const x = 24 + index * 174;
            return (
              <g key={title}>
                <rect x={x} y="52" width="140" height="66" rx="8" fill={color} fillOpacity="0.08" stroke={color} />
                <text x={x + 70} y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
                <text x={x + 70} y="99" textAnchor="middle" fontSize="11" fill={primary}>{detail}</text>
                {index < 3 ? <line x1={x + 144} y1="85" x2={x + 166} y2="85" stroke={secondary} markerEnd="url(#mgl-representation-arrow)" /> : null}
              </g>
            );
          })}
          <text x="360" y="145" textAnchor="middle" fontSize="11" fill={secondary}>
            每次迁移都要写清楚：编码保存了什么，哪些条件仍然有效？
          </text>
        </svg>
      </div>
    </figure>
  );
}

export function MglProofBoundaryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 160"
          role="img"
          aria-label="证明证据链图：对象、前提、动作、结论四格相连"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-proof-boundary-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={secondary} />
            </marker>
          </defs>
          <text x="360" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            证明证据链：每一格都能被另一位读者检查
          </text>
          {[
            ["对象", "反例属于哪一类？", accent],
            ["前提", "最小性 / 量词", success],
            ["动作", "构造或变换", warning],
            ["结论", "矛盾 / 边界", danger],
          ].map(([title, detail, color], index) => {
            const x = 24 + index * 174;
            return (
              <g key={title}>
                <rect x={x} y="52" width="140" height="66" rx="8" fill={color} fillOpacity="0.08" stroke={color} />
                <text x={x + 70} y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
                <text x={x + 70} y="99" textAnchor="middle" fontSize="11" fill={primary}>{detail}</text>
                {index < 3 ? <line x1={x + 144} y1="85" x2={x + 166} y2="85" stroke={secondary} markerEnd="url(#mgl-proof-boundary-arrow)" /> : null}
              </g>
            );
          })}
          <text x="360" y="145" textAnchor="middle" fontSize="11" fill={secondary}>
            删除任意一格，证明就会从“可检查”退化成“像是正确”。
          </text>
        </svg>
      </div>
    </figure>
  );
}

export function MglRandomGuaranteeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 160"
          role="img"
          aria-label="随机算法保证图：随机源经过随机变量和失败事件得到可复查保证"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mgl-random-guarantee-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={secondary} />
            </marker>
          </defs>
          <text x="360" y="22" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>
            随机算法保证：随机源 → 变量 → 失败事件 → 复查
          </text>
          {[
            ["随机源", "枢纽选择", accent],
            ["随机变量", "比较次数", success],
            ["失败事件", "概率与重复", warning],
            ["复查", "固定输入重放", danger],
          ].map(([title, detail, color], index) => {
            const x = 24 + index * 174;
            return (
              <g key={title}>
                <rect x={x} y="52" width="140" height="66" rx="8" fill={color} fillOpacity="0.08" stroke={color} />
                <text x={x + 70} y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
                <text x={x + 70} y="99" textAnchor="middle" fontSize="11" fill={primary}>{detail}</text>
                {index < 3 ? <line x1={x + 144} y1="85" x2={x + 166} y2="85" stroke={secondary} markerEnd="url(#mgl-random-guarantee-arrow)" /> : null}
              </g>
            );
          })}
          <text x="360" y="145" textAnchor="middle" fontSize="11" fill={secondary}>
            输入模型的随机与算法内部的随机，必须在证据表中分开记录。
          </text>
        </svg>
      </div>
    </figure>
  );
}
