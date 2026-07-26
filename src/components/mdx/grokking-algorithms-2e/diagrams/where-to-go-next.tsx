"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const scaleCases = [
  {
    label: "傅里叶变换",
    fields: [
      ["输入", "随时间变化的信号"],
      ["输出", "各频率成分的幅度与相位"],
      ["用途", "音频、图像、频谱分析"],
      ["边界", "压缩还需量化与编码"],
    ],
  },
  {
    label: "并行算法",
    fields: [
      ["拆分", "把独立工作分到多个处理器"],
      ["上限", "受串行部分限制"],
      ["额外成本", "通信、同步、负载不均"],
      ["验证", "看真实加速比而非核心数"],
    ],
  },
  {
    label: "MapReduce",
    fields: [
      ["map", "输入→中间键值对"],
      ["shuffle", "按键分组"],
      ["reduce", "聚合同键值"],
      ["适合", "可分区的大规模批处理"],
    ],
  },
  {
    label: "概率结构",
    fields: [
      ["Bloom", "近似成员查询"],
      ["允许", "假阳性"],
      ["HyperLogLog", "近似不同元素数"],
      ["收益", "用小内存换可量化误差"],
    ],
    alert: "概率结构回答的是受限问题：Bloom不返回原元素，HyperLogLog不列出不同元素。",
  },
] as const;

const securityCases = [
  {
    label: "SHA",
    fields: [
      ["输入", "任意长度消息"],
      ["输出", "固定长度摘要"],
      ["目标", "抗原像与抗碰撞"],
      ["不是", "可逆加密"],
    ],
  },
  {
    label: "局部敏感哈希",
    fields: [
      ["目标", "相似项更可能落入同桶"],
      ["用途", "近似相似搜索"],
      ["与SHA相反", "不追求输入微变摘要全变"],
      ["代价", "候选召回与误报需调参"],
    ],
  },
  {
    label: "Diffie-Hellman",
    fields: [
      ["公开", "双方公开参数与公钥值"],
      ["秘密", "各自私钥不发送"],
      ["结果", "协商同一共享秘密"],
      ["边界", "需认证防中间人"],
    ],
  },
  {
    label: "线性规划",
    fields: [
      ["目标", "线性函数最大化或最小化"],
      ["约束", "线性等式或不等式"],
      ["变量", "通常为连续值"],
      ["用途", "资源、运输、生产分配"],
    ],
    alert: "若变量必须取整数，问题变成整数规划，复杂度与算法工具都可能明显不同。",
  },
] as const;

