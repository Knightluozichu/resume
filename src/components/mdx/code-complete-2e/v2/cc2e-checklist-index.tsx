import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eChecklistIndexLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "核对表目录",
        title: "任务类型 → 进入条件 → 逐项核对 → 证据位置 → 拒绝与回归",
        visualKind: "cc2e-checklist-index-gate-evidence",
        chain: [
          { label: "任务类型", detail: "先定位问题" },
          { label: "进入条件", detail: "何时使用" },
          { label: "逐项核对", detail: "每项有判断" },
          { label: "证据位置", detail: "结果在哪里" },
          { label: "拒绝回归", detail: "失败可重放" },
        ],
        baseline: "基线：每个勾选项都有条件、证据和责任人，完成率不替代质量判断。",
        boundary: "边界：核对表只能约束已知风险，不能证明未定义问题已经消失。",
        fault: "拒绝：为了达到完成率勾选没有证据或不适用的条目。",
        repair: "通过：门禁能说明拒绝理由，补证据后从同一任务重新核对。",
      }}
    />
  );
}
