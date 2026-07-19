import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-16",
  title: "第16章 控制的未来",
  concepts: [
    "第16章 控制的未来",
    "16.1 玩具世界的卡通物理学",
    "16.2 合成角色的诞生",
    "16.3 没有实体的机器人",
    "16.4行为学架构中的代理",
    "16.5 给自由意志强加宿命",
    "16.6 米老鼠重装上阵",
    "16.7 寻求协同控制",
  ],
  nodes: [
    "定义简化世界",
    "赋予局部目标",
    "代理竞争动作",
    "人与系统共调",
    "按风险收回权限",
  ],
  focuses: ["卡通物理", "合成角色", "软件身体", "行为代理", "协同控制"],
  model: {
    studio: "合成角色协同控制台",
    axisA: {
      label: "代理动作自治",
      levels: ["逐帧脚本", "目标驱动", "局部自选动作"],
    },
    axisB: {
      label: "人工收回速度",
      levels: ["无法收回", "延迟覆盖", "即时降级"],
    },
    outcomes: {
      success: "角色可信行为",
      risk: "越界持续时间",
      evidence: "证据可追溯度",
    },
    fault: "角色表现更自然但安全覆盖失效",
    task: "给合成角色分配目标、物理边界与人工接管条件",
    practiceMode: "design",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter16MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter16ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter16EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
