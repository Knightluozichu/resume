import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePart03VariablesLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "第3部分 变量",
        title: "变量意图 → 初始化 → 命名 → 作用域 → 生命周期与证据",
        visualKind: "cc2e-part-03-variables-evidence",
        chain: [
          { label: "变量意图", detail: "它表示什么" },
          { label: "初始化", detail: "何时有值" },
          { label: "命名", detail: "让读者预测" },
          { label: "作用域", detail: "限制可见性" },
          { label: "生命周期", detail: "复查边界" },
        ],
        baseline: "基线：变量的意图、初值、名称、作用域和生命周期能被读者解释。",
        boundary: "边界：短名称或缩小作用域要服从上下文，不应牺牲关键语义。",
        fault: "拒绝：变量未初始化、复用含义或跨越不必要范围，导致行为无法预测。",
        repair: "通过：修订变量合同后，正常、边界和故障输入都能被独立复查。",
      }}
    />
  );
}
