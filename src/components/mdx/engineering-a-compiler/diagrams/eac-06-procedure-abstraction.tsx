import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第6章 过程抽象",
  label: "第6章 过程抽象",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "解析调用目标",
    "布局活动记录",
    "传递参数",
    "建立可寻址性",
    "执行标准链接",
    "回收运行时对象",
  ],
  concepts: [
    "第6章 过程抽象",
    "6.1 简介",
    "6.2 过程调用",
    "6.3 命名空间",
    "6.3.1 类Algol语言的命名空间",
    "6.3.2 用于支持类Algol语言的运行时结构",
    "6.3.3 面向对象语言的命名空间",
    "6.3.4 支持面向对象语言的运行时结构",
    "6.4 过程之间值的传递",
    "6.4.1 传递参数",
    "6.4.2 返回值",
    "6.4.3 确定可寻址性",
    "6.5 标准化链接",
    "6.6 高级主题",
    "6.6.1 堆的显式管理",
    "6.6.2 隐式释放",
    "6.7 小结和展望",
  ],
} as const;

export function Eac06ProcedureAbstractionMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac06ProcedureAbstractionExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac06ProcedureAbstractionEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
