"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第7章 团队与架构",
  focus:
    "把架构当作团队协作协议：一条路径解决既有开发痛点，另一条路径在三个月内替换运营三年的应用",
  nodes: [
    "7.1 大胆に機能追加、変更ができるアプリを作り直す",
    "7.2 既存の開発におけるペインポイントを解決する",
    "7.2.1 MVVM＋レイヤードアーキテクチャモデルの採用",
    "7.2.2 タイムラインを作る",
    "7.2.3 依存性注入とライフサイクル",
    "7.2.4 新しい設計がチームに与えた影響",
    "7.3 3年間運用されたアプリを3ヶ月で書き直す",
    "7.3.1 Nativeアプリケーションの機能を代替する",
    "7.3.2 React Nativeとは",
    "7.3.3 React Nativeの選定理由",
    "7.3.4 Native開発が向いた機能、React Native開発が向いた機能",
    "7.3.5 ハイブリッドアプリの設計",
    "7.3.6 ハイブリッドアプリに習熟する",
    "7.3.7 React Nativeが描画されるまで",
    "7.3.8 NativeからReact Nativeへの画面遷移",
    "7.3.9 React NativeからNativeの世界に戻るには",
    "7.3.10 React Nativeがチーム開発にもたらしたもの",
    "7.4 アーキテクチャがチームにもたらすもの",
  ],
  invariant:
    "技术边界必须与团队边界、交付期限和功能风险对齐；Native与React Native切换时导航、会话和返回语义保持一致",
  failure:
    "只因跨平台流行而全量迁移会把桥接、调试和技能成本留给团队；依赖注入若不说明作用域也会制造跨生命周期对象泄漏",
  patterns: [
    {
      label: "MVVM分层",
      mechanism: "为既有开发建立职责边界",
      evidence: "时间线功能的变更范围",
    },
    {
      label: "DI作用域",
      mechanism: "对齐对象与页面生命周期",
      evidence: "创建、复用和释放轨迹",
    },
    {
      label: "混合导航",
      mechanism: "连接Native与React Native页面",
      evidence: "双向跳转和返回栈",
    },
    {
      label: "团队适配",
      mechanism: "用交付反馈校验架构",
      evidence: "速度、缺陷和认知成本",
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

export function Adp07TeamAndArchitectureArchitectureLab() {
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

export function Adp07TeamAndArchitectureCounterexampleLab() {
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

export function Adp07TeamAndArchitectureEvidenceLab() {
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
