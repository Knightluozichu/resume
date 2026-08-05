"use client";

const cases = [
  {
    label: "普通与小数",
    fields: [["100", "合法整数"], ["3.1416", "合法小数"], ["600.", "小数尾可空"], ["-.123", "小数头可空"]],
  },
  {
    label: "科学计数",
    fields: [["123.45e+6", "合法"], ["5e2", "合法"], ["-1E-16", "合法"], ["12e", "指数缺数字"]],
  },
  {
    label: "符号与点",
    fields: [["1+23", "符号位置非法"], ["+-5", "连续符号非法"], ["1.2.3", "第二个点非法"], ["+.", "点两侧都无数字"]],
  },
  {
    label: "空与杂质",
    fields: [["1a3.14", "字母未消费"], [".e1", "基数无数字"], ["空串", "非法"], ["空指针", "非法"]],
  },
] as const;

export function NumericGrammarDiagram() {
  const rows = [
    ["A", "有符号整数", "+100、-7、42", "可作为整数部分"],
    ["B", "无符号整数", "123、45、0", "小数点后若出现则不可带符号"],
    ["C", "有符号整数", "+6、-16、2", "指数后必须至少一位数字"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <div className="mb-4 text-center text-sm font-semibold text-primary">A[.[B]][e或EC]　或　.B[e或EC]</div>
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["符号", "扫描器", "示例", "约束"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 0 ? "font-bold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">A和C允许一个前导符号，B只扫描数字；小数点两侧至少一侧有数字。</figcaption>
    </figure>
  );
}

export function NumericCursorInvariantMap() {
  const rows = [
    ["scanUnsigned", "当前位置", "首个非数字", "返回是否至少消费一位"],
    ["scanInteger", "可选正负号前", "整数后的首个字符", "符号后必须有数字"],
    ["小数阶段", "小数点后一位", "小数尾后", "与点前数字做或运算"],
    ["指数阶段", "e或E后一位", "指数整数后", "基数有效且指数完整"],
    ["最终检查", "尚未消费位置", "字符串末尾", "必须恰好到结束符"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["阶段", "进入时游标", "离开时游标", "不变量"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={"p-3 " + (index === 3 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">每个扫描器既返回真假，也把共享游标推进到该语法单元之后。</figcaption>
    </figure>
  );
}

export function DecimalExponentFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 860 390" role="img" aria-label="数值字符串按整数、小数、指数和完整消费四阶段扫描。" className="mx-auto block h-auto w-full max-w-[860px]">
          <defs><marker id="numeric-flow-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="430" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">-123.45e+6 的一次前向扫描</text>
          {[
            ["-123", "扫描A", "基数已有数字", 44],
            [".45", "扫描点与B", "点后无符号整数", 246],
            ["e+6", "扫描e与C", "指数必须是整数", 448],
            ["结束", "完整消费", "没有残留字符", 650],
          ].map(([value, title, note, x], index) => <g key={String(title)}>
            <rect x={Number(x)} y="92" width="166" height="104" rx="5" fill={index === 3 ? "var(--success)" : "var(--bg)"} fillOpacity={index === 3 ? 0.1 : 1} stroke={index === 3 ? "var(--success)" : "var(--border)"} />
            <text x={Number(x) + 83} y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">{title}</text>
            <text x={Number(x) + 83} y="151" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">{value}</text>
            <text x={Number(x) + 83} y="177" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{note}</text>
          </g>)}
          {[210, 412, 614].map((x) => <line key={x} x1={x} y1="144" x2={x + 28} y2="144" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#numeric-flow-arrow)" />)}
          <rect x="92" y="246" width="676" height="96" rx="5" fill="var(--accent)" fillOpacity="0.05" stroke="var(--border)" />
          <text x="430" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">拒绝点</text>
          <text x="430" y="300" textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">12e：C未消费数字　|　1.2.3：第二个点残留　|　1a3：a未消费</text>
          <text x="430" y="324" textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">.e1：点两侧没有数字　|　12e+5.4：指数后的小数点残留</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">阶段内失败或最终还有残留字符，都会拒绝整个输入。</figcaption>
    </figure>
  );
}
