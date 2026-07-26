"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const decisionCases = [
  {
    label: "定义单元格",
    fields: [
      ["行i", "只允许使用前i件物品"],
      ["列w", "容量上限为w"],
      ["cell[i][w]", "当前条件下最大价值"],
      ["目标", "右下角cell[n][W]"],
    ],
  },
  {
    label: "不选择当前物品",
    fields: [
      ["动作", "跳过第i件"],
      ["可用物品", "前i-1件"],
      ["容量", "仍为w"],
      ["候选值", "cell[i-1][w]"],
    ],
  },
  {
    label: "选择当前物品",
    fields: [
      ["动作", "加入value[i]"],
      ["占用", "weight[i]"],
      ["剩余容量", "w-weight[i]"],
      ["候选值", "value[i]+cell[i-1][剩余容量]"],
    ],
  },
  {
    label: "取两者最大值",
    fields: [
      ["比较", "不选候选与选择候选"],
      ["写入", "较大价值"],
      ["若选择胜出", "记录取第i件"],
      ["回溯", "容量减去该物品重量"],
    ],
    alert: "0/1背包的选择分支必须看上一行，避免同一物品在一个方案中被重复使用。",
  },
] as const;

const designCases = [
  {
    label: "新增物品",
    fields: [
      ["旧表", "前n件物品已经求解"],
      ["动作", "新增第n+1行"],
      ["复用", "只读取上一行子问题"],
      ["结果", "无需重算组合树"],
    ],
  },
  {
    label: "改变行顺序",
    fields: [
      ["中间单元格", "可能变化"],
      ["最终候选集", "仍包含全部物品"],
      ["最终最优值", "不变"],
      ["前提", "每件物品恰好处理一次"],
    ],
  },
  {
    label: "改变列粒度",
    fields: [
      ["列步长", "1 lb只能表示整数重量"],
      ["含0.5 lb", "缩放成半磅单位"],
      ["列数", "容量除以最小单位"],
      ["代价", "粒度越细，表越宽"],
    ],
  },
  {
    label: "压缩为一维",
    fields: [
      ["0/1背包", "容量从大到小更新"],
      ["原因", "避免当前物品重复使用"],
      ["空间", "O(W)"],
      ["代价", "若不额外记录，回溯更困难"],
    ],
    alert: "容量正序更新会读到本轮刚写的值，把0/1背包悄悄变成可重复选物品的完全背包。",
  },
] as const;

export function KnapsackGridDiagram() {
  const headers = ["1 lb", "2 lb", "3 lb", "4 lb"];
  const rows = [
    { item: "吉他 1 lb / $1500", values: [1500, 1500, 1500, 1500], tone: accent },
    { item: "音响 4 lb / $3000", values: [1500, 1500, 1500, 3000], tone: warning },
    { item: "笔记本 3 lb / $2000", values: [1500, 1500, 2000, 3500], tone: success },
  ];
  const left = 228;
  const top = 84;
  const cellWidth = 112;
  const cellHeight = 62;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-label="4磅0/1背包动态规划表：每行依次加入吉他、音响、笔记本，每列容量1到4磅，右下角最大价值3500美元来自吉他加笔记本。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>4磅背包：行是物品，列是容量</text>
          {headers.map((header, index) => (
            <g key={header}>
              <rect x={left + index * cellWidth} y="48" width={cellWidth} height="36" fill={accent} fillOpacity="0.08" stroke={border} />
              <text x={left + index * cellWidth + cellWidth / 2} y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{header}</text>
            </g>
          ))}
          {rows.map((row, rowIndex) => (
            <g key={row.item}>
              <rect x="34" y={top + rowIndex * cellHeight} width={left - 34} height={cellHeight} fill={row.tone} fillOpacity="0.07" stroke={border} />
              <text x="130" y={top + rowIndex * cellHeight + 36} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{row.item}</text>
              {row.values.map((value, columnIndex) => {
                const isGoal = rowIndex === 2 && columnIndex === 3;
                const x = left + columnIndex * cellWidth;
                const y = top + rowIndex * cellHeight;
                return (
                  <g key={columnIndex}>
                    <rect x={x} y={y} width={cellWidth} height={cellHeight} fill={isGoal ? success : "var(--bg)"} fillOpacity={isGoal ? 0.15 : 1} stroke={isGoal ? success : border} strokeWidth={isGoal ? 2 : 1} />
                    <text x={x + cellWidth / 2} y={y + 29} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{"$"}{value}</text>
                    {isGoal && <text x={x + cellWidth / 2} y={y + 46} textAnchor="middle" fontSize="11" fill={success}>吉他+笔记本</text>}
                  </g>
                );
              })}
            </g>
          ))}
          <rect x="82" y="292" width="596" height="44" rx="4" fill={success} fillOpacity="0.06" stroke={success} strokeOpacity="0.55" />
          <text x="380" y="310" textAnchor="middle" fontSize="11" fill={primary}>右下角比较：不选笔记本得$3000；选笔记本得$2000+$1500=$3500。</text>
          <text x="380" y="325" textAnchor="middle" fontSize="11" fill={secondary}>每个单元格只依赖上一行，确保每件物品最多使用一次。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单元格表示当前物品和容量下的最大价值；右下角给出完整问题最优值。
      </figcaption>
    </figure>
  );
}

