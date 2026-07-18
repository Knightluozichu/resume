"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第6章 Flux 架构",
  focus:
    "让用户动作和外部结果都形成Action，经Dispatcher按序进入Store，由Store产生新状态再通知View",
  nodes: [
    "6.1 なぜFluxアーキテクチャなのか",
    "6.2 アーキテクチャの全体像",
    "6.2.1 中心的な考え：単一方向のデータフロー",
    "6.2.2 Viewからのデータフロー：Dispatcherがハブとなる",
    "6.3 Androidアプリに適用する",
    "6.3.1 Viewの役割をもつActivityとFragment",
    "6.3.2 Action（Action Creator）",
    "6.3.3 Pub/Sub型のライブラリをDispatcherとして使う",
    "6.3.4 Storeの役割",
    "6.3.5 AndroidにおけるFluxアーキテクチャの全体像",
    "6.4 プロダクトでの実装",
    "6.4.1 RepositoryおよびActionの実装",
    "6.4.2 DispatcherとStoreの実装",
    "6.4.3 プロダクトにおける実例",
    "6.5 Fluxアーキテクチャのメリットとデメリット",
  ],
  invariant:
    "状态只能在Store内改变；每次变化都能追溯到Action，View不绕过Action直接改Store，异步副作用不制造第二条隐式数据流",
  failure:
    "把EventBus的任意事件都称为Flux会形成多向广播；若Store互相写入或View直接更新模型，顺序、重放和故障定位都会失效",
  patterns: [
    {
      label: "Action",
      mechanism: "把事实与意图写成不可变消息",
      evidence: "类型、载荷和关联ID",
    },
    {
      label: "Dispatcher",
      mechanism: "串行分发并保持因果顺序",
      evidence: "分发日志和订阅集合",
    },
    {
      label: "Store",
      mechanism: "依据Action计算新状态",
      evidence: "前后状态差异与不变量",
    },
    {
      label: "View",
      mechanism: "订阅Store并发起新Action",
      evidence: "渲染次数与无直接写入",
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

export function Adp06FluxArchitectureArchitectureLab() {
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

export function Adp06FluxArchitectureCounterexampleLab() {
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

export function Adp06FluxArchitectureEvidenceLab() {
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
