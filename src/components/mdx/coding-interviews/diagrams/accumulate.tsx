"use client";

import { useState } from "react";

import { CodingInterviewLab } from "./official-lab";

const constructorStates = [
  { made: 0, n: 0, sum: 0, action: "Reset 后尚未构造对象" },
  { made: 1, n: 1, sum: 1, action: "第 1 个 Temp：N=1，Sum+=1" },
  { made: 2, n: 2, sum: 3, action: "第 2 个 Temp：N=2，Sum+=2" },
  { made: 3, n: 3, sum: 6, action: "第 3 个 Temp：N=3，Sum+=3" },
  { made: 4, n: 4, sum: 10, action: "第 4 个 Temp：N=4，Sum+=4" },
  { made: 5, n: 5, sum: 15, action: "第 5 个 Temp：N=5，Sum+=5" },
] as const;

const officialCases = [
  { label: "Test1", fields: [["n", "1"], ["期望", "1"], ["运行时方案", "1、2、3 通过"], ["模板方案", "通过"]] },
  { label: "Test2", fields: [["n", "5"], ["期望", "15"], ["运行时方案", "1、2、3 通过"], ["模板方案", "通过"]] },
  { label: "Test3", fields: [["n", "10"], ["期望", "55"], ["运行时方案", "1、2、3 通过"], ["模板方案", "通过"]] },
  { label: "Test4", fields: [["n", "0"], ["期望", "0"], ["运行时方案", "1、2、3 通过"], ["模板方案", "Sum_Solution4<0>"]] },
] as const;

export function AccumulateConstraintDiagram() {
  const prohibited = ["乘法", "除法", "for", "while", "if / else", "switch / case", "条件运算符"];
  const available = ["对象构造", "静态成员", "虚函数分派", "函数指针", "递归", "模板特化"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="grid gap-4 border border-border bg-elevated p-4 sm:grid-cols-2 sm:p-5">
        <div className="border border-danger bg-danger/10 p-4">
          <div className="text-sm font-semibold text-danger">题目禁止</div>
          <div className="mt-3 grid grid-cols-2 gap-2">{prohibited.map((item) => <div key={item} className="border border-danger/40 bg-background p-2 text-center text-xs text-secondary">{item}</div>)}</div>
        </div>
        <div className="border border-success bg-success/10 p-4">
          <div className="text-sm font-semibold text-success">作者使用</div>
          <div className="mt-3 grid grid-cols-2 gap-2">{available.map((item) => <div key={item} className="border border-success/40 bg-background p-2 text-center text-xs text-secondary">{item}</div>)}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四种方案都绕开被禁语法，但分别把控制流转移给对象模型、间接调用或编译器。
      </figcaption>
    </figure>
  );
}

export function AccumulateConstructorLab() {
  const [cursor, setCursor] = useState(5);
  const state = constructorStates[cursor];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-6 gap-2">
          {constructorStates.map((item, index) => (
            <button key={item.made} type="button" onClick={() => setCursor(index)} aria-pressed={cursor === index} className={"h-11 border text-xs font-semibold " + (cursor === index ? "border-accent bg-accent/15 text-accent" : "border-border bg-background text-secondary")}>
              {item.made} 个
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3"><div className="text-xs text-muted">已构造</div><div className="mt-1 font-semibold text-primary">{state.made}</div></div>
          <div className="border border-success bg-success/10 p-3"><div className="text-xs text-muted">静态 N</div><div className="mt-1 font-semibold text-success">{state.n}</div></div>
          <div className="border border-accent bg-accent/10 p-3"><div className="text-xs text-muted">静态 Sum</div><div className="mt-1 font-semibold text-accent">{state.sum}</div></div>
        </div>
        <p className="mb-0 mt-3 border-l-4 border-accent bg-background p-3 text-sm text-secondary">{state.action}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        new Temp[5] 必须构造五个对象；构造副作用依次累计 1、2、3、4、5。
      </figcaption>
    </figure>
  );
}

export function AccumulateDispatchMap() {
  const rows = [
    ["n > 0", "!!n = 1", "Array[1] → B::Sum", "f[1] → Sum_Solution3", "递归到 n-1，再加 n"],
    ["n = 0", "!!n = 0", "Array[0] → A::Sum", "f[0] → Terminator", "返回 0，停止递归"],
    ["选择机制", "双重逻辑非", "虚函数动态分派", "函数指针间接调用", "没有 if 或条件运算符"],
    ["状态代价", "每层一个 n", "全局指针表 + 调用栈", "静态函数表 + 调用栈", "深度均为 n"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto border border-border bg-elevated p-4 sm:p-5">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead><tr className="border-b border-border">{["输入状态", "索引", "虚函数方案", "函数指针方案", "结果"].map((item) => <th key={item} className="p-3 text-primary">{item}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, index) => <td key={cell} className={"p-3 " + (index === 4 ? "font-semibold text-accent" : "text-secondary")}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两种运行时递归共享同一思想：把 n 是否为 0 转成索引，选择递归体或终止体。
      </figcaption>
    </figure>
  );
}

export function AccumulateTemplateDiagram() {
  const levels = [
    ["Sum<5>", "Sum<4>::N + 5", "15"],
    ["Sum<4>", "Sum<3>::N + 4", "10"],
    ["Sum<3>", "Sum<2>::N + 3", "6"],
    ["Sum<2>", "Sum<1>::N + 2", "3"],
    ["Sum<1>", "特化基例", "1"],
    ["Sum<0>", "独立特化", "0"],
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2">
          {levels.map((row, index) => (
            <div key={row[0]} className="grid grid-cols-[100px_1fr_70px] items-center gap-2 border border-border bg-background p-3 text-sm">
              <span className="font-mono font-semibold text-primary">{row[0]}</span>
              <span className="text-secondary">{row[1]}</span>
              <span className={index >= 4 ? "font-semibold text-success" : "font-semibold text-accent"}>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板参数必须在编译期已知；特化为递归提供基例，运行时只读取常量。
      </figcaption>
    </figure>
  );
}

export function AccumulateOfficialCaseLab() {
  return <CodingInterviewLab cases={officialCases} caption="作者测试 1、5、10、0；前三种运行时方案在 Test 中检查，模板方案因参数必须是常量而单独实例化检查。" />;
}
