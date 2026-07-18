"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第8章 Android Architecture Components",
  focus:
    "用生命周期感知组件移除Activity/Fragment中的手工转发，让ViewModel跨配置变更保存页面状态，让LiveData只向活跃观察者分发",
  nodes: [
    "8.1 Android Architecture Componentsとは",
    "8.2 Architecture Componentsの中心：Lifecyclesコンポーネント",
    "8.3 ViewModelはActivityより長いライフサイクルをもつ",
    "8.4 Observerパターンを実現するLiveData",
    "8.5 想定するアーキテクチャ",
    "8.5.1 Android Architecture ComponentsとMVVM",
    "8.5.2 Architecture ComponentsとFlux",
  ],
  invariant:
    "观察者的活跃状态由Lifecycle决定；配置变更不重建ViewModel业务状态，最终销毁会释放作用域，LiveData只承载可观察数据而非任意事件总线",
  failure:
    "把本章现代化为Compose、Flow、Hilt或Navigation会破坏版本忠实度；把LiveData用于不可重放的一次性动作又会在旋转后重复消费",
  patterns: [
    {
      label: "Lifecycles",
      mechanism: "让组件直接观察宿主状态",
      evidence: "onStart/onStop订阅轨迹",
    },
    {
      label: "ViewModel",
      mechanism: "跨配置变化保存UI所需状态",
      evidence: "实例ID与onCleared证据",
    },
    {
      label: "LiveData",
      mechanism: "只通知活跃LifecycleOwner",
      evidence: "旋转、后台和恢复分发次数",
    },
    {
      label: "组合",
      mechanism: "把组件嵌入MVVM或Flux",
      evidence: "职责不变量与数据流方向",
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

export function Adp08AndroidArchitectureComponentsArchitectureLab() {
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

export function Adp08AndroidArchitectureComponentsCounterexampleLab() {
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

export function Adp08AndroidArchitectureComponentsEvidenceLab() {
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
