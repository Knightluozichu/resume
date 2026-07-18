import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-17-more",
  title: "第17章 You Mean There’s More?",
  nodes: [
    "列出遗漏系统",
    "定位依赖层",
    "声明生命周期",
    "分配实时预算",
    "设计验证实验",
  ],
  focuses: ["知识边界", "架构迁移", "玩法专属", "在线服务", "持续演化"],
};

export function Gea3Chapter17MoreMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter17MoreExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter17MoreEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
