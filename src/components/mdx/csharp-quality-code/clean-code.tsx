"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么整洁代码不是行数、注释数或Method数比赛",
    mechanism:
      "短method可能只是把一次阅读变成十次跳转，DRY可能把两个偶然相似的rules绑死，零注释也可能隐藏安全协议。真正目标是让一次change只触及一个cohesive owner、让public caller只依赖稳定capability、让failure和non-obvious constraints可被验证。",
    failure:
      "若把「为什么整洁代码不是行数、注释数或Method数比赛」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么整洁代码不是行数、注释数或Method数比赛」的收益与反例。",
  },
  {
    label: "Readability与Minimum Surface（建…",
    mechanism:
      "C 默认使top-level type internal、class members private，这有助于least exposure；但“依赖默认”可能让reader在不同context猜visibility。现代做法是保持最小访问级别，并按项目style显式写出关键contract，由ana…",
    failure:
      "若把「Readability与Minimum Surface（建…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Readability与Minimum Surface（建…」的收益与反例。",
  },
  {
    label: "Cohesion、Knowledge与Data-Drive…",
    mechanism:
      "一组fields在多个signature中共同出现、具有cross-field invariant或共同lifetime时，提取parameter/value object，使illegal combination在construction被拒绝。不要只造无behavior data bag；新ty…",
    failure:
      "若把「Cohesion、Knowledge与Data-Drive…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Cohesion、Knowledge与Data-Drive…」的收益与反例。",
  },
];

export function CleanCodeDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第11章：代码整洁（建议140-153）：机制与证据"
      prompt="切换《第11章：代码整洁（建议140-153）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第11章：代码整洁（建议140-153）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CleanCodeMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第11章：代码整洁（建议140-153）：机制路径"
      stages={STAGES}
    />
  );
}

export function CleanCodeFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第11章：代码整洁（建议140-153）：失效与核验"
      stages={STAGES}
    />
  );
}
