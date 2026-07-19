import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-chapter-01",
  title: "第1章 计算机的世界你不懂",
  family: "os",
  nodes: ["程序指令", "CPU执行", "地址空间", "设备I/O", "外部结果"],
  concepts: ["第1章 计算机的世界你不懂"],
  mechanism:
    "程序从指令、CPU、内存、进程、线程、设备、文件与网络逐层获得执行能力，每层只承诺自己的资源合同",
  success: "第1章 计算机的世界你不懂 的输入、机制、输出与复位轨迹一致",
  failure:
    "第1章 计算机的世界你不懂 在“把线程、进程、CPU 与文件系统画成没有方向和所有权的一组名词”处拒绝",
} as const;

export function Crv18Chapter01Lab() {
  return <CoderMechanismLab {...profile} />;
}
