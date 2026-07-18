import { OfficialWindowsKernelLab } from "./official-windows-kernel-lab";

const data = {
  title: "第10章 文件系统小过滤驱动",
  label: "第10章 · Minifilter",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "注册过滤器",
    "安装选择Altitude",
    "拦截创建设置信息",
    "管理名称上下文",
    "备份写入数据",
    "与用户模式通信",
  ],
  concepts: [
    "第10章 文件系统小过滤驱动",
    "10.1 简介",
    "10.2 装入与卸载",
    "10.3 初始化",
    "10.3.1 操作回调注册",
    "10.3.2 高度",
    "10.4 安装",
    "10.4.1 INF文件",
    "10.4.2 安装驱动程序",
    "10.5 处理I/O操作",
    "10.5.1 操作前回调",
    "10.5.2 操作后回调",
    "10.6 删除保护驱动程序",
    "10.6.1 处理创建前回调",
    "10.6.2 处理设置信息前回调",
    "10.6.3 重构",
    "10.6.4 将驱动程序通用化",
    "10.6.5 测试修改后的驱动程序",
    "10.7 文件名",
    "10.7.1 文件名的各个部分",
    "10.7.2 RAII FLT_FILE_NAME_INFORMATION包装器",
    "10.8 另一个删除保护驱动程序",
    "10.8.1 处理创建前回调和设置信息前回调",
    "10.8.2 测试驱动程序",
    "10.9 上下文",
    "10.10 初始化I/O请求",
    "10.11 文件备份驱动程序",
    "10.11.1 创建后回调",
    "10.11.2 写前回调",
    "10.11.3 清理后回调",
    "10.11.4 测试驱动程序",
    "10.11.5 恢复备份",
    "10.12 用户模式通信",
    "10.12.1 创建通信端口",
    "10.12.2 用户模式连接",
    "10.12.3 发送和接收消息",
    "10.12.4 增强文件备份驱动程序",
    "10.12.5 用户模式客户程序",
    "10.13 调试",
    "10.15 总结",
  ],
} as const;

export function Wkp10FileSystemMinifiltersMapLab() {
  return <OfficialWindowsKernelLab {...data} view="map" />;
}
export function Wkp10FileSystemMinifiltersExperimentLab() {
  return <OfficialWindowsKernelLab {...data} view="experiment" />;
}
export function Wkp10FileSystemMinifiltersEvidenceLab() {
  return <OfficialWindowsKernelLab {...data} view="evidence" />;
}
