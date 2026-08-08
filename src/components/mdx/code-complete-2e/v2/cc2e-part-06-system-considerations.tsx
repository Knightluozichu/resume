import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart06SystemConsiderationsLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第6部分 系统考虑",
        title: "系统边界 → 输入输出 → 资源 → 环境约束 → 端到端证据",
        visualKind: "cc2e-part-06-system-considerations-evidence",
        chain: [
          { label: "系统边界", detail: "定义责任" },
          { label: "输入输出", detail: "说清契约" },
          { label: "资源", detail: "容量与成本" },
          { label: "环境约束", detail: "版本与依赖" },
          { label: "端到端证据", detail: "整体重放" },
        ],
        baseline: "基线：边界、契约、资源、依赖与端到端验收彼此对应。",
        boundary: "边界：系统局部通过不能推导跨服务、容量或环境变化后的结果。",
        fault: "拒绝：只验证单元行为，忽略资源耗尽、版本差异或外部失败。",
        repair: "通过：固定环境并重放端到端路径，记录跨边界的首个偏离。",
      }}
    />
  );
}
