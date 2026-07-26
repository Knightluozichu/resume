"use client";

import { GrokkingAlgorithmsLab } from "./official-lab";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const rotationCases = [
  {
    label: "左左失衡",
    fields: [
      ["插入序列", "30, 20, 10"],
      ["失衡节点", "30，平衡因子+2"],
      ["修复", "对30右旋"],
      ["新局部根", "20"],
    ],
  },
  {
    label: "右右失衡",
    fields: [
      ["插入序列", "10, 20, 30"],
      ["失衡节点", "10，平衡因子-2"],
      ["修复", "对10左旋"],
      ["新局部根", "20"],
    ],
  },
  {
    label: "左右失衡",
    fields: [
      ["插入序列", "30, 10, 20"],
      ["形状", "新键在左子的右侧"],
      ["修复", "先左旋10，再右旋30"],
      ["新局部根", "20"],
    ],
  },
  {
    label: "右左失衡",
    fields: [
      ["插入序列", "10, 30, 20"],
      ["形状", "新键在右子的左侧"],
      ["修复", "先右旋30，再左旋10"],
      ["新局部根", "20"],
    ],
    alert: "四种修复都保持中序键序列[10, 20, 30]不变；旋转改变形状，不改变BST顺序。",
  },
] as const;

const splayCases = [
  {
    label: "命中深节点",
    fields: [
      ["访问键", "42"],
      ["原位置", "根下第4层"],
      ["动作", "沿访问路径执行伸展旋转"],
      ["结果", "42移动到根"],
    ],
  },
  {
    label: "重复访问",
    fields: [
      ["工作集", "42, 18, 42, 42"],
      ["局部性", "42近期频繁使用"],
      ["结果", "热门键停留在靠近根的位置"],
      ["收益", "后续访问路径变短"],
    ],
  },
  {
    label: "单次最坏",
    fields: [
      ["输入形状", "可能是一条长链"],
      ["一次访问", "可走Theta(n)并做多次旋转"],
      ["保证", "不承诺每次O(log n)"],
      ["重点", "分析操作序列"],
    ],
  },
  {
    label: "摊还保证",
    fields: [
      ["m次操作", "总成本受对数摊还界控制"],
      ["平均到每次", "摊还O(log n)"],
      ["无需", "显式高度或平衡因子"],
      ["适合", "访问具有时间局部性的工作负载"],
    ],
    alert: "摊还不是随机平均：它对整个操作序列分摊偶尔昂贵的伸展步骤。",
  },
] as const;

export function BstShapeDiagram() {
  const balanced = [
    { key: 4, x: 190, y: 88 },
    { key: 2, x: 115, y: 160 },
    { key: 6, x: 265, y: 160 },
    { key: 1, x: 75, y: 238 },
    { key: 3, x: 155, y: 238 },
    { key: 5, x: 225, y: 238 },
    { key: 7, x: 305, y: 238 },
  ];
  const chain = Array.from({ length: 7 }, (_, index) => ({
    key: index + 1,
    x: 450 + index * 42,
    y: 82 + index * 38,
  }));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="同一组键1到7按4、2、6、1、3、5、7插入形成高度2的较矮BST；按1到7升序插入形成高度6的链状BST。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="27" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>相同键，不同插入顺序，不同树高</text>
          <text x="190" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>较矮BST：高度2</text>
          <text x="585" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>退化BST：高度6</text>

          {[
            [balanced[0], balanced[1]], [balanced[0], balanced[2]],
            [balanced[1], balanced[3]], [balanced[1], balanced[4]],
            [balanced[2], balanced[5]], [balanced[2], balanced[6]],
          ].map(([a, b]) => (
            <line key={`${a.key}-${b.key}`} x1={a.x} y1={a.y + 21} x2={b.x} y2={b.y - 21} stroke={border} strokeWidth="2" />
          ))}
          {balanced.map((node) => (
            <g key={node.key}>
              <circle cx={node.x} cy={node.y} r="22" fill={success} fillOpacity="0.11" stroke={success} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.key}</text>
            </g>
          ))}

          {chain.slice(0, -1).map((node, index) => {
            const next = chain[index + 1];
            return <line key={node.key} x1={node.x + 16} y1={node.y + 15} x2={next.x - 16} y2={next.y - 15} stroke={danger} strokeWidth="2" />;
          })}
          {chain.map((node) => (
            <g key={node.key}>
              <circle cx={node.x} cy={node.y} r="18" fill={danger} fillOpacity="0.09" stroke={danger} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.key}</text>
            </g>
          ))}

          <rect x="64" y="302" width="632" height="49" rx="4" fill="var(--bg)" stroke={border} />
          <text x="380" y="322" textAnchor="middle" fontSize="11" fill={primary}>BST查找与插入成本是O(h)，不是自动O(log n)。</text>
          <text x="380" y="340" textAnchor="middle" fontSize="11" fill={secondary}>平衡结构把h维持为O(log n)；升序插入的普通BST可让h增长到n-1。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        插入顺序决定普通BST形状；较矮的树需要更少的根到叶比较。
      </figcaption>
    </figure>
  );
}

