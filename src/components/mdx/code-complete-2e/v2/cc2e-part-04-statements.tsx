import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart04StatementsLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第4部分 语句",
        title: "语句目标 → 顺序 → 条件 → 循环 → 异常与状态证据",
        visualKind: "cc2e-part-04-statements-evidence",
        chain: [
          { label: "语句目标", detail: "先说明动作" },
          { label: "顺序", detail: "控制先后" },
          { label: "条件", detail: "覆盖分支" },
          { label: "循环", detail: "定义终止" },
          { label: "异常状态", detail: "复查边界" },
        ],
        baseline: "基线：顺序、分支、循环和异常路径都对应明确的输入与结果。",
        boundary: "边界：条件取反、循环空集或迭代上限改变时，控制流仍可解释。",
        fault: "拒绝：只测试正常路径，遗漏分支、终止条件或失败状态。",
        repair: "通过：第二位实践者能从同一输入重建控制流和首个偏离。",
      }}
    />
  );
}
