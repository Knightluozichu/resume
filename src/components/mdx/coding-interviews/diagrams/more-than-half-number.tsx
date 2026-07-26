"use client";

import { useMemo, useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const cancellationSteps = [
  { index: 0, value: 1, candidate: 1, times: 1, action: "用首元素初始化候选" },
  { index: 1, value: 2, candidate: 1, times: 0, action: "异值抵消，票数归零" },
  { index: 2, value: 3, candidate: 3, times: 1, action: "票数为零，改选3" },
  { index: 3, value: 2, candidate: 3, times: 0, action: "异值抵消，票数归零" },
  { index: 4, value: 2, candidate: 2, times: 1, action: "票数为零，改选2" },
  { index: 5, value: 2, candidate: 2, times: 2, action: "同值支持，票数加一" },
  { index: 6, value: 5, candidate: 2, times: 1, action: "异值抵消，票数减一" },
  { index: 7, value: 4, candidate: 2, times: 0, action: "异值抵消，票数归零" },
  { index: 8, value: 2, candidate: 2, times: 1, action: "票数为零，重新选2" },
] as const;

const officialCases = [
  { label: "存在多数", fields: [["输入", "1,2,3,2,2,2,5,4,2"], ["期望", "2"], ["无效标志", "false"], ["覆盖", "一般位置"]] },
  { label: "不存在多数", fields: [["输入", "1,2,3,2,4,2,5,2,3"], ["期望", "0"], ["无效标志", "true"], ["覆盖", "必须复核"]] },
  { label: "多数在前半", fields: [["输入", "2,2,2,2,2,1,3,4,5"], ["期望", "2"], ["无效标志", "false"], ["覆盖", "集中前段"]] },
  { label: "多数在后半", fields: [["输入", "1,3,4,5,2,2,2,2,2"], ["期望", "2"], ["无效标志", "false"], ["覆盖", "集中后段"]] },
  { label: "单元素", fields: [["输入", "1"], ["期望", "1"], ["无效标志", "false"], ["覆盖", "最小有效数组"]] },
  { label: "空输入", fields: [["输入", "nullptr, 0"], ["期望", "0"], ["无效标志", "true"], ["覆盖", "官方无效输入"]] },
] as const;

export function MajorityPartitionDiagram() {
  const rows = [
    ["middle = length >> 1", "目标下标4", "只关心中位位置，不要求全数组有序"],
    ["index 大于 middle", "end = index - 1", "目标只可能在左侧区间"],
    ["index 小于 middle", "start = index + 1", "目标只可能在右侧区间"],
    ["index 等于 middle", "numbers[middle]", "得到候选后仍需统计真实次数"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["判断", "区间动作", "含义"].map((item) => (
                <th key={item} className="p-3 text-primary">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => (
                  <td key={cell} className={"p-3 " + (index === 1 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者复用随机 Partition，把第4小的元素放到下标4；若真有严格多数，中位位置必然属于它。
      </figcaption>
    </figure>
  );
}

export function MajorityCancellationMap() {
  const [cursor, setCursor] = useState(cancellationSteps.length - 1);
  const step = cancellationSteps[cursor];
  const values = useMemo(() => cancellationSteps.map((item) => item.value), []);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-9 gap-1.5" aria-label="作者测试一的抵消扫描">
          {values.map((value, index) => (
            <div
              key={index}
              className={
                "flex aspect-square min-w-0 items-center justify-center border text-sm font-semibold " +
                (index === cursor
                  ? "border-accent bg-accent/15 text-accent"
                  : index < cursor
                    ? "border-border bg-surface text-secondary"
                    : "border-border bg-background text-muted")
              }
            >
              {value}
            </div>
          ))}
        </div>

        <div className="mt-4 grid min-h-[92px] grid-cols-3 gap-3 border-y border-border py-4 text-center">
          <div><div className="text-xs text-muted">扫描下标</div><div className="mt-1 text-lg font-semibold text-primary">{step.index}</div></div>
          <div><div className="text-xs text-muted">当前候选</div><div className="mt-1 text-lg font-semibold text-accent">{step.candidate}</div></div>
          <div><div className="text-xs text-muted">票数</div><div className="mt-1 text-lg font-semibold text-success">{step.times}</div></div>
        </div>

        <div className="mt-4 flex min-h-11 items-center justify-between gap-3">
          <p className="m-0 text-sm text-secondary">{step.action}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              title="上一步"
              aria-label="上一步"
              disabled={cursor === 0}
              onClick={() => setCursor((value) => Math.max(0, value - 1))}
              className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"
            >
              <span aria-hidden="true" className="text-lg leading-none">←</span>
            </button>
            <button
              type="button"
              title="重置"
              aria-label="重置"
              onClick={() => setCursor(0)}
              className="inline-flex size-9 items-center justify-center border border-border text-secondary"
            >
              <span aria-hidden="true" className="text-lg leading-none">↻</span>
            </button>
            <button
              type="button"
              title="下一步"
              aria-label="下一步"
              disabled={cursor === cancellationSteps.length - 1}
              onClick={() => setCursor((value) => Math.min(cancellationSteps.length - 1, value + 1))}
              className="inline-flex size-9 items-center justify-center border border-border text-secondary disabled:opacity-35"
            >
              <span aria-hidden="true" className="text-lg leading-none">→</span>
            </button>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逐步回放作者测试一：第一遍只留下候选2，第二遍仍要确认它实际出现5次。
      </figcaption>
    </figure>
  );
}

export function MajorityVerificationDiagram() {
  const rows = [
    ["候选阶段", "Partition中位数", "次数抵消", "只保证得到可能答案"],
    ["验证阶段", "完整扫描计数", "完整扫描计数", "times × 2 必须大于length"],
    ["无多数输入", "中位值仍存在", "仍会留下候选", "返回0并置无效标志"],
    ["数组副作用", "会重排输入", "不修改输入", "调用契约不同"],
    ["复杂度", "平均O(n)，最坏O(n²)", "稳定O(n)", "辅助空间均为O(1)"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["维度", "解法一", "解法二", "共同结论"].map((item) => (
                <th key={item} className="p-3 text-primary">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => (
                  <td key={cell} className={"p-3 " + (index === 3 ? "font-semibold text-success" : "text-secondary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两条路线只负责压缩候选空间；“超过一半”必须由第二次计数证明。
      </figcaption>
    </figure>
  );
}

export function MajorityInputContractDiagram() {
  const rows = [
    ["nullptr, 0", "被判无效", "0 / true", "官方Test6"],
    ["非空指针, 0", "未被判无效", "Partition异常或越界", "AND条件遗漏"],
    ["nullptr, 正长度", "未被判无效", "异常或解引用风险", "AND条件遗漏"],
    ["多数元素就是0", "有效", "0 / false", "必须同时读取标志"],
    ["无多数元素", "候选复核失败", "0 / true", "0是结果哨兵"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {["输入/结果", "作者判定", "可见行为", "风险"].map((item) => (
                <th key={item} className="p-3 text-primary">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-border last:border-0">
                {row.map((cell, index) => (
                  <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-warning" : "text-secondary")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        作者用全局无效标志消除返回0的歧义，但输入检查的AND条件只覆盖了官方空输入组合。
      </figcaption>
    </figure>
  );
}

export function MoreThanHalfOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="切换作者6组测试，核对两种解法共同的返回值和全局无效标志。" />;
}