export function AvlRotationLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={rotationCases}
      caption="LL、RR用单旋，LR、RL用双旋；四种局部重组都保持BST中序顺序。"
      tone="cyan"
    />
  );
}

export function SplayAccessLab() {
  return (
    <GrokkingAlgorithmsLab
      cases={splayCases}
      caption="伸展树把最近访问节点旋到根，以偶尔昂贵的操作换取整个操作序列的摊还效率。"
      tone="violet"
    />
  );
}

export function BTreePageDiagram() {
  const leaves = [
    { keys: "5 | 12 | 18", x: 92 },
    { keys: "27 | 33", x: 278 },
    { keys: "45 | 53 | 61", x: 464 },
    { keys: "72 | 84 | 93", x: 628 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 380"
          role="img"
          aria-label="B树根节点保存键25、40、70和四个孩子指针，每个叶节点也保存多个键；高分支因子让大量键只需很少层磁盘页访问。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="27" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>B树：一个磁盘页容纳多个键和孩子</text>
          <rect x="248" y="67" width="264" height="70" rx="4" fill={accent} fillOpacity="0.09" stroke={accent} />
          <text x="380" y="88" textAnchor="middle" fontSize="11" fill={secondary}>根页</text>
          {["25", "40", "70"].map((key, index) => (
            <g key={key}>
              <rect x={274 + index * 76} y="96" width="58" height="29" rx="3" fill="var(--bg)" stroke={accent} />
              <text x={303 + index * 76} y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{key}</text>
            </g>
          ))}

          {leaves.map((leaf, index) => {
            const rootX = 270 + index * 73;
            return (
              <g key={leaf.keys}>
                <line x1={rootX} y1="137" x2={leaf.x} y2="222" stroke={border} strokeWidth="2" />
                <rect x={leaf.x - 76} y="222" width="152" height="69" rx="4" fill={success} fillOpacity="0.08" stroke={success} />
                <text x={leaf.x} y="244" textAnchor="middle" fontSize="11" fill={secondary}>叶页 {index + 1}</text>
                <text x={leaf.x} y="272" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{leaf.keys}</text>
              </g>
            );
          })}

          <rect x="82" y="320" width="596" height="39" rx="4" fill={warning} fillOpacity="0.06" stroke={warning} strokeOpacity="0.55" />
          <text x="380" y="338" textAnchor="middle" fontSize="11" fill={primary}>一次读页带回多个键和指针，分支因子远大于2，树高显著降低。</text>
          <text x="380" y="352" textAnchor="middle" fontSize="11" fill={secondary}>页内比较仍有CPU成本，但昂贵I/O次数通常由树层数主导。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        B树降低树高与磁盘访问次数，因此适合数据库索引和文件系统等外存结构。
      </figcaption>
    </figure>
  );
}
