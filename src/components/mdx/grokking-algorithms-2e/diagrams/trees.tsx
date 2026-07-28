"use client";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

const dfsCases = [
  {
    label: "进入/home",
    fields: [
      ["当前节点", "/home"],
      ["栈", "/home"],
      ["孩子", "docs, photos"],
      ["动作", "先进入docs"],
    ],
  },
  {
    label: "深入docs",
    fields: [
      ["当前节点", "docs"],
      ["栈", "/home, docs"],
      ["孩子", "notes.txt, book.pdf"],
      ["动作", "处理notes.txt"],
    ],
  },
  {
    label: "遇到叶子",
    fields: [
      ["当前节点", "notes.txt"],
      ["孩子", "无"],
      ["动作", "返回父目录docs"],
      ["下一项", "book.pdf"],
    ],
  },
  {
    label: "回溯换支",
    fields: [
      ["docs完成", "弹栈"],
      ["恢复", "/home"],
      ["下一分支", "photos"],
      ["顺序", "沿一支到底再回溯"],
    ],
    alert: "递归DFS把未完成的兄弟分支隐含在调用栈；显式栈版本必须自己保存同样状态。",
  },
] as const;

const propertyCases = [
  {
    label: "有根树",
    fields: [
      ["起点", "唯一根节点"],
      ["父关系", "非根节点恰有一个父节点"],
      ["叶节点", "没有孩子"],
      ["方向", "可从根解释层级"],
    ],
  },
  {
    label: "连通",
    fields: [
      ["要求", "任意节点都能到达其他节点"],
      ["若断开", "得到森林或多个分量"],
      ["边数", "n个节点的树有n-1条边"],
      ["意义", "不存在孤立子结构"],
    ],
  },
  {
    label: "无环",
    fields: [
      ["要求", "不存在回到起点的简单环"],
      ["若加一边", "唯一两点路径可能变成两条"],
      ["遍历", "父子方向下无需visited防回边"],
      ["一般图", "仍需已访问集合"],
    ],
  },
  {
    label: "二叉树",
    fields: [
      ["孩子上限", "每个节点至多2个"],
      ["不等于", "二叉搜索树"],
      ["本章用途", "霍夫曼编码树"],
      ["下一章", "BST与平衡树"],
    ],
    alert: "“二叉”只限制孩子数量，不自动规定左键较小、右键较大。",
  },
] as const;

