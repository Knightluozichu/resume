import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第1章 开始启程，你的第一行Android代码",
  "1.1 了解全貌，Android王国简介",
  "1.2 手把手带你搭建开发环境",
  "1.3 创建你的第一个Android项目",
  "1.4 前行必备：掌握日志工具的使用",
  "1.5 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第1章 开始启程，你的第一行Android代码" focus="建立Android 10系统层次、Android Studio与SDK工具链、Gradle项目结构、资源系统和日志证据的最小开发闭环" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第1章 开始启程，你的第一行Android代码" focus="从空目录创建HelloWorld，固定JDK、SDK、Gradle和设备镜像后构建、安装、启动，并用日志证明生命周期入口" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第1章 开始启程，你的第一行Android代码" focus="可重建工程、SDK与Gradle环境指纹、资源解析图、分级日志与安装运行记录" nodes={nodes} />; }
