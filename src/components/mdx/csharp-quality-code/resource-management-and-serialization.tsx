"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么GC不能替你决定资源和数据的所有权",
    mechanism:
      "GC回答managed object何时不可达，不回答file handle何时必须关闭、buffer何时必须flush、borrowed stream能否由callee释放，也不回答domain object哪些fields可以进入wire format。资源管理和序列化都需要一个显式owners…",
    failure:
      "若把「为什么GC不能替你决定资源和数据的所有权」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么GC不能替你决定资源和数据的所有权」的收益与反例。",
  },
  {
    label: "Deterministic Cleanup与Dispose…",
    mechanism:
      "type直接拥有scarce resource，或拥有必须Dispose的managed child时，实现 IDisposable 让caller通过 using 建立deterministic lifetime。若cleanup本身必须await，例如async flush/network sh…",
    failure:
      "若把「Deterministic Cleanup与Dispose…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Deterministic Cleanup与Dispose…」的收益与反例。",
  },
  {
    label: "Serialization Shape、Version与I…",
    mechanism:
      "cache、delegate、thread primitive、native handle、service reference与derived data不属于persistent state，应以serializer contract排除，例如 [JsonIgnore] 或DTO不包含该member…",
    failure:
      "若把「Serialization Shape、Version与I…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Serialization Shape、Version与I…」的收益与反例。",
  },
];

export function ResourceManagementAndSerializationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第4章：资源管理和序列化（建议46-57）：机制与证据"
      prompt="切换《第4章：资源管理和序列化（建议46-57）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第4章：资源管理和序列化（建议46-57）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ResourceManagementAndSerializationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第4章：资源管理和序列化（建议46-57）：机制路径"
      stages={STAGES}
    />
  );
}

export function ResourceManagementAndSerializationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第4章：资源管理和序列化（建议46-57）：失效与核验"
      stages={STAGES}
    />
  );
}
