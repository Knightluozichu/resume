"use client";

import { CodingInterviewLab } from "./official-lab";

const traceCases = [
  {
    label: "起点 i=0",
    fields: [
      ["数组", "[2, 3, 1, 0, 2, 5, 3]"],
      ["观察", "numbers[0]=2，不等于下标0"],
      ["目标槽", "查看numbers[2]=1"],
      ["动作", "2尚未归位，交换下标0与2"],
    ],
  },
  {
    label: "第一次交换",
    fields: [
      ["数组", "[1, 3, 2, 0, 2, 5, 3]"],
      ["已归位", "下标2保存数字2"],
      ["当前位置", "numbers[0]=1"],
      ["动作", "交换下标0与1"],
    ],
  },
  {
    label: "继续归位",
    fields: [
      ["数组", "[3, 1, 2, 0, 2, 5, 3]"],
      ["目标槽", "numbers[3]=0"],
      ["动作", "交换下标0与3"],
      ["结果", "前四个位置成为[0,1,2,3]"],
    ],
  },
  {
    label: "发现重复",
    fields: [
      ["位置", "i=4，numbers[4]=2"],
      ["目标槽", "numbers[2]=2"],
      ["判断", "同一个值已经占据自己的槽"],
      ["输出", "重复数字2"],
    ],
  },
] as const;

const testCases = [
  {
    label: "最小重复",
    fields: [["输入", "[2,1,3,1,4]"], ["允许输出", "1"], ["覆盖", "重复值靠近下界"], ["检查", "返回存在且值确实重复"]],
  },
  {
    label: "多个重复",
    fields: [["输入", "[2,4,2,1,4]"], ["允许输出", "2或4"], ["覆盖", "题目只要求任意一个"], ["禁忌", "测试不能固定唯一答案"]],
  },
  {
    label: "无重复",
    fields: [["输入", "[2,1,3,0,4]"], ["输出", "未找到"], ["覆盖", "每个数字最终都能归位"], ["检查", "循环必然终止"]],
  },
  {
    label: "非法值域",
    fields: [["输入", "[2,1,3,5,4]"], ["问题", "长度5却出现5"], ["风险", "numbers[numbers[i]]越界"], ["要求", "任何索引访问前先整体校验"]],
  },
] as const;

export function PlacementInvariantDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg viewBox="0 0 780 360" role="img" aria-label="值m应放在下标m的槽位；若目标槽已是m，则发现重复，否则交换让至少一个数字归位。" className="mx-auto block h-auto w-full max-w-[780px]">
          <text x="390" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">值域0..n-1把每个数字映射到唯一目标槽</text>
          <text x="84" y="74" fontSize="11" fill="var(--text-secondary)">下标</text>
          {[0, 1, 2, 3, 4, 5, 6].map((value, index) => {
            const x = 122 + index * 82;
            return <g key={value}><text x={x + 30} y="74" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{value}</text><rect x={x} y="88" width="60" height="52" fill="var(--bg)" stroke="var(--border)" /><text x={x + 30} y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill={index === 0 || index === 2 ? "var(--warning)" : "var(--text-primary)"}>{[2,3,1,0,2,5,3][index]}</text></g>;
          })}
          <path d="M152 148 C152 206 316 206 316 148" fill="none" stroke="var(--warning)" strokeWidth="3" />
          <path d="M316 148 l-7 10 h14 z" fill="var(--warning)" />
          <text x="234" y="224" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">numbers[0]=2，应去下标2</text>
          <rect x="80" y="256" width="280" height="64" rx="5" fill="var(--success)" fillOpacity="0.07" stroke="var(--success)" />
          <text x="220" y="281" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">目标槽不是2：交换</text>
          <text x="220" y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">交换后数字2永久归位，推进终止度量</text>
          <rect x="420" y="256" width="280" height="64" rx="5" fill="var(--danger)" fillOpacity="0.07" stroke="var(--danger)" />
          <text x="560" y="281" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">目标槽已经是2：重复</text>
          <text x="560" y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">两个位置都想占用下标2，对应同一数字</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">交换不是排序全数组，只负责让当前数字回到由它的值指定的槽位。</figcaption>
    </figure>
  );
}

export function ContractMatrixMap() {
  const rows = [
    ["长度", "n 且 n > 0", "空数组与长度不一致"],
    ["值域", "每个值都在0..n-1", "负数或值n导致越界"],
    ["修改", "允许重排输入", "调用者需要保留原顺序"],
    ["输出", "任意一个重复值", "调用者要求全部重复值"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border"><th className="p-3 text-primary">维度</th><th className="p-3 text-success">算法成立条件</th><th className="p-3 text-danger">必须拒绝或换方案</th></tr></thead>
          <tbody>{rows.map(([name, yes, no]) => <tr key={name} className="border-b border-border last:border-0"><th className="p-3 text-primary">{name}</th><td className="p-3 text-secondary">{yes}</td><td className="p-3 text-secondary">{no}</td></tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">值可作下标和允许修改输入，是原地方案的两个核心前提。</figcaption>
    </figure>
  );
}

export function DuplicateTraceLab() {
  return <CodingInterviewLab cases={traceCases} caption="逐步重放[2,3,1,0,2,5,3]，观察每次交换如何让一个值归位。" />;
}

export function InPlaceTestLab() {
  return <CodingInterviewLab cases={testCases} caption="作者测试覆盖最小值、最大值、多个重复、无重复和非法输入。" />;
}
