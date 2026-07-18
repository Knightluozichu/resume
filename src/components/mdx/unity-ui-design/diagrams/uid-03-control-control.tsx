import {
  UnityUiDesignLab,
  type UnityUiDesignSnapshot,
} from "./official-ui-design-lab";

const SNAPSHOTS = [
  {
    label: "文字",
    stage: "生成字形网格",
    action: "改变文本、对齐和效果并观察几何。",
    metric: "glyphs",
    evidence: "顶点与截断状态",
    boundary: "旧 Text 与 TMP 不能混称",
  },
  {
    label: "图像",
    stage: "比较四类 Image",
    action: "保持 Sprite 不变切换 type。",
    metric: "mesh",
    evidence: "border 与顶点对照",
    boundary: "Sliced 依赖 Sprite border",
  },
  {
    label: "状态",
    stage: "驱动 Selectable",
    action: "重放 hover、press、select、disable。",
    metric: "state",
    evidence: "状态转换日志",
    boundary: "视觉状态不等于焦点",
  },
  {
    label: "数值",
    stage: "连接 Toggle 与 Slider",
    action: "观察组约束和动态参数。",
    metric: "value",
    evidence: "UnityEvent 参数",
    boundary: "代码监听要解绑",
  },
  {
    label: "导航",
    stage: "验收滚动与手柄",
    action: "遍历 ScrollRect 和方向邻居。",
    metric: "path",
    evidence: "选中路径与边界",
    boundary: "自动导航可能越区",
  },
] as const satisfies ReadonlyArray<UnityUiDesignSnapshot>;

export function Uid03ControlControlMapLab() {
  return (
    <UnityUiDesignLab
      title="第 3 章：控件，控件，你必须学会控件"
      chapter="Chapter 3 · Control, Control, You Must Learn Control"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function Uid03ControlControlExperimentLab() {
  return (
    <UnityUiDesignLab
      title="第 3 章：控件，控件，你必须学会控件"
      chapter="Chapter 3 · Control, Control, You Must Learn Control"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function Uid03ControlControlEvidenceLab() {
  return (
    <UnityUiDesignLab
      title="第 3 章：控件，控件，你必须学会控件"
      chapter="Chapter 3 · Control, Control, You Must Learn Control"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
