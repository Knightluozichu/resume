"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-01",
  title: "Chapter 1. Looking Back, Looking Forward",
  question:
    "怎样解释旧即时GUI与新GameObject组件式uGUI的状态、布局和事件差异，而不混淆两个时代的接口？",
  concepts: [
    "State of play；GUI controls",
    "Common control features；Grouping controls；Getting in focus",
    "GUI styles and skins；GUI events and properties；Layout controls",
    "New layouts；Rect Transform；The Canvas",
    "New UnityEvent system；Control extensibility；Animation",
  ],
  viewports: [
    {
      name: "手机竖屏",
      width: 390,
      height: 844,
      safeInset: 7,
      scaleNote: "窄屏与安全区",
    },
    {
      name: "手机横屏",
      width: 844,
      height: 390,
      safeInset: 5,
      scaleNote: "超宽与短高度",
    },
    {
      name: "桌面窗口",
      width: 1440,
      height: 900,
      safeInset: 2,
      scaleNote: "参考分辨率之外",
    },
  ],
  panels: [
    {
      name: "设置面板",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "焦点控件",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "事件反馈条",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 1. Looking Back, Looking Forward”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 1. Looking Back, Looking Forward”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 1. Looking Back, Looking Forward”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交旧新GUI对照、GameObject层级、RectTransform、Canvas、视觉组件、Selectable状态、UnityEvent监听和动画状态记录。",
  ],
  failureRoute: [
    "“Chapter 1. Looking Back, Looking Forward”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：继续用每帧即时绘制的假设解释uGUI，导致状态、层级和序列化事件的所有权不清",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“每个控件的层级、布局矩形、视觉组件、交互状态和事件接收者都能追到同一版本化场景”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "每个控件的层级、布局矩形、视觉组件、交互状态和事件接收者都能追到同一版本化场景",
  fault:
    "继续用每帧即时绘制的假设解释uGUI，导致状态、层级和序列化事件的所有权不清",
  artifact:
    "旧新GUI对照、GameObject层级、RectTransform、Canvas、视觉组件、Selectable状态、UnityEvent监听和动画状态记录。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 1. Looking Back, Looking Forward”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 1. Looking Back, Looking Forward”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 1. Looking Back, Looking Forward”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 1. Looking Back, Looking Forward”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid01LookingBackLookingForwardLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid01LookingBackLookingForwardEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid01LookingBackLookingForwardReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
