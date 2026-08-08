import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart01FoundationsLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第1部分 基础",
        title: "基础问题 → 复杂度 → 前置知识 → 设计取舍 → 可验证构建",
        visualKind: "cc2e-part-01-foundations-evidence",
        chain: [
          { label: "基础问题", detail: "先定义目标" },
          { label: "复杂度", detail: "识别难点" },
          { label: "前置知识", detail: "补齐缺口" },
          { label: "设计取舍", detail: "留下理由" },
          { label: "可验证构建", detail: "重放结果" },
        ],
        baseline: "基线：目标、复杂度、前置知识与设计理由一致，并有最小验证任务。",
        boundary: "边界：基础模型可以缩小搜索空间，但不能替代具体系统约束。",
        fault: "拒绝：跳过问题定义和前置条件，直接套用看似熟悉的方案。",
        repair: "通过：补齐缺口后，第二位实践者能从同一问题重建取舍。",
      }}
    />
  );
}
