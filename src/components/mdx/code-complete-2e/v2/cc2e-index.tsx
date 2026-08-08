import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eIndexLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "索引",
        title: "术语 → 位置 → 上下文 → 交叉引用 → 可重放结论",
        visualKind: "cc2e-index-navigation-evidence",
        chain: [
          { label: "术语", detail: "表达用户问题" },
          { label: "位置", detail: "找到页面" },
          { label: "上下文", detail: "理解含义" },
          { label: "交叉引用", detail: "连接相关项" },
          { label: "重放结论", detail: "回到证据" },
        ],
        baseline: "基线：术语能定位页面，页面提供上下文，交叉引用能回到原始证据。",
        boundary: "边界：关键词命中不等于理解，必须保留章节、版本和适用范围。",
        fault: "拒绝：只凭索引词条拼接结论，跳过正文条件和反例。",
        repair: "通过：读者能由索引找到上下文，并沿引用重建判断。",
      }}
    />
  );
}
