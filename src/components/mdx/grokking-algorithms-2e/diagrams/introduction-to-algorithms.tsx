"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const traceCases = [
  {
    label: "初始区间",
    fields: [
      ["边界", "low=0, high=14"],
      ["中点", "mid=7, guess=8"],
      ["比较", "8小于目标13"],
      ["更新", "low=8"],
    ],
  },
  {
    label: "第二次",
    fields: [
      ["边界", "low=8, high=14"],
      ["中点", "mid=11, guess=12"],
      ["比较", "12小于目标13"],
      ["更新", "low=12"],
    ],
  },
  {
    label: "第三次",
    fields: [
      ["边界", "low=12, high=14"],
      ["中点", "mid=13, guess=14"],
      ["比较", "14大于目标13"],
      ["更新", "high=12"],
    ],
  },
  {
    label: "命中",
    fields: [
      ["边界", "low=12, high=12"],
      ["中点", "mid=12, guess=13"],
      ["比较", "13等于目标13"],
      ["返回", "下标12"],
    ],
    alert: "每次更新后，若目标存在，它仍在闭区间[low, high]中；这就是循环不变量。",
  },
] as const;

const contractCases = [
  {
    label: "命中",
    fields: [
      ["条件", "guess等于item"],
      ["动作", "立即返回mid"],
      ["保证", "list[mid]等于item"],
      ["边界", "重复值时返回任一命中"],
    ],
  },
  {
    label: "猜小了",
    fields: [
      ["条件", "guess小于item"],
      ["排除", "low到mid都不可能"],
      ["动作", "low=mid+1"],
      ["依据", "列表单调有序"],
    ],
  },
  {
    label: "猜大了",
    fields: [
      ["条件", "guess大于item"],
      ["排除", "mid到high都不可能"],
      ["动作", "high=mid-1"],
      ["依据", "列表单调有序"],
    ],
  },
  {
    label: "不存在",
    fields: [
      ["条件", "low大于high"],
      ["含义", "候选区间为空"],
      ["动作", "返回None"],
      ["注意", "不能漏掉空列表"],
    ],
    alert: "写成low小于high会漏查最后一个候选；闭区间版本必须使用low小于等于high。",
  },
] as const;

const growthCases = [
  {
    label: "O(1)",
    fields: [
      ["增长", "与n无关"],
      ["n=1,000", "约1步"],
      ["例子", "数组按下标读取"],
      ["边界", "哈希查找仅平均常数"],
    ],
  },
  {
    label: "O(log n)",
    fields: [
      ["增长", "输入翻倍多约1步"],
      ["n=1,000", "约10步"],
      ["例子", "二分查找"],
      ["结构", "每步消除固定比例"],
    ],
  },
  {
    label: "O(n)",
    fields: [
      ["增长", "与输入成正比"],
      ["n=1,000", "最多1,000步"],
      ["例子", "简单查找"],
      ["结构", "每步只排除一个"],
    ],
  },
  {
    label: "O(n log n)",
    fields: [
      ["增长", "线性层数乘对数轮次"],
      ["n=1,000", "约10,000步"],
      ["例子", "高效比较排序"],
      ["结构", "分治加线性合并"],
    ],
  },
  {
    label: "O(n²)",
    fields: [
      ["增长", "输入翻倍约四倍"],
      ["n=1,000", "约1,000,000步"],
      ["例子", "选择排序"],
      ["结构", "两层全量扫描"],
    ],
  },
  {
    label: "O(n!)",
    fields: [
      ["增长", "排列数爆炸"],
      ["n=10", "3,628,800种"],
      ["例子", "旅行商穷举"],
      ["边界", "小n也迅速不可行"],
    ],
    alert: "大O比较增长率，不等于精确操作数；模型、常数和输入分布仍需另行说明。",
  },
] as const;

export function IntroductionToAlgorithmsDiagram() {
  const values = Array.from({ length: 15 }, (_, index) => index + 1);
  const rows = [
    { low: 0, high: 14, mid: 7, label: "15个候选", color: accent },
    { low: 8, high: 14, mid: 11, label: "7个候选", color: success },
    { low: 12, high: 14, mid: 13, label: "3个候选", color: warning },
    { low: 12, high: 12, mid: 12, label: "1个候选", color: danger },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 720 390"
          role="img"
          aria-label="在1到15的有序数组中二分查找13。候选区间依次从15个缩为7个、3个和1个，第四次比较命中。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            二分查找13：候选区间每轮减半
          </text>
          <text x="360" y="54" textAnchor="middle" fontSize="11" fill={secondary}>
            闭区间[low, high]始终保留所有仍可能命中的位置
          </text>

          {rows.map((row, rowIndex) => {
            const y = 78 + rowIndex * 72;
            return (
              <g key={row.label}>
                <text x="18" y={y + 24} fontSize="11" fontWeight="700" fill={row.color}>{row.label}</text>
                {values.map((value, index) => {
                  const x = 105 + index * 39;
                  const active = index >= row.low && index <= row.high;
                  const middle = index === row.mid;
                  return (
                    <g key={`${row.label}-${value}`}>
                      <rect
                        x={x}
                        y={y}
                        width="32"
                        height="32"
                        rx="3"
                        fill={middle ? row.color : active ? "var(--bg)" : border}
                        fillOpacity={middle ? 0.22 : active ? 1 : 0.35}
                        stroke={middle ? row.color : active ? border : "none"}
                        strokeWidth={middle ? 1.5 : 1}
                      />
                      <text x={x + 16} y={y + 21} textAnchor="middle" fontSize="11" fontWeight={middle ? "700" : "400"} fill={active ? primary : secondary}>
                        {value}
                      </text>
                    </g>
                  );
                })}
                <text x="690" y={y + 21} textAnchor="end" fontSize="11" fill={secondary}>
                  mid={row.mid}
                </text>
              </g>
            );
          })}

          <rect x="105" y="352" width="585" height="25" rx="4" fill={accent} fillOpacity="0.06" stroke={accent} strokeOpacity="0.5" />
          <text x="397" y="369" textAnchor="middle" fontSize="11" fill={primary}>
            15 → 7 → 3 → 1；候选数最多经过⌈log₂(n+1)⌉次比较归零或命中
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        中点过小就移动左边界，中点过大就移动右边界；命中或区间为空时结束。
      </figcaption>
    </figure>
  );
}
