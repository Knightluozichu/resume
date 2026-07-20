import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-09-reference-resolution",
  title: "第9章 语义分析（1）引用的消解",
  concepts: [
    "第9章 语义分析（1）引用的消解",
    "9.1 语义分析的概要",
    "9.2 变量引用的消解",
    "9.3 类型名称的消解",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "作用域与引用消解台",
    boundary: "declarations → nested scopes → name/type uses → unique binding",
    axisA: {
      label: "作用域形态",
      levels: ["全局", "函数", "嵌套块"],
    },
    axisB: {
      label: "引用结果",
      levels: ["唯一绑定", "遮蔽", "未定义/重复"],
    },
    fault: "按字符串搜索最近声明而忽略命名空间和声明时点",
    invariant: "每个引用绑定唯一声明ID，遮蔽和未定义诊断保持源位置",
    probe:
      "java ResolveDump samples/scope.cb\njava ResolveDump samples/scope-invalid.cb",
    signal: "声明ID、作用域栈与诊断",
    artifact: "引用—声明绑定表",
    trap: "名称相同不等于同一个实体",
    practiceMode: "code",
    task: "第9章 语义分析（1）引用的消解固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变作用域形态或引用结果。",
  },
} as const;

export function Crc09ReferenceResolutionMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc09ReferenceResolutionExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc09ReferenceResolutionEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
