import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-01-07",
  title: "1.7 我是一个键盘",
  family: "hardware",
  nodes: ["按键扫描", "控制器缓冲", "中断通知", "驱动读取", "进程消费"],
  concepts: [
    "1.7 我是一个键盘",
    "二等公民",
    "总线和端口",
    "轮询（程序式I/O）",
    "中断",
    "DMA",
  ],
  mechanism:
    "键盘经控制器和总线产生输入；轮询由 CPU 主动检查，中断在事件到来时通知，DMA 则让大块数据不必逐字节占用 CPU",
  success: "1.7 我是一个键盘 的输入、机制、输出与复位轨迹一致",
  failure:
    "1.7 我是一个键盘 在“把中断与 DMA 都解释成设备直接执行应用代码，遗漏驱动和内核的边界”处拒绝",
} as const;

export function Crv18Section0107Lab() {
  return <CoderMechanismLab {...profile} />;
}
