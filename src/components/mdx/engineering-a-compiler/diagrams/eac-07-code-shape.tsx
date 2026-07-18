import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第7章 代码形式",
  label: "第7章 代码形式",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "确定存储布局",
    "降低表达式",
    "生成地址计算",
    "形成控制流",
    "降低过程调用",
    "验证代码形状",
  ],
  concepts: [
    "第7章 代码形式",
    "7.1 简介",
    "7.2 分配存储位置",
    "7.2.1 设定运行时数据结构的位置",
    "7.2.2 数据区的布局",
    "7.2.3 将值保持在寄存器中",
    "7.3 算术运算符",
    "7.3.1 减少对寄存器的需求",
    "7.3.2 访问参数值",
    "7.3.3 表达式中的函数调用",
    "7.3.4 其他算术运算符",
    "7.3.5 混合类型表达式",
    "7.3.6 作为运算符的赋值操作",
    "7.4 布尔运算符和关系运算符",
    "7.4.1 表示",
    "7.4.2 对关系操作的硬件支持",
    "7.5 数组的存储和访问",
    "7.5.1 引用向量元素",
    "7.5.2 数组存储布局",
    "7.5.3 引用数组元素",
    "7.5.4 范围检查",
    "7.6 字符串",
    "7.6.1 字符串表示",
    "7.6.2 字符串赋值",
    "7.6.3 字符串连接",
    "7.6.4 字符串长度",
    "7.7 结构引用",
    "7.7.1 理解结构布局",
    "7.7.2 结构数组",
    "7.7.3 联合和运行时标记",
    "7.7.4 指针和匿名值",
    "7.8 控制流结构",
    "7.8.1 条件执行",
    "7.8.2 循环和迭代",
    "7.8.3 case语句",
    "7.9 过程调用",
    "7.9.1 实参求值",
    "7.9.2 保存和恢复寄存器",
    "7.10 小结和展望",
  ],
} as const;

export function Eac07CodeShapeMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac07CodeShapeExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac07CodeShapeEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
