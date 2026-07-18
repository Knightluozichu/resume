"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const bitStates = [
  { bit: 2, mask: "100", contributors: "无", count: 0, remainder: 0, result: "0__" },
  { bit: 1, mask: "010", contributors: "2,2,2,3", count: 4, remainder: 1, result: "01_" },
  { bit: 0, mask: "001", contributors: "1,1,1,3", count: 4, remainder: 1, result: "011 = 3" },
] as const;

const officialCases = [
  { label: "正数中最小", fields: [["数组", "1,1,2,2,2,1,3"], ["唯一值", "3"], ["位置", "数值最小"], ["期望", "3"]] },
  { label: "正数中间", fields: [["数组", "4,3,3,2,2,2,3"], ["唯一值", "4"], ["位置", "大小居中"], ["期望", "4"]] },
  { label: "正数中最大", fields: [["数组", "4,4,1,1,1,7,4"], ["唯一值", "7"], ["位置", "数值最大"], ["期望", "7"]] },
  { label: "唯一值为负", fields: [["数组", "-10,214,214,214"], ["重复值", "214"], ["符号位", "余 1"], ["期望", "-10"]] },
  { label: "重复值为负", fields: [["数组", "-209,3467,-209,-209"], ["唯一值", "3467"], ["负数", "三次抵消"], ["期望", "3467"]] },
  { label: "正负重复", fields: [["数组", "1024,-1025 各三次,1023"], ["重复值", "正负都有"], ["唯一值", "1023"], ["期望", "1023"]] },
  { label: "全部负数", fields: [["数组", "-1024 三次,-1023"], ["唯一值", "-1023"], ["符号位", "保留"], ["期望", "-1023"]] },
  { label: "唯一值为零", fields: [["数组", "-23 与 214 各三次,0"], ["唯一值", "0"], ["全部余数", "0"], ["期望", "0"]] },
  { label: "零出现七次", fields: [["数组", "0 七次,3467"], ["题面约束", "被扩展"], ["零的置位", "始终无"], ["期望", "3467"]] },
] as const;

export function NumberAppearingOnceBitCountDiagram() {
  const rows = [
    ["数字 1 × 3", "001", "bit0 加 3"],
    ["数字 2 × 3", "010", "bit1 加 3"],
    ["数字 3 × 1", "011", "bit1、bit0 各加 1"],
    ["总计", "0 / 4 / 4", "各位对 3 取余为 0 / 1 / 1"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["输入贡献", "低三位", "位计数"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (row[0] === "总计" || index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三次出现的数字在每一位都贡献 3 的倍数；余数 011 正好重建唯一值 3。
      </figcaption>
    </figure>
  );
}

export function NumberAppearingOnceRemainderLab() {
  const [cursor, setCursor] = useState(0);
  const state = bitStates[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">{bitStates.map((item, index) => <button key={item.bit} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>bit {item.bit}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">掩码</div><div className="mt-1 font-mono font-semibold text-primary">{state.mask}</div></div>
          <div className="border border-border bg-background p-3 sm:col-span-2"><div className="text-xs text-muted">贡献者</div><div className="mt-1 text-sm text-primary">{state.contributors}</div></div>
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">计数 / 余数</div><div className="mt-1 font-semibold text-primary">{state.count} / {state.remainder}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">累计结果</div><div className="mt-1 font-mono font-semibold text-success">{state.result}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一位独立对 3 取余；按从高到低次序把余数重新拼成结果。
      </figcaption>
    </figure>
  );
}

export function NumberAppearingOnceNegativeMap() {
  const rows = [
    ["符号位", "-10 为 1", "214 三次贡献 0 或 3", "余数 1"],
    ["中间 27 位", "按补码逐位统计", "三次重复均为 3 的倍数", "保留 -10 位模式"],
    ["低 4 位", "-10 为 0110", "214 的贡献对 3 归零", "余数 0110"],
    ["重建", "32 位补码", "最高位仍为 1", "解释为 -10"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[780px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["区域", "唯一值贡献", "重复值贡献", "模 3 后"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        负数也按完整补码位模式重建；可移植实现应使用固定宽度无符号整数处理这些位。
      </figcaption>
    </figure>
  );
}

export function NumberAppearingOnceContractDiagram() {
  const rows = [
    ["目标", "恰有一个值出现一次", "位余数来自该值", "多目标会按位混合"],
    ["其他值", "各出现三次", "每位贡献为 3 的倍数", "任意 3 的倍数也会消失"],
    ["位宽", "源码固定 32", "int 被视为 32 位", "非 32 位平台不匹配"],
    ["负数", "测试明确覆盖", "需要保留符号位", "signed 左移不便携"],
    ["无效输入", "空指针或非正长度", "抛出异常指针", "旧 MSVC 特定且易泄漏"],
    ["复杂度", "每元素检查 32 位", "O(n) 时间", "O(1) 固定空间"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5"><table className="w-full min-w-[880px] border-collapse text-left text-sm"><thead><tr className="border-b border-border">{["维度", "作者契约或实现", "原理", "边界"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody></table></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        位计数算法依赖频次模 3 契约；源码的异常与位移写法需要现代化才能跨平台。
      </figcaption>
    </figure>
  );
}

export function NumberAppearingOnceOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者 main 执行 9 组测试，覆盖正数大小位置、正负组合、唯一值为零，以及零出现七次的特殊扩展。" />;
}
