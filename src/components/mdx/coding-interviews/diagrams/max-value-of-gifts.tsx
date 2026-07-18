"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const values = [
  [1, 10, 3, 8],
  [12, 2, 9, 6],
  [5, 7, 4, 11],
  [3, 7, 16, 5],
] as const;

const totals = [
  [1, 11, 14, 22],
  [13, 15, 24, 30],
  [18, 25, 29, 41],
  [21, 32, 48, 53],
] as const;

const path = new Set(["0,0", "1,0", "2,0", "2,1", "3,1", "3,2", "3,3"]);

const rollingRows = [
  { label: "初始", row: -1, state: [0, 0, 0, 0], action: "尚未扫描任何格子" },
  { label: "第0行", row: 0, state: [1, 11, 14, 22], action: "第一行只能从左侧累计" },
  { label: "第1行", row: 1, state: [13, 15, 24, 30], action: "覆盖后每列保存当前行最优" },
  { label: "第2行", row: 2, state: [18, 25, 29, 41], action: "maxValues[j]读上方，j-1读左方" },
  { label: "第3行", row: 3, state: [21, 32, 48, 53], action: "最后一列得到最大价值53" },
] as const;

const officialCases = [
  { label: "3×3递增", fields: [["矩阵", "1..9"], ["最佳路径", "1,4,7,8,9"], ["期望", "29"], ["两解法", "均断言"]] },
  { label: "4×4一般", fields: [["起点/终点", "1 / 5"], ["最佳路径", "1,12,5,7,7,16,5"], ["期望", "53"], ["两解法", "均断言"]] },
  { label: "单行", fields: [["矩阵", "1,10,3,8"], ["移动", "只能向右"], ["期望", "22"], ["两解法", "均断言"]] },
  { label: "单列", fields: [["矩阵", "1,12,5,3"], ["移动", "只能向下"], ["期望", "21"], ["两解法", "均断言"]] },
  { label: "单格", fields: [["矩阵", "3"], ["路径", "起点即终点"], ["期望", "3"], ["两解法", "均断言"]] },
  { label: "空输入", fields: [["输入", "nullptr,0,0"], ["期望", "0"], ["函数", "已定义test6"], ["main", "遗漏调用"]] },
] as const;

export function GiftGridDPDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {values.flatMap((row, rowIndex) => row.map((value, colIndex) => (
            <div key={rowIndex + "-" + colIndex} className="flex min-h-[72px] flex-col items-center justify-center border border-border bg-background">
              <span className="text-xs text-muted">礼物 {value}</span>
              <span className="mt-1 text-lg font-semibold text-accent">{totals[rowIndex][colIndex]}</span>
            </div>
          )))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每格小字是原价值，大字是从左上到该格的最大累计值；右下角得到53。
      </figcaption>
    </figure>
  );
}

export function GiftOptimalPathMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2">
          {values.flatMap((row, rowIndex) => row.map((value, colIndex) => {
            const selected = path.has(rowIndex + "," + colIndex);
            return <div key={rowIndex + "-" + colIndex} className={"flex aspect-square items-center justify-center border text-base font-semibold " + (selected ? "border-success bg-success/15 text-success" : "border-border bg-background text-muted")}>{value}</div>;
          }))}
        </div>
        <div className="mt-4 text-center text-sm text-secondary">1 + 12 + 5 + 7 + 7 + 16 + 5 = <strong className="text-success">53</strong></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从右下按累计值回看较大的上方或左方前驱，可恢复一条最优路径。
      </figcaption>
    </figure>
  );
}

export function GiftRollingArrayLab() {
  const [cursor, setCursor] = useState(rollingRows.length - 1);
  const step = rollingRows[cursor];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-5 gap-2">
          {rollingRows.map((item, index) => <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-10 border text-sm font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}
        </div>
        <div className="mt-4 grid min-h-[76px] grid-cols-4 gap-2 border-y border-border py-3">
          {step.state.map((value, index) => <div key={index} className="flex h-12 items-center justify-center border border-border bg-background text-lg font-semibold text-primary">{value}</div>)}
        </div>
        <p className="mb-0 mt-4 text-sm text-secondary">{step.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一维数组按行覆盖；更新当前列前保存上方值，更新后保存当前格值。
      </figcaption>
    </figure>
  );
}

export function GiftContractDiagram() {
  const rows = [
    ["题设价值", "每格大于0", "缺失前驱可用0", "作者边界成立"],
    ["若允许负值", "0可能胜过合法负路径", "相当于从网格外进入", "显式分支或负无穷"],
    ["存储布局", "values[i*cols+j]", "连续行主序int", "rows/cols必须匹配"],
    ["二维解", "rows×cols额外空间", "可直接回溯累计表", "需逐行释放"],
    ["一维解", "cols额外空间", "只保留上方和左方", "默认不保留路径"],
    ["和值类型", "int", "大网格可能溢出", "使用int64_t并检查"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[940px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["维度", "作者契约", "风险/能力", "工程策略"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空间压缩保留最大值但丢失完整父指针；负值与路径恢复需要重新定义边界状态。
      </figcaption>
    </figure>
  );
}

export function MaxValueOfGiftsOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者定义的6组测试；前5组在main执行，空输入test6存在但漏调。" />;
}
