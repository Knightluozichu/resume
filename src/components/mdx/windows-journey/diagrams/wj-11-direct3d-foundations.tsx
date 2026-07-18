import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第11章 三维内功心法——Direct3D编程基础",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#be185d",
  soft: "#fdf2f8",
  chain: [
    "创建接口对象",
    "查询设备能力",
    "配置呈现参数",
    "创建渲染设备",
    "提交绘制命令",
    "释放COM资源",
  ],
  concepts: [
    "第11章 三维内功心法——Direct3D编程基础",
    "11.1 典型Direct3D程序流程分析",
    "11.2 对COM接口对象的一些介绍",
    "11.3 写一个DirectX程序通用框架",
    "11.4 化腐朽为神奇——Direct3D初始化四步曲",
    "11.4.1 Direct3D初始化四步曲概述",
    "11.4.2 Direct3D初始化四步曲之一：创接口",
    "11.4.3 Direct3D初始化四步曲之二：取信息",
    "11.4.4 Direct3D初始化四步曲之三：填内容",
    "11.4.5 Direct3D初始化四步曲之四：创设备",
    "11.4.6 Direct3D初始化四步曲代码赏析",
    "11.4.7 示例程序D3Ddemo1",
    "11.5 深入理解Direct3D动画显示技术——交换链",
    "11.6 对固定功能渲染流水线体系的理解",
    "11.7 Direct3D中的“绘制金钥匙”—— Direct3D设备接口",
    "11.8 Direct3D中二维文本的绘制",
    "11.8.1 D3DXCreateFont函数",
    "11.8.2 DrawText函数",
    "11.9 起承转合的艺术：Direct3D渲染五步曲",
    "11.9.1 Direct3D渲染五步曲概述",
    "11.9.2 五步曲之一：清屏操作",
    "11.9.3 五步曲之二：开始绘制",
    "11.9.4 五步曲之三：正式绘制",
    "11.9.5 五步曲之四：结束绘制",
    "11.9.6 五步曲之五：翻转显示",
    "11.9.7 Direct3D渲染五步曲代码整体赏析",
    "11.9.8 示例程序D3Ddemo2",
    "11.10 章节小憩",
  ],
} as const;

export function Wj11Direct3dFoundationsMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj11Direct3dFoundationsExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj11Direct3dFoundationsEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
