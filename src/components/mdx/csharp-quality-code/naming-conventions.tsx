"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么命名规范是一套Search和Compatibilit…",
    mechanism:
      "好名字让reader不打开implementation也能预测type角色、boolean真值、event时机和module owner；一致casing让IDE、analyzer与API docs形成统一索引。命名并非追求最长描述，而是在作用域内消除歧义，并给未来新增type/version留下空间。",
    failure:
      "若把「为什么命名规范是一套Search和Compatibilit…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么命名规范是一套Search和Compatibilit…」的收益与反例。",
  },
  {
    label: "Namespace、Type与Generic Names（…",
    mechanism:
      "dot分隔稳定层级，例如 Company.Product.Domain.Feature ；每段使用PascalCase并代表真实ownership/概念，不机械映射每个folder。层级太深增加using与移动成本， Common.Helpers.Utils 则几乎没有semantic signal。",
    failure:
      "若把「Namespace、Type与Generic Names（…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Namespace、Type与Generic Names（…」的收益与反例。",
  },
  {
    label: "Member、Boolean与Version Names（…",
    mechanism:
      "public/protected types、methods、properties、events使用PascalCase，与.NET ecosystem一致；acronym按项目/FCL style处理，例如 HttpClient 而非 HTTPClient 。用formatter/analyzer自动执行，不靠review争论大小写。",
    failure:
      "若把「Member、Boolean与Version Names（…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Member、Boolean与Version Names（…」的收益与反例。",
  },
];

export function NamingConventionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第10章：命名规范（建议122-139）：机制与证据"
      prompt="切换《第10章：命名规范（建议122-139）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第10章：命名规范（建议122-139）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function NamingConventionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第10章：命名规范（建议122-139）：机制路径"
      stages={STAGES}
    />
  );
}

export function NamingConventionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第10章：命名规范（建议122-139）：失效与核验"
      stages={STAGES}
    />
  );
}
