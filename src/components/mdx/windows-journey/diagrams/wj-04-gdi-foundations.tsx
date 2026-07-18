import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第4章 入门心法——Windows游戏图形基础",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#a16207",
  soft: "#fefce8",
  chain: [
    "取得设备环境",
    "建立坐标与资源",
    "选择GDI对象",
    "绘制离屏画面",
    "提交前台显示",
    "释放全部句柄",
  ],
  concepts: [
    "第4章 入门心法——Windows游戏图形基础",
    "4.1 Windows图形设备接口（GDI）",
    "4.1.1 GDI的初印象",
    "4.1.2 用GDI写游戏的认知",
    "4.1.3 关于GDI+",
    "4.1.4 GDI的特点",
    "4.1.5 GDI中的基本图形",
    "4.1.6 GDI的函数分类",
    "4.2 设备环境（DC）",
    "4.2.1 设备环境的基本概念",
    "4.2.2 获取设备环境句柄（HDC）的两种方式",
    "4.3 Windows屏幕区域相关概念阐述",
    "4.3.1 屏幕区、窗口区与客户区",
    "4.3.2 坐标点与坐标变换",
    "4.4 写一个GDI程序通用框架",
    "4.5 GDI基本几何绘图",
    "4.5.1 创建画笔",
    "4.5.2 创建画刷",
    "4.5.3 图形对象的选择",
    "4.5.4 绘制图形和线条",
    "4.6 游戏随机数系统初步",
    "4.6.1 游戏中的随机系统概述",
    "4.6.2 随机系统初步",
    "4.6.3 几种随机数的简单算法",
    "4.6.4 产生一定范围内随机数的通用算法公式",
    "4.6.5 总结",
    "4.6.6 示例程序GDIdemo1",
    "4.7 文字的输出",
    "4.7.1 最常用文字输出函数TextOut",
    "4.7.2 进阶文字输出函数",
    "4.7.3 设置文字颜色",
    "4.7.4 设置文字背景透明",
    "4.7.5 字体的创建",
    "4.7.6 总结",
    "4.7.7 示例程序GDIdemo2",
    "4.8 位图绘制基础",
    "4.8.1 位图绘制四步曲",
    "4.8.2 示例程序GDIdemo3",
    "4.9 消除闪烁：缓冲显示技术",
    "4.10 章节小憩",
  ],
} as const;

export function Wj04GdiFoundationsMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj04GdiFoundationsExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj04GdiFoundationsEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
