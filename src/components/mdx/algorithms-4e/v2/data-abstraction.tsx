"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-1.2",
  title: "1.2 · Data Abstraction",
  focus: "用 API、客户端与表示不变量隔离抽象数据类型的语义和实现",
  formula: "distance(p, q) = sqrt((px-qx)^2 + (py-qy)^2)",
  invariant: "所有公开操作都保持表示不变量；客户端只依赖 API，不读取实现字段",
  fault: "把对象引用相等当成值相等，或让可变内部数组从构造器和访问器逃逸",
  evidence: "构造参数、对象状态、API 调用序列、返回值、异常与表示检查结果",
  concepts: [
    "data abstraction",
    "数据抽象",
    "object-oriented programming",
    "面向对象编程",
    "abstract data types",
    "抽象数据类型",
    "implementing abstract data types",
    "抽象数据类型实现",
    "designing abstract data types",
    "抽象数据类型设计",
  ],
  trace: [
    "声明抽象值",
    "写出 API 合同",
    "选择内部表示",
    "执行客户端调用",
    "检查表示不变量",
  ],
  scenarios: [
    {
      label: "不可变值",
      input: "用两个坐标相同但引用不同的 Point 表示同一点",
      expected: "值语义由 API 与 equals 合同决定，不由引用地址决定",
    },
    {
      label: "表示泄漏",
      input: "构造器直接保存调用方传入的可变数组",
      expected: "防御性复制阻断调用方绕过 API 修改内部状态",
    },
  ],
} satisfies Algs4SectionModel;

export function DataAbstractionModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function DataAbstractionTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function DataAbstractionCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
