import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart02HighQualityCodeLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第2部分 高质量代码",
        title: "质量目标 → 设计结构 → 实现行为 → 验证证据 → 维护反馈",
        visualKind: "cc2e-part-02-high-quality-code-evidence",
        chain: [
          { label: "质量目标", detail: "明确可观察性" },
          { label: "设计结构", detail: "隔离变化" },
          { label: "实现行为", detail: "表达契约" },
          { label: "验证证据", detail: "测试与复查" },
          { label: "维护反馈", detail: "持续修订" },
        ],
        baseline: "基线：质量目标能映射到设计、行为、测试和维护记录。",
        boundary: "边界：局部整洁不等于全局高质量，必须说明系统约束和观察窗口。",
        fault: "拒绝：只凭代码风格或一次绿色测试宣称质量达标。",
        repair: "通过：每个质量主张都有行为证据，维护反馈能触发下一次验证。",
      }}
    />
  );
}
