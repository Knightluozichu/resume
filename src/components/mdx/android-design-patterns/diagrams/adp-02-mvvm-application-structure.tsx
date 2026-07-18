"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第2章 MVVM 模式应用构成",
  focus:
    "用2017版Android Architecture Blueprints的同一TODO规格，解释ViewModel如何暴露可观察状态而不持有View引用",
  nodes: [
    "2.1 基本コンセプト",
    "2.2 セットアップ",
    "2.3 サンプルアプリの設計",
    "2.4 MVPアーキテクチャとの比較",
    "2.5 TODOアプリの仕様",
    "2.6 プロジェクトの基本構成",
    "2.7 ViewModelの役割を理解する",
    "2.8 データバインディングを使ってViewを設定する",
    "2.9 フラグメントで画面を構築する",
    "2.10 Navigatorでアクションを処理する",
    "2.11 ViewModelの生成と生存期間",
    "2.12 ViewModelにユーザー操作を伝える",
    "2.13 Snackbarで学ぶViewとViewModel間メッセージングの難しさ",
    "2.14 MVVMパターンの背景にあるもの",
  ],
  invariant:
    "ViewModel不知道具体Activity或Fragment；用户动作进入ViewModel，状态通过绑定更新View，导航与短暂消息有独立边界",
  failure:
    "把Context、Fragment或Snackbar直接塞进ViewModel会恢复对View的隐式依赖，旋转后产生陈旧引用、重复事件或无法单测的分支",
  patterns: [
    {
      label: "状态绑定",
      mechanism: "View订阅可观察字段",
      evidence: "字段变化与控件渲染轨迹",
    },
    {
      label: "动作输入",
      mechanism: "布局或View把意图传给ViewModel",
      evidence: "一次点击只产生一次命令",
    },
    {
      label: "导航边界",
      mechanism: "Navigator处理一次性外部动作",
      evidence: "旋转前后不重复导航",
    },
    {
      label: "生存期",
      mechanism: "创建者决定ViewModel范围",
      evidence: "重建复用与最终释放证据",
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

export function Adp02MvvmApplicationStructureArchitectureLab() {
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

export function Adp02MvvmApplicationStructureCounterexampleLab() {
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

export function Adp02MvvmApplicationStructureEvidenceLab() {
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
