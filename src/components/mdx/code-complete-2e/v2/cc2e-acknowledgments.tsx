import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eAcknowledgmentsLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "鸣谢",
        title: "研究来源 → 贡献类型 → 技术评审 → 翻译审校 → 读者复核",
        visualKind: "cc2e-acknowledgments-contribution-evidence",
        chain: [
          { label: "研究来源", detail: "主张从哪里来" },
          { label: "贡献类型", detail: "谁做了什么" },
          { label: "技术评审", detail: "检查事实" },
          { label: "翻译审校", detail: "检查表达" },
          { label: "读者复核", detail: "独立重放" },
        ],
        baseline: "基线：感谢贡献与技术主张分开，来源、评审和版本均留下记录。",
        boundary: "边界：被感谢说明贡献关系，不自动等于对每条技术主张背书。",
        fault: "拒绝：把贡献者名单当成许可声明或事实证明，无法指出具体证据。",
        repair: "通过：贡献类型、事实来源、复核责任和独立重放彼此可追踪。",
      }}
    />
  );
}
