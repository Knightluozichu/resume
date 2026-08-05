"use client";

const traceCases = [
  {
    label: "计算长度",
    fields: [["输入", "We are happy."], ["原长度", "13个可见字符"], ["空格", "2个"], ["新长度", "13 + 2×2 = 17"]],
  },
  {
    label: "复制尾部",
    fields: [["读指针", "原字符串结尾\0"], ["写指针", "新字符串结尾\0"], ["动作", "先复制终止符"], ["保证", "结果始终保留合法结尾"]],
  },
  {
    label: "普通字符",
    fields: [["读取", "源字符'.'"], ["写入", "目标末端'.'"], ["移动", "两个指针各左移1"], ["安全", "写指针始终在读指针右侧"]],
  },
  {
    label: "遇到空格",
    fields: [["读取", "一个空格"], ["写入", "逆序写0、2、%"], ["移动", "读指针左移1，写指针左移3"], ["结果", "正序缓冲区得到%20"]],
  },
] as const;

const testCases = [
  { label: "边界位置", fields: [["开头", "' hello' → '%20hello'"], ["结尾", "'hello ' → 'hello%20'"], ["中间", "'hello world'"], ["覆盖", "首尾指针与终止符"]] },
  { label: "连续空格", fields: [["输入", "'hello  world'"], ["输出", "'hello%20%20world'"], ["覆盖", "每个空格独立扩成3字节"], ["禁忌", "不能合并空格"]] },
  { label: "退化输入", fields: [["空串", "保持空串"], ["单空格", "变为%20"], ["全空格", "每个都替换"], ["无空格", "内容不变"]] },
  { label: "容量不足", fields: [["需要", "newLength + 1个槽"], ["现有", "capacity不够"], ["结果", "返回失败且不开始后向写"], ["覆盖", "避免部分修改与越界"]] },
] as const;

export function ExpansionLayoutDiagram() {
  const chars = ["W", "e", " ", "a", "r", "e", "\0"];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 390" role="img" aria-label="原字符串We空格are扩展为We%20are，读指针从原末尾向左，写指针从新末尾向左，避免覆盖未读字符。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">先计算最终边界，再从后向前一次写到位</text>
          <text x="54" y="82" fontSize="11" fontWeight="700" fill="var(--text-secondary)">原布局</text>
          {chars.map((char, index) => <g key={`${char}-${index}`}><rect x={132 + index * 68} y="56" width="54" height="48" fill="var(--bg)" stroke="var(--border)" /><text x={159 + index * 68} y="86" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{char === "\0" ? "\\0" : char === " " ? "空格" : char}</text></g>)}
          <path d="M540 112 V146" stroke="var(--warning)" strokeWidth="2" />
          <text x="540" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">read：原末尾</text>
          <text x="54" y="238" fontSize="11" fontWeight="700" fill="var(--text-secondary)">扩展后</text>
          {["W","e","%","2","0","a","r","e","\0"].map((char, index) => <g key={`${char}-new-${index}`}><rect x={132 + index * 58} y="210" width="46" height="48" fill={index >= 2 && index <= 4 ? "var(--accent)" : "var(--bg)"} fillOpacity={index >= 2 && index <= 4 ? "0.12" : "1"} stroke={index >= 2 && index <= 4 ? "var(--accent)" : "var(--border)"} /><text x={155 + index * 58} y="240" textAnchor="middle" fontSize="12" fontWeight={index >= 2 && index <= 4 ? "700" : "500"} fill="var(--text-primary)">{char === "\0" ? "\\0" : char}</text></g>)}
          <path d="M619 266 V300" stroke="var(--success)" strokeWidth="2" />
          <text x="619" y="318" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">write：新末尾</text>
          <rect x="124" y="344" width="532" height="28" rx="5" fill="var(--success)" fillOpacity="0.07" stroke="var(--success)" />
          <text x="390" y="363" textAnchor="middle" fontSize="11" fill="var(--text-primary)">write不在read左侧，已写区域不会覆盖尚未读取的源字符。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">后向复制把每个字符直接放到最终位置，并把一个空格展开为三个字符。</figcaption>
    </figure>
  );
}

export function CapacityFormulaMap() {
  const rows = [
    ["原可见长度", "originalLength", "不含\\0"],
    ["空格数量", "spaces", "每个净增2"],
    ["新可见长度", "originalLength + 2×spaces", "不含\\0"],
    ["所需缓冲区槽数", "newLength + 1", "包含结尾\\0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead><tr className="border-b border-border"><th className="p-3 text-primary">量</th><th className="p-3 text-primary">计算</th><th className="p-3 text-primary">边界含义</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, i) => <td key={`${row[0]}-${i}`} className={`p-3 ${i === 1 ? "font-mono text-accent" : "text-secondary"}`}>{cell}</td>)}</tr>)}</tbody></table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">%20长度为3，但替换掉原有1个空格，所以每处只净增2；容量还要再留一个终止符。</figcaption>
    </figure>
  );
}
