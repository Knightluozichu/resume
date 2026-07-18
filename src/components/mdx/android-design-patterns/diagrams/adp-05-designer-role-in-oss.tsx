"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第5章 OSS 中设计者的角色",
  focus:
    "从67场会议、60多名贡献者和250多个PR的协作现实，推导降低决策数量、保持可学习性和稳定合并边界的设计",
  nodes: [
    "5.1 公式アプリの概要",
    "5.1.1 セッション",
    "5.1.2 地図",
    "5.1.3 情報",
    "5.1.4 設定",
    "5.2 設計方針を決める要素",
    "5.2.1 考えることを減らす",
    "5.2.2 多種多様なコントリビュータ",
    "5.2.3 習作としてのプロジェクト",
    "5.3 公式アプリの設計方針",
    "5.3.1 Model-View-ViewModelアーキテクチャの採用",
    "5.3.2 ViewModelから画面表示までの流れ",
    "5.3.3 ViewModelでのイベントハンドリング",
    "5.3.4 役割単位のパッケージ構成",
    "5.3.5 DataBindingのフル活用",
    "5.3.6 BaseActivity、BaseFragmentの導入",
    "5.3.7 Navigatorクラスによる画面遷移",
    "5.3.8 Repositoryクラスによるデータ取得部分の隠蔽",
    "5.3.9 RxJavaを使ったデータ取得",
    "5.3.10 UseCaseクラスの必要性",
    "5.3.11 ViewModelでのリソースの扱い",
    "5.4 OSSにおけるちょうどよい設計",
  ],
  invariant:
    "新贡献者能沿一致包结构、数据入口和导航边界完成小改动；设计意图可从代码、Issue和评审证据恢复",
  failure:
    "为了展示技巧而引入过多抽象，会把OSS习作价值变成入门门槛；Base类、UseCase或Rx若没有明确问题只会隐藏控制流",
  patterns: [
    {
      label: "MVVM骨架",
      mechanism: "统一页面状态与绑定方式",
      evidence: "新页面结构一致性",
    },
    {
      label: "Repository",
      mechanism: "隐藏数据来源差异",
      evidence: "缓存与网络切换测试",
    },
    {
      label: "Navigator",
      mechanism: "集中跨屏跳转",
      evidence: "深链和返回栈轨迹",
    },
    {
      label: "最少决策",
      mechanism: "减少贡献者必须自行选择的模式",
      evidence: "首个PR耗时与评审往返",
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

export function Adp05DesignerRoleInOssArchitectureLab() {
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

export function Adp05DesignerRoleInOssCounterexampleLab() {
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

export function Adp05DesignerRoleInOssEvidenceLab() {
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