export function TopicRouteMap() {
  const groups = [
    { title: "预测与检索", items: ["线性回归", "倒排索引"], x: 54, tone: accent },
    { title: "信号与规模", items: ["傅里叶变换", "并行算法", "MapReduce"], x: 236, tone: success },
    { title: "概率结构", items: ["Bloom过滤器", "HyperLogLog"], x: 418, tone: warning },
    { title: "安全与优化", items: ["SHA / LSH", "Diffie-Hellman", "线性规划"], x: 600, tone: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="第13章后续路线按预测与检索、信号与规模、概率数据结构、安全与优化分成四组，包含线性回归、倒排索引、傅里叶变换、并行、MapReduce、Bloom、HyperLogLog、SHA、LSH、Diffie-Hellman和线性规划。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>第13章不是终点：按问题领域选择下一站</text>
          {groups.map((group) => (
            <g key={group.title}>
              <rect x={group.x - 20} y="58" width="156" height="256" rx="4" fill={group.tone} fillOpacity="0.05" stroke={group.tone} strokeOpacity="0.65" />
              <text x={group.x + 58} y="86" textAnchor="middle" fontSize="11" fontWeight="700" fill={group.tone}>{group.title}</text>
              {group.items.map((item, index) => (
                <g key={item}>
                  <rect x={group.x} y={112 + index * 62} width="116" height="40" rx="4" fill="var(--bg)" stroke={group.tone} />
                  <text x={group.x + 58} y={136 + index * 62} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{item}</text>
                </g>
              ))}
            </g>
          ))}
          <rect x="86" y="334" width="588" height="36" rx="4" fill={accent} fillOpacity="0.06" stroke={border} />
          <text x="380" y="350" textAnchor="middle" fontSize="11" fill={primary}>先从当前问题的输出、误差、规模与安全约束出发，再选择深入主题。</text>
          <text x="380" y="364" textAnchor="middle" fontSize="11" fill={secondary}>这些是概念入口，不是可直接替代生产库的完整实现规范。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后续学习应按问题领域选择路线，而不是把所有主题按同一深度顺序学习。
      </figcaption>
    </figure>
  );
}

export function RegressionIndexDiagram() {
  const points = [
    [70, 226], [110, 208], [160, 194], [210, 166], [260, 148],
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 370"
          role="img"
          aria-label="左侧线性回归用房屋面积与售价数据拟合直线并预测3000平方英尺房价；右侧倒排索引把单词hi、algorithm、music映射到包含它们的文档编号。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>连续预测与文本检索使用不同索引结构</text>
          <rect x="34" y="54" width="330" height="250" fill="var(--bg)" stroke={border} />
          <text x="199" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>线性回归：面积 → 价格</text>
          <line x1="66" y1="258" x2="324" y2="258" stroke={border} />
          <line x1="66" y1="258" x2="66" y2="96" stroke={border} />
          <line x1="70" y1="240" x2="310" y2="112" stroke={accent} strokeWidth="3" />
          {points.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="6" fill={success} />)}
          <line x1="250" y1="258" x2="250" y2="144" stroke={warning} strokeDasharray="4 3" />
          <text x="250" y="278" textAnchor="middle" fontSize="11" fill={secondary}>3000 ft²</text>
          <text x="205" y="294" textAnchor="middle" fontSize="11" fill={primary}>拟合直线后读取预测价格</text>

          <rect x="396" y="54" width="330" height="250" fill="var(--bg)" stroke={border} />
          <text x="561" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>倒排索引：词 → 文档集合</text>
          {[
            ["hi", "doc1, doc3"],
            ["algorithm", "doc1, doc2"],
            ["music", "doc2, doc3"],
          ].map(([term, docs], index) => {
            const y = 104 + index * 58;
            return (
              <g key={term}>
                <rect x="426" y={y} width="92" height="38" rx="4" fill={warning} fillOpacity="0.08" stroke={warning} />
                <text x="472" y={y + 24} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{term}</text>
                <line x1="518" y1={y + 19} x2="548" y2={y + 19} stroke={accent} strokeWidth="2" />
                <rect x="548" y={y} width="142" height="38" rx="4" fill={accent} fillOpacity="0.07" stroke={accent} />
                <text x="619" y={y + 24} textAnchor="middle" fontSize="11" fill={primary}>{docs}</text>
              </g>
            );
          })}
          <text x="561" y="294" textAnchor="middle" fontSize="11" fill={primary}>查询hi只读取对应文档列表</text>

          <rect x="84" y="326" width="592" height="28" rx="4" fill={danger} fillOpacity="0.05" stroke={danger} strokeOpacity="0.45" />
          <text x="380" y="344" textAnchor="middle" fontSize="11" fill={secondary}>回归拟合数值关系；倒排索引预先重排词与文档的访问方向。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线性回归用于连续预测；搜索引擎使用倒排索引定位包含查询词的文档。
      </figcaption>
    </figure>
  );
}

export function ScaleAndSketchLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={scaleCases}
      caption="信号分解、并行批处理与概率结构分别用不同方式处理数据规模。"
      tone="cyan"
    />
  );
}

export function HashCryptoOptimizationLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={securityCases}
      caption="SHA、局部敏感哈希、Diffie-Hellman和线性规划解决的是完全不同的问题，不能因名称相近而混用。"
      tone="violet"
    />
  );
}
