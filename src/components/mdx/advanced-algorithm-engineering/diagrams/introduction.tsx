"use client";

import { useState } from "react";

const accessProfiles = [
  { label: "顺序扫描", stride: "s = 1", logical: "b = 1", io: "n / B", use: "每页全部使用", distribution: "连续 I/O", note: "RAM 步数与 I/O 都达到线性下界" },
  { label: "隔块访问", stride: "s = 2", logical: "b = B / 4", io: "2n / B", use: "每页约一半有用", distribution: "周期跳跃", note: "步骤仍是 n，但每页利用率下降" },
  { label: "稀疏访问", stride: "s ≥ B / b", logical: "b < B", io: "n / b", use: "一次只用逻辑块", distribution: "频繁换页", note: "I/O 成本由物理页数退化到逻辑块数" },
  { label: "整页跳跃", stride: "s 很大", logical: "b = B", io: "n / B", use: "每页全部使用", distribution: "随机 I/O", note: "两级模型计数相同，机械寻道等现实代价不同" },
] as const;

export function PaeAlgorithmDefinitionDiagram() {
  const traits = [
    ["有限", "必须终止", "还要在可接受资源内终止"],
    ["明确", "每一步无歧义", "输入条件与分支都可执行"],
    ["有效", "基本操作可实际完成", "模型中的一步必须可落实"],
    ["过程", "步骤有逻辑顺序", "状态变化可复现"],
    ["输入", "来自规定对象集合", "规模与分布要明确"],
    ["输出", "满足与输入的关系", "正确性可验证"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-3 sm:p-5">
        {traits.map(([title, rule, engineering]) => <div key={title} className="border border-border bg-background p-3"><div className="text-sm font-semibold text-primary">{title}</div><div className="mt-2 text-sm text-accent">{rule}</div><div className="mt-2 text-xs leading-5 text-secondary">{engineering}</div></div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法不仅是代码片段，还必须具备终止、明确、有效、过程、输入与输出六类约束。
      </figcaption>
    </figure>
  );
}

export function PaeMemoryHierarchyDiagram() {
  const levels = [
    ["寄存器 / L1", "极小", "极低", "CPU 指令附近", "复用正在计算的数据"],
    ["更高层缓存", "小", "低", "缓存行", "连续与重复访问"],
    ["主存", "中到大", "中", "内存页 / 缓存行", "工作集驻留"],
    ["SSD / 磁盘", "大", "高", "块 / 页", "批量顺序传输"],
    ["远端 / 云存储", "很大", "网络主导", "请求 / 对象", "减少往返与放大吞吐"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["层级", "容量", "延迟", "传输单位", "算法关注点"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{levels.map((row, index) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, column) => <td key={cell} className={"p-3 " + (column === 4 ? "font-semibold text-accent" : index >= 3 && column === 2 ? "font-semibold text-danger" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        越远离 CPU，容量通常越大而访问代价越高；算法必须显式利用传输粒度。
      </figcaption>
    </figure>
  );
}

export function PaeIoAccessLab() {
  const [cursor, setCursor] = useState(0);
  const profile = accessProfiles[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{accessProfiles.map((item, index) => <button key={item.label} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>{item.label}</button>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[["块步长", profile.stride], ["逻辑块", profile.logical], ["I/O 估计", profile.io], ["页利用", profile.use], ["分布", profile.distribution]].map(([label, value], index) => <div key={label} className={"border p-3 " + (index === 2 ? "border-success bg-success/10" : "border-border bg-background")}><div className="text-xs text-muted">{label}</div><div className="mt-1 text-sm font-semibold text-primary">{value}</div></div>)}
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{profile.note}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        A(s,b) 家族执行相同数量的加法，却因访问步长与块大小产生不同 I/O 行为。
      </figcaption>
    </figure>
  );
}

export function PaeLocalityMap() {
  const rows = [
    ["空间局部性", "一次取入的 B 个相邻项尽量都被使用", "顺序扫描、紧凑布局、批量处理", "跨页步长、指针随机跳转"],
    ["时间局部性", "数据驻留内部存储时完成尽量多的工作", "分块、缓存复用、融合多次计算", "频繁淘汰后又重新读取"],
    ["传输分布", "相同 I/O 数还要区分连续与随机", "合并请求、预取、顺序写", "大量小随机请求"],
    ["工作集", "近期访问页面尽量落在 M 内", "按阶段收缩活跃数据", "同时触碰过多冷数据"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["原则", "目标", "正例", "反例"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 2 ? "font-semibold text-success" : index === 3 ? "text-danger" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        好的外存算法既减少页访问次数，也提高每次传输与驻留期间的有效工作量。
      </figcaption>
    </figure>
  );
}

export function PaeEngineeringCycleDiagram() {
  const phases = [
    ["现实问题", "定义输入、目标与工作负载"],
    ["计算模型", "选择 RAM、两级存储、流或其他模型"],
    ["设计与证明", "给出算法、正确性和资源界"],
    ["实现", "落实布局、批处理与边界"],
    ["实验", "基准、剖析、反例与真实数据"],
    ["修正", "让实验反馈模型与设计"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-2 border border-border bg-elevated p-4 sm:grid-cols-3 sm:p-5">
        {phases.map(([title, note], index) => <div key={title} className="relative border border-border bg-background p-4"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center border border-accent bg-accent/10 text-xs font-semibold text-accent">{index + 1}</span><strong className="text-sm text-primary">{title}</strong></div><p className="mb-0 mt-3 text-xs leading-5 text-secondary">{note}</p>{index < phases.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 bg-elevated px-1 text-accent sm:block">→</span>}</div>)}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法工程不是一次性实现，而是模型、理论、代码与实验相互校正的循环。
      </figcaption>
    </figure>
  );
}
