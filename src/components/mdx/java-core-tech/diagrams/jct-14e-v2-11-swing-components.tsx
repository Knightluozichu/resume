import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-11-swing-components",
  "title": "卷II 第11章 Swing 用户界面组件",
  "concepts": [
    "Chapter 11: User Interface Components with Swing",
    "11.1 Swing and the Model-View-Controller Design Pattern",
    "11.2 Introduction to Layout Management",
    "11.3 Text Input",
    "11.4 Choice Components",
    "11.5 Menus",
    "11.6 The Grid Bag Layout",
    "11.7 Custom Layout Managers",
    "11.8 Dialog Boxes"
  ],
  "stages": [
    "定义模型",
    "选择布局",
    "绑定输入",
    "响应选择",
    "弹出对话"
  ],
  "focuses": [
    "MVC",
    "LayoutManager",
    "Document",
    "ButtonModel",
    "Action",
    "Dialog"
  ],
  "model": {
    "studio": "Swing 组件模型与布局台",
    "axisA": {
      "label": "布局策略",
      "levels": [
        "绝对坐标",
        "标准Layout",
        "自定义约束"
      ]
    },
    "axisB": {
      "label": "状态位置",
      "levels": [
        "视图即模型",
        "组件Model",
        "领域Model"
      ]
    },
    "outcomes": {
      "success": "布局适应率",
      "risk": "状态耦合风险",
      "evidence": "可重放证据"
    },
    "fault": "使用绝对坐标，在字体缩放或翻译变长后裁切控件，并把视图当唯一业务状态",
    "task": "改变字体、窗口宽度和Locale，检查布局、键盘焦点与模型状态是否保持",
    "invariant": "内容变化与窗口缩放不破坏操作顺序和模型值",
    "probe": "component.getPreferredSize()",
    "practiceMode": "design",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV211SwingComponentsMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV211SwingComponentsExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV211SwingComponentsEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
