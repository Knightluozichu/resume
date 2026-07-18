"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "2018年正式版总复习",
  focus:
    "从同一TODO规格出发，在MVP、MVVM、Flux和早期Architecture Components之间做约束驱动选择，再用真实团队案例校验演进成本",
  nodes: [
    "复习第1章：共同规格与平台约束",
    "复习第2章：MVVM的数据绑定边界",
    "复习第3章：MVP的显式Contract",
    "复习第4章：差分开发与可回退改造",
    "复习第5章：OSS中的最少决策",
    "复习第6章：Flux单向数据流",
    "复习第7章：团队、分层与混合架构",
    "复习第8章：早期Architecture Components",
  ],
  invariant:
    "决策必须说明问题、约束、候选、依赖方向、状态所有者、生命周期、失败反例、团队成本、验证结果和回退条件",
  failure:
    "用流行度或框架名称代替决策会同时忽略平台生命周期、既有代码、贡献者结构和版本边界，最终只能得到不可证伪的架构宣言",
  patterns: [
    {
      label: "同规格比较",
      mechanism: "用TODO控制业务变量",
      evidence: "MVP与MVVM轨迹差异",
    },
    {
      label: "真实案例",
      mechanism: "用差分、OSS和团队案例校验",
      evidence: "变更范围与认知成本",
    },
    {
      label: "数据流",
      mechanism: "比较Flux与生命周期组件",
      evidence: "Action、Store与观察者轨迹",
    },
    {
      label: "版本闭环",
      mechanism: "锁定2018目录和代码",
      evidence: "排除草案及现代组件",
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

export function AdpOfficialFinalReviewArchitectureLab() {
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

export function AdpOfficialFinalReviewCounterexampleLab() {
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

export function AdpOfficialFinalReviewEvidenceLab() {
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
