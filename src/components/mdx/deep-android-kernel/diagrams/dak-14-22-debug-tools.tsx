import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第22章 系统调试辅助工具",
  "22.1 万能模拟器——Emulator",
  "22.1.1 QEMU",
  "22.1.2 Android工程中的QEMU",
  "22.1.3 模拟器控制台（Emulator Console）",
  "22.1.4 实例：为Android模拟器添加串口功能",
  "22.2 此Android非彼Android",
  "22.3 快速建立与模拟器或真机的通信渠道——ADB",
  "22.3.1 ADB的使用方法",
  "22.3.2 ADB的组成元素",
  "22.3.3 ADB源代码解析",
  "22.3.4 ADB Protocol"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第22章 系统调试辅助工具" focus="理解QEMU模拟器、Android工程差异、ADB使用组成源码与协议" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第22章 系统调试辅助工具" focus="只背adb命令，不理解host server、device daemon、transport与协议帧导致故障无法定位" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第22章 系统调试辅助工具" focus="模拟器进程、控制台、串口、ADB client/server/daemon、传输协议、设备状态和断线恢复" nodes={nodes}/>;}
