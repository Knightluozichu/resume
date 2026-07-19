import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-06",
  title: "1.6 我是一块硬盘",
  family: "hardware",
  nodes: ["解析路径", "读取元数据", "定位数据块", "设备传输", "同步持久化"],
  concepts: [
    "1.6 我是一块硬盘",
    "内部结构",
    "文件",
    "文件的存放",
    "管理空闲块",
    "文件系统",
  ],
  mechanism:
    "文件系统把名称解析为元数据与数据块，并用空闲空间结构分配块；磁盘或块设备只负责持久化块读写",
  success: "1.6 我是一块硬盘 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.6 我是一块硬盘 在“断电前只写目录项而未持久化数据与元数据顺序，恢复后得到悬空或旧内容”处拒绝",
} as const;

export function Crv18Section0106Lab() {
  return <CoderMechanismLab {...profile} />;
}
