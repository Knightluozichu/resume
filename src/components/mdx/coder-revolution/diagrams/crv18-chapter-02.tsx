import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-02",
  title: "第2章 Java帝国",
  family: "java",
  nodes: ["Java源码", "编译类文件", "类加载", "对象装配", "运行服务"],
  concepts: ["第2章 Java帝国"],
  mechanism:
    "Java 生态用字节码、类加载、接口、容器与库把平台差异和对象装配隔离在稳定合同之后",
  success: "第2章 Java帝国 的输入、机制、输出与复位轨迹一致",
  failure:
    "第2章 Java帝国 在“把框架、虚拟机与语言语法混为同一层，出现问题时无法确定责任边界”处拒绝",
} as const;

export function Crv18Chapter02Lab() {
  return <CoderMechanismLab {...profile} />;
}
