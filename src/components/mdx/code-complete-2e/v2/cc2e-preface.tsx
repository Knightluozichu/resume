import { StructuralEvidenceLab } from "./cc2e-structural-evidence-lab";

export function Cc2ePrefaceLab() {
  return (
    <StructuralEvidenceLab
      config={{
        chapterLabel: "前言",
        title: "版本对象 → 构建范围 → 读者 → 使用方式 → 复核边界",
        visualKind: "cc2e-preface-edition-scope-evidence",
        chain: [
          { label: "版本对象", detail: "确认哪一版" },
          { label: "构建范围", detail: "软件构建问题" },
          { label: "读者对象", detail: "谁要使用" },
          { label: "使用方式", detail: "如何阅读" },
          { label: "复核边界", detail: "何时不适用" },
        ],
        baseline: "基线：版次、对象和使用方式一致，元数据与教学内容分开记录。",
        boundary: "边界：第二版范围不能直接证明今天的工具或实现仍然相同。",
        fault: "拒绝：把前言的版本说明当成正文授权，或把现代实践倒灌成原书原话。",
        repair: "通过：版本事实、独立重写和当前验证边界被分别记录并可复查。",
      }}
    />
  );
}
