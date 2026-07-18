import { OfficialKia1BookLab } from "./official-kia1-book-lab";

const nodes = [
  "第1章 Kotlin：定义和目的",
  "1.1 Kotlin初体验",
  "1.2 Kotlin的主要特征",
  "1.2.1 目标平台：服务器端、Android及任何Java运行的地方",
  "1.2.2 静态类型",
  "1.2.3 函数式和面向对象",
  "1.2.4 免费并开源",
  "1.3 Kotlin应用",
  "1.3.1 服务器端的Kotlin",
  "1.3.2 Android上的Kotlin",
  "1.4 Kotlin的设计哲学",
  "1.4.1 务实",
  "1.4.2 简洁",
  "1.4.3 安全",
  "1.4.4 互操作性",
  "1.5 使用Kotlin工具",
  "1.5.1 编译Kotlin代码",
  "1.5.2 IntelliJ IDEA和Android Studio插件",
  "1.5.3 交互式shell",
  "1.5.4 Eclipse插件",
  "1.5.5 在线playground",
  "1.5.6 Java到Kotlin的转换器",
  "1.6 小结"
];

export function Kia1StructureLab() { return <OfficialKia1BookLab mode="structure" unitTitle="第1章 Kotlin：定义和目的" focus="从目标平台、静态类型、函数式与面向对象、设计哲学和工具链解释Kotlin为何能渐进进入Java工程" nodes={nodes} />; }
export function Kia1ExecutionLab() { return <OfficialKia1BookLab mode="execution" unitTitle="第1章 Kotlin：定义和目的" focus="把Kotlin理解成只面向Android的脚本语言，或把简洁误解为放弃静态类型约束" nodes={nodes} />; }
export function Kia1EvidenceLab() { return <OfficialKia1BookLab mode="evidence" unitTitle="第1章 Kotlin：定义和目的" focus="Hello World产物、字节码目标、平台矩阵、设计取舍表和Java调用记录" nodes={nodes} />; }
