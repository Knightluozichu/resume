"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "对象与 this",
    layer: "先确定 complete object、base subobject 与隐式对象参数。",
    evidence: "成员地址由 this 加 layout offset 得到，且 lifetime 有效。",
    falsifier: "加入多继承或空基类，检查简单 offset 假设是否失效。",
  },
  {
    label: "构造与销毁",
    layer: "按基类、成员、函数体的顺序建立和撤销对象不变量。",
    evidence: "断点显示 construction/destruction 顺序与异常清理路径。",
    falsifier: "让成员构造抛异常，检查哪些子对象已经被销毁。",
  },
  {
    label: "动态派发",
    layer: "区分语言 virtual semantics、ABI vtable 与本次去虚化。",
    evidence: "普通路径显示 indirect target，强证明路径可变 direct call。",
    falsifier: "移除 final/LTO 或增加可能派生类，观察去虚化是否消失。",
  },
  {
    label: "分配与所有权",
    layer: "把 raw storage、object lifetime、owner 与释放 API 分开。",
    evidence: "new/delete 或 allocator/constructor 的配对路径完整。",
    falsifier: "注入 constructor failure，用 sanitizer 检查泄漏与双重释放。",
  },
] as const;

export function CpuCppFeaturesLab() {
  return (
    <CpuEvidenceLab
      title="对象语义如何落到地址与调用目标"
      question="看到 vptr、constructor call 或 allocator 就足以解释 C++ 对象吗？"
      stages={stages}
    />
  );
}
