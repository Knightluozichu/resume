import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-05-03",
  title: "5.3 C老头儿和Java小子的硬盘夜话",
  family: "language",
  nodes: ["生成程序", "链接或加载", "分配内存", "调用系统I/O", "持久化文件"],
  concepts: ["5.3 C老头儿和Java小子的硬盘夜话"],
  mechanism:
    "C 常经编译链接为本机程序并显式管理内存，Java 生成类文件由 JVM 装载执行并以垃圾回收管理对象；两者最终都经操作系统访问磁盘",
  success: "5.3 C老头儿和Java小子的硬盘夜话 的输入、机制、输出与复位轨迹一致",
  failure:
    "5.3 C老头儿和Java小子的硬盘夜话 在“把 Java 对象的持久化等同于 JVM 堆，进程退出后仍期待内存状态保留”处拒绝",
} as const;

export function Crv18Section0503Lab() {
  return <CoderMechanismLab {...profile} />;
}
