"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";

const tradeoffCases = [
  {
    label: "按位置读取",
    fields: [
      ["数组", "首地址加偏移，O(1)"],
      ["链表", "从头逐结点前进，O(n)"],
      ["访问方式", "随机访问 vs 顺序访问"],
      ["必要条件", "数组元素定长且下标有效"],
    ],
  },
  {
    label: "中间插入",
    fields: [
      ["数组", "腾位置并移动后缀，O(n)"],
      ["链表", "已有前驱引用时改链接，O(1)"],
      ["寻找位置", "若只给下标，链表仍需O(n)"],
      ["工程成本", "还要考虑扩容和分配"],
    ],
    alert: "“链表插入O(1)”只描述改链接，不包含从头寻找插入位置的时间。",
  },
  {
    label: "中间删除",
    fields: [
      ["数组", "移动后缀填补空位，O(n)"],
      ["链表", "已有前驱引用时改链接，O(1)"],
      ["寻找目标", "按值或下标定位通常O(n)"],
      ["回收", "还可能涉及析构或内存释放"],
    ],
    alert: "复杂度必须包含调用者实际拥有的信息：节点引用、前驱引用和下标不是同一种输入。",
  },
  {
    label: "顺序遍历",
    fields: [
      ["数组", "连续地址，预取和缓存友好"],
      ["链表", "每步跟随指针，结点可能分散"],
      ["渐近量级", "二者遍历都是O(n)"],
      ["实际差异", "数组通常有更小常数"],
    ],
  },
] as const;

const traceCases = [
  {
    label: "第1轮",
    fields: [
      ["未排序区", "[5, 3, 6, 2, 10]"],
      ["扫描最小值", "2，下标3"],
      ["轮末交换", "5与2交换"],
      ["结果", "[2 | 3, 6, 5, 10]"],
    ],
  },
  {
    label: "第2轮",
    fields: [
      ["未排序区", "[3, 6, 5, 10]"],
      ["扫描最小值", "3，已在区首"],
      ["轮末动作", "可跳过自交换"],
      ["结果", "[2, 3 | 6, 5, 10]"],
    ],
  },
  {
    label: "第3轮",
    fields: [
      ["未排序区", "[6, 5, 10]"],
      ["扫描最小值", "5，下标3"],
      ["轮末交换", "6与5交换"],
      ["结果", "[2, 3, 5 | 6, 10]"],
    ],
  },
  {
    label: "第4轮",
    fields: [
      ["未排序区", "[6, 10]"],
      ["扫描最小值", "6，已在区首"],
      ["剩余元素", "10自然位于末尾"],
      ["结果", "[2, 3, 5, 6, 10]"],
    ],
    alert: "每轮结束后，分隔线左侧已经有序，且其中所有元素都不大于右侧元素。",
  },
] as const;

const costCases = [
  {
    label: "比较",
    fields: [
      ["第i轮", "比较n-i-1次"],
      ["总和", "(n-1)+...+1"],
      ["闭式", "n(n-1)/2"],
      ["量级", "Theta(n^2)"],
    ],
  },
  {
    label: "交换",
    fields: [
      ["每轮", "至多1次"],
      ["总数", "至多n-1次"],
      ["已在原位", "可跳过自交换"],
      ["量级", "O(n)次交换"],
    ],
  },
  {
    label: "稳定性",
    fields: [
      ["交换版", "通常不稳定"],
      ["反例", "2a, 2b, 1"],
      ["第一次交换", "1, 2b, 2a"],
      ["稳定变体", "取出最小值并右移区间"],
    ],
    alert: "稳定变体保住相等元素顺序，但会把每轮一次交换变成多次移动。",
  },
  {
    label: "链表实现",
    fields: [
      ["逐轮扫描", "仍可寻找剩余最小结点"],
      ["总扫描", "Theta(n^2)"],
      ["不是必然", "不能笼统写成O(n^3)"],
      ["实际选择", "归并排序通常更合适"],
    ],
  },
] as const;

export function SelectionSortMemoryDiagram() {
  const arrayValues = [5, 3, 6, 2, 10];
  const listNodes = [
    { value: 5, x: 70, y: 260 },
    { value: 3, x: 230, y: 210 },
    { value: 6, x: 390, y: 275 },
    { value: 2, x: 550, y: 220 },
    { value: 10, x: 665, y: 285 },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="数组把五个元素放在连续地址中，链表的五个结点分散在内存中并用next指针连接。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker id="selection-sort-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
            </marker>
          </defs>
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            同一组值，两种内存布局
          </text>
          <text x="28" y="62" fontSize="12" fontWeight="700" fill={success}>数组：连续内存</text>
          <rect x="28" y="76" width="704" height="104" fill="var(--bg)" stroke={border} />
          <rect x="48" y="92" width="330" height="70" fill={success} fillOpacity="0.06" stroke={success} strokeDasharray="5 4" />
          <text x="58" y="108" fontSize="11" fill={secondary}>同一缓存行可带回多个相邻元素</text>
          {arrayValues.map((value, index) => {
            const x = 58 + index * 126;
            return (
              <g key={value}>
                <rect x={x} y="118" width="82" height="34" rx="3" fill={success} fillOpacity="0.14" stroke={success} />
                <text x={x + 41} y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>{value}</text>
                <text x={x + 41} y="170" textAnchor="middle" fontSize="11" fill={secondary}>地址 {1000 + index * 4}</text>
              </g>
            );
          })}

          <text x="28" y="207" fontSize="12" fontWeight="700" fill={accent}>链表：结点可分散，next保存下一结点地址</text>
          <rect x="28" y="220" width="704" height="138" fill="var(--bg)" stroke={border} />
          {listNodes.slice(0, -1).map((node, index) => {
            const next = listNodes[index + 1];
            return (
              <line
                key={`edge-${node.value}`}
                x1={node.x + 54}
                y1={node.y + 16}
                x2={next.x - 8}
                y2={next.y + 16}
                stroke={accent}
                strokeWidth="1.5"
                markerEnd="url(#selection-sort-arrow)"
              />
            );
          })}
          {listNodes.map((node, index) => (
            <g key={`node-${node.value}`}>
              <rect x={node.x} y={node.y} width="54" height="34" rx="3" fill={accent} fillOpacity="0.14" stroke={accent} />
              <text x={node.x + 17} y={node.y + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>{node.value}</text>
              <line x1={node.x + 34} y1={node.y} x2={node.x + 34} y2={node.y + 34} stroke={accent} />
              <text x={node.x + 44} y={node.y + 22} textAnchor="middle" fontSize="11" fill={secondary}>{index === listNodes.length - 1 ? "∅" : "→"}</text>
            </g>
          ))}
          <text x="380" y="380" textAnchor="middle" fontSize="11" fill={secondary}>
            数组下标可直接换算地址；链表第k项必须沿next从头走到目标结点。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渐近复杂度只描述步骤增长；连续布局带来的缓存局部性还会影响实际运行常数。
      </figcaption>
    </figure>
  );
}
