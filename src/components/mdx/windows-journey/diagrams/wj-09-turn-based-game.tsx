import { OfficialWindowsJourneyLab } from "./official-windows-journey-lab";

const data = {
  title: "第9章 梦的初现——开发回合制游戏《勇者斗恶龙》",
  label: "第二篇 · GDI 2D游戏编程",
  color: "#1d4ed8",
  soft: "#eff6ff",
  chain: [
    "定义角色数据",
    "解析玩家行动",
    "选择敌方策略",
    "结算技能效果",
    "绘制战斗反馈",
    "保存可重放轨迹",
  ],
  concepts: [
    "第9章 梦的初现——开发回合制游戏《勇者斗恶龙》",
    "9.1 设计游戏登场角色",
    "9.2 设计主角角色技能",
    "9.2.1 “无敌斩”角色技能设计",
    "9.2.2 “烈火剑法”角色技能设计",
    "9.2.3 “气疗术”角色技能设计",
    "9.2.4 “恩赐解脱”角色技能设计",
    "9.3 设计反派角色技能",
    "9.3.1 人工智能技术一瞥",
    "9.3.2 反派人物AI的设计",
    "9.3.3 “幽冥鬼火”反派技能设计",
    "9.3.4 “嗜血咒”反派技能设计",
    "9.3.5 “致命一击”反派技能设计",
    "9.3.6 “使用梅肯斯姆”反派技能设计",
    "9.4 书写游戏程序实现代码",
    "9.4.1 游戏资源的初始化",
    "9.4.2 功能函数的实现",
    "9.4.3 游戏主体部分的实现",
    "9.4.4 游戏窗口过程函数的实现",
    "9.4.5 玩家动作逻辑与技能特效绘图函数的实现",
    "9.4.6 反派动作逻辑与绘图函数的实现",
    "9.5 整合代码，完成游戏开发",
    "9.6 玩游戏",
    "9.7 游戏打法攻略、改进与素材",
    "9.8 章节小憩",
  ],
} as const;

export function Wj09TurnBasedGameMapLab() {
  return <OfficialWindowsJourneyLab {...data} view="map" />;
}

export function Wj09TurnBasedGameExperimentLab() {
  return <OfficialWindowsJourneyLab {...data} view="experiment" />;
}

export function Wj09TurnBasedGameEvidenceLab() {
  return <OfficialWindowsJourneyLab {...data} view="evidence" />;
}