export function TreeAnatomyDiagram() {
  const nodes = [
    { id: "/home", x: 380, y: 78, tone: success, role: "根" },
    { id: "docs", x: 230, y: 168, tone: accent, role: "父/子" },
    { id: "photos", x: 530, y: 168, tone: accent, role: "父/子" },
    { id: "notes.txt", x: 145, y: 270, tone: warning, role: "叶" },
    { id: "book.pdf", x: 315, y: 270, tone: warning, role: "叶" },
    { id: "trip.jpg", x: 530, y: 270, tone: warning, role: "叶" },
  ];
  const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const edges = [
    ["/home", "docs"],
    ["/home", "photos"],
    ["docs", "notes.txt"],
    ["docs", "book.pdf"],
    ["photos", "trip.jpg"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 390"
          role="img"
          aria-label="文件目录树以home为根，docs和photos为孩子，notes.txt、book.pdf和trip.jpg为叶节点；每个非根节点只有一个父节点。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>文件目录形成有根树</text>
          <text x="380" y="49" textAnchor="middle" fontSize="11" fill={secondary}>根没有父节点；内部节点既是孩子也可能是父节点；叶节点没有孩子</text>
          {edges.map(([from, to]) => {
            const a = nodeById[from];
            const b = nodeById[to];
            return (
              <line key={`${from}-${to}`} x1={a.x} y1={a.y + 28} x2={b.x} y2={b.y - 28} stroke={border} strokeWidth="2" />
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <rect x={node.x - 58} y={node.y - 27} width="116" height="54" rx="4" fill={node.tone} fillOpacity="0.1" stroke={node.tone} />
              <text x={node.x} y={node.y - 3} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.id}</text>
              <text x={node.x} y={node.y + 16} textAnchor="middle" fontSize="11" fill={node.tone}>{node.role}</text>
            </g>
          ))}
          <rect x="88" y="335" width="584" height="31" rx="4" fill="var(--bg)" stroke={border} />
          <text x="380" y="355" textAnchor="middle" fontSize="11" fill={primary}>从根到任一文件只有一条简单路径，例如/home → docs → notes.txt。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件目录把层级与唯一路径表达得很自然；硬链接等真实文件系统特性可能让结构不再是严格树。
      </figcaption>
    </figure>
  );
}
export function HuffmanCodingDiagram() {
  const nodes = [
    { label: "总频率9", x: 380, y: 74, tone: accent },
    { label: "A:5", x: 220, y: 160, tone: success },
    { label: "合并4", x: 540, y: 160, tone: accent },
    { label: "B:2", x: 455, y: 252, tone: success },
    { label: "合并2", x: 625, y: 252, tone: accent },
    { label: "C:1", x: 580, y: 334, tone: warning },
    { label: "D:1", x: 690, y: 334, tone: warning },
  ];
  const edges = [
    [380, 74, 220, 160, "0"],
    [380, 74, 540, 160, "1"],
    [540, 160, 455, 252, "0"],
    [540, 160, 625, 252, "1"],
    [625, 252, 580, 334, "0"],
    [625, 252, 690, 334, "1"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 760 405"
          role="img"
          aria-label="霍夫曼树中频率5的A编码为0，频率2的B编码为10，频率1的C和D编码为110与111；高频字符路径更短。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x="380" y="27" textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>霍夫曼树：高频字符走更短路径</text>
          <text x="145" y="82" textAnchor="middle" fontSize="11" fill={secondary}>频率：A=5, B=2, C=1, D=1</text>
          {edges.map(([x1, y1, x2, y2, bit], index) => (
            <g key={index}>
              <line x1={x1} y1={y1 + 22} x2={x2} y2={y2 - 22} stroke={border} strokeWidth="2" />
              <text x={(x1 + x2) / 2 + (bit === "0" ? -8 : 8)} y={(y1 + y2) / 2} fontSize="11" fontWeight="700" fill={bit === "0" ? success : accent}>{bit}</text>
            </g>
          ))}
          {nodes.map((node) => (
            <g key={node.label}>
              <rect x={node.x - 48} y={node.y - 22} width="96" height="44" rx="4" fill={node.tone} fillOpacity="0.1" stroke={node.tone} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>{node.label}</text>
            </g>
          ))}
          <rect x="34" y="118" width="270" height="190" rx="4" fill="var(--bg)" stroke={border} />
          <text x="169" y="143" textAnchor="middle" fontSize="11" fontWeight="700" fill={primary}>从根到叶读取比特</text>
          <text x="64" y="174" fontSize="11" fill={primary}>A → 0</text>
          <text x="64" y="202" fontSize="11" fill={primary}>B → 10</text>
          <text x="64" y="230" fontSize="11" fill={primary}>C → 110</text>
          <text x="64" y="258" fontSize="11" fill={primary}>D → 111</text>
          <text x="64" y="289" fontSize="11" fill={secondary}>没有任何字符码是另一个字符码的前缀。</text>
          <rect x="34" y="330" width="470" height="45" rx="4" fill={success} fillOpacity="0.06" stroke={success} strokeOpacity="0.55" />
          <text x="269" y="349" textAnchor="middle" fontSize="11" fill={primary}>固定2比特需18比特；霍夫曼加权长度为15比特。</text>
          <text x="269" y="365" textAnchor="middle" fontSize="11" fill={secondary}>编码表本身或树结构也必须让解码端知晓。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反复合并频率最小的两个节点建树；左边记0、右边记1即可得到无歧义前缀码。
      </figcaption>
    </figure>
  );
}
