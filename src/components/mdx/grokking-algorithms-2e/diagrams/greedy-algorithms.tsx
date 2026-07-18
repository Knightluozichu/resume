"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const knapsackCases = [
  {
    label: "只选最高价值",
    fields: [
      ["容量", "4 kg"],
      ["音响", "4 kg / $3000"],
      ["笔记本+吉他", "3+1 kg / $3500"],
      ["结论", "最高单价贪心少得$500"],
    ],
  },
  {
    label: "只选最高密度",
    fields: [
      ["容量", "10 kg"],
      ["A", "6 kg / $30 / 密度5"],
      ["B与C", "各5 kg / $24 / 密度4.8"],
      ["结论", "选A得30，最优B+C得48"],
    ],
  },
  {
    label: "可分割背包",
    fields: [
      ["允许", "拿走物品的一部分"],
      ["策略", "价值密度从高到低"],
      ["剩余容量", "用下一个物品的一部分填满"],
      ["结果", "密度贪心可证明最优"],
    ],
  },
  {
    label: "0/1背包",
    fields: [
      ["约束", "每件只能全拿或不拿"],
      ["局部选择", "可能留下无法利用的容量"],
      ["贪心", "不保证最优"],
      ["后续章节", "用动态规划求精确解"],
    ],
    alert: "“按价值密度”只对可分割背包天然成立；0/1约束会让剩余容量成为组合问题。",
  },
] as const;

const coverCases = [
  {
    label: "初始化",
    fields: [
      ["未覆盖州", "mt, wa, or, id, nv, ut, ca, az"],
      ["候选电台", "kone至kfive"],
      ["答案集", "空集合"],
      ["目标", "覆盖全部州"],
    ],
  },
  {
    label: "计算新增覆盖",
    fields: [
      ["kone", "id, nv, ut"],
      ["ktwo", "wa, id, mt"],
      ["kthree", "or, nv, ca"],
      ["选择", "任一新增覆盖3州的站"],
    ],
  },
  {
    label: "删除已覆盖",
    fields: [
      ["动作", "未覆盖集减去所选站覆盖集"],
      ["重复覆盖", "不再计分"],
      ["下一轮指标", "只数新增覆盖"],
      ["停止", "未覆盖集为空"],
    ],
  },
  {
    label: "近似而非精确",
    fields: [
      ["每轮", "选覆盖最多未覆盖元素的集合"],
      ["运行时间", "多项式级"],
      ["结果", "保证覆盖但未必集合数最少"],
      ["评估", "比较近似比与业务约束"],
    ],
    alert: "平局规则会改变具体答案，但不改变算法“最大新增覆盖”的贪心准则。",
  },
] as const;

export function ClassroomScheduleDiagram() {
  const classes = [
    { name: "美术", start: 9, end: 10, lane: 0, chosen: true },
    { name: "英语", start: 9.5, end: 10.5, lane: 1, chosen: false },
    { name: "数学", start: 10, end: 11, lane: 2, chosen: true },
    { name: "计算机", start: 10.5, end: 11.5, lane: 3, chosen: false },
    { name: "音乐", start: 11, end: 12, lane: 4, chosen: true },
  ];
  const xForTime = (time: number) => 126 + (time - 9) * 180;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="五门课的时间区间中，按结束时间排序并反复选择最早结束且不冲突的课程，得到美术、数学、音乐三门课。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>教室调度：每次选最早结束的可行课程</text>
          {[9, 10, 11, 12].map((hour) => {
            const x = xForTime(hour);
            return (
              <g key={hour}>
                <line x1={x} y1="62" x2={x} y2="316" stroke={border} strokeDasharray="4 4" />
                <text x={x} y="53" textAnchor="middle" fontSize="10" fill={secondary}>{hour}:00</text>
              </g>
            );
          })}
          {classes.map((item) => {
            const y = 76 + item.lane * 48;
            const x = xForTime(item.start);
            const width = xForTime(item.end) - x;
            const tone = item.chosen ? success : danger;
            return (
              <g key={item.name}>
                <text x="96" y={y + 22} textAnchor="end" fontSize="10.5" fontWeight="700" fill={primary}>{item.name}</text>
                <rect x={x} y={y} width={width} height="34" rx="4" fill={tone} fillOpacity="0.1" stroke={tone} />
                <text x={x + width / 2} y={y + 21} textAnchor="middle" fontSize="9.5" fill={primary}>
                  {item.chosen ? "选择" : "冲突"}
                </text>
              </g>
            );
          })}
          <rect x="86" y="334" width="588" height="38" rx="4" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.55" />
          <text x="380" y="350" textAnchor="middle" fontSize="10.5" fill={primary}>美术10:00结束，数学随后开始，音乐再随后开始，共安排3门。</text>
          <text x="380" y="364" textAnchor="middle" fontSize="9" fill={secondary}>最早结束为后续课程留下最大时间窗口；该交换论证可证明最优。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        选择后删除所有冲突活动，再从剩余活动中选择结束最早者。
      </figcaption>
    </figure>
  );
}

export function KnapsackChoiceLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={knapsackCases}
      caption="0/1背包按价值或价值密度贪心都可能失败；可分割背包才可安全使用密度贪心。"
      tone="violet"
    />
  );
}

export function SetCoverLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={coverCases}
      caption="集合覆盖贪心每轮最大化新增覆盖，并从剩余元素中删除已覆盖部分。"
      tone="cyan"
    />
  );
}

export function NpSearchSpaceDiagram() {
  const bars = [
    { label: "10个候选", value: "1,024个子集", width: 112, tone: success },
    { label: "20个候选", value: "1,048,576个子集", width: 256, tone: warning },
    { label: "50个候选", value: "约1.13×10¹⁵个子集", width: 520, tone: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 350"
          role="img"
          aria-label="集合覆盖精确枚举的幂集规模随候选集合数指数增长：10个候选有1024个子集，20个有1048576个，50个约有1.13乘10的15次方个。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>精确集合覆盖要面对2ⁿ个候选子集</text>
          {bars.map((bar, index) => {
            const y = 76 + index * 74;
            return (
              <g key={bar.label}>
                <text x="112" y={y + 20} textAnchor="end" fontSize="10.5" fontWeight="700" fill={primary}>{bar.label}</text>
                <rect x="132" y={y} width={bar.width} height="36" rx="4" fill={bar.tone} fillOpacity="0.12" stroke={bar.tone} />
                <text x={144 + bar.width} y={y + 22} fontSize="10" fontWeight="700" fill={bar.tone}>{bar.value}</text>
              </g>
            );
          })}
          <rect x="72" y="298" width="616" height="36" rx="4" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.55" />
          <text x="380" y="314" textAnchor="middle" fontSize="10.5" fill={primary}>近似算法用可接受精度换运行时间，不枚举整个幂集。</text>
          <text x="380" y="328" textAnchor="middle" fontSize="9" fill={secondary}>指数增长是识别困难组合优化问题的线索，但正式归类仍需要归约证明。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        幂集包含2ⁿ个子集；候选数每增加1，穷举搜索空间就翻倍。
      </figcaption>
    </figure>
  );
}
