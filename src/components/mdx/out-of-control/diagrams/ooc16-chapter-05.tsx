import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-05",
  title: "第5章 共同进化",
  concepts: [
    "第5章 共同进化",
    "5.1 放在镜子上的变色龙是什么颜色的？",
    "5.2 生命之无法理喻之处",
    "5.3 在持久的摇摇欲坠状态中保持平衡",
    "5.4 岩石乃节奏缓慢的生命",
    "5.5 不讲交情或无远见的合作",
  ],
  nodes: [
    "选择局部策略",
    "改变共享环境",
    "他者同步适应",
    "收益地形移动",
    "维持动态可行",
  ],
  focuses: ["相互适应", "移动适应度", "动态平衡", "时间尺度", "无意图合作"],
  model: {
    studio: "共同进化收益地形",
    axisA: {
      label: "策略多样性",
      levels: ["单一", "两类互补", "多类并存"],
    },
    axisB: {
      label: "对手响应速度",
      levels: ["静态", "滞后调整", "同步适应"],
    },
    outcomes: {
      success: "动态共存窗口",
      risk: "军备竞赛强度",
      evidence: "证据可追溯度",
    },
    fault: "把移动中的适应度误当成固定最优值",
    task: "让两个相互适应的群体交换一次领先并解释为何没有永久赢家",
    practiceMode: "calculation",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter05MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter05ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter05EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
