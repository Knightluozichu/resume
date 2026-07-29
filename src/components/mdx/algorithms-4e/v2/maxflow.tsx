"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.4",
  title: "6.4 · Maxflow",
  focus: "用容量、流量、残量网络与增广路径建立最大流和最小割的双向证书",
  formula:
    "残量 r(e)=capacity-flow（正向）或 flow（反向）；增广量为路径最小残量",
  invariant:
    "每条边满足 0≤flow≤capacity，非源汇点流量守恒，最终残量图中汇点不可达",
  fault: "只保留正向剩余容量而遗漏反向残量边，使早期错误选择无法撤销",
  evidence:
    "容量/流量、残量边、增广路径、瓶颈、守恒差、最终 s-cut 与 cut capacity",
  concepts: [
    "maximum flow",
    "最大流",
    "minimum s-t cut",
    "最小s-t割",
    "residual networks",
    "残量网络",
    "augmenting paths",
    "增广路径",
    "maxflow-mincut theorem",
    "最大流最小割定理",
    "bipartite matching",
    "二分图匹配",
  ],
  trace: [
    "初始化零流",
    "在残量图找 s-t 路径",
    "计算瓶颈",
    "更新正反向残量",
    "验证守恒与最小割",
  ],
  scenarios: [
    {
      label: "撤销旧流",
      input: "早期增广占用了后续更优路径需要的边",
      expected: "反向残量边允许减少旧流并重新路由",
    },
    {
      label: "最小割证书",
      input: "算法结束后从 s 在残量图做可达搜索",
      expected: "不可到达 t，跨割容量等于当前流值",
    },
  ],
} satisfies Algs4SectionModel;

export function MaxflowModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function MaxflowTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function MaxflowCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
