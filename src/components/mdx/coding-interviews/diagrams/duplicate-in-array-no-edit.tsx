"use client";

import { CodingInterviewLab } from "./official-lab";

const traceCases = [
  {
    label: "值域1..7",
    fields: [["输入", "[2,3,5,4,3,2,6,7]"], ["元素数", "8"], ["可选值", "7种"], ["结论", "至少一个值重复"]],
  },
  {
    label: "检查1..4",
    fields: [["区间容量", "4个不同值"], ["实际计数", "5个元素落入1..4"], ["判断", "5 > 4"], ["动作", "重复必在1..4，丢弃5..7"]],
  },
  {
    label: "检查1..2",
    fields: [["区间容量", "2"], ["实际计数", "输入里1..2共有两个2，计数2"], ["判断", "2没有超过容量2"], ["动作", "重复必在3..4，转向右半"]],
    alert: "每轮必须重新扫描原数组准确计数；计数等于容量不证明该半区重复。",
  },
  {
    label: "定位3",
    fields: [["候选区间", "3..4"], ["检查3", "数字3出现2次"], ["容量", "单值容量1"], ["输出", "重复数字3"]],
  },
] as const;

const tradeoffs = [
  {
    label: "原地归位",
    fields: [["前提", "值域0..n-1"], ["修改", "会重排数组"], ["时间", "O(n)"], ["空间", "O(1)"]],
  },
  {
    label: "值域计数二分",
    fields: [["前提", "n+1个值落在1..n"], ["修改", "不修改"], ["时间", "O(n log n)"], ["空间", "O(1)"]],
  },
  {
    label: "辅助集合",
    fields: [["前提", "一般可哈希的值"], ["修改", "不修改"], ["时间", "平均O(n)"], ["空间", "O(n)"]],
  },
  {
    label: "复制后排序",
    fields: [["前提", "值可排序"], ["修改", "保留原数组，修改副本"], ["时间", "O(n log n)"], ["空间", "O(n)"]],
  },
] as const;

export function ValueRangeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 370" role="img" aria-label="把值域1到7二分为1到4和5到7，统计每个区间里的元素个数；计数超过区间容量的一半必含重复。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">二分的是值域，不是数组下标</text>
          <rect x="92" y="66" width="596" height="54" rx="5" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" />
          <text x="390" y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">候选值域 1..7</text>
          <text x="390" y="108" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">8个元素落入7个可选值，至少一处重复</text>
          <path d="M390 120 L238 164" stroke="var(--border)" /><path d="M390 120 L542 164" stroke="var(--border)" />
          <rect x="92" y="164" width="292" height="82" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="2" />
          <text x="238" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">左半 1..4</text>
          <text x="238" y="214" textAnchor="middle" fontSize="11" fill="var(--text-primary)">容量4，实际计数5</text>
          <text x="238" y="234" textAnchor="middle" fontSize="11" fill="var(--success)">5大于4，必含重复</text>
          <rect x="396" y="164" width="292" height="82" rx="5" fill="var(--bg)" stroke="var(--border)" />
          <text x="542" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">右半 5..7</text>
          <text x="542" y="214" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">本轮不再检查</text>
          <text x="542" y="234" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">丢弃的是候选值，不是输入元素</text>
          <path d="M238 246 V280" stroke="var(--success)" strokeWidth="2" />
          <rect x="112" y="280" width="252" height="56" rx="5" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" />
          <text x="238" y="303" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">继续把1..4拆成1..2与3..4</text>
          <text x="238" y="323" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每轮都扫描完整输入重新计数</text>
          <rect x="420" y="280" width="248" height="56" rx="5" fill="var(--warning)" fillOpacity="0.07" stroke="var(--warning)" />
          <text x="544" y="303" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">数组顺序始终不变</text>
          <text x="544" y="323" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">只收缩start..end两个整数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">超过区间可容纳的不同值数量，就是抽屉原理在该半区的可执行判据。</figcaption>
    </figure>
  );
}

export function PigeonholeTraceLab() {
  return <CodingInterviewLab cases={traceCases} caption="沿值域收缩路径检查容量、计数与下一半区的选择。" />;
}

export function ComplexityTradeoffMap() {
  return <CodingInterviewLab cases={tradeoffs} caption="修改权限、时间和额外空间共同决定查重方案。" />;
}

export function NoEditTestLab() {
  const cases = [
    { label: "边界重复1", fields: [["输入", "[1,2,3,4,5,6,7,1,8]"], ["输出", "1"], ["覆盖", "值域下界"], ["长度", "9个元素，值域1..8"]] },
    { label: "边界重复n", fields: [["输入", "[1,7,3,4,5,6,8,2,8]"], ["输出", "8"], ["覆盖", "值域上界"], ["检查", "闭区间端点"]] },
    { label: "多个重复", fields: [["输入", "[1,2,2,6,4,5,6]"], ["允许输出", "2或6"], ["覆盖", "只要求任意一个"], ["检查", "测试接受答案集合"]] },
    { label: "契约不成立", fields: [["输入", "[1,2,6,4,5,3]"], ["现象", "长度6，值域含6"], ["问题", "不是1..5"], ["要求", "验证值域后返回失败"]] },
  ] as const;
  return <CodingInterviewLab cases={cases} caption="不修改版本要同时测试值域两端、多个重复与不满足抽屉前提的输入。" />;
}
