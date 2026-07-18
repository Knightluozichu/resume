"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "はじめに（前言）",
  focus: "先固定可复现实验材料、出版协作方式和责任边界，再进入任何架构结论",
  nodes: [
    "サンプルコード",
    "クラウドファンディングとPEAKS",
    "TechBoosterとは",
    "お問い合わせ先",
    "免責事項",
  ],
  invariant:
    "读者能从官方链接取得与出版时一致的样例，知道结论适用范围，也不会把示例当成唯一标准答案",
  failure:
    "直接在当前主分支运行样例会得到现代依赖或失效构建；忽略免责与版本说明又会把历史案例误当成今天的官方规范",
  patterns: [
    {
      label: "样例锚点",
      mechanism: "锁定官方仓库最后出版前提交",
      evidence: "提交8f057875与目录对应",
    },
    {
      label: "协作出版",
      mechanism: "把众筹反馈作为审阅输入",
      evidence: "草案与最终版差异记录",
    },
    {
      label: "社区主体",
      mechanism: "识别TechBooster的知识共享角色",
      evidence: "来源、作者与许可证",
    },
    {
      label: "责任边界",
      mechanism: "区分教学示例与生产保证",
      evidence: "复现条件和风险声明",
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

export function AdpPrefaceArchitectureLab() {
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

export function AdpPrefaceCounterexampleLab() {
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

export function AdpPrefaceEvidenceLab() {
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
