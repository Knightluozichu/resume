"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const mergeStates = [
  { label: "7 对 6", left: "7", right: "6", output: "· · · · · 7", added: 3, total: 3, action: "7大于右段最大6，因此也大于2、3；一次加入3对" },
  { label: "4 对 6", left: "4", right: "6", output: "· · · · 6 7", added: 0, total: 3, action: "4不大于6，先把6放到输出末端" },
  { label: "4 对 3", left: "4", right: "3", output: "· · · 4 6 7", added: 2, total: 5, action: "4大于右段剩余2、3；一次加入2对" },
  { label: "1 对 3", left: "1", right: "3", output: "· · 3 4 6 7", added: 0, total: 5, action: "1不大于3，移动右指针" },
  { label: "1 对 2", left: "1", right: "2", output: "· 2 3 4 6 7", added: 0, total: 5, action: "1不大于2，右段耗尽" },
  { label: "收尾", left: "1", right: "无", output: "1 2 3 4 6 7", added: 0, total: 5, action: "复制左段剩余1，归并完成" },
] as const;

const officialCases = [
  { label: "尾部倒序", fields: [["输入", "1,2,3,4,7,6,5"], ["期望", "3"], ["逆序对", "7>6、7>5、6>5"], ["覆盖", "局部倒序"]] },
  { label: "全递减", fields: [["输入", "6,5,4,3,2,1"], ["期望", "15"], ["公式", "6×5÷2"], ["覆盖", "最大计数"]] },
  { label: "全递增", fields: [["输入", "1,2,3,4,5,6"], ["期望", "0"], ["跨段", "均为0"], ["覆盖", "零计数"]] },
  { label: "单元素", fields: [["输入", "1"], ["期望", "0"], ["递归", "直接基例"], ["覆盖", "最小合法"]] },
  { label: "两数升序", fields: [["输入", "1,2"], ["期望", "0"], ["比较", "1不大于2"], ["覆盖", "二元素无逆序"]] },
  { label: "两数降序", fields: [["输入", "2,1"], ["期望", "1"], ["比较", "2大于1"], ["覆盖", "二元素一对"]] },
  { label: "含相等值", fields: [["输入", "1,2,1,2,1"], ["期望", "3"], ["相等", "不计入"], ["覆盖", "严格大于"]] },
  { label: "空指针", fields: [["输入", "nullptr,0"], ["期望", "0"], ["入口", "立即返回"], ["注意", "非空零长度不安全"]] },
] as const;

export function InversePairDecompositionDiagram() {
  const groups = [
    { label: "左段内部", values: "[1, 4, 7]", count: 0, note: "已经有序" },
    { label: "右段内部", values: "[2, 3, 6]", count: 0, note: "已经有序" },
    { label: "跨段逆序", values: "(4,2)、(4,3)、(7,2)、(7,3)、(7,6)", count: 5, note: "归并时批量统计" },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-3 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.label} className="border border-border bg-elevated p-4">
            <div className="text-sm font-semibold text-accent">{group.label}</div>
            <div className="mt-3 min-h-[46px] text-sm text-secondary">{group.values}</div>
            <div className="mt-3 border-t border-border pt-3 text-2xl font-semibold text-primary">{group.count}</div>
            <div className="mt-1 text-xs text-muted">{group.note}</div>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总逆序数等于左段内部、右段内部与跨段三部分之和；分治递归处理前两部分。
      </figcaption>
    </figure>
  );
}

export function InversePairReverseMergeLab() {
  const [cursor, setCursor] = useState(0);
  const state = mergeStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-1.5">
          {mergeStates.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"min-h-11 border px-1 text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">左指针</div><div className="mt-1 font-semibold text-primary">{state.left}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">右指针</div><div className="mt-1 font-semibold text-primary">{state.right}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">本轮新增</div><div className="mt-1 font-semibold text-warning">{state.added}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">跨段累计</div><div className="mt-1 font-semibold text-success">{state.total}</div></div>
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-center font-mono text-sm text-primary">{state.output}</div>
        <p className="mb-0 mt-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者从两段尾部向前归并；左端最大值更大时，它大于右段全部剩余值。
      </figcaption>
    </figure>
  );
}

export function InversePairBufferSwapMap() {
  const rows = [
    ["顶层 [0..3]", "data A", "copy B", "递归先把两半排入A，再从A归并到B"],
    ["子层 [0..1]", "copy B", "data A", "参数互换，从B读取并写回A"],
    ["基例 [0..0]", "data A", "copy B", "复制单元素，建立子层读取源"],
    ["子层 [2..3]", "copy B", "data A", "同样把右半排序写入A"],
    ["顶层合并", "data A", "copy B", "A含两个有序半段，B得到整段有序结果"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["调用层", "读取参数", "写入参数", "作用"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        递归调用交换data与copy角色，避免每层归并后再把整个区间复制回去。
      </figcaption>
    </figure>
  );
}

export function InversePairContractDiagram() {
  const rows = [
    ["相等元素", "不构成逆序对", "比较使用严格大于", "相等时取右段"],
    ["nullptr, 0", "返回0", "作者Test8覆盖", "入口由空指针拦截"],
    ["非空指针, 0", "未被length小于0拦截", "end变成-1", "应改为length小于等于0"],
    ["输入数组", "递归子层写回data", "会被部分排序", "只读需求先复制工作数组"],
    ["计数类型", "作者返回int", "降序大数组溢出", "使用int64_t"],
    ["辅助空间", "长度n的copy加递归栈", "O(n)", "复用单缓冲区"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "源码语义", "风险", "工程处理"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者示例在常规正长度输入上正确；零长度非空指针、输入改写与计数上界需要额外契约。
      </figcaption>
    </figure>
  );
}

export function InversePairsOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者main执行8组测试，覆盖局部倒序、全降、全升、单元素、两元素、相等值与空指针。" />;
}
