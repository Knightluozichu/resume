import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "《Linux操作系统实战（Ubuntu）（慕课版）》权威学习地图",
  label: "学习地图",
  color: "#166534",
  soft: "#f0fdf4",
  chain: [
    "核对版本目录",
    "建立Ubuntu环境",
    "掌握命令管理",
    "构建编程工具链",
    "配置网络自动化",
    "交付项目实战",
  ],
  concepts: [
    "9章完整路线",
    "117个核心层级",
    "Ubuntu虚拟机",
    "命令与管理",
    "编程网络自动化",
    "俄罗斯方块项目",
  ],
} as const;

export function LopOfficialLearningMapMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function LopOfficialLearningMapExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function LopOfficialLearningMapEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
