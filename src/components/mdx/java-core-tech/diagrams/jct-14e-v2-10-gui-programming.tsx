import { OfficialJct25Studio } from "./official-jct-lab";

const props = {
  "unitId": "jct-14e-v2-10-gui-programming",
  "title": "卷II 第10章 图形用户界面编程",
  "concepts": [
    "Chapter 10: Graphical User Interface Programming",
    "10.1 A History of Java User Interface Toolkits",
    "10.2 Displaying Frames",
    "10.3 Displaying Information in a Component",
    "10.4 Event Handling",
    "10.5 The Preferences API"
  ],
  "stages": [
    "创建EDT",
    "构建窗口",
    "接收事件",
    "更新模型",
    "重绘持久化"
  ],
  "focuses": [
    "EDT",
    "JFrame",
    "paintComponent",
    "事件监听",
    "模型状态",
    "Preferences"
  ],
  "model": {
    "studio": "Swing EDT 响应轨迹台",
    "axisA": {
      "label": "任务位置",
      "levels": [
        "EDT阻塞",
        "后台执行",
        "后台加EDT提交"
      ]
    },
    "axisB": {
      "label": "状态所有者",
      "levels": [
        "绘制回调",
        "组件字段",
        "独立模型"
      ]
    },
    "outcomes": {
      "success": "界面响应率",
      "risk": "线程违规风险",
      "evidence": "可重放证据"
    },
    "fault": "在EDT执行阻塞I/O，或从后台线程直接修改Swing组件",
    "task": "注入慢任务并比较三种调度方式的事件延迟、状态一致性与关闭结果",
    "invariant": "Swing组件只在EDT访问，长任务不占用EDT",
    "probe": "SwingUtilities.isEventDispatchThread()",
    "practiceMode": "simulation",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Jct14eV210GuiProgrammingMapLab() {
  return <OfficialJct25Studio {...props} mode="map" />;
}

export function Jct14eV210GuiProgrammingExperimentLab() {
  return <OfficialJct25Studio {...props} mode="experiment" />;
}

export function Jct14eV210GuiProgrammingEvidenceLab() {
  return <OfficialJct25Studio {...props} mode="evidence" />;
}
