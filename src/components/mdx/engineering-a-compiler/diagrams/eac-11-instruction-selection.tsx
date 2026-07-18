import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第11章 指令选择",
  label: "第11章 指令选择",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "规范化IR树",
    "匹配重写规则",
    "计算覆盖成本",
    "恢复最优平铺",
    "执行窥孔变换",
    "验证目标语义",
  ],
  concepts: [
    "第四部分 编译器后端",
    "第11章 指令选择",
    "11.1 简介",
    "11.2 代码生成",
    "11.3 扩展简单的树遍历方案",
    "11.4 通过树模式匹配进行指令选择",
    "11.4.1 重写规则",
    "11.4.2 找到平铺方案",
    "11.4.3 工具",
    "11.5 通过窥孔优化进行指令选择",
    "11.5.1 窥孔优化",
    "11.5.2 窥孔变换程序",
    "11.6 高级主题",
    "11.6.1 学习窥孔模式",
    "11.6.2 生成指令序列",
    "11.7 小结和展望",
  ],
} as const;

export function Eac11InstructionSelectionMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac11InstructionSelectionExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac11InstructionSelectionEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
