"use client";

import { AndroidDesignPatternsLab } from "./official-android-design-patterns-lab";

const config = {
  unitTitle: "おわりに（后记）",
  focus:
    "确认这本多作者实践集的知识来自具体团队、项目和审阅协作，并保留代码、文字、商标与第三方材料的权利边界",
  nodes: ["謝辞", "権利表記", "多作者实践集的证据链", "课程改编与原书的边界"],
  invariant:
    "任何复用都能说明来源、改写范围、许可证和版本；贡献者的经验被归因，课程不暗示替代或复制原书",
  failure:
    "去掉致谢和权利信息会让案例看似无来源的通用真理，也可能把Apache代码、项目商标和作者文字错误地视为同一许可",
  patterns: [
    {
      label: "来源链",
      mechanism: "连接作者、项目和章节",
      evidence: "正式作者表与项目链接",
    },
    {
      label: "许可链",
      mechanism: "分别识别代码与文字许可",
      evidence: "LICENSE和引用记录",
    },
    {
      label: "改编链",
      mechanism: "保留核心机制但重新教学表达",
      evidence: "差异说明与来源链接",
    },
    {
      label: "交接链",
      mechanism: "记录版本与已知限制",
      evidence: "可复现环境和责任人",
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

export function AdpAfterwordArchitectureLab() {
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

export function AdpAfterwordCounterexampleLab() {
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

export function AdpAfterwordEvidenceLab() {
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
