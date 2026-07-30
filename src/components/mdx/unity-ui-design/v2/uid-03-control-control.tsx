"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-03",
  title: "Chapter 3. Control, Control, You Must Learn Control",
  question:
    "怎样证明控件在视觉状态、选择状态、导航状态和事件输出上保持一致，并覆盖鼠标、键盘和触摸？",
  concepts: [
    "Dealing with text；Shadows and effects",
    "Image types；Simple Images；Sliced Images；Tiled Images；Filled Images",
    "RawImage；Button；Selectable",
    "Grouping toggles；Dynamic event properties；Sliding opportunities",
    "Scroll Rect；Masking；Navigation；A word on shaders",
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
      name: "音量滑块",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "开关组",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "导航焦点环",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 3. Control, Control, You Must Learn Control”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 3. Control, Control, You Must Learn Control”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 3. Control, Control, You Must Learn Control”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交控件层级、图像类型、文本效果、Selectable状态图、导航邻接表、事件值、遮罩命中和输入方式测试。",
  ],
  failureRoute: [
    "“Chapter 3. Control, Control, You Must Learn Control”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：视觉上禁用按钮但Selectable仍可导航和触发，键盘用户进入不可见或无效状态",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“控件可见状态、Selectable状态、导航邻接、交互命中和事件值指向同一对象身份”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "控件可见状态、Selectable状态、导航邻接、交互命中和事件值指向同一对象身份",
  fault:
    "视觉上禁用按钮但Selectable仍可导航和触发，键盘用户进入不可见或无效状态",
  artifact:
    "控件层级、图像类型、文本效果、Selectable状态图、导航邻接表、事件值、遮罩命中和输入方式测试。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 3. Control, Control, You Must Learn Control”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 3. Control, Control, You Must Learn Control”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 3. Control, Control, You Must Learn Control”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 3. Control, Control, You Must Learn Control”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid03ControlControlLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid03ControlControlEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid03ControlControlReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
