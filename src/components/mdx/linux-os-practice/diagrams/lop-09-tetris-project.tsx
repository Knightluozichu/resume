import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第9章 项目实战：俄罗斯方块游戏",
  label: "项目 · 俄罗斯方块",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "冻结需求规则",
    "设计棋盘与方块",
    "解析输入时钟",
    "检测移动旋转",
    "消行计分绘制",
    "重放并验收",
  ],
  concepts: [
    "第9章 项目实战：俄罗斯方块游戏",
    "9.1 项目概述",
    "9.1.1 开发背景",
    "9.1.2 需求分析",
    "9.1.3 功能设计",
    "9.1.4 软件框架",
    "9.2 案例实现",
    "9.2.1 核心技术介绍",
    "9.2.2 案例代码分析",
    "9.2.3 代码设计逻辑",
    "9.2.4 项目效果展示",
    "9.3 本章小结",
  ],
} as const;

export function Lop09TetrisProjectMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop09TetrisProjectExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop09TetrisProjectEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
