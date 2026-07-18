import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第15章 做游戏的主人——输出控制利器DirectInput",
  label: "第三篇 · DirectX游戏编程基础",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "创建输入接口",
    "枚举并创建设备",
    "设置数据与协作级别",
    "获取轮询设备",
    "读取输入状态",
    "失焦后重新获取",
  ],
  concepts: [
    "第15章 做游戏的主人——输出控制利器DirectInput",
    "15.1 引言",
    "15.2 DirectInput接口概述",
    "15.3 DirectInput使用步骤详解",
    "15.3.1 头文件和库文件的包含",
    "15.3.2 创建DirectInput接口和设备",
    "15.3.3 设置数据格式",
    "15.3.4 设置协作级别",
    "15.3.5 设置特殊属性",
    "15.3.6 获取和轮询设备",
    "15.3.7 读取设备信息",
    "15.4 精炼：DirectInput使用五步曲",
    "15.5 DirectInput键盘按键键值总结",
    "15.6 DirectInput鼠标按键键值总结",
    "15.7 示例程序D3Ddemo8",
    "15.8 手把手封装DirectInput到类中",
    "15.9 封装好的DirectInput类的使用",
    "15.10 示例程序D3Ddemo9",
    "15.11 章节小憩",
  ],
} as const;

export function Wj15DirectinputMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj15DirectinputExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj15DirectinputEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
