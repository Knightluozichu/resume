"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第3章 MVP 模式应用构成",
  focus:
    "把Presenter作为与Android View隔离的交互协调者，用显式Contract验证输入、状态加载和View更新",
  nodes: [
    "3.1 基本コンセプト",
    "3.2 セットアップ",
    "3.3 サンプルアプリの設計",
    "3.4 TODOアプリの仕様",
    "3.5 プロジェクトの基本構成",
    "3.6 PresenterとViewを生成するActivity",
    "3.7 PresenterとViewをつなぐContract",
    "3.8 Presenterの役割を理解する",
    "3.9 Viewの役割を理解する",
    "3.10 Viewのインターフェイスを設計する",
    "3.11 MVPパターンの背景にあるもの",
  ],
  invariant:
    "Presenter只依赖View接口和数据源接口；Activity负责装配，Fragment实现View契约，异步结果回到仍有效的View",
  failure:
    "若Presenter持有销毁后的Fragment或Contract无限膨胀，显式依赖虽然存在，生命周期泄漏、重复回调和接口噪声仍会失控",
  patterns: [
    {
      label: "Contract",
      mechanism: "把View能力限制为用例所需接口",
      evidence: "编译边界和假View测试",
    },
    {
      label: "Presenter",
      mechanism: "编排数据与显示命令",
      evidence: "输入到View调用的确定轨迹",
    },
    {
      label: "Activity",
      mechanism: "创建并连接Presenter和View",
      evidence: "唯一组合根与释放点",
    },
    {
      label: "Fragment",
      mechanism: "渲染状态并转发用户意图",
      evidence: "无业务分支的UI实现",
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

export function Adp03MvpApplicationStructureArchitectureLab() {
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

export function Adp03MvpApplicationStructureCounterexampleLab() {
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

export function Adp03MvpApplicationStructureEvidenceLab() {
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
