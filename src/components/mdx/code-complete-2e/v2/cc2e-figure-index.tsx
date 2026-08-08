import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eFigureIndexLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "图目录",
        title: "图号 → 视觉主张 → 图例口径 → 读者任务 → 复核证据",
        visualKind: "cc2e-figure-index-visual-evidence",
        chain: [
          { label: "图号", detail: "定位上下文" },
          { label: "视觉主张", detail: "图在说明什么" },
          { label: "图例口径", detail: "变量与单位" },
          { label: "读者任务", detail: "如何阅读" },
          { label: "复核证据", detail: "能否重放" },
        ],
        baseline: "基线：图号、图例、正文主张和读者任务彼此对应。",
        boundary: "边界：图形能压缩关系，但不能替代文字中的条件和适用范围。",
        fault: "拒绝：只引用图号或漂亮形状，却无法说明变量与结论。",
        repair: "通过：读者能从图例和正文重建同一视觉判断。",
      }}
    />
  );
}
