import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eTableIndexLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "表目录",
        title: "表号 → 变量定义 → 单位与样本 → 版本口径 → 定量判断",
        visualKind: "cc2e-table-index-comparison-evidence",
        chain: [
          { label: "表号", detail: "定位来源" },
          { label: "变量定义", detail: "说清含义" },
          { label: "单位样本", detail: "统一分母" },
          { label: "版本口径", detail: "固定条件" },
          { label: "定量判断", detail: "再下结论" },
        ],
        baseline: "基线：表号、定义、单位、样本和版本一致，差异才进入比较。",
        boundary: "边界：数值相近或差异很大，都不能替代口径和样本核对。",
        fault: "拒绝：直接比较不同分母、年份或项目规模的数据。",
        repair: "通过：补齐口径后重新计算，第二位读者能复现同一判断。",
      }}
    />
  );
}
