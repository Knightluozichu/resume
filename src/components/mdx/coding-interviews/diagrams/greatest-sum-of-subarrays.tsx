"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const scanSteps = [
  { index: 0, value: 1, current: 1, best: 1, start: 0, bestRange: "0..0", action: "此前和为0，从1重新开始" },
  { index: 1, value: -2, current: -1, best: 1, start: 0, bestRange: "0..0", action: "此前和为正，延续后得到-1" },
  { index: 2, value: 3, current: 3, best: 3, start: 2, bestRange: "2..2", action: "此前和不正，从3重新开始" },
  { index: 3, value: 10, current: 13, best: 13, start: 2, bestRange: "2..3", action: "延续3得到13，刷新最大和" },
  { index: 4, value: -4, current: 9, best: 13, start: 2, bestRange: "2..3", action: "延续后仍为正，保留候选段" },
  { index: 5, value: 7, current: 16, best: 16, start: 2, bestRange: "2..5", action: "延续得到16，刷新最大和" },
  { index: 6, value: 2, current: 18, best: 18, start: 2, bestRange: "2..6", action: "延续得到18，形成作者期望" },
  { index: 7, value: -5, current: 13, best: 18, start: 2, bestRange: "2..6", action: "当前和降为13，全局最大仍是18" },
] as const;

const officialCases = [
  { label: "混合正负", fields: [["输入", "1,-2,3,10,-4,7,2,-5"], ["最大段", "3,10,-4,7,2"], ["期望", "18"], ["无效标志", "false"]] },
  { label: "全负数组", fields: [["输入", "-2,-8,-1,-5,-9"], ["最大段", "-1"], ["期望", "-1"], ["无效标志", "false"]] },
  { label: "全正数组", fields: [["输入", "2,8,1,5,9"], ["最大段", "全部元素"], ["期望", "25"], ["无效标志", "false"]] },
  { label: "空输入", fields: [["输入", "nullptr, 0"], ["返回", "0"], ["期望", "0"], ["无效标志", "true"]] },
] as const;

export function GreatestSumRecurrenceDiagram() {
  const rows = [
    ["此前current大于0", "current + value", "延续旧段", "正贡献能帮助当前元素"],
    ["此前current小于0", "value", "从当前重启", "负前缀只会拖低后续和"],
    ["此前current等于0", "作者选择value", "从当前重启", "和不变但区间起点改变"],
    ["每步结束", "best = max(best,current)", "保存全局答案", "当前最优与历史最优分离"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["前一状态", "新current", "动作", "理由"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        current只表示“必须以当前位置结尾”的最佳非空子数组，best再汇总所有结尾位置。
      </figcaption>
    </figure>
  );
}

export function GreatestSumScanLab() {
  const [cursor, setCursor] = useState(scanSteps.length - 1);
  const step = scanSteps[cursor];
  const values = scanSteps.map((item) => item.value);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-8 gap-1.5">
          {values.map((value, index) => (
            <div key={index} className={"flex aspect-square items-center justify-center border text-sm font-semibold " + (index === cursor ? "border-accent bg-accent/15 text-accent" : index >= step.start && index <= cursor ? "border-success/60 bg-success/10 text-success" : index < cursor ? "border-border bg-surface text-secondary" : "border-border bg-background text-muted")}>{value}</div>
          ))}
        </div>
        <div className="mt-4 grid min-h-[78px] grid-cols-4 gap-2 border-y border-border py-3 text-center">
          <div><div className="text-xs text-muted">下标</div><div className="mt-1 font-semibold text-primary">{step.index}</div></div>
          <div><div className="text-xs text-muted">当前和</div><div className="mt-1 font-semibold text-accent">{step.current}</div></div>
          <div><div className="text-xs text-muted">最大和</div><div className="mt-1 font-semibold text-success">{step.best}</div></div>
          <div><div className="text-xs text-muted">最佳区间</div><div className="mt-1 font-semibold text-primary">{step.bestRange}</div></div>
        </div>
        <div className="mt-4 flex min-h-10 items-center justify-between gap-3">
          <p className="m-0 text-sm text-secondary">{step.action}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" title="上一步" aria-label="上一步" disabled={cursor === 0} onClick={() => setCursor((value) => Math.max(0, value - 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">←</span></button>
            <button type="button" title="重置" aria-label="重置" onClick={() => setCursor(0)} className="inline-flex size-9 items-center justify-center border border-border text-secondary"><span aria-hidden="true" className="text-lg leading-none">↻</span></button>
            <button type="button" title="下一步" aria-label="下一步" disabled={cursor === scanSteps.length - 1} onClick={() => setCursor((value) => Math.min(scanSteps.length - 1, value + 1))} className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"><span aria-hidden="true" className="text-lg leading-none">→</span></button>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        回放作者Test1；源码只返回18，图中额外追踪的最佳区间是下标2到6。
      </figcaption>
    </figure>
  );
}

export function GreatestSumAllNegativeDiagram() {
  const rows = [
    ["-2", "-2", "-2", "首个非空候选"],
    ["-8", "-8", "-2", "此前和不正，从-8重启"],
    ["-1", "-1", "-1", "最大单元素刷新答案"],
    ["-5", "-5", "-1", "重启但不刷新"],
    ["-9", "-9", "-1", "最终答案不是0"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["当前值", "current", "best", "非空语义"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        best从最小整数而非0开始，确保全负数组选择最大的单个元素-1。
      </figcaption>
    </figure>
  );
}

export function GreatestSumContractDiagram() {
  const rows = [
    ["有效数组，最大和为0", "0 / false", "例如-1,0,-2", "必须读取标志"],
    ["空指针或长度不正", "0 / true", "立即返回", "全局状态表达失败"],
    ["0x80000000初始化", "MSVC常得到INT_MIN", "跨实现转换有风险", "用numeric_limits最低值"],
    ["current加法", "int相加", "溢出是未定义行为", "提升到int64_t或检查"],
    ["并发调用", "共享g_InvalidInput", "线程互相覆盖", "值与状态绑定返回"],
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["场景", "作者结果", "风险", "工程修复"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者用返回0加全局标志区分无效输入；现代接口应避免哨兵、全局状态和有符号溢出。
      </figcaption>
    </figure>
  );
}

export function GreatestSumOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者4组测试，核对混合、全负、全正和空输入的返回值及无效标志。" />;
}
