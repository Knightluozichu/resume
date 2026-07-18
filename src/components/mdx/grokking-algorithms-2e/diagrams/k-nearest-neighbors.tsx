"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const voteCases = [
  {
    label: "提取特征",
    fields: [
      ["新水果", "大小7.2，红度6.8"],
      ["橙子样本", "通常较小、偏橙"],
      ["葡萄柚样本", "通常较大、偏红"],
      ["表示", "二维数值向量"],
    ],
  },
  {
    label: "计算距离",
    fields: [
      ["指标", "欧氏距离"],
      ["操作", "与所有已标注样本比较"],
      ["排序", "距离从小到大"],
      ["候选", "保留最近k个"],
    ],
  },
  {
    label: "k=3投票",
    fields: [
      ["最近邻", "橙子、橙子、葡萄柚"],
      ["多数标签", "橙子2票"],
      ["预测", "橙子"],
      ["注意", "结果依赖特征与尺度"],
    ],
  },
  {
    label: "距离加权",
    fields: [
      ["规则", "更近邻居权重更大"],
      ["用途", "缓解远端邻居同票影响"],
      ["仍需选择", "k、距离、权重函数"],
      ["验证", "只在验证集上调参"],
    ],
    alert: "投票只聚合邻居标签；邻居是否有意义，首先取决于特征、尺度和距离定义。",
  },
] as const;

const tuningCases = [
  {
    label: "k过小",
    fields: [
      ["k", "1或很小"],
      ["优点", "保留细小局部结构"],
      ["风险", "对噪声与错标敏感"],
      ["表现", "高方差、边界锯齿"],
    ],
  },
  {
    label: "k过大",
    fields: [
      ["k", "接近样本总数"],
      ["优点", "预测更平滑"],
      ["风险", "局部结构被全局多数淹没"],
      ["表现", "高偏差、小类受损"],
    ],
  },
  {
    label: "尺度未统一",
    fields: [
      ["重量", "100至300克"],
      ["红度", "0至1"],
      ["欧氏距离", "几乎由重量支配"],
      ["修复", "训练集拟合缩放参数"],
    ],
  },
  {
    label: "预测成本",
    fields: [
      ["存储", "n个d维样本"],
      ["暴力查询", "O(nd)距离计算"],
      ["索引", "低维时可能加速"],
      ["高维", "常需降维或近似近邻"],
    ],
    alert: "树索引的收益依赖维度和分布；高维最坏情况仍可能接近扫描全部样本。",
  },
] as const;

