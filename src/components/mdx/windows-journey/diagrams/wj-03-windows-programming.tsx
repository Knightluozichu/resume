import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第3章 启程——Windows编程基础",
  label: "第一篇 · Windows程序根基",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "进入WinMain",
    "注册窗口类",
    "创建显示窗口",
    "泵送消息",
    "执行窗口过程",
    "销毁并退出",
  ],
  concepts: [
    "第3章 启程——Windows编程基础",
    "3.1 高瞻远瞩——Windows编程体系与游戏编程",
    "3.2 理解两个术语——API与SDK",
    "3.2.1 何为API",
    "3.2.2 什么是SDK",
    "3.3 Windows程序的“心脏”——WinMain函数",
    "3.3.1 WinMain函数",
    "3.3.2 MessageBox函数",
    "3.3.3 PlaySound函数",
    "3.3.4 示例程序Firstblood！",
    "3.4 Windows程序的“外貌”——窗口",
    "3.5 Winodows资源的“身份证”——句柄",
    "3.6 Windows程序的“邮局”——消息与消息队列",
    "3.6.1 消息的表示形式——MSG结构体",
    "3.6.2 关于消息队列",
    "3.7 步步为营——窗口创建四步曲",
    "3.7.1 窗口类的设计",
    "3.7.2 窗口类的注册",
    "3.7.3 窗口的正式创建",
    "3.7.4 窗口的显示和更新",
    "3.8 各有千秋——两套消息循环体系",
    "3.8.1 以GetMessage为核心的消息循环体系",
    "3.8.2 以PeekMessage为核心的消息循环体系",
    "3.9 Windows程序的“中枢神经”——窗口过程函数",
    "3.10 做好善后——窗口类的注销",
    "3.11 牛刀小试——一个完整的窗口程序的诞生",
    "3.12 小不忍则乱大谋——关于命名规范",
    "3.13 章节小憩",
  ],
} as const;

export function Wj03WindowsProgrammingMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj03WindowsProgrammingExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj03WindowsProgrammingEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
