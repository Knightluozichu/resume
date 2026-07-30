"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-06",
  title: "Chapter 6. Working with the UI Source",
  question:
    "怎样从输入模块沿Raycaster、事件数据、接口和处理器重放一次事件，并区分历史源码仓库与现行包？",
  concepts: [
    "The Event System loop；Controlling state；Raycast Marshalling",
    "Working with events；Using a parameter；Built-in event interfaces",
    "Executing events；Building your own handlers or custom events",
    "A custom event Data Structure；A custom event Interface；A custom event static container",
    "The Roll a Ball Derby；The Droid script；The Alarm plates",
    "Getting access to the source；The repository；Getting forked；Keeping up to date",
    "Adding your own version of UI to your project；Extra credit, push it back to Unity",
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
      name: "警报压力板",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "Droid接收器",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "事件日志",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 6. Working with the UI Source”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 6. Working with the UI Source”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 6. Working with the UI Source”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交输入模块、PointerEventData、RaycastResult、目标排序、事件接口、ExecuteEvents、自定义数据、处理日志和源码版本说明。",
  ],
  failureRoute: [
    "“Chapter 6. Working with the UI Source”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：自定义事件容器复用错误数据类型，同时把2015源码仓库操作当作Unity 6包升级流程",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“活动输入模块唯一，Raycaster结果可排序，事件数据类型匹配处理器，源码版本与项目Unity版本一致”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "活动输入模块唯一，Raycaster结果可排序，事件数据类型匹配处理器，源码版本与项目Unity版本一致",
  fault:
    "自定义事件容器复用错误数据类型，同时把2015源码仓库操作当作Unity 6包升级流程",
  artifact:
    "输入模块、PointerEventData、RaycastResult、目标排序、事件接口、ExecuteEvents、自定义数据、处理日志和源码版本说明。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 6. Working with the UI Source”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 6. Working with the UI Source”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 6. Working with the UI Source”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 6. Working with the UI Source”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid06WorkingWithUiSourceLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid06WorkingWithUiSourceEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid06WorkingWithUiSourceReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
