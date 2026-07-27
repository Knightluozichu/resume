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
  const cols = ["bit2", "bit1", "bit0"];
  const colX = [300, 430, 560];
  const rows = [
    { label: "1 × 3", bits: [0, 0, 1] },
    { label: "2 × 3", bits: [0, 1, 0] },
    { label: "3 × 1", bits: [0, 1, 1] },
  ] as const;
  const count = [0, 4, 4];
  const rem = [0, 1, 1];
  const cellW = 100;
  const cellH = 38;
  const rowY = [96, 140, 184];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden border border-border bg-elevated p-4 sm:p-5">
        <svg
          viewBox="0 0 820 400"
          role="img"
          aria-label="数组中唯一出现一次的数字位计数图。1、2、2、2、1、1、3 中 1 和 2 各出现三次，3 出现一次。逐位统计所有数字的该位之和：bit2 为 0，bit1 为 4，bit0 为 4。出现三次的数字在每一位都贡献 3 的倍数，对 3 取余后消失；余数 0、1、1 拼成 011 即唯一值 3。"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x="410" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">逐位求和再模 3：出现三次者归零，余数重建唯一值</text>
          <text x="410" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">例：1、1、1、2、2、2、3（1 与 2 各三次，3 一次）</text>
          {/* 表头 */}
          <text x="120" y={78} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">输入贡献</text>
          {cols.map((c, i) => <text key={c} x={colX[i]} y={78} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">{c}</text>)}
          {/* 数据行 */}
          {rows.map((row, r) => (
            <g key={row.label}>
              <text x="120" y={rowY[r] + cellH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill="var(--text-secondary)">{row.label}</text>
              {row.bits.map((b, i) => (
                <g key={i}>
                  <rect x={colX[i] - cellW / 2} y={rowY[r]} width={cellW} height={cellH} rx="5" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                  <text x={colX[i]} y={rowY[r] + cellH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill={b ? "var(--accent)" : "var(--text-secondary)"}>{b}</text>
                </g>
              ))}
            </g>
          ))}
          {/* 计数行 */}
          <text x="120" y={228 + cellH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">位计数</text>
          {count.map((c, i) => (
            <g key={"c" + i}>
              <rect x={colX[i] - cellW / 2} y={228} width={cellW} height={cellH} rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
              <text x={colX[i]} y={228 + cellH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill="var(--accent)">{c}</text>
            </g>
          ))}
          {/* 余数行 */}
          <text x="120" y={272 + cellH / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--success)">模 3 余数</text>
          {rem.map((c, i) => (
            <g key={"r" + i}>
              <rect x={colX[i] - cellW / 2} y={272} width={cellW} height={cellH} rx="5" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
              <text x={colX[i]} y={272 + cellH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="800" fontFamily="monospace" fill="var(--success)">{c}</text>
            </g>
          ))}
          <text x="410" y="346" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--success)">余数 0 1 1 → 011 = 3（唯一值）</text>
          <text x="410" y="374" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">负数按 32 位补码逐位统计同样成立；每元素检查 32 位，O(n) 时间、O(1) 空间。</text>
        </svg>
      </div>
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
