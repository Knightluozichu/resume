"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "第1章 Android 应用的基本构成",
  focus:
    "把五屏TODO应用作为控制变量，从职责、依赖方向、生命周期与可测试性解释Android架构为何演进",
  nodes: [
    "1.1 議論の前提となるアプリケーションと仕様",
    "1.2 アーキテクチャの選択",
    "1.3 Model-View-Presenter",
    "1.4 Model-View-ViewModel",
    "1.4.1 データバインディング",
    "1.4.2 MVVMのベースの考え方：Presentation Model",
    "1.5 プラットフォームの制約と複雑性",
    "1.6 設計の歴史",
    "1.6.1 Fat Activity問題",
    "1.6.2 ライフサイクルの複雑化",
    "1.6.3 バージョン差分",
    "1.6.4 非同期処理とバックグラウンド実行",
    "1.6.5 チーム開発",
    "1.7 ライブラリの台頭",
    "1.7.1 Android Architecture Components",
    "1.7.2 Android Support Library",
    "1.7.3 Dagger 2",
    "1.7.4 Gson",
    "1.7.5 OkHttp",
    "1.7.6 PermissionsDispatcher",
    "1.7.7 Retrofit 2",
    "1.7.8 RxJava 2",
    "1.8 プログラミング言語の発展",
  ],
  invariant:
    "TODO的新增、编辑、删除、本地保存和远端同步语义不随架构改变；改变的只能是职责分配与协作协议",
  failure:
    "只把类改名为ViewModel或Presenter而不改变依赖方向，会继续留下Fat Activity、生命周期泄漏和无法隔离测试的问题",
  patterns: [
    {
      label: "MVP",
      mechanism: "Presenter显式调用View契约",
      evidence: "可替换View测试与调用轨迹",
    },
    {
      label: "MVVM",
      mechanism: "可观察状态驱动绑定后的View",
      evidence: "状态变更与渲染一致性",
    },
    {
      label: "平台约束",
      mechanism: "把生命周期和版本差异置于边界",
      evidence: "旋转、后台、权限反例",
    },
    {
      label: "库的角色",
      mechanism: "用成熟库收敛重复基础机制",
      evidence: "依赖版本、失败语义和替换成本",
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

export function Adp01AndroidAppBasicStructureArchitectureLab() {
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

export function Adp01AndroidAppBasicStructureCounterexampleLab() {
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

export function Adp01AndroidAppBasicStructureEvidenceLab() {
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
