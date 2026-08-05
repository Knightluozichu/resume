"use client";

const officialCases = [
  { label: "Test1", fields: [["树形", "8；6/10；5,7,9,11"], ["前缀", "8,6,5,$,$,7,..."], ["往返", "结构和值相同"], ["覆盖", "完整三层树"]] },
  { label: "Test2", fields: [["树形", "5→左4→左3→左2"], ["空标记", "每层右孩子为$"], ["往返", "保持全左"], ["覆盖", "左偏斜"]] },
  { label: "Test3", fields: [["树形", "5→右4→右3→右2"], ["空标记", "每层左孩子为$"], ["往返", "保持全右"], ["覆盖", "右偏斜"]] },
  { label: "Test4", fields: [["树形", "单节点5"], ["序列", "5,$,$,"], ["往返", "单节点"], ["覆盖", "最小非空树"]] },
  { label: "Test5", fields: [["树形", "nullptr"], ["序列", "$,"], ["往返", "nullptr"], ["覆盖", "空树"]] },
  { label: "Test6", fields: [["值", "9个节点全为5"], ["结构", "左右方向不规则"], ["区分依据", "$空位序列"], ["覆盖", "重复值不能代替结构"]] },
] as const;

export function TreeSerializationTokenDiagram() {
  const tokens = ["8", "6", "5", "$", "$", "7", "$", "$", "10", "9", "$", "$", "11", "$", "$"];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 980 500" role="img" aria-label="三层树按前序输出节点值和美元符号空标记，形成可逆令牌流。" className="mx-auto block h-auto w-full max-w-[980px]">
          <text x="490" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">前序：节点 → 左子树 → 右子树；空位置也占一个token</text>
          {[[8,490,80],[6,330,170],[10,650,170],[5,240,270],[7,420,270],[9,560,270],[11,740,270]].map(([value,x,y]) => <g key={String(value)}><circle cx={x} cy={y} r="27" fill="var(--bg)" stroke="var(--border)" /><text x={x} y={y + 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">{value}</text></g>)}
          {[[472,102,348,148],[508,102,632,148],[312,192,258,246],[348,192,402,246],[632,192,578,246],[668,192,722,246]].map((line,index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke="var(--border)" strokeWidth="2" />)}
          <g transform="translate(20 350)">
            {tokens.map((token,index) => {
              const x = index * 62;
              const isNull = token === "$";
              return <g key={index}><rect x={x} y="0" width="52" height="46" fill={isNull ? "var(--warning)" : "var(--accent)"} fillOpacity="0.1" stroke={isNull ? "var(--warning)" : "var(--accent)"} /><text x={x + 26} y="29" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{token}</text><text x={x + 26} y="63" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index}</text></g>;
            })}
          </g>
          <text x="490" y="474" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">8,6,5,$,$,7,$,$,10,9,$,$,11,$,$,</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">n个真实节点的完整前序空位编码含n+1个$标记，共2n+1个token。</figcaption>
    </figure>
  );
}

export function NullMarkerAmbiguityMap() {
  const rows = [
    ["根5的左孩子5", "只看值前序：5,5", "5,5,$,$,$,", "左结构"],
    ["根5的右孩子5", "只看值前序：5,5", "5,$,5,$,$,", "右结构"],
    ["单节点5", "只看值前序：5", "5,$,$,", "两个空孩子"],
    ["空树", "无值", "$,", "一个空根token"],
    ["Test6全值5", "值序列无法区分", "$位置唯一恢复不规则形状", "可逆"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["树形", "省略空位", "作者编码", "结论"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">相同值前序可对应不同拓扑；显式空节点占位符使编码与树结构一一对应。</figcaption>
    </figure>
  );
}

export function DeserializeCursorMap() {
  const rows = [
    ["读8", "创建根8", "接下来构造8.left", "1"],
    ["读6", "创建节点6", "接下来构造6.left", "2"],
    ["读5", "创建叶候选5", "继续读取两个孩子", "3"],
    ["读$", "5.left=null", "不再递归该分支", "4"],
    ["读$", "5.right=null", "返回节点5", "5"],
    ["后续", "依次完成6.right与8.right", "每个递归恰消费一棵子树", "直到15"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前token", "动作", "递归语义", "下个索引"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">反序列化游标单调前进；数字消费自身及左右子树，$只消费一个空分支。</figcaption>
    </figure>
  );
}
