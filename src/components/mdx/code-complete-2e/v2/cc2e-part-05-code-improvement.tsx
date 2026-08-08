import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart05CodeImprovementLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第5部分 代码改进",
        title: "问题定位 → 重构 → 性能取舍 → 防御 → 回归反馈",
        visualKind: "cc2e-part-05-code-improvement-evidence",
        chain: [
          { label: "问题定位", detail: "先找首个偏离" },
          { label: "重构", detail: "只改一件事" },
          { label: "性能取舍", detail: "比较成本" },
          { label: "防御", detail: "保留边界" },
          { label: "回归反馈", detail: "复查结果" },
        ],
        baseline: "基线：改进有明确问题、单变量变更、对照输入和回归证据。",
        boundary: "边界：优化目标、数据规模或维护成本改变时，原结论需要重审。",
        fault: "拒绝：没有基线就重构，或只凭局部速度宣称整体改进。",
        repair: "通过：修订保留行为契约，第二位实践者能复现收益与代价。",
      }}
    />
  );
}
