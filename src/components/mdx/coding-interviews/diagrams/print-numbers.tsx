"use client";

import { CodingInterviewLab } from "./official-lab";

const cases = [
  {
    label: "n=1",
    fields: [["范围", "1…9"], ["数量", "9"], ["增量法", "0→1直到9后溢出"], ["递归法", "枚举0…9并跳过0"]],
  },
  {
    label: "n=2",
    fields: [["范围", "1…99"], ["数量", "99"], ["进位边界", "09→10、99→溢出"], ["输出", "流式，不缓存全部"]],
  },
  {
    label: "n=3",
    fields: [["范围", "1…999"], ["数量", "999"], ["前导零", "001输出为1"], ["最大值", "999"]],
  },
  {
    label: "n≤0",
    fields: [["n=0", "不输出"], ["n=-1", "不输出"], ["分配", "不创建负/零长度缓冲"], ["状态", "立即返回"]],
  },
] as const;

export function DecimalIncrementDiagram() {
  const states = [
    ["0","0","9","8"],
    ["0","0","9","9"],
    ["0","1","0","0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 350" role="img" aria-label="字符串数字0098加一得到0099，再加一经过连续进位得到0100。" className="mx-auto block h-auto w-full max-w-[820px]">
          <defs><marker id="increment-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="var(--accent)" /></marker></defs>
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">字符数组上的十进制加一</text>
          {states.map((digits,row) => <g key={row}>{digits.map((digit,col) => <g key={col}><rect x={212+col*96} y={72+row*84} width="76" height="56" rx="5" fill={row===2 && col===1 ? "var(--success)" : "var(--bg)"} fillOpacity={row===2 && col===1 ? 0.12 : 1} stroke={row===2 && col===1 ? "var(--success)" : "var(--border)"} /><text x={250+col*96} y={108+row*84} textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--text-primary)">{digit}</text></g>)}</g>)}
          <path d="M622 100 L654 100 L654 184 L622 184" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#increment-arrow)" />
          <path d="M622 184 L654 184 L654 268 L622 268" fill="none" stroke="var(--accent)" strokeWidth="3" markerEnd="url(#increment-arrow)" />
          <text x="698" y="144" textAnchor="middle" fontSize="10.5" fill="var(--accent)">+1</text>
          <text x="698" y="228" textAnchor="middle" fontSize="10.5" fill="var(--accent)">+1并进位</text>
          <text x="410" y="328" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">存储始终4位；输出时0098、0099、0100分别显示98、99、100。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">个位开始加一，遇到10写0并向左传播进位。</figcaption>
    </figure>
  );
}

export function CarryTransitionMap() {
  const rows = [
    ["当前和小于10", "写回对应数字", "清除进位并停止", "普通加一"],
    ["当前和等于10且不是最高位", "当前位写0", "进位保持1继续向左", "连续9"],
    ["最高位产生进位", "超过n位", "报告溢出并结束", "999…999之后"],
    ["输出阶段", "跳过左侧连续0", "全0不输出", "0012显示12"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[740px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["状态", "当前位动作", "下一步", "示例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell,index) => <td key={cell} className={"p-3 " + (index===2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">加法状态与格式化状态分离，前导零只影响展示，不改变内部位数。</figcaption>
    </figure>
  );
}

export function DigitEnumerationTreeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 820 360" role="img" aria-label="两位数字递归树第一层选0到9，第二层再次选0到9，共100个叶子并跳过00。" className="mx-auto block h-auto w-full max-w-[820px]">
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">n=2：每一位独立枚举0到9</text>
          <rect x="350" y="52" width="120" height="42" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" />
          <text x="410" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">选择第0位</text>
          {[[110,"0"],[260,"1"],[410,"…"],[560,"8"],[710,"9"]].map(([x,label]) => <g key={String(label)}><line x1="410" y1="94" x2={Number(x)} y2="142" stroke="var(--border)" strokeWidth="2" /><rect x={Number(x)-48} y="142" width="96" height="38" rx="5" fill="var(--bg)" stroke="var(--border)" /><text x={Number(x)} y="166" textAnchor="middle" fontSize="11" fill="var(--text-primary)">首位 {label}</text></g>)}
          {[[110,"00 / 01 / … / 09"],[260,"10 / 11 / … / 19"],[560,"80 / … / 89"],[710,"90 / … / 99"]].map(([x,label]) => <g key={String(label)}><line x1={Number(x)} y1="180" x2={Number(x)} y2="230" stroke="var(--border)" strokeWidth="2" /><rect x={Number(x)-66} y="230" width="132" height="42" rx="5" fill={x===110 ? "var(--warning)" : "var(--success)"} fillOpacity="0.08" stroke={x===110 ? "var(--warning)" : "var(--success)"} /><text x={Number(x)} y="256" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">{label}</text></g>)}
          <rect x="174" y="310" width="472" height="30" rx="5" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" />
          <text x="410" y="330" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">100个叶子按字典序生成；00跳过，其余去前导零后为1到99。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">书中称全排列递归，严格说是允许重复选择的十进制笛卡尔积枚举。</figcaption>
    </figure>
  );
}

export function PrintNumbersCaseLab() {
  return <CodingInterviewLab cases={cases} caption="切换作者官方n值，核对范围、进位、前导零和非法输入。" />;
}
