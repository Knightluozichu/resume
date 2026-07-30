"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-04",
  title: "Chapter 4. Anchors Away",
  question:
    "怎样从产品约束选择固定像素、按屏幕缩放或物理尺寸，而不是靠拖动到某一分辨率看起来合适？",
  concepts: [
    "Dropping Anchor",
    "Put a nail in it, and trim the sails",
    "Stretch it, bend it",
    "Scaling and resolution",
    "Working with the constant default；Scaling to my view；Getting physical",
    "Which to choose?",
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
      name: "左上状态牌",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "底部拉伸栏",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "中央操作键",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 4. Anchors Away”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 4. Anchors Away”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 4. Anchors Away”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交Anchor Min/Max、Pivot、offset、参考分辨率、Match值、物理单位、宽高比矩阵、安全区截图和选择理由。",
  ],
  failureRoute: [
    "“Chapter 4. Anchors Away”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：只测试16:9参考分辨率，超宽屏和刘海竖屏中的按钮漂出安全区",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“锚点归一坐标、轴心、偏移、参考分辨率、Match和安全区均被记录并在边界视口复核”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "锚点归一坐标、轴心、偏移、参考分辨率、Match和安全区均被记录并在边界视口复核",
  fault: "只测试16:9参考分辨率，超宽屏和刘海竖屏中的按钮漂出安全区",
  artifact:
    "Anchor Min/Max、Pivot、offset、参考分辨率、Match值、物理单位、宽高比矩阵、安全区截图和选择理由。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 4. Anchors Away”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 4. Anchors Away”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 4. Anchors Away”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 4. Anchors Away”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid04AnchorsAwayLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid04AnchorsAwayEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid04AnchorsAwayReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
