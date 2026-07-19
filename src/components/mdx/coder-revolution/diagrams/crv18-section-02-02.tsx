import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-02",
  title: "2.2 我是一个Java Class",
  family: "java",
  nodes: ["读取class", "验证格式", "准备静态态", "解析符号", "初始化使用"],
  concepts: [
    "2.2 我是一个Java Class",
    "陌生警察",
    "刺探信息",
    "初识虚拟机",
    "快乐假期",
    "真相大白",
  ],
  mechanism:
    "class 文件含常量池、字段、方法和属性；JVM 依次加载、验证、准备、解析与初始化，实例对象再引用已加载的类元数据",
  success: "2.2 我是一个Java Class 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.2 我是一个Java Class 在“在类初始化尚未完成时依赖静态字段的最终值，触发循环初始化或半成品状态”处拒绝",
} as const;

export function Crv18Section0202Lab() {
  return <CoderMechanismLab {...profile} />;
}
