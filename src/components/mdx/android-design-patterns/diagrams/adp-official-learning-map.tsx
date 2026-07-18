"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "2018年正式版权威学习地图",
  focus:
    "把最终成书的3部、8章和前后置内容连成一条可验证的架构决策路径，并明确众筹草案不属于正式分母",
  nodes: [
    "第I部 アプリの設計を知る",
    "第1章 Androidアプリの基本構成",
    "第2章 MVVMパターンを使ったアプリ構成",
    "第3章 MVPパターンを使ったアプリ構成",
    "第II部 生きた設計を見る",
    "第4章 差分開発にみる設計アプローチ",
    "第5章 OSSにおける設計者の役割",
    "第6章 Fluxアーキテクチャ",
    "第7章 チームとアーキテクチャ",
    "第III部 設計を考える",
    "第8章 Android Architecture Components",
    "正式版の前後置内容",
    "はじめに",
    "おわりに",
    "索引",
    "著者紹介",
  ],
  invariant:
    "正式分母只采用2018年1月31日发行的224页成书目录；每个设计结论都能回指项目约束、样例代码、失败反例和团队证据",
  failure:
    "沿用众筹草案会错误增加Kotlin与问题广场两章，并把八木俊广列入最终作者，导致章节数、作者和技术边界都失真",
  patterns: [
    {
      label: "第I部",
      mechanism: "统一TODO规格后比较MVVM与MVP",
      evidence: "同一用例的依赖方向和测试边界",
    },
    {
      label: "第II部",
      mechanism: "读取真实项目的演进约束",
      evidence: "差分、OSS、Flux与团队案例证据",
    },
    {
      label: "第III部",
      mechanism: "审视早期Architecture Components",
      evidence: "生命周期、ViewModel与LiveData轨迹",
    },
    {
      label: "版本门",
      mechanism: "隔离众筹草案与现代Jetpack",
      evidence: "正式PDF目录和2018代码快照",
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

export function AdpOfficialLearningMapArchitectureLab() {
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

export function AdpOfficialLearningMapCounterexampleLab() {
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

export function AdpOfficialLearningMapEvidenceLab() {
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
