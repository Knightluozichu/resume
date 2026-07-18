import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第7章 做游戏的主人——Windows游戏输入消息处理",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "进入WinMain",
    "注册窗口类",
    "创建显示窗口",
    "泵送消息",
    "执行窗口过程",
    "销毁并退出",
  ],
  concepts: [
    "第7章 做游戏的主人——Windows游戏输入消息处理",
    "7.1 Windows键盘消息处理",
    "7.1.1 虚拟键码与键盘消息",
    "7.1.2 键盘消息处理",
    "7.1.3 示例程序GDIdemo10",
    "7.2 Windows鼠标消息处理",
    "7.2.1 鼠标消息的处理方式",
    "7.2.2 鼠标相关常用函数讲解",
    "7.3 章节小憩",
  ],
} as const;

export function Wj07InputMessagesMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj07InputMessagesExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj07InputMessagesEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
