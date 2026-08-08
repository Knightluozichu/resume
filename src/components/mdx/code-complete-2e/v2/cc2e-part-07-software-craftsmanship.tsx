import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart07SoftwareCraftsmanshipLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第7部分 软件工艺",
        title: "原则 → 情境 → 试验 → 折中 → 可交接判断",
        visualKind: "cc2e-part-07-software-craftsmanship-evidence",
        chain: [
          { label: "原则", detail: "缩小搜索空间" },
          { label: "情境", detail: "加入约束" },
          { label: "试验", detail: "只改一个条件" },
          { label: "折中", detail: "说明代价" },
          { label: "判断", detail: "规定重审点" },
        ],
        baseline: "基线：原则提供方向，情境和证据共同决定可交接的折中。",
        boundary: "边界：原则不能取消领域约束，反例出现时必须重审模型。",
        fault: "拒绝：把经验口号当成普遍规则，靠堆例外掩盖反例。",
        repair: "通过：保留约束、反例和代价，第二位实践者能重建判断。",
      }}
    />
  );
}