export function FruitFeatureDiagram() {
  const oranges = [
    [142, 244], [176, 228], [214, 256], [250, 210], [278, 238],
  ];
  const grapefruit = [
    [434, 152], [472, 128], [508, 178], [548, 116], [594, 164],
  ];
  const query = { x: 356, y: 190 };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="水果特征平面横轴为大小、纵轴为红度，橙子样本集中在左下，葡萄柚集中在右上，新水果位于中间，最近三个邻居中两个为橙子。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>橙子与葡萄柚：把观察变成特征坐标</text>
          <line x1="82" y1="318" x2="700" y2="318" stroke={border} strokeWidth="2" />
          <line x1="82" y1="318" x2="82" y2="64" stroke={border} strokeWidth="2" />
          <text x="390" y="354" textAnchor="middle" fontSize="10" fill={secondary}>大小：小 → 大</text>
          <text x="34" y="192" textAnchor="middle" fontSize="10" fill={secondary} transform="rotate(-90 34 192)">红度：低 → 高</text>
          {oranges.map(([x, y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="17" fill={warning} fillOpacity="0.16" stroke={warning} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={primary}>橙</text>
            </g>
          ))}
          {grapefruit.map(([x, y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="17" fill={danger} fillOpacity="0.13" stroke={danger} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="8.5" fontWeight="700" fill={primary}>柚</text>
            </g>
          ))}
          <circle cx={query.x} cy={query.y} r="58" fill={accent} fillOpacity="0.04" stroke={accent} strokeDasharray="5 4" />
          <circle cx={query.x} cy={query.y} r="21" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="2" />
          <text x={query.x} y={query.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={primary}>新</text>
          <line x1={query.x - 13} y1={query.y + 16} x2="278" y2="238" stroke={accent} strokeDasharray="3 3" />
          <line x1={query.x + 12} y1={query.y - 15} x2="434" y2="152" stroke={accent} strokeDasharray="3 3" />
          <line x1={query.x - 15} y1={query.y + 10} x2="250" y2="210" stroke={accent} strokeDasharray="3 3" />
          <rect x="112" y="334" width="536" height="36" rx="4" fill={success} fillOpacity="0.06" stroke={success} strokeOpacity="0.55" />
          <text x="380" y="350" textAnchor="middle" fontSize="10.5" fill={primary}>最近3个邻居：橙子、葡萄柚、橙子 → 多数投票预测橙子。</text>
          <text x="380" y="364" textAnchor="middle" fontSize="9" fill={secondary}>图中几何关系只在特征经过合适编码与缩放后才有业务意义。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        K近邻根据最相似样本预测；分类使用邻居多数投票。
      </figcaption>
    </figure>
  );
}

export function KnnVoteLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={voteCases}
      caption="水果分类依次完成特征提取、距离计算、选择k个邻居和标签投票。"
      tone="cyan"
    />
  );
}

export function RecommendationFeatureMap() {
  const users = [
    { name: "Priya", values: [5, 1, 4, 1, 5], tone: accent },
    { name: "Justin", values: [4, 1, 5, 2, 4], tone: success },
    { name: "Morpheus", values: [1, 5, 1, 5, 1], tone: danger },
  ];
  const labels = ["喜剧", "动作", "剧情", "恐怖", "爱情"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 370"
          role="img"
          aria-label="三个用户被表示为喜剧、动作、剧情、恐怖、爱情五维偏好向量，Priya与Justin向量接近，可由相似用户喜欢但Priya未看过的电影产生推荐候选。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>推荐系统：把用户表示成偏好特征向量</text>
          {labels.map((label, index) => (
            <text key={label} x={270 + index * 82} y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={secondary}>{label}</text>
          ))}
          {users.map((user, row) => {
            const y = 96 + row * 70;
            return (
              <g key={user.name}>
                <text x="176" y={y + 24} textAnchor="end" fontSize="10.5" fontWeight="700" fill={primary}>{user.name}</text>
                {user.values.map((value, column) => (
                  <g key={column}>
                    <rect x={236 + column * 82} y={y} width="68" height="44" rx="4" fill={user.tone} fillOpacity={value / 34} stroke={user.tone} />
                    <text x={270 + column * 82} y={y + 27} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{value}</text>
                  </g>
                ))}
              </g>
            );
          })}
          <line x1="190" y1="118" x2="190" y2="188" stroke={success} strokeWidth="3" />
          <text x="116" y="157" textAnchor="middle" fontSize="9.5" fill={success}>最相似</text>
          <rect x="82" y="316" width="596" height="36" rx="4" fill={warning} fillOpacity="0.06" stroke={warning} strokeOpacity="0.55" />
          <text x="380" y="332" textAnchor="middle" fontSize="10.5" fill={primary}>相似用户提供推荐候选；目标用户未看过且邻居高评分的电影优先。</text>
          <text x="380" y="346" textAnchor="middle" fontSize="9" fill={secondary}>特征应与“口味相似”相关，缺失评分也需单独处理。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        特征提取决定“相似”的含义，距离只是在该表示上完成比较。
      </figcaption>
    </figure>
  );
}

export function KSelectionLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={tuningCases}
      caption="k、特征尺度与查询实现共同决定预测的偏差、方差、延迟和内存成本。"
      tone="violet"
    />
  );
}
