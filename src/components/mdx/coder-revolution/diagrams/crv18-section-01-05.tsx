import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-05",
  title: "1.5 我是一个进程",
  family: "os",
  nodes: ["装载程序", "创建进程", "映射页面", "调度线程", "退出回收"],
  concepts: [
    "1.5 我是一个进程",
    "批处理系统",
    "多道程序",
    "地址重定位",
    "分时系统",
    "分块装入内存",
    "虚拟内存：分页",
    "分段 分页",
    "程序的装载",
    "线程",
  ],
  mechanism:
    "进程提供隔离的虚拟地址空间和资源身份，页表把虚拟页映射到物理页，线程则在该进程资源内执行",
  success: "1.5 我是一个进程 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.5 我是一个进程 在“把指针值当成物理地址，或让两个进程未经共享映射直接访问同一虚拟地址”处拒绝",
} as const;

export function Crv18Section0105Lab() {
  return <CoderMechanismLab {...profile} />;
}
