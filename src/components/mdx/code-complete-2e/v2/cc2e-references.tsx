import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2eReferencesLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "参考文献",
        title: "参考需要 → 来源相关性 → 注释范围 → 版本状态 → 复核路径",
        visualKind: "cc2e-references-source-evidence",
        chain: [
          { label: "参考需要", detail: "先说要证什么" },
          { label: "来源相关性", detail: "为何选它" },
          { label: "注释范围", detail: "说明能支持什么" },
          { label: "版本状态", detail: "固定时间条件" },
          { label: "复核路径", detail: "别人可重查" },
        ],
        baseline: "基线：每条参考都绑定主张、来源理由、版本和可复核路径。",
        boundary: "边界：书目权威性不能替代与当前主张的相关性和版本核对。",
        fault: "拒绝：只堆链接或作者名，无法说明它支持哪条判断。",
        repair: "通过：第二位读者能按注释和版本重新找到并检查证据。",
      }}
    />
  );
}
