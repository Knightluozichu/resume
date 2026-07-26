"use client";

import { CodingInterviewLab } from "./official-lab";

const traces = [
  {
    label: "[3,4,5,1,2]",
    fields: [["初始", "left=3, mid=5, right=2"], ["判断", "mid位于前段"], ["收缩", "left移动到mid"], ["结果", "相邻边界处返回1"]],
  },
  {
    label: "[1,0,1,1,1]",
    fields: [["三点值", "left=mid=right=1"], ["歧义", "无法判断0在哪一侧"], ["动作", "顺序查找区间"], ["结果", "0"]],
  },
  {
    label: "[1,2,3,4,5]",
    fields: [["首尾", "1小于5"], ["含义", "当前区间已有序"], ["动作", "直接返回首项"], ["结果", "1"]],
  },
  {
    label: "[2]",
    fields: [["边界", "left=right=0"], ["循环", "无需进入"], ["动作", "返回唯一元素"], ["结果", "2"]],
  },
] as const;

export function RotatedArrayStructureDiagram() {
  const values = [3, 4, 5, 1, 2] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 340" role="img" aria-label="数组34512由两个非递减子数组345和12组成，最小值位于第二段起点。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">旋转后仍保留两段内部有序结构</text>
          {values.map((value, index) => {
            const x = 120 + index * 118;
            const active = index === 3;
            return <g key={value + "-" + index}><rect x={x} y="105" width="94" height="72" rx="5" fill={active ? "var(--success)" : "var(--bg)"} fillOpacity={active ? 0.12 : 1} stroke={active ? "var(--success)" : "var(--border)"} strokeWidth={active ? 2 : 1} /><text x={x + 47} y="148" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--text-primary)">{value}</text><text x={x + 47} y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">index {index}</text></g>;
          })}
          <path d="M120 86 L450 86" stroke="var(--accent)" strokeWidth="3" />
          <path d="M474 86 L686 86" stroke="var(--success)" strokeWidth="3" />
          <text x="285" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">第一递增子数组</text>
          <text x="580" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">第二递增子数组</text>
          <path d="M474 220 L474 180" stroke="var(--success)" strokeWidth="3" />
          <text x="474" y="240" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">旋转点 / 最小值</text>
          <rect x="145" y="274" width="530" height="38" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="298" textAnchor="middle" fontSize="11" fill="var(--text-primary)">二分不依赖数值连续，只依赖两段内部非递减和边界关系。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">最小元素是第二段起点；旋转0个元素时只有一段，首项就是最小值。</figcaption>
    </figure>
  );
}

export function RotatedSearchInvariantMap() {
  const rows = [
    ["mid值大于等于left值", "mid在第一段", "left=mid", "最小值仍在右侧闭区间"],
    ["mid值小于等于right值", "mid在第二段", "right=mid", "mid可能就是最小值"],
    ["left、mid、right三值相等", "两侧都可能藏旋转点", "区间顺序查找", "放弃错误的二分方向"],
    ["left值小于right值", "当前区间整体有序", "返回left值", "处理未旋转子区间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["可观察关系", "结构结论", "边界动作", "保持的不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每次收缩都保留最小值；重复值让方向证据消失时必须退化。</figcaption>
    </figure>
  );
}

export function DuplicateRotationAmbiguityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 300" role="img" aria-label="数组10111在左中右位置都是1，无法判断最小值0位于哪一侧。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">三点相等时，两种旋转结构给出同样观测</text>
          {[[1,120,"left"],[0,238,""],[1,356,"mid"],[1,474,""],[1,592,"right"]].map(([value,x,label], index) => <g key={index}><rect x={Number(x)} y="100" width="92" height="64" rx="5" fill={value === 0 ? "var(--warning)" : "var(--bg)"} fillOpacity={value === 0 ? 0.12 : 1} stroke={value === 0 ? "var(--warning)" : "var(--border)"} /><text x={Number(x)+46} y="138" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">{value}</text><text x={Number(x)+46} y="184" textAnchor="middle" fontSize="11" fill="var(--accent)">{label}</text></g>)}
          <path d="M166 214 C285 260 535 260 638 214" fill="none" stroke="var(--warning)" strokeWidth="3" strokeDasharray="6 4" />
          <text x="410" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">left=mid=right=1不能排除任何一侧，只能逐项确认0。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">重复值不会破坏正确性，但会让最坏时间从对数退化为线性。</figcaption>
    </figure>
  );
}

export function RotatedMinimumTraceLab() {
  return <CodingInterviewLab cases={traces} caption="切换作者官方代表输入，观察二分收缩、退化与边界出口。" />;
}
