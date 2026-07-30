"use client";

import {
  UnityUiEvidenceLab,
  type UnityUiEvidenceModel,
} from "./unity-ui-evidence-lab";

const model = {
  unitId: "uid-05",
  title: "Chapter 5. Screen Space, World Space, and the Camera",
  question:
    "怎样为HUD、相机平面和世界血条选择Canvas模式，并证明深度、比例、朝向和事件摄像机一致？",
  concepts: [
    "The Canvas and Cameras；Screen Space and World Space",
    "Render cameras；Event Cameras；Getting some perspective",
    "A Screen Space - Camera health bar；What's in a Canvas?；Am I dead yet?",
    "Reaching in；It's all gone a bit flat；Going deep",
    "Hang your Canvas wherever you like；The showcase",
    "Troubles with scale；A better way；A final word on Event Cameras",
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
      name: "屏幕HUD",
      anchorMin: [0.05, 0.9],
      anchorMax: [0.05, 0.9],
      pivot: [0, 1],
      offset: "+16, -16",
      owner: "固定角点，由RectTransform offset定位",
    },
    {
      name: "相机生命条",
      anchorMin: [0.08, 0.08],
      anchorMax: [0.92, 0.22],
      pivot: [0.5, 0.5],
      offset: "16 px inset",
      owner: "水平与垂直拉伸，由父矩形分配尺寸",
    },
    {
      name: "世界展柜标签",
      anchorMin: [0.5, 0.5],
      anchorMax: [0.5, 0.5],
      pivot: [0.5, 0.5],
      offset: "0, 0",
      owner: "中心锚定，由内容或布局元素声明尺寸",
    },
  ],
  normalRoute: [
    "“Chapter 5. Screen Space, World Space, and the Camera”采集指针、触摸或导航输入，并固定设备、坐标与时间",
    "唯一活动Input Module为“Chapter 5. Screen Space, World Space, and the Camera”生成类型化事件数据",
    "Graphic、2D或3D Raycaster按相机、排序和距离返回候选目标",
    "EventSystem为“Chapter 5. Screen Space, World Space, and the Camera”选择首个合法目标并维护选择状态",
    "ExecuteEvents调用匹配接口，处理器提交Canvas模式、Render Camera、Event Camera、Plane Distance、FOV、排序、世界尺寸、遮挡、射线结果和尺度对照。",
  ],
  failureRoute: [
    "“Chapter 5. Screen Space, World Space, and the Camera”复用相同设备、坐标、层级、相机和初始状态",
    "只注入UI故障：World Space Canvas使用错误Event Camera，画面可见但射线从另一相机发出而无法点击",
    "输入模块或Raycaster在最早偏离点生成错误候选、顺序或事件数据",
    "目标不可达、重复接收或状态与画面分离，保留完整故障日志",
    "依据“渲染相机、事件相机、Canvas模式、排序、世界尺度和目标对象形成明确的一对一映射”拒绝发布并恢复已知场景快照",
  ],
  invariant:
    "渲染相机、事件相机、Canvas模式、排序、世界尺度和目标对象形成明确的一对一映射",
  fault:
    "World Space Canvas使用错误Event Camera，画面可见但射线从另一相机发出而无法点击",
  artifact:
    "Canvas模式、Render Camera、Event Camera、Plane Distance、FOV、排序、世界尺寸、遮挡、射线结果和尺度对照。",
  gates: [
    {
      label: "层级与锚点",
      detail:
        "“Chapter 5. Screen Space, World Space, and the Camera”的父子层级、Anchor Min/Max、Pivot与offset有版本化记录。",
    },
    {
      label: "布局所有权",
      detail:
        "“Chapter 5. Screen Space, World Space, and the Camera”的每个尺寸和状态只有一个权威写入者，不发生布局循环。",
    },
    {
      label: "事件路由",
      detail:
        "“Chapter 5. Screen Space, World Space, and the Camera”的输入模块、Raycaster、相机、目标和处理器可以逐跳重放。",
    },
    {
      label: "视口与构建",
      detail:
        "“Chapter 5. Screen Space, World Space, and the Camera”经过窄屏、超宽、安全区、多输入方式、冷启动和目标构建复核。",
    },
  ],
} as const satisfies UnityUiEvidenceModel;

export function Uid05ScreenWorldCameraLayoutProbe() {
  return <UnityUiEvidenceLab model={model} view="layout-probe" />;
}

export function Uid05ScreenWorldCameraEventRouteLab() {
  return <UnityUiEvidenceLab model={model} view="event-route" />;
}

export function Uid05ScreenWorldCameraReleaseGateLab() {
  return <UnityUiEvidenceLab model={model} view="release-gate" />;
}
