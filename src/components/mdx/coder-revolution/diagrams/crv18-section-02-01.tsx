import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-02-01",
  title: "2.1 Java：一个帝国的诞生",
  family: "java",
  nodes: [
    "编写源码",
    "生成字节码",
    "验证类文件",
    "选择执行引擎",
    "调用平台服务",
  ],
  concepts: [
    "2.1 Java：一个帝国的诞生",
    "C语言帝国的统治",
    "反抗",
    "一鸣惊人",
    "开拓疆土",
    "帝国的诞生",
  ],
  mechanism:
    "Java 源码编译为 class 文件，JVM 验证并执行字节码；可移植性来自标准化类文件和运行时，而非一次生成的本机指令通吃所有平台",
  success: "2.1 Java：一个帝国的诞生 的输入、机制、输出与复位轨迹一致",
  failure:
    "2.1 Java：一个帝国的诞生 在“把跨平台口号理解为本地文件、字符编码和原生库也自动一致”处拒绝",
} as const;

export function Crv18Section0201Lab() {
  return <CoderMechanismLab {...profile} />;
}
