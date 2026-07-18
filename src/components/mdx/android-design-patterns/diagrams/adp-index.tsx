"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "索引（概念检索矩阵）",
  focus: "把索引从名词列表变成问题到章节、模式、反例和证据的双向检索矩阵",
  nodes: [
    "索引",
    "MVP / Presenter / Contract",
    "MVVM / ViewModel / Data Binding",
    "Flux / Action / Dispatcher / Store",
    "按平台约束检索",
    "Lifecycle",
    "配置变更",
    "异步与后台",
    "版本差异",
    "按团队问题检索",
    "差分开发",
    "OSS贡献者",
    "混合应用",
    "架构认知成本",
    "按证据类型检索",
    "状态轨迹",
    "失败注入",
    "测试替身",
    "版本记录",
  ],
  invariant:
    "每个核心词都能定位首次定义、实践章节、对照模式、典型失败和验收证据；同名概念不会跨版本偷换含义",
  failure:
    "只按字母列名词会把MVP、MVVM、Flux和Architecture Components割裂，读者无法从实际问题反查决策依据",
  patterns: [
    {
      label: "职责轴",
      mechanism: "检索View、Presenter、ViewModel与Store",
      evidence: "依赖方向和所有者",
    },
    {
      label: "数据流轴",
      mechanism: "检索绑定、Dispatcher、LiveData",
      evidence: "事件与状态轨迹",
    },
    {
      label: "演进轴",
      mechanism: "检索差分开发和团队重写",
      evidence: "基线、回退与影响",
    },
    {
      label: "版本轴",
      mechanism: "隔离2018概念与现代Jetpack",
      evidence: "目录和代码快照",
    },
  ],
  gates: [
    "正式目录、作者、日期与版本边界",
    "职责、依赖方向与状态所有权",
    "生命周期、异步与释放轨迹",
    "单变量失败反例与恢复结果",
    "测试、业务或团队可观察证据",
    "停止、回退、复核人与交接记录",
  ],
} as const;

export function AdpIndexArchitectureLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="architecture"
    />
  );
}

export function AdpIndexCounterexampleLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="counterexample"
    />
  );
}

export function AdpIndexEvidenceLab() {
  return (
    <AndroidDesignPatternsLab
      {...config}
      nodes={[...config.nodes]}
      patterns={[...config.patterns]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
