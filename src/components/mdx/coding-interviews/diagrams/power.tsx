"use client";

const cases = [
  {
    label: "正指数",
    fields: [["2^3", "8"], ["(-2)^3", "-8"], ["奇偶性", "负底数奇次幂为负"], ["状态", "合法"]],
  },
  {
    label: "负指数",
    fields: [["2^-3", "1/(2^3)"], ["结果", "0.125"], ["步骤", "先算绝对值次幂再取倒数"], ["状态", "底数非零"]],
  },
  {
    label: "零指数",
    fields: [["2^0", "1"], ["0^0", "作者约定1"], ["乘法单位元", "result初始为1"], ["状态", "由接口契约决定"]],
  },
  {
    label: "零底数",
    fields: [["0^4", "0"], ["0^-4", "除零，无定义"], ["错误表达", "显式结果而非全局标志"], ["测试", "非法状态必须可观察"]],
  },
] as const;

export function ExponentHalvingDiagram() {
  const nodes = [
    ["x^13", 410, 58],
    ["x^6", 280, 130],
    ["×x", 548, 130],
    ["x^3", 220, 204],
    ["平方", 342, 204],
    ["x^1", 155, 274],
    ["平方×x", 282, 274],
  ] as const;
  const edges = [
    [410,76,280,112],[410,76,548,112],[280,148,220,186],[280,148,342,186],[220,222,155,256],[220,222,282,256],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 360" role="img" aria-label="x的13次方先计算x的6次方并平方再乘x，指数递归减半。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="27" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">分治快速幂：指数每层减半</text>
          {edges.map((e,index) => <line key={index} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke="var(--border)" strokeWidth="2" />)}
          {nodes.map(([label,x,y],index) => <g key={String(label)+index}><rect x={Number(x)-50} y={Number(y)-18} width="100" height="36" rx="5" fill={index===0 ? "var(--accent)" : "var(--bg)"} fillOpacity={index===0 ? 0.1 : 1} stroke={index===0 ? "var(--accent)" : "var(--border)"} /><text x={Number(x)} y={Number(y)+4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{label}</text></g>)}
          <rect x="180" y="316" width="460" height="28" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="335" textAnchor="middle" fontSize="11" fill="var(--text-primary)">13→6→3→1，递归深度等于指数二进制位数。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">偶数指数只需半次幂平方，奇数指数额外乘一次底数。</figcaption>
    </figure>
  );
}

export function BinaryExponentStateMap() {
  const rows = [
    ["初始", "13 = 1101₂", "result=1", "factor=x"],
    ["最低位1", "1101", "result=x", "factor=x²"],
    ["最低位0", "110", "result=x", "factor=x⁴"],
    ["最低位1", "11", "result=x⁵", "factor=x⁸"],
    ["最低位1", "1", "result=x¹³", "结束"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["轮次", "剩余指数", "累计结果", "当前因子"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index===2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">迭代版按指数二进制位选择因子，result始终保存已处理位的乘积。</figcaption>
    </figure>
  );
}

export function PowerContractMap() {
  const rows = [
    ["base非零，exponent正", "直接快速幂", "包括负底数", "有效"],
    ["base非零，exponent负", "对绝对值指数快速幂后取倒数", "可能上溢/下溢", "有效"],
    ["exponent为0", "返回1", "作者包含0^0", "约定"],
    ["base为0，exponent正", "返回0", "不做倒数", "有效"],
    ["base为0，exponent负", "需要除以0", "返回错误", "无定义"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入分类", "动作", "边界", "契约"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index===3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先分类定义域，再进入无符号指数核心，避免边界散落在循环中。</figcaption>
    </figure>
  );
}
