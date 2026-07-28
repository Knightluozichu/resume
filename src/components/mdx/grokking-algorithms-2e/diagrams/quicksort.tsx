"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

const sumCases = [
  {
    label: "sum([])",
    fields: [
      ["输入", "空数组"],
      ["基线条件", "直接返回0"],
      ["递归调用", "无"],
      ["结果", "0"],
    ],
  },
  {
    label: "sum([6])",
    fields: [
      ["当前元素", "6"],
      ["较小问题", "sum([])"],
      ["组合", "6+0"],
      ["结果", "6"],
    ],
  },
  {
    label: "sum([4,6])",
    fields: [
      ["当前元素", "4"],
      ["较小问题", "sum([6])"],
      ["组合", "4+6"],
      ["结果", "10"],
    ],
  },
  {
    label: "sum([2,4,6])",
    fields: [
      ["当前元素", "2"],
      ["较小问题", "sum([4,6])"],
      ["组合", "2+10"],
      ["结果", "12"],
    ],
    alert: "分治先确定最简单的空数组，再保证每次递归都删去一个元素。",
  },
] as const;

const partitionCases = [
  {
    label: "选基准",
    fields: [
      ["输入", "[5, 3, 8, 4, 2, 7, 1, 10]"],
      ["基准值", "5"],
      ["待比较", "其余7个元素"],
      ["目标", "构造小于等于组和大于组"],
    ],
  },
  {
    label: "小于组",
    fields: [
      ["扫描结果", "[3, 4, 2, 1]"],
      ["共同性质", "每项小于等于5"],
      ["内部顺序", "尚未有序"],
      ["下一步", "递归快速排序"],
    ],
  },
  {
    label: "大于组",
    fields: [
      ["扫描结果", "[8, 7, 10]"],
      ["共同性质", "每项大于5"],
      ["内部顺序", "尚未有序"],
      ["下一步", "递归快速排序"],
    ],
  },
  {
    label: "拼接",
    fields: [
      ["左侧", "quicksort([3,4,2,1])"],
      ["中间", "[5]"],
      ["右侧", "quicksort([8,7,10])"],
      ["结果", "左侧 + 中间 + 右侧"],
    ],
    alert: "复制分区版返回新数组；只有特定原地分区实现才会把基准交换到原数组中的最终下标。",
  },
] as const;

const complexityCases = [
  {
    label: "平衡分区",
    fields: [
      ["每层总扫描", "Theta(n)"],
      ["递归树高度", "Theta(log n)"],
      ["总时间", "Theta(n log n)"],
      ["调用栈", "Theta(log n)"],
    ],
  },
  {
    label: "持续失衡",
    fields: [
      ["每次规模", "n-1和0"],
      ["递归树高度", "Theta(n)"],
      ["总时间", "Theta(n^2)"],
      ["调用栈", "Theta(n)"],
    ],
  },
  {
    label: "随机基准",
    fields: [
      ["目的", "让固定输入顺序失去针对性"],
      ["期望高度", "Theta(log n)"],
      ["期望时间", "Theta(n log n)"],
      ["保证", "不消除理论最坏情况"],
    ],
  },
  {
    label: "归并排序",
    fields: [
      ["最坏时间", "Theta(n log n)"],
      ["合并空间", "常见数组实现为Theta(n)"],
      ["稳定性", "可稳定"],
      ["实际速度", "仍受常数和访问模式影响"],
    ],
    alert: "大O相同只说明增长阶相同，不说明每个关键操作的常数、缓存行为或内存开销相同。",
  },
] as const;

export function DivideConquerFarmDiagram() {
  const stages = [
    { label: "1680×640", squares: "切出640×640", remainder: "余1040×640", x: 32 },
    { label: "1040×640", squares: "切出640×640", remainder: "余400×640", x: 210 },
    { label: "640×400", squares: "切出400×400", remainder: "余240×400", x: 388 },
    { label: "400×240", squares: "继续缩小", remainder: "最终80×80", x: 566 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 350"
          role="img"
          aria-label="把1680乘640的土地反复切出当前能容纳的最大正方形，余下矩形继续同样处理，最终得到边长80的最大同尺寸方格。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="divide-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>分而治之：把土地切成最大的同尺寸正方形</text>
          <text x="380" y="51" textAnchor="middle" fontSize="11" fill={secondary}>每次保留更小的余下矩形；当一边能整除另一边时，问题达到基线条件</text>
          {stages.slice(0, -1).map((stage, index) => (
            <line
              key={stage.label}
              x1={stage.x + 146}
              y1="147"
              x2={stages[index + 1].x - 8}
              y2="147"
              stroke={accent}
              strokeWidth="1.5"
              markerEnd="url(#divide-arrow)"
            />
          ))}
          {stages.map((stage, index) => (
            <g key={stage.label}>
              <rect x={stage.x} y="92" width="146" height="112" rx="4" fill="var(--bg)" stroke={index === stages.length - 1 ? success : border} />
              <rect x={stage.x + 12} y="106" width="52" height="52" fill={index === stages.length - 1 ? success : accent} fillOpacity="0.15" stroke={index === stages.length - 1 ? success : accent} />
              <rect x={stage.x + 64} y="106" width="64" height="52" fill={warning} fillOpacity="0.1" stroke={warning} strokeDasharray="4 3" />
              <text x={stage.x + 73} y="181" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{stage.label}</text>
              <text x={stage.x + 73} y="221" textAnchor="middle" fontSize="11" fill={secondary}>{stage.squares}</text>
              <text x={stage.x + 73} y="239" textAnchor="middle" fontSize="11" fill={index === stages.length - 1 ? success : accent}>{stage.remainder}</text>
            </g>
          ))}
          <rect x="110" y="275" width="540" height="44" rx="4" fill={success} fillOpacity="0.06" stroke={success} strokeOpacity="0.55" />
          <text x="380" y="294" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>求最大方格边长等价于反复求余：gcd(1680, 640)=80</text>
          <text x="380" y="311" textAnchor="middle" fontSize="11" fill={secondary}>关键不是记住数字，而是识别“余下矩形仍是同一种更小问题”。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分治的设计顺序是先找到最简单的基线，再把当前问题缩小为结构相同的子问题。
      </figcaption>
    </figure>
  );
}
