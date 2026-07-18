import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "《Linux操作系统实战（Ubuntu）（慕课版）》全书总复习",
  label: "全书验收",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "恢复干净快照",
    "重建用户软件",
    "编译调试程序",
    "配置验证网络",
    "运行自动化脚本",
    "重放项目并审计",
  ],
  concepts: [
    "安装与命令",
    "用户与软件",
    "Vim/GCC/GDB/Make",
    "网络服务",
    "Shell与正则",
    "俄罗斯方块验收",
  ],
} as const;

export function LopOfficialFinalReviewMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function LopOfficialFinalReviewExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function LopOfficialFinalReviewEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