export function KnapsackDecisionLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={decisionCases}
      caption="每格比较“不选当前物品”与“选择当前物品并加上剩余容量最优值”。"
      tone="cyan"
    />
  );
}

export function StringMatchGridDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 370"
          role="img"
          aria-label="左侧HISH与FISH的最长公共子串是连续的ISH，长度3；右侧FOSH与FISH的最长公共子序列是保持顺序但可跳字符的FSH，长度3。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>公共子串要求连续，公共子序列只要求顺序</text>
          <rect x="36" y="54" width="324" height="238" fill="var(--bg)" stroke={border} />
          <text x="198" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>最长公共子串：HISH vs FISH</text>
          {["H", "I", "S", "H"].map((char, index) => (
            <g key={index}>
              <rect x={68 + index * 64} y="112" width="52" height="52" rx="4" fill={index > 0 ? success : danger} fillOpacity="0.1" stroke={index > 0 ? success : danger} />
              <text x={94 + index * 64} y="143" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>{char}</text>
            </g>
          ))}
          {["F", "I", "S", "H"].map((char, index) => (
            <g key={index}>
              <rect x={68 + index * 64} y="180" width="52" height="52" rx="4" fill={index > 0 ? success : warning} fillOpacity="0.1" stroke={index > 0 ? success : warning} />
              <text x={94 + index * 64} y="211" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>{char}</text>
            </g>
          ))}
          <text x="198" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>连续匹配 ISH，长度3</text>

          <rect x="400" y="54" width="324" height="238" fill="var(--bg)" stroke={border} />
          <text x="562" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>最长公共子序列：FOSH vs FISH</text>
          {["F", "O", "S", "H"].map((char, index) => {
            const matched = index !== 1;
            return (
              <g key={index}>
                <rect x={432 + index * 64} y="112" width="52" height="52" rx="4" fill={matched ? accent : danger} fillOpacity="0.1" stroke={matched ? accent : danger} />
                <text x={458 + index * 64} y="143" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>{char}</text>
              </g>
            );
          })}
          {["F", "I", "S", "H"].map((char, index) => {
            const matched = index !== 1;
            return (
              <g key={index}>
                <rect x={432 + index * 64} y="180" width="52" height="52" rx="4" fill={matched ? accent : warning} fillOpacity="0.1" stroke={matched ? accent : warning} />
                <text x={458 + index * 64} y="211" textAnchor="middle" fontSize="14" fontWeight="700" fill={primary}>{char}</text>
              </g>
            );
          })}
          <text x="562" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>跳过O与I，保留 F-S-H，长度3</text>

          <rect x="84" y="316" width="592" height="34" rx="4" fill={warning} fillOpacity="0.06" stroke={warning} strokeOpacity="0.55" />
          <text x="380" y="337" textAnchor="middle" fontSize="11" fill={primary}>子串不匹配时归零；子序列不匹配时取上方与左方的较大值。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两类字符串DP使用相似网格，但状态含义与不匹配转移完全不同。
      </figcaption>
    </figure>
  );
}

export function DpDesignMap() {
  return (
    <GrokkingAlgorithmsLab
      cases={designCases}
      caption="新增物品、改变行顺序、调整列粒度和一维压缩都会改变表格实现，但不能改变状态语义。"
      tone="violet"
    />
  );
}
