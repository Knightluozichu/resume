"use client";

const officialCases = [
  { label: "Test1", fields: [["树形", "8；6/10；5,7,9,11"], ["第1行", "8"], ["第2行", "6,10"], ["第3行", "5,7,9,11"]] },
  { label: "Test2", fields: [["树形", "5→左4→左3→左2"], ["输出", "每层一个值"], ["行数", "4"], ["覆盖", "全左链"]] },
  { label: "Test3", fields: [["树形", "5→右4→右3→右2"], ["输出", "每层一个值"], ["行数", "4"], ["覆盖", "全右链"]] },
  { label: "Test4", fields: [["树形", "单节点5"], ["输出", "一行5"], ["换行", "一次"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["树形", "nullptr"], ["输出", "无"], ["换行", "无"], ["覆盖", "空树"]] },
  { label: "Test6", fields: [["树形", "100→左50→右150"], ["输出", "100 / 50 / 150"], ["行数", "3"], ["覆盖", "方向交替稀疏树"]] },
] as const;

export function TreeLineCounterDiagram() {
  const N = ({ x, y, label }: { x: number; y: number; label: number }) => (
    <g>
      <circle cx={x} cy={y} r="18" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.4" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="monospace" fill="var(--accent)">{label}</text>
    </g>
  );
  const E = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="1.4" />
  );
  const lines = [
    { label: "第1行", nodes: [8] },
    { label: "第2行", nodes: [6, 10] },
    { label: "第3行", nodes: [5, 7, 9, 11] },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 420"
          role="img"
          aria-label="按行打印二叉树图。广度优先逐行输出：树 8；6,10；5,7,9,11 输出三行：8 / 6,10 / 5,7,9,11。用两个计数器判断层边界：toBePrinted 记录当前层还剩几个节点未打印，nextLevel 记录下一层已入队几个。每打印一个节点 toBePrinted 减 1 并把其孩子入队使 nextLevel 加 1；当 toBePrinted 为 0 时当前层打完，换行，把 nextLevel 赋给 toBePrinted 并清零 nextLevel。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">BFS 逐行打印：双计数器判断层边界</text>
          {/* 树 */}
          <E x1={230} y1={78} x2={140} y2={130} />
          <E x1={230} y1={78} x2={320} y2={130} />
          <E x1={140} y1={150} x2={90} y2={200} />
          <E x1={140} y1={150} x2={190} y2={200} />
          <E x1={320} y1={150} x2={270} y2={200} />
          <E x1={320} y1={150} x2={370} y2={200} />
          <N x={230} y={64} label={8} />
          <N x={140} y={140} label={6} />
          <N x={320} y={140} label={10} />
          <N x={90} y={210} label={5} />
          <N x={190} y={210} label={7} />
          <N x={270} y={210} label={9} />
          <N x={370} y={210} label={11} />
          {/* 逐行输出 */}
          <text x="600" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">逐行输出</text>
          {lines.map((ln, r) => (
            <g key={ln.label}>
              <text x={500} y={98 + r * 44} fontSize="11" fontWeight="700" fill="var(--success)">{ln.label}</text>
              {ln.nodes.map((v, i) => (
                <g key={v}>
                  <rect x={540 + i * 46} y={80 + r * 44} width={40} height={30} rx="5" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
                  <text x={560 + i * 46} y={100 + r * 44} textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="monospace" fill="var(--success)">{v}</text>
                </g>
              ))}
            </g>
          ))}
          {/* 计数器逻辑 */}
          <text x="410" y="262" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">双计数器：toBePrinted（当前层剩余） / nextLevel（下一层已入队）</text>
          <text x="410" y="292" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">打印一个节点：toBePrinted − 1；其非空孩子入队：nextLevel + 1。</text>
          <text x="410" y="318" textAnchor="middle" fontSize="12" fill="var(--success)">toBePrinted == 0 → 当前层打完：换行，toBePrinted = nextLevel，nextLevel = 0。</text>
          <text x="410" y="352" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">例：根层 toBePrinted=1；打 8 后其孩子 6,10 入队 nextLevel=2，toBePrinted 归 0 → 换行。</text>
          <text x="410" y="378" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">当前层计数归零的瞬间下一层已全部入队，二者可安全转移；O(n) 时间、O(w) 队列空间。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">当前层计数归零的瞬间，下一层节点已经全部进入队列，二者可安全转移并换行。</figcaption>
    </figure>
  );
}

export function TreeLineBoundaryMap() {
  const rows = [
    ["出队并打印节点", "toBePrinted减1", "消费当前层一个位置"],
    ["左孩子非空入队", "nextLevel加1", "登记下一层一个节点"],
    ["右孩子非空入队", "nextLevel加1", "维持同层左到右"],
    ["toBePrinted不为0", "不换行", "当前层尚有节点"],
    ["toBePrinted等于0", "换行；赋值nextLevel；清零nextLevel", "层边界完成"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["事件", "计数更新", "语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 1 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">两个计数器分别记账，换行只发生在当前层最后一个节点完成之后。</figcaption>
    </figure>
  );
}

export function TreeLineStrategyMap() {
  const rows = [
    ["作者双计数", "逐节点递减当前层、累加下一层", "流式printf", "精确体现状态转移"],
    ["层首快照", "每层开始缓存queue.size()", "二维结果更自然", "固定循环次数"],
    ["哨兵nullptr", "层尾加入空标记", "不推荐默认使用", "多一次特殊分支"],
    ["两个队列", "current与next交换", "边界直观", "容器状态更多"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["方案", "层边界来源", "适合输出", "特点"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 0 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">四种方法时间和渐进队列空间相同；作者源码应优先按双计数器理解。</figcaption>
    </figure>
  );
}
