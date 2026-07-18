"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第4章 差分开发中的设计方法",
  focus:
    "在保持既有功能正确的约束下识别多层继承、复杂封装、Fat Activity和历史兼容痕迹，并选择可回退的小步改造",
  nodes: [
    "4.1 差分開発ってなんだろう",
    "4.2 開発初期から継ぎ足してきた秘伝のタレ",
    "4.2.1 超多段継承地獄",
    "4.2.2 凄く良くできているけど複雑すぎて手に負えない独自API wrapper",
    "4.2.3 Fat Activity",
    "4.2.4 恐怖のBaseActivity",
    "4.2.5 当時これを実現するにはこうするしか無かった",
    "4.2.6 目まぐるしく変わってきたトレンドの名残",
    "4.2.7 One repository開発",
    "4.3 チームワークに現れてきた秘伝のタレの影響",
    "4.3.1 新規メンバーがいきなり道に迷う",
    "4.3.2 既存機能への機能追加の難易度がメチャクチャ上がる",
    "4.4 大きな改善に挑戦したターニングポイント",
    "4.4.1 static撲滅",
    "4.4.2 RxJavaの導入",
    "4.4.3 実際どうだったか",
    "4.5 改善後に取り組んだ機能とアーキテクチャ例",
    "4.5.1 step by stepで出品をする",
    "4.5.2 アーキテクチャ概要",
    "4.5.3 UIの構成を選択する",
    "4.5.4 クラスフィールドを可能な限り減らして、状態を扱いやすくする",
    "4.6 これからどうなっていくのか",
    "4.7 まとめ",
  ],
  invariant:
    "每次改造都保持原有用户行为和数据语义；改善必须降低新成员认知成本、变更范围或状态复杂度，而非只更换框架",
  failure:
    "以一次性重写消除全部历史会同时扩大业务回归面和组织风险；没有表征测试与回退点的静态清除或Rx迁移也不可验证",
  patterns: [
    {
      label: "债务盘点",
      mechanism: "把历史选择还原为约束与代价",
      evidence: "继承深度、变更扩散和入门时间",
    },
    {
      label: "单变量改造",
      mechanism: "先移除static再评估Rx",
      evidence: "行为基线和逐步回退点",
    },
    {
      label: "出品流程",
      mechanism: "用step-by-step拆分多状态流程",
      evidence: "每步输入、状态和完成条件",
    },
    {
      label: "状态收敛",
      mechanism: "减少类字段与隐式共享",
      evidence: "可重建状态和旋转反例",
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

export function Adp04IncrementalDevelopmentDesignArchitectureLab() {
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

export function Adp04IncrementalDevelopmentDesignCounterexampleLab() {
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

export function Adp04IncrementalDevelopmentDesignEvidenceLab() {
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
