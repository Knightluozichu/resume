import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第3章 语法分析器",
  label: "第3章 语法分析器",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "冻结CFG",
    "消除左递归",
    "计算预测集合",
    "构造LR项目集",
    "执行移进归约",
    "核对语法树",
  ],
  concepts: [
    "第3章 语法分析器",
    "3.1 简介",
    "3.2 语法的表示",
    "3.2.1 为什么不使用正则表达式",
    "3.2.2 上下文无关语法",
    "3.2.3 更复杂的例子",
    "3.2.4 将语义编码到结构中",
    "3.2.5 为输入符号串找到推导",
    "3.3 自顶向下语法分析",
    "3.3.1 为进行自顶向下语法分析而转换语法",
    "3.3.2 自顶向下的递归下降语法分析器",
    "3.3.3 表驱动的LL(1)语法分析器",
    "3.4 自底向上语法分析",
    "3.4.1 LR(1)语法分析算法",
    "3.4.2 构建LR(1)表",
    "3.4.3 表构造过程中的错误",
    "3.5 实际问题",
    "3.5.1 出错恢复",
    "3.5.2 一元运算符",
    "3.5.3 处理上下文相关的二义性",
    "3.5.4 左递归与右递归",
    "3.6 高级主题",
    "3.6.1 优化语法",
    "3.6.2 减小LR(1)表的规模",
    "3.7 小结和展望",
  ],
} as const;

export function Eac03ParsersMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac03ParsersExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac03ParsersEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
