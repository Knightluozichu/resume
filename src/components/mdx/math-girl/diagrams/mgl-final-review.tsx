"use client";

import { MathGirlOfficialLab } from "./official-lab";

const VIEW_W = 720;
const VIEW_H = 500;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const volumeCases = [
  {
    label: "第1卷",
    fields: [
      ["对象", "数列与数学模型"],
      ["表示", "递推、生成函数、卷积"],
      ["增长", "调和数与泰勒展开"],
      ["终点", "分拆数"],
    ],
  },
  {
    label: "第2卷",
    fields: [
      ["对象", "整数、质数、勾股数"],
      ["结构", "互质、群、模运算"],
      ["证明", "反证与无穷递降"],
      ["终点", "费马大定理"],
    ],
  },
  {
    label: "第3卷",
    fields: [
      ["对象", "极限、无穷、形式系统"],
      ["语言", "ε-δ、语法与语义"],
      ["构造", "对角线与自指编码"],
      ["终点", "哥德尔不完备性"],
    ],
  },
  {
    label: "第4卷",
    fields: [
      ["对象", "不确定性与算法代价"],
      ["工具", "概率、期望、渐近阶"],
      ["表示", "矩阵与随机漫步"],
      ["终点", "随机SAT与随机快排"],
    ],
    alert: "四卷是四条连续叙事，不是数论、代数、图论、机器学习等泛主题拼成的十章教材。",
  },
] as const;

const proofCases = [
  {
    label: "递推与归纳",
    fields: [
      ["起点", "初值或基例"],
      ["一步", "由较小下标推出下一项"],
      ["整体", "归纳覆盖全部自然数"],
      ["卷次", "第1卷"],
    ],
  },
  {
    label: "反证与递降",
    fields: [
      ["假设", "存在反例"],
      ["选择", "取最小反例"],
      ["构造", "得到更小反例"],
      ["卷次", "第2卷"],
    ],
  },
  {
    label: "量词与对角",
    fields: [
      ["极限", "先给ε再找δ"],
      ["列表", "假设已经列全"],
      ["构造", "对角处逐位不同"],
      ["卷次", "第3卷"],
    ],
  },
  {
    label: "概率与期望",
    fields: [
      ["空间", "先定义随机试验"],
      ["变量", "把代价写成随机变量"],
      ["汇总", "指示器与期望线性"],
      ["卷次", "第4卷"],
    ],
    alert: "证明方法不能只按名称迁移；必须重新检查对象、量词、概率空间和适用条件。",
  },
] as const;

const synthesisCases = [
  {
    label: "选择表示",
    fields: [
      ["数列", "变成生成函数"],
      ["状态", "变成向量与矩阵"],
      ["公式", "变成编码后的数"],
      ["价值", "暴露可计算结构"],
    ],
  },
  {
    label: "构造对象",
    fields: [
      ["卷积", "由两部分合成对象"],
      ["递降", "从反例造更小反例"],
      ["对角", "造出列表外对象"],
      ["随机", "造出高概率成功路径"],
    ],
  },
  {
    label: "标注条件",
    fields: [
      ["等式", "定义域与收敛域"],
      ["定理", "公理和前提"],
      ["期望", "概率空间"],
      ["算法", "输入与保证对象"],
    ],
  },
  {
    label: "完成证据",
    fields: [
      ["复述", "说清问题链"],
      ["推导", "独立补全关键式"],
      ["反例", "指出条件缺失"],
      ["迁移", "解释跨卷复用"],
    ],
    alert: "“看过”不是完成证据；能复述、推导、反驳和迁移，才说明知识已经形成可调用结构。",
  },
] as const;

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

export function MglVolumeReviewLab() {
  return (
    <MathGirlOfficialLab
      cases={volumeCases}
      caption="四卷分别围绕数列结构、费马问题、形式系统边界和随机算法展开，每卷都保留10章连续推进。"
      tone="cyan"
    />
  );
}

export function MglProofTransferLab() {
  return (
    <MathGirlOfficialLab
      cases={proofCases}
      caption="递推归纳、反证递降、量词对角和概率期望是四类证明动作；迁移时必须保留各自前提。"
      tone="amber"
    />
  );
}

export function MglSynthesisCheckLab() {
  return (
    <MathGirlOfficialLab
      cases={synthesisCases}
      caption="总复习以表示、构造、条件和证据为索引，让40章形成可检索、可推导、可迁移的知识网络。"
      tone="violet"
    />
  );
}
